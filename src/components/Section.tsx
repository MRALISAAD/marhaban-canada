import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';

type Divider = 'none' | 'top' | 'bottom' | 'both';
type Density = 'tight' | 'normal' | 'loose';

type SectionProps = {
  id?: string;
  divider?: Divider;
  density?: Density;
  bleed?: boolean;
  band?: boolean;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

/**
 * Section (single background global)
 * - No background switching inside sections.
 * - Separation is done via: spacing + zinc divider + optional subtle band.
 */
export function Section({
  id,
  divider = 'top',
  density = 'normal',
  bleed = false,
  band = false,
  className = '',
  containerClassName = '',
  children,
}: SectionProps) {
  const dividerClass =
    divider === 'none'
      ? ''
      : divider === 'top'
        ? 'border-t border-zinc-300/80'
      : divider === 'bottom'
        ? 'border-b border-zinc-300/80'
          : 'border-y border-zinc-300/80';

  const densityClass =
    density === 'tight'
      ? 'py-8 sm:py-10'
      : density === 'loose'
        ? 'py-12 sm:py-14'
        : 'py-10 sm:py-12';

  return (
    <section
      id={id}
      className={[
        'relative',
        dividerClass,
        densityClass,
        className,
      ].join(' ')}
    >
      {band ? (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-6 bottom-6 rounded-[32px] border border-zinc-200/60 bg-white/[0.55] backdrop-blur-sm"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-6 bottom-6 rounded-[32px] opacity-60 [background:radial-gradient(900px_circle_at_20%_10%,rgba(255,255,255,0.55),transparent_55%)]"
          />
        </>
      ) : null}

      {bleed ? (
        <div className={['relative', containerClassName].join(' ')}>
          {children}
        </div>
      ) : (
        <Container>
          <div className={['relative', containerClassName].join(' ')}>
            {children}
          </div>
        </Container>
      )}
    </section>
  );
}
