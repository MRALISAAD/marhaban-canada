/**
 * i18n Configuration and utilities
 * Centralized locale settings for route-based i18n
 */

import type { Locale } from '@/i18n/locales';

export type LocaleConfig = {
  lang: string;       // HTML lang attribute (BCP 47)
  dir: 'ltr' | 'rtl'; // HTML dir attribute
  name: string;       // Display name
};

/**
 * Supported locales with their HTML attributes
 * Used for:
 * - Route validation
 * - HTML lang/dir attributes
 * - Content loading
 */
export const LOCALE_CONFIG: Record<Locale, LocaleConfig> = {
  fr: {
    lang: 'fr-CA',
    dir: 'ltr',
    name: 'Français',
  },
  en: {
    lang: 'en-CA',
    dir: 'ltr',
    name: 'English',
  },
  ar: {
    lang: 'ar',
    dir: 'rtl',
    name: 'العربية',
  },
};

export const SUPPORTED_LOCALES = Object.keys(LOCALE_CONFIG) as Locale[];
export const DEFAULT_LOCALE: Locale = 'fr';

/**
 * Validates if a locale is supported
 */
export function isValidLocale(value: unknown): value is Locale {
  return typeof value === 'string' && value in LOCALE_CONFIG;
}

/**
 * Gets the config for a specific locale
 * Defaults to DEFAULT_LOCALE if invalid
 */
export function getLocaleConfig(locale: unknown): LocaleConfig {
  if (isValidLocale(locale)) {
    return LOCALE_CONFIG[locale];
  }
  return LOCALE_CONFIG[DEFAULT_LOCALE];
}

/**
 * Gets the lang attribute for HTML element
 */
export function getHtmlLang(locale: unknown): string {
  return getLocaleConfig(locale).lang;
}

/**
 * Gets the dir attribute for HTML element
 */
export function getHtmlDir(locale: unknown): 'ltr' | 'rtl' {
  return getLocaleConfig(locale).dir;
}
