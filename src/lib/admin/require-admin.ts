import { createSupabaseServerAuthClient } from '@/lib/supabase/server-auth';

export type AdminAuthOk = { ok: true; email: string };
export type AdminAuthFail = {
  ok: false;
  status: 401 | 403;
  error: string;
  reason:
    | 'missing_allowlist'
    | 'session_missing'
    | 'unauthorized'
    | 'mfa_required'
    | 'mfa_setup_required'
    | 'mfa_failed';
};
export type AdminAuthResult = AdminAuthOk | AdminAuthFail;

export function parseAllowedEmails(): string[] {
  return (process.env.ADMIN_ALLOWED_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

// Basic check: valid session + allowlist. Used for /admin/login and /admin/mfa pages (no AAL2).
export async function requireAdmin(): Promise<AdminAuthResult> {
  const allowedEmails = parseAllowedEmails();

  if (allowedEmails.length === 0) {
    return { ok: false, status: 403, error: 'Admin non configuré.', reason: 'missing_allowlist' };
  }

  const supabase = await createSupabaseServerAuthClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.email) {
    return { ok: false, status: 401, error: 'Authentification requise.', reason: 'session_missing' };
  }

  if (!allowedEmails.includes(user.email.toLowerCase())) {
    return { ok: false, status: 403, error: 'Accès non autorisé.', reason: 'unauthorized' };
  }

  return { ok: true, email: user.email };
}

// Full check: session + allowlist + verified TOTP factor + AAL2. Used for all protected admin pages.
export async function requireAdminMfa(): Promise<AdminAuthResult> {
  const basic = await requireAdmin();
  if (!basic.ok) return basic;

  const supabase = await createSupabaseServerAuthClient();

  const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors();
  if (factorsError) {
    return { ok: false, status: 403, error: 'Erreur vérification MFA.', reason: 'mfa_failed' };
  }

  const hasVerifiedTotp = factors?.totp?.some((f) => f.status === 'verified') ?? false;
  if (!hasVerifiedTotp) {
    return { ok: false, status: 403, error: 'Configuration MFA requise.', reason: 'mfa_setup_required' };
  }

  const { data: aal, error: aalError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (aalError || !aal) {
    return { ok: false, status: 403, error: 'Erreur vérification MFA.', reason: 'mfa_failed' };
  }

  if (aal.currentLevel !== 'aal2') {
    return { ok: false, status: 403, error: 'Vérification MFA requise.', reason: 'mfa_required' };
  }

  return { ok: true, email: basic.email };
}
