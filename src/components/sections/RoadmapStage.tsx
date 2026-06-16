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
      <article className="flex h-full flex-col rounded-[1.85rem] border border-marhaban-leaf/15 bg-offwhite p-6 shadow-warm-sm">
        <p className="inline-flex w-fit rounded-full border border-marhaban-leaf/15 bg-marhaban-mint/60 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">
          {number}
        </p>
        <h3 className="mt-4 text-[1.15rem] font-semibold leading-tight text-marhaban-ink sm:text-[1.25rem]">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-marhaban-ink/82">{text}</p>
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
