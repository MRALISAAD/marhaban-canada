'use client';

import { useMemo } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { useLocalStorageState } from '@/lib/useLocalStorageState';
import { RedFlagChecklist } from '@/components/scams/RedFlagChecklist';
import { ActionSteps } from '@/components/scams/ActionSteps';
import { SecureExternalLink } from '@/components/checklist/SecureExternalLink';

export type ScamGuide = {
  slug: string;
  title: string;
  subtitle: string;
  scenario: string[];
  redFlags: string[];
  actions: string[];
  neverDo: string[];
  mantra: string;
  sources: { label: string; href: string }[];
};

type ScamGuidePageProps = {
  guide: ScamGuide;
};

type ScamReadMap = Record<string, boolean>;
type ScamFlagsMap = Record<string, Record<string, boolean>>;

export function ScamGuidePage({ guide }: ScamGuidePageProps) {
  const { content } = useLanguage();
  const [readMap, setReadMap] = useLocalStorageState<ScamReadMap>('mc_scams_read', {
    defaultValue: {},
    parse: (value) => JSON.parse(value) as ScamReadMap,
    serialize: (value) => JSON.stringify(value),
  });
  const [flagsMap, setFlagsMap] = useLocalStorageState<ScamFlagsMap>('mc_scams_flags', {
    defaultValue: {},
    parse: (value) => JSON.parse(value) as ScamFlagsMap,
    serialize: (value) => JSON.stringify(value),
  });

  const isRead = !!readMap[guide.slug];
  const flags = useMemo(() => flagsMap[guide.slug] ?? {}, [flagsMap, guide.slug]);

  const toggleRead = () => {
    setReadMap((prev) => ({ ...prev, [guide.slug]: !prev[guide.slug] }));
  };

  const toggleFlag = (flag: string) => {
    setFlagsMap((prev) => ({
      ...prev,
      [guide.slug]: { ...(prev[guide.slug] ?? {}), [flag]: !prev[guide.slug]?.[flag] },
    }));
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              {content.scams.microcopy.pageEyebrow}
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">{guide.title}</h1>
            <p className="mt-2 text-sm text-slate-600">{guide.subtitle}</p>
          </div>
          <button
            onClick={toggleRead}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
            type="button"
          >
            <ShieldCheck className={`h-4 w-4 ${isRead ? 'text-emerald-500' : 'text-slate-400'}`} />
            {isRead ? content.scams.microcopy.backToScams : content.scams.microcopy.needMoreTitle}
          </button>
        </div>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-slate-900">
          {content.scams.microcopy.rulesTitle}
        </p>
        <ul className="mt-3 list-disc space-y-2 ps-4 text-sm text-slate-700">
          {(guide.scenario || []).map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <RedFlagChecklist
        flags={guide.redFlags || []}
        checked={flags}
        onToggle={toggleFlag}
        label={content.scams.microcopy.categoriesTitle}
      />

      <ActionSteps title={content.scams.microcopy.planTitle} steps={guide.actions || []} />

      <ActionSteps title={content.scams.microcopy.victimTitle} steps={guide.neverDo || []} />

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {content.scams.microcopy.planLinkLabel}
        </p>
        <p className="mt-2 text-sm font-semibold text-slate-900">{guide.mantra}</p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-slate-900">
          {content.shared.sectionLabels.sources}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {(guide.sources || []).map((source) => (
            <SecureExternalLink key={source.href} href={source.href} label={source.label} />
          ))}
        </div>
      </section>
    </div>
  );
}
