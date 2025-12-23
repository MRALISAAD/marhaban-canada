'use client';

import LocalizedLink from './LocalizedLink';
import { useLanguage } from '@/components/LanguageProvider';
import { BackButton } from '@/components/BackButton';
import type { Step } from '@/content/guideSteps';
import { getHtmlAttrs } from '@/i18n/locales';

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
  const { content, locale } = useLanguage();
  if (!step || !content?.microcopy || !content?.shared?.sectionLabels) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <p className="text-lg font-semibold text-slate-900">Content coming soon</p>
      </main>
    );
  }
  const { dir } = getHtmlAttrs(locale);
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
        <LocalizedLink
          href="/parcours"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 hover:text-slate-700"
        >
          {content.microcopy.backToJourneyLabel}
        </LocalizedLink>
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

      <h1 className="mt-2 text-2xl font-semibold text-slate-900">{step.title || ''}</h1>
      <p className="mt-2 text-slate-600">{step.summary || ''}</p>
      <p className="mt-2 text-xs text-slate-500">{statusLine}</p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{content.microcopy.mottoLabel}</p>
        <p className="mt-2 text-base text-slate-900">{step.motto || ''}</p>
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{content.shared.sectionLabels.what}</p>
        <p className="mt-2 text-sm text-slate-700">{step.what || ''}</p>
      </section>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">{content.shared.sectionLabels.why}</h2>
      <p className="mt-2 text-sm text-slate-600">{content.microcopy.whyIntroLabel}</p>
      <ul className={`mt-3 list-disc space-y-1 text-slate-700 ${listPadding}`}>
        {(step.why || []).map((reason, index) => (
          <li key={index}>{reason}</li>
        ))}
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">{content.shared.sectionLabels.how}</h2>
      <p className="mt-2 text-sm text-slate-600">{content.microcopy.howIntroLabel}</p>
      <ol className={`mt-3 list-decimal space-y-1 text-slate-700 ${listPadding}`}>
        {(step.how || []).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">{content.microcopy.docsLabel}</h2>
      <p className="mt-2 text-sm text-slate-600">{content.microcopy.docsIntroLabel}</p>
      <ul className={`mt-3 list-disc space-y-1 text-slate-700 ${listPadding}`}>
        {(step.docs || []).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">{content.microcopy.avoidIntroLabel}</h2>
      <ul className={`mt-3 list-disc space-y-1 text-slate-700 ${listPadding}`}>
        {(step.avoid || []).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">{content.microcopy.smartTipsLabel}</h2>
      <ul className={`mt-3 list-disc space-y-1 text-slate-700 ${listPadding}`}>
        {(step.smartTips || []).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <div className="mt-8">
        {step.cta && step.cta.href && step.cta.label && (
          <LocalizedLink
            href={step.cta.href}
            className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            {step.cta.label}
          </LocalizedLink>
        )}
        <p className="mt-2 text-xs text-slate-500">{content.microcopy.noCommitmentLabel}</p>
      </div>

      <p className="mt-8 text-sm text-slate-600">{content.microcopy.continueWhenReadyLabel}</p>

      <nav className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6 text-sm">
        {previousStepId ? (
          <LocalizedLink
            href={`/parcours/guide/steps/${previousStepId}`}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 shadow-sm hover:border-slate-300 hover:text-slate-900"
            aria-label={`${content.microcopy.backLabel}: ${previousStepId}`}
          >
            {isRTL ? `${content.microcopy.backLabel} ${backArrow}` : `${backArrow} ${content.microcopy.backLabel}`}
          </LocalizedLink>
        ) : (
          <span className="text-slate-400" aria-label={content.microcopy.guideStartLabel}>
            {content.microcopy.guideStartLabel}
          </span>
        )}

        {nextStepId ? (
          <LocalizedLink
            href={`/parcours/guide/steps/${nextStepId}`}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 shadow-sm hover:border-slate-300 hover:text-slate-900"
            aria-label={`${content.microcopy.nextStepLabel}: ${nextStepId}`}
          >
            {isRTL ? `${nextArrow} ${content.microcopy.nextStepLabel}` : `${content.microcopy.nextStepLabel} ${nextArrow}`}
          </LocalizedLink>
        ) : (
          <span className="text-slate-400" aria-label={content.microcopy.guideEndLabel}>
            {content.microcopy.guideEndLabel}
          </span>
        )}
      </nav>
    </main>
  );
}
