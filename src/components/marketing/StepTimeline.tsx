import type { LucideIcon } from "lucide-react";
import { AnimatedCard } from "@/components/animations/MarketingMotion";

export type StepItem = {
  title: string;
  text: string;
  icon: LucideIcon;
};

export function StepTimeline({ steps }: { steps: readonly StepItem[] }) {
  return (
    <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <AnimatedCard key={step.title}>
            <li className="relative flex h-full flex-col rounded-3xl border border-marhaban-leaf/15 bg-offwhite p-6 shadow-warm-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-marhaban-mint text-marhaban-leaf">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-2xl font-semibold text-marhaban-clay/40">{index + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-marhaban-ink">{step.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-marhaban-ink/75">{step.text}</p>
            </li>
          </AnimatedCard>
        );
      })}
    </ol>
  );
}
