import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getHtmlAttrs, isLocale, type Locale } from '@/i18n/locales';
import { bookingPath, startPath } from '@/lib/routes';
import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/sections/PageHero';
import { RoadmapStage } from '@/components/sections/RoadmapStage';
import { TrustNotice } from '@/components/sections/TrustNotice';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { legalDisclaimer } from '@/content/legalDisclaimer';

type Props = { params: Promise<{ locale: string }> };

const copy = {
  fr: {
    eyebrow: 'Parcours',
    title: 'Du départ à l’installation, en 4 étapes simples.',
    text: 'Le parcours aide à comprendre ce qui vient avant l’arrivée, pendant la première semaine, le premier mois et l’installation long terme.',
    primary: 'Commencer',
    secondary: 'Réserver un appel',
    pills: ['Avant l’arrivée', 'Première semaine', 'Premier mois', 'Installation'],
    stageTitle: 'Les étapes du parcours',
    stageText: 'Chaque étape donne un ordre simple, quelques vérifications utiles et la prochaine action à garder en tête.',
    stageCta: 'Voir la ressource',
    trustTitle: 'Le parcours ne remplace pas les démarches officielles',
    trustText:
      'Marhaban Canada offre de l’accompagnement général et informatif. Nous ne fournissons pas de conseils juridiques ni de conseils en immigration.',
    trustBullets: ['Priorités simples', 'Ressources utiles', 'Erreurs à éviter'],
  },
  en: {
    eyebrow: 'Journey',
    title: 'From departure to settlement, in 4 simple stages.',
    text: 'The journey helps you understand what comes before arrival, during the first week, the first month, and long-term settlement.',
    primary: 'Start',
    secondary: 'Book a call',
    pills: ['Before arrival', 'First week', 'First month', 'Settle in'],
    stageTitle: 'Journey stages',
    stageText: 'Each stage gives you a simple order, useful checks, and the next action to keep in mind.',
    stageCta: 'View resource',
    trustTitle: 'The journey does not replace official steps',
    trustText:
      'Marhaban Canada provides general, practical guidance. We do not provide legal advice or immigration advice.',
    trustBullets: ['Simple priorities', 'Useful resources', 'Mistakes to avoid'],
  },
  ar: {
    eyebrow: 'المسار',
    title: 'من المغادرة إلى الاستقرار، عبر 4 مراحل بسيطة.',
    text: 'يساعدك المسار على فهم ما يأتي قبل الوصول، وخلال الأسبوع الأول، والشهر الأول، وعلى المدى البعيد.',
    primary: 'ابدأ',
    secondary: 'احجز مكالمة',
    pills: ['قبل الوصول', 'الأسبوع الأول', 'الشهر الأول', 'الاستقرار'],
    stageTitle: 'مراحل المسار',
    stageText: 'كل مرحلة تعطيك ترتيباً بسيطاً وفحوصات مفيدة والخطوة التالية التي يجب تذكرها.',
    stageCta: 'عرض المورد',
    trustTitle: 'المسار لا يحل محل الإجراءات الرسمية',
    trustText:
      'مرحبا كندا تقدم إرشاداً عاماً وعملياً. نحن لا نقدم نصائح قانونية ولا نصائح في الهجرة.',
    trustBullets: ['أولويات بسيطة', 'موارد مفيدة', 'أخطاء يجب تجنبها'],
  },
} as const satisfies Record<Locale, {
  eyebrow: string;
  title: string;
  text: string;
  primary: string;
  secondary: string;
  pills: readonly string[];
  stageTitle: string;
  stageText: string;
  stageCta: string;
  trustTitle: string;
  trustText: string;
  trustBullets: readonly string[];
}>;

