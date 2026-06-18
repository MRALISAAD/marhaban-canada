import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createServerClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/admin/require-admin';

type CaseUpdate = {
  status?: string;
  next_step?: string;
  internal_notes?: string[];
  action_plan?: string[];
};

const ALLOWED_FIELDS = ['status', 'next_step', 'internal_notes', 'action_plan'] as const;
const ALLOWED_STATUSES = new Set(['new', 'active', 'waiting_client', 'next_step', 'completed', 'archived']);
const FORBIDDEN_FIELDS = [
  'sin', 'nas', 'social_insurance', 'passport', 'passeport',
  'card', 'credit_card', 'carte_bancaire', 'permit', 'permis',
  'document', 'upload', 'bank_account', 'bank_number',
];
const allowedFields = new Set<string>(ALLOWED_FIELDS);
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function jsonError(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeKey(key: string) {
  return key.toLowerCase().replace(/[^a-z0-9_]/g, '_');
}

function hasForbiddenField(input: Record<string, unknown>) {
  return Object.keys(input).some((key) => {
    const normalized = normalizeKey(key);
    return FORBIDDEN_FIELDS.some((f) => normalized.includes(f));
  });
}

function hasOnlyAllowedFields(input: Record<string, unknown>) {
  return Object.keys(input).every((key) => allowedFields.has(key));
}

function textArray(value: unknown): string[] | undefined {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : undefined;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin();
  if (!auth.ok) return jsonError(auth.error, auth.status);

  const { id } = await params;
  if (!uuidPattern.test(id)) return jsonError('Invalid case id', 400);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid JSON body', 400);
  }

  if (!isRecord(body)) return jsonError('Invalid payload', 400);
  if (hasForbiddenField(body)) return jsonError('Sensitive field rejected', 400);
  if (!hasOnlyAllowedFields(body)) return jsonError('Unexpected field rejected', 400);

  const updates: CaseUpdate = {};

  if (typeof body.status === 'string') {
    if (!ALLOWED_STATUSES.has(body.status)) return jsonError('Invalid status', 400);
    updates.status = body.status;
  }

  if (typeof body.next_step === 'string') {
    updates.next_step = body.next_step.trim();
  }

  const internalNotes = textArray(body.internal_notes);
  if (internalNotes !== undefined) updates.internal_notes = internalNotes;

  const actionPlan = textArray(body.action_plan);
  if (actionPlan !== undefined) updates.action_plan = actionPlan;

  if (Object.keys(updates).length === 0) return jsonError('No fields to update', 400);

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('case_files')
      .update(updates)
      .eq('id', id)
      .select('id, status, next_step, internal_notes, action_plan')
      .single();

    if (error) return jsonError(error.message || 'Case update failed', 500);

    revalidatePath('/admin/cases');
    revalidatePath('/admin/dashboard');

    return NextResponse.json({ ok: true, item: data });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Case update failed';
    return jsonError(message, 500);
  }
}
