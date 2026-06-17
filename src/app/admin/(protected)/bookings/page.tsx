import { AdminBookingsClient } from '@/components/admin/AdminBookingsClient';
import { mockBookings } from '@/lib/admin/mock-data';
import { createServerClient } from '@/lib/supabase/server';
import type { Locale } from '@/i18n/locales';
import type { Booking, BookingStatus } from '@/types/admin';

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

async function getSupabaseCaseBookingIds() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('case_files')
      .select('booking_id')
      .not('booking_id', 'is', null);

    if (error) {
      console.error('Unable to load Supabase case booking ids', error);
      return [];
    }

    return (data ?? [])
      .map((row) => row.booking_id)
      .filter((bookingId): bookingId is string => typeof bookingId === 'string');
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Supabase case booking ids unavailable', error);
    }
    return [];
  }
}

export default async function AdminBookingsPage() {
  const [supabaseBookings, supabaseCaseBookingIds] = await Promise.all([
    getSupabaseBookings(),
    getSupabaseCaseBookingIds(),
  ]);

  return (
    <AdminBookingsClient
      supabaseBookings={supabaseBookings}
      supabaseCaseBookingIds={supabaseCaseBookingIds}
      mockBookings={mockBookings}
    />
  );
}
