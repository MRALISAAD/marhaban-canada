import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { BookingModalTrigger } from '@/components/booking/BookingModalTrigger';
import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import { getHtmlAttrs, isLocale, type Locale } from '@/i18n/locales';
import { publicPageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

const copy = {
  fr: {
    eyebrow: 'À propos',
    title: 'Un service pratique, humain et transparent.',
    subtitle:
      'Marhaban Canada aide les nouveaux arrivants à mieux comprendre leurs premières étapes, sans jargon, sans pression et sans promesse irréaliste.',
    primary: 'Commencer',
    secondary: 'Voir les ressources',
    cardTitle: 'Comprendre avant de décider.',
    cardText: 'Notre rôle reste simple : clarifier, organiser, orienter vers les bonnes ressources.',
    badges: ['Pratique', 'Clair', 'Humain', 'Transparent'],
    missionTitle: 'Notre mission',
    missionText: 'Faire gagner du temps, réduire le stress, et aider à reconnaître les situations où il faut ralentir ou vérifier.',
    limitsTitle: 'Nos limites sont explicites',
    limits: ['Pas de conseil juridique', 'Pas de conseil en immigration', 'Pas de garantie de résultat'],
    disclaimer:
      'Marhaban Canada offre un accompagnement général et informatif. Ce service ne remplace pas un avocat, un consultant réglementé en immigration ou un organisme gouvernemental.',
    finalTitle: 'Prêt à commencer ?',
    finalSubtitle: 'Clarifie tes prochaines étapes.',
    finalText: '15 minutes pour faire le point et choisir la suite adaptée.',
    finalCta: 'Réserver un appel gratuit',
  },
  en: {
    eyebrow: 'About',
    title: 'A practical, human, and transparent service.',
    subtitle:
      'Marhaban Canada helps newcomers better understand their first steps, without jargon, without pressure, and without unrealistic promises.',
    primary: 'Get started',
    secondary: 'See resources',
    cardTitle: 'Understand before deciding.',
    cardText: 'Our role is simple: clarify, organize, and point to the right resources.',
    badges: ['Practical', 'Clear', 'Human', 'Transparent'],
    missionTitle: 'Our mission',
    missionText: 'Save time, reduce stress, and help recognize situations where you need to slow down or verify.',
    limitsTitle: 'Our limits are explicit',
    limits: ['No legal advice', 'No immigration advice', 'No guaranteed results'],
    disclaimer:
      'Marhaban Canada provides general and informational guidance. This service does not replace a lawyer, a regulated immigration consultant, or a government agency.',
    finalTitle: 'Ready to start?',
    finalSubtitle: 'Clarify your next steps.',
    finalText: '15 minutes to take stock and choose the right next step.',
    finalCta: 'Book a free call',
  },
  ar: {
    eyebrow: 'من نحن',
    title: 'خدمة عملية وإنسانية وشفافة.',
    subtitle:
      'مرحبا كندا يساعد الوافدين الجدد على فهم خطواتهم الأولى بشكل أفضل، دون مصطلحات معقدة، دون ضغط، ودون وعود غير واقعية.',
    primary: 'ابدأ',
    secondary: 'عرض الموارد',
    cardTitle: 'افهم قبل أن تقرر.',
    cardText: 'دورنا بسيط: توضيح الأمور، تنظيمها، وتوجيهك نحو الموارد الصحيحة.',
    badges: ['عملي', 'واضح', 'إنساني', 'شفاف'],
    missionTitle: 'مهمتنا',
    missionText: 'توفير الوقت، تقليل التوتر، والمساعدة في التعرف على المواقف التي تستدعي التروي أو التحقق.',
    limitsTitle: 'حدودنا واضحة',
    limits: ['لا استشارة قانونية', 'لا استشارة في الهجرة', 'لا ضمان للنتائج'],
    disclaimer:
      'مرحبا كندا يقدم إرشادات عامة ومعلوماتية. هذه الخدمة لا تحل محل محامٍ أو مستشار هجرة معتمد أو جهة حكومية.',
    finalTitle: 'مستعد للبدء؟',
    finalSubtitle: 'وضّح خطواتك القادمة.',
    finalText: '15 دقيقة لتقييم وضعك واختيار الخطوة التالية المناسبة.',
    finalCta: 'احجز مكالمة مجانية',
  },
} as const satisfies Record<Locale, {
  eyebrow: string;
  title: string;
  subtitle: string;
  primary: string;
  secondary: string;
  cardTitle: string;
  cardText: string;
  badges: readonly string[];
  missionTitle: string;
  missionText: string;
  limitsTitle: string;
  limits: readonly string[];
  disclaimer: string;
  finalTitle: string;
  finalSubtitle: string;
  finalText: string;
  finalCta: string;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';
  return publicPageMetadata({
    locale,
    path: '/a-propos',
    title: copy[locale].eyebrow,
    description: copy[locale].subtitle,
  });
}

export default async function AProposPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const { dir, lang } = getHtmlAttrs(locale);
  const t = copy[locale];

  return (
    <PageShell dir={dir} lang={lang}>
      <Section className="!py-12 sm:!py-16 lg:!py-20">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-marhaban-leaf/15 bg-marhaban-mint/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-marhaban-leaf">
              {t.eyebrow}
            </p>
            <h1 className="mt-5 max-w-3xl font-heading text-4xl font-semibold leading-[1.02] tracking-tight text-marhaban-ink sm:text-5xl lg:text-6xl">
              {t.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-marhaban-muted sm:text-lg">{t.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BookingModalTrigger
                locale={locale}
                href={`/${locale}/reserver/formulaire`}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-marhaban-forestDark px-7 py-3 text-sm font-bold text-white shadow-[0_18px_55px_rgba(8,42,36,0.22)] transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2"
              >
                {t.primary}
                <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
              </BookingModalTrigger>
              <Link
                href={`/${locale}/ressources`}
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-marhaban-leaf/15 bg-white px-7 py-3 text-sm font-bold text-marhaban-ink transition hover:bg-marhaban-mint/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-2"
              >
                {t.secondary}
              </Link>
            </div>
          </div>

          <aside className="rounded-[1.5rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm sm:p-7">
            <p className="font-heading text-2xl font-semibold leading-tight text-marhaban-forestDark">{t.cardTitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-marhaban-muted">{t.cardText}</p>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {t.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-xl border border-marhaban-leaf/15 bg-marhaban-mint/40 px-4 py-3 text-sm font-semibold text-marhaban-forestDark transition hover:bg-marhaban-mint/70"
                >
                  {badge}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </Section>

      <Section className="!bg-white !py-12 sm:!py-14 lg:!py-16">
        <div className="max-w-3xl">
          <h2 className="font-heading text-3xl font-semibold leading-tight text-marhaban-ink sm:text-4xl">{t.missionTitle}</h2>
          <p className="mt-2 font-heading text-8xl leading-none text-marhaban-gold/20 select-none" aria-hidden="true">&ldquo;</p>
          <p className="mt-1 text-lg font-medium leading-relaxed text-marhaban-ink/80 sm:text-xl">{t.missionText}</p>
        </div>
      </Section>

      <Section className="!py-12 sm:!py-14 lg:!py-16">
        <h2 className="font-heading text-3xl font-semibold leading-tight text-marhaban-ink sm:text-4xl">{t.limitsTitle}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {t.limits.map((limit) => (
            <article key={limit} className="flex items-start gap-3 rounded-[1.5rem] border border-marhaban-leaf/15 bg-white p-5 shadow-warm-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-warm">
              <span className="mt-0.5 grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-marhaban-forestDark text-marhaban-gold">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              <h3 className="font-heading text-lg font-semibold leading-tight text-marhaban-forestDark">{limit}</h3>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-[1.5rem] border border-marhaban-leaf/20 bg-marhaban-cream/60 p-5 sm:p-6">
          <p className="text-xs leading-relaxed text-marhaban-muted">{t.disclaimer}</p>
        </div>
      </Section>

      <Section tone="dark" className="!py-10 sm:!py-12 lg:!py-14">
        <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="eyebrow-light">{t.finalTitle}</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl">{t.finalSubtitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/78 sm:text-base">{t.finalText}</p>
          </div>
          <BookingModalTrigger
            locale={locale}
            href={`/${locale}/reserver/formulaire`}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-marhaban-gold px-7 py-3 text-sm font-bold text-marhaban-ink shadow-[0_18px_55px_rgba(213,168,79,0.28)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark"
          >
            {t.finalCta}
            <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
          </BookingModalTrigger>
        </div>
      </Section>
    </PageShell>
  );
}
