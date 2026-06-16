'use client';

import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  Home,
  Landmark,
  MapPinned,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import { useLanguage } from '@/components/LanguageProvider';
import { AnimatedCTA, SectionReveal, StaggerGroup } from '@/components/animations/MarketingMotion';
import { DoDontSection } from '@/components/marketing/DoDontSection';
import { FinalCTA } from '@/components/marketing/FinalCTA';
import { GuideCard } from '@/components/marketing/GuideCard';
import { HeroVisual } from '@/components/marketing/HeroVisual';
import { MarketingSection } from '@/components/marketing/MarketingSection';
import { NeedCard } from '@/components/marketing/NeedCard';
import { OfferCard } from '@/components/marketing/OfferCard';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { StepTimeline } from '@/components/marketing/StepTimeline';
import { ValueStrip } from '@/components/marketing/ValueStrip';
import homeCopyData from '@/content/homeCopy.json';
import { legalDisclaimer } from '@/content/legalDisclaimer';
import { getHtmlAttrs, type Locale } from '@/i18n/locales';
import { bookingPath } from '@/lib/routes';

const needIcons: LucideIcon[] = [MapPinned, ClipboardCheck, Home, FileCheck2, AlertTriangle, MessageCircle];
const stepIcons: LucideIcon[] = [MessageCircle, Sparkles, CalendarCheck, CheckCircle2];
const guideIcons: LucideIcon[] = [ClipboardCheck, BookOpenCheck, ShieldCheck, Landmark];
const valueIcons: LucideIcon[] = [Clock3, CheckCircle2, BookOpenCheck, ShieldCheck];

const homeCopy = homeCopyData as Record<
  Locale,
  {
    heroTitle: string;
    heroSubtitle: string;
    primaryCta: string;
    secondaryCta: string;
    trust: string[];
    checklist: string[];
    valueLabels: string[];
    needsEyebrow: string;
    needsTitle: string;
    needsText: string;
    needsCta: string;
    needs: { title: string; description: string; href: string }[];
    stepsEyebrow: string;
    stepsTitle: string;
    steps: { title: string; text: string }[];
    offersEyebrow: string;
    offersTitle: string;
    offersText: string;
    reserve: string;
    offers: {
      title: string;
      price: string;
      duration: string;
      bestFor: string;
      included: string[];
      notPromised: string;
      betaLabel?: string;
    }[];
    scopeEyebrow: string;
    scopeTitle: string;
    scope: {
      doesTitle: string;
      does: string[];
      doesNotTitle: string;
      doesNot: string[];
    };
    scamTitle: string;
    scamExamples: string[];
    scamCta: string;
    guidesEyebrow: string;
    guidesTitle: string;
    guides: { title: string; description: string; href: string }[];
    finalTitle: string;
    finalText: string;
  }
>;

export default function HomePage() {
  const { locale } = useLanguage();
  const { dir } = getHtmlAttrs(locale);
  const t = homeCopy[locale] ?? homeCopy.fr;
  const bookingHref = bookingPath(locale);

  const values = t.valueLabels.map((label, index) => ({ label, icon: valueIcons[index] ?? CheckCircle2 }));
  const needs = t.needs.map((item, index) => ({ ...item, icon: needIcons[index] ?? MessageCircle, cta: t.needsCta }));
  const steps = t.steps.map((step, index) => ({ ...step, icon: stepIcons[index] ?? CheckCircle2 }));
  const guides = t.guides.map((guide, index) => ({ ...guide, icon: guideIcons[index] ?? BookOpenCheck }));

  return (
    <div className="warm-page" dir={dir}>
      <SectionReveal className="border-b border-marhaban-leaf/10 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            <h1 className="text-4xl font-semibold leading-tight text-marhaban-ink sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              {t.heroTitle}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-marhaban-ink/75">{t.heroSubtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <AnimatedCTA className="inline-flex">
                <LocalizedLink
                  href={bookingHref}
                  className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-marhaban-forestDark px-6 py-3 text-base font-semibold text-white shadow-warm-sm transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40"
                >
                  {t.primaryCta}
                  <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                </LocalizedLink>
              </AnimatedCTA>
              <AnimatedCTA className="inline-flex">
                <LocalizedLink
                  href="/parcours"
                  className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-marhaban-leaf/25 bg-offwhite px-6 py-3 text-base font-semibold text-marhaban-ink transition hover:border-marhaban-leaf/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/30"
                >
                  {t.secondaryCta}
                  <ArrowRight className="h-5 w-5 rtl-flip" aria-hidden="true" />
                </LocalizedLink>
              </AnimatedCTA>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {t.trust.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-marhaban-leaf/15 bg-offwhite px-3 py-2 text-sm font-medium text-marhaban-ink/80"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <HeroVisual locale={locale} checklist={t.checklist} />
        </div>
      </SectionReveal>

      <MarketingSection variant="muted">
        <ValueStrip items={values} />
      </MarketingSection>

      <MarketingSection>
        <SectionHeader eyebrow={t.needsEyebrow} title={t.needsTitle} text={t.needsText} />
        <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {needs.map((item) => (
            <NeedCard key={item.title} item={item} />
          ))}
        </StaggerGroup>
      </MarketingSection>

      <MarketingSection variant="muted">
        <SectionHeader eyebrow={t.stepsEyebrow} title={t.stepsTitle} />
        <div className="mt-10">
          <StepTimeline steps={steps} />
        </div>
      </MarketingSection>

      <MarketingSection>
        <SectionHeader eyebrow={t.offersEyebrow} title={t.offersTitle} text={t.offersText} />
        <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-2">
          {t.offers.map((offer, index) => (
            <OfferCard key={offer.title} offer={offer} cta={t.reserve} href={bookingHref} featured={index === 0} />
          ))}
        </StaggerGroup>
      </MarketingSection>

      <MarketingSection variant="muted">
        <SectionHeader eyebrow={t.scopeEyebrow} title={t.scopeTitle} />
        <div className="mt-10">
          <DoDontSection scope={t.scope} />
        </div>
      </MarketingSection>

      <MarketingSection variant="contrast" className="rounded-none">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <SectionHeader title={t.scamTitle} light />
          <ul className="grid gap-3 sm:grid-cols-2">
            {t.scamExamples.map((example) => (
              <li
                key={example}
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-base text-white/90"
              >
                {example}
              </li>
            ))}
          </ul>
        </div>
        <AnimatedCTA className="mt-8 inline-flex">
          <LocalizedLink
            href="/arnaques"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-marhaban-clay px-6 py-3 text-base font-semibold text-white transition hover:bg-marhaban-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            {t.scamCta}
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </LocalizedLink>
        </AnimatedCTA>
      </MarketingSection>

      <MarketingSection>
        <SectionHeader eyebrow={t.guidesEyebrow} title={t.guidesTitle} />
        <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2">
          {guides.map((guide) => (
            <GuideCard key={guide.title} guide={guide} />
          ))}
        </StaggerGroup>
      </MarketingSection>

      <FinalCTA
        title={t.finalTitle}
        text={t.finalText}
        cta={t.primaryCta}
        href={bookingHref}
        disclaimer={legalDisclaimer[locale]}
      />
    </div>
  );
}
