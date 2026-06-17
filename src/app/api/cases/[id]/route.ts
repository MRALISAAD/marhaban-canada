import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

type CaseUpdate = {
  status?: string;
  next_step?: string;
  internal_notes?: string[];
  action_plan?: string[];
};

const ALLOWED_FIELDS = ['status', 'next_step', 'internal_notes', 'action_plan'] as const;
const FORBIDDEN_FIELDS = [
  'sin', 'nas', 'social_insurance', 'social_insurance_number',
  'passport', 'passport_number', 'passeport',
  'card', 'credit_card', 'card_number', 'carte_bancaire', 'cvv',
  'permit', 'work_permit', 'study_permit', 'permis',
  'document', 'upload',
  'bank_account', 'bank_number', 'iban',
];
const allowedFields = new Set<string>(ALLOWED_FIELDS);

function jsonError(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function textArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : undefined;
}

function normalizeKey(key: string) {
  return key.toLowerCase().replace(/[^a-z0-9_]/g, '_');
}

function hasForbiddenField(input: Record<string, unknown>) {
  return Object.keys(input).some((key) => {
    const normalizedKey = normalizeKey(key);
    return FORBIDDEN_FIELDS.some((field) => normalizedKey.includes(field));
  });
}

function hasOnlyAllowedFields(input: Record<string, unknown>) {
  return Object.keys(input).every((key) => allowedFields.has(key));
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid JSON body', 400);
  }

  if (!isRecord(body)) {
    return jsonError('Invalid case payload', 400);
  }

  if (hasForbiddenField(body)) {
    return jsonError('Sensitive field rejected', 400);
  }

  if (!hasOnlyAllowedFields(body)) {
    return jsonError('Unexpected case field rejected', 400);
  }

  const updates: CaseUpdate = {};

  if (typeof body.status === 'string') {
    updates.status = body.status;
  }

  if (typeof body.next_step === 'string') {
    updates.next_step = body.next_step;
  }

  const internalNotes = textArray(body.internal_notes);
  if (internalNotes) {
    updates.internal_notes = internalNotes;
  }

  const actionPlan = textArray(body.action_plan);
  if (actionPlan) {
    updates.action_plan = actionPlan;
  }

  try {
    const supabase = createServerClient();
    const { error } = await supabase
      .from('case_files')
      .update(updates)
      .eq('id', id);

    if (error) {
      return jsonError(error.message || 'Case update failed', 500);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Case update failed';
    return jsonError(message, 500);
  }
}
