'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/components/LanguageProvider';
import { withLocale } from '@/lib/i18n-utils';
import { getHtmlAttrs } from '@/i18n/locales';
import { bookingPath } from '@/lib/routes';

const SUPPORT_LINKS = [
  { id: 'book', path: '/reserver' },
  { id: 'contact', path: '/contact' },
  { id: 'parcours', path: '/parcours' },
] as const;

const RESOURCE_LINKS = [
  { id: 'checklist', path: '/checklist' },
  { id: 'ressources', path: '/ressources' },
  { id: 'guides', path: '/parcours/guide' },
] as const;

const TRUST_LINKS = [
  { id: 'arnaques', path: '/arnaques' },
  { id: 'sources', path: '/sources' },
  { id: 'legal', path: '/legal' },
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
    contact: locale === 'fr' ? 'Contact' : locale === 'en' ? 'Contact' : 'اتصل بنا',
    parcours: locale === 'fr' ? 'Parcours' : locale === 'en' ? 'Journey' : 'المسار',
    checklist: locale === 'fr' ? 'Checklist' : locale === 'en' ? 'Checklist' : 'قائمة التحقق',
    ressources: locale === 'fr' ? 'Ressources' : locale === 'en' ? 'Resources' : 'الموارد',
    guides: locale === 'fr' ? 'Guides pratiques' : locale === 'en' ? 'Practical guides' : 'أدلة عملية',
    arnaques: locale === 'fr' ? 'Arnaques' : locale === 'en' ? 'Scams' : 'الاحتيالات',
    sources: locale === 'fr' ? 'Sources officielles' : locale === 'en' ? 'Official sources' : 'مصادر رسمية',
    legal: locale === 'fr' ? 'Mentions légales' : locale === 'en' ? 'Legal' : 'إشعار قانوني',
    fr: 'Français',
    en: 'English',
    ar: 'العربية',
    supportTitle: locale === 'fr' ? 'Accompagnement' : locale === 'en' ? 'Support' : 'المرافقة',
    resourcesTitle: locale === 'fr' ? 'Ressources' : locale === 'en' ? 'Resources' : 'الموارد',
    trustTitle: locale === 'fr' ? 'Confiance' : locale === 'en' ? 'Trust' : 'الثقة',
    languagesTitle: locale === 'fr' ? 'Langues' : locale === 'en' ? 'Languages' : 'اللغات',
  };

  const bookCallLabel = locale === 'fr' ? 'Réserver un appel' : locale === 'en' ? 'Book a call' : 'احجز مكالمة';
  const footerLead =
    locale === 'fr'
      ? 'Une orientation pratique, claire et humaine pour avancer sans confusion.'
      : locale === 'en'
        ? 'Practical, clear, human orientation to move forward without confusion.'
        : 'توجيه عملي وواضح وإنساني للتقدم بدون تشويش.';

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
  const disclaimer =
    footerContent.disclaimer ??
    (locale === 'fr'
      ? 'Marhaban Canada offre de l’orientation pratique et de l’information générale. Nous ne fournissons pas de conseils juridiques ni de conseils en immigration. Pour les questions liées aux visas, permis, résidence permanente, admissibilité ou stratégie d’immigration, veuillez consulter un représentant autorisé.'
      : locale === 'en'
        ? 'Marhaban Canada offers practical orientation and general information. We do not provide legal advice or immigration advice. For questions related to visas, permits, permanent residence, admissibility, or immigration strategy, please consult an authorized representative.'
        : 'تقدم مرحبا كندا توجيهاً عملياً ومعلومات عامة. نحن لا نقدم نصائح قانونية ولا نصائح في الهجرة. للأسئلة المتعلقة بالتأشيرات أو التصاريح أو الإقامة الدائمة أو الأهلية أو استراتيجية الهجرة، يرجى استشارة ممثل معتمد.');

  return (
    <footer
      className="border-t border-marhaban-leaf/10 bg-[linear-gradient(180deg,rgba(247,241,230,0.98),rgba(243,233,218,0.96))]"
      aria-label={locale === 'fr' ? 'Pied de page' : locale === 'en' ? 'Footer' : 'تذييل الصفحة'}
      dir={dir}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-10 overflow-hidden rounded-[2rem] border border-marhaban-leaf/14 bg-marhaban-ink p-6 text-white shadow-[0_24px_70px_rgba(31,45,43,0.18)]">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-marhaban-gold">
                Marhaban Canada
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                {footerLead}
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-white/74">{disclaimer}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
              <Link
                href={bookingPath(locale)}
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-marhaban-ink transition hover:bg-marhaban-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-ink"
              >
                {bookCallLabel}
              </Link>
              <Link
                href={localizeHref('/about')}
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/25 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-ink"
              >
                {locale === 'fr' ? 'En savoir plus' : locale === 'en' ? 'Learn more' : 'اعرف المزيد'}
              </Link>
            </div>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 lg:gap-12">
          {/* Column 1: Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href={localizeHref('/')}
              className="inline-flex items-center gap-3 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2 focus-visible:rounded-lg"
            >
              <Image
                src="/logo.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10"
                aria-hidden="true"
              />
              <span className="text-lg font-semibold text-marhaban-ink">
                {content.brand}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-marhaban-ink/70">
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
                  className="block text-sm text-marhaban-ink/70 transition-colors hover:text-marhaban-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-2 focus-visible:rounded-md"
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
                  className="block text-sm text-marhaban-ink/70 transition-colors hover:text-marhaban-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-2 focus-visible:rounded-md"
                >
                  {labels[link.id as keyof typeof labels]}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Trust */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-marhaban-clay">
              {labels.trustTitle}
            </h3>
            <nav className="mt-4 space-y-3" aria-label={labels.trustTitle}>
              {TRUST_LINKS.map((link) => (
                <Link
                  key={link.id}
                  href={localizeHref(link.path)}
                  className="block text-sm text-marhaban-ink/70 transition-colors hover:text-marhaban-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-2 focus-visible:rounded-md"
                >
                  {labels[link.id as keyof typeof labels]}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 5: Languages */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-marhaban-clay">
              {labels.languagesTitle}
            </h3>
            <nav className="mt-4 space-y-3" aria-label={labels.languagesTitle}>
              {LANGUAGE_LINKS.map((link) => (
                <Link
                  key={link.id}
                  href={link.path}
                  className="block text-sm text-marhaban-ink/70 transition-colors hover:text-marhaban-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-2 focus-visible:rounded-md"
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
            <p className="max-w-3xl text-xs leading-relaxed text-marhaban-ink/60">
              {disclaimer}
            </p>

            {/* Copyright and email */}
            <div className="flex flex-col gap-2 text-xs text-marhaban-ink/60 sm:items-end">
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
