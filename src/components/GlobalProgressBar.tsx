'use client';

import { useMemo } from 'react';
import { useChecklistStorage } from '@/hooks/useChecklistStorage';
import { getChecklistDictionary } from '@/content/checklistOffline';
import { FEATURE_FLAGS } from '@/lib/featureFlags';
import { useLanguage } from '@/components/LanguageProvider';

export function GlobalProgressBar() {
  // La barre globale suit toujours la langue de l'interface (FR / EN / AR),
  // même si la checklist a été consultée dans une autre langue auparavant.
  const { locale: uiLocale } = useLanguage();
  const { checked } = useChecklistStorage('mc_checklist_progress'); // Using a specific key for global progress

  const checklistDictionary = getChecklistDictionary(uiLocale);

  const totalItems = useMemo(() => {
    return checklistDictionary.phases.reduce((count, phase) => count + phase.items.length, 0);
  }, [checklistDictionary]);

  const completedItems = useMemo(() => {
    return checklistDictionary.phases.reduce((count, phase) => {
      return (
        count +
        phase.items.filter((item) => checked[item.id]).length
      );
    }, 0);
  }, [checklistDictionary, checked]);

  if (!FEATURE_FLAGS.ENABLE_PROGRESS) {
    return null;
  }

  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  // Barre de progression discrète en haut
  return (
    <div className="w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-2">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-slate-600">
            {checklistDictionary.labels.progressLabel}
          </span>
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${progress}% ${checklistDictionary.labels.progressHelper}`}>
              <div 
                className="h-full rounded-full bg-amber-600 transition-all duration-300" 
                style={{ width: `${progress}%` }} 
              />
            </div>
            <span className="text-xs font-semibold text-slate-700 min-w-[3rem] text-right">
              {progress}%
            </span>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            {completedItems} / {totalItems}
          </span>
        </div>
      </div>
    </div>
  );
}
