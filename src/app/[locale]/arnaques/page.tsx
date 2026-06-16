import { redirect, notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/locales';
import { antiScamPath } from '@/lib/routes';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ArnaquesAliasPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  redirect(antiScamPath(locale));
}
