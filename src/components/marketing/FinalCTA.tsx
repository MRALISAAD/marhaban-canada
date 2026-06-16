import { CalendarCheck } from "lucide-react";
import LocalizedLink from "@/components/LocalizedLink";
import { AnimatedCTA, SectionReveal } from "@/components/animations/MarketingMotion";

type Props = {
  title: string;
  text: string;
  cta: string;
  href: string;
  disclaimer?: string;
};

export function FinalCTA({ title, text, cta, href, disclaimer }: Props) {
  return (
    <SectionReveal className="px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8" data-floating-book-call-hide>
      <div className="mx-auto max-w-6xl rounded-3xl border border-marhaban-leaf/15 bg-offwhite p-8 shadow-warm sm:p-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold leading-tight text-marhaban-ink sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-marhaban-ink/75 sm:text-lg">{text}</p>
          {disclaimer ? (
            <p className="mt-4 text-sm leading-relaxed text-marhaban-ink/60">{disclaimer}</p>
          ) : null}
        </div>
        <AnimatedCTA className="mt-8 inline-flex">
          <LocalizedLink
            href={href}
            className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-marhaban-forestDark px-6 py-3 text-base font-semibold text-white shadow-warm-sm transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2"
          >
            {cta}
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
          </LocalizedLink>
        </AnimatedCTA>
      </div>
    </SectionReveal>
  );
}
