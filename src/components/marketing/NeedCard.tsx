import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import LocalizedLink from "@/components/LocalizedLink";
import { AnimatedCard } from "@/components/animations/MarketingMotion";

export type NeedCardData = {
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: LucideIcon;
};

export function NeedCard({ item }: { item: NeedCardData }) {
  const Icon = item.icon;

  return (
    <AnimatedCard>
      <LocalizedLink
        href={item.href}
        className="group flex h-full flex-col rounded-3xl border border-marhaban-leaf/15 bg-white p-7 sm:p-8 shadow-warm-sm transition-all duration-300 hover:-translate-y-2 hover:border-marhaban-leaf/35 hover:shadow-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35"
      >
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-marhaban-sageSoft text-marhaban-leaf">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-heading text-xl font-semibold leading-snug text-marhaban-ink sm:text-2xl">{item.title}</h3>
        <p className="mt-3 flex-1 text-base leading-relaxed text-marhaban-ink/70">{item.description}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-marhaban-leaf">
          {item.cta}
          <ArrowRight className="h-4 w-4 rtl-flip transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </LocalizedLink>
    </AnimatedCard>
  );
}
