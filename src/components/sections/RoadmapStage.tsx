'use client';

import { AnimatedCard } from '@/components/animations/MarketingMotion';

type Props = {
  number: string;
  title: string;
  text: string;
  bullets?: readonly string[];
};

export function RoadmapStage({ number, title, text, bullets }: Props) {
  return (
    <AnimatedCard>
      <article className="relative flex h-full flex-col overflow-hidden rounded-[1.85rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-warm lg:p-7">
        <span className="pointer-events-none absolute -right-3 -top-5 select-none font-heading text-[8rem] font-bold leading-none text-marhaban-leaf/[0.055]" aria-hidden="true">
          {number}
        </span>
        <p className="relative inline-flex w-fit rounded-full border border-marhaban-clay/25 bg-marhaban-clay/8 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">
          {number}
        </p>
        <h3 className="relative mt-4 font-heading text-[1.2rem] font-semibold leading-tight text-marhaban-ink sm:text-[1.32rem]">{title}</h3>
        <p className="relative mt-3 text-[0.95rem] leading-relaxed text-marhaban-ink/82">{text}</p>
        {bullets?.length ? (
          <ul className="mt-5 space-y-2 text-sm text-marhaban-ink/82">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-marhaban-leaf" aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </article>
    </AnimatedCard>
  );
}
