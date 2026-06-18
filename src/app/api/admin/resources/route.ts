import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/admin/require-admin';

type ResourceInsert = {
  title: string;
  slug: string;
  locale: string;
  category: string;
  summary: string;
  content: { body?: string };
  status: string;
  owner: string;
};

const ALLOWED_FIELDS = ['title', 'slug', 'locale', 'category', 'summary', 'content', 'status', 'owner'] as const;
const allowedFields = new Set<string>(ALLOWED_FIELDS);

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

function normalizeContent(value: unknown): { body?: string } {
  if (typeof value === 'string') {
    const body = value.trim();
    return body ? { body } : {};
  }
  return {};
}

function hasOnlyAllowedFields(input: Record<string, unknown>) {
  return Object.keys(input).every((key) => allowedFields.has(key));
}

function conflictStatus(error: { code?: string; message?: string }) {
  return error.code === '23505' || error.message?.toLowerCase().includes('duplicate') ? 409 : 500;
}

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('resources')
      .select('id, created_at, updated_at, published_at, title, slug, locale, category, summary, content, status, owner')
      .order('updated_at', { ascending: false });

    if (error) return jsonError(error.message || 'Resources fetch failed', 500);

    return NextResponse.json({ ok: true, resources: data ?? [] });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Resources fetch failed';
    return jsonError(message, 500);
  }
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid JSON body', 400);
  }

  if (!isRecord(body)) return jsonError('Invalid resource payload', 400);
  if (!hasOnlyAllowedFields(body)) return jsonError('Unexpected resource field rejected', 400);

  const title = textField(body, 'title');
  const slug = textField(body, 'slug');
  const locale = textField(body, 'locale');
  const category = textField(body, 'category');

  if (!title || !slug || !locale || !category) {
    return jsonError('Missing required resource fields', 400);
  }

  const resource: ResourceInsert = {
    title,
    slug,
    locale,
    category,
    summary: textField(body, 'summary'),
    content: normalizeContent(body.content),
    status: textField(body, 'status') || 'draft',
    owner: textField(body, 'owner') || 'Marhaban Canada',
  };

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('resources')
      .insert(resource)
      .select('id')
      .single();

    if (error) return jsonError(error.message || 'Resource insert failed', conflictStatus(error));

    return NextResponse.json({ ok: true, resourceId: data.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Resource insert failed';
    return jsonError(message, 500);
  }
}
