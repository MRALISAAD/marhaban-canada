export const dynamic = 'force-dynamic';

import { AdminBookingsClient } from '@/components/admin/AdminBookingsClient';
import { createServerClient } from '@/lib/supabase/server';
import type { Locale } from '@/i18n/locales';
import type { Booking, BookingPreparationForm, BookingStatus, PreparationFormStatus } from '@/types/admin';

type SupabaseBookingRow = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  city_province: string;
  service: Booking['service'];
  service_label: string;
  duration: string;
  price_label: string;
  status: BookingStatus;
  client_status: Booking['clientStatus'];
  preferred_language: Locale;
  message: string;
  next_action: string | null;
};

type SupabasePreparationRow = {
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
  retention_until: string | null;
  deleted_at: string | null;
  calendly_enabled: boolean;
  calendly_event_uri: string | null;
  calendly_invitee_uri: string | null;
  calendly_event_start_time: string | null;
  calendly_event_end_time: string | null;
  calendly_invitee_email: string | null;
  calendly_invitee_name: string | null;
  calendly_cancel_url: string | null;
  calendly_reschedule_url: string | null;
};

function toBooking(row: SupabaseBookingRow): Booking {
  return {
    id: row.id,
    createdAt: row.created_at,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone ?? undefined,
    cityProvince: row.city_province,
    service: row.service,
    serviceLabel: row.service_label,
    duration: row.duration,
    price: row.price_label,
    status: row.status,
    clientStatus: row.client_status,
    preferredLanguage: row.preferred_language,
    message: row.message,
    nextAction: row.next_action ?? undefined,
  };
}

function toPreparationForm(row: SupabasePreparationRow): BookingPreparationForm {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at ?? undefined,
    locale: row.locale,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone ?? undefined,
    locationStatus: row.location_status,
    generalStatus: row.general_status ?? undefined,
    needs: row.needs ?? [],
    situation: row.situation,
    mainQuestion: row.main_question ?? undefined,
    urgency: row.urgency ?? undefined,
    availability: row.availability,
    preferredContactMethod: row.preferred_contact_method,
    consent: row.consent,
    marketingConsent: row.marketing_consent,
    privacyNoticeAccepted: row.privacy_notice_accepted,
    source: row.source,
    status: row.status,
    retentionUntil: row.retention_until ?? undefined,
    calendlyEnabled: row.calendly_enabled,
    calendlyEventUri: row.calendly_event_uri ?? undefined,
    calendlyInviteeUri: row.calendly_invitee_uri ?? undefined,
    calendlyEventStartTime: row.calendly_event_start_time ?? undefined,
    calendlyEventEndTime: row.calendly_event_end_time ?? undefined,
    calendlyInviteeEmail: row.calendly_invitee_email ?? undefined,
    calendlyInviteeName: row.calendly_invitee_name ?? undefined,
    calendlyCancelUrl: row.calendly_cancel_url ?? undefined,
    calendlyRescheduleUrl: row.calendly_reschedule_url ?? undefined,
  };
}

async function getSupabaseBookings() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('bookings')
      .select('id, created_at, full_name, email, phone, city_province, service, service_label, duration, price_label, status, client_status, preferred_language, message, next_action')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Unable to load Supabase bookings', error);
      return [];
    }

    return ((data ?? []) as SupabaseBookingRow[]).map(toBooking);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Supabase bookings unavailable', error);
    }
    return [];
  }
}

async function getSupabasePreparationForms() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('booking_preparation_forms')
      .select('id, created_at, updated_at, locale, first_name, last_name, email, phone, location_status, general_status, needs, situation, main_question, urgency, availability, preferred_contact_method, consent, marketing_consent, privacy_notice_accepted, source, status, retention_until, deleted_at, calendly_enabled, calendly_event_uri, calendly_invitee_uri, calendly_event_start_time, calendly_event_end_time, calendly_invitee_email, calendly_invitee_name, calendly_cancel_url, calendly_reschedule_url')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Unable to load booking preparation forms', error);
      return [];
    }

    return ((data ?? []) as SupabasePreparationRow[]).map(toPreparationForm);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Booking preparation forms unavailable', error);
    }
    return [];
  }
}

export default async function AdminBookingsPage() {
  const supabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  const [supabaseBookings, supabasePreparationForms] = supabaseConfigured
    ? await Promise.all([
        getSupabaseBookings(),
        getSupabasePreparationForms(),
      ])
    : [[], []];

  return (
    <AdminBookingsClient
      supabaseBookings={supabaseBookings}
      supabasePreparationForms={supabasePreparationForms}
      supabaseConfigured={supabaseConfigured}
    />
  );
}
