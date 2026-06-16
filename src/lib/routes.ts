import type { Locale } from '@/i18n/locales';
import { withLocale } from '@/lib/i18n-utils';

export function bookingPath(locale: Locale) {
  return withLocale('/reserver', locale);
}

export function bookingThankYouPath(locale: Locale) {
  return withLocale('/merci', locale);
}

export function legacyBookingPath(locale: Locale) {
  return withLocale('/book', locale);
}
