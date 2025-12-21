'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';

export function SiteFooter() {
  const { locale } = useLanguage();

  return (
    <footer className="space-y-6">
      <div className="grid gap-8 sm:grid-cols-3">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-3">
            <Image
              src="/Logo.png"
              alt="Marhaban Canada"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
            <p className="text-sm font-semibold text-slate-900">Marhaban Canada</p>
          </div>
          <p className="text-sm text-slate-600">
            {locale === 'fr'
              ? 'Un portail clair pour démarrer au Canada, avec une logique anti-fraude.'
              : 'بوابة واضحة للبداية في كندا مع منطق مكافحة الاحتيال.'}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
            {locale === 'fr' ? 'Cadre' : 'إطار'}
          </p>
          <ul className="space-y-1 text-sm text-slate-700">
            <li>{locale === 'fr' ? '• Orientation & ressources' : '• توجيه وموارد'}</li>
            <li>{locale === 'fr' ? '• Sources officielles' : '• مصادر رسمية'}</li>
            <li>{locale === 'fr' ? '• Pas de garanties' : '• لا ضمانات'}</li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
            {locale === 'fr' ? 'Liens' : 'روابط'}
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="text-slate-700 hover:text-slate-900" href="#checklist">
              {locale === 'fr' ? 'Étapes' : 'الخطوات'}
            </Link>
            <Link className="text-slate-700 hover:text-slate-900" href="#services">
              {locale === 'fr' ? 'Services' : 'الخدمات'}
            </Link>
            <Link className="text-slate-700 hover:text-slate-900" href="#budget">
              {locale === 'fr' ? 'Budget' : 'الميزانية'}
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200/80 pt-4">
        <p className="text-xs text-slate-600">
          {locale === 'fr'
            ? `© ${new Date().getFullYear()} Marhaban Canada — Dernière mise à jour : ${new Date().toLocaleDateString('fr-CA')}`
            : `© ${new Date().getFullYear()} Marhaban Canada — آخر تحديث: ${new Date().toLocaleDateString('ar-EG')}`}
        </p>

        <p className="text-xs text-slate-600">
          {locale === 'fr' ? 'Contact: ' : 'التواصل: '}
          <span className="font-medium text-slate-800">contact@marhabancanada.ca</span>
        </p>
      </div>
    </footer>
  );
}
