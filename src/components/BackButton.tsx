'use client';

import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';

export function BackButton({
  fallbackHref = '/',
  label = 'Retour',
}: {
  fallbackHref?: string;
  label?: string;
}) {
  const router = useRouter();
  const { dir } = useLanguage();
  const arrow = dir === 'rtl' ? '→' : '←';

  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
          router.back();
        } else {
          router.push(fallbackHref);
        }
      }}
      className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-black/5"
      aria-label={label}
    >
      <span aria-hidden>{arrow}</span>
      <span>{label}</span>
    </button>
  );
}
