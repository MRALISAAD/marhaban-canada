import { redirect, notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/locales';
import { accompanimentPath } from '@/lib/routes';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function OrientationAliasPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  redirect(accompanimentPath(locale));
}
