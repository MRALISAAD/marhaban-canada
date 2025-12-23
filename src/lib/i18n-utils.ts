import type { Locale } from '@/i18n/locales';
import { isLocale } from '@/i18n/locales';

/**
 * Extract locale from pathname
 * @param pathname - Full pathname (e.g., "/fr/parcours" or "/en")
 * @returns Locale or null if not found
 */
export function getLocaleFromPathname(pathname: string): Locale | null {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment && isLocale(firstSegment)) {
    return firstSegment;
  }
  
  return null;
}

/**
 * Prefix a path with locale
 * @param path - Path without locale (e.g., "/parcours" or "/")
 * @param locale - Locale to prefix with
 * @returns Localized path (e.g., "/fr/parcours" or "/fr")
 */
export function withLocale(path: string, locale: Locale): string {
  // Normalize path: ensure it starts with /, remove trailing slash except for root
  const normalizedPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  
  // Remove any existing locale prefix if present
  const segments = normalizedPath.split('/').filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments.shift();
  }
  
  // Rebuild path with locale
  const cleanPath = segments.length > 0 ? `/${segments.join('/')}` : '';
  return `/${locale}${cleanPath}`;
}

