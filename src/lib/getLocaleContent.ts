import type { Locale } from '@/i18n/locales';
import type { LocaleContent } from '@/content/siteContent';
import { siteContent, defaultLocale } from '@/content/siteContent';
import { mergeWithFallback } from './i18nFallback';

export const getLocaleContent = (locale: Locale): LocaleContent =>
  mergeWithFallback<LocaleContent>(siteContent[locale] ?? {}, siteContent[defaultLocale]);
