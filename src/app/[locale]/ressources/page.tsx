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
    <main className="warm-page px-4 pt-16 pb-20 sm:px-6 sm:pt-20" dir={dir} lang={locale}>
      <div className="mx-auto w-full max-w-6xl space-y-8">

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

        {/* ── Guide cards ── */}
        <section className="rounded-[2rem] border border-marhaban-leaf/15 bg-marhaban-forestDark p-5 text-white shadow-warm sm:rounded-[2.5rem] sm:p-6 lg:p-7">
          <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-8">
            <div className={alignClass}>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-marhaban-gold">
                {locale === 'fr' ? 'Guides rapides' : locale === 'en' ? 'Quick guides' : 'أدلة سريعة'}
              </p>
              <h2 className="mt-3 font-heading text-2xl font-semibold leading-tight text-white sm:text-3xl">
                {locale === 'fr' ? 'Commencer par ce qui débloque le plus.' : locale === 'en' ? 'Start with what unlocks the most.' : 'ابدأ بما يفتح الطريق أكثر.'}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#edf7f2]">
                {locale === 'fr'
                  ? 'Trois points de départ pour éviter de chercher partout à la fois.'
                  : locale === 'en'
                    ? 'Three starting points so you do not search everywhere at once.'
                    : 'ثلاث نقاط بداية حتى لا تبحث في كل مكان دفعة واحدة.'}
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {guideCards.map((guide) => (
                <div
                  key={guide.id}
                  className="flex flex-col rounded-[1.5rem] border border-white/12 bg-white/[0.07] p-5 transition duration-200 hover:bg-white/[0.11]"
                >
                  <p className="font-heading text-lg font-semibold leading-tight text-white">{guide.data.title}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#edf7f2]">{guide.data.body}</p>
                  <div className="mt-5">
                    <LocalizedLink
                      href={guide.data.href}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-marhaban-gold px-5 py-2.5 text-sm font-bold text-marhaban-ink shadow-[0_14px_40px_rgba(213,168,79,0.22)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark"
                    >
                      {guide.data.ctaLabel}
                      <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
                    </LocalizedLink>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

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

        {/* ── Footer / CTA ── */}
        <footer className="rounded-[2rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm sm:p-7">
          <p className={`text-sm leading-relaxed text-marhaban-muted ${alignClass}`}>
            {resources.accompaniment.footerHelp}
          </p>
          <div className={`mt-5 flex flex-wrap gap-3 ${isRtl ? 'justify-end' : ''}`}>
            <LocalizedLink
              href="/parcours"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-marhaban-leaf/20 bg-marhaban-mint/40 px-5 py-2.5 text-sm font-bold text-marhaban-ink transition hover:bg-marhaban-mint hover:border-marhaban-leaf/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2"
            >
              {resources.ui.backToPath}
              <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
            </LocalizedLink>
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

// SeeGuideLink removed - guide links hidden on ressources page
// Users can access guides via /parcours/guide
