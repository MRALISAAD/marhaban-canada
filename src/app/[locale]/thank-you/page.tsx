import { redirect } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/locales';
import { bookingThankYouPath } from '@/lib/routes';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ThankYouRedirectPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) {
    redirect('/fr/merci');
  }

  redirect(bookingThankYouPath(localeParam as Locale));
}
