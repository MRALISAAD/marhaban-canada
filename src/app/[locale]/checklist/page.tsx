'use client';

import { useEffect, useMemo, useState } from 'react';
import { ProgressBar } from '@/components/ProgressBar';
import { ChecklistPhaseSection } from '@/components/checklist/ChecklistPhaseSection';
import { useChecklistStorage } from '@/hooks/useChecklistStorage';
import { getChecklistDictionary } from '@/content/checklistOffline';
import { useProvince, provinceOptions } from '@/components/ProvinceProvider';
import { useLanguage } from '@/components/LanguageProvider';
import { getHtmlAttrs } from '@/i18n/locales';
import LocalizedLink from '@/components/LocalizedLink';
import { JustArrivedMode } from '@/components/JustArrivedMode';
import { ContentUpdateDate } from '@/components/ContentUpdateDate';
import { FEATURE_FLAGS } from '@/lib/featureFlags';
import { AccessibleModal } from '@/components/ui/AccessibleModal';

declare global {
  interface Window {
    plausible?: (event: string, options?: Record<string, unknown>) => void;
  }
}

function pct(done: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((done / total) * 100);
}

function getProvinceLabel(value: string) {
  return provinceOptions.find((option) => option.value === value)?.label ?? 'Autre province';
}

export default function ChecklistPage() {
  const { locale: routeLocale } = useLanguage();
  const { dir } = getHtmlAttrs(routeLocale);
  const dictionary = getChecklistDictionary(routeLocale);
  const { province } = useProvince();
  const { content } = useLanguage();
  // Use route locale for storage key to separate FR/AR checklists
  const storageKey = `mc_checklist_offline_${routeLocale}_v1`;
  const { checked, toggleItem, resetChecklist, lastVisit, touch } = useChecklistStorage(storageKey);

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
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handleResetConfirm = () => {
    resetChecklist();
    setIsResetModalOpen(false);
  };

  const handleResetCancel = () => {
    setIsResetModalOpen(false);
  };

  const resetModalLabels = {
    fr: {
      title: 'Réinitialiser la checklist',
      confirm: 'Réinitialiser',
      cancel: 'Annuler',
    },
    en: {
      title: 'Reset checklist',
      confirm: 'Reset',
      cancel: 'Cancel',
    },
    ar: {
      title: 'إعادة تعيين القائمة',
      confirm: 'إعادة تعيين',
      cancel: 'إلغاء',
    },
  };

  const modalLabels = resetModalLabels[routeLocale] || resetModalLabels.fr;

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
                {content.resources.header.provinceLabel}: {getProvinceLabel(province)}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={handleResetClick}
                aria-label={dictionary.labels.reset}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30 focus-visible:ring-offset-2 active:bg-slate-100"
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
                <LocalizedLink
                  href="/checklist/semaine-1"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:text-slate-900"
                >
                  {dictionary.phases[0].title}
                </LocalizedLink>
                <LocalizedLink
                  href="/checklist/mois-1"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:text-slate-900"
                >
                  {dictionary.phases[1].title}
                </LocalizedLink>
                <LocalizedLink
                  href="/checklist/integration"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:text-slate-900"
                >
                  {dictionary.phases[2].title}
                </LocalizedLink>
              </div>
              {lastVisitLabel ? (
                <p className="mt-3 text-xs text-slate-500">
                  {dictionary.labels.lastVisit}: {lastVisitLabel}
                </p>
              ) : null}
            </div>
          </div>
        </header>

        {/* Mode "Je viens d'arriver aujourd'hui" */}
        {FEATURE_FLAGS.ENABLE_JUST_ARRIVED_MODE && (
          <div className="mb-6">
            <JustArrivedMode />
          </div>
        )}

        <div className="space-y-6">
          {dictionary.phases.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-sm text-slate-600">
                {routeLocale === 'fr'
                  ? 'Aucune phase disponible pour le moment.'
                  : routeLocale === 'en'
                    ? 'No phases available at the moment.'
                    : 'لا توجد مراحل متاحة في الوقت الحالي.'}
              </p>
            </div>
          ) : (
            dictionary.phases.map((phase) => (
              <div key={phase.id} id={`${phase.id}-section`}>
                <ChecklistPhaseSection
                  phase={phase}
                  checked={checked}
                  onToggle={toggleItem}
                  avoidLabel={dictionary.labels.avoid}
                  sourcesLabel={dictionary.labels.sources}
                  viewGuideLabel={dictionary.labels.viewGuide}
                />
              </div>
            ))
          )}
        </div>

        {/* Date de mise à jour */}
        {FEATURE_FLAGS.ENABLE_CONTENT_UPDATE_DATE && (
          <div className="mt-8 text-center">
            <ContentUpdateDate />
          </div>
        )}
      </div>

      <AccessibleModal
        isOpen={isResetModalOpen}
        onClose={handleResetCancel}
        onConfirm={handleResetConfirm}
        title={modalLabels.title}
        message={dictionary.labels.confirmReset}
        confirmLabel={modalLabels.confirm}
        cancelLabel={modalLabels.cancel}
      />
    </main>
  );
}
