import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { isLocale, getHtmlAttrs, type Locale } from '@/i18n/locales';
import { LanguageProvider } from '@/components/LanguageProvider';
import { HtmlAttributes } from '@/components/HtmlAttributes';
import { ProvinceProvider } from '@/components/ProvinceProvider';
import { EasyReadProvider } from '@/components/EasyReadProvider';
import { FocusManager } from '@/components/FocusManager';
import { PublicLayout } from '@/components/layout/PublicLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marhaban Canada',
  description:
    'Service d\'accompagnement pour nouveaux arrivants au Canada : démarches, logement, banque, téléphone, prévention des arnaques.',
  openGraph: {
    title: 'Marhaban Canada',
    description:
      'Service d\'accompagnement pour nouveaux arrivants au Canada : démarches, logement, banque, téléphone, prévention des arnaques.',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const { lang, dir } = getHtmlAttrs(locale);

  return (
    <>
      <HtmlAttributes lang={lang} dir={dir} />
      <LanguageProvider locale={locale}>
        <ProvinceProvider>
          <EasyReadProvider>
            <FocusManager />
            <PublicLayout
              skipLabel={
                locale === 'fr'
                  ? 'Aller au contenu principal'
                  : locale === 'en'
                    ? 'Skip to main content'
                    : 'انتقل إلى المحتوى الرئيسي'
              }
            >
              {children}
            </PublicLayout>
        </EasyReadProvider>
      </ProvinceProvider>
    </LanguageProvider>
    </>
  );
}
