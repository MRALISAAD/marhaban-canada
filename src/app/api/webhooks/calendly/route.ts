import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

function jsonError(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

async function verifyCalendlySignature(
  rawBody: string,
  signatureHeader: string | null,
  signingKey: string,
): Promise<boolean> {
  if (!signatureHeader) return false;

  const parts = signatureHeader.split(',');
  const tPart = parts.find((p) => p.startsWith('t='));
  const v1Part = parts.find((p) => p.startsWith('v1='));
  if (!tPart || !v1Part) return false;

  const timestamp = tPart.slice(2);
  const signature = v1Part.slice(3);

  const message = `${timestamp}.${rawBody}`;

  const encoder = new TextEncoder();
  const keyData = encoder.encode(signingKey);
  const messageData = encoder.encode(message);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
  const computedHex = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return computedHex === signature;
}

type CalendlyInviteePayload = {
  event: string;
  payload: {
    event?: string;
    uri?: string;
    name?: string;
    email?: string;
    cancel_url?: string;
    reschedule_url?: string;
    tracking?: {
      utm_content?: string;
      utm_source?: string;
      utm_medium?: string;
      utm_campaign?: string;
    };
    scheduled_event?: {
      uri?: string;
      start_time?: string;
      end_time?: string;
    };
  };
};

export async function POST(request: Request) {
  const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY?.trim() || '';

  if (!signingKey) {
    if (process.env.NODE_ENV === 'production') {
      return jsonError('Webhook signing key not configured', 500);
    }
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return jsonError('Failed to read request body', 400);
  }

  if (signingKey) {
    const signatureHeader = request.headers.get('calendly-webhook-signature');
    const valid = await verifyCalendlySignature(rawBody, signatureHeader, signingKey);
    if (!valid) {
      return jsonError('Invalid webhook signature', 401);
    }
  }

  let parsed: CalendlyInviteePayload;
  try {
    parsed = JSON.parse(rawBody) as CalendlyInviteePayload;
  } catch {
    return jsonError('Invalid JSON payload', 400);
  }

  const eventType = parsed.event;
  if (!eventType || typeof eventType !== 'string') {
    return jsonError('Missing event type', 400);
  }

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return jsonError('Supabase not configured', 503);
  }

  const supabase = createServerClient();
  const payload = parsed.payload;

  if (eventType === 'invitee.created') {
    const inviteeUri = payload.uri ?? '';
    const inviteeEmail = payload.email ?? '';
    const inviteeName = payload.name ?? '';
    const cancelUrl = payload.cancel_url ?? '';
    const rescheduleUrl = payload.reschedule_url ?? '';
    const eventUri = payload.scheduled_event?.uri ?? '';
    const eventStartTime = payload.scheduled_event?.start_time ?? null;
    const eventEndTime = payload.scheduled_event?.end_time ?? null;
    const utmContent = payload.tracking?.utm_content ?? '';

    let bookingId: string | null = null;

    if (utmContent && /^[0-9a-f-]{36}$/.test(utmContent)) {
      const { data } = await supabase
        .from('booking_preparation_forms')
        .select('id')
        .eq('id', utmContent)
        .maybeSingle();
      if (data?.id) bookingId = data.id;
    }

    if (!bookingId && inviteeEmail) {
      const { data } = await supabase
        .from('booking_preparation_forms')
        .select('id')
        .eq('email', inviteeEmail.toLowerCase())
        .in('status', ['calendly_pending', 'form_submitted'])
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (data?.id) bookingId = data.id;
    }

    if (!bookingId) {
      return NextResponse.json({ ok: true, matched: false, reason: 'no_booking_found' });
    }

    const { error } = await supabase
      .from('booking_preparation_forms')
      .update({
        status: 'calendly_confirmed',
        calendly_event_uri: eventUri || null,
        calendly_invitee_uri: inviteeUri || null,
        calendly_event_start_time: eventStartTime,
        calendly_event_end_time: eventEndTime,
        calendly_invitee_email: inviteeEmail || null,
        calendly_invitee_name: inviteeName || null,
        calendly_cancel_url: cancelUrl || null,
        calendly_reschedule_url: rescheduleUrl || null,
        calendly_raw_payload: parsed as unknown as Record<string, unknown>,
      })
      .eq('id', bookingId);

    if (error) {
      console.error('Calendly webhook update failed', error);
      return jsonError('Failed to update booking', 500);
    }

    return NextResponse.json({ ok: true, matched: true, id: bookingId });
  }

  if (eventType === 'invitee.canceled') {
    const inviteeUri = payload.uri ?? '';
    const inviteeEmail = payload.email ?? '';

    let bookingId: string | null = null;

    if (inviteeUri) {
      const { data } = await supabase
        .from('booking_preparation_forms')
        .select('id')
        .eq('calendly_invitee_uri', inviteeUri)
        .maybeSingle();
      if (data?.id) bookingId = data.id;
    }

    if (!bookingId && inviteeEmail) {
      const { data } = await supabase
        .from('booking_preparation_forms')
        .select('id')
        .eq('email', inviteeEmail.toLowerCase())
        .in('status', ['calendly_confirmed', 'calendly_pending'])
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (data?.id) bookingId = data.id;
    }

    if (!bookingId) {
      return NextResponse.json({ ok: true, matched: false, reason: 'no_booking_found' });
    }

    const { error } = await supabase
      .from('booking_preparation_forms')
      .update({
        status: 'cancelled',
        calendly_raw_payload: parsed as unknown as Record<string, unknown>,
      })
      .eq('id', bookingId);

    if (error) {
      console.error('Calendly webhook cancel update failed', error);
      return jsonError('Failed to update booking', 500);
    }

    return NextResponse.json({ ok: true, matched: true, id: bookingId });
  }

  return NextResponse.json({ ok: true, event: eventType, ignored: true });
}
