import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/i18n/locales';
import { antiScamServicePath } from '@/lib/routes';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';
  return { title: locale === 'fr' ? 'Anti-arnaque | Marhaban Canada' : locale === 'en' ? 'Anti-scam | Marhaban Canada' : 'مكافحة الاحتيال | مرحبا كندا' };
}

export default async function AntiArnaqueRedirectPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'fr';
  redirect(antiScamServicePath(locale));
}
