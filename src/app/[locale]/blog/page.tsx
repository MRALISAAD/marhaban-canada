import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/i18n/locales';
import { resourcesPath } from '@/lib/routes';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';
  return { title: locale === 'fr' ? 'Ressources | Marhaban Canada' : locale === 'en' ? 'Resources | Marhaban Canada' : 'الموارد | مرحبا كندا' };
}

export default async function BlogRedirectPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'fr';
  redirect(resourcesPath(locale));
}
