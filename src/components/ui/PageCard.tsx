'use client';

import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'base' | 'muted';

type PageCardProps<T extends ElementType = 'div'> = {
  as?: T;
  variant?: Variant;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

const variantClasses: Record<Variant, string> = {
  base: 'border border-zinc-200/80 bg-white text-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.04)]',
  muted: 'border border-zinc-200/80 bg-zinc-50/60 text-slate-900 shadow-[0_10px_30px_rgba(0,0,0,0.06)]',
};

export function PageCard<T extends ElementType = 'div'>({
  as,
  variant = 'base',
  className,
  ...props
}: PageCardProps<T>) {
  const Component = as ?? 'div';
  return (
    <Component
      className={cn('gov-card', variantClasses[variant], className)}
      {...props}
    />
  );
}
