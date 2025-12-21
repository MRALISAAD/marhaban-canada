'use client';

import Link from 'next/link';
import type { ChecklistItem } from '@/content/checklistOffline';
import { ShieldCheck } from 'lucide-react';
import { SecureExternalLink } from '@/components/checklist/SecureExternalLink';

type ChecklistItemRowProps = {
  item: ChecklistItem;
  checked: boolean;
  onToggle: (id: string) => void;
  avoidLabel: string;
  sourcesLabel: string;
  viewGuideLabel: string;
};

export function ChecklistItemRow({
  item,
  checked,
  onToggle,
  avoidLabel,
  sourcesLabel,
  viewGuideLabel,
}: ChecklistItemRowProps) {
  const inputId = `${item.id}-checkbox`;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div>
          <input
            id={inputId}
            type="checkbox"
            checked={checked}
            onChange={() => onToggle(item.id)}
            aria-checked={checked}
            className="mt-1 h-4 w-4 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          />
        </div>

        <div className="flex-1">
          <label htmlFor={inputId} className={`cursor-pointer select-none text-sm font-semibold ${checked ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
            {item.title}
          </label>

          <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-amber-700">{avoidLabel}</p>
            <ul className="mt-2 list-disc space-y-1 ps-4">
              {item.avoid.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="mt-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <ShieldCheck className="h-4 w-4 text-slate-500" />
              {sourcesLabel}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {item.sources.map((source) => (
                <SecureExternalLink key={source.href} href={source.href} label={source.label} />
              ))}
            </div>
            {item.guideHref ? (
              <div className="mt-2">
                <Link
                  href={item.guideHref}
                  className="text-xs font-semibold text-slate-700 underline underline-offset-2 hover:text-slate-900"
                >
                  {viewGuideLabel}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
