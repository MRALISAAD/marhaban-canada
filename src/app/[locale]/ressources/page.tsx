import type { Metadata } from 'next';
import { isLocale } from '@/i18n/locales';
import { publicPageMetadata } from '@/lib/seo';
import RessourcesPageClient from './RessourcesPageClient';

type Props = { params: Promise<{ locale: string }> };

const copy = {
  fr: {
    title: 'Ressources pour nouveaux arrivants',
    description:
      'Guides pratiques, liens officiels et ressources utiles pour organiser les premières démarches au Canada.',
  },
  en: {
    title: 'Resources for newcomers',
    description:
      'Practical guides, official links, and useful resources to organize your first steps in Canada.',
  },
  ar: {
    title: 'موارد للوافدين الجدد',
    description:
      'أدلة عملية وروابط رسمية وموارد مفيدة لتنظيم خطواتك الأولى في كندا.',
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';

  return publicPageMetadata({
    locale,
    path: '/ressources',
    title: copy[locale].title,
    description: copy[locale].description,
  });
}

export default function RessourcesPage() {
  return <RessourcesPageClient />;
}
