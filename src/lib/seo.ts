import type { Metadata } from 'next';
import { LOCALES, type Locale } from '@/i18n/locales';

export const SITE_URL = 'https://marhabancanada.ca';
export const SITE_NAME = 'Marhaban Canada';

export const DEFAULT_TITLE =
  'Marhaban Canada — Accompagnement pratique pour nouveaux arrivants';
export const DEFAULT_DESCRIPTION =
  'Un accompagnement simple, humain et informatif pour aider les nouveaux arrivants et étudiants à clarifier leurs premières démarches au Canada.';

type PublicPageMetadataInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
};

export function localizedPath(locale: Locale, path = '') {
  const normalizedPath = path && path !== '/' ? (path.startsWith('/') ? path : `/${path}`) : '';
  return `/${locale}${normalizedPath}`;
}

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function localeAlternates(path = '') {
  return Object.fromEntries(
    LOCALES.map((locale) => [locale, absoluteUrl(localizedPath(locale, path))]),
  ) as Record<Locale, string>;
}

export function publicPageMetadata({
  locale,
  path,
  title,
  description,
}: PublicPageMetadataInput): Metadata {
  const canonicalPath = localizedPath(locale, path);
  const url = absoluteUrl(canonicalPath);
  const pageTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title: {
      absolute: pageTitle,
    },
    description,
    alternates: {
      canonical: url,
      languages: localeAlternates(path),
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: locale === 'fr' ? 'fr_CA' : locale === 'en' ? 'en_CA' : 'ar',
      title: pageTitle,
      description,
      url,
    },
  };
}
