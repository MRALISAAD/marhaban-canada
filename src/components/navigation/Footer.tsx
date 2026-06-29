'use client';

import Link from 'next/link';
import { BookingModalTrigger } from '@/components/booking/BookingModalTrigger';
import { BrandLogo } from '@/components/site/BrandLogo';
import { useLanguage } from '@/components/LanguageProvider';
import { withLocale } from '@/lib/i18n-utils';
import { getHtmlAttrs } from '@/i18n/locales';

const SUPPORT_LINKS = [
  { id: 'reserver', path: '/reserver' },
  { id: 'antiScam', path: '/anti-arnaque' },
] as const;

const RESOURCE_LINKS = [
  { id: 'ressources', path: '/ressources' },
  { id: 'about', path: '/a-propos' },
] as const;

const LANGUAGE_LINKS = [
  { id: 'fr', path: '/fr' },
  { id: 'en', path: '/en' },
  { id: 'ar', path: '/ar' },
] as const;

/**
 * Footer Component
 *
 * Modern, premium footer with brand, navigation columns, and legal links.
 *
 * Features:
 * - 4-column responsive layout
 * - Brand with logo and mission
 * - Quick guides, main nav, and secondary links
 * - Full keyboard navigation with focus visible
 * - ARIA labels for accessibility
 * - RTL support for Arabic
 * - Mobile-first responsive design
 */
