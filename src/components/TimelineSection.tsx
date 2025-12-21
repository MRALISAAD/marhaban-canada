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
  Important: 'bg-amber-50 text-amber-700 border-amber-200',
  'En continu': 'bg-slate-100 text-slate-700 border-slate-200',
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

  return (
    <section id={section.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="mt-1 rounded-full border border-slate-200 bg-white p-2">{iconMap[section.id]}</div>
          <div>
            <p
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
                badgeStyles[section.badge]
              }`}
            >
              {section.badge}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">{section.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{section.description}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-600">{sectionPct}%</p>
          <p className="text-xs text-slate-500">
            {sectionDone}/{sectionTotal} {labels.steps}
          </p>
          <div className="mt-2 h-2 w-32 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-slate-900" style={{ width: `${sectionPct}%` }} />
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
