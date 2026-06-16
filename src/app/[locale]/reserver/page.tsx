import type { Metadata } from 'next';
import { CalendarCheck, CheckCircle2, ChevronDown, MailCheck, MessageCircle } from 'lucide-react';
import { notFound } from 'next/navigation';
import { SectionReveal, StaggerGroup } from '@/components/animations/MarketingMotion';
import { DisclaimerBlock } from '@/components/marketing/DisclaimerBlock';
import { FinalCTA } from '@/components/marketing/FinalCTA';
import { MarketingSection } from '@/components/marketing/MarketingSection';
import { OfferCard } from '@/components/marketing/OfferCard';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { StepTimeline } from '@/components/marketing/StepTimeline';
import bookingCopyData from '@/content/bookingCopy.json';
import { legalDisclaimer } from '@/content/legalDisclaimer';
import { getHtmlAttrs, isLocale, type Locale } from '@/i18n/locales';
import { ReserveForm, type ReserveTexts } from './ReserveForm';

const stepIcons = [MessageCircle, MailCheck, CalendarCheck, CheckCircle2];

type Props = { params: Promise<{ locale: string }> };

const bookingCopy = bookingCopyData as Record<
  Locale,
  {
    title: string;
    subtitle: string;
    offersEyebrow: string;
    offersTitle: string;
    reserve: string;
    formMicrocopy: string;
    formSafety: string;
    processEyebrow: string;
    processTitle: string;
    faqEyebrow: string;
    faqTitle: string;
    finalTitle: string;
    finalText: string;
    finalCta: string;
    offers: {
      title: string;
      price: string;
      duration: string;
      bestFor: string;
      included: string[];
      notPromised: string;
      betaLabel?: string;
    }[];
    steps: { title: string; text: string }[];
    faq: { q: string; a: string }[];
    form: ReserveTexts['form'] & { message: string };
    confirmation: string;
    errorText: string;
  }
>;


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';
  const t = bookingCopy[locale];
  return { title: `${t.title} | Marhaban Canada`, description: t.subtitle };
}

export default async function ReserverPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const { dir, lang } = getHtmlAttrs(locale);
  const t = bookingCopy[locale];
  const formAnchor = '#booking-form';
  const steps = t.steps.map((step, index) => ({ ...step, icon: stepIcons[index] ?? CheckCircle2 }));
  const formTexts: ReserveTexts = {
    form: {
      name: t.form.name,
      email: t.form.email,
      status: t.form.status,
      statusOptions: t.form.statusOptions,
      city: t.form.city,
      need: t.form.message,
      needPlaceholder: t.form.needPlaceholder,
      submit: t.form.submit,
    },
    confirmation: t.confirmation,
    errorText: t.errorText,
  };

  return (
    <main className="warm-page" dir={dir} lang={lang}>
      <SectionReveal className="border-b border-marhaban-leaf/10 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight text-marhaban-ink sm:text-5xl">{t.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-marhaban-ink/75">{t.subtitle}</p>
        </div>
      </SectionReveal>

      <MarketingSection id="offers">
        <SectionHeader eyebrow={t.offersEyebrow} title={t.offersTitle} />
        <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {t.offers.map((offer, index) => (
            <OfferCard key={offer.title} offer={offer} cta={t.reserve} href={formAnchor} featured={index === 0} />
          ))}
        </StaggerGroup>
      </MarketingSection>

      <MarketingSection id="booking-form" variant="muted" className="scroll-mt-24">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-4">
            <SectionHeader title={t.formMicrocopy} />
            <DisclaimerBlock text={t.formSafety} />
          </div>
          <SectionReveal className="rounded-3xl border border-marhaban-leaf/15 bg-offwhite p-6 shadow-warm sm:p-8">
            <ReserveForm texts={formTexts} locale={locale} dir={dir} />
          </SectionReveal>
        </div>
      </MarketingSection>

      <MarketingSection>
        <SectionHeader eyebrow={t.processEyebrow} title={t.processTitle} />
        <div className="mt-10">
          <StepTimeline steps={steps} />
        </div>
      </MarketingSection>

      <MarketingSection id="faq" variant="muted" className="scroll-mt-24">
        <SectionHeader eyebrow={t.faqEyebrow} title={t.faqTitle} />
        <div className="mt-8 space-y-3">
          {t.faq.map((item) => (
            <details key={item.q} className="group rounded-3xl border border-marhaban-leaf/15 bg-offwhite p-5 shadow-warm-sm open:shadow-warm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-marhaban-ink">
                <span>{item.q}</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-marhaban-leaf transition group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-4 border-t border-marhaban-leaf/10 pt-4 text-base leading-relaxed text-marhaban-ink/75">{item.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-8">
          <DisclaimerBlock text={legalDisclaimer[locale]} />
        </div>
      </MarketingSection>

      <FinalCTA title={t.finalTitle} text={t.finalText} cta={t.finalCta} href={formAnchor} />
    </main>
  );
}
