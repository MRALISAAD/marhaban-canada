'use client';

import { useMemo, useState } from 'react';
import { ProgressBar } from '@/components/ProgressBar';
import { TimelineSection } from '@/components/TimelineSection';
import { provinceOptions, useProvince } from '@/components/ProvinceProvider';
import { getTimelineDictionary, type TimelineSection as TimelineSectionType } from '@/content/parcoursTimelineI18n';
import { getContent } from '@/content/siteContent';
import { useChecklistStorage } from '@/hooks/useChecklistStorage';
import { useLanguage } from '@/components/LanguageProvider';
import { getHtmlAttrs } from '@/i18n/locales';
import { AccessibleModal } from '@/components/ui/AccessibleModal';

type ProvinceKey = 'qc' | 'on' | 'bc' | 'ab' | 'other';
type LocaleKey = 'fr' | 'en' | 'ar';

const provinceOverrides: Record<
  LocaleKey,
  Record<
    ProvinceKey,
    {
      healthTitle: string;
      healthWhy: string;
      licenseWhy: string;
    }
  >
> = {
  fr: {
    qc: {
      healthTitle: "Carte sante - RAMQ (Quebec)",
      healthWhy: "La RAMQ couvre les soins essentiels au Quebec. Anticipe le delai d'attente.",
      licenseWhy: 'Au Quebec, certaines equivalences permettent un echange rapide.',
    },
    on: {
      healthTitle: "Carte sante - OHIP (Ontario)",
      healthWhy: "OHIP gere l'assurance maladie en Ontario. Verifie les conditions d'acces.",
      licenseWhy: 'En Ontario, ServiceOntario gere les etapes de conduite.',
    },
    bc: {
      healthTitle: "Carte sante - MSP (Colombie-Britannique)",
      healthWhy: "Le MSP couvre les soins essentiels en Colombie-Britannique.",
      licenseWhy: 'En C.-B., ICBC gere les etapes de conduite et les equivalences.',
    },
    ab: {
      healthTitle: "Carte sante - AHCIP (Alberta)",
      healthWhy: "L'AHCIP couvre les soins essentiels en Alberta.",
      licenseWhy: "En Alberta, les registries gerent les etapes de conduite.",
    },
    other: {
      healthTitle: "Carte sante - programme provincial",
      healthWhy: 'Chaque province a ses delais et conditions. Verifie les formulaires.',
      licenseWhy: 'Les demarches changent selon la province. Verifie les equivalences.',
    },
  },
  en: {
    qc: {
      healthTitle: 'Health card - RAMQ (Quebec)',
      healthWhy: 'RAMQ covers essential care in Quebec. Expect a waiting period.',
      licenseWhy: 'In Quebec, some equivalencies allow faster exchange.',
    },
    on: {
      healthTitle: 'Health card - OHIP (Ontario)',
      healthWhy: 'OHIP manages Ontario health coverage. Check eligibility.',
      licenseWhy: 'In Ontario, ServiceOntario manages license exchanges.',
    },
    bc: {
      healthTitle: 'Health card - MSP (British Columbia)',
      healthWhy: 'MSP covers essential care in British Columbia.',
      licenseWhy: 'In B.C., ICBC manages licenses and equivalencies.',
    },
    ab: {
      healthTitle: 'Health card - AHCIP (Alberta)',
      healthWhy: 'AHCIP covers essential care in Alberta.',
      licenseWhy: 'In Alberta, registries manage license exchanges.',
    },
    other: {
      healthTitle: 'Health card - provincial program',
      healthWhy: 'Each province has timelines and conditions. Check forms.',
      licenseWhy: 'Steps vary by province. Check equivalencies.',
    },
  },
  ar: {
    qc: {
      healthTitle: 'بطاقة الصحة - RAMQ (كيبيك)',
      healthWhy: 'RAMQ تغطي الرعاية الاساسية في كيبيك مع فترة انتظار.',
      licenseWhy: 'في كيبيك يمكن لبعض المعادلات تسريع الاجراءات.',
    },
    on: {
      healthTitle: 'بطاقة الصحة - OHIP (اونتاريو)',
      healthWhy: 'OHIP يدير التغطية الصحية في اونتاريو. تحقق من الشروط.',
      licenseWhy: 'في اونتاريو، ServiceOntario يدير تبديل الرخص.',
    },
    bc: {
      healthTitle: 'بطاقة الصحة - MSP (كولومبيا البريطانية)',
      healthWhy: 'MSP يغطي الرعاية الاساسية في كولومبيا البريطانية.',
      licenseWhy: 'في كولومبيا البريطانية، ICBC يدير الرخص.',
    },
    ab: {
      healthTitle: 'بطاقة الصحة - AHCIP (البرتا)',
      healthWhy: 'AHCIP يغطي الرعاية الاساسية في البرتا.',
      licenseWhy: 'في البرتا، مكاتب التسجيل تدير تبديل الرخص.',
    },
    other: {
      healthTitle: 'بطاقة الصحة - برنامج المقاطعة',
      healthWhy: 'لكل مقاطعة شروط ومدد خاصة. تحقق من النماذج.',
      licenseWhy: 'الخطوات تختلف حسب المقاطعة. تحقق من المعادلات.',
    },
  },
};

