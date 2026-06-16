import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: 'light' | 'muted' | 'dark';
};

const tones = {
  light: 'bg-transparent',
  muted: 'bg-marhaban-warm/55',
  dark: 'bg-marhaban-forestDark text-white',
};

export function Section({ children, className, id, tone = 'light' }: Props) {
  return (
    <section id={id} className={cn('px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16', tones[tone], className)}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
