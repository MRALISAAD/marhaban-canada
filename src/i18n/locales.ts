export const LOCALES = ['fr', 'en', 'ar'] as const; // Added 'en'
export type Locale = (typeof LOCALES)[number];

export function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}

export function getHtmlAttrs(locale: Locale) {
  if (locale === 'ar') return { lang: 'ar', dir: 'rtl' as const };
  if (locale === 'en') return { lang: 'en-CA', dir: 'ltr' as const }; // Added 'en' handling
  return { lang: 'fr', dir: 'ltr' as const };
}
