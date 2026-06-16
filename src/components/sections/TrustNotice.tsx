'use client';

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
          <ul className="mt-4 space-y-2 text-sm">
            {bullets.map((bullet) => (
              <li key={bullet} className={tone === 'dark' ? 'text-[#d8e7df]' : 'text-marhaban-ink/82'}>
                • {bullet}
              </li>
            ))}
          </ul>
        ) : null}
      </aside>
    </AnimatedCard>
  );
}
