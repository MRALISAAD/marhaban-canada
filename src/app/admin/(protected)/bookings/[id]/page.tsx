export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { createServerClient } from '@/lib/supabase/server';
import { AdminCard } from '@/components/admin/AdminCard';
import type { PreparationFormStatus } from '@/types/admin';
import type { Locale } from '@/i18n/locales';
import { AdminBookingDetailActions } from './AdminBookingDetailActions';

type PageProps = {
  params: Promise<{ id: string }>;
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
  dont_know: 'Ne sait pas par où commencer',
  other: 'Autre',
};

const urgencyLabels: Record<string, string> = {
  no: 'Non',
  this_week: 'Oui, cette semaine',
  today_tomorrow: "Oui, aujourd'hui ou demain",
};

const contactMethodLabels: Record<string, string> = {
  google_meet: 'Google Meet',
  whatsapp: 'WhatsApp',
  phone: 'Téléphone',
  any: 'Peu importe',
};

const locationLabels: Record<string, string> = {
  already_canada: 'Déjà au Canada',
  preparing_arrival: 'Prépare son arrivée',
  just_arrived: "Vient d'arriver",
  prefer_not_say: 'Préfère ne pas préciser',
  other: 'Autre',
};

const generalContextLabels: Record<string, string> = {
  studies: 'Études',
  work: 'Travail',
  family: 'Famille',
  settlement: 'Installation au Canada',
  prefer_not_say: 'Préfère ne pas préciser',
  other: 'Autre',
};

const statusLabels: Record<PreparationFormStatus, string> = {
  form_submitted: 'Nouveau',
  calendly_pending: 'Calendly en attente',
  calendly_confirmed: 'Calendly confirmé',
  contacted: 'Contacté',
  confirmed_manually: 'Confirmé manuellement',
  completed: 'Terminé',
  cancelled: 'Annulé',
  no_show: 'Absent',
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('fr-CA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-muted">{label}</dt>
      <dd className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-marhaban-ink">{value}</dd>
    </div>
  );
}

type PrepRow = {
  id: string;
  created_at: string;
  updated_at: string | null;
  locale: Locale;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  location_status: string;
  general_status: string | null;
  needs: string[];
  situation: string;
  main_question: string | null;
  urgency: string | null;
  availability: string;
  preferred_contact_method: string;
  consent: boolean;
  marketing_consent: boolean;
  privacy_notice_accepted: boolean;
  source: string;
  status: PreparationFormStatus;
  calendly_enabled: boolean;
  calendly_event_uri: string | null;
  calendly_invitee_uri: string | null;
  calendly_event_start_time: string | null;
  calendly_event_end_time: string | null;
  calendly_invitee_email: string | null;
  calendly_invitee_name: string | null;
  calendly_cancel_url: string | null;
  calendly_reschedule_url: string | null;
  retention_until: string | null;
};

async function getForm(id: string): Promise<PrepRow | null> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return null;
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('booking_preparation_forms')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return data as PrepRow;
  } catch {
    return null;
  }
}

