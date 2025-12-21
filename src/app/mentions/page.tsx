'use client';

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { Section } from "@/components/Section";

export default function MentionsPage() {
  const { content } = useLanguage();
  return (
    <main>
      <Section id="mentions" divider="none" density="loose" band>
        <div className="space-y-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
            {content.shared.radarTitle}
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-950">
            Mentions / Avertissement
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
                Sources officielles
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Nous relayons uniquement des liens gouvernementaux répertoriés via{' '}
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
                Contrôle anti-fraude
              </p>
              <p className="mt-2 text-sm text-slate-700">{content.shared.radarBody}</p>
              <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                {content.shared.disclaimer}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-sm text-slate-700">
            <p>Ce site ne remplace pas un conseiller autorisé.</p>
            <p>Ne partage jamais de documents sensibles sans vérifier la source.</p>
            <p>Signale toute approche douteuse aux autorités compétentes.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-2xl border border-zinc-200/80 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-zinc-300/80"
            >
              Retour à l’accueil
            </Link>
            <Link
              href="/sources"
              className="rounded-2xl border border-zinc-200/80 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-red-500/60 hover:text-red-600"
            >
              Voir les sources vérifiées
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
