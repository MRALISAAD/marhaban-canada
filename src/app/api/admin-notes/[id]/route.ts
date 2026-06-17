import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

type AdminNoteUpdate = {
  body?: string;
  status?: 'active' | 'archived';
};

const ALLOWED_FIELDS = ['body', 'status'] as const;
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

function validStatus(value: unknown): value is AdminNoteUpdate['status'] {
  return value === 'active' || value === 'archived';
}

async function updateNote(id: string, updates: AdminNoteUpdate) {
  if (!uuidPattern.test(id) || Object.keys(updates).length === 0) {
    return jsonError('Invalid note payload', 400);
  }

  try {
    const supabase = createServerClient();
    const { error } = await supabase
      .from('admin_notes')
      .update(updates)
      .eq('id', id);

    if (error) {
      return jsonError(error.message || 'Admin note update failed', 500);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Admin note update failed';
    return jsonError(message, 500);
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return jsonError('Invalid JSON body', 400);
  }

  if (!isRecord(payload) || !hasOnlyAllowedFields(payload)) {
    return jsonError('Invalid note payload', 400);
  }

  const updates: AdminNoteUpdate = {};

  if (Object.prototype.hasOwnProperty.call(payload, 'body')) {
    const body = typeof payload.body === 'string' ? payload.body.trim() : '';

    if (!body || body.length > 2000) {
      return jsonError('Invalid note payload', 400);
    }

    updates.body = body;
  }

  if (Object.prototype.hasOwnProperty.call(payload, 'status')) {
    if (!validStatus(payload.status)) {
      return jsonError('Invalid note payload', 400);
    }

    updates.status = payload.status;
  }

  return updateNote(id, updates);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return updateNote(id, { status: 'archived' });
}