export default async function AdminBookingDetailPage({ params }: PageProps) {
  const { id } = await params;

  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidPattern.test(id)) notFound();

  const form = await getForm(id);
  if (!form) notFound();

  const statusLabel = statusLabels[form.status] ?? form.status;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center gap-4">
        <Link
          href="/admin/bookings"
          className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-marhaban-leaf/15 bg-white px-4 py-2 text-sm font-bold text-marhaban-ink shadow-warm-sm transition hover:bg-marhaban-cream"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Retour
        </Link>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">Demande</p>
          <h1 className="font-heading text-2xl font-semibold text-marhaban-forestDark sm:text-3xl">
            {form.first_name} {form.last_name}
          </h1>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <AdminCard title="Informations" eyebrow="Contact">
            <dl className="grid gap-4 sm:grid-cols-2">
              <Field label="Prénom" value={form.first_name} />
              <Field label="Nom" value={form.last_name} />
              <Field label="Email" value={form.email} />
              <Field label="Téléphone" value={form.phone} />
              <Field label="Locale" value={form.locale.toUpperCase()} />
              <Field label="Situation actuelle" value={locationLabels[form.location_status] ?? form.location_status} />
              <Field
                label="Contexte général"
                value={
                  form.general_status
                    ? (generalContextLabels[form.general_status] ?? form.general_status)
                    : undefined
                }
              />
            </dl>
          </AdminCard>

          <AdminCard title="Situation" eyebrow="Contexte">
            <dl className="grid gap-4">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-muted">Besoins</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {form.needs.map((need) => (
                    <span
                      key={need}
                      className="inline-flex rounded-full border border-marhaban-leaf/20 bg-marhaban-mint/60 px-3 py-1 text-xs font-semibold text-marhaban-leaf"
                    >
                      {needLabels[need] ?? need}
                    </span>
                  ))}
                </dd>
              </div>
              <Field label="Situation" value={form.situation} />
              <Field label="Question principale" value={form.main_question} />
            </dl>
          </AdminCard>

          <AdminCard title="Appel" eyebrow="Disponibilités">
            <dl className="grid gap-4 sm:grid-cols-2">
              <Field label="Urgence" value={form.urgency ? (urgencyLabels[form.urgency] ?? form.urgency) : 'Non précisé'} />
              <Field label="Méthode préférée" value={contactMethodLabels[form.preferred_contact_method] ?? form.preferred_contact_method} />
              <div className="sm:col-span-2">
                <Field label="Disponibilités" value={form.availability} />
              </div>
            </dl>
          </AdminCard>

          {form.calendly_event_start_time ? (
            <AdminCard title="Calendly" eyebrow="Réservation automatique">
              <dl className="grid gap-4 sm:grid-cols-2">
                <Field label="Nom Calendly" value={form.calendly_invitee_name} />
                <Field label="Email Calendly" value={form.calendly_invitee_email} />
                <Field label="Début" value={form.calendly_event_start_time ? formatDate(form.calendly_event_start_time) : undefined} />
                <Field label="Fin" value={form.calendly_event_end_time ? formatDate(form.calendly_event_end_time) : undefined} />
                {form.calendly_cancel_url ? (
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-muted">Annuler</dt>
                    <dd className="mt-1">
                      <a
                        href={form.calendly_cancel_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-marhaban-leaf underline hover:text-marhaban-forestDark"
                      >
                        Lien d&apos;annulation
                      </a>
                    </dd>
                  </div>
                ) : null}
                {form.calendly_reschedule_url ? (
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-muted">Reporter</dt>
                    <dd className="mt-1">
                      <a
                        href={form.calendly_reschedule_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-marhaban-leaf underline hover:text-marhaban-forestDark"
                      >
                        Lien de report
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>
            </AdminCard>
          ) : null}
        </div>

        <div className="space-y-6">
          <AdminCard title="Statut" eyebrow="Workflow">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-muted">Statut actuel</p>
                <p className="mt-2 font-heading text-xl font-semibold text-marhaban-forestDark">{statusLabel}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-muted">Reçu le</p>
                <p className="mt-1 text-sm text-marhaban-ink">{formatDate(form.created_at)}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-muted">Consentement</p>
                <p className="mt-1 text-sm text-marhaban-ink">{form.consent ? 'Accepté' : 'Non accepté'}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-muted">Consent marketing</p>
                <p className="mt-1 text-sm text-marhaban-ink">{form.marketing_consent ? 'Oui' : 'Non'}</p>
              </div>
              {form.retention_until ? (
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-muted">Rétention jusqu&apos;au</p>
                  <p className="mt-1 text-sm text-marhaban-ink">{formatDate(form.retention_until)}</p>
                </div>
              ) : null}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-muted">Source</p>
                <p className="mt-1 text-sm text-marhaban-ink">{form.source}</p>
              </div>
            </div>
          </AdminCard>

          <AdminCard title="Mettre à jour" eyebrow="Actions">
            <AdminBookingDetailActions formId={form.id} currentStatus={form.status} />
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
