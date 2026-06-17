import { NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE } from '@/middleware';

const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Corps de requête invalide.' }, { status: 400 });
  }

  const { password } = body as { password?: string };

  const envPassword = process.env.ADMIN_PREVIEW_PASSWORD;

  if (!envPassword) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Variable ADMIN_PREVIEW_PASSWORD non configurée. Ajoutez-la dans .env.local pour activer cet accès.',
      },
      { status: 503 },
    );
  }

  if (!password || password !== envPassword) {
    return NextResponse.json(
      { ok: false, error: 'Mot de passe incorrect.' },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, 'preview-ok', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });

  return response;
}
