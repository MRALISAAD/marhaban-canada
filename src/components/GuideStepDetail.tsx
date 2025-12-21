'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import { BackButton } from '@/components/BackButton';
import type { Step } from '@/content/guideSteps';

type GuideStepDetailProps = {
  step: Step;
  previousStepId: string | null;
  nextStepId: string | null;
};

function getPhaseLabel(phase: Step['phase'], microcopy: { [key: string]: string }) {
  if (phase === 'Semaine 1') return microcopy.phaseWeek1Title;
  if (phase === 'Mois 1') return microcopy.phaseMonth1Title;
  if (phase === 'En continu') return microcopy.phaseOngoingTitle;
  return phase;
}

export function GuideStepDetail({ step, previousStepId, nextStepId }: GuideStepDetailProps) {
  const { content, dir } = useLanguage();
  const isRTL = dir === 'rtl';
  const breadcrumbArrow = isRTL ? '←' : '→';
  const backArrow = isRTL ? '→' : '←';
  const nextArrow = isRTL ? '←' : '→';
  const listPadding = isRTL ? 'pr-5' : 'pl-5';
  const phaseLabel = getPhaseLabel(step.phase, content.microcopy);
  const statusLine = content.microcopy.statusInStep
    .replace('{step}', step.title)
    .replace('{phase}', phaseLabel);

  return (
    <main className={`mx-auto max-w-3xl px-6 py-10 ${isRTL ? 'text-right' : 'text-left'}`} dir={dir}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <BackButton fallbackHref="/parcours/guide" label={content.microcopy.backLabel} />
        <Link
          href="/parcours"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 hover:text-slate-700"
        >
          {content.microcopy.backToJourneyLabel}
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          {content.microcopy.youAreHere}
        </span>
        <span>
          {content.microcopy.breadcrumbHome} {breadcrumbArrow} {content.microcopy.breadcrumbJourney} {breadcrumbArrow}{' '}
          {content.microcopy.breadcrumbGuide}: {step.title}
        </span>
      </div>

      <h1 className="mt-2 text-2xl font-semibold text-slate-900">{step.title}</h1>
      <p className="mt-2 text-slate-600">{step.summary}</p>
      <p className="mt-2 text-xs text-slate-500">{statusLine}</p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Le mot d&apos;ordre</p>
        <p className="mt-2 text-base text-slate-900">{step.motto}</p>
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">A quoi ca sert</p>
        <p className="mt-2 text-sm text-slate-700">{step.what}</p>
      </section>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">Pourquoi c&apos;est important</h2>
      <p className="mt-2 text-sm text-slate-600">Sans cette etape, plusieurs demarches deviennent compliques.</p>
      <ul className={`mt-3 list-disc space-y-1 text-slate-700 ${listPadding}`}>
        {step.why.map((reason, index) => (
          <li key={index}>{reason}</li>
        ))}
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">Comment faire, simplement</h2>
      <p className="mt-2 text-sm text-slate-600">Suis ces etapes dans l&apos;ordre. Rien de complique.</p>
      <ol className={`mt-3 list-decimal space-y-1 text-slate-700 ${listPadding}`}>
        {step.how.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">Ce qu&apos;il te faut (rien de plus)</h2>
      <p className="mt-2 text-sm text-slate-600">Prepare ces documents avant d&apos;y aller.</p>
      <ul className={`mt-3 list-disc space-y-1 text-slate-700 ${listPadding}`}>
        {step.docs.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">A eviter absolument (pour ta securite)</h2>
      <ul className={`mt-3 list-disc space-y-1 text-slate-700 ${listPadding}`}>
        {step.avoid.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">Bon a savoir (astuces utiles)</h2>
      <ul className={`mt-3 list-disc space-y-1 text-slate-700 ${listPadding}`}>
        {step.smartTips.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <div className="mt-8">
        <Link
          href={step.cta.href}
          className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          {step.cta.label}
        </Link>
        <p className="mt-2 text-xs text-slate-500">Sans engagement · Tu peux changer plus tard.</p>
      </div>

      <p className="mt-8 text-sm text-slate-600">Quand tu veux, tu peux continuer.</p>

      <nav className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6 text-sm">
        {previousStepId ? (
          <Link
            href={`/parcours/guide/${previousStepId}`}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 shadow-sm hover:border-slate-300 hover:text-slate-900"
          >
            {isRTL ? `${content.microcopy.backLabel} ${backArrow}` : `${backArrow} ${content.microcopy.backLabel}`}
          </Link>
        ) : (
          <span className="text-slate-400">Début du guide</span>
        )}

        {nextStepId ? (
          <Link
            href={`/parcours/guide/${nextStepId}`}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 shadow-sm hover:border-slate-300 hover:text-slate-900"
          >
            {isRTL ? `${nextArrow} ${content.microcopy.nextStepLabel}` : `${content.microcopy.nextStepLabel} ${nextArrow}`}
          </Link>
        ) : (
          <span className="text-slate-400">Fin du guide</span>
        )}
      </nav>
    </main>
  );
}
