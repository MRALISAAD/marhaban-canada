import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import LocalizedLink from "@/components/LocalizedLink";
import { AnimatedCard } from "@/components/animations/MarketingMotion";

export type GuideCardData = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export function GuideCard({ guide }: { guide: GuideCardData }) {
  const Icon = guide.icon;

  return (
    <AnimatedCard>
      <article className="flex h-full flex-col rounded-3xl border border-marhaban-leaf/15 bg-offwhite p-6 shadow-warm-sm">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-marhaban-mint text-marhaban-leaf">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-xl font-semibold leading-snug text-marhaban-ink">{guide.title}</h3>
        <p className="mt-3 flex-1 text-base leading-relaxed text-marhaban-ink/75">{guide.description}</p>
        <LocalizedLink
          href={guide.href}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-marhaban-leaf hover:text-marhaban-ink"
        >
          <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
        </LocalizedLink>
      </article>
    </AnimatedCard>
  );
}