const stages = (locale: Locale) => [
  {
    number: '01',
    title: locale === 'fr' ? 'Avant l’arrivée' : locale === 'en' ? 'Before arrival' : 'قبل الوصول',
    text: locale === 'fr' ? 'Prépare les papiers, le logement et les étapes à vérifier avant le départ.' : locale === 'en' ? 'Prepare documents, housing, and the steps to check before leaving.' : 'حضّر الوثائق والسكن والخطوات التي يجب التحقق منها قبل المغادرة.',
    bullets: [
      locale === 'fr' ? 'Documents essentiels' : locale === 'en' ? 'Essential documents' : 'الوثائق الأساسية',
      locale === 'fr' ? 'Ville cible' : locale === 'en' ? 'Target city' : 'المدينة المستهدفة',
      locale === 'fr' ? 'Premières vérifications' : locale === 'en' ? 'First checks' : 'أول التحققات',
    ],
  },
  {
    number: '02',
    title: locale === 'fr' ? 'Première semaine' : locale === 'en' ? 'First week' : 'الأسبوع الأول',
    text: locale === 'fr' ? 'Mets de l’ordre dans ce qui compte maintenant : téléphone, transport, banque, adresse.' : locale === 'en' ? 'Organize what matters now: phone, transport, banking, address.' : 'نظم ما يهم الآن: الهاتف، المواصلات، البنك، العنوان.',
    bullets: [
      locale === 'fr' ? 'Téléphone et banque' : locale === 'en' ? 'Phone and bank' : 'الهاتف والبنك',
      locale === 'fr' ? 'Adresse et transport' : locale === 'en' ? 'Address and transport' : 'العنوان والمواصلات',
      locale === 'fr' ? 'Premiers repères' : locale === 'en' ? 'First landmarks' : 'أول المعالم',
    ],
  },
  {
    number: '03',
    title: locale === 'fr' ? 'Premier mois' : locale === 'en' ? 'First month' : 'الشهر الأول',
    text: locale === 'fr' ? 'Passe de l’installation aux habitudes utiles : suivi, documents, ressources.' : locale === 'en' ? 'Move from setup to useful habits: follow-up, documents, resources.' : 'انتقل من التهيئة إلى العادات المفيدة: المتابعة، الوثائق، الموارد.',
    bullets: [
      locale === 'fr' ? 'Suivi simple' : locale === 'en' ? 'Simple follow-up' : 'متابعة بسيطة',
      locale === 'fr' ? 'Ressources locales' : locale === 'en' ? 'Local resources' : 'الموارد المحلية',
      locale === 'fr' ? 'Erreurs à éviter' : locale === 'en' ? 'Mistakes to avoid' : 'أخطاء يجب تجنبها',
    ],
  },
  {
    number: '04',
    title: locale === 'fr' ? 'Installation long terme' : locale === 'en' ? 'Long-term settlement' : 'الاستقرار طويل المدى',
    text: locale === 'fr' ? 'Construis une base simple pour vivre, travailler et vérifier les prochaines étapes.' : locale === 'en' ? 'Build a simple base for living, working, and checking next steps.' : 'ابنِ أساساً بسيطاً للعيش والعمل ومراجعة الخطوات التالية.',
    bullets: [
      locale === 'fr' ? 'Ordre durable' : locale === 'en' ? 'Durable order' : 'ترتيب دائم',
      locale === 'fr' ? 'Ressources fiables' : locale === 'en' ? 'Reliable resources' : 'موارد موثوقة',
      locale === 'fr' ? 'Lecture claire' : locale === 'en' ? 'Clear reading' : 'قراءة واضحة',
    ],
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';
  return { title: `${copy[locale].eyebrow} | Marhaban Canada`, description: copy[locale].text };
}

export default async function ParcoursPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const { dir, lang } = getHtmlAttrs(locale);
  const t = copy[locale];
  const roadmap = stages(locale);

  return (
    <PageShell dir={dir} lang={lang}>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        text={t.text}
        primary={{ label: t.primary, href: startPath(locale) }}
        secondary={{ label: t.secondary, href: bookingPath(locale) }}
        pills={t.pills}
      />

      <Section>
        <SectionHeader eyebrow={t.stageTitle} title={t.stageTitle} text={t.stageText} />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {roadmap.map((stage) => (
            <RoadmapStage key={stage.number} number={stage.number} title={stage.title} text={stage.text} bullets={stage.bullets} />
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <TrustNotice title={t.trustTitle} text={t.trustText} bullets={t.trustBullets} />
      </Section>

      <Section tone="dark" className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/12 bg-white/[0.06] p-6 text-center shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-8">
          <p className="text-sm leading-relaxed text-[#edf7f2]">{legalDisclaimer[locale]}</p>
        </div>
      </Section>
    </PageShell>
  );
}
