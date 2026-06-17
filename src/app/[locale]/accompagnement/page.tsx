import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { PageHero } from '@/components/sections/PageHero';
import { getHtmlAttrs, isLocale, type Locale } from '@/i18n/locales';
import { antiScamServicePath, bookingPath, resourcesPath } from '@/lib/routes';
import { legalDisclaimer } from '@/content/legalDisclaimer';

type Props = { params: Promise<{ locale: string }> };

const copy = {
  fr: {
    eyebrow: 'Accompagnement',
    title: 'Des premières étapes claires, sans jargon ni pression.',
    subtitle:
      "Marhaban Canada t'aide à organiser les premières démarches au Canada avec un plan pratique, des ressources fiables et des priorités faciles à suivre.",
    primary: 'Réserver un appel',
    secondary: 'Voir les ressources',
    pills: ['Pratique', 'Informatif', 'Sans pression', 'Humain'] as readonly string[],
    servicesEyebrow: 'Ce qu\'on couvre',
    servicesTitle: 'Un point de départ clair pour avancer.',
    servicesText:
      "Un accompagnement général pour comprendre quoi faire, dans quel ordre, et quelles ressources vérifier avant d'agir.",
    cards: [
      {
        title: 'Plan des premières démarches',
        text: 'Classer les priorités : NAS, santé, banque, téléphone, logement et documents importants.',
      },
      {
        title: 'Orientation vers les bonnes ressources',
        text: 'Identifier les pages officielles, services locaux et contacts utiles selon ta situation.',
      },
      {
        title: "Préparation d'un appel ou rendez-vous",
        text: 'Clarifier les questions à poser, les documents à rassembler et les points à vérifier.',
      },
      {
        title: 'Prévention des erreurs courantes',
        text: 'Repérer les signaux suspects, les frais inutiles et les promesses trop belles pour être vraies.',
      },
    ],
    disclaimerEyebrow: 'Ce qu\'on ne remplace pas',
    disclaimer:
      "Marhaban Canada offre un accompagnement général et informatif. Ce service n'est pas un conseil juridique, une consultation en immigration réglementée ou une représentation auprès d'un organisme.",
    ctaEyebrow: 'Prêt à commencer ?',
    ctaTitle: 'Clarifie tes prochaines étapes avec un appel.',
    ctaText: 'Réserve un appel pour faire le point et repartir avec une prochaine action claire.',
  },
  en: {
    eyebrow: 'Support',
    title: 'Clear first steps. No jargon, no pressure.',
    subtitle:
      'Marhaban Canada helps you organize the first steps in Canada with a practical plan, reliable resources, and priorities that are easy to follow.',
    primary: 'Book a call',
    secondary: 'See resources',
    pills: ['Practical', 'Informational', 'No pressure', 'Human'] as readonly string[],
    servicesEyebrow: 'What we cover',
    servicesTitle: 'A clear starting point to move forward.',
    servicesText:
      'General support to understand what to do, in what order, and which resources to verify before taking action.',
    cards: [
      {
        title: 'First-step planning',
        text: 'Organize priorities: SIN, health care, banking, phone, housing, and important documents.',
      },
      {
        title: 'Resource orientation',
        text: 'Find official pages, local services, and useful contacts based on your situation.',
      },
      {
        title: 'Call or appointment preparation',
        text: 'Clarify questions to ask, documents to gather, and details to verify.',
      },
      {
        title: 'Common mistake prevention',
        text: 'Spot suspicious signs, unnecessary fees, and promises that sound too good to be true.',
      },
    ],
    disclaimerEyebrow: 'What we do not replace',
    disclaimer:
      'Marhaban Canada provides general and informational support. This service is not legal advice, regulated immigration consulting, or representation before any institution.',
    ctaEyebrow: 'Ready to start?',
    ctaTitle: 'Clarify your next steps with a call.',
    ctaText: 'Book a call to review your situation and leave with one clear next action.',
  },
  ar: {
    eyebrow: 'المرافقة',
    title: 'خطوات أولى واضحة، بدون مصطلحات ولا ضغط.',
    subtitle:
      'تساعدك Marhaban Canada على تنظيم الخطوات الأولى في كندا بخطة عملية وموارد موثوقة وأولويات سهلة المتابعة.',
    primary: 'احجز مكالمة',
    secondary: 'عرض الموارد',
    pills: ['عملي', 'معلوماتي', 'بدون ضغط', 'إنساني'] as readonly string[],
    servicesEyebrow: 'ما نغطيه',
    servicesTitle: 'نقطة بداية واضحة للتقدم.',
    servicesText:
      'مرافقة عامة لفهم ما يجب فعله، وبأي ترتيب، وما هي الموارد التي يجب التحقق منها قبل اتخاذ الخطوة التالية.',
    cards: [
      {
        title: 'تنظيم الخطوات الأولى',
        text: 'ترتيب الأولويات: رقم التأمين الاجتماعي، الصحة، البنك، الهاتف، السكن والوثائق المهمة.',
      },
      {
        title: 'التوجيه نحو الموارد المناسبة',
        text: 'تحديد الصفحات الرسمية والخدمات المحلية وجهات الاتصال المفيدة حسب وضعك.',
      },
      {
        title: 'التحضير لمكالمة أو موعد',
        text: 'توضيح الأسئلة التي يجب طرحها، والوثائق المطلوبة، والنقاط التي يجب التحقق منها.',
      },
      {
        title: 'تجنب الأخطاء الشائعة',
        text: 'التعرف على الإشارات المشبوهة والرسوم غير الضرورية والوعود غير الواقعية.',
      },
    ],
    disclaimerEyebrow: 'ما لا نحل محله',
    disclaimer:
      'تقدم Marhaban Canada مرافقة عامة ومعلوماتية. هذه الخدمة ليست نصيحة قانونية أو استشارة هجرة منظمة أو تمثيلاً أمام أي مؤسسة.',
    ctaEyebrow: 'هل أنت مستعد للبدء؟',
    ctaTitle: 'وضّح خطواتك التالية مع مكالمة.',
    ctaText: 'احجز مكالمة لمراجعة وضعك والخروج بخطوة تالية واضحة.',
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';
  const t = copy[locale];
  return {
    title: `${t.title} | Marhaban Canada`,
    description: t.subtitle,
  };
}

export default async function AccompagnementPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const { dir, lang } = getHtmlAttrs(locale);
  const t = copy[locale];

  return (
    <PageShell dir={dir} lang={lang}>
      <PageHero
        dark
        eyebrow={t.eyebrow}
        title={t.title}
        text={t.subtitle}
        primary={{ label: t.primary, href: bookingPath(locale) }}
        secondary={{ label: t.secondary, href: resourcesPath(locale) }}
        pills={t.pills}
      />

      {/* ── Services / what we cover ── */}
      <Section id="services">
        <SectionHeader eyebrow={t.servicesEyebrow} title={t.servicesTitle} text={t.servicesText} />
        <div className="mt-9 rounded-[2rem] border border-marhaban-leaf/15 bg-white p-5 shadow-warm sm:rounded-[2.5rem] sm:p-6 lg:p-8">
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-9">
            <div className="rounded-[1.75rem] border border-marhaban-clay/15 bg-marhaban-mint/25 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">
                {locale === 'fr' ? 'Méthode simple' : locale === 'en' ? 'Simple method' : 'طريقة بسيطة'}
              </p>
              <h3 className="mt-3 font-heading text-2xl font-semibold leading-tight text-marhaban-ink">
                {locale === 'fr'
                  ? 'On trie, on vérifie, puis on avance.'
                  : locale === 'en'
                    ? 'We sort, verify, then move forward.'
                    : 'نرتب، نتحقق، ثم نتقدم.'}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-marhaban-muted">
                {locale === 'fr'
                  ? "Le but n'est pas de tout faire à ta place, mais de rendre les prochaines étapes plus lisibles."
                  : locale === 'en'
                    ? 'The goal is not to do everything for you, but to make the next steps easier to read.'
                    : 'الهدف ليس القيام بكل شيء بدلاً عنك، بل جعل الخطوات التالية أوضح.'}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {t.cards.map((card, index) => (
                <article
                  key={card.title}
                  className="flex h-full gap-3 rounded-[1.35rem] border border-marhaban-leaf/12 bg-marhaban-cream/60 p-4 transition duration-200 hover:border-marhaban-clay/25 hover:bg-marhaban-mint/35"
                >
                  <p className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-marhaban-clay/25 bg-white text-xs font-bold text-marhaban-clay">
                    0{index + 1}
                  </p>
                  <div>
                    <h3 className="font-heading text-lg font-semibold leading-tight text-marhaban-forestDark">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-marhaban-muted">
                      {card.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── Ce qu'on ne remplace pas ── */}
      <Section tone="muted">
        <div className="rounded-[1.75rem] border border-white/12 bg-marhaban-forestDark p-7 text-white shadow-warm sm:p-8 lg:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-gold">
            {t.disclaimerEyebrow}
          </p>
          <p className="mt-4 max-w-3xl text-[1.05rem] leading-relaxed text-[#edf7f2] sm:text-lg">
            {t.disclaimer}
          </p>
        </div>
      </Section>

      {/* ── Final CTA — split dark ── */}
      <Section tone="dark" className="py-14 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow-light">{t.ctaEyebrow}</p>
            <h2 className="heading-section mt-3 !text-white">{t.ctaTitle}</h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-[#edf7f2]">{t.ctaText}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <LocalizedLink
                href={bookingPath(locale)}
                className="flex-1 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-marhaban-gold px-8 py-4 text-sm font-bold text-marhaban-ink shadow-[0_18px_60px_rgba(213,168,79,0.30)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark"
              >
                {t.primary}
                <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
              </LocalizedLink>
              <LocalizedLink
                href={antiScamServicePath(locale)}
                className="flex-1 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-white/16 bg-white/[0.06] px-8 py-4 text-sm font-bold text-white transition hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark"
              >
                {locale === 'fr' ? 'Vérifier les signaux' : locale === 'en' ? 'Check the signals' : 'تحقق من الإشارات'}
              </LocalizedLink>
            </div>
            <p className="text-xs leading-relaxed text-white/55">{legalDisclaimer[locale]}</p>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
