'use client';

import { useLanguage } from '@/components/LanguageProvider';

export function TrustSection() {
  const { locale } = useLanguage();

  const items =
    locale === 'fr'
      ? [
          {
            title: 'Sources officielles uniquement',
            desc: 'On privilégie les sites gouvernementaux et organismes reconnus.',
          },
          {
            title: 'Anti-fraude (règles simples)',
            desc: 'Pas de crypto, pas de cartes cadeaux, pas de paiement avant visite/contrat.',
          },
          {
            title: 'Transparence',
            desc: 'On oriente et on informe. On ne vend pas de logement et on ne “garantit” rien.',
          },
        ]
      : [
          {
            title: 'مصادر رسمية فقط',
            desc: 'نعتمد على الجهات الحكومية والمنظمات المعترف بها.',
          },
          {
            title: 'مكافحة الاحتيال (قواعد بسيطة)',
            desc: 'لا عملات رقمية، لا بطاقات هدايا، لا دفع قبل الزيارة/العقد.',
          },
          {
            title: 'شفافية',
            desc: 'نوجّه ونوضح. لا نبيع السكن ولا نقدم “ضمانات”.',
          },
        ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
          {locale === 'fr' ? 'Confiance' : 'الثقة'}
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950">
          {locale === 'fr' ? 'Clair. Officiel. Sans promesses.' : 'واضح. رسمي. بدون وعود.'}
        </h2>
        <p className="max-w-2xl text-slate-600">
          {locale === 'fr'
            ? 'On préfère te donner un chemin fiable plutôt qu’un discours marketing.'
            : 'نفضل إعطاءك مسارًا موثوقًا بدل كلام تسويقي.'}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            <p className="text-base font-semibold text-slate-900">{item.title}</p>
            <p className="mt-2 text-sm text-slate-700">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
