'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import LocalizedLink from '@/components/LocalizedLink';
import { SectionReveal } from '@/components/animations/MarketingMotion';
import { SectionHeader } from './SectionHeader';

export type RoadmapPhase = {
  label: string;
  items: string[];
};

type Props = {
  eyebrow: string;
  title: string;
  cta: string;
  href: string;
  phases: RoadmapPhase[];
};

export function RoadmapSection({ eyebrow, title, cta, href, phases }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = phases[activeIndex];

  return (
    <SectionReveal className="bg-white/60 px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow={eyebrow} title={title} />

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label={eyebrow}>
          {phases.map((phase, i) => (
            <button
              key={phase.label}
              role="tab"
              aria-selected={i === activeIndex}
              aria-controls={`roadmap-panel-${i}`}
              id={`roadmap-tab-${i}`}
              onClick={() => setActiveIndex(i)}
              className={[
                'rounded-full px-5 py-2.5 text-sm font-semibold transition',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40',
                i === activeIndex
                  ? 'bg-marhaban-forestDark text-white shadow-warm-sm'
                  : 'border border-marhaban-leaf/20 bg-offwhite text-marhaban-ink hover:border-marhaban-leaf/40 hover:bg-white',
              ].join(' ')}
            >
              {phase.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            role="tabpanel"
            id={`roadmap-panel-${activeIndex}`}
            aria-labelledby={`roadmap-tab-${activeIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 rounded-3xl border border-marhaban-leaf/15 bg-offwhite p-6 shadow-warm-sm sm:p-8"
          >
            <ul className="grid gap-3 sm:grid-cols-2">
              {active.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-marhaban-ink/85">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-marhaban-leaf"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        <LocalizedLink
          href={href}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-marhaban-leaf transition hover:text-marhaban-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2"
        >
          {cta}
          <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
        </LocalizedLink>
      </div>
    </SectionReveal>
  );
}
