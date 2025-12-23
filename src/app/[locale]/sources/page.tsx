'use client';

import { useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { Disclaimer } from "@/components/Disclaimer";
import { Section } from "@/components/Section";

export default function SourcesPage() {
  const { content } = useLanguage();

  const sources = useMemo(() => {
    const list = content.checklist.items.flatMap((item) => item.sources) ?? [];
    const survivalSources = content.survival48h.items.flatMap((item) => item.sources);
    const budgetSources = content.budget.cities.flatMap((city) => city.sources);
    const resourceSources = content.resourceSources.flatMap((resource) => resource.sources);
    const serviceSources = content.services.cards.flatMap((card) => card.sources);

    const combined = [...list, ...survivalSources, ...budgetSources, ...resourceSources, ...serviceSources];
    const map = new Map<string, { name: string; url: string }>();
    combined.forEach((source) => {
      if (!map.has(source.url)) {
        map.set(source.url, source);
      }
    });
    return Array.from(map.values());
  }, [content]);

  return (
    <main>
      <Section id="sources" divider="none" density="loose" band>
        <div className="space-y-8">
          <header className="space-y-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
              Sources & Fiabilité
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-950">
              Sources & Fiabilité
            </h1>
            <p className="max-w-2xl text-slate-600">{content.shared.sourcesIntro}</p>
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            {sources.map((source) => (
              <article
                key={source.url}
                className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
              >
                <h2 className="text-lg font-semibold text-slate-900">{source.name}</h2>
                <p className="mt-1 text-xs break-all text-slate-600">{source.url}</p>
                <Link
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-slate-600"
                >
                  Ouvrir la source
                </Link>
              </article>
            ))}
          </div>

          <Disclaimer text={content.shared.disclaimer} />
        </div>
      </Section>
    </main>
  );
}
