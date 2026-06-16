import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { AnimatedCard } from "@/components/animations/MarketingMotion";

type Scope = {
  doesTitle: string;
  does: readonly string[];
  doesNotTitle: string;
  doesNot: readonly string[];
};

export function DoDontSection({ scope }: { scope: Scope }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <AnimatedCard>
        <article className="h-full rounded-3xl border border-marhaban-leaf/15 bg-marhaban-mint/70 p-6 shadow-warm-sm sm:p-8">
          <h3 className="text-2xl font-semibold text-marhaban-ink">{scope.doesTitle}</h3>
          <ul className="mt-6 space-y-4">
            {scope.does.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base text-marhaban-ink/80">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-marhaban-leaf" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </AnimatedCard>
      <AnimatedCard>
        <article className="h-full rounded-3xl border border-marhaban-clay/20 bg-[#FFF4E8] p-6 shadow-warm-sm sm:p-8">
          <h3 className="text-2xl font-semibold text-marhaban-ink">{scope.doesNotTitle}</h3>
          <ul className="mt-6 space-y-4">
            {scope.doesNot.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base text-marhaban-ink/80">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-marhaban-clay" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </AnimatedCard>
    </div>
  );
}
