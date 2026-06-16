'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Search, AlertTriangle } from 'lucide-react';
import { scamCategories } from '@/content/scams';
import { ScamCategoryGrid } from '@/components/scams/ScamCategoryGrid';
import { EmergencyCTA } from '@/components/scams/EmergencyCTA';
import { ScamQuiz } from '@/components/scams/ScamQuiz';
import { useLanguage } from '@/components/LanguageProvider';
import { getHtmlAttrs } from '@/i18n/locales';
import LocalizedLink from '@/components/LocalizedLink';

export default function ArnaquesPage() {
  const { content, locale } = useLanguage();
  const { dir } = getHtmlAttrs(locale);
  const isRTL = dir === 'rtl';
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filterAllLabel = locale === 'fr' ? 'Toutes' : locale === 'en' ? 'All' : 'الكل';
  const headerImageAlt =
    locale === 'fr'
      ? 'Illustration Marhaban Canada sur la verification des situations suspectes'
      : locale === 'en'
        ? 'Marhaban Canada visual about checking suspicious situations'
        : 'صورة من مرحبا كندا حول التحقق من الحالات المشبوهة';

  const categoryTitleByLocale: Record<string, Partial<Record<string, string>>> = {
    fr: {},
    en: {
      housing: 'Housing',
      jobs: 'Jobs',
      phone: 'Phone / plans',
      bank: 'Bank / cards / fees',
      immigration: 'Fake representatives / fake agents',
      marketplace: 'Marketplace (Kijiji/FB)',
    },
    ar: {
      housing: 'السكن',
      jobs: 'العمل',
      phone: 'الهاتف / الباقات',
      bank: 'البنك / البطاقات / الرسوم',
      immigration: 'ممثلون مزيفون / وكلاء مزيفون',
      marketplace: 'البيع عبر المنصات',
    },
  };

  const titleMap = categoryTitleByLocale[locale] ?? categoryTitleByLocale.fr;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = activeCategory ? scamCategories.filter((cat) => cat.id === activeCategory) : scamCategories;
    if (!q) return base;
    return base.filter((category) => {
      const hay = `${category.title} ${category.summary} ${category.keywords.join(' ')}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, activeCategory]);

  return (
    <main className="warm-page px-4 py-12" dir={dir} lang={locale}>
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div className="overflow-hidden rounded-3xl border border-marhaban-leaf/15 bg-white/90 shadow-warm-sm">
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_0.82fr] lg:items-stretch">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-marhaban-clay">
                {content.scams.microcopy.pageEyebrow}
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight text-marhaban-ink sm:text-4xl">
                {content.scams.microcopy.pageTitle}
              </h1>
              <p className="mt-3 max-w-3xl text-sm text-slate-700 sm:text-base">{content.scams.microcopy.pageSubtitle}</p>
              <p className="mt-2 text-xs text-slate-500">{content.serviceAccompagnementDefinition.body}</p>
              <p className="mt-2 text-xs font-semibold text-slate-600">{content.serviceAccompagnementNoProxy}</p>
            </div>
            <div className="relative min-h-[240px] overflow-hidden rounded-premium bg-marhaban-mint shadow-premium-card lg:min-h-full">
              <Image
                src="/assets/marhaban/visuel-arnaque.jpg"
                alt={headerImageAlt}
                fill
                sizes="(min-width: 1024px) 38vw, calc(100vw - 3rem)"
                className="object-cover"
              />
            </div>
          </div>
          <div className="mx-6 mb-6 mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:mx-8 sm:mb-8 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-amber-200 p-1.5">
                    <AlertTriangle className="h-4 w-4 text-amber-700" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-900">{content.scams.microcopy.startHousingTitle}</p>
                    <p className="mt-1.5 text-sm text-amber-800">{content.scams.microcopy.startHousingText}</p>
                    {content.scams.microcopy.startHousingSubtext && (
                      <p className="mt-1 text-xs text-amber-700">{content.scams.microcopy.startHousingSubtext}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 sm:ml-4">
                <LocalizedLink
                  href="/arnaques/logement"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-amber-700 bg-amber-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-800 hover:border-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2"
                  aria-label={content.scams.microcopy.startHousingCtaAria || content.scams.microcopy.startHousingCta}
                >
                  {content.scams.microcopy.startHousingCta}
                </LocalizedLink>
              </div>
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-marhaban-leaf/15 bg-marhaban-cream/75 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">
                {content.scams.microcopy.rulesTitle}
              </p>
              <ul className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                {content.scams.housing.rules.map((rule: string) => (
                  <li key={rule} className="rounded-2xl border border-marhaban-leaf/12 bg-white/85 px-3 py-2">
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <div className="relative">
                <Search
                  className={`absolute top-3 h-4 w-4 text-slate-400 ${
                    isRTL ? 'right-3' : 'left-3'
                  }`}
                />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={content.scams.microcopy.searchPlaceholder}
                  className={`w-full rounded-2xl border border-marhaban-leaf/15 bg-white py-2.5 text-sm text-marhaban-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/30 ${
                    isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'
                  }`}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCategory(null)}
                  className={`rounded-full border px-3 py-1 text-xs ${
                    activeCategory === null ? 'border-marhaban-ink bg-marhaban-ink text-white' : 'border-marhaban-leaf/20 bg-white text-slate-600'
                  }`}
                >
                  {filterAllLabel}
                </button>
                {scamCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    className={`rounded-full border px-3 py-1 text-xs ${
                      activeCategory === category.id
                        ? 'border-marhaban-ink bg-marhaban-ink text-white'
                        : 'border-marhaban-leaf/20 bg-white text-slate-600'
                    }`}
                  >
                    {titleMap[category.id] ?? category.title}
                  </button>
                ))}
              </div>
              <EmergencyCTA />
            </div>
          </div>
        </div>

        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-marhaban-clay">
            {content.scams.microcopy.categoriesTitle}
          </h2>
          <ScamCategoryGrid categories={filtered} />
        </section>

        <section id="victim-action" className="rounded-3xl border border-amber-200 bg-[#FFF4E3] p-6 shadow-warm-sm">
          <h2 className="text-lg font-semibold text-amber-900">{content.scams.microcopy.victimTitle}</h2>
          <p className="mt-2 text-sm text-amber-800">{content.scams.microcopy.victimSubtitle}</p>
          <ol className="mt-4 list-decimal space-y-3 ps-4 text-sm text-amber-900">
            {content.scams.microcopy.victimPlanSteps.map((step: string, index: number) => (
              <li key={index} className="font-medium">{step}</li>
            ))}
          </ol>
        </section>

        <ScamQuiz />
      </div>
    </main>
  );
}
