'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import { stepIds } from '@/content/guideSteps';
import type { Step } from '@/content/guideSteps';
import { getHtmlAttrs } from '@/i18n/locales';

type Props = {
  locale: string;
};

type ContentWithGuideSteps = {
  guideSteps?: Record<string, Step>;
};

// Localized labels for the guide index page
const labels = {
  fr: {
    eyebrow: 'Guides',
    title: 'Toutes les étapes en détail',
    subtitle: 'Choisis une étape pour voir le guide complet et les actions concrètes.',
    reassurance: "Tu es au bon endroit. Rien d'urgent.",
    phases: {
      'Semaine 1': 'Semaine 1',
      'Mois 1': 'Mois 1',
      'En continu': 'En continu',
    },
  },
  en: {
    eyebrow: 'Guides',
    title: 'All steps in detail',
    subtitle: 'Choose a step to see the complete guide and concrete actions.',
    reassurance: "You're in the right place. No rush.",
    phases: {
      'Semaine 1': 'Week 1',
      'Mois 1': 'Month 1',
      'En continu': 'Ongoing',
    },
  },
  ar: {
    eyebrow: 'الأدلة',
    title: 'كل الخطوات بالتفصيل',
    subtitle: 'اختر خطوة لرؤية الدليل الكامل والإجراءات الملموسة.',
    reassurance: 'أنت في المكان الصحيح. لا استعجال.',
    phases: {
      'Semaine 1': 'الأسبوع الأول',
      'Mois 1': 'الشهر الأول',
      'En continu': 'مستمر',
    },
  },
};

export function GuideIndexClient({ locale }: Props) {
  const { content } = useLanguage();
  const { dir } = getHtmlAttrs(locale as 'fr' | 'en' | 'ar');
  const isRTL = dir === 'rtl';
  const t = labels[locale as keyof typeof labels] || labels.fr;
  
  // Get localized guide steps from LanguageProvider
  const guideSteps = (content as ContentWithGuideSteps).guideSteps;

  return (
    <main className={`bg-slate-50 px-4 py-10 ${isRTL ? 'text-right' : 'text-left'}`} dir={dir}>
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                {t.eyebrow}
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
                {t.title}
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                {t.subtitle}
              </p>
              <p className="mt-2 text-xs text-slate-500">{t.reassurance}</p>
            </div>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          {stepIds.map((id) => {
            const step = guideSteps?.[id];
            if (!step) return null;
            
            // Translate phase label
            const phaseLabel = t.phases[step.phase as keyof typeof t.phases] || step.phase;
            
            return (
              <Link
                key={step.id}
                href={`/${locale}/parcours/guide/steps/${step.id}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
              >
                <div className={`flex items-center justify-between gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <h2 className="text-base font-semibold text-slate-900">{step.title}</h2>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 whitespace-nowrap">
                    {phaseLabel}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{step.summary}</p>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}

