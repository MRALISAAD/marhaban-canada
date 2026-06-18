import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { AdminShell } from '@/components/admin/AdminShell';
import { requireAdmin } from '@/lib/admin/require-admin';

export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
  const auth = await requireAdmin();
  if (!auth.ok) redirect('/admin/login');
  return <AdminShell>{children}</AdminShell>;
}
