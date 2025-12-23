type ProgressBarProps = {
  progress: number;
  label: string;
  helper?: string;
};

export function ProgressBar({ progress, label, helper }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        <span className="text-xs text-slate-500">{clamped}%</span>
      </div>
      {helper ? <p className="mt-1 text-xs text-slate-600">{helper}</p> : null}
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div className="h-full rounded-full bg-amber-600 transition-all" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
