'use client';

import { ArrowRight, BadgeCheck, ExternalLink } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import { AnimatedCard, AnimatedCTA } from '@/components/animations/MarketingMotion';
import { cn } from '@/lib/cn';

type Props = {
  title: string;
  text: string;
  href: string;
  cta: string;
  tags?: readonly string[];
  official?: boolean;
  recommended?: boolean;
};

export function ResourceCard({ title, text, href, cta, tags, official, recommended }: Props) {
  const isExternal = /^https?:\/\//i.test(href);

  return (
    <AnimatedCard>
      <article className="flex h-full flex-col rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm">
        <div className="flex flex-wrap items-center gap-2">
          {official ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-marhaban-leaf/15 bg-marhaban-mint/60 px-3 py-1 text-xs font-semibold text-marhaban-leaf">
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Officiel
            </span>
          ) : null}
          {recommended ? <span className="badge-gold">Recommandé</span> : null}
        </div>
        <h3 className="mt-4 text-xl font-semibold leading-tight text-marhaban-ink">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-marhaban-ink/72">{text}</p>
        {tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full border border-marhaban-leaf/12 bg-marhaban-warm/70 px-3 py-1 text-xs font-medium text-marhaban-ink/72">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <div className="mt-auto pt-6">
          <AnimatedCTA className="inline-flex">
            <LocalizedLink
              href={href}
              className={cn(
                'inline-flex min-h-[46px] items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                isExternal
                  ? 'bg-marhaban-forestDark text-white hover:bg-marhaban-leaf focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-white'
                  : 'bg-marhaban-forestDark text-white hover:bg-marhaban-leaf focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-white',
              )}
            >
              {cta}
              {isExternal ? <ExternalLink className="h-4 w-4" aria-hidden="true" /> : <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />}
            </LocalizedLink>
          </AnimatedCTA>
        </div>
      </article>
    </AnimatedCard>
  );
}
