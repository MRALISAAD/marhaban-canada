import type { Booking } from '@/types/admin';

const LOCAL_BOOKINGS_KEY = 'marhaban_local_bookings';
const LOCAL_BOOKINGS_CHANGE_EVENT = 'marhaban_local_bookings_change';

let cachedRawBookings: string | null = null;
let cachedBookings: LocalBooking[] = [];

export type LocalBooking = Booking & {
  internalNote?: string;
};

function canUseLocalStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function parseBookings(value: string | null): LocalBooking[] {
  if (value === cachedRawBookings) return cachedBookings;

  if (!value) {
    cachedRawBookings = value;
    cachedBookings = [];
    return cachedBookings;
  }

  try {
    const parsed = JSON.parse(value);
    cachedRawBookings = value;
    cachedBookings = Array.isArray(parsed) ? (parsed as LocalBooking[]) : [];
    return cachedBookings;
  } catch {
    cachedRawBookings = value;
    cachedBookings = [];
    return [];
  }
}

function setLocalBookings(bookings: readonly LocalBooking[]) {
  if (!canUseLocalStorage()) return;
  window.localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(bookings));
  window.dispatchEvent(new Event(LOCAL_BOOKINGS_CHANGE_EVENT));
}

export function getLocalBookings(): LocalBooking[] {
  if (!canUseLocalStorage()) return [];
  return parseBookings(window.localStorage.getItem(LOCAL_BOOKINGS_KEY));
}

export function addLocalBooking(booking: LocalBooking) {
  if (!canUseLocalStorage()) return booking;

  const bookings = getLocalBookings();
  setLocalBookings([booking, ...bookings]);
  return booking;
}

export function updateLocalBooking(id: string, updates: Partial<LocalBooking>) {
  if (!canUseLocalStorage()) return null;

  const bookings = getLocalBookings();
  let updatedBooking: LocalBooking | null = null;
  const nextBookings = bookings.map((booking) => {
    if (booking.id !== id) return booking;
    updatedBooking = { ...booking, ...updates };
    return updatedBooking;
  });

  if (updatedBooking) setLocalBookings(nextBookings);
  return updatedBooking;
}

export function clearLocalBookings() {
  if (!canUseLocalStorage()) return;
  window.localStorage.removeItem(LOCAL_BOOKINGS_KEY);
  window.dispatchEvent(new Event(LOCAL_BOOKINGS_CHANGE_EVENT));
}

export function subscribeToLocalBookings(onChange: () => void) {
  if (!canUseLocalStorage()) return () => {};

  const handleStorage = (event: StorageEvent) => {
    if (event.key === LOCAL_BOOKINGS_KEY) onChange();
  };

  window.addEventListener('storage', handleStorage);
  window.addEventListener(LOCAL_BOOKINGS_CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(LOCAL_BOOKINGS_CHANGE_EVENT, onChange);
  };
}
