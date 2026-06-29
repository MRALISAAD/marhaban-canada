'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Archive, CheckCircle2, Eye, FileText, MailCheck, PlusCircle } from 'lucide-react';
import { AdminBadge, BookingStatusBadge } from '@/components/admin/AdminBadge';
import { AdminCard } from '@/components/admin/AdminCard';
import { AdminNotesPanel } from '@/components/admin/AdminNotesPanel';
import type { Booking, BookingPreparationForm, BookingStatus, PreparationFormStatus } from '@/types/admin';

type AdminBookingsClientProps = {
  supabaseBookings?: readonly Booking[];
  supabaseCaseBookingIds?: readonly string[];
  supabasePreparationForms?: readonly BookingPreparationForm[];
  supabaseConfigured?: boolean;
};

type EditableBooking = Booking & {
  internalNote?: string;
};

type BookingOverrides = Record<string, Partial<EditableBooking>>;

function formatDate(value: string) {
  return new Intl.DateTimeFormat('fr-CA', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

const serviceLabels = {
  discovery: 'Appel découverte',
  orientation: 'Orientation',
  anti_scam: 'Anti-arnaque',
} as const;

const statusOptions = ['Tous les statuts', 'Nouvelle', 'À contacter', 'Créneau proposé', 'Confirmée', 'Terminée', 'Annulée', 'Archivée'];
const serviceOptions = ['Tous les appels', 'Appel découverte', 'Orientation', 'Anti-arnaque'];

const needLabels: Record<string, string> = {
  housing: 'Logement',
  documents: 'Documents',
  banking_money: 'Banque / argent',
  transport: 'Transport',
  studies: 'Études',
  work: 'Travail',
  health: 'Santé',
  scam_or_doubt: 'Arnaque / doute',
  dont_know: 'Ne sait pas par où commencer',
  other: 'Autre',
};

const urgencyLabels: Record<string, string> = {
  no: 'Non',
  this_week: 'Cette semaine',
  today_tomorrow: "Aujourd'hui ou demain",
};

const contactMethodLabels: Record<string, string> = {
  whatsapp: 'WhatsApp',
  calendly: 'Calendly',
  phone: 'Téléphone',
  no_preference: 'Peu importe',
  // legacy values kept for existing rows
  google_meet: 'Google Meet',
  any: 'Peu importe',
};

const preparationStatusLabels: Record<PreparationFormStatus, string> = {
  form_submitted: 'Nouveau',
  calendly_pending: 'Calendly en attente',
  calendly_confirmed: 'Calendly confirmé',
  contacted: 'Contacté',
  confirmed_manually: 'Confirmé manuellement',
  completed: 'Terminé',
  cancelled: 'Annulé',
  no_show: 'Absent',
};

const preparationStatusTone: Record<PreparationFormStatus, string> = {
  form_submitted: 'bg-marhaban-gold/15 text-marhaban-clay border-marhaban-gold/30',
  calendly_pending: 'bg-blue-50 text-blue-700 border-blue-200',
  calendly_confirmed: 'bg-marhaban-mint/50 text-marhaban-leaf border-marhaban-leaf/20',
  contacted: 'bg-marhaban-mint/50 text-marhaban-leaf border-marhaban-leaf/20',
  confirmed_manually: 'bg-marhaban-mint/70 text-marhaban-forestDark border-marhaban-leaf/30',
  completed: 'bg-marhaban-mint/70 text-marhaban-forestDark border-marhaban-leaf/30',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
  no_show: 'bg-slate-100 text-slate-600 border-slate-200',
};

const ADMIN_STATUS_OPTIONS: { value: PreparationFormStatus; label: string }[] = [
  { value: 'contacted', label: 'Contacté' },
  { value: 'confirmed_manually', label: 'Confirmé manuellement' },
  { value: 'completed', label: 'Terminé' },
  { value: 'cancelled', label: 'Annulé' },
  { value: 'no_show', label: 'Absent' },
];

function PreparationStatusBadge({ status }: { status: PreparationFormStatus }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${preparationStatusTone[status] ?? 'bg-slate-50 text-slate-600 border-slate-200'}`}
    >
      {preparationStatusLabels[status] ?? status}
    </span>
  );
}

function applyOverride(booking: Booking, overrides: BookingOverrides): EditableBooking {
  return { ...booking, ...overrides[booking.id] };
}

export function AdminBookingsClient({
  supabaseBookings = [],
  supabaseCaseBookingIds = [],
  supabasePreparationForms = [],
  supabaseConfigured = true,
}: AdminBookingsClientProps) {
  const router = useRouter();
  const [bookingOverrides, setBookingOverrides] = useState<BookingOverrides>({});
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [selectedPreparationId, setSelectedPreparationId] = useState<string | null>(null);
  const [prepStatusOverrides, setPrepStatusOverrides] = useState<Record<string, PreparationFormStatus>>({});
  const [noteDraft, setNoteDraft] = useState('');
  const [noteEditorIsOpen, setNoteEditorIsOpen] = useState(false);
  const [caseMessage, setCaseMessage] = useState('');
  const [isCreatingCase, setIsCreatingCase] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  const bookings = useMemo(
    () => supabaseBookings.map((booking) => applyOverride(booking, bookingOverrides)),
    [bookingOverrides, supabaseBookings],
  );
  const allCaseBookingIds = useMemo(() => new Set(supabaseCaseBookingIds), [supabaseCaseBookingIds]);
  const selectedBooking = selectedBookingId ? bookings.find((b) => b.id === selectedBookingId) : undefined;

  const preparationForms = useMemo(
    () =>
      supabasePreparationForms.map((form) => ({
        ...form,
        status: (prepStatusOverrides[form.id] ?? form.status) as PreparationFormStatus,
      })),
    [supabasePreparationForms, prepStatusOverrides],
  );
  const selectedPreparation = selectedPreparationId
    ? preparationForms.find((form) => form.id === selectedPreparationId)
    : undefined;

  function applyOverrideUpdate(id: string, updates: Partial<EditableBooking>) {
    setBookingOverrides((current) => ({
      ...current,
      [id]: { ...current[id], ...updates },
    }));
  }

  function selectBooking(booking: EditableBooking) {
    setSelectedBookingId(booking.id);
    setSelectedPreparationId(null);
    setNoteDraft(booking.internalNote ?? '');
    setNoteEditorIsOpen(false);
    setCaseMessage('');
    setSavedMessage('');
  }

  function selectPreparation(form: BookingPreparationForm) {
    setSelectedPreparationId(form.id);
    setSelectedBookingId(null);
    setNoteEditorIsOpen(false);
    setCaseMessage('');
    setSavedMessage('');
  }

  async function persistBooking(id: string, payload: Record<string, unknown>) {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json() as { ok?: boolean; error?: string; item?: { status: BookingStatus; internal_note?: string; next_action?: string } };
      if (res.ok && result.ok === true) {
        setSavedMessage('Sauvegardé.');
        if (result.item) {
          applyOverrideUpdate(id, {
            status: result.item.status,
            internalNote: result.item.internal_note ?? undefined,
            nextAction: result.item.next_action ?? undefined,
          });
        }
        router.refresh();
      } else {
        setSavedMessage(`Erreur : ${result.error || 'sauvegarde impossible'}`);
      }
    } catch {
      setSavedMessage('Erreur de connexion.');
    } finally {
      setIsSaving(false);
    }
  }

  async function updatePreparationStatus(id: string, status: PreparationFormStatus) {
    setPrepStatusOverrides((current) => ({ ...current, [id]: status }));
    setSavedMessage('');
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/preparation-forms/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const result = await res.json() as { ok?: boolean; error?: string };
      if (res.ok && result.ok === true) {
        setSavedMessage('Statut mis à jour.');
        router.refresh();
      } else {
        setSavedMessage(`Erreur : ${result.error || 'mise à jour impossible'}`);
      }
    } catch {
      setSavedMessage('Erreur de connexion.');
    } finally {
      setIsSaving(false);
    }
  }

  function updateBookingStatus(booking: EditableBooking, status: BookingStatus) {
    applyOverrideUpdate(booking.id, { status });
    selectBooking({ ...booking, status });
    void persistBooking(booking.id, { status });
  }

  function openNoteEditor(booking: EditableBooking) {
    selectBooking(booking);
    setNoteDraft(booking.internalNote ?? '');
    setNoteEditorIsOpen(true);
  }

  function saveNote() {
    if (!selectedBooking) return;
    const trimmed = noteDraft.trim();
    applyOverrideUpdate(selectedBooking.id, { internalNote: trimmed });
    setNoteEditorIsOpen(false);
    void persistBooking(selectedBooking.id, { internal_note: trimmed });
  }

  function archiveBooking(booking: EditableBooking) {
    if (!window.confirm(`Archiver la réservation de ${booking.fullName} ?`)) return;
    updateBookingStatus(booking, 'archived');
  }

  async function createCaseFromBooking(booking: EditableBooking) {
    if (allCaseBookingIds.has(booking.id)) {
      setCaseMessage('Dossier déjà créé.');
      return;
    }

    setIsCreatingCase(true);
    try {
      const response = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: booking.fullName,
          email: booking.email,
          phone: booking.phone,
          cityProvince: booking.cityProvince,
          preferredLanguage: booking.preferredLanguage,
          message: booking.message,
          situation: booking.message,
          bookingId: booking.id,
          internalNote: booking.internalNote,
        }),
      });
      const result = await response.json() as { ok?: boolean; error?: string };

      if (response.ok && result.ok === true) {
        setCaseMessage('Dossier créé.');
        router.refresh();
      } else {
        setCaseMessage(`Erreur : ${result.error || 'création impossible'}`);
      }
    } catch {
      setCaseMessage('Erreur de connexion.');
    } finally {
      setIsCreatingCase(false);
    }
  }

  const newSubmissions = preparationForms.filter((f) => f.status === 'form_submitted').length;

  return (
    <div className="space-y-6">
      <header className="rounded-[1.75rem] border border-marhaban-leaf/12 bg-white/85 p-6 shadow-warm-sm">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">Demandes</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-semibold leading-tight text-marhaban-forestDark sm:text-4xl">
              Réservations
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-marhaban-muted sm:text-base">
              Suivre les demandes reçues depuis la page réservation.
            </p>
          </div>
          {newSubmissions > 0 ? (
            <AdminBadge label={`${newSubmissions} nouvelle(s)`} tone="warning" />
          ) : preparationForms.length > 0 ? (
            <AdminBadge label={`${preparationForms.length} demande(s)`} tone="success" />
          ) : null}
        </div>
      </header>

      {!supabaseConfigured ? (
        <AdminCard title="Configuration" eyebrow="Supabase">
          <p className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 p-4 text-sm font-semibold text-marhaban-muted">
            Supabase n&apos;est pas configuré.
          </p>
        </AdminCard>
      ) : null}

      {/* Preparation Forms */}
      <AdminCard title="Demandes d'appel gratuit" eyebrow="Formulaire">
        {preparationForms.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1120px] text-left text-sm">
              <thead>
                <tr className="border-b border-marhaban-leaf/12 text-xs font-bold uppercase tracking-[0.12em] text-marhaban-muted">
                  <th className="py-3 pr-4">Date</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="py-3 pr-4">Nom</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Téléphone</th>
                  <th className="px-4 py-3">Besoins</th>
                  <th className="px-4 py-3">Urgence</th>
                  <th className="px-4 py-3">Disponibilités</th>
                  <th className="px-4 py-3">Méthode</th>
                  <th className="py-3 pl-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-marhaban-leaf/10">
                {preparationForms.map((form) => (
                  <tr key={form.id} className="align-top transition hover:bg-marhaban-cream/70">
                    <td className="py-4 pr-4 text-marhaban-ink/80">{formatDate(form.createdAt)}</td>
                    <td className="px-4 py-4">
                      <PreparationStatusBadge status={form.status} />
                    </td>
                    <td className="py-4 pr-4">
                      <p className="font-semibold text-marhaban-forestDark">
                        {form.firstName} {form.lastName}
                      </p>
                      <p className="mt-0.5 text-xs uppercase text-marhaban-muted">{form.locale}</p>
                    </td>
                    <td className="px-4 py-4 text-marhaban-ink/80">{form.email}</td>
                    <td className="px-4 py-4 text-marhaban-ink/80">{form.phone || '—'}</td>
                    <td className="px-4 py-4 text-marhaban-ink/80">
                      {form.needs.slice(0, 2).map((n) => needLabels[n] ?? n).join(', ')}
                      {form.needs.length > 2 ? ` +${form.needs.length - 2}` : ''}
                    </td>
                    <td className="px-4 py-4 text-marhaban-ink/80">
                      {form.urgency ? urgencyLabels[form.urgency] ?? form.urgency : '—'}
                    </td>
                    <td className="max-w-[220px] truncate px-4 py-4 text-marhaban-ink/80" title={form.availability}>
                      {form.availability}
                    </td>
                    <td className="px-4 py-4 text-marhaban-ink/80">
                      <span>{contactMethodLabels[form.preferredContactMethod] ?? form.preferredContactMethod}</span>
                      {form.preferredContactMethod === 'calendly' && (
                        <span className="ml-1.5 inline-flex rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                          Calendly demandé
                        </span>
                      )}
                    </td>
                    <td className="py-4 pl-4">
                      <button
                        type="button"
                        onClick={() => selectPreparation(form)}
                        className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-marhaban-leaf/15 bg-white px-3 py-1 text-xs font-bold text-marhaban-ink shadow-warm-sm transition hover:border-marhaban-clay/30 hover:bg-marhaban-cream"
                      >
                        <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                        Voir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 p-4 text-sm text-marhaban-muted">
            Aucun formulaire de préparation pour le moment.
          </p>
        )}
      </AdminCard>

      {/* Filter + Legacy bookings */}
      <AdminCard title="Filtres" eyebrow="Recherche">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-marhaban-forestDark">Recherche par nom ou email</span>
            <input
              type="search"
              placeholder="Ex. nom ou email@example.com"
              className="w-full rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-sm text-marhaban-ink placeholder:text-marhaban-muted focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-marhaban-forestDark">Filtre statut</span>
            <select className="w-full rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-sm text-marhaban-ink focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20">
              {statusOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-marhaban-forestDark">Filtre type d&apos;appel</span>
            <select className="w-full rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-sm text-marhaban-ink focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20">
              {serviceOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>
      </AdminCard>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        {/* Legacy bookings table */}
        <AdminCard title="Réservations legacy" eyebrow="Tableau">
          {bookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead>
                  <tr className="border-b border-marhaban-leaf/12 text-xs font-bold uppercase tracking-[0.12em] text-marhaban-muted">
                    <th className="py-3 pr-4">Nom</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Service</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Statut</th>
                    <th className="py-3 pl-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-marhaban-leaf/10">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="align-top transition hover:bg-marhaban-cream/70">
                      <td className="py-4 pr-4">
                        <p className="font-semibold text-marhaban-forestDark">{booking.fullName}</p>
                        <p className="mt-1 text-xs text-marhaban-muted">{booking.clientStatus}</p>
                      </td>
                      <td className="px-4 py-4 text-marhaban-ink/80">{booking.email}</td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-marhaban-ink/80">{serviceLabels[booking.service]}</p>
                        <p className="mt-1 text-xs text-marhaban-muted">{booking.duration}</p>
                      </td>
                      <td className="px-4 py-4 text-marhaban-ink/80">{formatDate(booking.createdAt)}</td>
                      <td className="px-4 py-4">
                        <BookingStatusBadge status={booking.status} />
                      </td>
                      <td className="py-4 pl-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => selectBooking(booking)}
                            className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-marhaban-leaf/15 bg-white px-3 py-1 text-xs font-bold text-marhaban-ink shadow-warm-sm transition hover:border-marhaban-clay/30 hover:bg-marhaban-cream"
                          >
                            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                            Voir
                          </button>
                          <button
                            type="button"
                            onClick={() => updateBookingStatus(booking, 'to_contact')}
                            className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-marhaban-leaf/15 bg-white px-3 py-1 text-xs font-bold text-marhaban-ink shadow-warm-sm transition hover:border-marhaban-clay/30 hover:bg-marhaban-cream"
                          >
                            <MailCheck className="h-3.5 w-3.5" aria-hidden="true" />
                            Contacté
                          </button>
                          <button
                            type="button"
                            onClick={() => updateBookingStatus(booking, 'confirmed')}
                            className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-marhaban-leaf/15 bg-white px-3 py-1 text-xs font-bold text-marhaban-ink shadow-warm-sm transition hover:border-marhaban-clay/30 hover:bg-marhaban-cream"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                            Confirmer
                          </button>
                          <button
                            type="button"
                            onClick={() => openNoteEditor(booking)}
                            className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-marhaban-leaf/15 bg-white px-3 py-1 text-xs font-bold text-marhaban-ink shadow-warm-sm transition hover:border-marhaban-clay/30 hover:bg-marhaban-cream"
                          >
                            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                            Note
                          </button>
                          {booking.status !== 'archived' ? (
                            <button
                              type="button"
                              onClick={() => archiveBooking(booking)}
                              className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-700 shadow-warm-sm transition hover:bg-white"
                            >
                              <Archive className="h-3.5 w-3.5" aria-hidden="true" />
                              Archiver
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 p-4 text-sm text-marhaban-muted">
              Aucune réservation legacy pour le moment.
            </p>
          )}
        </AdminCard>

        {/* Detail panel */}
        <div className="space-y-6">
          <AdminCard title="Détail rapide" eyebrow="Sélection">
            {selectedPreparation ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-heading text-xl font-semibold leading-tight text-marhaban-forestDark">
                        {selectedPreparation.firstName} {selectedPreparation.lastName}
                      </p>
                      <p className="mt-0.5 text-sm text-marhaban-muted">{selectedPreparation.email}</p>
                    </div>
                    <PreparationStatusBadge status={selectedPreparation.status} />
                  </div>
                  <dl className="mt-5 grid gap-3.5 text-sm">
                    {selectedPreparation.phone ? (
                      <div>
                        <dt className="font-bold text-marhaban-forestDark">Téléphone</dt>
                        <dd className="mt-0.5 text-marhaban-muted">{selectedPreparation.phone}</dd>
                      </div>
                    ) : null}
                    <div>
                      <dt className="font-bold text-marhaban-forestDark">Situation actuelle</dt>
                      <dd className="mt-0.5 text-marhaban-muted">{selectedPreparation.locationStatus}</dd>
                    </div>
                    {selectedPreparation.generalStatus ? (
                      <div>
                        <dt className="font-bold text-marhaban-forestDark">Statut général</dt>
                        <dd className="mt-0.5 text-marhaban-muted">{selectedPreparation.generalStatus}</dd>
                      </div>
                    ) : null}
                    <div>
                      <dt className="font-bold text-marhaban-forestDark">Besoins</dt>
                      <dd className="mt-0.5 text-marhaban-muted">
                        {selectedPreparation.needs.map((n) => needLabels[n] ?? n).join(', ')}
                      </dd>
                    </div>
                    {selectedPreparation.urgency ? (
                      <div>
                        <dt className="font-bold text-marhaban-forestDark">Urgence</dt>
                        <dd className="mt-0.5 text-marhaban-muted">
                          {urgencyLabels[selectedPreparation.urgency] ?? selectedPreparation.urgency}
                        </dd>
                      </div>
                    ) : null}
                    <div>
                      <dt className="font-bold text-marhaban-forestDark">Disponibilités</dt>
                      <dd className="mt-0.5 whitespace-pre-wrap leading-relaxed text-marhaban-muted">
                        {selectedPreparation.availability}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-bold text-marhaban-forestDark">Méthode préférée</dt>
                      <dd className="mt-0.5 flex items-center gap-2 text-marhaban-muted">
                        {contactMethodLabels[selectedPreparation.preferredContactMethod] ?? selectedPreparation.preferredContactMethod}
                        {selectedPreparation.preferredContactMethod === 'calendly' && (
                          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                            Calendly demandé
                          </span>
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-bold text-marhaban-forestDark">Situation</dt>
                      <dd className="mt-0.5 whitespace-pre-wrap leading-relaxed text-marhaban-muted">
                        {selectedPreparation.situation}
                      </dd>
                    </div>
                    {selectedPreparation.mainQuestion ? (
                      <div>
                        <dt className="font-bold text-marhaban-forestDark">Question principale</dt>
                        <dd className="mt-0.5 whitespace-pre-wrap leading-relaxed text-marhaban-muted">
                          {selectedPreparation.mainQuestion}
                        </dd>
                      </div>
                    ) : null}
                    <div>
                      <dt className="font-bold text-marhaban-forestDark">Date d&apos;envoi</dt>
                      <dd className="mt-0.5 text-marhaban-muted">{formatDate(selectedPreparation.createdAt)}</dd>
                    </div>
                  </dl>
                </div>

                {/* Status update */}
                <div className="rounded-2xl border border-marhaban-leaf/12 bg-white p-4">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-marhaban-muted">Mettre à jour le statut</p>
                  <div className="flex flex-wrap gap-2">
                    {ADMIN_STATUS_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        disabled={isSaving || selectedPreparation.status === opt.value}
                        onClick={() => void updatePreparationStatus(selectedPreparation.id, opt.value)}
                        className={`inline-flex min-h-[32px] items-center rounded-full border px-3 py-1 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                          selectedPreparation.status === opt.value
                            ? 'border-marhaban-leaf/40 bg-marhaban-mint/60 text-marhaban-forestDark'
                            : 'border-marhaban-leaf/15 bg-white text-marhaban-ink hover:bg-marhaban-cream'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {savedMessage ? (
                    <p className="mt-2 text-xs font-semibold text-marhaban-clay">{savedMessage}</p>
                  ) : null}
                  {isSaving ? (
                    <p className="mt-2 text-xs text-marhaban-muted">Sauvegarde...</p>
                  ) : null}
                </div>
              </div>
            ) : selectedBooking ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-heading text-xl font-semibold leading-tight text-marhaban-forestDark">
                        {selectedBooking.fullName}
                      </p>
                      <p className="mt-0.5 text-sm text-marhaban-muted">{selectedBooking.email}</p>
                    </div>
                    <BookingStatusBadge status={selectedBooking.status} />
                  </div>
                  <dl className="mt-5 grid gap-3.5 text-sm">
                    <div>
                      <dt className="font-bold text-marhaban-forestDark">Téléphone</dt>
                      <dd className="mt-0.5 text-marhaban-muted">{selectedBooking.phone || '—'}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-marhaban-forestDark">Service</dt>
                      <dd className="mt-0.5 text-marhaban-muted">
                        {selectedBooking.serviceLabel} · {selectedBooking.duration} · {selectedBooking.price}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-bold text-marhaban-forestDark">Message</dt>
                      <dd className="mt-0.5 leading-relaxed text-marhaban-muted">{selectedBooking.message}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-marhaban-forestDark">Date</dt>
                      <dd className="mt-0.5 text-marhaban-muted">{formatDate(selectedBooking.createdAt)}</dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-2xl border border-marhaban-leaf/12 bg-white p-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={() => updateBookingStatus(selectedBooking, 'to_contact')}
                      className="inline-flex min-h-[38px] items-center gap-2 rounded-full bg-marhaban-forestDark px-4 py-2 text-xs font-bold text-white shadow-warm-sm transition hover:bg-marhaban-clay disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <MailCheck className="h-4 w-4" aria-hidden="true" />
                      Contacté
                    </button>
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={() => updateBookingStatus(selectedBooking, 'confirmed')}
                      className="inline-flex min-h-[38px] items-center gap-2 rounded-full bg-marhaban-clay px-4 py-2 text-xs font-bold text-white shadow-warm-sm transition hover:bg-marhaban-forestDark disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      Confirmer
                    </button>
                    <button
                      type="button"
                      onClick={() => void createCaseFromBooking(selectedBooking)}
                      disabled={isCreatingCase || allCaseBookingIds.has(selectedBooking.id)}
                      className="inline-flex min-h-[38px] items-center gap-2 rounded-full border border-marhaban-leaf/15 bg-marhaban-cream px-4 py-2 text-xs font-bold text-marhaban-ink shadow-warm-sm transition hover:bg-marhaban-mint/70 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <PlusCircle className="h-4 w-4" aria-hidden="true" />
                      {allCaseBookingIds.has(selectedBooking.id) ? 'Dossier créé' : isCreatingCase ? 'Création...' : 'Créer dossier'}
                    </button>
                    {selectedBooking.status !== 'archived' ? (
                      <button
                        type="button"
                        disabled={isSaving}
                        onClick={() => archiveBooking(selectedBooking)}
                        className="inline-flex min-h-[38px] items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-700 shadow-warm-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Archive className="h-4 w-4" aria-hidden="true" />
                        Archiver
                      </button>
                    ) : null}
                  </div>
                  {caseMessage ? (
                    <p className="mt-3 text-xs leading-relaxed text-marhaban-muted">{caseMessage}</p>
                  ) : null}
                  {savedMessage ? (
                    <p className="mt-2 text-xs font-semibold text-marhaban-clay">{savedMessage}</p>
                  ) : null}
                  {isSaving ? (
                    <p className="mt-2 text-xs text-marhaban-muted">Sauvegarde...</p>
                  ) : null}
                </div>

                <div className="rounded-2xl border border-marhaban-leaf/12 bg-white p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold text-marhaban-forestDark">Note interne</p>
                    <button
                      type="button"
                      onClick={() => setNoteEditorIsOpen((current) => !current)}
                      className="rounded-full border border-marhaban-leaf/15 bg-marhaban-cream px-4 py-2 text-xs font-bold text-marhaban-ink transition hover:bg-marhaban-mint/70"
                    >
                      {noteEditorIsOpen ? 'Masquer' : 'Éditer'}
                    </button>
                  </div>
                  {selectedBooking.internalNote && !noteEditorIsOpen ? (
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-marhaban-muted">
                      {selectedBooking.internalNote}
                    </p>
                  ) : null}
                  {noteEditorIsOpen ? (
                    <div className="mt-4 space-y-3">
                      <textarea
                        value={noteDraft}
                        onChange={(event) => setNoteDraft(event.target.value)}
                        rows={4}
                        placeholder="Note interne"
                        className="w-full resize-none rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-sm text-marhaban-ink placeholder:text-marhaban-muted focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20"
                      />
                      <button
                        type="button"
                        onClick={saveNote}
                        disabled={isSaving}
                        className="inline-flex min-h-[42px] items-center justify-center rounded-full bg-marhaban-forestDark px-5 py-2 text-xs font-bold text-white shadow-warm-sm transition hover:bg-marhaban-clay disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
                      </button>
                    </div>
                  ) : null}
                  {!selectedBooking.internalNote && !noteEditorIsOpen ? (
                    <p className="mt-2 text-xs text-marhaban-muted">Clique sur «Éditer» pour ajouter une note.</p>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 p-5">
                <p className="font-semibold text-marhaban-forestDark">
                  Sélectionne une demande pour voir les détails.
                </p>
              </div>
            )}
          </AdminCard>

          {selectedBooking ? (
            <AdminCard title="Notes internes" eyebrow="Suivi">
              <AdminNotesPanel targetType="booking" targetId={selectedBooking.id} />
            </AdminCard>
          ) : null}
        </div>
      </div>
    </div>
  );
}
