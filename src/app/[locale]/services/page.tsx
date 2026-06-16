import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getHtmlAttrs, isLocale, type Locale } from '@/i18n/locales';
import { bookingPath, orientationServicePath, resourcesPath } from '@/lib/routes';
import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/sections/PageHero';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { TrustNotice } from '@/components/sections/TrustNotice';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import bookingCopyData from '@/content/bookingCopy.json';
import { legalDisclaimer } from '@/content/legalDisclaimer';

type Props = { params: Promise<{ locale: string }> };

type Catalog = {
  services: {
    title: string;
    price: string;
    duration: string;
    bestFor: string;
    included: readonly string[];
    notPromised: string;
    betaLabel?: string;
  }[];
};

const copy = {
  fr: {
    title: 'Des services clairs pour avancer sans confusion.',
    subtitle: 'Choisis le bon point de départ selon ta situation, puis réserve si tu veux un accompagnement humain et structuré.',
    eyebrow: 'Services',
    primary: 'Réserver un appel',
    secondary: 'Commencer',
    introTitle: 'Le service principal reste simple',
    introText: 'L’appel orientation est le point d’entrée le plus utile pour la majorité des nouveaux arrivants.',
    servicesTitle: 'Les services disponibles',
    servicesText: 'Chaque offre est pensée pour une situation précise, avec des limites claires et un résultat concret.',
    trustTitle: 'Ce que nous promettons',
    trustText: 'De l’accompagnement pratique, des priorités claires et des repères fiables. Pas de promesse irréaliste.',
    trustBullets: ['Prendre le bon départ', 'Savoir quoi faire ensuite', 'Éviter les erreurs coûteuses'],
  },
  en: {
    title: 'Clear services to help you move forward without confusion.',
    subtitle: 'Choose the right starting point for your situation, then book if you want human, structured guidance.',
    eyebrow: 'Services',
    primary: 'Book a call',
    secondary: 'Start here',
    introTitle: 'The main service stays simple',
    introText: 'The orientation call is the most useful entry point for most newcomers.',
    servicesTitle: 'Available services',
    servicesText: 'Each offer is built for a specific situation, with clear limits and a concrete outcome.',
    trustTitle: 'What we promise',
    trustText: 'Practical guidance, clear priorities, and reliable landmarks. No unrealistic promises.',
    trustBullets: ['Start on the right foot', 'Know what to do next', 'Avoid costly mistakes'],
  },
  ar: {
    title: 'خدمات واضحة لتتقدم من دون تشوش.',
    subtitle: 'اختر نقطة البداية المناسبة لوضعك، ثم احجز إذا أردت توجيهاً إنسانياً ومنظماً.',
    eyebrow: 'الخدمات',
    primary: 'احجز مكالمة',
    secondary: 'ابدأ هنا',
    introTitle: 'الخدمة الرئيسية تبقى بسيطة',
    introText: 'مكالمة التوجيه هي نقطة الدخول الأكثر فائدة لمعظم القادمين الجدد.',
    servicesTitle: 'الخدمات المتاحة',
    servicesText: 'كل عرض مصمم لحالة محددة، مع حدود واضحة ونتيجة ملموسة.',
    trustTitle: 'ما الذي نعد به',
    trustText: 'توجيه عملي وأولويات واضحة ومعالم موثوقة. لا وعود غير واقعية.',
    trustBullets: ['البداية الصحيحة', 'معرفة الخطوة التالية', 'تجنب الأخطاء المكلفة'],
  },
} as const satisfies Record<Locale, {
  title: string;
  subtitle: string;
  eyebrow: string;
  primary: string;
  secondary: string;
  introTitle: string;
  introText: string;
  servicesTitle: string;
  servicesText: string;
  trustTitle: string;
  trustText: string;
  trustBullets: readonly string[];
}>;

const featureMap = (locale: Locale) => ({
  seeAll: locale === 'fr' ? 'Voir le service' : locale === 'en' ? 'See service' : 'عرض الخدمة',
  book: locale === 'fr' ? 'Réserver' : locale === 'en' ? 'Book' : 'احجز',
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';
  return {
    title: `${copy[locale].eyebrow} | Marhaban Canada`,
    description: copy[locale].subtitle,
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const { dir, lang } = getHtmlAttrs(locale);
  const t = copy[locale];
  const labels = featureMap(locale);
  const bookingCopy = (bookingCopyData as Record<Locale, Catalog>)[locale];
  const services = bookingCopy.services;

  return (
    <PageShell dir={dir} lang={lang}>
      <PageHero
        dark
        eyebrow={t.eyebrow}
        title={t.title}
        text={t.subtitle}
        primary={{ label: t.primary, href: bookingPath(locale) }}
        secondary={{ label: t.secondary, href: orientationServicePath(locale) }}
        pills={locale === 'fr'
          ? ['Orientation pratique', 'FR / EN / AR', 'Services clairs', 'Pas de garantie']
          : locale === 'en'
            ? ['Practical orientation', 'FR / EN / AR', 'Clear services', 'No guarantee']
            : ['توجيه عملي', 'FR / EN / AR', 'خدمات واضحة', 'لا ضمانات']}
      />

      <Section tone="muted">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">{t.introTitle}</p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-marhaban-ink">{t.introTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-marhaban-ink/72">{t.introText}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={bookingPath(locale)} className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-marhaban-forestDark px-5 py-2.5 text-sm font-bold text-white">
                {t.primary}
              </a>
              <a href={orientationServicePath(locale)} className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-marhaban-leaf/15 bg-marhaban-mint/40 px-5 py-2.5 text-sm font-bold text-marhaban-ink">
                {labels.seeAll}
              </a>
            </div>
          </div>
          <TrustNotice title={t.trustTitle} text={t.trustText} bullets={t.trustBullets} />
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow={t.servicesTitle} title={t.servicesTitle} text={t.servicesText} />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              href={bookingPath(locale)}
              cta={labels.book}
              featured={index === 1}
            />
          ))}
        </div>
      </Section>

      <Section tone="dark" className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/12 bg-white/[0.06] p-6 text-center shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-8">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            {locale === 'fr' ? 'Prêt à réserver le bon format ?' : locale === 'en' ? 'Ready to book the right format?' : 'هل أنت مستعد لحجز الصيغة المناسبة؟'}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#edf7f2]">
            {locale === 'fr'
              ? 'Commence par l’appel orientation, puis on ajuste si un autre format est plus utile.'
              : locale === 'en'
                ? 'Start with the orientation call, then adjust if another format is more useful.'
                : 'ابدأ بمكالمة التوجيه، ثم نعدل إذا كانت صيغة أخرى أكثر فائدة.'}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={bookingPath(locale)} className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-marhaban-gold px-5 py-2.5 text-sm font-bold text-marhaban-ink">
              {t.primary}
            </a>
            <a href={resourcesPath(locale)} className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/16 bg-white/[0.06] px-5 py-2.5 text-sm font-bold text-white">
              {locale === 'fr' ? 'Voir les ressources' : locale === 'en' ? 'See resources' : 'عرض الموارد'}
            </a>
          </div>
        </div>
      </Section>

      <Section tone="dark" className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/12 bg-white/[0.06] p-6 text-center shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-8">
          <p className="text-sm leading-relaxed text-[#edf7f2]">{legalDisclaimer[locale]}</p>
        </div>
      </Section>
    </PageShell>
  );
}
