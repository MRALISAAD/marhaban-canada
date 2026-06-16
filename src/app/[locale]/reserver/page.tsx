import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getHtmlAttrs, isLocale, type Locale } from '@/i18n/locales';
import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { CalendlyEmbed } from '@/components/forms/CalendlyEmbed';
import { orientationServicePath } from '@/lib/routes';
import { legalDisclaimer } from '@/content/legalDisclaimer';

type Props = {
  params: Promise<{ locale: string }>;
};

const copy = {
  fr: {
    eyebrow: 'Réserver un appel',
    title: 'Choisis un moment pour parler de ta situation.',
    subtitle:
      'L’appel sert à clarifier tes prochaines étapes, organiser tes priorités et t’aider à avancer avec plus de confiance.',
    primary: 'Choisir un créneau',
    secondary: 'Voir le service principal',
    pills: ['Calendly direct', 'FR / EN / AR', 'Pas de conseil juridique', 'Confirmation par email'],
    stepsTitle: 'Comment ça se déroule',
    stepsText: 'Tu choisis le bon format, tu réserves le créneau, puis tu reçois une confirmation avant l’appel.',
    trustTitle: 'Ce que Calendly va te demander',
    trustText:
      'Nom complet, email, téléphone optionnel, ville, situation actuelle, besoin principal, langue préférée, niveau d’urgence et consentement au disclaimer.',
    trustBullets: [
      'Un seul formulaire, sans doublon',
      'Pas de paiement caché',
      'Pas de compte à créer',
    ],
    finalTitle: 'Après la réservation',
    finalText: 'Tu reçois une confirmation et tu arrives préparé au bon appel, sans friction supplémentaire.',
  },
  en: {
    eyebrow: 'Book a call',
    title: 'Choose a time to talk about your situation.',
    subtitle:
      'The call helps clarify your next steps, organize your priorities, and move forward with more confidence.',
    primary: 'Choose a slot',
    secondary: 'See services',
    pills: ['Direct Calendly', 'FR / EN / AR', 'No legal advice', 'Email confirmation'],
    stepsTitle: 'How it works',
    stepsText: 'Pick the right format, book the slot, then get a confirmation before the call.',
    trustTitle: 'What Calendly will ask you',
    trustText:
      'Full name, email, optional phone, city, current situation, main need, preferred language, urgency level, and consent to the disclaimer.',
    trustBullets: ['One form, no duplication', 'No hidden payment', 'No account to create'],
    finalTitle: 'After booking',
    finalText: 'You receive a confirmation and arrive prepared for the right call, without extra friction.',
  },
  ar: {
    eyebrow: 'احجز مكالمة',
    title: 'اختر وقتاً للحديث عن وضعك.',
    subtitle:
      'تهدف المكالمة إلى توضيح الخطوات التالية وتنظيم الأولويات ومساعدتك على التقدم بثقة أكبر.',
    primary: 'اختر موعداً',
    secondary: 'عرض الخدمات',
    pills: ['Calendly مباشر', 'FR / EN / AR', 'لا نصائح قانونية', 'تأكيد عبر البريد'],
    stepsTitle: 'كيف يتم الأمر',
    stepsText: 'اختر الصيغة المناسبة، احجز الموعد، ثم تتلقى التأكيد قبل المكالمة.',
    trustTitle: 'ما الذي سيطلبه Calendly',
    trustText:
      'الاسم الكامل، البريد الإلكتروني، الهاتف اختياري، المدينة، الوضع الحالي، الحاجة الرئيسية، اللغة المفضلة، مستوى الاستعجال، والموافقة على الإشعار.',
    trustBullets: ['نموذج واحد بلا تكرار', 'لا دفع مخفي', 'لا حاجة لإنشاء حساب'],
    finalTitle: 'بعد الحجز',
    finalText: 'تتلقى التأكيد وتصل مستعداً للمكالمة المناسبة من دون تعقيد إضافي.',
  },
} as const satisfies Record<Locale, {
  eyebrow: string;
  title: string;
  subtitle: string;
  primary: string;
  secondary: string;
  pills: readonly string[];
  stepsTitle: string;
  stepsText: string;
  trustTitle: string;
  trustText: string;
  trustBullets: readonly string[];
  finalTitle: string;
  finalText: string;
}>;

