'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

const navItems = [
  { href: '/', key: 'home', labels: { fr: 'Accueil', en: 'Home', ar: 'الرئيسية' } },
  { href: '/parcours', key: 'path', labels: { fr: 'Parcours', en: 'Journey', ar: 'المسار' } },
  { href: '/checklist', key: 'checklist', labels: { fr: 'Checklist', en: 'Checklist', ar: 'القائمة' } },
  { href: '/arnaques', key: 'scams', labels: { fr: 'Arnaques', en: 'Scams', ar: 'الاحتيال' } },
  { href: '/ressources', key: 'resources', labels: { fr: 'Ressources', en: 'Resources', ar: 'الموارد' } },
];

export function Navbar() {
  const pathname = usePathname();
  const { locale, dir, content } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const isRTL = dir === 'rtl';
  const closeLabel = locale === 'ar' ? 'إغلاق' : locale === 'en' ? 'Close' : 'Fermer';
  const navContent = (content as { nav?: Record<string, string> }).nav ?? {};
  const burgerLabel = locale === 'ar' ? 'فتح القائمة' : locale === 'en' ? 'Open menu' : 'Ouvrir le menu';

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur" dir={dir}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Marhaban Canada" width={36} height={36} className="h-9 w-9" />
          <span className="text-lg font-semibold tracking-tight text-slate-900">Marhaban Canada</span>
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          <nav aria-label="Navigation principale">
            <ul className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-700">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                const label = navContent[item.key] ?? item.labels[locale] ?? item.labels.fr;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`rounded-full px-3 py-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30 ${
                        isActive ? 'bg-slate-900 text-white' : 'hover:text-slate-900'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            {locale}
          </span>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            {locale}
          </span>
          <button
            type="button"
            aria-label={burgerLabel}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="sr-only">{burgerLabel}</span>
            <span className="block h-0.5 w-5 rounded-full bg-slate-700" />
            <span className="mt-1 block h-0.5 w-5 rounded-full bg-slate-700" />
            <span className="mt-1 block h-0.5 w-5 rounded-full bg-slate-700" />
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="md:hidden">
          <button
            type="button"
            aria-label={closeLabel}
            className="fixed inset-0 z-40 bg-black/30"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={`fixed top-0 z-50 h-full w-72 bg-white p-6 shadow-xl ${
              isRTL ? 'right-0 text-right' : 'left-0 text-left'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {locale}
              </span>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600"
                onClick={() => setIsOpen(false)}
              >
                {closeLabel}
              </button>
            </div>
            <nav className="mt-6">
              <ul className="space-y-2 text-sm font-medium text-slate-700">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  const label = navContent[item.key] ?? item.labels[locale] ?? item.labels.fr;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex min-h-[44px] items-center justify-between rounded-xl px-3 py-2 transition ${
                          isActive ? 'bg-slate-900 text-white' : 'hover:bg-slate-100'
                        }`}
                      >
                        <span>{label}</span>
                        <span className="text-xs">{isRTL ? '←' : '→'}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
