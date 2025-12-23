'use client';
import React from 'react';
import { cn } from '@/lib/cn';

const variants = {
  variant: {
    primary: 'bg-red-600 text-white shadow-sm hover:bg-red-700',
    secondary:
      'border border-zinc-200/80 bg-white text-slate-800 hover:border-zinc-300/80',
    ghost: 'text-red-600 hover:underline',
  },
  size: {
    default: 'px-6 py-3 text-base',
    sm: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-lg',
  },
};

const baseClasses =
  'inline-flex min-h-[44px] items-center justify-center rounded-full font-bold transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 disabled:opacity-60 disabled:cursor-not-allowed';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants.variant;
  size?: keyof typeof variants.size;
}

function buttonVariants({ variant = 'primary', size = 'default', className = '' }: ButtonProps) {
  return cn(baseClasses, variants.variant[variant], variants.size[size], className);
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
