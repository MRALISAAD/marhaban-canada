import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type AdminCardProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  eyebrow?: string;
  action?: ReactNode;
};

export function AdminCard({ children, className, title, eyebrow, action }: AdminCardProps) {
  return (
    <section className={cn('rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm', className)}>
      {title || eyebrow || action ? (
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            {eyebrow ? (
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">{eyebrow}</p>
            ) : null}
            {title ? (
              <h2 className="mt-1 font-heading text-2xl font-semibold leading-tight text-marhaban-forestDark">
                {title}
              </h2>
            ) : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
