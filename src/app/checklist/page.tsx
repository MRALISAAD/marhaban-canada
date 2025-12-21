'use client';

import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { ProgressBar } from '@/components/ProgressBar';
import { ChecklistLanguageSelector } from '@/components/checklist/ChecklistLanguageSelector';
import { ChecklistPhaseSection } from '@/components/checklist/ChecklistPhaseSection';
import { useChecklistLocale } from '@/hooks/useChecklistLocale';
import { useChecklistStorage } from '@/hooks/useChecklistStorage';
import { getChecklistDictionary } from '@/content/checklistOffline';
import { useProvince, provinceOptions } from '@/components/ProvinceProvider';
import { useLanguage } from '@/components/LanguageProvider';

function pct(done: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((done / total) * 100);
}

function getProvinceLabel(value: string) {
  return provinceOptions.find((option) => option.value === value)?.label ?? 'Autre province';
}

export default function ChecklistPage() {
  const { locale, dir } = useChecklistLocale();
  const dictionary = getChecklistDictionary(locale);
  const { province } = useProvince();
  const { content } = useLanguage();
  const { checked, toggleItem, resetChecklist, lastVisit, touch } = useChecklistStorage('mc_checklist_offline_v1');

  useEffect(() => {
    touch();
  }, [touch]);

  const allItems = useMemo(
    () => dictionary.phases.flatMap((phase) => phase.items.map((item) => item.id)),
    [dictionary.phases],
  );
  const done = allItems.reduce((acc, id) => acc + (checked[id] ? 1 : 0), 0);
  const total = allItems.length;
  const progress = pct(done, total);
  const lastVisitLabel = lastVisit ? lastVisit.split('T')[0] : null;

  const handleReset = () => {
    if (typeof window === 'undefined') return;
    const shouldReset = window.confirm(dictionary.labels.confirmReset);
    if (shouldReset) {
      resetChecklist();
    }
  };

  return (
    <main className="bg-slate-50 px-4 py-10" dir={dir} lang={dictionary.locale}>
      <div className="mx-auto w-full max-w-5xl">
        <div className="hidden print:block rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-700">
          <p className="font-semibold text-slate-900">{content.seoDescriptions.pdfHeader}</p>
          <p className="mt-2">{content.serviceAccompagnementDisclaimer}</p>
        </div>
      </div>
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                {dictionary.labels.checklist}
              </p>
              <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-900">{dictionary.labels.title}</h1>
              <p className="mt-2 text-sm text-slate-600">{dictionary.labels.subtitle}</p>
              <p className="mt-2 text-xs text-slate-500">
                Province: {getProvinceLabel(province)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ChecklistLanguageSelector />
              <button
                onClick={handleReset}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
              >
                {dictionary.labels.reset}
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <ProgressBar
              progress={progress}
              label={dictionary.labels.progressLabel}
              helper={`${done}/${total} ${dictionary.labels.progressHelper}`}
            />
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">{dictionary.labels.phaseBadge}</p>
              <div className="mt-3 grid gap-2">
                <Link
                  href="/checklist/semaine-1"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:text-slate-900"
                >
                  {dictionary.phases[0].title}
                </Link>
                <Link
                  href="/checklist/mois-1"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:text-slate-900"
                >
                  {dictionary.phases[1].title}
                </Link>
                <Link
                  href="/checklist/integration"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:text-slate-900"
                >
                  {dictionary.phases[2].title}
                </Link>
              </div>
              {lastVisitLabel ? (
                <p className="mt-3 text-xs text-slate-500">
                  {dictionary.labels.lastVisit}: {lastVisitLabel}
                </p>
              ) : null}
            </div>
          </div>
        </header>

        <div className="space-y-6">
          {dictionary.phases.map((phase) => (
            <ChecklistPhaseSection
              key={phase.id}
              phase={phase}
              checked={checked}
              onToggle={toggleItem}
              avoidLabel={dictionary.labels.avoid}
              sourcesLabel={dictionary.labels.sources}
              viewGuideLabel={dictionary.labels.viewGuide}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
