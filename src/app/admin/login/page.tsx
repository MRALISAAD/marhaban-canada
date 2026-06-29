import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/require-admin';
import { LoginFormClient } from './LoginFormClient';

export default async function AdminLoginPage() {
  const auth = await requireAdmin();
  if (auth.ok) redirect('/admin/dashboard');
  return <LoginFormClient />;
}
