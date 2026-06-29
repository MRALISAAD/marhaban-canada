import type { Locale } from '@/i18n/locales';
import { withLocale } from '@/lib/i18n-utils';

export function homePath(locale: Locale) { return withLocale('/', locale); }
export function bookingPath(locale: Locale) { return withLocale('/reserver/formulaire', locale); }
export function resourcesPath(locale: Locale) { return withLocale('/ressources', locale); }
export function antiScamPath(locale: Locale) { return withLocale('/anti-arnaque', locale); }
export function aboutPath(locale: Locale) { return withLocale('/a-propos', locale); }

// Legacy aliases kept for any remaining references
export function startPath(locale: Locale) { return resourcesPath(locale); }
export function accompanimentPath(locale: Locale) { return homePath(locale); }
export function antiScamServicePath(locale: Locale) { return antiScamPath(locale); }
export function orientationServicePath(locale: Locale) { return bookingPath(locale); }
export function resourcePath(locale: Locale, slug: string) { return withLocale(`/ressources/${slug}`, locale); }
