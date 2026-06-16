'use client';

import type { ChecklistPhase } from '@/content/checklistOffline';
import { ChecklistItemRow } from '@/components/checklist/ChecklistItemRow';

type ChecklistPhaseSectionProps = {
  phase: ChecklistPhase;
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
  avoidLabel: string;
  sourcesLabel: string;
  viewGuideLabel: string;
};

function pct(done: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((done / total) * 100);
}

export function ChecklistPhaseSection({
  phase,
  checked,
  onToggle,
  avoidLabel,
  sourcesLabel,
  viewGuideLabel,
}: ChecklistPhaseSectionProps) {
  const total = phase.items.length;
  const done = phase.items.reduce((acc, item) => acc + (checked[item.id] ? 1 : 0), 0);
  const progress = pct(done, total);

  return (
    <section className="rounded-3xl border border-marhaban-leaf/15 bg-white/90 p-5 shadow-warm-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">{phase.badge}</p>
          <h2 className="mt-2 text-xl font-semibold text-marhaban-ink">{phase.title}</h2>
          <p className="mt-1 text-sm text-slate-600">{phase.subtitle}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-marhaban-ink">{progress}%</p>
          <p className="text-xs text-slate-500">
            {done}/{total}
          </p>
          <div className="mt-2 h-2 w-28 overflow-hidden rounded-full bg-marhaban-mint">
            <div className="h-full rounded-full bg-marhaban-clay" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {phase.items.map((item) => (
          <ChecklistItemRow
            key={item.id}
            item={item}
            checked={!!checked[item.id]}
            onToggle={onToggle}
            avoidLabel={avoidLabel}
            sourcesLabel={sourcesLabel}
            viewGuideLabel={viewGuideLabel}
          />
        ))}
      </div>
    </section>
  );
}
