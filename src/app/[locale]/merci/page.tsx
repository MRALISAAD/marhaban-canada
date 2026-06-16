import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2, MailCheck, CalendarCheck, FileText } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import { AnimatedCTA, AnimatedCard, SectionReveal, StaggerGroup } from '@/components/animations/MarketingMotion';
import { getHtmlAttrs, isLocale, type Locale } from '@/i18n/locales';
import { bookingPath } from '@/lib/routes';

type Props = {
  params: Promise<{ locale: string }>;
};

const disclaimer = {
  fr: "Marhaban Canada offre de l'orientation pratique et de l'information générale. Nous ne fournissons pas de conseils juridiques ni de conseils en immigration. Pour les questions liées aux visas, permis, résidence permanente, admissibilité ou stratégie d'immigration, veuillez consulter un représentant autorisé.",
  en: 'Marhaban Canada offers practical orientation and general information. We do not provide legal advice or immigration advice. For questions related to visas, permits, permanent residence, admissibility, or immigration strategy, please consult an authorized representative.',
  ar: 'تقدم مرحبا كندا توجيهاً عملياً ومعلومات عامة. نحن لا نقدم نصائح قانونية ولا نصائح في الهجرة. للأسئلة المتعلقة بالتأشيرات أو التصاريح أو الإقامة الدائمة أو الأهلية أو استراتيجية الهجرة، يرجى استشارة ممثل معتمد.',
} as const;

const thankYouTexts = {
  fr: {
    eyebrow: 'Demande reçue',
    title: 'Merci. On a bien reçu ta demande.',
    subtitle: 'On la relit, on confirme le meilleur format d’appel, puis tu reçois la suite par email.',
    stepsTitle: 'Ce qui se passe ensuite',
    steps: [
      { title: 'On relit ta demande', text: 'On relit ta situation et les informations partagées pour préparer la bonne réponse.' },
      { title: 'On confirme le bon format', text: 'On vérifie si l’appel d’orientation demandé est le bon point de départ.' },
      { title: 'Tu reçois un lien de confirmation', text: 'Tu reçois un calendrier ou une confirmation avant l’appel.' },
      { title: 'Tu reçois un résumé après l’appel', text: 'Après l’échange, tu repars avec une mini-feuille de route claire.' },
    ],
    note: 'Tu recevras une confirmation avant l’appel.',
    safety: 'Ne partage pas ton NAS, tes mots de passe ou tes informations bancaires.',
    disclaimer: 'Marhaban Canada offre de l’orientation pratique, pas de conseils juridiques ou d’immigration.',
    cta: 'Retour à la réservation',
    secondary: 'Voir le parcours',
  },
  en: {
    eyebrow: 'Request received',
    title: 'Thanks. We received your request.',
    subtitle: 'We review it, confirm the best call format, then you receive the next step by email.',
    stepsTitle: 'What happens next',
    steps: [
      { title: 'We review your request', text: 'We read your situation and the information you shared to prepare the right response.' },
      { title: 'We confirm the best format', text: 'We check whether the requested orientation call is the right starting point.' },
      { title: 'You receive a confirmation link', text: 'You receive a calendar link or confirmation before the call.' },
      { title: 'You receive a summary after the call', text: 'After the conversation, you leave with a short clear roadmap.' },
    ],
    note: 'You will receive confirmation before the call.',
    safety: 'Do not share your SIN, passwords, or banking details.',
    disclaimer: 'Marhaban Canada offers practical orientation, not legal or immigration advice.',
    cta: 'Back to booking',
    secondary: 'See the path',
  },
  ar: {
    eyebrow: 'تم استلام الطلب',
    title: 'شكراً. لقد استلمنا طلبك.',
    subtitle: 'سنراجعه، ونؤكد أفضل صيغة للمكالمة، ثم تصلك الخطوة التالية عبر البريد الإلكتروني.',
    stepsTitle: 'ما يحدث بعد ذلك',
    steps: [
      { title: 'نراجع طلبك', text: 'نقرأ وضعك والمعلومات التي شاركتها لنحضّر الرد المناسب.' },
      { title: 'نؤكد الصيغة المناسبة', text: 'نتحقق مما إذا كانت مكالمة التوجيه المطلوبة هي نقطة البداية الأفضل.' },
      { title: 'تصلك رابط التأكيد', text: 'ستتلقى رابط تقويم أو تأكيداً قبل المكالمة.' },
      { title: 'تحصل على ملخص بعد المكالمة', text: 'بعد الحديث، تخرج بخارطة طريق قصيرة وواضحة.' },
    ],
    note: 'ستتلقى تأكيداً قبل المكالمة.',
    safety: 'لا تشارك رقم التأمين أو كلمات المرور أو المعلومات المصرفية.',
    disclaimer: 'مرحبا كندا تقدم توجيهاً عملياً، لا نصائح قانونية أو هجرية.',
    cta: 'العودة إلى الحجز',
    secondary: 'شاهد المسار',
  },
} as const satisfies Record<Locale, {
  eyebrow: string;
  title: string;
  subtitle: string;
  stepsTitle: string;
  steps: readonly { title: string; text: string }[];
  note: string;
  safety: string;
  disclaimer: string;
  cta: string;
  secondary: string;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';
  const t = thankYouTexts[locale];
  return { title: `${t.title} | Marhaban Canada`, description: t.subtitle };
}

