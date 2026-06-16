import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/i18n/locales';
import { startPath } from '@/lib/routes';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';
  return { title: locale === 'fr' ? 'Commencer | Marhaban Canada' : locale === 'en' ? 'Start | Marhaban Canada' : 'ابدأ | مرحبا كندا' };
}

export default async function ChecklistRedirectPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'fr';
  redirect(startPath(locale));
}
