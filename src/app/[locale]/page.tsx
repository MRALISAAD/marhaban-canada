import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldAlert } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getHtmlAttrs, isLocale, type Locale } from '@/i18n/locales';
import { BookingModalTrigger } from '@/components/booking/BookingModalTrigger';
import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/marketing/SectionHeader';

type Props = { params: Promise<{ locale: string }> };

const copy = {
  fr: {
    metaTitle: 'Marhaban Canada — Arriver au Canada sans se perdre',
    metaDesc: 'Marhaban Canada aide les nouveaux arrivants à comprendre quoi faire en premier, éviter les erreurs et avancer avec un plan simple.',

    heroEyebrow: 'Marhaban Canada',
    heroTitle: 'Bienvenue au Canada,\nsans te perdre dans\nles démarches.',
    heroText: "Marhaban Canada t'aide à comprendre quoi faire, dans quel ordre, et comment avancer sans confusion.",
    heroCta1: 'Réserver un appel gratuit',
    heroCta2: 'Voir comment ça marche',

    offersEyebrow: 'Deux options claires',
    offersTitle: 'Commence par le bon appel.',

    offer1Title: 'Appel gratuit',
    offer1Duration: '15 min',
    offer1Text: "Un premier appel pour comprendre ta situation et t'orienter vers la bonne prochaine étape.",
    offer1Extra: 'Idéal si tu ne sais pas par où commencer.',
    offer1Cta: 'Réserver un appel gratuit',

    offer2Title: 'Appel orientation',
    offer2Duration: '45 min',
    offer2Text: 'Un appel plus complet pour clarifier tes démarches et repartir avec un plan simple.',
    offer2Extra: 'Idéal si tu veux arrêter de chercher partout et avancer avec confiance.',
    offer2Cta: 'Bientôt disponible',

    antiTitle: "Avant de payer quelqu'un, vérifie.",
    antiText: "Si une offre, un message ou une demande d'argent te semble douteuse, on t'aide à identifier les signaux d'alerte.",
    antiCta: 'Voir anti-arnaque',

    stepsEyebrow: 'Comment ça marche',
    stepsTitle: 'Simple. Clair. Humain.',
    steps: [
      { num: '01', title: 'Tu remplis le formulaire', text: 'Quelques questions pour comprendre ta situation.' },
      { num: '02', title: 'On te contacte', text: 'On confirme un créneau pour ton appel gratuit.' },
      { num: '03', title: 'Tu repars avec une prochaine étape', text: 'Tu sais quoi faire maintenant, sans confusion.' },
    ],

    finalTitle: "Tu n'as pas besoin de tout comprendre seul.",
    finalText: "Commence par un appel gratuit de 15 minutes.",
    finalCta1: 'Réserver un appel gratuit',
    finalCta2: 'Bientôt disponible',

    disclaimer: 'Marhaban Canada offre un accompagnement général et informatif. Ce service ne remplace pas un avocat, un consultant réglementé en immigration ou un organisme gouvernemental.',

    heroCard1Status: 'Disponible',
    heroCard2Status: 'Bientôt disponible',
  },
  en: {
    metaTitle: 'Marhaban Canada — Arriving in Canada without getting lost',
    metaDesc: 'Marhaban Canada helps newcomers understand what to do first, avoid mistakes, and move forward with a simple plan.',

    heroEyebrow: 'Marhaban Canada',
    heroTitle: 'Welcome to Canada,\nwithout getting lost\nin the process.',
    heroText: 'Marhaban Canada helps you understand what to do, in what order, and how to move forward without confusion.',
    heroCta1: 'Book a free call',
    heroCta2: 'See how it works',

    offersEyebrow: 'Two clear options',
    offersTitle: 'Start with the right call.',

    offer1Title: 'Free call',
    offer1Duration: '15 min',
    offer1Text: 'A first call to understand your situation and point you to the right next step.',
    offer1Extra: "Ideal if you don't know where to start.",
    offer1Cta: 'Book a free call',

    offer2Title: 'Orientation call',
    offer2Duration: '45 min',
    offer2Text: 'A more complete call to clarify your steps and leave with a simple plan.',
    offer2Extra: 'Ideal if you want to stop searching everywhere and move forward with confidence.',
    offer2Cta: 'Coming soon',

    antiTitle: 'Before paying anyone, verify.',
    antiText: 'If an offer, a message, or a request for money seems suspicious, we help you identify the warning signs.',
    antiCta: 'See anti-scam',

    stepsEyebrow: 'How it works',
    stepsTitle: 'Simple. Clear. Human.',
    steps: [
      { num: '01', title: 'You fill out the form', text: 'A few questions to understand your situation.' },
      { num: '02', title: 'We contact you', text: 'We confirm a time slot for your free call.' },
      { num: '03', title: 'You leave with a next step', text: 'You know what to do now, without confusion.' },
    ],

    finalTitle: "You don't need to figure it all out alone.",
    finalText: 'Start with a free 15-minute call.',
    finalCta1: 'Book a free call',
    finalCta2: 'Coming soon',

    disclaimer: 'Marhaban Canada provides general and informational guidance. This service does not replace a lawyer, a regulated immigration consultant, or a government agency.',

    heroCard1Status: 'Available',
    heroCard2Status: 'Coming soon',
  },
  ar: {
    metaTitle: 'مرحبا كندا — الوصول إلى كندا دون ضياع',
    metaDesc: 'مرحبا كندا تساعد الوافدين الجدد على فهم ما يجب فعله أولاً، وتجنب الأخطاء، والمضي قدماً بخطة بسيطة.',

    heroEyebrow: 'مرحبا كندا',
    heroTitle: 'أهلاً بك في كندا،\nدون أن تضيع\nفي الإجراءات.',
    heroText: 'تساعدك مرحبا كندا على فهم ما يجب فعله، وبأي ترتيب، وكيفية المضي قدماً بدون ارتباك.',
    heroCta1: 'احجز مكالمة مجانية',
    heroCta2: 'اعرف كيف يعمل',

    offersEyebrow: 'خيارين واضحين',
    offersTitle: 'ابدأ بالمكالمة المناسبة.',

    offer1Title: 'مكالمة مجانية',
    offer1Duration: '15 دقيقة',
    offer1Text: 'مكالمة أولى لفهم وضعك وتوجيهك نحو الخطوة الصحيحة التالية.',
    offer1Extra: 'مثالي إذا كنت لا تعرف من أين تبدأ.',
    offer1Cta: 'احجز مكالمة مجانية',

    offer2Title: 'مكالمة توجيه',
    offer2Duration: '45 دقيقة',
    offer2Text: 'مكالمة أكثر تفصيلاً لتوضيح إجراءاتك والخروج بخطة بسيطة.',
    offer2Extra: 'مثالي إذا كنت تريد التوقف عن البحث في كل مكان والمضي قدماً بثقة.',
    offer2Cta: 'قريباً',

    antiTitle: 'قبل أن تدفع لأي أحد، تحقّق.',
    antiText: 'إذا بدا لك عرض أو رسالة أو طلب مال مريباً، نساعدك على تحديد الإشارات التحذيرية.',
    antiCta: 'انظر مكافحة الاحتيال',

    stepsEyebrow: 'كيف يعمل',
    stepsTitle: 'بسيط. واضح. إنساني.',
    steps: [
      { num: '٠١', title: 'تملأ النموذج', text: 'بعض الأسئلة لفهم وضعك.' },
      { num: '٠٢', title: 'نتواصل معك', text: 'نؤكد موعداً لمكالمتك المجانية.' },
      { num: '٠٣', title: 'تخرج بخطوة تالية', text: 'ستعرف ماذا تفعل الآن، بدون ارتباك.' },
    ],

    finalTitle: 'لست بحاجة إلى فهم كل شيء وحدك.',
    finalText: 'ابدأ بمكالمة مجانية مدتها 15 دقيقة.',
    finalCta1: 'احجز مكالمة مجانية',
    finalCta2: 'قريباً',

    disclaimer: 'تقدم مرحبا كندا إرشادات عامة ومعلوماتية. لا تحل هذه الخدمة محل محامٍ أو مستشار هجرة معتمد أو جهة حكومية.',

    heroCard1Status: 'متاحة',
    heroCard2Status: 'قريباً',
  },
} as const satisfies Record<Locale, {
  metaTitle: string; metaDesc: string;
  heroEyebrow: string; heroTitle: string; heroText: string; heroCta1: string; heroCta2: string;
  offersEyebrow: string; offersTitle: string;
  offer1Title: string; offer1Duration: string; offer1Text: string; offer1Extra: string; offer1Cta: string;
  offer2Title: string; offer2Duration: string; offer2Text: string; offer2Extra: string; offer2Cta: string;
  antiTitle: string; antiText: string; antiCta: string;
  stepsEyebrow: string; stepsTitle: string; steps: readonly { num: string; title: string; text: string }[];
  finalTitle: string; finalText: string; finalCta1: string; finalCta2: string;
  disclaimer: string;
  heroCard1Status: string; heroCard2Status: string;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';
  return {
    title: copy[locale].metaTitle,
    description: copy[locale].metaDesc,
  };
}

