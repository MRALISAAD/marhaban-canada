import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/admin/require-admin';
import type { AdminNote, AdminNoteTargetType } from '@/types/admin';

type AdminNoteRow = {
  id: string;
  created_at: string;
  updated_at: string;
  target_type: AdminNoteTargetType;
  target_id: string;
  body: string;
  status: 'active' | 'archived';
};

const TARGET_TYPES = ['booking', 'case_file', 'scam_check', 'resource'] as const;
const ALLOWED_FIELDS = ['target_type', 'target_id', 'body'] as const;
const FORBIDDEN_FIELDS = ['sin', 'nas', 'passport', 'card', 'permit', 'bank_account', 'document', 'upload'] as const;

const targetTypes = new Set<string>(TARGET_TYPES);
const allowedFields = new Set<string>(ALLOWED_FIELDS);
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function jsonError(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isTargetType(value: unknown): value is AdminNoteTargetType {
  return typeof value === 'string' && targetTypes.has(value);
}

function isUuid(value: unknown): value is string {
  return typeof value === 'string' && uuidPattern.test(value);
}

function hasOnlyAllowedFields(input: Record<string, unknown>) {
  return Object.keys(input).every((key) => allowedFields.has(key));
}

function hasForbiddenField(input: Record<string, unknown>) {
  return FORBIDDEN_FIELDS.some((field) => Object.prototype.hasOwnProperty.call(input, field));
}

function mapNote(row: AdminNoteRow): AdminNote {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    targetType: row.target_type,
    targetId: row.target_id,
    body: row.body,
    status: row.status,
  };
}

export async function GET(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return jsonError(auth.error, auth.status);

  const { searchParams } = new URL(request.url);
  const targetType = searchParams.get('target_type');
  const targetId = searchParams.get('target_id');

  if (!isTargetType(targetType) || !isUuid(targetId)) {
    return jsonError('Invalid params', 400);
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('admin_notes')
      .select('id, created_at, updated_at, target_type, target_id, body, status')
      .eq('target_type', targetType)
      .eq('target_id', targetId)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) {
      return jsonError(error.message || 'Admin notes fetch failed', 500);
    }

    return NextResponse.json({ ok: true, notes: (data ?? []).map((row) => mapNote(row as AdminNoteRow)) });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Admin notes fetch failed';
    return jsonError(message, 500);
  }
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return jsonError(auth.error, auth.status);

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return jsonError('Invalid JSON body', 400);
  }

  if (!isRecord(payload) || !hasOnlyAllowedFields(payload) || hasForbiddenField(payload)) {
    return jsonError('Invalid note payload', 400);
  }

  const targetType = payload.target_type;
  const targetId = payload.target_id;
  const body = typeof payload.body === 'string' ? payload.body.trim() : '';

  if (!isTargetType(targetType) || !isUuid(targetId) || !body || body.length > 2000) {
    return jsonError('Invalid note payload', 400);
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('admin_notes')
      .insert({ target_type: targetType, target_id: targetId, body })
      .select('id')
      .single();

    if (error) {
      return jsonError(error.message || 'Admin note insert failed', 500);
    }

    return NextResponse.json({ ok: true, noteId: data.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Admin note insert failed';
    return jsonError(message, 500);
  }
}