function personalizeSections(sections: TimelineSectionType[], province: ProvinceKey, locale: LocaleKey) {
  const overrides = provinceOverrides[locale][province];
  return sections.map((section) => ({
    ...section,
    items: section.items.map((item) => {
      if (item.id === 'health-card') {
        return { ...item, title: overrides.healthTitle, why: overrides.healthWhy };
      }
      if (item.id === 'driver-license') {
        return { ...item, why: overrides.licenseWhy };
      }
      return item;
    }),
  }));
}

function applyPhaseMicrocopy(sections: TimelineSectionType[], microcopy: { [key: string]: string }) {
  const phaseCopy: Record<TimelineSectionType['id'], { title: string; description: string }> = {
    'week-1': { title: microcopy.phaseWeek1Title, description: microcopy.phaseWeek1Desc },
    'month-1': { title: microcopy.phaseMonth1Title, description: microcopy.phaseMonth1Desc },
    ongoing: { title: microcopy.phaseOngoingTitle, description: microcopy.phaseOngoingDesc },
  };

  return sections.map((section) => ({
    ...section,
    title: phaseCopy[section.id]?.title ?? section.title,
    description: phaseCopy[section.id]?.description ?? section.description,
  }));
}

function getProvinceLabel(value: ProvinceKey) {
  return provinceOptions.find((option) => option.value === value)?.label ?? 'Autre province';
}

function pct(done: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((done / total) * 100);
}

