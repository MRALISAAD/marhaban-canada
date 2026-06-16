'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import LocalizedLink from '@/components/LocalizedLink';

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  intro?: string;
  cta?: {
    label: string;
    href: string;
  };
  actions?: React.ReactNode;
  className?: string;
  dir?: 'ltr' | 'rtl';
};

/**
 * Standardized page header component
 * - Consistent spacing and typography
 * - Supports eyebrow, title, subtitle, intro, and CTA
 * - RTL-aware
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  intro,
  cta,
  actions,
  className,
  dir = 'ltr',
}: PageHeaderProps) {
  const isRTL = dir === 'rtl';
  const alignClass = isRTL ? 'text-right' : 'text-left';

  return (
    <header
      className={cn(
        'relative overflow-hidden rounded-[2rem] border border-marhaban-leaf/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,247,242,0.92))] p-6 shadow-[0_24px_70px_rgba(31,45,43,0.08)] sm:p-8',
        className
      )}
      dir={dir}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-marhaban-sand via-marhaban-leaf to-marhaban-orange" aria-hidden="true" />
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className={cn('relative flex-1', alignClass)}>
          {eyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-marhaban-clay">
              {eyebrow}
            </p>
          )}
          <h1 className={cn('mt-3 max-w-4xl text-3xl font-semibold leading-tight text-marhaban-ink sm:text-4xl lg:text-5xl', alignClass)}>
            {title}
          </h1>
          {subtitle && (
            <p className={cn('mt-3 max-w-3xl text-sm text-slate-700 sm:text-base', alignClass)}>{subtitle}</p>
          )}
          {intro && (
            <p className={cn('mt-4 max-w-3xl text-sm text-slate-700 sm:text-base', alignClass)}>{intro}</p>
          )}
          {cta && (
            <div className={cn('mt-4', alignClass)}>
              <LocalizedLink
                href={cta.href}
                className="inline-flex items-center gap-2 rounded-full bg-marhaban-ink px-4 py-2 text-sm font-semibold text-white shadow-warm-sm transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-cream"
              >
                {cta.label}
              </LocalizedLink>
            </div>
          )}
        </div>
        {actions && (
          <div className="relative flex flex-wrap items-center gap-3">{actions}</div>
        )}
      </div>
    </header>
  );
}

