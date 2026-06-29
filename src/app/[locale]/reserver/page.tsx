import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, Clock3, MailCheck, ShieldCheck } from 'lucide-react';
import { getHtmlAttrs, isLocale, type Locale } from '@/i18n/locales';
import { BookingModalTrigger } from '@/components/booking/BookingModalTrigger';
import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import { publicPageMetadata } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

const copy = {
  fr: {
    metaTitle: 'Réservez votre appel gratuit',
    metaDescription:
      'Réservez un appel gratuit de 15 minutes avec Marhaban Canada pour clarifier votre prochaine étape.',
    unavailable: 'Le lien de réservation sera bientôt disponible.',
    eyebrow: 'Réservation',
    title: 'Réservez votre appel gratuit.',
    subtitle:
      'Un appel de 15 minutes pour comprendre ta situation, clarifier ta prochaine étape et voir comment Marhaban Canada peut t’aider.',
    primary: 'Réserver un appel gratuit',
    afterBookingNote: 'Après l’envoi, on te contactera pour confirmer un créneau.',
    secondaryNote: 'Sans frais · Sans engagement · Réponse par email',
    heroCardTitle: 'Appel gratuit — 15 min',
    heroBullets: [
      'Comprendre ta situation',
      'Identifier la bonne prochaine étape',
      'Répondre à tes premières questions',
      'T’orienter vers les bonnes ressources',
    ],
    offersTitle: 'Choisis le bon point de départ',
    offersText: 'Commence par l’appel gratuit. L’appel orientation 45 min arrive ensuite comme offre premium.',
    freeOffer: {
      title: 'Appel gratuit',
      duration: '15 min',
      status: 'Disponible maintenant',
      price: 'Gratuit',
      description: 'Un premier appel simple pour comprendre ta situation et savoir quoi faire ensuite.',
      cta: 'Réserver un appel gratuit',
    },
    orientationOffer: {
      title: 'Appel orientation',
      duration: '45 min',
      status: 'Bientôt disponible',
      price: 'À venir',
      description:
        'Un appel plus complet pour clarifier tes démarches, tes priorités et repartir avec un plan simple.',
      supportText:
        'L’appel orientation 45 min arrive bientôt. Pour l’instant, commence par l’appel gratuit.',
      cta: 'Bientôt disponible',
    },
    howTitle: 'Comment ça marche',
    steps: [
      {
        title: 'Choisis l’appel gratuit',
        text: 'Remplis le court formulaire pour préparer l’appel.',
      },
      {
        title: 'Explique ta situation',
        text: 'Tu peux parler de ton arrivée, tes démarches, tes doutes ou une situation à vérifier.',
      },
      {
        title: 'Repars avec une prochaine étape',
        text: 'On t’aide à savoir quoi faire maintenant, sans confusion.',
      },
    ],
    prepareTitle: 'Avant l’appel, prépare simplement :',
    prepareItems: [
      'Ta situation actuelle au Canada',
      'Les démarches qui te bloquent',
      'Les questions que tu veux poser',
      'Les documents ou messages que tu veux mieux comprendre',
      'Toute situation qui te semble douteuse',
    ],
    trustTitle: 'Ce que Marhaban Canada fait — et ne fait pas',
    helpsTitle: 'On t’aide à comprendre, organiser et prioriser.',
    helps: [
      'Informations pratiques',
      'Ressources utiles',
      'Questions à poser',
      'Signaux d’alerte',
      'Prochaine étape claire',
    ],
    limitsTitle: 'Nos limites sont claires.',
    limits: [
      'Pas de conseil juridique',
      'Pas de conseil en immigration',
      'Pas de garantie de résultat',
      'Pas de remplacement d’un organisme officiel',
    ],
    disclaimer:
      'Marhaban Canada offre un accompagnement général et informatif. Ce service ne remplace pas un avocat, un consultant réglementé en immigration ou un organisme gouvernemental.',
    finalTitle: 'Commence par un appel gratuit.',
    finalText:
      'Tu n’as pas besoin de tout comprendre seul. Réserve un court appel pour clarifier ta prochaine étape.',
    finalNote: '15 min · Gratuit · Sans engagement',
  },
  en: {
    metaTitle: 'Book your free call',
    metaDescription:
      'Book a free 15-minute call with Marhaban Canada to clarify your next step.',
    unavailable: 'The booking link will be available soon.',
    eyebrow: 'Booking',
    title: 'Book your free call.',
    subtitle:
      'A 15-minute call to understand your situation, clarify your next step, and see how Marhaban Canada can help.',
    primary: 'Book a free call',
    afterBookingNote: 'After submission, we’ll contact you to confirm a time.',
    secondaryNote: 'No fee · No commitment · Email reply',
    heroCardTitle: 'Free call — 15 min',
    heroBullets: [
      'Understand your situation',
      'Identify the right next step',
      'Answer your first questions',
      'Point you to the right resources',
    ],
    offersTitle: 'Choose the right starting point',
    offersText: 'Start with the free call. The 45-minute orientation call will follow as a premium offer.',
    freeOffer: {
      title: 'Free call',
      duration: '15 min',
      status: 'Available now',
      price: 'Free',
      description: 'A simple first call to understand your situation and know what to do next.',
      cta: 'Book a free call',
    },
    orientationOffer: {
      title: 'Orientation call',
      duration: '45 min',
      status: 'Coming soon',
      price: 'To come',
      description:
        'A more complete call to clarify your steps, priorities, and leave with a simple plan.',
      supportText:
        'The 45-minute orientation call is coming soon. For now, start with the free call.',
      cta: 'Coming soon',
    },
    howTitle: 'How it works',
    steps: [
      {
        title: 'Choose the free call',
        text: 'Fill out the short form to prepare the call.',
      },
      {
        title: 'Explain your situation',
        text: 'You can talk about your arrival, paperwork, doubts, or a situation to verify.',
      },
      {
        title: 'Leave with a next step',
        text: 'We help you understand what to do now, without confusion.',
      },
    ],
    prepareTitle: 'Before the call, simply prepare:',
    prepareItems: [
      'Your current situation in Canada',
      'The steps that are blocking you',
      'The questions you want to ask',
      'Documents or messages you want to understand better',
      'Any situation that feels suspicious',
    ],
    trustTitle: 'What Marhaban Canada does — and does not do',
    helpsTitle: 'We help you understand, organize, and prioritize.',
    helps: [
      'Practical information',
      'Useful resources',
      'Questions to ask',
      'Warning signs',
      'A clear next step',
    ],
    limitsTitle: 'Our limits are clear.',
    limits: [
      'No legal advice',
      'No immigration advice',
      'No guarantee of results',
      'No replacement for an official organization',
    ],
    disclaimer:
      'Marhaban Canada provides general and informational guidance. This service does not replace a lawyer, a regulated immigration consultant, or a government agency.',
    finalTitle: 'Start with a free call.',
    finalText:
      'You do not need to understand everything alone. Book a short call to clarify your next step.',
    finalNote: '15 min · Free · No commitment',
  },
  ar: {
    metaTitle: 'احجز مكالمتك المجانية',
    metaDescription:
      'احجز مكالمة مجانية لمدة 15 دقيقة مع مرحبا كندا لتوضيح خطوتك التالية.',
    unavailable: 'سيكون رابط الحجز متاحاً قريباً.',
    eyebrow: 'الحجز',
    title: 'احجز مكالمتك المجانية.',
    subtitle:
      'مكالمة لمدة 15 دقيقة لفهم وضعك، توضيح خطوتك التالية، ومعرفة كيف يمكن لمرحبا كندا مساعدتك.',
    primary: 'احجز مكالمة مجانية',
    afterBookingNote: 'بعد الإرسال، سنتواصل معك لتأكيد موعد.',
    secondaryNote: 'بدون رسوم · بدون التزام · رد عبر البريد',
    heroCardTitle: 'مكالمة مجانية — 15 دقيقة',
    heroBullets: [
      'فهم وضعك',
      'تحديد الخطوة التالية المناسبة',
      'الإجابة عن أسئلتك الأولى',
      'توجيهك نحو الموارد المناسبة',
    ],
    offersTitle: 'اختر نقطة البداية المناسبة',
    offersText: 'ابدأ بالمكالمة المجانية. مكالمة التوجيه 45 دقيقة ستتوفر لاحقاً كعرض مميز.',
    freeOffer: {
      title: 'مكالمة مجانية',
      duration: '15 دقيقة',
      status: 'متاحة الآن',
      price: 'مجانية',
      description: 'مكالمة أولى بسيطة لفهم وضعك ومعرفة ما يجب فعله بعد ذلك.',
      cta: 'احجز مكالمة مجانية',
    },
    orientationOffer: {
      title: 'مكالمة توجيه',
      duration: '45 دقيقة',
      status: 'قريباً',
      price: 'لاحقاً',
      description:
        'مكالمة أكثر تفصيلاً لتوضيح إجراءاتك وأولوياتك والخروج بخطة بسيطة.',
      supportText:
        'مكالمة التوجيه 45 دقيقة قادمة قريباً. في الوقت الحالي، ابدأ بالمكالمة المجانية.',
      cta: 'قريباً',
    },
    howTitle: 'كيف يتم الأمر',
    steps: [
      {
        title: 'اختر المكالمة المجانية',
        text: 'املأ النموذج القصير لتحضير المكالمة.',
      },
      {
        title: 'اشرح وضعك',
        text: 'يمكنك الحديث عن وصولك، إجراءاتك، شكوكك، أو وضع يحتاج إلى التحقق.',
      },
      {
        title: 'اخرج بخطوة تالية',
        text: 'نساعدك على معرفة ما يجب فعله الآن، بدون ارتباك.',
      },
    ],
    prepareTitle: 'قبل المكالمة، حضّر ببساطة:',
    prepareItems: [
      'وضعك الحالي في كندا',
      'الإجراءات التي تعيقك',
      'الأسئلة التي تريد طرحها',
      'الوثائق أو الرسائل التي تريد فهمها بشكل أفضل',
      'أي وضع يبدو لك مشكوكاً فيه',
    ],
    trustTitle: 'ما الذي تفعله مرحبا كندا — وما الذي لا تفعله',
    helpsTitle: 'نساعدك على الفهم والتنظيم وتحديد الأولويات.',
    helps: [
      'معلومات عملية',
      'موارد مفيدة',
      'أسئلة يمكن طرحها',
      'إشارات تحذيرية',
      'خطوة تالية واضحة',
    ],
    limitsTitle: 'حدودنا واضحة.',
    limits: [
      'لا نصائح قانونية',
      'لا نصائح هجرة',
      'لا ضمان للنتائج',
      'لا نحل محل جهة رسمية',
    ],
    disclaimer:
      'تقدم مرحبا كندا إرشادات عامة ومعلوماتية. لا تحل هذه الخدمة محل محامٍ أو مستشار هجرة معتمد أو جهة حكومية.',
    finalTitle: 'ابدأ بمكالمة مجانية.',
    finalText:
      'لست بحاجة إلى فهم كل شيء وحدك. احجز مكالمة قصيرة لتوضيح خطوتك التالية.',
    finalNote: '15 دقيقة · مجانية · بدون التزام',
  },
} as const satisfies Record<Locale, {
  metaTitle: string;
  metaDescription: string;
  unavailable: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  primary: string;
  afterBookingNote: string;
  secondaryNote: string;
  heroCardTitle: string;
  heroBullets: readonly string[];
  offersTitle: string;
  offersText: string;
  freeOffer: OfferCopy;
  orientationOffer: OfferCopy & { supportText: string };
  howTitle: string;
  steps: readonly { title: string; text: string }[];
  prepareTitle: string;
  prepareItems: readonly string[];
  trustTitle: string;
  helpsTitle: string;
  helps: readonly string[];
  limitsTitle: string;
  limits: readonly string[];
  disclaimer: string;
  finalTitle: string;
  finalText: string;
  finalNote: string;
}>;

