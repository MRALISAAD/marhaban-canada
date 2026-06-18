export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { AdminBadge, BookingStatusBadge, RiskLevelBadge } from '@/components/admin/AdminBadge';
import { AdminCard } from '@/components/admin/AdminCard';
import { createServerClient } from '@/lib/supabase/server';
import type { BookingStatus, RiskLevel } from '@/types/admin';

type BookingRow = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  service_label: string;
  preferred_language: string;
  status: BookingStatus;
  message: string;
  next_action: string | null;
};

type ScamCheckRow = {
  id: string;
  created_at: string;
  requester_name: string;
  email: string;
  situation: string;
  amount_requested: string | null;
  risk_level: RiskLevel;
  status: string;
};

type CaseRow = {
  id: string;
  status: string;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('fr-CA', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function startOfCurrentMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
}

async function getDashboardData() {
  try {
    const supabase = createServerClient();

    const [bookingsResult, casesResult, scamChecksResult] = await Promise.all([
      supabase
        .from('bookings')
        .select('id, created_at, full_name, email, service_label, preferred_language, status, message, next_action')
        .order('created_at', { ascending: false })
        .limit(20),
      supabase
        .from('case_files')
        .select('id, status'),
      supabase
        .from('scam_checks')
        .select('id, created_at, requester_name, email, situation, amount_requested, risk_level, status')
        .order('created_at', { ascending: false })
        .limit(20),
    ]);

    return {
      bookings: (bookingsResult.data ?? []) as BookingRow[],
      cases: (casesResult.data ?? []) as CaseRow[],
      scamChecks: (scamChecksResult.data ?? []) as ScamCheckRow[],
    };
  } catch {
    return { bookings: [], cases: [], scamChecks: [] };
  }
}

const PENDING_BOOKING_STATUSES = new Set(['new', 'to_contact', 'slot_proposed']);
const ACTIVE_CASE_STATUSES = new Set(['new', 'active', 'waiting_client', 'next_step']);

export default async function AdminDashboardPage() {
  const { bookings, cases, scamChecks } = await getDashboardData();

  const monthStart = startOfCurrentMonth();
  const bookingsThisMonth = bookings.filter((b) => b.created_at >= monthStart).length;
  const pendingBookings = bookings.filter((b) => PENDING_BOOKING_STATUSES.has(b.status));
  const activeCases = cases.filter((c) => ACTIVE_CASE_STATUSES.has(c.status));
  const pendingScamChecks = scamChecks.filter((s) => s.status === 'new' || s.status === 'reviewing');

  const kpis = [
    {
      label: 'Réservations ce mois',
      value: bookingsThisMonth,
      detail: `${pendingBookings.length} à suivre`,
      accent: 'Demandes reçues',
    },
    {
      label: 'Dossiers actifs',
      value: activeCases.length,
      detail: `${cases.length} au total`,
      accent: 'Accompagnement',
    },
    {
      label: 'Demandes anti-arnaque',
      value: scamChecks.length,
      detail: `${pendingScamChecks.length} non traitée(s)`,
      accent: 'Évaluation informative',
    },
    {
      label: 'En attente',
      value: pendingBookings.length + pendingScamChecks.length,
      detail: 'Réservations + évaluations',
      accent: 'Priorité admin',
    },
  ];

  const priorityItems = [
    ...pendingBookings
      .filter((b) => b.status === 'new' || b.status === 'to_contact')
      .slice(0, 3)
      .map((b) => ({
        id: b.id,
        type: 'Réservation',
        title: b.full_name,
        text: b.next_action ?? b.message,
        href: '/admin/bookings',
        tone: 'warning' as const,
      })),
    ...scamChecks
      .filter((s) => s.risk_level === 'high' || s.risk_level === 'urgent' || s.status === 'new')
      .slice(0, 3)
      .map((s) => ({
        id: s.id,
        type: 'Anti-arnaque',
        title: s.requester_name,
        text: s.situation,
        href: '/admin/scam-checks',
        tone: (s.risk_level === 'high' || s.risk_level === 'urgent') ? 'danger' as const : 'neutral' as const,
      })),
  ].slice(0, 5);

  const recentBookings = bookings.slice(0, 8);
  const recentScamChecks = scamChecks.slice(0, 6);

  return (
    <div className="space-y-6">
      <header className="rounded-[1.75rem] border border-marhaban-leaf/12 bg-white/85 p-6 shadow-warm-sm">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">Vue d&apos;ensemble</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-semibold leading-tight text-marhaban-forestDark sm:text-4xl">
              Dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-marhaban-muted sm:text-base">
              Demandes récentes à traiter. Données synchronisées avec Supabase.
            </p>
          </div>
          <AdminBadge label="Espace admin sécurisé" tone="success" />
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Indicateurs admin">
        {kpis.map((item) => (
          <AdminCard key={item.label} className="p-5 transition hover:-translate-y-0.5 hover:shadow-warm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">{item.label}</p>
                <p className="mt-4 font-heading text-4xl font-semibold leading-none text-marhaban-forestDark">
                  {item.value}
                </p>
              </div>
              <span className="mt-1 h-3 w-3 rounded-full bg-marhaban-gold" aria-hidden="true" />
            </div>
            <p className="mt-3 text-sm font-semibold text-marhaban-forestDark">{item.accent}</p>
            <p className="mt-1 text-sm leading-relaxed text-marhaban-muted">{item.detail}</p>
          </AdminCard>
        ))}
      </section>

      <AdminCard title="À traiter en priorité" eyebrow="Opérations">
        <div className="grid gap-3">
          {priorityItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group grid gap-3 rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 p-4 transition hover:border-marhaban-clay/25 hover:bg-marhaban-mint/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 sm:grid-cols-[auto_1fr_auto] sm:items-center"
            >
              <AdminBadge label={item.type} tone={item.tone} />
              <div>
                <p className="font-semibold text-marhaban-forestDark">{item.title}</p>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-marhaban-muted">{item.text}</p>
              </div>
              <span className="text-sm font-bold text-marhaban-clay transition group-hover:text-marhaban-forestDark">
                Ouvrir
              </span>
            </Link>
          ))}
          {priorityItems.length === 0 ? (
            <p className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 p-4 text-sm text-marhaban-muted">
              Rien à traiter pour le moment.
            </p>
          ) : null}
        </div>
      </AdminCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminCard title="Dernières réservations" eyebrow="Demandes">
          {recentBookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead>
                  <tr className="border-b border-marhaban-leaf/12 text-xs font-bold uppercase tracking-[0.12em] text-marhaban-muted">
                    <th className="py-3 pr-4">Nom</th>
                    <th className="px-4 py-3">Service</th>
                    <th className="px-4 py-3">Langue</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="py-3 pl-4">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-marhaban-leaf/10">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="align-top">
                      <td className="py-4 pr-4">
                        <p className="font-semibold text-marhaban-forestDark">{booking.full_name}</p>
                        <p className="mt-1 text-xs text-marhaban-muted">{booking.email}</p>
                      </td>
                      <td className="px-4 py-4 text-marhaban-ink/80">{booking.service_label}</td>
                      <td className="px-4 py-4 uppercase text-marhaban-ink/80">{booking.preferred_language}</td>
                      <td className="px-4 py-4 text-marhaban-ink/80">{formatDate(booking.created_at)}</td>
                      <td className="py-4 pl-4">
                        <BookingStatusBadge status={booking.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 p-4 text-sm text-marhaban-muted">
              Aucune réservation pour le moment.
            </p>
          )}
        </AdminCard>

        <AdminCard title="Demandes anti-arnaque récentes" eyebrow="Risque">
          {recentScamChecks.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead>
                  <tr className="border-b border-marhaban-leaf/12 text-xs font-bold uppercase tracking-[0.12em] text-marhaban-muted">
                    <th className="py-3 pr-4">Personne</th>
                    <th className="px-4 py-3">Signaux à vérifier</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="py-3 pl-4">Risque</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-marhaban-leaf/10">
                  {recentScamChecks.map((check) => (
                    <tr key={check.id} className="align-top">
                      <td className="py-4 pr-4">
                        <p className="font-semibold text-marhaban-forestDark">{check.requester_name}</p>
                        <p className="mt-1 text-xs text-marhaban-muted">{check.email}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="line-clamp-2 text-marhaban-ink/80">{check.situation}</p>
                        {check.amount_requested ? (
                          <p className="mt-1 text-xs font-semibold text-marhaban-clay">{check.amount_requested}</p>
                        ) : null}
                      </td>
                      <td className="px-4 py-4 text-marhaban-ink/80">{formatDate(check.created_at)}</td>
                      <td className="py-4 pl-4">
                        <RiskLevelBadge riskLevel={check.risk_level} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 p-4 text-sm text-marhaban-muted">
              Aucune demande anti-arnaque pour le moment.
            </p>
          )}
        </AdminCard>
      </div>
    </div>
  );
}
