'use client';

import { provinceOptions, useProvince } from '@/components/ProvinceProvider';

type ProvinceSelectorProps = {
  label?: string;
};

export function ProvinceSelector({ label = "Ou t'installes-tu ?" }: ProvinceSelectorProps) {
  const { province, setProvince } = useProvince();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <label htmlFor="province" className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </label>
      <select
        id="province"
        value={province}
        onChange={(event) => setProvince(event.target.value as typeof province)}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
      >
        {provinceOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p className="mt-2 text-xs text-slate-600">
        Ta selection adapte automatiquement les etapes locales du parcours.
      </p>
    </div>
  );
}