type OfferCopy = {
  title: string;
  duration: string;
  status: string;
  price: string;
  description: string;
  cta: string;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';
  return publicPageMetadata({
    locale,
    path: '/reserver',
    title: copy[locale].metaTitle,
    description: copy[locale].metaDescription,
  });
}

function BookingLink({
  href,
  label,
  locale,
}: {
  href: string;
  label: string;
  locale: Locale;
}) {
  return (
    <BookingModalTrigger
      locale={locale}
      href={href}
      className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-marhaban-gold px-7 py-3.5 text-sm font-bold text-marhaban-ink shadow-[0_18px_55px_rgba(213,168,79,0.26)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/60 focus-visible:ring-offset-2"
    >
      {label}
      <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
    </BookingModalTrigger>
  );
}

function FreeBookingAction({ locale, label }: { locale: Locale; label: string }) {
  return <BookingLink href={`/${locale}/reserver/formulaire`} label={label} locale={locale} />;
}

function CheckList({ items, muted = false }: { items: readonly string[]; muted?: boolean }) {
  return (
    <ul className="space-y-3" role="list">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
          <Check
            className={`mt-0.5 h-4 w-4 flex-shrink-0 ${muted ? 'text-marhaban-muted' : 'text-marhaban-leaf'}`}
            aria-hidden="true"
          />
          <span className={muted ? 'text-marhaban-ink/68' : 'text-marhaban-ink/82'}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ReserverPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const { dir, lang } = getHtmlAttrs(locale);
  const t = copy[locale];

  return (
    <PageShell dir={dir} lang={lang} className="pb-0">
      <section className="px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pt-12">
        <div className="mx-auto grid max-w-7xl gap-7 rounded-[2rem] border border-white/10 bg-marhaban-forestDark px-5 py-7 text-white shadow-[0_28px_90px_rgba(8,42,36,0.24)] sm:px-7 sm:py-9 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-10 lg:px-12 lg:py-12">
          <div>
            <p className="inline-flex rounded-full border border-white/12 bg-white/[0.08] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-marhaban-gold">
              {t.eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl font-heading text-[clamp(2.75rem,6vw,6rem)] font-semibold leading-[0.92] tracking-tight text-white">
              {t.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#edf7f2] sm:text-lg lg:text-xl">
              {t.subtitle}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <FreeBookingAction locale={locale} label={t.primary} />
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/58">
                {t.secondaryNote}
              </p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/68">{t.afterBookingNote}</p>
          </div>

          <aside className="rounded-[1.75rem] border border-white/12 bg-white/[0.08] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-gold">
                  {t.freeOffer.status}
                </p>
                <h2 className="mt-3 font-heading text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  {t.heroCardTitle}
                </h2>
              </div>
              <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-marhaban-gold/30 bg-marhaban-gold/12">
                <Clock3 className="h-5 w-5 text-marhaban-gold" aria-hidden="true" />
              </span>
            </div>
            <ul className="mt-6 space-y-3" role="list">
              {t.heroBullets.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[#edf7f2]">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-marhaban-gold" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <FreeBookingAction locale={locale} label={t.primary} />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-white/62">{t.afterBookingNote}</p>
          </aside>
        </div>
      </section>

      <Section className="!py-12 sm:!py-14 lg:!py-16">
        <div className="max-w-3xl">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight text-marhaban-ink sm:text-4xl">
            {t.offersTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-marhaban-ink/75 sm:text-base">
            {t.offersText}
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="flex flex-col rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm transition duration-200 hover:-translate-y-0.5 hover:border-marhaban-leaf/30 hover:shadow-warm sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-heading text-2xl font-semibold leading-tight text-marhaban-ink">
                  {t.freeOffer.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-marhaban-muted">{t.freeOffer.duration}</p>
              </div>
              <span className="rounded-full border border-marhaban-leaf/20 bg-marhaban-mint/70 px-3 py-1 text-xs font-bold text-marhaban-leaf">
                {t.freeOffer.status}
              </span>
            </div>
            <p className="mt-6 font-heading text-4xl font-semibold text-marhaban-forestDark">
              {t.freeOffer.price}
            </p>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-marhaban-ink/75">
              {t.freeOffer.description}
            </p>
            <div className="mt-7">
              <FreeBookingAction locale={locale} label={t.freeOffer.cta} />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-marhaban-muted">{t.afterBookingNote}</p>
          </article>

          <article className="flex flex-col rounded-[1.75rem] border border-marhaban-leaf/12 bg-marhaban-cream/70 p-6 shadow-warm-xs sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-heading text-2xl font-semibold leading-tight text-marhaban-ink">
                  {t.orientationOffer.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-marhaban-muted">
                  {t.orientationOffer.duration}
                </p>
              </div>
              <span className="rounded-full border border-marhaban-gold/35 bg-marhaban-gold/10 px-3 py-1 text-xs font-bold text-marhaban-clay">
                {t.orientationOffer.status}
              </span>
            </div>
            <p className="mt-6 font-heading text-4xl font-semibold text-marhaban-muted">
              {t.orientationOffer.price}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-marhaban-ink/72">
              {t.orientationOffer.description}
            </p>
            <p className="mt-4 flex-1 rounded-2xl border border-marhaban-leaf/12 bg-white/70 px-4 py-3 text-xs font-semibold leading-relaxed text-marhaban-muted">
              {t.orientationOffer.supportText}
            </p>
            <button
              type="button"
              disabled
              className="mt-7 inline-flex min-h-[56px] cursor-not-allowed items-center justify-center rounded-full border border-marhaban-leaf/12 bg-white/60 px-7 py-3.5 text-sm font-bold text-marhaban-muted opacity-75"
            >
              {t.orientationOffer.cta}
            </button>
          </article>
        </div>
      </Section>

      <Section tone="muted" className="!py-12 sm:!py-14 lg:!py-16">
        <h2 className="font-heading text-3xl font-semibold leading-tight text-marhaban-ink sm:text-4xl">
          {t.howTitle}
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {t.steps.map((step, index) => (
            <article key={step.title} className="rounded-[1.5rem] border border-marhaban-leaf/15 bg-white p-5 shadow-warm-sm sm:p-6">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-marhaban-forestDark font-heading text-sm font-semibold text-white">
                {index + 1}
              </span>
              <h3 className="mt-5 font-heading text-xl font-semibold leading-tight text-marhaban-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-marhaban-ink/75">{step.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="!py-12 sm:!py-14 lg:!py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="eyebrow">{t.eyebrow}</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight text-marhaban-ink sm:text-4xl">
              {t.prepareTitle}
            </h2>
          </div>
          <div className="rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm sm:p-7">
            <CheckList items={t.prepareItems} />
          </div>
        </div>
      </Section>

      <Section tone="muted" className="!py-12 sm:!py-14 lg:!py-16">
        <div className="max-w-3xl">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight text-marhaban-ink sm:text-4xl">
            {t.trustTitle}
          </h2>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm sm:p-7">
            <ShieldCheck className="h-8 w-8 text-marhaban-leaf" aria-hidden="true" />
            <h3 className="mt-4 font-heading text-2xl font-semibold leading-tight text-marhaban-ink">
              {t.helpsTitle}
            </h3>
            <div className="mt-5">
              <CheckList items={t.helps} />
            </div>
          </article>
          <article className="rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm sm:p-7">
            <MailCheck className="h-8 w-8 text-marhaban-clay" aria-hidden="true" />
            <h3 className="mt-4 font-heading text-2xl font-semibold leading-tight text-marhaban-ink">
              {t.limitsTitle}
            </h3>
            <div className="mt-5">
              <CheckList items={t.limits} muted />
            </div>
          </article>
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-marhaban-muted">
          {t.disclaimer}
        </p>
      </Section>

      <Section tone="dark" className="!py-12 sm:!py-14 lg:!py-16" data-floating-book-call-hide>
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              {t.finalTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
              {t.finalText}
            </p>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-marhaban-gold">
              {t.finalNote}
            </p>
          </div>
          <FreeBookingAction locale={locale} label={t.primary} />
        </div>
      </Section>
    </PageShell>
  );
}
