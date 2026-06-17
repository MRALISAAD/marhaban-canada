import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

type CaseInsert = {
  client_name: string;
  email: string;
  city_province: string;
  preferred_language: string;
  status: 'active';
  next_step: string;
  action_plan: string[];
  internal_notes: string[];
  booking_id: string | null;
};

const FORBIDDEN_FIELDS = [
  'sin', 'nas', 'social_insurance', 'social_insurance_number',
  'passport', 'passport_number',
  'card', 'credit_card', 'card_number', 'cvv',
  'permit', 'work_permit', 'study_permit',
  'document', 'upload',
  'bank_account', 'bank_number', 'iban',
];

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function jsonError(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function textField(input: Record<string, unknown>, key: string) {
  const value = input[key];
  return typeof value === 'string' ? value.trim() : '';
}

function validBookingId(value: string) {
  return uuidPattern.test(value) ? value : null;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid JSON body', 400);
  }

  if (!isRecord(body)) {
    return jsonError('Invalid case payload', 400);
  }

  const clientName = textField(body, 'clientName') || textField(body, 'fullName');
  const email = textField(body, 'email');

  if (!clientName || !email) {
    return jsonError('Missing required case fields', 400);
  }

  if (FORBIDDEN_FIELDS.some((field) => Object.prototype.hasOwnProperty.call(body, field))) {
    return jsonError('Sensitive field rejected', 400);
  }

  const internalNote = textField(body, 'internalNote');

  const caseFile: CaseInsert = {
    client_name: clientName,
    email,
    city_province: textField(body, 'cityProvince'),
    preferred_language: textField(body, 'preferredLanguage') || 'fr',
    status: 'active',
    next_step: 'Contacter la personne et préparer le premier suivi.',
    action_plan: [],
    internal_notes: internalNote ? [internalNote] : [],
    booking_id: validBookingId(textField(body, 'bookingId')),
  };

  try {
    const supabase = createServerClient();

    if (caseFile.booking_id) {
      const { data: existing } = await supabase
        .from('case_files')
        .select('id')
        .eq('booking_id', caseFile.booking_id)
        .maybeSingle();

      if (existing) {
        return NextResponse.json({ ok: true, caseFileId: existing.id, duplicate: true });
      }
    }

    const { data, error } = await supabase
      .from('case_files')
      .insert(caseFile)
      .select('id')
      .single();

    if (error) {
      return jsonError(error.message || 'Case insert failed', 500);
    }

    return NextResponse.json({ ok: true, caseFileId: data.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Case insert failed';
    return jsonError(message, 500);
  }
}
