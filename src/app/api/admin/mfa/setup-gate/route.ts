import { timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/require-admin';

function jsonError(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return jsonError('Unauthorized', 401);

  if (process.env.ADMIN_MFA_SETUP_ENABLED !== 'true') {
    return jsonError('Setup disabled', 403);
  }

  const expectedCode = process.env.ADMIN_MFA_SETUP_CODE ?? '';
  if (!expectedCode) {
    return jsonError('Setup not configured', 403);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid request', 400);
  }

  const submitted = typeof (body as Record<string, unknown>).setup_code === 'string'
    ? ((body as Record<string, unknown>).setup_code as string)
    : '';

  let allowed = false;
  try {
    const a = Buffer.from(submitted);
    const b = Buffer.from(expectedCode);
    if (a.length === b.length) {
      allowed = timingSafeEqual(a, b);
    }
  } catch {
    allowed = false;
  }

  if (!allowed) {
    return jsonError('Invalid setup code', 403);
  }

  return NextResponse.json({ ok: true });
}
