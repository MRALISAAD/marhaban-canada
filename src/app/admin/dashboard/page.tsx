import Link from 'next/link';
import { AdminBadge, BookingStatusBadge, RiskLevelBadge } from '@/components/admin/AdminBadge';
import { AdminCard } from '@/components/admin/AdminCard';
import { mockBookings, mockCases, mockScamChecks } from '@/lib/admin/mock-data';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('fr-CA', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

const activeCases = mockCases.filter((item) => item.status === 'active' || item.status === 'next_step');
const pendingBookings = mockBookings.filter((item) => ['new', 'to_contact', 'slot_proposed'].includes(item.status));
const pendingScamChecks = mockScamChecks.filter((item) => item.status === 'new' || item.riskLevel === 'unreviewed');
const priorityItems = [
  ...mockBookings
    .filter((item) => item.status === 'new' || item.status === 'to_contact')
    .map((item) => ({
      id: item.id,
      type: 'Réservation',
      title: item.fullName,
      text: item.nextAction ?? item.message,
      href: '/admin/bookings',
      tone: 'warning' as const,
    })),
  ...mockScamChecks
    .filter((item) => item.riskLevel === 'high' || item.riskLevel === 'urgent' || item.riskLevel === 'unreviewed')
    .map((item) => ({
      id: item.id,
      type: 'Anti-arnaque',
      title: item.requesterName,
      text: item.situation,
      href: '/admin/scam-checks',
      tone: item.riskLevel === 'unreviewed' ? 'neutral' as const : 'danger' as const,
    })),
].slice(0, 5);

const kpis = [
  {
    label: 'Réservations ce mois',
    value: mockBookings.length,
    detail: `${pendingBookings.length} à suivre`,
    accent: 'Demandes reçues',
  },
  {
    label: 'Dossiers actifs',
    value: activeCases.length,
    detail: `${mockCases.length} dossiers mock`,
    accent: 'Accompagnement',
  },
  {
    label: 'Demandes anti-arnaque',
    value: mockScamChecks.length,
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

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[1.75rem] border border-marhaban-clay/20 bg-[#fff4e8] px-5 py-4 text-sm leading-relaxed text-marhaban-ink shadow-warm-sm">
        <span className="font-bold text-marhaban-clay">Admin MVP mock/local</span>
        <span className="text-marhaban-ink/75"> — non prêt production sans authentification.</span>
      </div>

      <header className="rounded-[1.75rem] border border-marhaban-leaf/12 bg-white/85 p-6 shadow-warm-sm">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">Vue d’ensemble</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-semibold leading-tight text-marhaban-forestDark sm:text-4xl">
              Dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-marhaban-muted sm:text-base">
              Vue locale des demandes à traiter. Cette interface n’est pas prête production sans authentification.
            </p>
          </div>
          <AdminBadge label="Mock data" tone="dark" />
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
              Aucune priorité mock à traiter pour le moment.
            </p>
          ) : null}
        </div>
      </AdminCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminCard title="Dernières réservations" eyebrow="Demandes">
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
                {mockBookings.map((booking) => (
                  <tr key={booking.id} className="align-top">
                    <td className="py-4 pr-4">
                      <p className="font-semibold text-marhaban-forestDark">{booking.fullName}</p>
                      <p className="mt-1 text-xs text-marhaban-muted">{booking.email}</p>
                    </td>
                    <td className="px-4 py-4 text-marhaban-ink/80">{booking.serviceLabel}</td>
                    <td className="px-4 py-4 uppercase text-marhaban-ink/80">{booking.preferredLanguage}</td>
                    <td className="px-4 py-4 text-marhaban-ink/80">{formatDate(booking.createdAt)}</td>
                    <td className="py-4 pl-4">
                      <BookingStatusBadge status={booking.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminCard>

        <AdminCard title="Demandes anti-arnaque récentes" eyebrow="Risque">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead>
                <tr className="border-b border-marhaban-leaf/12 text-xs font-bold uppercase tracking-[0.12em] text-marhaban-muted">
                  <th className="py-3 pr-4">Personne</th>
                  <th className="px-4 py-3">Situation</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="py-3 pl-4">Risque</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-marhaban-leaf/10">
                {mockScamChecks.map((check) => (
                  <tr key={check.id} className="align-top">
                    <td className="py-4 pr-4">
                      <p className="font-semibold text-marhaban-forestDark">{check.requesterName}</p>
                      <p className="mt-1 text-xs text-marhaban-muted">{check.email}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="line-clamp-2 text-marhaban-ink/80">{check.situation}</p>
                      {check.amountRequested ? (
                        <p className="mt-1 text-xs font-semibold text-marhaban-clay">{check.amountRequested}</p>
                      ) : null}
                    </td>
                    <td className="px-4 py-4 text-marhaban-ink/80">{formatDate(check.createdAt)}</td>
                    <td className="py-4 pl-4">
                      <RiskLevelBadge riskLevel={check.riskLevel} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
