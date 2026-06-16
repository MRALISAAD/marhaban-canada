'use client';

import { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { useChecklistStorage } from '@/hooks/useChecklistStorage';
import { getChecklistDictionary } from '@/content/checklistOffline';
import { FEATURE_FLAGS } from '@/lib/featureFlags';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import LocalizedLink from './LocalizedLink';

export function JustArrivedMode() {
  const { locale } = useLanguage();
  const dictionary = getChecklistDictionary(locale);
  const storageKey = `mc_checklist_offline_${locale}_v1`;
  const { checked } = useChecklistStorage(storageKey);

  const [isActive] = useState(false);

  // Vérifier si l'utilisateur vient d'arriver (pas d'étapes complétées)
  const urgentItems = dictionary.phases
    .find((phase) => phase.id === 'week-1')
    ?.items.map((item) => item.id) || [];

  const hasCompletedUrgent = urgentItems.some((id) => checked[id]);
  const shouldShow = !hasCompletedUrgent;

  const labels = {
    fr: {
      button: "Je viens d'arriver aujourd'hui",
      title: 'Bienvenue au Canada !',
      description: 'Commence par ces étapes urgentes des 7 premiers jours.',
      cta: 'Voir les étapes urgentes',
    },
    en: {
      button: "I just arrived today",
      title: 'Welcome to Canada!',
      description: 'Start with these urgent steps for the first 7 days.',
      cta: 'View urgent steps',
    },
    ar: {
      button: 'وصلت اليوم',
      title: 'مرحبًا بك في كندا!',
      description: 'ابدأ بهذه الخطوات العاجلة للأيام السبعة الأولى.',
      cta: 'عرض الخطوات العاجلة',
    },
  };

  const t = labels[locale] || labels.fr;

  if (!FEATURE_FLAGS.ENABLE_JUST_ARRIVED_MODE) {
    return null;
  }

  if (!shouldShow && !isActive) {
    return null;
  }

  return (
    <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-amber-100/50 p-6 shadow-lg">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 rounded-full bg-amber-200 p-2">
          <Sparkles className="h-5 w-5 text-amber-700" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900">{t.title}</h3>
          <p className="mt-1 text-sm text-slate-700">{t.description}</p>
          <div className="mt-4">
            <LocalizedLink href="/checklist/semaine-1">
              <Button variant="default" size="sm">
                {t.cta}
              </Button>
            </LocalizedLink>
          </div>
        </div>
      </div>
    </div>
  );
}

