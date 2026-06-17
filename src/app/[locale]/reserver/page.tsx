import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { getHtmlAttrs, isLocale, type Locale } from '@/i18n/locales';
import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { CalendlyEmbed } from '@/components/forms/CalendlyEmbed';

type Props = {
  params: Promise<{ locale: string }>;
};

const copy = {
  fr: {
    eyebrow: 'Réservation',
    title: 'Réservez un appel d\'orientation',
    subtitle: 'Clarifiez vos prochaines étapes au Canada avec un accompagnement pratique, humain et sans pression.',
    primary: 'Réserver maintenant',
    badges: ['30 min', 'FR / EN / AR', 'Confirmation par email', 'Accompagnement informatif'],
    heroServiceLabel: 'Appel orientation — 30 min',
    heroPriceLabel: '29 $',
    heroBullets: [
      'Analyse simple de ta situation',
      'Tes 3 priorités immédiates',
      'Ressources utiles ciblées',
    ],
    howEyebrow: 'Comment ça marche',
    howTitle: 'Un parcours simple pour réserver sans confusion.',
    howText: 'Trois étapes claires de la sélection à la confirmation.',
    howCards: [
      {
        title: 'Choisissez le bon appel',
        text: 'Comparez les formats et sélectionnez celui qui correspond le mieux à votre situation.',
      },
      {
        title: 'Réservez votre créneau',
        text: 'Cliquez sur "Réserver maintenant" et choisissez l\'horaire qui vous convient.',
      },
      {
        title: 'Recevez votre confirmation',
        text: 'Un email de confirmation vous est envoyé. Préparez vos questions, vous êtes prêt.',
      },
    ],
    bookingEyebrow: 'Choix du service',
    bookingTitle: 'Choisissez votre appel',
    bookingText: 'Sélectionnez le format le plus utile selon votre situation.',
    disclaimerText:
      'Marhaban Canada offre un accompagnement pratique et informatif. Ce service ne remplace pas un avocat, un consultant réglementé, une institution gouvernementale ou un professionnel autorisé.',
    finalTitle: 'Commencez par un appel simple, puis avancez sans confusion.',
    finalPrimary: 'Réserver un appel',
    finalNote: 'Confirmation par email · Paiement sécurisé · Sans engagement',
  },
  en: {
    eyebrow: 'Booking',
    title: 'Book an orientation call',
    subtitle: 'Clarify your next steps in Canada with practical, human, and pressure-free guidance.',
    primary: 'Book now',
    badges: ['30 min', 'FR / EN / AR', 'Email confirmation', 'Informational support'],
    heroServiceLabel: 'Orientation call — 30 min',
    heroPriceLabel: '$29',
    heroBullets: [
      'Simple review of your situation',
      'Your 3 immediate priorities',
      'Targeted useful resources',
    ],
    howEyebrow: 'How it works',
    howTitle: 'A simple booking flow with no confusion.',
    howText: 'Three clear steps from selection to confirmation.',
    howCards: [
      {
        title: 'Choose the right call',
        text: 'Compare the formats and pick the one that fits your situation best.',
      },
      {
        title: 'Book your slot',
        text: 'Click "Book now" and choose the time that works for you.',
      },
      {
        title: 'Receive confirmation',
        text: 'A confirmation email is sent to you. Prepare your questions, you are ready.',
      },
    ],
    bookingEyebrow: 'Service selection',
    bookingTitle: 'Choose your call',
    bookingText: 'Select the most useful format for your situation.',
    disclaimerText:
      'Marhaban Canada provides practical and informational support. This service does not replace a lawyer, a regulated consultant, a government institution, or an authorized professional.',
    finalTitle: 'Start with a simple call, then move forward without confusion.',
    finalPrimary: 'Book a call',
    finalNote: 'Email confirmation · Secure payment · No commitment',
  },
  ar: {
    eyebrow: 'الحجز',
    title: 'احجز مكالمة توجيه',
    subtitle: 'وضّح خطواتك التالية في كندا مع مرافقة عملية وإنسانية ومن دون ضغط.',
    primary: 'احجز الآن',
    badges: ['30 دقيقة', 'FR / EN / AR', 'تأكيد عبر البريد', 'دعم معلوماتي'],
    heroServiceLabel: 'مكالمة توجيه — 30 دقيقة',
    heroPriceLabel: '29 $',
    heroBullets: [
      'تحليل بسيط لوضعك',
      'أولوياتك الثلاث الفورية',
      'موارد مفيدة مستهدفة',
    ],
    howEyebrow: 'كيف يتم الأمر',
    howTitle: 'مسار حجز بسيط وواضح.',
    howText: 'ثلاث خطوات واضحة من الاختيار إلى التأكيد.',
    howCards: [
      {
        title: 'اختر المكالمة المناسبة',
        text: 'قارن الصيغ واختر ما يناسب وضعك أفضل.',
      },
      {
        title: 'احجز موعدك',
        text: 'انقر على "احجز الآن" واختر الوقت الذي يناسبك.',
      },
      {
        title: 'استلم التأكيد',
        text: 'ستتلقى رسالة تأكيد عبر البريد. حضّر أسئلتك، أنت جاهز.',
      },
    ],
    bookingEyebrow: 'اختيار الخدمة',
    bookingTitle: 'اختر مكالمتك',
    bookingText: 'اختر الصيغة الأنسب لوضعك.',
    disclaimerText:
      'تقدم مرحبا كندا دعماً عملياً وإعلامياً. لا تحل هذه الخدمة محل محامٍ أو مستشار مرخص أو مؤسسة حكومية أو محترف مخول.',
    finalTitle: 'ابدأ بمكالمة بسيطة ثم تقدّم من دون تشويش.',
    finalPrimary: 'احجز مكالمة',
    finalNote: 'تأكيد عبر البريد · دفع آمن · بدون التزام',
  },
} as const satisfies Record<Locale, {
  eyebrow: string; title: string; subtitle: string;
  primary: string; badges: readonly string[];
  heroServiceLabel: string; heroPriceLabel: string; heroBullets: readonly string[];
  howEyebrow: string; howTitle: string; howText: string;
  howCards: readonly { title: string; text: string }[];
  bookingEyebrow: string; bookingTitle: string; bookingText: string;
  disclaimerText: string;
  finalTitle: string; finalPrimary: string; finalNote: string;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';
  return {
    title: `${copy[locale].title} | Marhaban Canada`,
    description: copy[locale].subtitle,
  };
}

