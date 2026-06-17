'use client';

import { Check } from 'lucide-react';
import { AnimatedCard } from '@/components/animations/MarketingMotion';

type Props = {
  title: string;
  text: string;
  bullets?: readonly string[];
  tone?: 'light' | 'dark';
};

export function TrustNotice({ title, text, bullets, tone = 'light' }: Props) {
  return (
    <AnimatedCard>
      <aside
        className={[
          'rounded-[1.75rem] border p-6 shadow-warm-sm',
          tone === 'dark'
            ? 'border-white/12 bg-marhaban-forestDark text-white'
            : 'border-marhaban-leaf/15 bg-white text-marhaban-ink',
        ].join(' ')}
      >
        <p className={['text-xs font-bold uppercase tracking-[0.14em]', tone === 'dark' ? 'text-marhaban-gold' : 'text-marhaban-clay'].join(' ')}>{title}</p>
        <p className={['mt-3 text-sm leading-relaxed', tone === 'dark' ? 'text-[#edf7f2]' : 'text-marhaban-ink/82'].join(' ')}>
          {text}
        </p>
        {bullets?.length ? (
          <ul className="mt-4 space-y-3 text-sm">
            {bullets.map((bullet) => (
              <li key={bullet} className={`flex items-start gap-2.5 ${tone === 'dark' ? 'text-[#d8e7df]' : 'text-marhaban-ink/82'}`}>
                <Check className={`mt-0.5 h-4 w-4 flex-shrink-0 ${tone === 'dark' ? 'text-marhaban-gold/70' : 'text-marhaban-leaf'}`} aria-hidden="true" />
                {bullet}
              </li>
            ))}
          </ul>
        ) : null}
      </aside>
    </AnimatedCard>
  );
}
