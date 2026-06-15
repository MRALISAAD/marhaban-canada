import { redirect } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/locales';
import { withLocale } from '@/lib/i18n-utils';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ReserverUnAppelPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'fr';

  redirect(withLocale('/book', locale));
}
