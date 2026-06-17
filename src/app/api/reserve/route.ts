import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return NextResponse.json({ ok: false, error: 'Invalid reserve payload' }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const text = (key: string) => (typeof input[key] === 'string' ? input[key].trim() : '');
  const consent = input.consent;
  const name = text('name');
  const email = text('email');
  const service = text('service') || 'orientation';
  const status = text('status');
  const city = text('city');
  const need = text('need');
  const language = text('language') || 'fr';

  if (!name || !email || !city || !need || typeof consent !== 'boolean') {
    return NextResponse.json({ ok: false, error: 'Missing required reserve fields' }, { status: 400 });
  }

  if (consent !== true) {
    return NextResponse.json({ ok: false, error: 'Disclaimer must be accepted' }, { status: 400 });
  }

  const serviceMap: Record<string, 'discovery' | 'orientation' | 'anti_scam'> = {
    discovery: 'discovery',
    orientation: 'orientation',
    antiScam: 'anti_scam',
    anti_scam: 'anti_scam',
    scam: 'anti_scam',
  };
  const clientStatusMap: Record<string, 'student' | 'worker' | 'newcomer' | 'other'> = {
    student: 'student',
    worker: 'worker',
    preparing: 'newcomer',
    arrived: 'newcomer',
    newcomer: 'newcomer',
  };
  const preferredLanguage = language === 'en' || language === 'ar' ? language : 'fr';
  const bookingService = serviceMap[service] ?? 'orientation';

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        full_name: name,
        email,
        phone: text('phone') || null,
        city_province: city,
        service: bookingService,
        service_label: service,
        duration: text('urgency') || 'A confirmer',
        price_label: 'A confirmer',
        client_status: clientStatusMap[status] ?? 'other',
        preferred_language: preferredLanguage,
        message: need,
        next_action: 'Répondre avec les disponibilités.',
        disclaimer_accepted: true,
        status: 'new',
        source: 'reserve_form',
      })
      .select('id')
      .single();

    if (error) {
      return NextResponse.json({ ok: false, error: error.message || 'Reserve insert failed' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, bookingId: data.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Reserve insert failed';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
