import type { ReactNode } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { cn } from '@/lib/cn';

type AdminShellProps = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
};

export function AdminShell({ children, title, subtitle, actions, className }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-marhaban-cream text-marhaban-ink">
      <div className="grid min-h-screen md:grid-cols-[16rem_minmax(0,1fr)] lg:grid-cols-[18rem_minmax(0,1fr)]">
        <AdminSidebar />
        <main className={cn('min-w-0 px-4 py-6 sm:px-6 lg:px-8 lg:py-8', className)}>
          {title || subtitle || actions ? (
            <header className="mb-6 flex flex-wrap items-start justify-between gap-4 rounded-[1.75rem] border border-marhaban-leaf/12 bg-white/85 p-6 shadow-warm-sm">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">
                  Espace admin
                </p>
                {title ? (
                  <h1 className="mt-2 font-heading text-3xl font-semibold leading-tight text-marhaban-forestDark sm:text-4xl">
                    {title}
                  </h1>
                ) : null}
                {subtitle ? (
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-marhaban-muted sm:text-base">
                    {subtitle}
                  </p>
                ) : null}
              </div>
              {actions ? <div className="shrink-0">{actions}</div> : null}
            </header>
          ) : null}
          {children}
        </main>
      </div>
    </div>
  );
}
