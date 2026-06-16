import { CalendarCheck, CheckCircle2 } from "lucide-react";
import LocalizedLink from "@/components/LocalizedLink";
import { AnimatedCard } from "@/components/animations/MarketingMotion";
import { cn } from "@/lib/cn";

export type OfferCardData = {
  title: string;
  price: string;
  duration: string;
  bestFor: string;
  included: readonly string[];
  notPromised: string;
  betaLabel?: string;
};

type Props = {
  offer: OfferCardData;
  cta: string;
  href: string;
  featured?: boolean;
};

export function OfferCard({ offer, cta, href, featured = false }: Props) {
  return (
    <AnimatedCard featured={featured}>
      <article
        className={cn(
          "flex h-full flex-col rounded-3xl border p-6 shadow-warm-sm",
          featured
            ? "border-marhaban-clay/30 bg-marhaban-forestDark text-white"
            : "border-marhaban-leaf/15 bg-offwhite text-marhaban-ink",
        )}
      >
        {offer.betaLabel ? (
          <p className="text-sm font-semibold text-marhaban-clay">{offer.betaLabel}</p>
        ) : null}
        <p className={cn("text-sm font-medium", featured ? "text-marhaban-sage" : "text-marhaban-muted")}>
          {offer.duration}
        </p>
        <h3 className="mt-3 text-2xl font-semibold leading-tight">{offer.title}</h3>
        <p className={cn("mt-2 text-4xl font-semibold", featured ? "text-marhaban-sand" : "text-marhaban-leaf")}>
          {offer.price}
        </p>
        <p className={cn("mt-4 text-base leading-relaxed", featured ? "text-white/85" : "text-marhaban-ink/75")}>
          {offer.bestFor}
        </p>
        <ul className={cn("mt-5 space-y-2 text-sm", featured ? "text-white/80" : "text-marhaban-ink/70")}>
          {offer.included.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2
                className={cn("mt-0.5 h-4 w-4 shrink-0", featured ? "text-marhaban-sand" : "text-marhaban-leaf")}
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p
          className={cn(
            "mt-4 rounded-2xl px-3 py-2 text-sm",
            featured ? "bg-white/10 text-white/70" : "bg-marhaban-mint/60 text-marhaban-ink/65",
          )}
        >
          {offer.notPromised}
        </p>
        <LocalizedLink
          href={href}
          className={cn(
            "mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            featured
              ? "bg-marhaban-clay text-white hover:bg-marhaban-orange focus-visible:ring-marhaban-clay/40 focus-visible:ring-offset-marhaban-forestDark"
              : "bg-marhaban-forestDark text-white hover:bg-marhaban-leaf focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-marhaban-cream",
          )}
        >
          {cta}
          <CalendarCheck className="h-4 w-4" aria-hidden="true" />
        </LocalizedLink>
      </article>
    </AnimatedCard>
  );
}
