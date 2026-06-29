'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight, Briefcase, Bus, Globe, HeartPulse, Home, Shield, Star, Users } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { resourcesData } from '@/content/resourcesData';
import { useProvince } from '@/components/ProvinceProvider';
import { useLocalStorageState } from '@/lib/useLocalStorageState';
import { SecureExternalLink } from '@/components/checklist/SecureExternalLink';
import { getHtmlAttrs } from '@/i18n/locales';
import LocalizedLink from '@/components/LocalizedLink';
import { RESOURCE_GUIDE_SLUGS, resourceGuideMeta } from '@/content/resourceGuides';
import type { Locale } from '@/i18n/locales';

const categoryIconMap: Record<string, typeof Globe> = {
  arrival: Globe,
  housing: Home,
  health: HeartPulse,
  employment: Briefcase,
  documents: Globe,
  transport: Bus,
  credit: Shield,
  taxes: Shield,
  integration: Users,
};

const isExternal = (url: string) => url.startsWith('http://') || url.startsWith('https://');

export default function RessourcesPage() {
  const { content, locale } = useLanguage();
  const { dir } = getHtmlAttrs(locale);
  const dictionary = content.resourcesPage;
  const resources = content.resources;
  const { province, setProvince } = useProvince();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useLocalStorageState<string[]>('mc_resource_favorites', {
    defaultValue: [],
    parse: (value) => JSON.parse(value) as string[],
    serialize: (value) => JSON.stringify(value),
    validate: (value) => Array.isArray(value),
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const provinceLabelMap = useMemo(
    () => Object.fromEntries(dictionary.provinceOptions.map((option) => [option.value, option.label])),
    [dictionary.provinceOptions],
  );

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    const baseCategories = activeCategory
      ? dictionary.categories.filter((category) => category.id === activeCategory)
      : dictionary.categories;

    return baseCategories
      .map((category) => {
        const items = resourcesData
          .filter((item) => item.category === category.id)
          .filter((item) => item.provinces.includes('all') || item.provinces.includes(province))
          .filter((item) => {
            if (!q) return true;
            const text = dictionary.items[item.id];
            const hay = `${text?.title ?? ''} ${text?.description ?? ''} ${item.tags.join(' ')}`.toLowerCase();
            return hay.includes(q);
          })
          .sort((a, b) => a.priority - b.priority);
        return { ...category, items };
      })
      .filter((category) => category.items.length > 0);
  }, [dictionary.categories, dictionary.items, query, activeCategory, province]);

  const isRtl = dir === 'rtl';
  const alignClass = isRtl ? 'text-right' : 'text-left';
  const categoryHints = resources.sections;

  const sectionKeyMap: Record<string, keyof typeof categoryHints> = {
    arrival: 'arrival',
    housing: 'housing',
    health: 'health',
    employment: 'jobs',
    documents: 'documents',
    transport: 'transport',
    credit: 'credit',
    taxes: 'taxes',
    integration: 'integration',
  };

  const guideCardLabels: Record<Locale, { title: string; cta: string }> = {
    fr: { title: 'Guides thématiques', cta: 'Lire le guide' },
    en: { title: 'Thematic guides', cta: 'Read the guide' },
    ar: { title: 'الأدلة الموضوعية', cta: 'اقرأ الدليل' },
  };

  return (
    <main className="warm-page px-4 pt-6 pb-16 sm:px-6 sm:pt-8" dir={dir} lang={locale}>
      <div className="mx-auto w-full max-w-6xl space-y-8">

        {/* ── Thematic guide cards ── */}
        <section>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-marhaban-clay">
            {guideCardLabels[locale as Locale].title}
          </p>
          <h2 className={`mt-2 font-heading text-2xl font-semibold leading-tight text-marhaban-ink sm:text-3xl ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            {locale === 'fr' ? 'Explorer par thème' : locale === 'en' ? 'Browse by topic' : 'استعرض حسب الموضوع'}
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {RESOURCE_GUIDE_SLUGS.map((slug) => {
              const meta = resourceGuideMeta[slug];
              return (
                <Link
                  key={slug}
                  href={`/${locale}/ressources/${slug}`}
                  className="group flex flex-col gap-3 rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-5 shadow-warm-sm transition hover:-translate-y-0.5 hover:border-marhaban-leaf/30 hover:shadow-warm"
                >
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-marhaban-leaf/15 bg-marhaban-mint text-2xl">
                    {meta.icon}
                  </span>
                  <div>
                    <p className="font-heading text-base font-semibold leading-snug text-marhaban-ink">
                      {meta[locale as Locale]}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs font-medium text-marhaban-leaf">
                      {guideCardLabels[locale as Locale].cta}
                      <ArrowRight className="h-3 w-3 rtl-flip" aria-hidden="true" />
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Hero / header + filters ── */}
        <div className="rounded-[2rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-marhaban-clay">
              {dictionary.labels.eyebrow}
            </p>
          </div>
          <h1 className={`mt-3 font-heading text-3xl font-semibold leading-tight text-marhaban-ink sm:text-4xl ${alignClass}`}>
            {resources.header.title}
          </h1>
          <p className={`mt-3 max-w-3xl text-sm leading-relaxed text-marhaban-ink/78 sm:text-base ${alignClass}`}>
            {resources.header.subtitle}
          </p>
          <div className={`mt-3 space-y-1 text-xs text-marhaban-muted ${alignClass}`}>
            <p>{resources.accompaniment.shortDefinition}</p>
            <p className="font-semibold text-marhaban-ink/82">{resources.accompaniment.noProxyLine}</p>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={resources.header.searchPlaceholder}
              className="w-full rounded-2xl border border-marhaban-leaf/15 bg-marhaban-cream/70 px-3 py-2.5 text-sm text-marhaban-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/30"
            />
            <div className="grid gap-2 sm:grid-cols-2">
              <label className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">
                {resources.header.provinceLabel}
                <select
                  value={province}
                  onChange={(event) => setProvince(event.target.value as typeof province)}
                  className="mt-2 w-full rounded-2xl border border-marhaban-leaf/15 bg-white px-3 py-2.5 text-sm text-marhaban-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/30"
                >
                  {dictionary.provinceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">
                {resources.header.categoryLabel}
                <select
                  value={activeCategory ?? 'all'}
                  onChange={(event) =>
                    setActiveCategory(event.target.value === 'all' ? null : event.target.value)
                  }
                  className="mt-2 w-full rounded-2xl border border-marhaban-leaf/15 bg-white px-3 py-2.5 text-sm text-marhaban-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/30"
                >
                  <option value="all">{dictionary.labels.filterAll}</option>
                  {dictionary.categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>

        {filteredCategories.length === 0 ? (
          <div className="rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 text-sm text-marhaban-muted shadow-warm-sm">
            {dictionary.labels.emptyState}
          </div>
        ) : null}

        {/* ── Categories ── */}
        <div className="space-y-6">
          {filteredCategories.map((category) => {
            const Icon = categoryIconMap[category.id] ?? Globe;
            const sectionKey = sectionKeyMap[category.id] ?? 'arrival';
            const hint = categoryHints[sectionKey]?.hint;
            const recommendedItem = category.items.find((item) => item.recommended);
            return (
              <section
                key={category.id}
                className="rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm sm:p-7"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 rounded-2xl border border-marhaban-leaf/15 bg-marhaban-mint p-2">
                    <Icon className="h-4 w-4 text-marhaban-leaf" />
                  </span>
                  <div>
                    <h2 className={`font-heading text-xl font-semibold text-marhaban-ink ${alignClass}`}>
                      {categoryHints[sectionKey]?.title ?? category.title}
                    </h2>
                    {hint ? <SectionHint text={hint} alignClass={alignClass} /> : null}
                  </div>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {category.items.map((item) => {
                    const text = dictionary.items[item.id];
                    const isFav = favorites.includes(item.id);
                    const isRecommended = recommendedItem?.id === item.id;
                    return (
                      <div
                        key={item.id}
                        className="rounded-[1.25rem] border border-marhaban-leaf/12 bg-marhaban-cream/70 p-5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-marhaban-ink">{text?.title ?? item.id}</p>
                          <div className="flex items-center gap-2">
                            {item.official ? (
                              <span className="rounded-full border border-marhaban-leaf/15 bg-white px-2 py-0.5 text-[0.65rem] font-semibold text-marhaban-ink/60">
                                {dictionary.labels.officialLabel}
                              </span>
                            ) : null}
                            {isRecommended ? <RecommendedBadge label={resources.ui.recommendedStart} /> : null}
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="rounded-full border border-marhaban-leaf/15 bg-white px-2 py-0.5 text-[0.65rem] text-marhaban-ink/60">
                            {category.title}
                          </span>
                          {item.provinces.includes('all') ? (
                            <span className="rounded-full border border-marhaban-leaf/15 bg-white px-2 py-0.5 text-[0.65rem] text-marhaban-ink/60">
                              {dictionary.labels.allProvincesLabel}
                            </span>
                          ) : (
                            item.provinces.map((prov) => (
                              <span
                                key={prov}
                                className="rounded-full border border-marhaban-leaf/15 bg-white px-2 py-0.5 text-[0.65rem] text-marhaban-ink/60"
                              >
                                {provinceLabelMap[prov] ?? prov}
                              </span>
                            ))
                          )}
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-marhaban-muted">{text?.description ?? ''}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {isExternal(item.url) ? (
                            <SecureExternalLink href={item.url} label={resources.ui.openResource} />
                          ) : (
                            <Link
                              href={item.url}
                              className="inline-flex items-center gap-1.5 rounded-full border border-marhaban-leaf/15 bg-white px-3 py-1.5 text-xs font-medium text-marhaban-ink/80 transition hover:border-marhaban-leaf/30 hover:text-marhaban-ink"
                            >
                              {resources.ui.openResource}
                            </Link>
                          )}
                          <button
                            type="button"
                            onClick={() => toggleFavorite(item.id)}
                            className="inline-flex items-center gap-1 rounded-full border border-marhaban-leaf/15 bg-white px-3 py-1.5 text-xs font-medium text-marhaban-ink/80 transition hover:border-marhaban-leaf/30 hover:text-marhaban-ink"
                          >
                            <Star className={`h-3 w-3 ${isFav ? 'text-amber-500' : 'text-marhaban-muted'}`} />
                            {isFav ? dictionary.labels.removeFavoriteLabel : resources.ui.addFavorite}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* ── Footer / CTA ── */}
        <footer className="rounded-[2rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm sm:p-7">
          <p className={`text-sm leading-relaxed text-marhaban-muted ${alignClass}`}>
            {resources.accompaniment.footerHelp}
          </p>
          <div className={`mt-5 flex flex-wrap gap-3 ${isRtl ? 'justify-end' : ''}`}>
            <LocalizedLink
              href="/reserver"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-marhaban-forestDark px-5 py-2.5 text-sm font-bold text-white shadow-warm-xs transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2"
            >
              {locale === 'fr' ? 'Réserver un appel' : locale === 'en' ? 'Book a call' : 'احجز مكالمة'}
              <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
            </LocalizedLink>
          </div>
        </footer>
      </div>
    </main>
  );
}

function SectionHint({ text, alignClass }: { text: string; alignClass: string }) {
  return <p className={`mt-1 text-xs text-marhaban-muted ${alignClass}`}>{text}</p>;
}

function RecommendedBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[0.65rem] font-semibold text-amber-700">
      {label}
    </span>
  );
}
