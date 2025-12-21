'use client';

import Link from 'next/link';
import { Briefcase, CreditCard, Home, Phone, Shield, Store } from 'lucide-react';
import type { ScamCategory } from '@/content/scams';

const iconMap = {
  home: Home,
  briefcase: Briefcase,
  phone: Phone,
  credit: CreditCard,
  shield: Shield,
  store: Store,
};

type ScamCategoryGridProps = {
  categories: ScamCategory[];
};

export function ScamCategoryGrid({ categories }: ScamCategoryGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => {
        const Icon = iconMap[category.icon];
        return (
          <Link
            key={category.id}
            href={`/arnaques/${category.guideSlug}`}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
          >
            <div className="flex items-start gap-3">
              <span className="mt-1 rounded-full border border-slate-200 bg-slate-50 p-2">
                <Icon className="h-4 w-4 text-slate-600" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">{category.title}</h3>
                <p className="mt-1 text-xs text-slate-600">{category.summary}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
