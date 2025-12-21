'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { scamCategories } from '@/content/scams';
import { ScamCategoryGrid } from '@/components/scams/ScamCategoryGrid';
import { EmergencyCTA } from '@/components/scams/EmergencyCTA';
import { ScamQuiz } from '@/components/scams/ScamQuiz';
import { useLanguage } from '@/components/LanguageProvider';

export default function ArnaquesPage() {
  const { content } = useLanguage();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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
    <main className="bg-slate-50 px-4 py-12">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            {content.scams.microcopy.pageEyebrow}
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
            {content.scams.microcopy.pageTitle}
          </h1>
          <p className="mt-2 text-sm text-slate-600">{content.scams.microcopy.pageSubtitle}</p>
          <p className="mt-2 text-xs text-slate-500">{content.serviceAccompagnementDefinition.body}</p>
          <p className="mt-2 text-xs font-semibold text-slate-600">{content.serviceAccompagnementNoProxy}</p>
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <p className="font-semibold">{content.scams.microcopy.startHousingTitle}</p>
            <p className="mt-1 text-amber-800">{content.scams.microcopy.startHousingText}</p>
            <Link
              href={`/arnaques/logement`}
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-amber-900 underline underline-offset-4"
            >
              {content.scams.microcopy.startHousingCta}
            </Link>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {content.scams.microcopy.rulesTitle}
              </p>
              <ul className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                {content.scams.housing.rules.map((rule) => (
                  <li key={rule} className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={content.scams.microcopy.searchPlaceholder}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCategory(null)}
                  className={`rounded-full border px-3 py-1 text-xs ${
                    activeCategory === null ? 'border-slate-900 text-slate-900' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  Toutes
                </button>
                {scamCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    className={`rounded-full border px-3 py-1 text-xs ${
                      activeCategory === category.id
                        ? 'border-slate-900 text-slate-900'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
              <EmergencyCTA />
            </div>
          </div>
        </header>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              {content.scams.microcopy.categoriesTitle}
            </h2>
            <Link
              href="#plan-action"
              className="text-xs font-semibold text-slate-600 underline underline-offset-2"
            >
              {content.scams.microcopy.planLinkLabel}
            </Link>
          </div>
          <ScamCategoryGrid categories={filtered} />
        </section>

        <section id="plan-action" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">{content.scams.microcopy.planTitle}</h2>
          <p className="mt-2 text-sm text-slate-600">{content.scams.microcopy.planSubtitle}</p>
          <ol className="mt-4 list-decimal space-y-2 ps-4 text-sm text-slate-700">
            {content.scams.housing.planSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <ScamQuiz />
      </div>
    </main>
  );
}
