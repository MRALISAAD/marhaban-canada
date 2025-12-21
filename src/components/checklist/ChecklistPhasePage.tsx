'use client';

import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { ProgressBar } from '@/components/ProgressBar';
import { ChecklistLanguageSelector } from '@/components/checklist/ChecklistLanguageSelector';
import { ChecklistPhaseSection } from '@/components/checklist/ChecklistPhaseSection';
import { useChecklistLocale } from '@/hooks/useChecklistLocale';
import { useChecklistStorage } from '@/hooks/useChecklistStorage';
import { getChecklistDictionary } from '@/content/checklistOffline';

type ChecklistPhasePageProps = {
  phaseId: 'week-1' | 'month-1' | 'integration';
};

function pct(done: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((done / total) * 100);
}

export function ChecklistPhasePage({ phaseId }: ChecklistPhasePageProps) {
  const { locale, dir } = useChecklistLocale();
  const dictionary = getChecklistDictionary(locale);
  const { checked, toggleItem, resetChecklist, lastVisit, touch } = useChecklistStorage('mc_checklist_offline_v1');

  useEffect(() => {
    touch();
  }, [touch]);

  const phase = dictionary.phases.find((item) => item.id === phaseId);
  const allItems = useMemo(
    () => dictionary.phases.flatMap((section) => section.items.map((item) => item.id)),
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

  if (!phase) {
    return null;
  }

  return (
    <main className="bg-slate-50 px-4 py-10" dir={dir} lang={dictionary.locale}>
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Link
                href="/checklist"
                className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 hover:text-slate-700"
              >
                {dictionary.labels.checklist}
              </Link>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900">{phase.title}</h1>
              <p className="mt-2 text-sm text-slate-600">{phase.subtitle}</p>
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
              <p className="mt-2 text-xs text-slate-500">{phase.badge}</p>
              {lastVisitLabel ? (
                <p className="mt-3 text-xs text-slate-500">
                  {dictionary.labels.lastVisit}: {lastVisitLabel}
                </p>
              ) : null}
            </div>
          </div>
        </header>

        <ChecklistPhaseSection
          phase={phase}
          checked={checked}
          onToggle={toggleItem}
          avoidLabel={dictionary.labels.avoid}
          sourcesLabel={dictionary.labels.sources}
          viewGuideLabel={dictionary.labels.viewGuide}
        />
      </div>
    </main>
  );
}
