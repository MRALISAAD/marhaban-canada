'use client';

import LocalizedLink from '../LocalizedLink';
import { Briefcase, CreditCard, Home, Phone, Shield, Store } from 'lucide-react';
import type { ScamCategory } from '@/content/scams';
import { useLanguage } from '@/components/LanguageProvider';

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
  const { locale } = useLanguage();

  const labelsByLocale: Record<
    string,
    Partial<Record<string, { title: string; summary: string }>>
  > = {
    fr: {}, // on garde les valeurs par défaut issues du contenu FR
    en: {
      housing: {
        title: 'Housing',
        summary: 'Fake landlords, suspicious deposits, pressure.',
      },
      jobs: {
        title: 'Jobs',
        summary: 'Too‑good offers, fake recruiters, hidden fees.',
      },
      phone: {
        title: 'Phone / plans',
        summary: 'Hidden fees, aggressive sales.',
      },
      bank: {
        title: 'Bank / cards / fees',
        summary: 'Fee requests, suspicious accounts.',
      },
      immigration: {
        title: 'Fake representatives / fake agents',
        summary: 'Paid dossiers, guarantees, suspicious pressure.',
      },
      marketplace: {
        title: 'Marketplace (Kijiji/FB)',
        summary: 'Fake sellers, advance payment.',
      },
    },
    ar: {
      housing: {
        title: 'السكن',
        summary: 'ملاك وهميون، ودائع مشبوهة، وضغط.',
      },
      jobs: {
        title: 'العمل',
        summary: 'عروض مبالغ فيها، مجندون مزيفون، ورسوم خفية.',
      },
      phone: {
        title: 'الهاتف / الباقات',
        summary: 'رسوم مخفية، مبيعات عدوانية.',
      },
      bank: {
        title: 'البنك / البطاقات / الرسوم',
        summary: 'طلبات رسوم، حسابات مشبوهة.',
      },
      immigration: {
        title: 'ممثلون مزيفون / وكلاء مزيفون',
        summary: 'ملفات مدفوعة وضمانات وضغط مشبوه.',
      },
      marketplace: {
        title: 'البيع عبر المنصات (Kijiji/FB)',
        summary: 'بائعون وهميون ودفع مسبق.',
      },
    },
  };

  const localeLabels = labelsByLocale[locale] ?? labelsByLocale.fr;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => {
        const Icon = iconMap[category.icon];
        const override = localeLabels[category.id];
        const title = override?.title ?? category.title;
        const summary = override?.summary ?? category.summary;

        return (
          <LocalizedLink
            key={category.id}
            href={`/arnaques/${category.guideSlug}`}
            className="group rounded-[2rem] border border-marhaban-leaf/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(251,247,239,0.94))] p-5 shadow-[0_16px_48px_rgba(31,45,43,0.08)] transition hover:-translate-y-0.5 hover:border-marhaban-leaf/30 hover:shadow-[0_22px_60px_rgba(31,45,43,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/30"
          >
            <div className="flex items-start gap-3">
              <span className="mt-1 rounded-2xl border border-marhaban-leaf/15 bg-marhaban-mint p-2">
                <Icon className="h-4 w-4 text-marhaban-leaf" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-marhaban-ink">{title}</h3>
                <p className="mt-1 text-xs text-slate-600">{summary}</p>
              </div>
            </div>
          </LocalizedLink>
        );
      })}
    </div>
  );
}
