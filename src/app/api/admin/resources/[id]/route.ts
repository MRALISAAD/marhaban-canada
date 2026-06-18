import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/admin/require-admin';

type ResourceUpdate = {
  title?: string;
  slug?: string;
  locale?: string;
  category?: string;
  summary?: string;
  content?: { body?: string };
  status?: string;
  owner?: string;
};

const ALLOWED_FIELDS = ['title', 'slug', 'locale', 'category', 'summary', 'content', 'status', 'owner'] as const;
const allowedFields = new Set<string>(ALLOWED_FIELDS);
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function jsonError(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function textValue(value: unknown) {
  return typeof value === 'string' ? value.trim() : undefined;
}

function normalizeContent(value: unknown): { body?: string } | undefined {
  if (typeof value === 'string') {
    const body = value.trim();
    return body ? { body } : {};
  }
  return undefined;
}

function hasOnlyAllowedFields(input: Record<string, unknown>) {
  return Object.keys(input).every((key) => allowedFields.has(key));
}

function conflictStatus(error: { code?: string; message?: string }) {
  return error.code === '23505' || error.message?.toLowerCase().includes('duplicate') ? 409 : 500;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin();
  if (!auth.ok) return jsonError(auth.error, auth.status);

  const { id } = await params;
  if (!uuidPattern.test(id)) return jsonError('Invalid resource id', 400);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid JSON body', 400);
  }

  if (!isRecord(body)) return jsonError('Invalid resource payload', 400);
  if (!hasOnlyAllowedFields(body)) return jsonError('Unexpected resource field rejected', 400);

  const updates: ResourceUpdate = {};

  for (const field of ALLOWED_FIELDS) {
    if (!Object.prototype.hasOwnProperty.call(body, field)) continue;
    if (field === 'content') {
      updates.content = normalizeContent(body.content);
      continue;
    }
    const value = textValue(body[field]);
    if (value !== undefined) updates[field] = value;
  }

  if (Object.keys(updates).length === 0) return jsonError('No fields to update', 400);

  try {
    const supabase = createServerClient();
    const { error } = await supabase.from('resources').update(updates).eq('id', id);

    if (error) return jsonError(error.message || 'Resource update failed', conflictStatus(error));

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Resource update failed';
    return jsonError(message, 500);
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin();
  if (!auth.ok) return jsonError(auth.error, auth.status);

  const { id } = await params;
  if (!uuidPattern.test(id)) return jsonError('Invalid resource id', 400);

  try {
    const supabase = createServerClient();
    const { error } = await supabase.from('resources').delete().eq('id', id);

    if (error) return jsonError(error.message || 'Resource delete failed', 500);

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Resource delete failed';
    return jsonError(message, 500);
  }
}
