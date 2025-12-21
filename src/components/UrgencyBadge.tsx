'use client';

type UrgencyBadgeProps = {
  value: number;
};

export function UrgencyBadge({ value }: UrgencyBadgeProps) {
  const base =
    value >= 9
      ? 'bg-red-50 text-red-700 border-red-200'
      : value >= 7
        ? 'bg-amber-50 text-amber-700 border-amber-200'
        : 'bg-slate-50 text-slate-600 border-slate-200';

  return (
    <span className={`urgency-badge inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold ${base} ${value === 10 ? 'pulse-red' : ''}`}>
      Urgence {value}/10
    </span>
  );
}
