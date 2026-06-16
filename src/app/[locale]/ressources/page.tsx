'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Briefcase, Bus, Globe, HeartPulse, Home, Shield, Star, Users } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { resourcesData } from '@/content/resourcesData';
import { useProvince } from '@/components/ProvinceProvider';
import { useLocalStorageState } from '@/lib/useLocalStorageState';
import { SecureExternalLink } from '@/components/checklist/SecureExternalLink';
import { getHtmlAttrs } from '@/i18n/locales';
import LocalizedLink from '@/components/LocalizedLink';

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

  const guideCards = useMemo(
    () => [
      { id: 'documents', data: resources.quickGuides.documentsCard },
      { id: 'transport', data: resources.quickGuides.transportCard },
      { id: 'credit', data: resources.quickGuides.creditCard },
    ],
    [resources.quickGuides],
  );

  const isRtl = dir === 'rtl';
  const alignClass = isRtl ? 'text-right' : 'text-left';
  const categoryHints = resources.sections;
  // Guide links removed from ressources page - available via /parcours/guide

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

  return (
    <main className="warm-page px-4 py-12" dir={dir} lang={locale}>
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className="rounded-3xl border border-marhaban-leaf/15 bg-white/90 p-6 shadow-warm-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-marhaban-clay">
              {dictionary.labels.eyebrow}
            </p>
          </div>
          <h1 className={`mt-3 text-3xl font-semibold leading-tight text-marhaban-ink sm:text-4xl ${alignClass}`}>
            {resources.header.title}
          </h1>
          <p className={`mt-3 max-w-3xl text-sm text-slate-700 sm:text-base ${alignClass}`}>{resources.header.subtitle}</p>
          <div className={`mt-3 space-y-1 text-xs text-slate-500 ${alignClass}`}>
            <p>{resources.accompaniment.shortDefinition}</p>
            <p className="font-semibold text-slate-600">{resources.accompaniment.noProxyLine}</p>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
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

        <section className="grid gap-4 md:grid-cols-3">
          {guideCards.map((guide) => (
            <div key={guide.id} className="rounded-3xl border border-marhaban-leaf/15 bg-white/90 p-5 shadow-warm-sm">
              <p className="text-sm font-semibold text-marhaban-ink">{guide.data.title}</p>
              <p className="mt-1 text-xs text-slate-600">{guide.data.body}</p>
              <div className="mt-4">
                <LocalizedLink
                  href={guide.data.href}
                  className="inline-flex items-center rounded-full bg-marhaban-ink px-4 py-2 text-xs font-semibold text-white hover:bg-marhaban-leaf"
                >
                  {guide.data.ctaLabel}
                </LocalizedLink>
              </div>
            </div>
          ))}
        </section>

        {filteredCategories.length === 0 ? (
          <div className="rounded-3xl border border-marhaban-leaf/15 bg-white/90 p-5 text-sm text-slate-600 shadow-warm-sm">
            {dictionary.labels.emptyState}
          </div>
        ) : null}

        <div className="space-y-6">
          {filteredCategories.map((category) => {
            const Icon = categoryIconMap[category.id] ?? Globe;
            const sectionKey = sectionKeyMap[category.id] ?? 'arrival';
            const hint = categoryHints[sectionKey]?.hint;
            const recommendedItem = category.items.find((item) => item.recommended);
            return (
              <section key={category.id} className="rounded-3xl border border-marhaban-leaf/15 bg-white/90 p-6 shadow-warm-sm">
                <div className="flex items-start gap-3">
                  <span className="mt-1 rounded-2xl border border-marhaban-leaf/15 bg-marhaban-mint p-2">
                    <Icon className="h-4 w-4 text-marhaban-leaf" />
                  </span>
                  <div>
                    <h2 className={`text-lg font-semibold text-marhaban-ink ${alignClass}`}>
                      {categoryHints[sectionKey]?.title ?? category.title}
                    </h2>
                    {hint ? <SectionHint text={hint} alignClass={alignClass} /> : null}
                  </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {category.items.map((item) => {
                    const text = dictionary.items[item.id];
                    const isFav = favorites.includes(item.id);
                    const isRecommended = recommendedItem?.id === item.id;
                    return (
                      <div key={item.id} className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 p-4">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-marhaban-ink">{text?.title ?? item.id}</p>
                          <div className="flex items-center gap-2">
                            {item.official ? (
                              <span className="rounded-full border border-marhaban-leaf/15 bg-white px-2 py-0.5 text-[0.65rem] font-semibold text-slate-600">
                                {dictionary.labels.officialLabel}
                              </span>
                            ) : null}
                            {isRecommended ? <RecommendedBadge label={resources.ui.recommendedStart} /> : null}
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="rounded-full border border-marhaban-leaf/15 bg-white px-2 py-0.5 text-[0.65rem] text-slate-600">
                            {category.title}
                          </span>
                          {item.provinces.includes('all') ? (
                            <span className="rounded-full border border-marhaban-leaf/15 bg-white px-2 py-0.5 text-[0.65rem] text-slate-600">
                              {dictionary.labels.allProvincesLabel}
                            </span>
                          ) : (
                            item.provinces.map((prov) => (
                              <span
                                key={prov}
                                className="rounded-full border border-marhaban-leaf/15 bg-white px-2 py-0.5 text-[0.65rem] text-slate-600"
                              >
                                {provinceLabelMap[prov] ?? prov}
                              </span>
                            ))
                          )}
                        </div>
                        <p className="mt-1 text-xs text-slate-600">{text?.description ?? ''}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {isExternal(item.url) ? (
                            <SecureExternalLink href={item.url} label={resources.ui.openResource} />
                          ) : (
                            <Link
                              href={item.url}
                              className="inline-flex items-center rounded-full border border-marhaban-leaf/15 bg-white px-3 py-1 text-xs text-slate-700 hover:text-marhaban-ink"
                            >
                              {resources.ui.openResource}
                            </Link>
                          )}
                          <button
                            type="button"
                            onClick={() => toggleFavorite(item.id)}
                            className="inline-flex items-center gap-1 rounded-full border border-marhaban-leaf/15 bg-white px-3 py-1 text-xs text-slate-700 hover:text-marhaban-ink"
                          >
                            <Star className={`h-3 w-3 ${isFav ? 'text-amber-500' : 'text-slate-400'}`} />
                            {isFav ? dictionary.labels.removeFavoriteLabel : resources.ui.addFavorite}
                          </button>
                        </div>
                        {/* Guide link hidden on ressources page - available via /parcours/guide */}
                      </div>
                    );
                  })}
                </div>
                {/* Guide link hidden on ressources page */}
              </section>
            );
          })}
        </div>

        <footer className="rounded-3xl border border-marhaban-leaf/15 bg-white/90 p-6 shadow-warm-sm">
          <p className={`text-sm text-slate-700 ${alignClass}`}>{resources.accompaniment.footerHelp}</p>
          <LocalizedLink
            href="/parcours"
            className={`mt-3 inline-flex items-center text-sm font-semibold text-marhaban-ink underline underline-offset-4 ${alignClass}`}
          >
            {resources.ui.backToPath}
          </LocalizedLink>
        </footer>
      </div>
    </main>
  );
}

function SectionHint({ text, alignClass }: { text: string; alignClass: string }) {
  return <p className={`mt-1 text-xs text-slate-500 ${alignClass}`}>{text}</p>;
}

function RecommendedBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[0.65rem] font-semibold text-amber-700">
      {label}
    </span>
  );
}

// SeeGuideLink removed - guide links hidden on ressources page
// Users can access guides via /parcours/guide
