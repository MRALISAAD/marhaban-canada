import type { Locale } from '@/i18n/locales';
import {
  aboutPath,
  antiScamPath,
  bookingPath,
  resourcesPath,
} from '@/lib/routes';

type NavLink = {
  label: string;
  href: string;
};

export function getNavigationContent(locale: Locale) {
  const copy = {
    fr: {
      antiScam: 'Anti-arnaque',
      resources: 'Ressources',
      about: 'À propos',
      book: 'Réserver un appel',
    },
    en: {
      antiScam: 'Anti-scam',
      resources: 'Resources',
      about: 'About',
      book: 'Book a call',
    },
    ar: {
      antiScam: 'مكافحة الاحتيال',
      resources: 'الموارد',
      about: 'من نحن',
      book: 'احجز مكالمة',
    },
  } as const;

  const labels = copy[locale];

  const primary: NavLink[] = [
    { label: labels.antiScam, href: antiScamPath(locale) },
    { label: labels.resources, href: resourcesPath(locale) },
  ];

  const secondary: NavLink[] = [{ label: labels.about, href: aboutPath(locale) }];

  const cta = { label: labels.book, href: bookingPath(locale) };

  return { labels, primary, secondary, cta };
}

export type { NavLink };
