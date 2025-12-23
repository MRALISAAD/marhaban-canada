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
        'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm',
        className
      )}
      dir={dir}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className={cn('flex-1', alignClass)}>
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              {eyebrow}
            </p>
          )}
          <h1 className={cn('mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl', alignClass)}>
            {title}
          </h1>
          {subtitle && (
            <p className={cn('mt-2 text-sm text-slate-600', alignClass)}>{subtitle}</p>
          )}
          {intro && (
            <p className={cn('mt-2 text-sm text-slate-600', alignClass)}>{intro}</p>
          )}
          {cta && (
            <div className={cn('mt-4', alignClass)}>
              <LocalizedLink
                href={cta.href}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/40 focus-visible:ring-offset-2"
              >
                {cta.label}
              </LocalizedLink>
            </div>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-3 flex-wrap">{actions}</div>
        )}
      </div>
    </header>
  );
}

