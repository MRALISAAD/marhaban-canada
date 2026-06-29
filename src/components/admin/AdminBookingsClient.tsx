'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp, Copy, MessageCircle, X } from 'lucide-react';
import { AdminBadge } from '@/components/admin/AdminBadge';
import type { Booking, BookingPreparationForm, PreparationFormStatus } from '@/types/admin';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(value: string) {
  return new Intl.DateTimeFormat('fr-CA', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function displayName(form: Pick<BookingPreparationForm, 'firstName' | 'lastName'>): string {
  const first = form.firstName.trim();
  const last = form.lastName.trim();
  if (!first) return 'Sans nom';
  if (!last || last.toLowerCase() === 'non précisé') return first;
  return `${first} ${last}`;
}

// ─── Label maps ───────────────────────────────────────────────────────────────

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

const contactMethodLabels: Record<string, string> = {
  whatsapp: 'WhatsApp',
  calendly: 'Calendly',
  phone: 'Téléphone',
  no_preference: 'Peu importe',
  google_meet: 'Google Meet',
  any: 'Peu importe',
};

const locationStatusLabels: Record<string, string> = {
  already_canada: 'Déjà au Canada',
  preparing_arrival: "Prépare son arrivée",
  just_arrived: "Vient d'arriver",
  prefer_not_say: 'Préfère ne pas dire',
};

const statusLabel: Record<string, string> = {
  form_submitted: 'Nouveau',
  calendly_pending: 'Calendly en attente',
  calendly_confirmed: 'Calendly confirmé',
  contacted: 'Contacté',
  confirmed_manually: 'Confirmé',
  completed: 'Complété',
  cancelled: 'Annulé',
  no_show: 'Absent',
};

const statusTone: Record<string, string> = {
  form_submitted: 'border-amber-200 bg-amber-50 text-amber-700',
  calendly_pending: 'border-blue-200 bg-blue-50 text-blue-700',
  calendly_confirmed: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  contacted: 'border-sky-200 bg-sky-50 text-sky-700',
  confirmed_manually: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  completed: 'border-marhaban-leaf/20 bg-marhaban-mint/50 text-marhaban-forestDark',
  cancelled: 'border-red-200 bg-red-50 text-red-700',
  no_show: 'border-slate-200 bg-slate-100 text-slate-500',
};

const UPDATABLE_STATUSES: { value: PreparationFormStatus; label: string }[] = [
  { value: 'contacted', label: 'Marquer contacté' },
  { value: 'confirmed_manually', label: 'Confirmer' },
  { value: 'completed', label: 'Marquer complété' },
  { value: 'cancelled', label: 'Annuler' },
  { value: 'no_show', label: 'Absent' },
];

const TABS = [
  { key: 'all', label: 'Toutes' },
  { key: 'form_submitted', label: 'Nouvelles' },
  { key: 'contacted', label: 'Contactées' },
  { key: 'confirmed', label: 'Confirmées' },
  { key: 'completed', label: 'Complétées' },
  { key: 'cancelled', label: 'Annulées' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const tone = statusTone[status] ?? 'border-slate-200 bg-slate-50 text-slate-600';
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tone}`}>
      {statusLabel[status] ?? status}
    </span>
  );
}

function NeedsCell({ needs }: { needs: readonly string[] }) {
  const labels = needs.map((n) => needLabels[n] ?? n);
  if (labels.length === 0) return <span className="text-marhaban-muted/50">—</span>;
  return (
    <span>
      {labels.slice(0, 2).join(', ')}
      {labels.length > 2 ? (
        <span className="ml-1 rounded-full bg-marhaban-cream px-1.5 py-0.5 text-[10px] font-bold text-marhaban-muted">
          +{labels.length - 2}
        </span>
      ) : null}
    </span>
  );
}

type FormWithStatus = BookingPreparationForm & { status: PreparationFormStatus };

function BookingCard({
  form,
  isActive,
  onOpen,
}: {
  form: FormWithStatus;
  isActive: boolean;
  onOpen: (id: string) => void;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 transition ${
        isActive
          ? 'border-marhaban-leaf/30 bg-marhaban-mint/25'
          : 'border-marhaban-leaf/12 bg-white hover:border-marhaban-leaf/25 hover:bg-marhaban-cream/30'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-marhaban-forestDark">{displayName(form)}</span>
            <StatusBadge status={form.status} />
            {form.preferredContactMethod === 'calendly' ? (
              <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                Calendly demandé
              </span>
            ) : null}
          </div>
          <p className="mt-0.5 text-xs text-marhaban-muted">
            {form.email}
            {form.phone ? ` • ${form.phone}` : ''}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="whitespace-nowrap text-xs text-marhaban-muted">
            {formatDate(form.createdAt)}
          </span>
          <button
            type="button"
            onClick={() => onOpen(form.id)}
            className="inline-flex min-h-[30px] items-center rounded-full border border-marhaban-leaf/18 bg-marhaban-cream px-3 text-xs font-bold text-marhaban-forestDark transition hover:bg-marhaban-mint/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/30"
          >
            Voir
          </button>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-marhaban-muted">
        <NeedsCell needs={form.needs} />
        <span className="text-marhaban-muted/30">•</span>
        <span>{contactMethodLabels[form.preferredContactMethod] ?? form.preferredContactMethod}</span>
        {form.availability ? (
          <>
            <span className="text-marhaban-muted/30">•</span>
            <span className="max-w-[200px] truncate" title={form.availability}>
              {form.availability}
            </span>
          </>
        ) : null}
      </div>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type AdminBookingsClientProps = {
  supabaseBookings?: readonly Booking[];
  supabasePreparationForms?: readonly BookingPreparationForm[];
  supabaseConfigured?: boolean;
};

// ─── Component ────────────────────────────────────────────────────────────────

export function AdminBookingsClient({
  supabaseBookings = [],
  supabasePreparationForms = [],
  supabaseConfigured = true,
}: AdminBookingsClientProps) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TabKey>('all');

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [prepStatusOverrides, setPrepStatusOverrides] = useState<
    Record<string, PreparationFormStatus>
  >({});
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  const [legacyOpen, setLegacyOpen] = useState(false);

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [noteBody, setNoteBody] = useState('');
  const [noteSaving, setNoteSaving] = useState(false);
  const [noteSavedMsg, setNoteSavedMsg] = useState('');

  const forms = useMemo(
    () =>
      supabasePreparationForms.map((f) => ({
        ...f,
        status: (prepStatusOverrides[f.id] ?? f.status) as PreparationFormStatus,
      })),
    [supabasePreparationForms, prepStatusOverrides],
  );

  const selectedForm = selectedId ? forms.find((f) => f.id === selectedId) : undefined;

  const tabCounts = useMemo(
    () => ({
      all: forms.length,
      form_submitted: forms.filter((f) => f.status === 'form_submitted').length,
      contacted: forms.filter((f) => f.status === 'contacted').length,
      confirmed: forms.filter((f) =>
        ['confirmed_manually', 'calendly_confirmed'].includes(f.status),
      ).length,
      completed: forms.filter((f) => f.status === 'completed').length,
      cancelled: forms.filter((f) => f.status === 'cancelled').length,
    }),
    [forms],
  );

  const filteredForms = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return forms.filter((f) => {
      if (q) {
        const haystack =
          `${f.firstName} ${f.lastName} ${f.email} ${f.phone ?? ''}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (statusFilter !== 'all') {
        if (statusFilter === 'confirmed') {
          if (!['confirmed_manually', 'calendly_confirmed'].includes(f.status)) return false;
        } else {
          if (f.status !== statusFilter) return false;
        }
      }
      return true;
    });
  }, [forms, searchQuery, statusFilter]);

  const nouvelles = tabCounts.form_submitted;

  function openDrawer(id: string) {
    setSelectedId(id);
    setDrawerOpen(true);
    setSavedMessage('');
    setNoteBody('');
    setNoteSavedMsg('');
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  async function copyToClipboard(text: string, field: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1800);
    } catch {
      // browser permission denied
    }
  }

  async function updateStatus(id: string, status: PreparationFormStatus) {
    setPrepStatusOverrides((prev) => ({ ...prev, [id]: status }));
    setSavedMessage('');
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/preparation-forms/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const result = (await res.json()) as { ok?: boolean; error?: string };
      if (res.ok && result.ok === true) {
        setSavedMessage('Statut mis à jour.');
        router.refresh();
      } else {
        setSavedMessage(`Erreur : ${result.error ?? 'mise à jour impossible'}`);
      }
    } catch {
      setSavedMessage('Erreur de connexion.');
    } finally {
      setIsSaving(false);
    }
  }

  async function saveNote(formId: string) {
    if (!noteBody.trim()) return;
    setNoteSaving(true);
    setNoteSavedMsg('');
    try {
      const res = await fetch('/api/admin/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target_type: 'booking', target_id: formId, body: noteBody.trim() }),
      });
      const result = (await res.json()) as { ok?: boolean; error?: string };
      if (res.ok && result.ok) {
        setNoteBody('');
        setNoteSavedMsg('Note enregistrée.');
      } else {
        setNoteSavedMsg(`Erreur : ${result.error ?? "impossible d'enregistrer"}`);
      }
    } catch {
      setNoteSavedMsg('Erreur de connexion.');
    } finally {
      setNoteSaving(false);
    }
  }

  const hasActiveFilters = searchQuery.trim() !== '' || statusFilter !== 'all';

  return (
    <div className="space-y-4">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl font-semibold leading-tight text-marhaban-forestDark">
            Réservations
          </h1>
          <p className="mt-1 text-sm text-marhaban-muted">
            Demandes d&apos;appel gratuit reçues depuis le formulaire.
          </p>
        </div>
        {nouvelles > 0 ? (
          <AdminBadge
            label={`${nouvelles} nouvelle${nouvelles > 1 ? 's' : ''}`}
            tone="warning"
          />
        ) : null}
      </div>

      {/* ── Supabase warning ───────────────────────────────────────────────── */}
      {!supabaseConfigured ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Supabase n&apos;est pas configuré. Vérifie les variables d&apos;environnement.
        </div>
      ) : null}

      {/* ── Status tabs ────────────────────────────────────────────────────── */}
      <div className="flex gap-1.5 overflow-x-auto pb-0.5">
        {TABS.map((tab) => {
          const count = tabCounts[tab.key];
          const isActive = statusFilter === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setStatusFilter(tab.key)}
              className={`flex min-h-[34px] shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/30 ${
                isActive
                  ? 'bg-marhaban-forestDark text-white'
                  : 'border border-marhaban-leaf/18 bg-white text-marhaban-ink hover:bg-marhaban-cream'
              }`}
            >
              {tab.label}
              {count > 0 ? (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-marhaban-cream text-marhaban-muted'
                  }`}
                >
                  {count}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* ── Search ─────────────────────────────────────────────────────────── */}
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Rechercher nom, email ou téléphone"
        className="w-full rounded-xl border border-marhaban-leaf/18 bg-white px-4 py-2.5 text-sm text-marhaban-ink placeholder:text-marhaban-muted/60 focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/15"
      />

      {/* ── Card list ──────────────────────────────────────────────────────── */}
      {filteredForms.length > 0 ? (
        <div className="space-y-3">
          {filteredForms.map((form) => (
            <BookingCard
              key={form.id}
              form={form}
              isActive={form.id === selectedId && drawerOpen}
              onOpen={openDrawer}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-marhaban-leaf/10 bg-white p-8 text-center">
          <p className="text-sm font-semibold text-marhaban-forestDark">
            {hasActiveFilters
              ? 'Aucune demande ne correspond.'
              : 'Aucune demande pour le moment.'}
          </p>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
              }}
              className="mt-2 text-sm text-marhaban-clay underline-offset-2 hover:underline"
            >
              Réinitialiser les filtres
            </button>
          ) : null}
        </div>
      )}

      {/* ── Legacy bookings collapsible ─────────────────────────────────────── */}
      {supabaseBookings.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-marhaban-leaf/10 bg-white">
          <button
            type="button"
            onClick={() => setLegacyOpen((v) => !v)}
            className="flex w-full items-center justify-between px-5 py-3.5 text-sm transition hover:bg-marhaban-cream/40"
          >
            <span className="font-semibold text-marhaban-muted">
              Anciennes réservations ({supabaseBookings.length})
            </span>
            {legacyOpen ? (
              <ChevronUp className="h-4 w-4 text-marhaban-muted" />
            ) : (
              <ChevronDown className="h-4 w-4 text-marhaban-muted" />
            )}
          </button>
          {legacyOpen ? (
            <div className="overflow-x-auto border-t border-marhaban-leaf/10">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead>
                  <tr className="border-b border-marhaban-leaf/10 text-xs font-bold uppercase tracking-[0.10em] text-marhaban-muted">
                    <th className="py-3 pl-5 pr-4">Date</th>
                    <th className="px-4 py-3">Nom</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Service</th>
                    <th className="py-3 pl-4 pr-5">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-marhaban-leaf/8">
                  {supabaseBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="align-middle transition hover:bg-marhaban-cream/40"
                    >
                      <td className="whitespace-nowrap py-3 pl-5 pr-4 text-xs text-marhaban-muted">
                        {formatDate(booking.createdAt)}
                      </td>
                      <td className="px-4 py-3 font-semibold text-marhaban-forestDark">
                        {booking.fullName}
                      </td>
                      <td className="px-4 py-3 text-marhaban-ink/80">{booking.email}</td>
                      <td className="px-4 py-3 text-marhaban-ink/80">{booking.serviceLabel}</td>
                      <td className="py-3 pl-4 pr-5">
                        <span className="rounded-full bg-marhaban-cream px-2.5 py-0.5 text-xs font-semibold text-marhaban-ink">
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* ── Detail drawer ───────────────────────────────────────────────────── */}
      {drawerOpen ? (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Détail de la demande"
        >
          <div
            className="absolute inset-0 bg-marhaban-forestDark/20 backdrop-blur-[2px]"
            onClick={closeDrawer}
            aria-hidden="true"
          />

          <div className="relative z-10 flex h-full w-full max-w-md flex-col overflow-y-auto bg-white shadow-2xl sm:rounded-l-[2rem]">
            {selectedForm ? (
              <>
                {/* Drawer header */}
                <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-marhaban-leaf/12 bg-white/96 px-6 py-4 backdrop-blur-sm">
                  <div className="min-w-0">
                    <p className="font-heading text-lg font-semibold leading-tight text-marhaban-forestDark">
                      {displayName(selectedForm)}
                    </p>
                    <p className="mt-0.5 text-xs text-marhaban-muted">
                      {formatDate(selectedForm.createdAt)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <StatusBadge status={selectedForm.status} />
                    <button
                      type="button"
                      onClick={closeDrawer}
                      aria-label="Fermer"
                      className="rounded-full p-1.5 text-marhaban-muted transition hover:bg-marhaban-cream hover:text-marhaban-ink"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Drawer body */}
                <div className="flex-1 space-y-5 p-6">
                  {/* Contact */}
                  <section>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-marhaban-muted">
                      Contact
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-xl border border-marhaban-leaf/10 bg-marhaban-cream/60 px-4 py-3">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wide text-marhaban-muted">
                            Email
                          </p>
                          <p className="mt-0.5 text-sm text-marhaban-ink">
                            {selectedForm.email}
                          </p>
                        </div>
                        <button
                          type="button"
                          title="Copier l'email"
                          onClick={() => void copyToClipboard(selectedForm.email, 'email')}
                          className="rounded-full p-1.5 text-marhaban-muted transition hover:bg-white hover:text-marhaban-ink"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>

                      {selectedForm.phone ? (
                        <div className="flex items-center justify-between rounded-xl border border-marhaban-leaf/10 bg-marhaban-cream/60 px-4 py-3">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wide text-marhaban-muted">
                              Téléphone
                            </p>
                            <p className="mt-0.5 text-sm text-marhaban-ink">
                              {selectedForm.phone}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              title="Copier le numéro"
                              onClick={() =>
                                void copyToClipboard(selectedForm.phone!, 'phone')
                              }
                              className="rounded-full p-1.5 text-marhaban-muted transition hover:bg-white hover:text-marhaban-ink"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                            <a
                              href={`https://wa.me/${selectedForm.phone.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Ouvrir WhatsApp"
                              className="rounded-full p-1.5 text-emerald-600 transition hover:bg-emerald-50"
                            >
                              <MessageCircle className="h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      ) : null}

                      <div className="rounded-xl border border-marhaban-leaf/10 bg-marhaban-cream/60 px-4 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-marhaban-muted">
                          Méthode préférée
                        </p>
                        <p className="mt-0.5 text-sm text-marhaban-ink">
                          {contactMethodLabels[selectedForm.preferredContactMethod] ??
                            selectedForm.preferredContactMethod}
                          {selectedForm.preferredContactMethod === 'calendly' ? (
                            <span className="ml-1.5 inline-flex rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                              Calendly demandé
                            </span>
                          ) : null}
                        </p>
                      </div>
                    </div>
                    {copiedField ? (
                      <p className="mt-1.5 text-xs font-semibold text-marhaban-clay">Copié !</p>
                    ) : null}
                  </section>

                  {/* Details */}
                  <section>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-marhaban-muted">
                      Détails
                    </p>
                    <dl className="space-y-3 text-sm">
                      <div>
                        <dt className="font-bold text-marhaban-forestDark">Besoins</dt>
                        <dd className="mt-0.5 text-marhaban-muted">
                          {selectedForm.needs.map((n) => needLabels[n] ?? n).join(', ') || '—'}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-bold text-marhaban-forestDark">Situation géographique</dt>
                        <dd className="mt-0.5 text-marhaban-muted">
                          {locationStatusLabels[selectedForm.locationStatus] ??
                            selectedForm.locationStatus}
                        </dd>
                      </div>
                      {selectedForm.situation ? (
                        <div>
                          <dt className="font-bold text-marhaban-forestDark">Situation</dt>
                          <dd className="mt-0.5 whitespace-pre-wrap leading-relaxed text-marhaban-muted">
                            {selectedForm.situation}
                          </dd>
                        </div>
                      ) : null}
                      {selectedForm.availability ? (
                        <div>
                          <dt className="font-bold text-marhaban-forestDark">Disponibilités</dt>
                          <dd className="mt-0.5 whitespace-pre-wrap leading-relaxed text-marhaban-muted">
                            {selectedForm.availability}
                          </dd>
                        </div>
                      ) : null}
                      <div>
                        <dt className="font-bold text-marhaban-forestDark">Consentements</dt>
                        <dd className="mt-0.5 space-y-0.5 text-marhaban-muted">
                          <p>Données : {selectedForm.consent ? '✓' : '✗'}</p>
                          <p>Politique : {selectedForm.privacyNoticeAccepted ? '✓' : '✗'}</p>
                          <p>Marketing : {selectedForm.marketingConsent ? '✓' : '✗'}</p>
                        </dd>
                      </div>
                    </dl>
                  </section>

                  {/* Status update */}
                  <section>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-marhaban-muted">
                      Actions
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {UPDATABLE_STATUSES.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          disabled={isSaving || selectedForm.status === opt.value}
                          onClick={() => void updateStatus(selectedForm.id, opt.value)}
                          className={`inline-flex min-h-[32px] items-center rounded-full border px-3 py-1 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                            selectedForm.status === opt.value
                              ? 'border-marhaban-leaf/40 bg-marhaban-mint/60 text-marhaban-forestDark'
                              : 'border-marhaban-leaf/15 bg-white text-marhaban-ink hover:bg-marhaban-cream'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    {savedMessage ? (
                      <p className="mt-1.5 text-xs font-semibold text-marhaban-clay">
                        {savedMessage}
                      </p>
                    ) : null}
                  </section>

                  {/* Admin note */}
                  <section>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-marhaban-muted">
                      Note admin
                    </p>
                    <textarea
                      value={noteBody}
                      onChange={(e) => setNoteBody(e.target.value)}
                      placeholder="Ajouter une note interne…"
                      rows={3}
                      maxLength={2000}
                      className="w-full resize-none rounded-xl border border-marhaban-leaf/18 bg-marhaban-cream/50 px-3 py-2.5 text-sm text-marhaban-ink placeholder:text-marhaban-muted/50 focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/15"
                    />
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        type="button"
                        disabled={!noteBody.trim() || noteSaving}
                        onClick={() => void saveNote(selectedForm.id)}
                        className="inline-flex min-h-[32px] items-center rounded-full border border-marhaban-leaf/18 bg-marhaban-forestDark px-4 text-xs font-bold text-white transition hover:bg-marhaban-clay disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {noteSaving ? 'Enregistrement…' : 'Enregistrer'}
                      </button>
                      {noteSavedMsg ? (
                        <p className="text-xs font-semibold text-marhaban-clay">{noteSavedMsg}</p>
                      ) : null}
                    </div>
                  </section>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center p-8">
                <p className="text-sm text-marhaban-muted">Demande introuvable.</p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
