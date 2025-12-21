import Link from 'next/link';
import { stepIds, steps } from '@/content/guideSteps';

export default function GuideIndexPage() {
  return (
    <main className="bg-slate-50 px-4 py-10">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                Guides
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
                Toutes les étapes en détail
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Choisis une étape pour voir le guide complet et les actions concrètes.
              </p>
              <p className="mt-2 text-xs text-slate-500">Tu es au bon endroit. Rien d&apos;urgent.</p>
            </div>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          {stepIds.map((id) => {
            const step = steps[id];
            return (
              <Link
                key={step.id}
                href={`/parcours/guide/steps/${step.id}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-base font-semibold text-slate-900">{step.title}</h2>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                    {step.phase}
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
