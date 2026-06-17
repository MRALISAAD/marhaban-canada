import { AdminScamChecksClient } from '@/components/admin/AdminScamChecksClient';
import { mockScamChecks } from '@/lib/admin/mock-data';

export default function AdminScamChecksPage() {
  return <AdminScamChecksClient mockScamChecks={mockScamChecks} />;
}