export default async function ReserverPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const { dir, lang } = getHtmlAttrs(locale);
  const t = copy[locale];

  return (
    <PageShell dir={dir} lang={lang} className="pb-24 md:pb-28">
      <a
        href="#booking-section"
        className="fixed bottom-4 left-1/2 z-40 inline-flex min-h-[48px] -translate-x-1/2 items-center justify-center gap-2 rounded-full border border-marhaban-gold/25 bg-marhaban-forestDark/95 px-5 py-3 text-sm font-bold text-white shadow-[0_18px_55px_rgba(8,42,36,0.26)] backdrop-blur transition hover:bg-marhaban-clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-cream md:hidden"
      >
        {t.primary}
        <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
      </a>

      {/* ── Hero ── */}
      <section className="px-4 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pt-14">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.5rem] border border-white/10 bg-marhaban-forestDark px-6 py-10 text-white shadow-[0_30px_90px_rgba(0,0,0,0.26)] sm:px-8 sm:py-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-12 lg:py-14">

          {/* Left: copy + CTAs */}
          <div className="space-y-7">
            <p className="inline-flex rounded-full border border-white/12 bg-white/[0.08] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-marhaban-gold">
              {t.eyebrow}
            </p>
            <div className="space-y-4">
              <h1 className="max-w-3xl font-heading text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.9] tracking-tight text-white">
                {t.title}
              </h1>
              <p className="max-w-2xl text-[1.1rem] leading-relaxed text-[#edf7f2] sm:text-lg">
                {t.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {t.badges.map((badge) => (
                <span key={badge} className="inline-flex rounded-full border border-white/12 bg-white/[0.06] px-4 py-2.5 text-xs font-semibold text-[#edf7f2]">
                  {badge}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#booking-section"
                className="inline-flex min-h-[60px] items-center justify-center gap-2 rounded-full bg-marhaban-gold px-8 py-4 text-sm font-bold text-marhaban-ink shadow-[0_22px_70px_rgba(213,168,79,0.32)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark"
              >
                {t.primary}
                <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right: service summary */}
          <div className="rounded-[2rem] border border-white/12 bg-white/[0.08] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-gold">
              {t.heroServiceLabel}
            </p>
            <p className="mt-3 font-heading text-4xl font-semibold tracking-tight text-white">
              {t.heroPriceLabel}
            </p>
            <p className="mt-2 text-sm text-[#edf7f2]">
              {locale === 'fr' ? 'Prix de lancement' : locale === 'en' ? 'Launch price' : 'سعر إطلاق'}
            </p>
            <div className="mt-5 space-y-2.5">
              {t.heroBullets.map((bullet) => (
                <div key={bullet} className="flex items-center gap-3 rounded-[1.1rem] border border-white/10 bg-white/[0.06] px-4 py-3 text-sm leading-relaxed text-[#edf7f2]">
                  <Check className="h-4 w-4 flex-shrink-0 text-marhaban-gold" aria-hidden="true" />
                  {bullet}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Comment ça marche ── */}
      <Section tone="muted" className="scroll-mt-28 py-14 sm:py-16 lg:py-20" id="how-it-works">
        <SectionHeader eyebrow={t.howEyebrow} title={t.howTitle} text={t.howText} />
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {t.howCards.map((item, index) => (
            <article key={item.title} className="rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm transition duration-200 hover:-translate-y-1 hover:border-marhaban-clay/25 hover:shadow-warm sm:p-7">
              <p className="inline-flex rounded-full border border-marhaban-clay/25 bg-marhaban-clay/8 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">0{index + 1}</p>
              <h3 className="mt-4 font-heading text-xl font-semibold leading-tight text-marhaban-ink sm:text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-marhaban-ink/78">{item.text}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* ── Booking section ── */}
      <Section className="scroll-mt-32 py-12 sm:py-14 lg:py-16" id="booking-section">
        <SectionHeader eyebrow={t.bookingEyebrow} title={t.bookingTitle} text={t.bookingText} />
        <div className="mt-9">
          <CalendlyEmbed
            locale={locale}
            disclaimer={t.disclaimerText}
          />
        </div>
        {/* Disclaimer discret — sous la section booking, pas en section autonome */}
        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-marhaban-muted">
          {t.disclaimerText}
        </p>
      </Section>

      {/* ── CTA final — UN seul bloc sombre fort ── */}
      <Section tone="dark" className="py-14 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow-light">
              {locale === 'fr' ? 'Prêt à réserver ?' : locale === 'en' ? 'Ready to book?' : 'هل أنت مستعد للحجز؟'}
            </p>
            <h2 className="heading-section mt-3 !text-white">{t.finalTitle}</h2>
            <p className="mt-5 text-sm leading-relaxed text-[#d8e7df]">{t.finalNote}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href="#booking-section"
              className="flex-1 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-marhaban-gold px-8 py-4 text-sm font-bold text-marhaban-ink shadow-[0_22px_70px_rgba(213,168,79,0.30)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark"
            >
              {t.finalPrimary}
              <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
            </a>
          </div>
        </div>
      </Section>

    </PageShell>
  );
}
