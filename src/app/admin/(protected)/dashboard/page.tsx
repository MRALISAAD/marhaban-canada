export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { AdminBadge } from '@/components/admin/AdminBadge';
import { createServerClient } from '@/lib/supabase/server';
type PrepFormRow = {
  id: string;
  first_name: string;
  needs: string[];
  status: string;
};

const needLabels: Record<string, string> = {
  housing: 'Logement',
  documents: 'Documents',
  banking_money: 'Banque / argent',
  transport: 'Transport',
  studies: 'Études',
  work: 'Travail',
  health: 'Santé',
  scam_or_doubt: 'Arnaque / doute',
  dont_know: 'Ne sait pas',
  other: 'Autre',
};

function KpiChip({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  const active = highlight && value > 0;
  return (
    <div
      className={`rounded-2xl border p-4 ${active ? 'border-amber-200 bg-amber-50' : 'border-marhaban-leaf/12 bg-white'}`}
    >
      <p
        className={`font-heading text-3xl font-semibold leading-none ${active ? 'text-amber-700' : 'text-marhaban-forestDark'}`}
      >
        {value}
      </p>
      <p className="mt-1.5 text-xs font-semibold text-marhaban-muted">{label}</p>
    </div>
  );
}

async function getDashboardData() {
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from('booking_preparation_forms')
      .select('id, first_name, needs, status')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(50);
    return { prepForms: (data ?? []) as PrepFormRow[] };
  } catch {
    return { prepForms: [] };
  }
}

export default async function AdminDashboardPage() {
  const { prepForms } = await getDashboardData();

  const nouvelles = prepForms.filter((f) => f.status === 'form_submitted').length;
  const aContacter = prepForms.filter((f) =>
    ['form_submitted', 'contacted', 'calendly_pending'].includes(f.status),
  ).length;
  const confirmees = prepForms.filter((f) =>
    ['confirmed_manually', 'calendly_confirmed'].includes(f.status),
  ).length;
  const completees = prepForms.filter((f) => f.status === 'completed').length;

  const priorityItems = prepForms
    .filter((f) => f.status === 'form_submitted')
    .slice(0, 5)
    .map((f) => ({
      id: f.id,
      name: f.first_name || 'Sans nom',
      category: f.needs.slice(0, 2).map((n) => needLabels[n] ?? n).join(', ') || '—',
    }));

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl font-semibold leading-tight text-marhaban-forestDark">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-marhaban-muted">
            Vue rapide des demandes et actions à traiter.
          </p>
        </div>
        <AdminBadge label="Espace admin sécurisé" tone="success" />
      </div>

      {/* KPI chips */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiChip label="Nouvelles" value={nouvelles} highlight />
        <KpiChip label="À contacter" value={aContacter} />
        <KpiChip label="Confirmées" value={confirmees} />
        <KpiChip label="Complétées" value={completees} />
      </div>

      {/* Priority panel */}
      <div className="rounded-2xl border border-marhaban-leaf/12 bg-white p-5">
        <h2 className="font-heading text-base font-semibold text-marhaban-forestDark">
          À traiter maintenant
        </h2>
        <div className="mt-3 space-y-1">
          {priorityItems.map((item) => (
            <Link
              key={item.id}
              href="/admin/bookings"
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-marhaban-cream/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/30"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-marhaban-forestDark">
                  {item.name}
                </p>
                <p className="truncate text-xs text-marhaban-muted">{item.category}</p>
              </div>
              <span className="shrink-0 text-xs font-bold text-marhaban-clay transition group-hover:text-marhaban-forestDark">
                Ouvrir →
              </span>
            </Link>
          ))}
          {priorityItems.length === 0 ? (
            <p className="px-3 py-2 text-sm text-marhaban-muted">
              Rien à traiter pour le moment.
            </p>
          ) : null}
        </div>
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: 'Réservations', href: '/admin/bookings' },
          { label: 'Ressources', href: '/admin/resources' },
          { label: 'Paramètres', href: '/admin/settings' },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex min-h-[36px] items-center rounded-full border border-marhaban-leaf/18 bg-white px-4 py-1.5 text-sm font-semibold text-marhaban-ink transition hover:border-marhaban-leaf/35 hover:bg-marhaban-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/30"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
