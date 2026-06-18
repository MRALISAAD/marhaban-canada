import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/admin/require-admin';

type ScamCheckUpdate = {
  status?: string;
  risk_level?: string;
  notes?: string[];
  recommendation?: string;
};

const ALLOWED_FIELDS = ['status', 'risk_level', 'notes', 'recommendation'] as const;
const ALLOWED_STATUSES = new Set(['new', 'reviewing', 'responded', 'closed', 'archived']);
const ALLOWED_RISK_LEVELS = new Set(['unreviewed', 'low', 'medium', 'high', 'urgent']);
const allowedFields = new Set<string>(ALLOWED_FIELDS);
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function jsonError(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
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
  if (!uuidPattern.test(id)) return jsonError('Invalid scam check id', 400);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid JSON body', 400);
  }

  if (!isRecord(body)) return jsonError('Invalid payload', 400);
  if (!hasOnlyAllowedFields(body)) return jsonError('Unexpected field rejected', 400);

  const updates: ScamCheckUpdate = {};

  if (typeof body.status === 'string') {
    if (!ALLOWED_STATUSES.has(body.status)) return jsonError('Invalid status', 400);
    updates.status = body.status;
  }

  if (typeof body.risk_level === 'string') {
    if (!ALLOWED_RISK_LEVELS.has(body.risk_level)) return jsonError('Invalid risk_level', 400);
    updates.risk_level = body.risk_level;
  }

  const notes = textArray(body.notes);
  if (notes !== undefined) {
    updates.notes = notes;
  }

  if (typeof body.recommendation === 'string') {
    updates.recommendation = body.recommendation.trim();
  }

  if (Object.keys(updates).length === 0) return jsonError('No fields to update', 400);

  try {
    const supabase = createServerClient();
    const { error } = await supabase
      .from('scam_checks')
      .update(updates)
      .eq('id', id);

    if (error) return jsonError(error.message || 'Scam check update failed', 500);

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Scam check update failed';
    return jsonError(message, 500);
  }
}
