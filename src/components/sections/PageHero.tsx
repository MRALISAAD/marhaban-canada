'use client';

import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import { AnimatedCTA, AnimatedCard, SectionReveal } from '@/components/animations/MarketingMotion';
import { cn } from '@/lib/cn';

type Cta = {
  label: string;
  href: string;
  tone?: 'primary' | 'secondary';
};

type Props = {
  eyebrow: string;
  title: string;
  text: string;
  primary: Cta;
  secondary?: Cta;
  pills?: readonly string[];
  visual?: ReactNode;
  dark?: boolean;
  className?: string;
  scale?: 'default' | 'home';
};

export function PageHero({
  eyebrow,
  title,
  text,
  primary,
  secondary,
  pills,
  visual,
  dark = false,
  className,
  scale = 'default',
}: Props) {
  const isHomeScale = scale === 'home';

  return (
    <SectionReveal
      className={cn(
        'px-4 pt-16 pb-12 sm:px-6 sm:pt-20 sm:pb-16 lg:px-8 lg:pt-28 lg:pb-20',
        dark ? 'bg-marhaban-forestDark text-white' : 'bg-transparent',
        className,
      )}
    >
      <div className={cn('mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center', isHomeScale ? 'lg:gap-20' : 'lg:gap-16')}>
        <div className="space-y-7">
          <p
              className={cn(
                'inline-flex rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em]',
              dark ? 'border border-white/12 bg-white/[0.08] text-marhaban-gold' : 'border border-marhaban-leaf/15 bg-marhaban-mint/70 text-marhaban-leaf',
            )}
          >
            {eyebrow}
          </p>
          <div className="space-y-4">
            <h1
              className={cn(
                'max-w-3xl font-heading text-[clamp(3.2rem,7vw,7rem)] font-semibold leading-[0.88] tracking-tight',
                isHomeScale ? 'lg:max-w-4xl lg:text-[clamp(3.2rem,7.6vw,7.45rem)]' : '',
                dark ? 'text-white' : 'text-marhaban-ink',
              )}
            >
              {title}
            </h1>
            <p
              className={cn(
                'max-w-2xl text-[1.1rem] leading-relaxed sm:text-lg lg:text-xl',
                isHomeScale ? 'lg:max-w-3xl lg:text-[1.32rem]' : '',
                dark ? 'text-[#edf7f2]' : 'text-marhaban-ink/78',
              )}
            >
              {text}
            </p>
          </div>

          {pills?.length ? (
            <div className="flex flex-wrap gap-2">
              {pills.map((pill) => (
                <span
                  key={pill}
                  className={cn(
                    'rounded-full px-4 py-2.5 text-xs font-semibold',
                    dark ? 'border border-white/12 bg-white/[0.06] text-[#edf7f2]' : 'border border-marhaban-leaf/15 bg-white/80 text-marhaban-ink/78',
                )}
              >
                {pill}
                </span>
              ))}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <AnimatedCTA className="inline-flex">
              <LocalizedLink
                href={primary.href}
                className={cn(
                  'inline-flex min-h-[60px] items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  primary.tone === 'secondary'
                    ? dark
                      ? 'border border-white/16 bg-white/[0.06] text-white hover:bg-white/12 focus-visible:ring-white/45 focus-visible:ring-offset-marhaban-forestDark'
                      : 'border border-marhaban-leaf/15 bg-white text-marhaban-ink hover:bg-marhaban-mint focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-white'
                    : dark
                      ? 'bg-marhaban-gold text-marhaban-ink shadow-[0_24px_80px_rgba(213,168,79,0.35)] hover:bg-white focus-visible:ring-marhaban-gold/60 focus-visible:ring-offset-marhaban-forestDark'
                      : 'bg-marhaban-forestDark text-white shadow-[0_22px_60px_rgba(8,42,36,0.18)] hover:bg-marhaban-leaf focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-white',
                )}
              >
                {primary.label}
                <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
              </LocalizedLink>
            </AnimatedCTA>
            {secondary ? (
              <AnimatedCTA className="inline-flex">
                <LocalizedLink
                href={secondary.href}
                className={cn(
                    'inline-flex min-h-[60px] items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    dark
                      ? 'border border-white/16 bg-white/[0.06] text-white hover:bg-white/12 focus-visible:ring-white/45 focus-visible:ring-offset-marhaban-forestDark'
                      : 'border border-marhaban-leaf/15 bg-transparent text-marhaban-ink hover:bg-marhaban-mint/60 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-white',
                  )}
                >
                  {secondary.label}
                  <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
                </LocalizedLink>
              </AnimatedCTA>
            ) : null}
          </div>
        </div>

        {visual ? (
          <AnimatedCard className={cn('rounded-[2rem]', dark ? 'border border-white/10 bg-white/[0.07] p-6 text-white shadow-[0_28px_100px_rgba(0,0,0,0.24)] sm:p-7' : 'border border-marhaban-leaf/15 bg-offwhite p-5 shadow-warm-sm sm:p-6', isHomeScale ? 'lg:p-8' : '')}>
            {visual}
          </AnimatedCard>
        ) : null}
      </div>
    </SectionReveal>
  );
}
