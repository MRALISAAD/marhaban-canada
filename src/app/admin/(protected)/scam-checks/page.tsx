export const dynamic = 'force-dynamic';

import { AdminScamChecksClient } from '@/components/admin/AdminScamChecksClient';
import { createServerClient } from '@/lib/supabase/server';
import type { RiskLevel, ScamCheck } from '@/types/admin';

type SupabaseScamCheckRow = {
  id: string;
  created_at: string;
  requester_name: string;
  email: string;
  phone: string | null;
  city_province: string | null;
  situation: string;
  amount_requested: string | null;
  urgency: ScamCheck['urgency'];
  risk_level: RiskLevel;
  status: ScamCheck['status'];
  notes: string[] | null;
  recommendation: string | null;
};

type SupabaseScamCheck = ScamCheck & {
  phone?: string;
  cityProvince?: string;
  recommendation?: string;
};

function toScamCheck(row: SupabaseScamCheckRow): SupabaseScamCheck {
  return {
    id: row.id,
    createdAt: row.created_at,
    requesterName: row.requester_name,
    email: row.email,
    phone: row.phone ?? undefined,
    cityProvince: row.city_province ?? undefined,
    situation: row.situation,
    amountRequested: row.amount_requested ?? undefined,
    urgency: row.urgency,
    riskLevel: row.risk_level,
    status: row.status,
    notes: row.notes ?? [],
    recommendation: row.recommendation ?? undefined,
  };
}

async function getSupabaseScamChecks() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('scam_checks')
      .select('id, created_at, requester_name, email, phone, city_province, situation, amount_requested, urgency, risk_level, status, notes, recommendation')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Unable to load Supabase scam checks', error);
      return [];
    }

    return ((data ?? []) as SupabaseScamCheckRow[]).map(toScamCheck);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Supabase scam checks unavailable', error);
    }
    return [];
  }
}

export default async function AdminScamChecksPage() {
  const supabaseScamChecks = await getSupabaseScamChecks();
  return <AdminScamChecksClient supabaseScamChecks={supabaseScamChecks} />;
}
