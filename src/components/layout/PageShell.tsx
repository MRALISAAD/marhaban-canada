import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  children: ReactNode;
  className?: string;
  dir: 'ltr' | 'rtl';
  lang: string;
};

export function PageShell({ children, className, dir, lang }: Props) {
  return (
    <main
      id="main-content"
      className={cn('warm-page scroll-mt-28 pb-40 md:pb-36', className)}
      dir={dir}
      lang={lang}
      tabIndex={-1}
    >
      {children}
    </main>
  );
}
