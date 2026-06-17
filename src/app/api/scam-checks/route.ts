import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

type ScamCheckInsert = {
  requester_name: string;
  email: string;
  phone?: string;
  city_province?: string;
  situation: string;
  amount_requested?: string;
  urgency: 'low' | 'normal' | 'high';
};

const sensitiveKeyFragments = [
  'passeport',
  'passport',
  'nas',
  'sin',
  'nip',
  'carte_bancaire',
  'credit_card',
  'permis',
  'fichier',
  'document',
  'upload',
];

const allowedKeys = new Set([
  'requester_name',
  'name',
  'fullName',
  'requesterName',
  'email',
  'phone',
  'tel',
  'city_province',
  'city',
  'cityProvince',
  'province',
  'situation',
  'description',
  'message',
  'amount_requested',
  'amount',
  'amountRequested',
  'urgency',
  'disclaimer_accepted',
  'consent',
  'disclaimer',
]);

function jsonError(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeKey(key: string) {
  return key.toLowerCase().replace(/[^a-z0-9_]/g, '_');
}

function hasSensitiveOrUnexpectedKeys(input: Record<string, unknown>) {
  return Object.keys(input).some((key) => {
    const normalizedKey = normalizeKey(key);
    return sensitiveKeyFragments.some((fragment) => normalizedKey.includes(fragment)) || !allowedKeys.has(key);
  });
}

function textField(input: Record<string, unknown>, ...keys: string[]) {
  for (const key of keys) {
    const value = input[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

function booleanField(input: Record<string, unknown>, ...keys: string[]) {
  for (const key of keys) {
    if (typeof input[key] === 'boolean') return input[key];
  }
  return undefined;
}

function isUrgency(value: string): value is ScamCheckInsert['urgency'] {
  return value === 'low' || value === 'normal' || value === 'high';
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid JSON body', 400);
  }

  if (!isRecord(body)) {
    return jsonError('Invalid scam check payload', 400);
  }

  if (hasSensitiveOrUnexpectedKeys(body)) {
    return jsonError('Unexpected scam check field', 400);
  }

  const requesterName = textField(body, 'requester_name', 'name', 'fullName', 'requesterName');
  const email = textField(body, 'email');
  const situation = textField(body, 'situation', 'description', 'message');
  const urgency = textField(body, 'urgency');
  const disclaimerAccepted = booleanField(body, 'disclaimer_accepted', 'consent', 'disclaimer');

  if (!requesterName || !email || !situation || !urgency || typeof disclaimerAccepted !== 'boolean') {
    return jsonError('Missing required scam check fields', 400);
  }

  if (disclaimerAccepted !== true) {
    return jsonError('Disclaimer must be accepted', 400);
  }

  if (!isUrgency(urgency)) {
    return jsonError('Invalid urgency value', 400);
  }

  const scamCheck: ScamCheckInsert = {
    requester_name: requesterName,
    email,
    phone: textField(body, 'phone', 'tel') || undefined,
    city_province: textField(body, 'city_province', 'city', 'cityProvince', 'province') || undefined,
    situation,
    amount_requested: textField(body, 'amount_requested', 'amount', 'amountRequested') || undefined,
    urgency,
  };

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('scam_checks')
      .insert(scamCheck)
      .select('id')
      .single();

    if (error) {
      return jsonError(error.message || 'Scam check insert failed', 500);
    }

    return NextResponse.json({ ok: true, scamCheckId: data.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Scam check insert failed';
    return jsonError(message, 500);
  }
}
