import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { isLocale, getHtmlAttrs, type Locale } from '@/i18n/locales';
import { LanguageProvider } from '@/components/LanguageProvider';
import { HtmlAttributes } from '@/components/HtmlAttributes';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { ProvinceProvider } from '@/components/ProvinceProvider';
import { GlobalProgressBar } from '@/components/GlobalProgressBar';
import { EasyReadProvider } from '@/components/EasyReadProvider'; // Import EasyReadProvider
import { FocusManager } from '@/components/FocusManager';
import { FEATURE_FLAGS } from '@/lib/featureFlags';
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
          <EasyReadProvider> {/* Wrap with EasyReadProvider */}
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
          {FEATURE_FLAGS.ENABLE_PROGRESS && (
            <div className="w-full px-0">
              <div className="sticky top-0 z-40 bg-white/80 backdrop-blur">
                <GlobalProgressBar />
              </div>
            </div>
          )}
          <main id="main-content" className="min-h-[calc(100vh-64px)]" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </EasyReadProvider>
      </ProvinceProvider>
    </LanguageProvider>
    </>
  );
}