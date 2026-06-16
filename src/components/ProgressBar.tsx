type ProgressBarProps = {
  progress: number;
  label: string;
  helper?: string;
};

export function ProgressBar({ progress, label, helper }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div className="rounded-[2rem] border border-marhaban-leaf/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(247,241,230,0.92))] p-5 shadow-[0_18px_54px_rgba(31,45,43,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-marhaban-ink">{label}</p>
        <span className="rounded-full bg-marhaban-mint px-2.5 py-1 text-xs font-bold text-marhaban-leaf">{clamped}%</span>
      </div>
      {helper ? <p className="mt-2 text-xs text-slate-600">{helper}</p> : null}
      <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-marhaban-mint" role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div className="h-full rounded-full bg-marhaban-clay transition-all" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
