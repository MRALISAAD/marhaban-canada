import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Props = ComponentPropsWithoutRef<'section'> & {
  children: ReactNode;
  tone?: 'light' | 'muted' | 'dark';
};

const tones = {
  light: 'bg-transparent',
  muted: 'bg-marhaban-cream/70',
  dark: 'bg-marhaban-forestDark text-white',
};

export function Section({ children, className, id, tone = 'light', ...props }: Props) {
  return (
    <section
      id={id}
      className={cn('px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16', tones[tone], className)}
      {...props}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
