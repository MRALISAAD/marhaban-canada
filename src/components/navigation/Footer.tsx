'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/components/LanguageProvider';
import { withLocale } from '@/lib/i18n-utils';
import { getHtmlAttrs } from '@/i18n/locales';

// Quick guide steps configuration
const QUICK_GUIDES = [
  { id: 'nas', path: '/parcours/guide/steps/nas' },
  { id: 'health', path: '/parcours/guide/steps/health' },
  { id: 'bank', path: '/parcours/guide/steps/bank' },
  { id: 'phone', path: '/parcours/guide/steps/phone' },
  { id: 'housing', path: '/parcours/guide/steps/housing' },
] as const;

// Main navigation links for footer
const MAIN_LINKS = [
  { id: 'checklist', path: '/checklist' },
  { id: 'parcours', path: '/parcours' },
  { id: 'ressources', path: '/ressources' },
  { id: 'arnaques', path: '/arnaques' },
] as const;

// Secondary links for footer
const SECONDARY_LINKS = [
  { id: 'about', path: '/about' },
  { id: 'contact', path: '/contact' },
  { id: 'legal', path: '/legal' },
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
    // Quick guides
    nas: locale === 'fr' ? 'NAS' : locale === 'en' ? 'SIN' : 'رقم التأمين الاجتماعي',
    health: locale === 'fr' ? 'Santé' : locale === 'en' ? 'Health' : 'الصحة',
    bank: locale === 'fr' ? 'Banque' : locale === 'en' ? 'Bank' : 'البنك',
    phone: locale === 'fr' ? 'Téléphone' : locale === 'en' ? 'Phone' : 'الهاتف',
    housing: locale === 'fr' ? 'Logement' : locale === 'en' ? 'Housing' : 'السكن',
    // Main nav
    checklist: locale === 'fr' ? 'Checklist' : locale === 'en' ? 'Checklist' : 'قائمة التحقق',
    parcours: locale === 'fr' ? 'Parcours' : locale === 'en' ? 'Journey' : 'المسار',
    ressources: locale === 'fr' ? 'Ressources' : locale === 'en' ? 'Resources' : 'الموارد',
    arnaques: locale === 'fr' ? 'Arnaques' : locale === 'en' ? 'Scams' : 'الاحتيالات',
    // Secondary
    about: locale === 'fr' ? 'À propos' : locale === 'en' ? 'About' : 'حول',
    contact: locale === 'fr' ? 'Contact' : locale === 'en' ? 'Contact' : 'اتصل بنا',
    legal: locale === 'fr' ? 'Mentions légales' : locale === 'en' ? 'Legal' : 'إشعار قانوني',
    // Section titles
    guidesTitle: locale === 'fr' ? 'Guides' : locale === 'en' ? 'Guides' : 'أدلة',
    exploreTitle: locale === 'fr' ? 'Explorer' : locale === 'en' ? 'Explore' : 'استكشف',
    infoTitle: locale === 'fr' ? 'Informations' : locale === 'en' ? 'Information' : 'معلومات',
  };

  // Footer content with fallbacks
  const footerContent = content.footer ?? {};

  // Mission text
  const mission =
    footerContent.mission ??
    (locale === 'fr'
      ? "Service d'accompagnement pour nouveaux arrivants au Canada."
      : locale === 'en'
        ? "Support service for newcomers to Canada."
        : "خدمة دعم للوافدين الجدد إلى كندا.");

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
      className="border-t border-slate-200 bg-white"
      aria-label={locale === 'fr' ? 'Pied de page' : locale === 'en' ? 'Footer' : 'تذييل الصفحة'}
      dir={dir}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Column 1: Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href={localizeHref('/')}
              className="inline-flex items-center gap-3 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:rounded-lg"
            >
              <Image
                src="/logo.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10"
                aria-hidden="true"
              />
              <span className="text-lg font-semibold text-slate-900">
                {content.brand}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {mission}
            </p>
          </div>

          {/* Column 2: Guides */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {labels.guidesTitle}
            </h3>
            <nav className="mt-4 space-y-3" aria-label={labels.guidesTitle}>
              {QUICK_GUIDES.map((guide) => (
                <Link
                  key={guide.id}
                  href={localizeHref(guide.path)}
                  className="block text-sm text-slate-700 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:rounded-md"
                >
                  {labels[guide.id as keyof typeof labels]}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Explore */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {labels.exploreTitle}
            </h3>
            <nav className="mt-4 space-y-3" aria-label={labels.exploreTitle}>
              {MAIN_LINKS.map((link) => (
                <Link
                  key={link.id}
                  href={localizeHref(link.path)}
                  className="block text-sm text-slate-700 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:rounded-md"
                >
                  {labels[link.id as keyof typeof labels]}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Information */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {labels.infoTitle}
            </h3>
            <nav className="mt-4 space-y-3" aria-label={labels.infoTitle}>
              {SECONDARY_LINKS.map((link) => (
                <Link
                  key={link.id}
                  href={localizeHref(link.path)}
                  className="block text-sm text-slate-700 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:rounded-md"
                >
                  {labels[link.id as keyof typeof labels]}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-slate-100 pt-8">
          {/* Bottom section */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Disclaimer */}
            <p className="text-xs leading-relaxed text-slate-500 max-w-xl">
              {disclaimer}
            </p>

            {/* Copyright and email */}
            <div className="flex flex-col gap-2 text-xs text-slate-500 sm:items-end">
              <a
                href="mailto:contact@marhabancanada.ca"
                className="transition-colors hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:rounded-md"
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
