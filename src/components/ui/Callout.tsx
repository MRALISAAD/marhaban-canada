'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { AlertTriangle, Info, AlertCircle } from 'lucide-react';

type CalloutVariant = 'warning' | 'info' | 'error';

type CalloutProps = {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
  dir?: 'ltr' | 'rtl';
};

const variantStyles: Record<CalloutVariant, { bg: string; border: string; icon: string; text: string; title: string }> = {
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: 'text-amber-700',
    text: 'text-amber-800',
    title: 'text-amber-900',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'text-blue-700',
    text: 'text-blue-800',
    title: 'text-blue-900',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: 'text-red-700',
    text: 'text-red-800',
    title: 'text-red-900',
  },
};

const variantIcons: Record<CalloutVariant, typeof AlertTriangle> = {
  warning: AlertTriangle,
  info: Info,
  error: AlertCircle,
};

/**
 * Standardized callout component for warnings, info, and errors
 * - Consistent styling across variants
 * - RTL-aware
 */
export function Callout({
  variant = 'info',
  title,
  children,
  className,
  dir = 'ltr',
}: CalloutProps) {
  const isRTL = dir === 'rtl';
  const alignClass = isRTL ? 'text-right' : 'text-left';
  const styles = variantStyles[variant];
  const Icon = variantIcons[variant];

  return (
    <div
      className={cn(
        'rounded-2xl border p-4 sm:p-5',
        styles.bg,
        styles.border,
        className
      )}
      dir={dir}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <div className="flex items-start gap-3">
            <div className={cn('mt-0.5 flex-shrink-0 rounded-full p-1.5', styles.bg)}>
              <Icon className={cn('h-4 w-4', styles.icon)} aria-hidden="true" />
            </div>
            <div className="flex-1">
              {title && (
                <p className={cn('font-semibold', styles.title, alignClass)}>{title}</p>
              )}
              <div className={cn('mt-1.5 text-sm', styles.text, alignClass)}>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

