'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowLeft,
  FileText,
  FolderOpen,
  Gauge,
  LifeBuoy,
  ShieldAlert,
} from 'lucide-react';
import { cn } from '@/lib/cn';

const adminLinks = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: Gauge },
  { label: 'Réservations', href: '/admin/bookings', icon: FileText },
  { label: 'Dossiers', href: '/admin/cases', icon: FolderOpen },
  { label: 'Anti-arnaque', href: '/admin/scam-checks', icon: ShieldAlert },
  { label: 'Ressources', href: '/admin/resources', icon: LifeBuoy },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col bg-marhaban-forestDark px-4 py-5 text-white shadow-[18px_0_70px_rgba(8,42,36,0.18)] md:min-h-screen md:w-64 lg:w-72 lg:px-5 lg:py-6">
      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-gold">Marhaban Admin</p>
        <h1 className="mt-2 font-heading text-2xl font-semibold leading-tight text-marhaban-cream">Pilotage local</h1>
        <p className="mt-3 text-xs leading-relaxed text-[#d8e7df]">
          MVP local uniquement. Non prêt production sans authentification.
        </p>
      </div>

      <nav className="mt-6 flex flex-1 flex-col gap-2" aria-label="Navigation admin">
        {adminLinks.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'group flex min-h-[48px] items-center gap-3 rounded-2xl border-l-4 px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/45 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark',
                active
                  ? 'border-marhaban-gold bg-marhaban-cream/10 text-marhaban-cream shadow-warm-sm'
                  : 'border-transparent text-marhaban-cream/60 hover:bg-white/[0.06] hover:text-marhaban-cream/80',
              )}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <Link
        href="/fr"
        className="mt-6 flex min-h-[48px] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-[#edf7f2] transition hover:bg-white/[0.1] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/45 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark"
      >
        <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>Retour au site</span>
      </Link>
    </aside>
  );
}
