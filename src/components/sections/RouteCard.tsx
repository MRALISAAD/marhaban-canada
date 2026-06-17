'use client';

import { ArrowRight } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import { AnimatedCard, AnimatedCTA } from '@/components/animations/MarketingMotion';
import { cn } from '@/lib/cn';

type Props = {
  title: string;
  text: string;
  href: string;
  cta: string;
  badge?: string;
  tone?: 'light' | 'dark';
};

export function RouteCard({ title, text, href, cta, badge, tone = 'light' }: Props) {
  return (
    <AnimatedCard className="h-full">
      <article
        className={cn(
          'flex h-full flex-col rounded-[1.85rem] border p-6 shadow-warm-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-warm',
          tone === 'dark'
            ? 'border-white/12 bg-marhaban-forestDark text-white shadow-[0_24px_70px_rgba(0,0,0,0.18)]'
            : 'border-marhaban-leaf/12 bg-white text-marhaban-ink',
        )}
      >
        {badge ? (
          <span
            className={cn(
              'inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold',
              tone === 'dark'
                ? 'border border-white/12 bg-white/[0.06] text-[#edf7f2]'
                : 'border border-marhaban-leaf/15 bg-marhaban-mint/60 text-marhaban-leaf',
            )}
          >
            {badge}
          </span>
        ) : null}
        <h3 className="mt-4 text-[1.15rem] font-semibold leading-tight sm:text-[1.25rem]">{title}</h3>
        <p className={cn('mt-3 text-sm leading-relaxed', tone === 'dark' ? 'text-[#edf7f2]' : 'text-marhaban-ink/82')}>
          {text}
        </p>
        <div className="mt-auto pt-6">
          <AnimatedCTA className="inline-flex">
            <LocalizedLink
              href={href}
              className={cn(
                'inline-flex min-h-[52px] items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                tone === 'dark'
                  ? 'bg-marhaban-gold text-marhaban-ink hover:bg-white focus-visible:ring-marhaban-gold/60 focus-visible:ring-offset-marhaban-forestDark'
                  : 'bg-marhaban-forestDark text-white hover:bg-marhaban-leaf focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-white',
              )}
            >
              {cta}
              <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
            </LocalizedLink>
          </AnimatedCTA>
        </div>
      </article>
    </AnimatedCard>
  );
}
