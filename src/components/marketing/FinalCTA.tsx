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
    <SectionReveal
      className="bg-marhaban-forestDark px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
      data-floating-book-call-hide
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-[4rem] lg:leading-[1.05]">
          {title}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-white/70 sm:text-xl lg:mx-auto lg:max-w-xl">{text}</p>

        <AnimatedCTA className="mt-8 inline-flex">
          <LocalizedLink
            href={href}
            className="btn btn-lg btn-clay focus-visible:ring-white/40 focus-visible:ring-offset-marhaban-forestDark lg:min-h-[68px] lg:px-12 lg:text-xl"
          >
            {cta}
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
          </LocalizedLink>
        </AnimatedCTA>

        {disclaimer ? (
          <p className="mt-8 text-sm leading-relaxed text-white/40">{disclaimer}</p>
        ) : null}
      </div>
    </SectionReveal>
  );
}
