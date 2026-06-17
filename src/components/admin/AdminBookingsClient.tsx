'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import { CheckCircle2, Eye, FileText, MailCheck, PlusCircle } from 'lucide-react';
import { AdminBadge, BookingStatusBadge } from '@/components/admin/AdminBadge';
import { AdminCard } from '@/components/admin/AdminCard';
import { addLocalCase, getLocalCases, subscribeToLocalCases, type LocalCase } from '@/lib/admin/local-case-store';
import { getLocalBookings, subscribeToLocalBookings, updateLocalBooking, type LocalBooking } from '@/lib/admin/local-booking-store';
import type { Booking, BookingStatus } from '@/types/admin';

type AdminBookingsClientProps = {
  supabaseBookings?: readonly Booking[];
  mockBookings: readonly Booking[];
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

const statusOptions = ['Tous les statuts', 'Nouvelle', 'À contacter', 'Créneau proposé', 'Confirmée', 'Terminée', 'Annulée'];
const serviceOptions = ['Tous les appels', 'Appel découverte', 'Orientation', 'Anti-arnaque'];
const emptyBookings: LocalBooking[] = [];
const emptyCases: LocalCase[] = [];

function applyOverride(booking: Booking, overrides: BookingOverrides): EditableBooking {
  return { ...booking, ...overrides[booking.id] };
}

export function AdminBookingsClient({ supabaseBookings = [], mockBookings }: AdminBookingsClientProps) {
  const [bookingOverrides, setBookingOverrides] = useState<BookingOverrides>({});
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [noteEditorIsOpen, setNoteEditorIsOpen] = useState(false);
  const [caseMessage, setCaseMessage] = useState('');
  const localBookings = useSyncExternalStore(subscribeToLocalBookings, getLocalBookings, () => emptyBookings);
  const localCases = useSyncExternalStore(subscribeToLocalCases, getLocalCases, () => emptyCases);

  const bookings = useMemo(
    () => [
      ...supabaseBookings.map((booking) => applyOverride(booking, bookingOverrides)),
      ...localBookings.map((booking) => applyOverride(booking, bookingOverrides)),
      ...mockBookings.map((booking) => applyOverride(booking, bookingOverrides)),
    ],
    [bookingOverrides, localBookings, mockBookings, supabaseBookings],
  );
  const supabaseBookingIds = useMemo(() => new Set(supabaseBookings.map((booking) => booking.id)), [supabaseBookings]);
  const localBookingIds = useMemo(() => new Set(localBookings.map((booking) => booking.id)), [localBookings]);
  const caseBookingIds = useMemo(
    () => new Set(localCases.flatMap((caseFile) => [caseFile.sourceBookingId, caseFile.bookingId].filter(Boolean) as string[])),
    [localCases],
  );
  const selectedBooking = selectedBookingId ? bookings.find((booking) => booking.id === selectedBookingId) : undefined;

  function selectBooking(booking: EditableBooking) {
    setSelectedBookingId(booking.id);
    setNoteDraft(booking.internalNote ?? '');
    setNoteEditorIsOpen(false);
    setCaseMessage('');
  }

  function updateBooking(id: string, updates: Partial<EditableBooking>) {
    setBookingOverrides((current) => ({
      ...current,
      [id]: {
        ...current[id],
        ...updates,
      },
    }));

    if (localBookingIds.has(id)) {
      updateLocalBooking(id, updates);
    }
  }

  function updateBookingStatus(booking: EditableBooking, status: BookingStatus) {
    selectBooking({ ...booking, status });
    updateBooking(booking.id, { status });
  }

  function openNoteEditor(booking: EditableBooking) {
    selectBooking(booking);
    setNoteDraft(booking.internalNote ?? '');
    setNoteEditorIsOpen(true);
  }

  function saveNote() {
    if (!selectedBooking) return;
    updateBooking(selectedBooking.id, { internalNote: noteDraft.trim() });
    setNoteEditorIsOpen(false);
  }

  function createCaseFromBooking(booking: EditableBooking) {
    if (caseBookingIds.has(booking.id)) {
      setCaseMessage('Dossier déjà créé pour cette réservation.');
      return;
    }

    const now = new Date().toISOString();
    addLocalCase({
      id: `case_local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      clientName: booking.fullName,
      email: booking.email,
      phone: booking.phone,
      cityProvince: booking.cityProvince,
      status: 'active',
      preferredLanguage: booking.preferredLanguage,
      openedAt: now,
      createdAt: now,
      updatedAt: now,
      nextStep: 'Contacter la personne et préparer le premier suivi.',
      actionPlan: [],
      internalNotes: booking.internalNote ? [booking.internalNote] : [],
      bookingId: booking.id,
      sourceBookingId: booking.id,
      situation: booking.message,
      priority: 'normal',
      notes: booking.internalNote ?? '',
    });
    setCaseMessage('Dossier créé localement.');
  }

  const kpis = [
    {
      label: 'Nouvelles demandes',
      value: bookings.filter((booking) => booking.status === 'new').length,
      detail: 'À qualifier en premier',
    },
    {
      label: 'À contacter',
      value: bookings.filter((booking) => booking.status === 'to_contact').length,
      detail: 'Réponse email à envoyer',
    },
    {
      label: 'Confirmées',
      value: bookings.filter((booking) => booking.status === 'confirmed').length,
      detail: 'Créneau validé',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-[1.75rem] border border-marhaban-clay/20 bg-[#fff4e8] px-5 py-4 text-sm leading-relaxed text-marhaban-ink shadow-warm-sm">
        <span className="font-bold text-marhaban-clay">Admin MVP mock/local</span>
        <span className="text-marhaban-ink/75"> — non prêt production sans authentification.</span>
      </div>

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
          <div className="flex flex-wrap gap-2">
            <AdminBadge label="Mock data" tone="dark" />
            {supabaseBookings.length > 0 ? <AdminBadge label={`${supabaseBookings.length} Supabase`} tone="success" /> : null}
            {localBookings.length > 0 ? <AdminBadge label={`${localBookings.length} local`} tone="warning" /> : null}
          </div>
        </div>
      </header>

      <div className="rounded-[1.75rem] border border-marhaban-leaf/12 bg-white/75 px-5 py-4 text-sm leading-relaxed text-marhaban-muted shadow-warm-sm">
        Les demandes Supabase sont affichées en premier. Les demandes locales du navigateur restent disponibles en fallback.
      </div>

      <section className="grid gap-4 md:grid-cols-3" aria-label="Indicateurs réservations">
        {kpis.map((item) => (
          <AdminCard key={item.label} className="p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">{item.label}</p>
            <p className="mt-4 font-heading text-4xl font-semibold leading-none text-marhaban-forestDark">
              {item.value}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-marhaban-muted">{item.detail}</p>
          </AdminCard>
        ))}
      </section>

      <AdminCard title="Filtres" eyebrow="Recherche">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-marhaban-forestDark">Recherche par nom ou email</span>
            <input
              type="search"
              placeholder="Ex. Nadia ou email@example.com"
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
            <span className="mb-2 block text-sm font-semibold text-marhaban-forestDark">Filtre type d’appel</span>
            <select className="w-full rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-sm text-marhaban-ink focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20">
              {serviceOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-marhaban-muted">
          Filtres visuels pour le MVP mock/local. Le filtrage interactif sera ajouté avec la persistance des données.
        </p>
      </AdminCard>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <AdminCard title="Toutes les réservations" eyebrow="Tableau">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead>
                <tr className="border-b border-marhaban-leaf/12 text-xs font-bold uppercase tracking-[0.12em] text-marhaban-muted">
                  <th className="py-3 pr-4">Nom</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Langue</th>
                  <th className="px-4 py-3">Ville</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="py-3 pl-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-marhaban-leaf/10">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="align-top transition hover:bg-marhaban-cream/70">
                    <td className="py-4 pr-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-marhaban-forestDark">{booking.fullName}</p>
                        {supabaseBookingIds.has(booking.id) ? <AdminBadge label="Supabase" tone="success" className="px-2 py-0.5 text-[10px]" /> : null}
                        {localBookingIds.has(booking.id) ? <AdminBadge label="Local" tone="warning" className="px-2 py-0.5 text-[10px]" /> : null}
                      </div>
                      <p className="mt-1 text-xs text-marhaban-muted">{booking.clientStatus}</p>
                    </td>
                    <td className="px-4 py-4 text-marhaban-ink/80">{booking.email}</td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-marhaban-ink/80">{serviceLabels[booking.service]}</p>
                      <p className="mt-1 text-xs text-marhaban-muted">{booking.duration} · {booking.price}</p>
                    </td>
                    <td className="px-4 py-4 uppercase text-marhaban-ink/80">{booking.preferredLanguage}</td>
                    <td className="px-4 py-4 text-marhaban-ink/80">{booking.cityProvince}</td>
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
                          Marquer contacté
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
                          Résumé
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminCard>

        <AdminCard title="Détail rapide" eyebrow="Sélection">
          {selectedBooking ? (
            <div className="space-y-5">
              <div className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-heading text-2xl font-semibold leading-tight text-marhaban-forestDark">
                      {selectedBooking.fullName}
                    </p>
                    <p className="mt-1 text-sm text-marhaban-muted">{selectedBooking.email}</p>
                  </div>
                  <BookingStatusBadge status={selectedBooking.status} />
                </div>
                <dl className="mt-5 grid gap-4 text-sm">
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Téléphone</dt>
                    <dd className="mt-1 text-marhaban-muted">{selectedBooking.phone || 'Non renseigné'}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Ville / province</dt>
                    <dd className="mt-1 text-marhaban-muted">{selectedBooking.cityProvince}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Service choisi</dt>
                    <dd className="mt-1 text-marhaban-muted">
                      {selectedBooking.serviceLabel} · {selectedBooking.duration} · {selectedBooking.price}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Langue</dt>
                    <dd className="mt-1 uppercase text-marhaban-muted">{selectedBooking.preferredLanguage}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Message</dt>
                    <dd className="mt-1 leading-relaxed text-marhaban-muted">{selectedBooking.message}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Date de demande</dt>
                    <dd className="mt-1 text-marhaban-muted">{formatDate(selectedBooking.createdAt)}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Prochaine étape</dt>
                    <dd className="mt-1 text-marhaban-muted">{selectedBooking.nextAction || 'Répondre avec les disponibilités.'}</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border border-marhaban-leaf/12 bg-white p-5">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => updateBookingStatus(selectedBooking, 'to_contact')}
                    className="inline-flex min-h-[38px] items-center gap-2 rounded-full bg-marhaban-forestDark px-4 py-2 text-xs font-bold text-white shadow-warm-sm transition hover:bg-marhaban-clay"
                  >
                    <MailCheck className="h-4 w-4" aria-hidden="true" />
                    Marquer contacté
                  </button>
                  <button
                    type="button"
                    onClick={() => updateBookingStatus(selectedBooking, 'confirmed')}
                    className="inline-flex min-h-[38px] items-center gap-2 rounded-full bg-marhaban-clay px-4 py-2 text-xs font-bold text-white shadow-warm-sm transition hover:bg-marhaban-forestDark"
                  >
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    Confirmer
                  </button>
                  <button
                    type="button"
                    onClick={() => createCaseFromBooking(selectedBooking)}
                    className="inline-flex min-h-[38px] items-center gap-2 rounded-full border border-marhaban-leaf/15 bg-marhaban-cream px-4 py-2 text-xs font-bold text-marhaban-ink shadow-warm-sm transition hover:bg-marhaban-mint/70"
                  >
                    <PlusCircle className="h-4 w-4" aria-hidden="true" />
                    {caseBookingIds.has(selectedBooking.id) ? 'Dossier créé' : 'Créer dossier'}
                  </button>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-marhaban-muted">
                  {caseMessage || 'Crée un dossier local pour suivre cette personne dans /admin/cases.'}
                </p>
              </div>

              <div className="rounded-2xl border border-marhaban-leaf/12 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-semibold text-marhaban-forestDark">Résumé / note interne</p>
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
                      rows={5}
                      placeholder="Résumé / note interne"
                      className="w-full resize-none rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-sm text-marhaban-ink placeholder:text-marhaban-muted focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20"
                    />
                    <button
                      type="button"
                      onClick={saveNote}
                      className="inline-flex min-h-[42px] items-center justify-center rounded-full bg-marhaban-forestDark px-5 py-2 text-xs font-bold text-white shadow-warm-sm transition hover:bg-marhaban-clay"
                    >
                      Sauvegarder note
                    </button>
                  </div>
                ) : null}
                {!selectedBooking.internalNote && !noteEditorIsOpen ? (
                  <p className="mt-3 text-sm leading-relaxed text-marhaban-muted">
                    Clique sur “Résumé” ou “Éditer” pour ajouter une note interne.
                  </p>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 p-5">
              <p className="font-semibold text-marhaban-forestDark">
                Sélectionne une réservation pour voir les détails.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-marhaban-muted">
                Les statuts et notes des demandes locales sont sauvegardés dans ce navigateur. Les données mock restent temporaires.
              </p>
            </div>
          )}
        </AdminCard>
      </div>
    </div>
  );
}
