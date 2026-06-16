import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { isLocale, getHtmlAttrs, type Locale } from '@/i18n/locales';
import { LanguageProvider } from '@/components/LanguageProvider';
import { HtmlAttributes } from '@/components/HtmlAttributes';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { ProvinceProvider } from '@/components/ProvinceProvider';
import { EasyReadProvider } from '@/components/EasyReadProvider';
import { FocusManager } from '@/components/FocusManager';
import { FloatingBookCallButton } from '@/components/FloatingBookCallButton';
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
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-slate-900 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            {locale === 'fr'
              ? 'Aller au contenu principal'
              : locale === 'en'
                ? 'Skip to main content'
                : 'انتقل إلى المحتوى الرئيسي'}
          </a>
          <Navbar />
          <main id="main-content" className="min-h-[calc(100vh-64px)] scroll-mt-24 pb-32 md:pb-0" tabIndex={-1}>
            {children}
          </main>
          <FloatingBookCallButton />
          <Footer />
        </EasyReadProvider>
      </ProvinceProvider>
    </LanguageProvider>
    </>
  );
}
