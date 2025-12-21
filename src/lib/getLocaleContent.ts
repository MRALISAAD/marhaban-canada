import { Locale, LocaleContent, siteContent, defaultLocale } from '@/content/siteContent';

export const getLocaleContent = (locale: Locale): LocaleContent => siteContent[locale] ?? siteContent[defaultLocale];
