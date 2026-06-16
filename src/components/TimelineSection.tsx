'use client';

import type { ReactNode } from 'react';
import { AlarmClock, CalendarCheck, RefreshCcw } from 'lucide-react';
import type { TimelineSection as TimelineSectionType } from '@/content/parcoursTimelineI18n';
import { ChecklistItemCard } from '@/components/ChecklistItemCard';

type TimelineSectionProps = {
  section: TimelineSectionType;
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
  labels: {
    steps: string;
    how: string;
    avoid: string;
    sources: string;
    viewGuide: string;
  };
};

const badgeStyles: Record<TimelineSectionType['badge'], string> = {
  Urgent: 'bg-rose-50 text-rose-700 border-rose-200',
  Important: 'bg-[#FFF4E3] text-marhaban-clay border-amber-200',
  'En continu': 'bg-marhaban-mint text-marhaban-leaf border-marhaban-leaf/20',
};

const iconMap: Record<TimelineSectionType['id'], ReactNode> = {
  'week-1': <AlarmClock className="h-5 w-5 text-rose-500" />,
  'month-1': <CalendarCheck className="h-5 w-5 text-amber-500" />,
  ongoing: <RefreshCcw className="h-5 w-5 text-slate-500" />,
};

function pct(done: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((done / total) * 100);
}

export function TimelineSection({ section, checked, onToggle, labels }: TimelineSectionProps) {
  const sectionTotal = section.items.length;
  const sectionDone = section.items.reduce((acc, item) => acc + (checked[item.id] ? 1 : 0), 0);
  const sectionPct = pct(sectionDone, sectionTotal);
  const badgeClass = badgeStyles[section.badge as keyof typeof badgeStyles] ?? badgeStyles['En continu'];

  return (
    <section id={section.id} className="relative overflow-hidden rounded-[2rem] border border-marhaban-leaf/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(251,247,239,0.94))] p-5 shadow-[0_18px_54px_rgba(31,45,43,0.08)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-marhaban-sand via-marhaban-leaf to-marhaban-orange" aria-hidden="true" />
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="mt-1 rounded-2xl border border-marhaban-leaf/15 bg-marhaban-mint p-2">{iconMap[section.id]}</div>
          <div>
            <p className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${badgeClass}`}>
              {section.badge}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-marhaban-ink">{section.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{section.description}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-marhaban-ink">{sectionPct}%</p>
          <p className="text-xs text-slate-500">
            {sectionDone}/{sectionTotal} {labels.steps}
          </p>
          <div className="mt-2 h-2 w-32 overflow-hidden rounded-full bg-marhaban-mint">
            <div className="h-full rounded-full bg-marhaban-clay" style={{ width: `${sectionPct}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {section.items.map((item) => (
          <ChecklistItemCard
            key={item.id}
            item={item}
            checked={!!checked[item.id]}
            onToggle={onToggle}
            labels={{
              how: labels.how,
              avoid: labels.avoid,
              sources: labels.sources,
              viewGuide: labels.viewGuide,
            }}
          />
        ))}
      </div>
    </section>
  );
}
