'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/components/LanguageProvider';

export function StartHere() {
  const { locale } = useLanguage();
  const title = locale === 'fr' ? 'Commencer ici' : 'ابدأ هنا';
  const items =
    locale === 'fr'
      ? [
          { href: '#checklist', label: '01 — Étapes prioritaires' },
          { href: '#services', label: '02 — Services fiables' },
          { href: '#budget', label: '03 — Budget estimatif' },
        ]
      : [
          { href: '#checklist', label: '01 — الخطوات ذات الأولوية' },
          { href: '#services', label: '02 — خدمات موثوقة' },
          { href: '#budget', label: '03 — ميزانية تقديرية' },
        ];

  return (
    <div className="mt-6">
      <Container>
        <div className="rounded-3xl border border-zinc-200/80 bg-white/70 backdrop-blur-sm p-5">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
            {title}
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-zinc-200/80 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-zinc-300/80 hover:bg-zinc-50"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
