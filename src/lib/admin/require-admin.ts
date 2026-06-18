import { createSupabaseServerAuthClient } from '@/lib/supabase/server-auth';

export type AdminAuthOk = { ok: true; email: string };
export type AdminAuthFail = { ok: false; status: 401 | 403; error: string };
export type AdminAuthResult = AdminAuthOk | AdminAuthFail;

export async function requireAdmin(): Promise<AdminAuthResult> {
  const raw = process.env.ADMIN_ALLOWED_EMAILS ?? '';
  const allowedEmails = raw
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (allowedEmails.length === 0) {
    return { ok: false, status: 403, error: 'Admin non configuré.' };
  }

  const supabase = await createSupabaseServerAuthClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.email) {
    return { ok: false, status: 401, error: 'Authentification requise.' };
  }

  if (!allowedEmails.includes(user.email.toLowerCase())) {
    return { ok: false, status: 403, error: 'Accès non autorisé.' };
  }

  return { ok: true, email: user.email };
}
