import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { PageHero } from '@/components/sections/PageHero';
import { getHtmlAttrs, isLocale, type Locale } from '@/i18n/locales';
import { bookingPath } from '@/lib/routes';

type Props = { params: Promise<{ locale: string }> };

const copy = {
  fr: {
    eyebrow: 'Accompagnement',
    title: 'Accompagnement pour nouveaux arrivants',
    subtitle:
      'Marhaban Canada aide à organiser les premières étapes au Canada avec un plan clair, des ressources fiables et des priorités faciles à suivre.',
    primary: 'Réserver un appel',
    servicesEyebrow: 'Services',
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
    disclaimerTitle: 'Disclaimer',
    disclaimer:
      "Marhaban Canada offre un accompagnement général et informatif. Ce service n'est pas un conseil juridique, une consultation en immigration réglementée ou une représentation auprès d'un organisme.",
    ctaTitle: 'Besoin de clarifier les prochaines étapes ?',
    ctaText: 'Réserve un appel pour faire le point et repartir avec une prochaine action claire.',
  },
  en: {
    eyebrow: 'Support',
    title: 'Support for newcomers',
    subtitle:
      'Marhaban Canada helps organize the first steps in Canada with a clear plan, reliable resources, and practical priorities.',
    primary: 'Book a call',
    servicesEyebrow: 'Services',
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
    disclaimerTitle: 'Disclaimer',
    disclaimer:
      'Marhaban Canada provides general and informational support. This service is not legal advice, regulated immigration consulting, or representation before any institution.',
    ctaTitle: 'Need to clarify the next steps?',
    ctaText: 'Book a call to review your situation and leave with one clear next action.',
  },
  ar: {
    eyebrow: 'المرافقة',
    title: 'مرافقة القادمين الجدد',
    subtitle:
      'تساعد Marhaban Canada على تنظيم الخطوات الاولى في كندا بخطة واضحة وموارد موثوقة واولويات عملية.',
    primary: 'احجز مكالمة',
    servicesEyebrow: 'الخدمات',
    servicesTitle: 'نقطة بداية واضحة للتقدم.',
    servicesText:
      'مرافقة عامة لفهم ما يجب فعله، وباي ترتيب، وما هي الموارد التي يجب التحقق منها قبل اتخاذ الخطوة التالية.',
    cards: [
      {
        title: 'تنظيم الخطوات الاولى',
        text: 'ترتيب الاولويات: رقم التأمين الاجتماعي، الصحة، البنك، الهاتف، السكن والوثائق المهمة.',
      },
      {
        title: 'التوجيه نحو الموارد المناسبة',
        text: 'تحديد الصفحات الرسمية والخدمات المحلية وجهات الاتصال المفيدة حسب وضعك.',
      },
      {
        title: 'التحضير لمكالمة او موعد',
        text: 'توضيح الاسئلة التي يجب طرحها، والوثائق المطلوبة، والنقاط التي يجب التحقق منها.',
      },
      {
        title: 'تجنب الاخطاء الشائعة',
        text: 'التعرف على الاشارات المشبوهة والرسوم غير الضرورية والوعود غير الواقعية.',
      },
    ],
    disclaimerTitle: 'إخلاء مسؤولية',
    disclaimer:
      'تقدم Marhaban Canada مرافقة عامة ومعلوماتية. هذه الخدمة ليست نصيحة قانونية او استشارة هجرة منظمة او تمثيلا امام اي مؤسسة.',
    ctaTitle: 'هل تحتاج الى توضيح الخطوات التالية؟',
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
      />

      <Section id="services">
        <SectionHeader eyebrow={t.servicesEyebrow} title={t.servicesTitle} text={t.servicesText} />

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {t.cards.map((card) => (
            <article
              key={card.title}
              className="flex h-full flex-col rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm transition hover:-translate-y-0.5 hover:shadow-warm"
            >
              <h3 className="font-heading text-2xl font-semibold leading-tight text-marhaban-forestDark">
                {card.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-marhaban-muted sm:text-base">{card.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="muted" className="pt-0">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <div className="rounded-[1.75rem] border border-marhaban-leaf/15 bg-marhaban-forestDark p-6 text-white shadow-warm sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-gold">
              {t.disclaimerTitle}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#edf7f2] sm:text-base">{t.disclaimer}</p>
          </div>

          <div className="rounded-[1.75rem] border border-marhaban-clay/20 bg-marhaban-cream p-6 shadow-warm-sm sm:p-8">
            <h2 className="font-heading text-3xl font-semibold leading-tight text-marhaban-forestDark">
              {t.ctaTitle}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-marhaban-muted sm:text-base">{t.ctaText}</p>
            <LocalizedLink
              href={bookingPath(locale)}
              className="mt-6 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-marhaban-clay px-7 py-3 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-forestDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-clay/40 focus-visible:ring-offset-2"
            >
              {t.primary}
              <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
            </LocalizedLink>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
