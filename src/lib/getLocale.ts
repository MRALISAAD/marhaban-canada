import { headers } from 'next/headers';
import type { Locale } from '@/i18n/locales';
import { defaultLocale, locales } from '@/content/siteContent';

export async function getLocale(): Promise<Locale> {
  const headersList = await headers();
  const acceptLanguage = headersList.get('Accept-Language');

  if (!acceptLanguage) {
    return defaultLocale;
  }

  const acceptedLanguages = acceptLanguage
    .split(',')
    .map((lang) => lang.split(';')[0].trim())
    .filter(Boolean);

  for (const lang of acceptedLanguages) {
    if (locales.includes(lang as Locale)) {
      return lang as Locale;
    }
    const primaryLang = lang.split('-')[0];
    if (locales.includes(primaryLang as Locale)) {
      return primaryLang as Locale;
    }
  }

  return defaultLocale;
}
