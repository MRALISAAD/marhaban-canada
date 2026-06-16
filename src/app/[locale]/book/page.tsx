import { redirect, notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/locales';
import { bookingPath } from '@/lib/routes';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BookPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  redirect(bookingPath(locale));
}
