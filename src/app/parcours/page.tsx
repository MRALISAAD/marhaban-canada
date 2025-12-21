'use client';

import { useMemo, useState } from 'react';
import { ProgressBar } from '@/components/ProgressBar';
import { TimelineSection } from '@/components/TimelineSection';
import { provinceOptions, useProvince } from '@/components/ProvinceProvider';
import { getTimelineDictionary, type TimelineSection as TimelineSectionType } from '@/content/parcoursTimelineI18n';
import { getContent } from '@/content/siteContent';
import { useChecklistStorage } from '@/hooks/useChecklistStorage';
import { useChecklistLocale } from '@/hooks/useChecklistLocale';
import { ChecklistLanguageSelector } from '@/components/checklist/ChecklistLanguageSelector';

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
      healthWhy: "OHIP gere l'assurance maladie en Ontario. Verifie les conditions d'admissibilite.",
      licenseWhy: 'En Ontario, ServiceOntario gere les echanges de permis.',
    },
    bc: {
      healthTitle: "Carte sante - MSP (Colombie-Britannique)",
      healthWhy: "Le MSP couvre les soins essentiels en Colombie-Britannique.",
      licenseWhy: 'En C.-B., ICBC gere le permis et les equivalences.',
    },
    ab: {
      healthTitle: "Carte sante - AHCIP (Alberta)",
      healthWhy: "L'AHCIP couvre les soins essentiels en Alberta.",
      licenseWhy: "En Alberta, les registries gerent l'echange de permis.",
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
  const { locale, dir } = useChecklistLocale();
  const microcopy = getContent(locale).microcopy;
  const breadcrumbArrow = dir === 'rtl' ? '←' : '→';
  const dictionary = getTimelineDictionary(locale);
  const [query, setQuery] = useState('');
  const [onlyTodo, setOnlyTodo] = useState(false);
  const personalizedSections = useMemo(
    () => personalizeSections(dictionary.sections, province, locale),
    [dictionary.sections, province, locale],
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

  const handleReset = () => {
    if (typeof window === 'undefined') return;
    const confirmReset = window.confirm(dictionary.labels.resetConfirm);
    if (confirmReset) {
      resetChecklist();
    }
  };

  return (
    <main className="bg-slate-50 px-4 py-12" dir={dir} lang={dictionary.locale}>
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{dictionary.labels.eyebrow}</p>
            <ChecklistLanguageSelector />
          </div>
          <p className="text-xs text-slate-500">
            {microcopy.breadcrumbHome} {breadcrumbArrow} {microcopy.breadcrumbJourney}
          </p>
          <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">{microcopy.journeyTitle}</h1>
          <p className="text-sm text-slate-600">{microcopy.journeySubtitle}</p>
          <p className="text-xs text-slate-500">
            {dictionary.labels.provinceLabel}: {getProvinceLabel(province)}
          </p>
        </header>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {dictionary.labels.filtersTitle}
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={dictionary.labels.searchPlaceholder}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
            />
            <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700">
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
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">{dictionary.labels.autoSaveTitle}</p>
                <p className="text-xs text-slate-600">{dictionary.labels.autoSaveSubtitle}</p>
              </div>
              <button
                onClick={handleReset}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
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
            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
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
    </main>
  );
}
