import type { Locale } from '@/i18n/locales';
import type { LocaleContent } from '@/content/siteContent';
import { siteContent, defaultLocale } from '@/content/siteContent';

export const getLocaleContent = (locale: Locale): LocaleContent => siteContent[locale] ?? siteContent[defaultLocale];
