'use client';

import { useCallback } from 'react';
import { CTA } from '@/components/CTA';
import { ProgressBar } from '@/components/ProgressBar';
import { ProvinceSelector } from '@/components/ProvinceSelector';
import { useLanguage } from '@/components/LanguageProvider';
import { useLocalStorageState } from '@/lib/useLocalStorageState';

export default function HomePage() {
  const { content } = useLanguage();
  const [hasStarted, setHasStarted] = useLocalStorageState<boolean>('mc_has_started', {
    defaultValue: false,
    parse: (value) => value === 'true',
    serialize: (value) => (value ? 'true' : 'false'),
  });

  const handleStart = useCallback(() => {
    setHasStarted(true);
  }, [setHasStarted]);

  return (
    <main className="bg-slate-50">
      <section className="mx-auto w-full max-w-6xl px-4 pb-12 pt-12 sm:px-6 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                Marhaban Canada
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                {content.microcopy.homeTitle}
              </h1>
              <p className="mt-4 text-base text-slate-600 sm:text-lg">
                {content.microcopy.homeSubtitle}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Tu es au debut du parcours.
              </p>
            </div>

            <ProgressBar
              progress={hasStarted ? 8 : 0}
              label="Pret a commencer ton installation ?"
              helper="Une etape a la fois, la progression demarre apres ton premier clic."
            />

            <ProvinceSelector />

            <CTA onStart={handleStart} primaryLabel={content.microcopy.homeCtaPrimary} />
            <p className="text-xs text-slate-500">
              {content.microcopy.homeCtaSub}
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'Etapes claires',
                text: 'Un chemin simple pour ne rien oublier des premiers jours.',
              },
              {
                title: 'Sources officielles',
                text: 'Liens directs vers les ressources gouvernementales a jour.',
              },
              {
                title: 'Eviter les erreurs',
                text: 'Conseils pratiques pour eviter les pieges courants.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-base font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
