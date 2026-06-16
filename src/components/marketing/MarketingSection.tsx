import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SectionReveal } from "@/components/animations/MarketingMotion";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "muted" | "contrast";
};

const variants = {
  default: "bg-transparent",
  muted: "bg-white/60",
  contrast: "bg-marhaban-forestDark text-white",
};

export function MarketingSection({ children, className, id, variant = "default" }: Props) {
  return (
    <SectionReveal
      id={id}
      className={cn("px-4 py-12 sm:px-6 sm:py-14 lg:px-8", variants[variant], className)}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </SectionReveal>
  );
}