export default async function HomePage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const { dir } = getHtmlAttrs(locale);
  const t = copy[locale];

  const formHref = `/${locale}/reserver/formulaire`;
  const antiHref = `/${locale}/anti-arnaque`;

  return (
    <PageShell dir={dir} lang={locale} className="pb-0">

      {/* ── 1. HERO ── */}
      <section className="relative overflow-hidden px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
        {/* Decorative background blobs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-marhaban-mint/35 blur-[120px]" />
          <div className="absolute right-0 top-0 h-[360px] w-[360px] rounded-full bg-marhaban-gold/8 blur-[100px]" />
        </div>
        <div className="mx-auto max-w-7xl grid lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14">

          {/* Left: copy + CTAs */}
          <div>
            <p className="inline-flex rounded-full border border-marhaban-leaf/25 bg-marhaban-leaf/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-marhaban-clay">
              {t.heroEyebrow}
            </p>
            <h1 className="mt-6 max-w-4xl font-heading text-[clamp(2.8rem,7vw,6.5rem)] font-semibold leading-[0.92] tracking-tight text-marhaban-forestDark whitespace-pre-line">
              {t.heroTitle}
            </h1>
            <p className="mt-7 max-w-2xl text-[1.1rem] leading-relaxed text-marhaban-ink/80 sm:text-lg">
              {t.heroText}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <BookingModalTrigger
                locale={locale}
                href={formHref}
                className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-marhaban-forestDark px-8 py-4 text-sm font-bold text-white shadow-[0_18px_55px_rgba(8,42,36,0.22)] transition hover:bg-marhaban-clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/50 focus-visible:ring-offset-2"
              >
                {t.heroCta1}
                <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
              </BookingModalTrigger>
              <a
                href="#comment-ca-marche"
                className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-marhaban-forestDark/20 bg-white px-8 py-4 text-sm font-bold text-marhaban-forestDark transition hover:border-marhaban-forestDark/40 hover:bg-marhaban-mint/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/50 focus-visible:ring-offset-2"
              >
                {t.heroCta2}
              </a>
            </div>
          </div>

          {/* Right: offer summary card — desktop only */}
          <div className="hidden lg:block">
            <div className="rounded-[2rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">
                {t.offersEyebrow}
              </p>
              <div className="mt-4 space-y-3">
                <div className="rounded-[1.5rem] border border-marhaban-leaf/12 bg-marhaban-cream/60 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-heading text-base font-semibold text-marhaban-ink">{t.offer1Title}</p>
                    <span className="rounded-full border border-marhaban-gold/30 bg-marhaban-gold/10 px-2.5 py-1 text-xs font-bold text-marhaban-clay">
                      {t.offer1Duration}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs font-semibold leading-relaxed text-marhaban-leaf">{t.heroCard1Status}</p>
                </div>
                <div className="rounded-[1.5rem] bg-marhaban-forestDark px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-heading text-base font-semibold text-white">{t.offer2Title}</p>
                    <span className="rounded-full border border-marhaban-gold/40 bg-marhaban-gold/15 px-2.5 py-1 text-xs font-bold text-marhaban-gold">
                      {t.offer2Duration}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs font-semibold leading-relaxed text-marhaban-gold/80">{t.heroCard2Status}</p>
                </div>
              </div>
              <p className="mt-5 text-[0.7rem] leading-relaxed text-marhaban-muted">
                {t.disclaimer}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. TWO OFFER CARDS ── */}
      <Section className="py-12 sm:py-16 lg:py-20">
        <SectionHeader eyebrow={t.offersEyebrow} title={t.offersTitle} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 max-w-4xl mx-auto">

          {/* Free call card */}
          <article className="flex flex-col rounded-[2rem] border border-marhaban-leaf/15 bg-white p-7 shadow-warm-sm transition duration-200 hover:-translate-y-1 hover:border-marhaban-leaf/25 hover:shadow-warm sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex rounded-full border border-marhaban-gold/30 bg-marhaban-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-marhaban-clay">
                {t.offer1Duration}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                {t.heroCard1Status}
              </span>
            </div>
            <h3 className="mt-5 font-heading text-2xl font-semibold leading-tight text-marhaban-forestDark sm:text-3xl">
              {t.offer1Title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-marhaban-ink/75 sm:text-base">
              {t.offer1Text}
            </p>
            <p className="mt-3 text-xs font-semibold text-marhaban-clay">
              {t.offer1Extra}
            </p>
            <BookingModalTrigger
              locale={locale}
              href={formHref}
              className="mt-7 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-marhaban-forestDark px-7 text-sm font-bold text-white transition hover:bg-marhaban-clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/50 focus-visible:ring-offset-2"
            >
              {t.heroCta1}
              <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
            </BookingModalTrigger>
          </article>

          {/* Orientation call card — coming soon */}
          <article className="flex flex-col rounded-[2rem] border border-marhaban-gold/25 bg-marhaban-forestDark p-7 shadow-[0_20px_60px_rgba(8,42,36,0.22)] sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex rounded-full border border-marhaban-gold/40 bg-marhaban-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-marhaban-gold">
                {t.offer2Duration}
              </span>
              <span className="inline-flex rounded-full border border-marhaban-gold/30 bg-marhaban-gold/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-marhaban-gold">
                {t.offer2Cta}
              </span>
            </div>
            <h3 className="mt-5 font-heading text-2xl font-semibold leading-tight text-white sm:text-3xl">
              {t.offer2Title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-white/75 sm:text-base">
              {t.offer2Text}
            </p>
            <p className="mt-3 text-xs font-semibold text-marhaban-gold/80">
              {t.offer2Extra}
            </p>
            <span
              aria-disabled="true"
              role="button"
              className="mt-7 inline-flex min-h-[52px] cursor-not-allowed select-none items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-7 text-sm font-semibold text-white/45"
            >
              {t.offer2Cta}
            </span>
          </article>
        </div>
      </Section>

      {/* ── 3. ANTI-SCAM MINI ── */}
      <Section tone="muted" className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2.5rem] border border-marhaban-clay/20 bg-marhaban-cream px-8 py-10 shadow-warm-sm transition duration-200 hover:shadow-warm sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div className="flex items-start gap-4">
              <span className="mt-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-marhaban-clay/20 bg-marhaban-clay/10">
                <ShieldAlert className="h-5 w-5 text-marhaban-clay" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <h2 className="font-heading text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-marhaban-forestDark">
                  {t.antiTitle}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-marhaban-ink/75">
                  {t.antiText}
                </p>
                <Link
                  href={antiHref}
                  className="mt-7 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-marhaban-clay/30 bg-marhaban-clay/10 px-7 text-sm font-bold text-marhaban-clay transition hover:bg-marhaban-clay/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-clay/40 focus-visible:ring-offset-2"
                >
                  {t.antiCta}
                  <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 4. HOW IT WORKS ── */}
      <Section id="comment-ca-marche" tone="dark" className="py-12 sm:py-16 lg:py-20">
        <SectionHeader eyebrow={t.stepsEyebrow} title={t.stepsTitle} light />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {t.steps.map((step) => (
            <div
              key={step.num}
              className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-7 transition-all duration-200 hover:bg-white/[0.12] hover:border-white/18 sm:p-8"
            >
              <span className="font-heading text-5xl font-semibold tracking-tight text-marhaban-gold/50">
                {step.num}
              </span>
              <h3 className="mt-4 font-heading text-xl font-semibold leading-tight text-white sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 5. FINAL CTA ── */}
      <Section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-marhaban-gold/6 blur-[100px]" />
        </div>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-tight tracking-tight text-marhaban-forestDark">
            {t.finalTitle}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-marhaban-ink/75 sm:text-lg">
            {t.finalText}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <BookingModalTrigger
              locale={locale}
              href={formHref}
              className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-marhaban-forestDark px-8 py-4 text-sm font-bold text-white shadow-[0_18px_55px_rgba(8,42,36,0.22)] transition hover:bg-marhaban-clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/50 focus-visible:ring-offset-2"
            >
              {t.heroCta1}
              <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
            </BookingModalTrigger>
          </div>
          <p className="mx-auto mt-7 max-w-xl text-xs leading-relaxed text-marhaban-muted">
            {t.disclaimer}
          </p>
        </div>
      </Section>

      {/* Mobile bottom padding so sticky CTA doesn't overlap content */}
      <div className="h-20 md:hidden" aria-hidden="true" />
    </PageShell>
  );
}
