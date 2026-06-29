import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { AdminShell } from '@/components/admin/AdminShell';
import { requireAdminMfa } from '@/lib/admin/require-admin';

export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
  const auth = await requireAdminMfa();

  if (!auth.ok) {
    if (auth.reason === 'session_missing') redirect('/admin/login');
    if (auth.reason === 'mfa_required' || auth.reason === 'mfa_setup_required') redirect('/admin/mfa');
    redirect(`/admin/login?error=${auth.reason}`);
  }

  return <AdminShell>{children}</AdminShell>;
}
