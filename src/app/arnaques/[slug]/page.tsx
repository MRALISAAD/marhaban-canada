import Link from "next/link";
import { scamGuideMap, scamGuides } from "@/content/scams";
import { ScamGuidePage } from "@/components/scams/ScamGuidePage";
import { BackButton } from "@/components/BackButton";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return scamGuides.map((guide) => ({ slug: guide.slug }));
}

export default async function ScamGuideRoute({ params }: PageProps) {
  const { slug } = await params;

  const guide = scamGuideMap[slug];
  if (!guide) notFound();

  const isHousing = slug === "logement";

  return (
    <main className="bg-slate-50 px-4 py-12">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <BackButton fallbackHref="/arnaques" label="Retour aux arnaques" />
          <Link
            href="/parcours"
            className="text-xs font-semibold text-slate-600 underline underline-offset-2"
          >
            Aller au parcours
          </Link>
        </div>

        {isHousing ? (
          <nav className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            <Link className="underline underline-offset-2" href="/">
              Accueil
            </Link>
            <span className="mx-2">→</span>
            <Link className="underline underline-offset-2" href="/arnaques">
              Arnaques
            </Link>
            <span className="mx-2">→</span>
            <span className="text-slate-700">Logement</span>
          </nav>
        ) : null}
      </div>

      <ScamGuidePage guide={guide} />

      {isHousing ? (
        <div className="mx-auto mt-6 w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
          <p className="font-semibold text-slate-900">Besoin d’aller plus loin ?</p>
          <p className="mt-1 text-sm text-slate-600">
            Consulte le guide logement pour comprendre les étapes et éviter les erreurs.
          </p>
          <Link
            href="/parcours/guide/housing"
            className="mt-3 inline-flex items-center text-sm font-semibold text-slate-900 underline underline-offset-4"
          >
            Voir le guide logement →
          </Link>
        </div>
      ) : null}
    </main>
  );
}
