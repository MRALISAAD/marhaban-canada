'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

const footerSections = {
  fr: [
    {
      id: 'services',
      title: 'Services',
      links: [
        { href: '/parcours', label: 'Parcours' },
        { href: '/ressources', label: 'Ressources' },
        { href: '/arnaques', label: 'Arnaques' },
      ],
    },
    {
      id: 'guides',
      title: 'Guides',
      links: [
        { href: '/parcours/guide/steps/nas', label: 'NAS' },
        { href: '/parcours/guide/steps/logement', label: 'Logement' },
        { href: '/parcours/guide/steps/banque', label: 'Banque' },
        { href: '/parcours/guide/steps/telephone', label: 'Téléphone' },
      ],
    },
    {
      id: 'mentions',
      title: 'Mentions',
      links: [
        { href: '/mentions', label: 'Mentions / Avertissement' },
        { href: '/sources', label: 'Sources & fiabilité' },
        { href: '/blog', label: 'Blog' },
      ],
    },
  ],
  en: [
    {
      id: 'services',
      title: 'Services',
      links: [
        { href: '/parcours', label: 'Journey' },
        { href: '/ressources', label: 'Resources' },
        { href: '/arnaques', label: 'Scams' },
      ],
    },
    {
      id: 'guides',
      title: 'Guides',
      links: [
        { href: '/parcours/guide/steps/nas', label: 'SIN (NAS)' },
        { href: '/parcours/guide/steps/housing', label: 'Housing' },
        { href: '/parcours/guide/steps/banque', label: 'Banking' },
        { href: '/parcours/guide/steps/telephone', label: 'Phone' },
      ],
    },
    {
      id: 'mentions',
      title: 'Mentions',
      links: [
        { href: '/mentions', label: 'Notice / Disclaimer' },
        { href: '/sources', label: 'Sources & trust' },
        { href: '/blog', label: 'Blog' },
      ],
    },
  ],
  ar: [
    {
      id: 'services',
      title: 'الخدمات',
      links: [
        { href: '/parcours', label: 'المسار' },
        { href: '/ressources', label: 'الموارد' },
        { href: '/arnaques', label: 'الاحتيال' },
      ],
    },
    {
      id: 'guides',
      title: 'الأدلة',
      links: [
        { href: '/parcours/guide/steps/nas', label: 'رقم التأمين' },
        { href: '/parcours/guide/steps/logement', label: 'السكن' },
        { href: '/parcours/guide/steps/banque', label: 'البنك' },
        { href: '/parcours/guide/steps/telephone', label: 'الهاتف' },
      ],
    },
    {
      id: 'mentions',
      title: 'معلومات',
      links: [
        { href: '/mentions', label: 'تنبيه / إخلاء مسؤولية' },
        { href: '/sources', label: 'المصادر والموثوقية' },
        { href: '/blog', label: 'المدونة' },
      ],
    },
  ],
};

export function Footer() {
  const { content, locale, dir } = useLanguage();
  const sections = footerSections[locale];
  const isRTL = dir === 'rtl';
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const trustLine =
    (content as { footer?: { legal?: { trustLine?: string } } }).footer?.legal?.trustLine ??
    (locale === 'ar'
      ? 'نعتمد فقط على مصادر رسمية يمكن التحقق منها.'
      : locale === 'en'
        ? 'We rely on verified official sources.'
        : 'Nous nous appuyons sur des sources officielles vérifiables.');
  const accompagnementLine =
    content.serviceAccompagnementDisclaimer ??
    (locale === 'ar'
      ? 'خدمة مرافقة وتوجيه. لا تحل مكان الخدمات الرسمية.'
      : locale === 'en'
        ? 'Guidance and support service. Does not replace official services.'
        : 'Service d’accompagnement et d’orientation. Ne remplace pas les services officiels.');
  const noProxyLine =
    content.serviceAccompagnementNoProxy ??
    (locale === 'ar'
      ? 'نحن لا نقوم بأي إجراء رسمي نيابةً عنك.'
      : locale === 'en'
        ? 'We do not perform any official procedure on your behalf.'
        : 'Nous n’effectuons aucune démarche officielle à votre place.');
  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-50" dir={dir}>
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              {content.brand}
            </p>
            <p className="mt-3 text-sm text-slate-600">{accompagnementLine}</p>
            <p className="mt-3 text-sm text-slate-600">{noProxyLine}</p>
            <p className="mt-3 text-sm text-slate-600">{content.footer.disclaimer}</p>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
              <a className="font-semibold text-slate-700 hover:text-slate-900" href={`mailto:${content.contactEmail}`}>
                {content.contactEmail}
              </a>
              <p className="mt-2">{content.globalDisclaimer}</p>
            </div>
          </div>

          <div className="hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:block">
            <div className="grid gap-6 sm:grid-cols-3">
              {sections.map((section) => (
                <div key={section.id}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {section.title}
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        {link.href.startsWith('mailto:') ? (
                          <a className="block min-h-[44px] rounded-md transition hover:text-slate-900" href={link.href}>
                            {link.label}
                          </a>
                        ) : (
                          <Link className="block min-h-[44px] rounded-md transition hover:text-slate-900" href={link.href}>
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:hidden">
            <div className="space-y-3">
              {sections.map((section) => (
                <div key={section.id} className="rounded-2xl border border-slate-200 px-4 py-3">
                  <button
                    type="button"
                    className={`flex min-h-[44px] w-full items-center justify-between text-sm font-semibold text-slate-800 ${
                      isRTL ? 'text-right' : 'text-left'
                    }`}
                    onClick={() => toggleSection(section.id)}
                    aria-expanded={Boolean(openSections[section.id])}
                  >
                    <span>{section.title}</span>
                    <span className="text-xs">{openSections[section.id] ? '−' : '+'}</span>
                  </button>
                  {openSections[section.id] ? (
                    <ul className={`mt-3 space-y-2 text-sm text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {section.links.map((link) => (
                        <li key={link.href}>
                          {link.href.startsWith('mailto:') ? (
                            <a className="block min-h-[44px] transition hover:text-slate-900" href={link.href}>
                              {link.label}
                            </a>
                          ) : (
                            <Link className="block min-h-[44px] transition hover:text-slate-900" href={link.href}>
                              {link.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {content.brand}. {content.footer.rights}
          </p>
          <p>{trustLine}</p>
        </div>
      </div>
    </footer>
  );
}
