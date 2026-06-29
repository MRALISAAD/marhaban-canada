import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createServerClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/admin/require-admin';

const ALLOWED_STATUSES = new Set([
  'form_submitted',
  'calendly_pending',
  'calendly_confirmed',
  'contacted',
  'confirmed_manually',
  'completed',
  'cancelled',
  'no_show',
]);

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function jsonError(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin();
  if (!auth.ok) return jsonError(auth.error, auth.status);

  const { id } = await params;
  if (!uuidPattern.test(id)) return jsonError('Invalid id', 400);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid JSON body', 400);
  }

  if (!isRecord(body)) return jsonError('Invalid payload', 400);

  if (typeof body.status !== 'string' || !ALLOWED_STATUSES.has(body.status)) {
    return jsonError('Invalid or missing status', 400);
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return jsonError('Supabase not configured', 503);
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('booking_preparation_forms')
      .update({ status: body.status })
      .eq('id', id)
      .select('id, status')
      .single();

    if (error) return jsonError(error.message || 'Update failed', 500);

    revalidatePath('/admin/bookings');

    return NextResponse.json({ ok: true, item: data });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Update failed';
    return jsonError(message, 500);
  }
}
