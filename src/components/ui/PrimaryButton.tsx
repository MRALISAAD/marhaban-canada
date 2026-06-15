'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import LocalizedLink from '@/components/LocalizedLink';
import { ArrowRight } from 'lucide-react';

type PrimaryButtonProps = {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  className?: string;
  onClick?: () => void;
  dir?: 'ltr' | 'rtl';
};

/**
 * Standardized primary button component
 * - Consistent styling and spacing
 * - Supports primary and secondary variants
 * - RTL-aware with arrow direction
 */
export function PrimaryButton({
  label,
  href,
  variant = 'primary',
  size = 'md',
  showArrow = true,
  className,
  onClick,
  dir = 'ltr',
}: PrimaryButtonProps) {
  const isRTL = dir === 'rtl';
  const arrowDirection = isRTL ? 'rtl-flip' : '';

  const baseClasses = 'inline-flex items-center gap-2 rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variantClasses = {
    primary: 'bg-marhaban-ink text-white shadow-warm-sm hover:bg-marhaban-leaf focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-marhaban-cream',
    secondary: 'border border-stone-300 bg-white/85 text-marhaban-ink hover:border-marhaban-leaf/60 hover:bg-marhaban-mint/60 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-marhaban-cream',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <LocalizedLink
      href={href}
      onClick={onClick}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      dir={dir}
    >
      {isRTL && showArrow && <ArrowRight className={cn('h-4 w-4', arrowDirection)} />}
      {label}
      {!isRTL && showArrow && <ArrowRight className="h-4 w-4" />}
    </LocalizedLink>
  );
}

