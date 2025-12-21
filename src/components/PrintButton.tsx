'use client';

import { Printer } from 'lucide-react';

type PrintButtonProps = {
  label: string;
};

export function PrintButton({ label }: PrintButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print-btn inline-flex items-center gap-2 rounded-full border border-zinc px-4 py-2 text-sm font-semibold text-slate transition hover:border-energyRed hover:text-energyRed"
    >
      <Printer size={16} /> {label}
    </button>
  );
}
