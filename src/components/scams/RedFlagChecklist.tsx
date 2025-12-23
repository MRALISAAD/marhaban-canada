'use client';

type RedFlagChecklistProps = {
  flags: string[];
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
  label?: string;
};

export function RedFlagChecklist({ flags, checked, onToggle, label = 'Signaux d alerte' }: RedFlagChecklistProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-900">{label}</p>
      <ul className="mt-3 space-y-2">
        {flags.map((flag) => (
          <li key={flag}>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={!!checked[flag]}
                onChange={() => onToggle(flag)}
                className="mt-1 h-4 w-4"
              />
              <span>{flag}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
