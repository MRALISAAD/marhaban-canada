import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createServerClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/admin/require-admin';

type BookingUpdate = {
  status?: string;
  internal_note?: string;
  next_action?: string;
};

const ALLOWED_FIELDS = ['status', 'internal_note', 'next_action'] as const;
const ALLOWED_STATUSES = new Set(['new', 'to_contact', 'slot_proposed', 'confirmed', 'completed', 'cancelled', 'archived']);
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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin();
  if (!auth.ok) return jsonError(auth.error, auth.status);

  const { id } = await params;
  if (!uuidPattern.test(id)) return jsonError('Invalid booking id', 400);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid JSON body', 400);
  }

  if (!isRecord(body)) return jsonError('Invalid payload', 400);
  if (hasForbiddenField(body)) return jsonError('Sensitive field rejected', 400);
  if (!hasOnlyAllowedFields(body)) return jsonError('Unexpected field rejected', 400);

  const updates: BookingUpdate = {};

  if (typeof body.status === 'string') {
    if (!ALLOWED_STATUSES.has(body.status)) return jsonError('Invalid status', 400);
    updates.status = body.status;
  }

  if (typeof body.internal_note === 'string') {
    updates.internal_note = body.internal_note.trim();
  }

  if (typeof body.next_action === 'string') {
    updates.next_action = body.next_action.trim();
  }

  if (Object.keys(updates).length === 0) return jsonError('No fields to update', 400);

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select('id, status, internal_note, next_action')
      .single();

    if (error) return jsonError(error.message || 'Booking update failed', 500);

    revalidatePath('/admin/bookings');
    revalidatePath('/admin/dashboard');

    return NextResponse.json({ ok: true, item: data });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Booking update failed';
    return jsonError(message, 500);
  }
}
