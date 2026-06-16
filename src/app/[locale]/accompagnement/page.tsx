import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/i18n/locales';
import { servicesPath } from '@/lib/routes';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';
  return { title: locale === 'fr' ? 'Services | Marhaban Canada' : locale === 'en' ? 'Services | Marhaban Canada' : 'الخدمات | مرحبا كندا' };
}

export default async function AccompagnementRedirectPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'fr';
  redirect(servicesPath(locale));
}
