'use client';

import Link from 'next/link';
import { AlertTriangle, ClipboardCheck, FileText, Info, Link2, ListChecks, Zap } from 'lucide-react';
import type { ResourceGuide } from '@/content/siteContent';
import { SecureExternalLink } from '@/components/checklist/SecureExternalLink';

type ResourceGuideTemplateProps = {
  guide: ResourceGuide;
  labels: {
    eyebrow: string;
    calloutTitle: string;
    whatTitle: string;
    whyTitle: string;
    howTitle: string;
    pitfallsTitle: string;
    actionsTitle: string;
    sourcesTitle: string;
    actionPrompt: string;
  };
};

const isExternal = (url: string) => url.startsWith('http://') || url.startsWith('https://');

export function ResourceGuideTemplate({ guide, labels }: ResourceGuideTemplateProps) {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{labels.eyebrow}</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">{guide.title}</h1>
            <p className="mt-2 text-sm text-slate-600">{guide.summary}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {isExternal(guide.ctaHref) ? (
            <a
              href={guide.ctaHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Zap className="h-4 w-4" />
              {guide.ctaLabel}
            </a>
          ) : (
            <Link
              href={guide.ctaHref}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Zap className="h-4 w-4" />
              {guide.ctaLabel}
            </Link>
          )}
        </div>
      </header>

      <section className="rounded-3xl border border-amber-200 bg-amber-50 px-6 py-5 text-slate-900 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="mt-1 rounded-full border border-amber-200 bg-white p-2">
            <Zap className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">{labels.calloutTitle}</p>
            <p className="mt-2 text-sm font-semibold">{guide.callout}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Info className="h-4 w-4 text-slate-500" />
            {labels.whatTitle}
          </div>
          <p className="mt-2 text-sm text-slate-600">{guide.what}</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <ListChecks className="h-4 w-4 text-slate-500" />
            {labels.whyTitle}
          </div>
          <ul className="mt-3 list-disc space-y-1 ps-4 text-sm text-slate-600">
            {guide.why.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <ClipboardCheck className="h-4 w-4 text-slate-500" />
            {labels.howTitle}
          </div>
          <ol className="mt-3 list-decimal space-y-1 ps-4 text-sm text-slate-600">
            {guide.how.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-rose-900">
            <AlertTriangle className="h-4 w-4 text-rose-500" />
            {labels.pitfallsTitle}
          </div>
          <ul className="mt-3 list-disc space-y-1 ps-4 text-sm text-rose-900">
            {guide.pitfalls.map((pitfall) => (
              <li key={pitfall}>{pitfall}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <FileText className="h-4 w-4 text-slate-500" />
            {labels.actionsTitle}
          </div>
          <ul className="mt-3 list-disc space-y-1 ps-4 text-sm text-slate-600">
            {guide.actions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Link2 className="h-4 w-4 text-slate-500" />
            {labels.sourcesTitle}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {guide.sources.map((source) => (
              <SecureExternalLink key={source.url} href={source.url} label={source.name} />
            ))}
          </div>
        </div>
      </section>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-600">{labels.actionPrompt}</p>
          {isExternal(guide.ctaHref) ? (
            <a
              href={guide.ctaHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Zap className="h-4 w-4" />
              {guide.ctaLabel}
            </a>
          ) : (
            <Link
              href={guide.ctaHref}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Zap className="h-4 w-4" />
              {guide.ctaLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
