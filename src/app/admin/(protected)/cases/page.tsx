import { AdminCasesClient } from '@/components/admin/AdminCasesClient';
import type { Locale } from '@/i18n/locales';
import { mockCases } from '@/lib/admin/mock-data';
import { createServerClient } from '@/lib/supabase/server';
import type { CaseFile, CaseStatus } from '@/types/admin';

type SupabaseCaseRow = {
  id: string;
  created_at: string;
  opened_at: string;
  last_contact_at: string | null;
  booking_id: string | null;
  client_name: string;
  email: string;
  city_province: string;
  preferred_language: string;
  status: string;
  next_step: string;
  action_plan: string[];
  internal_notes: string[];
};

function toCaseFile(row: SupabaseCaseRow): CaseFile {
  return {
    id: row.id,
    clientName: row.client_name,
    email: row.email,
    cityProvince: row.city_province,
    preferredLanguage: row.preferred_language as Locale,
    status: row.status as CaseStatus,
    openedAt: row.opened_at,
    lastContactAt: row.last_contact_at ?? undefined,
    nextStep: row.next_step,
    actionPlan: row.action_plan,
    internalNotes: row.internal_notes,
    bookingId: row.booking_id ?? undefined,
  };
}

async function getSupabaseCases() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('case_files')
      .select('id, created_at, opened_at, last_contact_at, booking_id, client_name, email, city_province, preferred_language, status, next_step, action_plan, internal_notes')
      .order('opened_at', { ascending: false });

    if (error) {
      console.error('Unable to load Supabase cases', error);
      return [];
    }

    return ((data ?? []) as SupabaseCaseRow[]).map(toCaseFile);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Supabase cases unavailable', error);
    }
    return [];
  }
}

export default async function AdminCasesPage() {
  const supabaseCases = await getSupabaseCases();
  const supabaseCaseIds = new Set(supabaseCases.map((caseFile) => caseFile.id));

  return (
    <AdminCasesClient
      supabaseCases={supabaseCases}
      supabaseCaseIds={supabaseCaseIds}
      mockCases={mockCases}
    />
  );
}
