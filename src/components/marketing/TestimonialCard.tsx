import { Star } from 'lucide-react';
import { AnimatedCard } from '@/components/animations/MarketingMotion';

export type TestimonialData = {
  quote: string;
  author: string;
  origin: string;
  city: string;
};

export function TestimonialCard({ item }: { item: TestimonialData }) {
  return (
    <AnimatedCard>
      <article className="flex h-full flex-col rounded-3xl border border-marhaban-leaf/15 bg-offwhite p-6 shadow-warm-sm sm:p-8">
        <div className="flex gap-1" aria-label="5 étoiles">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-marhaban-orange text-marhaban-orange" aria-hidden="true" />
          ))}
        </div>
        <blockquote className="mt-5 flex-1 text-base leading-relaxed text-marhaban-ink/85">
          &ldquo;{item.quote}&rdquo;
        </blockquote>
        <footer className="mt-6 border-t border-marhaban-leaf/10 pt-5">
          <p className="text-sm font-semibold text-marhaban-ink">{item.author}</p>
          <p className="mt-0.5 text-sm text-marhaban-muted">
            {item.origin ? `${item.origin} → ${item.city}` : item.city}
          </p>
        </footer>
      </article>
    </AnimatedCard>
  );
}