const steps = (locale: Locale) => [
  {
    number: '1',
    title: locale === 'fr' ? 'Choisis un service' : locale === 'en' ? 'Choose a service' : 'اختر خدمة',
    text:
      locale === 'fr'
        ? 'Découvre le format le plus utile selon ta situation.'
        : locale === 'en'
          ? 'Find the most useful format for your situation.'
          : 'اعرف الصيغة الأنسب لوضعك.',
  },
  {
    number: '2',
    title: locale === 'fr' ? 'Réserve directement' : locale === 'en' ? 'Book directly' : 'احجز مباشرة',
    text:
      locale === 'fr'
        ? 'Calendly collecte les informations utiles au bon moment.'
        : locale === 'en'
          ? 'Calendly collects the useful details at the right time.'
          : 'يجمع Calendly التفاصيل المفيدة في الوقت المناسب.',
  },
  {
    number: '3',
    title: locale === 'fr' ? 'Reçois la confirmation' : locale === 'en' ? 'Receive confirmation' : 'استلم التأكيد',
    text:
      locale === 'fr'
        ? 'Tu reçois un email clair avant l’appel.'
        : locale === 'en'
          ? 'You receive a clear email before the call.'
          : 'تتلقى بريداً واضحاً قبل المكالمة.',
  },
];

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
  const stepsCopy = steps(locale);

  return (
    <PageShell dir={dir} lang={lang}>
      <PageHero
        dark
        eyebrow={t.eyebrow}
        title={t.title}
        text={t.subtitle}
        primary={{ label: t.primary, href: '#calendly-booking' }}
        secondary={{ label: t.secondary, href: orientationServicePath(locale) }}
        pills={t.pills}
        visual={
          <div className="space-y-4">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-gold">
                {locale === 'fr' ? 'Ce que tu fais ici' : locale === 'en' ? 'What you do here' : 'ما الذي تفعله هنا'}
              </p>
              <div className="mt-4 space-y-3">
                {[
                  locale === 'fr' ? 'Choisis le bon format' : locale === 'en' ? 'Choose the right format' : 'اختر الصيغة المناسبة',
                  locale === 'fr' ? 'Réserve un créneau' : locale === 'en' ? 'Book a slot' : 'احجز موعداً',
                  locale === 'fr' ? 'Reçois la confirmation' : locale === 'en' ? 'Receive confirmation' : 'استلم التأكيد',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-[#edf7f2]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-4 text-sm text-[#edf7f2]">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-gold">
                  {locale === 'fr' ? 'Service' : locale === 'en' ? 'Service' : 'الخدمة'}
                </p>
                <p className="mt-2 font-semibold text-white">{locale === 'fr' ? 'Appel orientation — 30 min' : locale === 'en' ? 'Orientation call — 30 min' : 'مكالمة توجيه — 30 دقيقة'}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-4 text-sm text-[#edf7f2]">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-gold">
                  {locale === 'fr' ? 'Prix' : locale === 'en' ? 'Price' : 'السعر'}
                </p>
                <p className="mt-2 font-semibold text-white">29 $</p>
              </div>
            </div>
          </div>
        }
      />

      <Section tone="muted">
        <SectionHeader eyebrow={t.stepsTitle} title={t.stepsTitle} text={t.stepsText} />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {stepsCopy.map((step) => (
            <div key={step.number} className="rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">{step.number}</p>
              <h2 className="mt-3 text-xl font-semibold leading-tight text-marhaban-ink">{step.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-marhaban-ink/78">{step.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm sm:p-8 lg:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">
            {locale === 'fr' ? 'Disclaimer' : locale === 'en' ? 'Disclaimer' : 'إشعار'}
          </p>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-marhaban-ink/78">
            {locale === 'fr'
              ? 'Marhaban Canada offre un accompagnement pratique et informatif. Ce service ne remplace pas un avocat, un consultant réglementé, un organisme gouvernemental ou un professionnel autorisé.'
              : locale === 'en'
                ? 'Marhaban Canada provides practical and informational guidance. This service does not replace a lawyer, a regulated consultant, a government institution, or an authorized professional.'
                : 'تقدم مرحبا كندا توجيهاً عملياً وإعلامياً. لا تحل هذه الخدمة محل محامٍ أو مستشار مرخص أو مؤسسة حكومية أو محترف مخول.'}
          </p>
        </div>
      </Section>

      <Section>
        <div id="calendly-booking" className="mx-auto max-w-6xl scroll-mt-28">
          <div className="mb-6 rounded-[2rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm sm:p-8">
            <SectionHeader
              eyebrow={locale === 'fr' ? 'Réservation' : locale === 'en' ? 'Booking' : 'الحجز'}
              title={locale === 'fr' ? 'Calendly intégré, sans friction.' : locale === 'en' ? 'Calendly integrated, without friction.' : 'Calendly مدمج من دون تعقيد.'}
              text={
                locale === 'fr'
                  ? 'Choisis le bon créneau, puis laisse Calendly prendre le relais. Le cadre reste simple, humain et lisible.'
                  : locale === 'en'
                    ? 'Choose the right slot, then let Calendly take over. The flow stays simple, human, and readable.'
                    : 'اختر الموعد المناسب، ثم دع Calendly يتولى الباقي. يبقى المسار بسيطاً وإنسانياً وواضحاً.'
              }
            />
          </div>
          <CalendlyEmbed
            locale={locale}
            title={locale === 'fr' ? 'Choisis un service et réserve ton appel.' : locale === 'en' ? 'Choose a service and book your call.' : 'اختر خدمة واحجز مكالمتك.'}
            text={
              locale === 'fr'
                ? 'L’embed Calendly ci-dessous te permet de réserver directement l’appel le plus utile selon ton besoin.'
                : locale === 'en'
                  ? 'The Calendly embed below lets you book the most useful call directly based on your need.'
                  : 'تتيح لك أداة Calendly أدناه حجز المكالمة الأنسب مباشرة حسب احتياجك.'
            }
            disclaimer={legalDisclaimer[locale]}
            trustText={
              locale === 'fr'
                ? 'Tu n’as rien de plus à remplir ailleurs. Calendly collecte le nécessaire, puis tu reçois la confirmation.'
                : locale === 'en'
                  ? 'You do not need to fill anything elsewhere. Calendly collects the necessary details, then you receive confirmation.'
                  : 'لن تحتاج إلى ملء أي شيء في مكان آخر. يجمع Calendly التفاصيل اللازمة ثم تتلقى التأكيد.'
            }
          />
        </div>
      </Section>

      <Section tone="dark" className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 text-center shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-8">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">{t.finalTitle}</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#edf7f2]">{t.finalText}</p>
        </div>
      </Section>
    </PageShell>
  );
}