export default function ParcoursPage() {
  const { province } = useProvince();
  const { locale: routeLocale } = useLanguage();
  const { dir } = getHtmlAttrs(routeLocale);
  const microcopy = getContent(routeLocale).microcopy;
  const breadcrumbArrow = dir === 'rtl' ? '←' : '→';
  const dictionary = getTimelineDictionary(routeLocale);
  const [query, setQuery] = useState('');
  const [onlyTodo, setOnlyTodo] = useState(false);
  const personalizedSections = useMemo(
    () => personalizeSections(dictionary.sections, province, routeLocale),
    [dictionary.sections, province, routeLocale],
  );
  const phasedSections = useMemo(
    () => applyPhaseMicrocopy(personalizedSections, microcopy),
    [personalizedSections, microcopy],
  );
  const allItemIds = useMemo(
    () => phasedSections.flatMap((section) => section.items.map((item) => item.id)),
    [phasedSections],
  );
  const { checked, toggleItem, resetChecklist, lastVisit } = useChecklistStorage('mc_parcours_checklist_v1');

  const total = allItemIds.length;
  const done = allItemIds.reduce((acc, id) => acc + (checked[id] ? 1 : 0), 0);
  const progress = pct(done, total);
  const lastVisitLabel = lastVisit ? lastVisit.split('T')[0] : null;

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    return phasedSections
      .map((section) => {
        const items = section.items.filter((item) => {
          if (onlyTodo && checked[item.id]) return false;
          if (!q) return true;
          const hay = `${item.title} ${item.why} ${item.how.join(' ')} ${item.avoid.join(' ')}`.toLowerCase();
          return hay.includes(q);
        });
        return { ...section, items };
      })
      .filter((section) => section.items.length > 0);
  }, [phasedSections, query, onlyTodo, checked]);

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
      title: 'Réinitialiser le parcours',
      confirm: 'Réinitialiser',
      cancel: 'Annuler',
    },
    en: {
      title: 'Reset journey',
      confirm: 'Reset',
      cancel: 'Cancel',
    },
    ar: {
      title: 'إعادة تعيين الرحلة',
      confirm: 'إعادة تعيين',
      cancel: 'إلغاء',
    },
  };

  const modalLabels = resetModalLabels[dictionary.locale] || resetModalLabels.fr;

  return (
    <main className="warm-page px-4 py-12" dir={dir} lang={dictionary.locale}>
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header className="rounded-3xl border border-marhaban-leaf/15 bg-white/90 p-6 shadow-warm-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-marhaban-clay">{dictionary.labels.eyebrow}</p>
          </div>
          <p className="mt-3 text-xs font-medium text-marhaban-leaf">
            {microcopy.breadcrumbHome} {breadcrumbArrow} {microcopy.breadcrumbJourney}
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-marhaban-ink sm:text-4xl">{microcopy.journeyTitle}</h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-700 sm:text-base">{microcopy.journeySubtitle}</p>
          <p className="mt-3 text-xs font-semibold text-slate-600">
            {dictionary.labels.provinceLabel}: {getProvinceLabel(province)}
          </p>
        </header>

        <div className="rounded-3xl border border-marhaban-leaf/15 bg-white/90 p-5 shadow-warm-sm">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">
            {dictionary.labels.filtersTitle}
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={dictionary.labels.searchPlaceholder}
              className="w-full rounded-2xl border border-marhaban-leaf/15 bg-marhaban-cream/70 px-3 py-2.5 text-sm text-marhaban-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/30"
            />
            <label className="flex items-center gap-2 rounded-2xl border border-marhaban-leaf/15 bg-marhaban-cream/70 px-3 py-2.5 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={onlyTodo}
                onChange={(event) => setOnlyTodo(event.target.checked)}
                className="h-4 w-4"
              />
              {dictionary.labels.todoOnlyLabel}
            </label>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <ProgressBar
            progress={progress}
            label={dictionary.labels.progressLabel}
            helper={`${done}/${total} ${dictionary.labels.progressHelper}`}
          />
          <div className="rounded-3xl border border-marhaban-leaf/15 bg-white/90 p-5 shadow-warm-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-marhaban-ink">{dictionary.labels.autoSaveTitle}</p>
                <p className="text-xs text-slate-600">{dictionary.labels.autoSaveSubtitle}</p>
              </div>
              <button
                type="button"
                onClick={handleResetClick}
                aria-label={dictionary.labels.resetLabel}
                className="rounded-full border border-marhaban-leaf/20 bg-marhaban-cream px-3 py-1.5 text-xs font-semibold text-marhaban-ink transition-colors hover:bg-marhaban-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/30 focus-visible:ring-offset-2 active:bg-marhaban-mint"
              >
                {dictionary.labels.resetLabel}
              </button>
            </div>
            {lastVisitLabel ? (
              <p className="mt-3 text-xs text-slate-500">
                {dictionary.labels.lastVisitLabel}: {lastVisitLabel}
              </p>
            ) : null}
          </div>
        </div>

        <div className="space-y-5">
          {filteredSections.length === 0 ? (
            <div className="rounded-3xl border border-marhaban-leaf/15 bg-white/90 p-5 text-sm text-slate-600 shadow-warm-sm">
              {dictionary.labels.emptyState}
            </div>
          ) : null}
          {filteredSections.map((section) => (
            <TimelineSection
              key={section.id}
              section={section}
              checked={checked}
              onToggle={toggleItem}
              labels={{
                steps: dictionary.labels.stepsLabel,
                how: dictionary.labels.howLabel,
                avoid: dictionary.labels.avoidLabel,
                sources: dictionary.labels.sourcesLabel,
                viewGuide: dictionary.labels.viewGuideLabel,
              }}
            />
          ))}
        </div>
      </div>

      <AccessibleModal
        isOpen={isResetModalOpen}
        onClose={handleResetCancel}
        onConfirm={handleResetConfirm}
        title={modalLabels.title}
        message={dictionary.labels.resetConfirm}
        confirmLabel={modalLabels.confirm}
        cancelLabel={modalLabels.cancel}
      />
    </main>
  );
}
