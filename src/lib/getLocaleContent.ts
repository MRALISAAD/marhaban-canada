import type { Locale } from '@/i18n/locales';
import type { LocaleContent } from '@/content/siteContent';
import { siteContent } from '@/content/siteContent';

export const getLocaleContent = (locale: Locale): LocaleContent => {
  const content = siteContent[locale];
  if (!content) {
    throw new Error(`Missing content for locale: ${locale}`);
  }
  return content;
};