export function Footer() {
  const { locale, content } = useLanguage();
  const { dir } = getHtmlAttrs(locale);

  // Helper to generate localized hrefs
  const localizeHref = (path: string) => withLocale(path, locale);

  // Labels based on locale
  const labels = {
    book: locale === 'fr' ? 'Réserver un appel' : locale === 'en' ? 'Book a call' : 'احجز مكالمة',
    services: locale === 'fr' ? 'Accompagnement' : locale === 'en' ? 'Services' : 'المرافقة',
    reserver: locale === 'fr' ? 'Réserver un appel' : locale === 'en' ? 'Book a call' : 'احجز مكالمة',
    orientation: locale === 'fr' ? 'Appel orientation — 45 min' : locale === 'en' ? 'Orientation call — 45 min' : 'مكالمة التوجيه — 45 دقيقة',
    checklist: locale === 'fr' ? 'Checklist' : locale === 'en' ? 'Checklist' : 'قائمة التحقق',
    ressources: locale === 'fr' ? 'Ressources' : locale === 'en' ? 'Resources' : 'الموارد',
    antiScam: locale === 'fr' ? 'Anti-arnaque' : locale === 'en' ? 'Anti-scam' : 'مكافحة الاحتيال',
    sources: locale === 'fr' ? 'Sources officielles' : locale === 'en' ? 'Official sources' : 'مصادر رسمية',
    about: locale === 'fr' ? 'À propos' : locale === 'en' ? 'About' : 'من نحن',
    legal: locale === 'fr' ? 'Mentions légales' : locale === 'en' ? 'Legal' : 'إشعار قانوني',
    fr: 'Français',
    en: 'English',
    ar: 'العربية',
    supportTitle: locale === 'fr' ? 'Accompagnement' : locale === 'en' ? 'Support' : 'المرافقة',
    resourcesTitle: locale === 'fr' ? 'Ressources' : locale === 'en' ? 'Resources' : 'الموارد',
    trustTitle: locale === 'fr' ? 'Confiance' : locale === 'en' ? 'Trust' : 'الثقة',
    languagesTitle: locale === 'fr' ? 'Langues' : locale === 'en' ? 'Languages' : 'اللغات',
  };

  const bookCallLabel = locale === 'fr' ? 'Appel gratuit — 15 min' : locale === 'en' ? 'Free call — 15 min' : 'مكالمة مجانية — 15 دقيقة';
  const footerLead =
    locale === 'fr'
      ? "Commence avec un appel gratuit de 15 min — la suite arrive bientôt."
      : locale === 'en'
        ? 'Start with a free 15-min call — more options coming soon.'
        : 'ابدأ بمكالمة مجانية لمدة 15 دقيقة — المزيد قريباً.';

  // Footer content with fallbacks
  const footerContent = content.footer ?? {};

  // Mission text
  const mission =
    footerContent.mission ??
    (locale === 'fr'
      ? "Service d'accompagnement pour nouveaux arrivants au Canada."
      : locale === 'en'
        ? "Practical orientation service for newcomers to Canada."
        : "خدمة توجيه عملي للقادمين الجدد إلى كندا.");

  // Disclaimer text
  const disclaimerFr =
    "Marhaban Canada offre un accompagnement général et informatif. Ce service ne remplace pas un avocat, un consultant réglementé en immigration ou un organisme gouvernemental.";
  const disclaimerEn =
    "Marhaban Canada provides general and informational guidance. This service does not replace a lawyer, a regulated immigration consultant, or a government agency.";
  const disclaimerAr =
    "تقدم مرحبا كندا إرشادات عامة ومعلوماتية. لا تحل هذه الخدمة محل محامٍ أو مستشار هجرة معتمد أو جهة حكومية.";
  const disclaimer =
    footerContent.disclaimer ??
    (locale === "fr" ? disclaimerFr : locale === "en" ? disclaimerEn : disclaimerAr);

  return (
    <footer
      className="border-t-2 border-marhaban-leaf/15 bg-[linear-gradient(180deg,rgba(247,241,230,0.99),rgba(243,233,218,0.97))]"
      aria-label={locale === 'fr' ? 'Pied de page' : locale === 'en' ? 'Footer' : 'تذييل الصفحة'}
      dir={dir}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-10 overflow-hidden rounded-[2rem] border border-marhaban-leaf/14 bg-marhaban-forestDark p-6 text-white shadow-[0_24px_70px_rgba(8,42,36,0.22)] lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-marhaban-gold">
                Marhaban Canada
              </p>
              <h2 className="mt-3 font-heading text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl lg:leading-[1.1]">
                {footerLead}
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
              <BookingModalTrigger
                locale={locale}
                href={localizeHref('/reserver/formulaire')}
                className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-marhaban-ink shadow-[0_14px_40px_rgba(0,0,0,0.14)] transition hover:bg-marhaban-mint active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-ink"
              >
                {bookCallLabel}
              </BookingModalTrigger>
              <span
                aria-disabled="true"
                className="inline-flex min-h-[50px] cursor-not-allowed select-none items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white/40"
              >
                {locale === 'fr' ? 'Appel orientation — bientôt disponible' : locale === 'en' ? 'Orientation call — coming soon' : 'مكالمة التوجيه — قريباً'}
              </span>
            </div>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Column 1: Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href={localizeHref('/')}
              className="inline-flex transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2 focus-visible:rounded-lg"
            >
              <BrandLogo size="md" name={content.brand} className="text-xl text-marhaban-ink" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-marhaban-ink/82">
              {mission}
            </p>
          </div>

          {/* Column 2: Support */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-marhaban-clay">
              {labels.supportTitle}
            </h3>
            <nav className="mt-4 space-y-3" aria-label={labels.supportTitle}>
              {SUPPORT_LINKS.map((link) => (
                <Link
                  key={link.id}
                  href={localizeHref(link.path)}
                  className="block text-sm text-marhaban-ink/82 transition-colors hover:text-marhaban-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-2 focus-visible:rounded-md"
                >
              {labels[link.id as keyof typeof labels]}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-marhaban-clay">
              {labels.resourcesTitle}
            </h3>
            <nav className="mt-4 space-y-3" aria-label={labels.resourcesTitle}>
              {RESOURCE_LINKS.map((link) => (
                <Link
                  key={link.id}
                  href={localizeHref(link.path)}
                  className="block text-sm text-marhaban-ink/82 transition-colors hover:text-marhaban-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-2 focus-visible:rounded-md"
                >
                  {labels[link.id as keyof typeof labels]}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Languages */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-marhaban-clay">
              {labels.languagesTitle}
            </h3>
            <nav className="mt-4 space-y-3" aria-label={labels.languagesTitle}>
              {LANGUAGE_LINKS.map((link) => (
                <Link
                  key={link.id}
                  href={link.path}
                  className="block text-sm text-marhaban-ink/82 transition-colors hover:text-marhaban-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-2 focus-visible:rounded-md"
                  hrefLang={link.id}
                >
                  {labels[link.id as keyof typeof labels]}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 rounded-[2rem] border border-marhaban-leaf/10 bg-white/55 p-5">
          {/* Bottom section */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Disclaimer */}
            <p className="max-w-3xl text-xs leading-relaxed text-marhaban-ink/74">
              {disclaimer}
            </p>

            {/* Copyright and email */}
            <div className="flex flex-col gap-2 text-xs text-marhaban-ink/74 sm:items-end">
              <a
                href="mailto:contact@marhabancanada.ca"
                className="transition-colors hover:text-marhaban-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-2 focus-visible:rounded-md"
              >
                contact@marhabancanada.ca
              </a>
              <p>
                © {new Date().getFullYear()} {content.brand}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
