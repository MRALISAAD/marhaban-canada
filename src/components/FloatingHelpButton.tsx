'use client';

import { useLanguage } from '@/components/LanguageProvider';
import Link from 'next/link';
import { Headset } from 'lucide-react';

export function FloatingHelpButton() {
  const { content } = useLanguage();
  return (
    <Link
      href={content.floatingCta.href}
      className="floating-help fixed bottom-6 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 md:hidden"
      aria-label="Mode Urgence Arrivée"
    >
      <Headset size={18} />
      {content.floatingCta.label}
    </Link>
  );
}
