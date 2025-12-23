'use client';

import { useLanguage } from "@/components/LanguageProvider";
import { Section } from "@/components/Section";
import LocalizedLink from "@/components/LocalizedLink";

export default function MentionsPage() {
  const { content, locale } = useLanguage();

  const texts = {
    fr: {
      title: 'Mentions / Avertissement',
      sourcesTitle: 'Sources officielles',
      antiFraudTitle: 'Contrôle anti-fraude',
      extraLines: [
        'Ce site ne remplace pas un conseiller autorisé.',
        'Ne partage jamais de documents sensibles sans vérifier la source.',
        'Signale toute approche douteuse aux autorités compétentes.',
      ],
      backHome: "Retour à l'accueil",
      viewSources: 'Voir les sources vérifiées',
    },
    en: {
      title: 'Notices / Warning',
      sourcesTitle: 'Official sources',
      antiFraudTitle: 'Anti‑fraud checks',
      extraLines: [
        'This site does not replace a licensed advisor.',
        'Never share sensitive documents without checking the source.',
        'Report any suspicious approach to the appropriate authorities.',
      ],
      backHome: 'Back to home',
      viewSources: 'View verified sources',
    },
    ar: {
      title: 'تنبيهات / إخلاء مسؤولية',
      sourcesTitle: 'مصادر رسمية',
      antiFraudTitle: 'مكافحة الاحتيال',
      extraLines: [
        'هذا الموقع لا يحل محل مستشار معتمد.',
        'لا تشارك أبدًا مستندات حساسة دون التحقق من الجهة.',
        'قم بالإبلاغ عن أي محاولة مشبوهة للجهات المختصة.',
      ],
      backHome: 'العودة إلى الصفحة الرئيسية',
      viewSources: 'عرض المصادر الموثوقة',
    },
  } as const;

  const t = texts[locale] ?? texts.fr;

  return (
    <main>
      <Section id="mentions" divider="none" density="loose" band>
        <div className="space-y-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
            {content.shared.radarTitle}
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-950">
            {t.title}
          </h1>
          <p className="text-slate-600">{content.globalDisclaimer}</p>

          <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
              {content.serviceAccompagnementDefinition.title}
            </p>
            <p className="mt-3 text-sm text-slate-700">{content.serviceAccompagnementDefinition.body}</p>
            <p className="mt-3 text-sm font-semibold text-slate-900">
              {content.serviceAccompagnementNoProxy}
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                  {content.serviceAccompagnementWhatIsTitle}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {content.serviceAccompagnementWhatIs.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                  {content.serviceAccompagnementWhatIsNotTitle}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {content.serviceAccompagnementWhatIsNot.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                {t.sourcesTitle}
              </p>
              <p className="mt-2 text-sm text-slate-700">
                {/* Texte descriptif reste basé sur le contenu commun, uniquement le titre est localisé ici */}
                {locale === 'fr'
                  ? "Nous relayons uniquement des liens gouvernementaux répertoriés via "
                  : locale === 'en'
                    ? 'We only share government links listed via '
                    : 'نشارك فقط الروابط الحكومية المدرجة عبر '}
                <a
                  href={content.shared.officialLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-semibold text-red-600 underline"
                >
                  {content.shared.officialLink}
                </a>
                .
              </p>
            </div>
            <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                {t.antiFraudTitle}
              </p>
              <p className="mt-2 text-sm text-slate-700">{content.shared.radarBody}</p>
              <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                {content.shared.disclaimer}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-sm text-slate-700">
            {t.extraLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <LocalizedLink
              href="/"
              className="rounded-2xl border border-zinc-200/80 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-zinc-300/80"
            >
              {t.backHome}
            </LocalizedLink>
            <LocalizedLink
              href="/sources"
              className="rounded-2xl border border-zinc-200/80 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-red-500/60 hover:text-red-600"
            >
              {t.viewSources}
            </LocalizedLink>
          </div>
        </div>
      </Section>
    </main>
  );
}
