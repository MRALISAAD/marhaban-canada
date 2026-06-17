import { AdminCasesClient } from '@/components/admin/AdminCasesClient';
import { mockCases } from '@/lib/admin/mock-data';

export default function AdminCasesPage() {
  return <AdminCasesClient mockCases={mockCases} />;
}
