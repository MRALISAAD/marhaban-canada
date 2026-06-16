import { SUPPORTED_LOCALES, DEFAULT_LOCALE, isValidLocale } from './i18n';

export function ensureLeadingSlash(path: string) {
  return path.startsWith('/') ? path : `/${path}`;
}

/**
 * Prefixes an internal path with the locale if it's not already localized.
 * Leaves absolute URLs (http(s)://) untouched.
 */
export function localizePath(locale: string, href: string) {
  if (!href) return `/${locale}`;
  if (href.startsWith('#')) return href;
  // External or protocol-based URL
  if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return href;

  const path = ensureLeadingSlash(href);
  const segments = path.split('/').filter(Boolean);
  const first = segments[0];
  if (isValidLocale(first)) return path; // already localized

  const useLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;
  return `/${useLocale}${path}`;
}

/**
 * Remove leading locale segment if present
 */
export function stripLocaleFromPath(href: string) {
  const path = ensureLeadingSlash(href);
  const segments = path.split('/').filter(Boolean);
  if (segments.length === 0) return '/';
  if (isValidLocale(segments[0])) {
    return '/' + segments.slice(1).join('/');
  }
  return path;
}

export const LOCALES = SUPPORTED_LOCALES;
