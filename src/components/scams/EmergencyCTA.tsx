'use client';

import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export function EmergencyCTA() {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-amber-900">Je pense etre victime : quoi faire ?</p>
          <p className="mt-1 text-xs text-amber-900/80">
            Plan d action en 5 etapes, sans panique.
          </p>
        </div>
        <Link
          href="/arnaques#plan-action"
          className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <AlertTriangle className="h-4 w-4" />
          Voir le plan d action
        </Link>
      </div>
    </div>
  );
}
