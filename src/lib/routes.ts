import type { Locale } from '@/i18n/locales';
import { withLocale } from '@/lib/i18n-utils';

export function homePath(locale: Locale) {
  return withLocale('/', locale);
}

export function servicesPath(locale: Locale) {
  return withLocale('/services', locale);
}

export function startPath(locale: Locale) {
  return withLocale('/ressources', locale);
}

export function journeyPath(locale: Locale) {
  return withLocale('/parcours', locale);
}

export function accompanimentPath(locale: Locale) {
  return withLocale('/accompagnement', locale);
}

export function orientationServicePath(locale: Locale) {
  return withLocale('/services/orientation', locale);
}

export function antiScamServicePath(locale: Locale) {
  return withLocale('/services/anti-arnaque', locale);
}

export function antiScamPath(locale: Locale) {
  return antiScamServicePath(locale);
}

export function resourcesPath(locale: Locale) {
  return withLocale('/ressources', locale);
}

export function resourcePath(locale: Locale, slug: string) {
  return withLocale(`/ressources/${slug}`, locale);
}

export function bookingPath(locale: Locale) {
  return withLocale('/reserver', locale);
}

export function bookingThankYouPath(locale: Locale) {
  return withLocale('/merci', locale);
}

export function aboutPath(locale: Locale) {
  return withLocale('/a-propos', locale);
}

export function legacyBookingPath(locale: Locale) {
  return withLocale('/book', locale);
}

export function legacyAntiScamPath(locale: Locale) {
  return withLocale('/arnaques', locale);
}

export function legacyAboutPath(locale: Locale) {
  return withLocale('/about', locale);
}

export function legacyOrientationPath(locale: Locale) {
  return withLocale('/orientation', locale);
}
