'use client';

import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';

type CTAProps = {
  onStart?: () => void;
  primaryLabel?: string;
  secondaryLabel?: string;
};

export function CTA({
  onStart,
  primaryLabel = 'Commencer le parcours',
  secondaryLabel = 'Telecharger la checklist PDF',
}: CTAProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        href="/parcours"
        onClick={onStart}
        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/40"
      >
        {primaryLabel}
        <ArrowRight size={16} />
      </Link>
      <Link
        href="/checklist.pdf"
        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
      >
        {secondaryLabel}
        <Download size={16} />
      </Link>
    </div>
  );
}
