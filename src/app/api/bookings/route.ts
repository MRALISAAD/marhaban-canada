import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

type BookingInsert = {
  full_name: string;
  email: string;
  phone?: string;
  city_province: string;
  service: string;
  service_label: string;
  duration: string;
  price_label: string;
  client_status: string;
  preferred_language: string;
  message: string;
  next_action?: string;
  disclaimer_accepted: boolean;
  status: string;
  source: string;
};

const sensitiveKeys = new Set([
  'supabase_service_role_key',
  'service_role_key',
  'password',
  'token',
  'access_token',
  'refresh_token',
]);

const allowedKeys = new Set([
  'full_name',
  'email',
  'phone',
  'city_province',
  'service',
  'service_label',
  'duration',
  'price_label',
  'client_status',
  'preferred_language',
  'message',
  'next_action',
  'disclaimer_accepted',
  'status',
  'source',
]);

function jsonError(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasSensitiveOrUnexpectedKeys(input: Record<string, unknown>) {
  return Object.keys(input).some((key) => {
    const normalizedKey = key.toLowerCase();
    return sensitiveKeys.has(normalizedKey) || !allowedKeys.has(key);
  });
}

function textField(input: Record<string, unknown>, key: string) {
  const value = input[key];
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid JSON body', 400);
  }

  if (!isRecord(body)) {
    return jsonError('Invalid booking payload', 400);
  }

  if (hasSensitiveOrUnexpectedKeys(body)) {
    return jsonError('Unexpected booking field', 400);
  }

  const fullName = textField(body, 'full_name');
  const email = textField(body, 'email');
  const service = textField(body, 'service');
  const preferredLanguage = textField(body, 'preferred_language');
  const disclaimerAccepted = body.disclaimer_accepted;

  if (!fullName || !email || !service || !preferredLanguage || typeof disclaimerAccepted !== 'boolean') {
    return jsonError('Missing required booking fields', 400);
  }

  if (disclaimerAccepted !== true) {
    return jsonError('Disclaimer must be accepted', 400);
  }

  const booking: BookingInsert = {
    full_name: fullName,
    email,
    phone: textField(body, 'phone') || undefined,
    city_province: textField(body, 'city_province'),
    service,
    service_label: textField(body, 'service_label'),
    duration: textField(body, 'duration'),
    price_label: textField(body, 'price_label'),
    client_status: textField(body, 'client_status'),
    preferred_language: preferredLanguage,
    message: textField(body, 'message'),
    next_action: textField(body, 'next_action') || undefined,
    disclaimer_accepted: true,
    status: textField(body, 'status') || 'new',
    source: textField(body, 'source') || 'reserver_modal',
  };

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('bookings')
      .insert(booking)
      .select('id')
      .single();

    if (error) {
      return jsonError(error.message || 'Booking insert failed', 500);
    }

    return NextResponse.json({ ok: true, bookingId: data.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Booking insert failed';
    return jsonError(message, 500);
  }
}
