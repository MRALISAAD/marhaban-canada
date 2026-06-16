import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/i18n/locales';
import { resourcePath } from '@/lib/routes';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';
  return { title: locale === 'fr' ? `Ressource: ${slug} | Marhaban Canada` : locale === 'en' ? `Resource: ${slug} | Marhaban Canada` : `مورد: ${slug} | مرحبا كندا` };
}

export default async function BlogSlugRedirectPage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'fr';
  redirect(resourcePath(locale, slug));
}
