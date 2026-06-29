import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import { isLocale } from '@/i18n/locales';

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  redirect(`/${locale}`);
}
