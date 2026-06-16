'use client';

import { CheckCircle2, ArrowRight } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import { AnimatedCard, AnimatedCTA } from '@/components/animations/MarketingMotion';
import { cn } from '@/lib/cn';

export type ServiceCardData = {
  title: string;
  price: string;
  duration: string;
  bestFor: string;
  included: readonly string[];
  notIncluded?: string;
  notPromised?: string;
  label?: string;
};

type Props = {
  service: ServiceCardData;
  href: string;
  cta: string;
  featured?: boolean;
};

export function ServiceCard({ service, href, cta, featured = false }: Props) {
  const limitation = service.notIncluded ?? service.notPromised ?? '';

  return (
    <AnimatedCard featured={featured}>
      <article
        className={cn(
          'flex h-full flex-col overflow-hidden rounded-[1.9rem] border p-6 shadow-warm-sm transition',
          featured
            ? 'border-marhaban-clay/25 bg-marhaban-forestDark text-white shadow-premium-card'
            : 'border-marhaban-leaf/15 bg-white text-marhaban-ink',
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              'rounded-full px-3 py-1 text-xs font-semibold',
              featured
                ? 'border border-white/12 bg-white/[0.06] text-[#edf7f2]'
                : 'border border-marhaban-leaf/15 bg-marhaban-mint/60 text-marhaban-leaf',
            )}
          >
            {service.duration}
          </span>
          {service.label ? <span className="badge-gold">{service.label}</span> : null}
        </div>

        <h3 className="mt-4 text-[1.35rem] font-semibold leading-tight sm:text-[1.5rem]">{service.title}</h3>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <p className={cn('text-3xl font-semibold tracking-tight sm:text-4xl', featured ? 'text-marhaban-gold' : 'text-marhaban-forestDark')}>
            {service.price}
          </p>
          <span
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-semibold',
              featured ? 'border-white/12 bg-white/[0.06] text-[#edf7f2]' : 'border-marhaban-leaf/15 bg-marhaban-cream/70 text-marhaban-ink/80',
            )}
          >
            {service.duration}
          </span>
        </div>
        <p className={cn('mt-4 rounded-2xl border px-4 py-4 text-sm leading-relaxed', featured ? 'border-white/10 bg-white/[0.06] text-[#edf7f2]' : 'border-marhaban-leaf/12 bg-marhaban-cream/65 text-marhaban-ink/82')}>
          {service.bestFor}
        </p>

        <ul className={cn('mt-5 space-y-3 text-sm leading-relaxed', featured ? 'text-[#edf7f2]' : 'text-marhaban-ink/82')}>
          {service.included.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <CheckCircle2 className={cn('mt-0.5 h-4 w-4 shrink-0', featured ? 'text-marhaban-sand' : 'text-marhaban-leaf')} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {limitation ? (
          <p className={cn('mt-5 border-l-2 pl-3 text-sm leading-relaxed', featured ? 'border-white/20 text-[#d8e7df]' : 'border-marhaban-leaf/20 text-marhaban-muted')}>
            {limitation}
          </p>
        ) : null}

        <div className="mt-auto pt-6">
          <AnimatedCTA className="inline-flex">
            <LocalizedLink
              href={href}
              className={cn(
                'inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                featured
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