export default async function MerciPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const { dir, lang } = getHtmlAttrs(locale);
  const t = thankYouTexts[locale];

  return (
    <main className="warm-page overflow-hidden" dir={dir} lang={lang}>
      <section className="marhaban-hero-shell px-4 pb-10 pt-8 text-white sm:px-6 sm:pb-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <SectionReveal className="space-y-6">
            <p className="inline-flex rounded-full border border-white/14 bg-white/[0.08] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-marhaban-gold backdrop-blur">
              {t.eyebrow}
            </p>
            <h1 className="max-w-3xl text-[clamp(2.7rem,5vw,4.9rem)] font-semibold leading-[0.96] text-white">
              {t.title}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/76 sm:text-lg">{t.subtitle}</p>
            <div className="flex flex-wrap gap-3">
              <AnimatedCTA className="inline-flex">
                <LocalizedLink href={bookingPath(locale)} className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-marhaban-gold px-6 py-3 text-sm font-bold text-marhaban-ink shadow-[0_18px_60px_rgba(213,168,79,0.24)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark">
                  {t.cta}
                  <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
                </LocalizedLink>
              </AnimatedCTA>
              <AnimatedCTA className="inline-flex">
                <LocalizedLink href="/parcours" className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-white/18 bg-white/[0.08] px-6 py-3 text-sm font-bold text-white shadow-warm-sm transition hover:bg-white/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark">
                  {t.secondary}
                </LocalizedLink>
              </AnimatedCTA>
            </div>
          </SectionReveal>

          <AnimatedCard className="rounded-[2rem] border border-white/12 bg-white/[0.06] p-5 text-white shadow-[0_28px_100px_rgba(0,0,0,0.28)] backdrop-blur-sm">
            <div className="grid gap-3">
              <div className="rounded-[1.5rem] border border-white/12 bg-white/[0.08] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-gold">{locale === 'fr' ? 'Microcopy' : locale === 'en' ? 'Microcopy' : 'نص توجيهي'}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/76">{t.note}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/76">{t.safety}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/76">{t.disclaimer}</p>
              </div>
              <div className="rounded-[1.5rem] border border-marhaban-gold/18 bg-marhaban-gold/10 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-gold">
                  {locale === 'fr' ? 'À venir' : locale === 'en' ? 'Coming next' : 'قريباً'}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-white/74">
                  <span className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-2">Tally form placeholder</span>
                  <span className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-2">Calendly / Cal.com placeholder</span>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-clay">{t.stepsTitle}</p>
          </div>
          <StaggerGroup className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {t.steps.map((step, index) => (
              <AnimatedCard key={step.title} className="rounded-3xl border border-marhaban-leaf/12 bg-white p-5 shadow-warm-sm">
                <div className="flex gap-4">
                  <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-marhaban-mint text-marhaban-leaf">
                    {index === 0 ? <MailCheck className="h-5 w-5" aria-hidden="true" /> : index === 1 ? <CalendarCheck className="h-5 w-5" aria-hidden="true" /> : index === 2 ? <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> : <FileText className="h-5 w-5" aria-hidden="true" />}
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-clay">0{index + 1}</p>
                    <h2 className="mt-1 text-lg font-semibold text-marhaban-ink">{step.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">{step.text}</p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-marhaban-leaf/12 bg-marhaban-ink p-6 text-white shadow-warm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold">{locale === 'fr' ? 'Tu peux revenir à la réservation si besoin.' : locale === 'en' ? 'You can return to booking if needed.' : 'يمكنك العودة إلى الحجز عند الحاجة.'}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{disclaimer[locale]}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <AnimatedCTA className="inline-flex">
                <LocalizedLink href={bookingPath(locale)} className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-marhaban-ink transition hover:bg-marhaban-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-ink">
                  {t.cta}
                  <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
                </LocalizedLink>
              </AnimatedCTA>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
