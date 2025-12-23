'use client';

import LocalizedLink from './LocalizedLink';
import type { TimelineItem } from '@/content/parcoursTimelineI18n';

type ChecklistItemCardProps = {
  item: TimelineItem;
  checked: boolean;
  onToggle: (id: string) => void;
  labels: {
    how: string;
    avoid: string;
    sources: string;
    viewGuide: string;
  };
};

export function ChecklistItemCard({ item, checked, onToggle, labels }: ChecklistItemCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(item.id)}
          className="mt-1 h-4 w-4"
        />
        <div className="flex-1">
          <div className={`text-sm font-semibold ${checked ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
            {item.title}
          </div>
          <p className="mt-1 text-sm text-slate-600">{item.why}</p>
          {item.guideHref ? (
            <div className="mt-2">
              <LocalizedLink
                href={item.guideHref}
                className="text-xs font-semibold text-slate-700 underline underline-offset-2 hover:text-slate-900"
              >
                {labels.viewGuide}
              </LocalizedLink>
            </div>
          ) : null}
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{labels.how}</p>
              <ol className="mt-2 list-decimal space-y-1 ps-4 text-xs text-slate-600">
                {item.how.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{labels.avoid}</p>
              <ul className="mt-2 list-disc space-y-1 ps-4 text-xs text-slate-600">
                {item.avoid.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{labels.sources}</p>
              <ul className="mt-2 space-y-1 text-xs text-slate-600">
                {item.sources.map((source) => (
                  <li key={source.href}>
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-2 hover:text-slate-900"
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
}
