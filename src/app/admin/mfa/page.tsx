import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/require-admin';
import { createSupabaseServerAuthClient } from '@/lib/supabase/server-auth';
import { AdminMfaClient } from '@/components/admin/AdminMfaClient';

export default async function AdminMfaPage() {
  // Requires session + allowlist — but NOT AAL2 (user is here to set up or verify MFA)
  const auth = await requireAdmin();

  if (!auth.ok) {
    if (auth.reason === 'session_missing') redirect('/admin/login');
    redirect(`/admin/login?error=${auth.reason}`);
  }

  const supabase = await createSupabaseServerAuthClient();

  // Already at AAL2 — skip straight to dashboard
  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (aal?.currentLevel === 'aal2') {
    redirect('/admin/dashboard');
  }

  // Determine whether user needs to set up MFA or just verify it
  const { data: factors } = await supabase.auth.mfa.listFactors();
  const verifiedTotp = factors?.totp?.find((f) => f.status === 'verified');

  if (verifiedTotp) {
    return <AdminMfaClient mode="verify" factorId={verifiedTotp.id} />;
  }

  return <AdminMfaClient mode="setup" />;
}
