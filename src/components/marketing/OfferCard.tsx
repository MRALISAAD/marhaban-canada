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
          "flex h-full flex-col rounded-3xl border p-7 sm:p-9 shadow-warm-sm",
          featured
            ? "border-marhaban-clay/25 bg-marhaban-forestDark text-white shadow-premium-card"
            : "border-marhaban-leaf/15 bg-white text-marhaban-ink",
        )}
      >
        {/* Duration pill + beta label */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
              featured
                ? "border-white/15 bg-white/10 text-white/75"
                : "border-marhaban-leaf/15 bg-marhaban-mint/50 text-marhaban-leaf",
            )}
          >
            {offer.duration}
          </span>
          {offer.betaLabel ? (
            <span className="badge-gold">{offer.betaLabel}</span>
          ) : null}
        </div>

        {/* Title + price */}
        <h3 className="mt-5 font-heading text-2xl font-semibold leading-tight">{offer.title}</h3>
        <p
          className={cn(
            "mt-2 text-4xl font-semibold tracking-tight",
            featured ? "text-marhaban-sand" : "text-marhaban-forestDark",
          )}
        >
          {offer.price}
        </p>

        {/* Best for */}
        <p className={cn("mt-4 text-base leading-relaxed", featured ? "text-white/80" : "text-marhaban-ink/70")}>
          {offer.bestFor}
        </p>

        {/* Included */}
        <ul className={cn("mt-5 space-y-2.5 text-sm", featured ? "text-white/80" : "text-marhaban-ink/70")}>
          {offer.included.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <CheckCircle2
                className={cn("mt-0.5 h-4 w-4 shrink-0", featured ? "text-marhaban-sand" : "text-marhaban-leaf")}
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Not promised — left border accent */}
        <p
          className={cn(
            "mt-5 border-l-2 pl-3 text-sm leading-relaxed",
            featured
              ? "border-white/20 text-white/50"
              : "border-marhaban-leaf/20 text-marhaban-muted",
          )}
        >
          {offer.notPromised}
        </p>

        {/* CTA pushed to bottom */}
        <div className="mt-auto pt-6">
          <LocalizedLink
            href={href}
            className={cn(
              "btn btn-lg w-full",
              featured ? "btn-clay" : "btn-primary",
            )}
          >
            {cta}
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
          </LocalizedLink>
        </div>
      </article>
    </AnimatedCard>
  );
}
