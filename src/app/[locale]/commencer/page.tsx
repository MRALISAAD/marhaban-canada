import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getHtmlAttrs, isLocale, type Locale } from '@/i18n/locales';
import { bookingPath, servicesPath, orientationServicePath, antiScamServicePath, resourcesPath } from '@/lib/routes';
import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/sections/PageHero';
import { RouteCard } from '@/components/sections/RouteCard';
import { TrustNotice } from '@/components/sections/TrustNotice';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { legalDisclaimer } from '@/content/legalDisclaimer';

type Props = { params: Promise<{ locale: string }> };

const copy = {
  fr: {
    eyebrow: 'Commencer',
    title: 'Commence par ta situation, pas par tout le site.',
    text: 'Choisis ce qui te ressemble, puis on te montre la meilleure prochaine étape : service, ressource utile ou appel.',
    primary: 'Réserver un appel',
    secondary: 'Voir les services',
    pills: ['Orientation pratique', 'Services', 'Ressources', 'Anti-arnaque'],
    routeTitle: 'Choisis ton cas',
    routeText: 'Chaque carte t’amène vers le bon service, un guide utile ou un appel si la situation est plus sensible.',
    routeCta: 'Continuer',
    trustTitle: 'Ce hub sert à orienter',
    trustText:
      'Marhaban Canada n’essaie pas de tout faire sur une seule page. Ce hub sert à t’orienter vers le bon service, la bonne ressource ou la bonne conversation.',
    trustBullets: ['Préparer mon arrivée', 'Je viens d’arriver', 'Logement', 'Étudiant', 'Arnaque', 'Parler à quelqu’un'],
  },
  en: {
    eyebrow: 'Start',
    title: 'Start with your situation, not with the whole site.',
    text: 'Choose what fits you best, and we’ll point you to the next best step: roadmap, resource, or call.',
    primary: 'Book a call',
    secondary: 'See services',
    pills: ['Practical orientation', 'Services', 'Resources', 'Anti-scam'],
    routeTitle: 'Choose your case',
    routeText: 'Each card leads you to the right service, a useful guide, or a call if the situation is more sensitive.',
    routeCta: 'Continue',
    trustTitle: 'This hub is here to guide',
    trustText:
      'Marhaban Canada does not try to do everything on one page. This hub guides you to the right service, the right resource, or the right conversation.',
    trustBullets: ['Preparing arrival', 'Already arrived', 'Housing', 'Student', 'Scam concern', 'Speak to someone'],
  },
  ar: {
    eyebrow: 'ابدأ',
    title: 'ابدأ من حالتك، لا من الموقع كله.',
    text: 'اختر ما يناسبك، ثم نوجهك إلى أفضل خطوة تالية: خارطة طريق، مورد مفيد، أو مكالمة.',
    primary: 'احجز مكالمة',
    secondary: 'عرض الخدمات',
    pills: ['توجيه عملي', 'الخدمات', 'الموارد', 'مكافحة الاحتيال'],
    routeTitle: 'اختر حالتك',
    routeText: 'كل بطاقة تقودك إلى الخدمة المناسبة، أو دليل مفيد، أو مكالمة إذا كان الوضع حساساً أكثر.',
    routeCta: 'تابع',
    trustTitle: 'هذه الصفحة لتوجيهك',
    trustText:
      'مرحبا كندا لا تحاول أن تفعل كل شيء في صفحة واحدة. هذه الصفحة توجهك إلى الخدمة المناسبة أو المورد المناسب أو المحادثة المناسبة.',
    trustBullets: ['أحضّر وصولي', 'وصلت بالفعل', 'السكن', 'طالب', 'خوف من احتيال', 'التحدث مع شخص'],
  },
} as const satisfies Record<Locale, {
  eyebrow: string;
  title: string;
  text: string;
  primary: string;
  secondary: string;
  pills: readonly string[];
  routeTitle: string;
  routeText: string;
  routeCta: string;
  trustTitle: string;
  trustText: string;
  trustBullets: readonly string[];
}>;

const cases = (locale: Locale) => [
  { title: locale === 'fr' ? 'Je prépare mon arrivée' : locale === 'en' ? 'Preparing arrival' : 'أحضّر وصولي', text: locale === 'fr' ? 'Tu veux un ordre simple avant le départ.' : locale === 'en' ? 'You want a simple order before you leave.' : 'تريد ترتيباً بسيطاً قبل السفر.', href: orientationServicePath(locale), badge: locale === 'fr' ? 'Orientation' : locale === 'en' ? 'Orientation' : 'توجيه' },
  { title: locale === 'fr' ? 'Je viens d’arriver' : locale === 'en' ? 'Just arrived' : 'وصلت للتو', text: locale === 'fr' ? 'Tu as besoin de repères rapides pour la première semaine.' : locale === 'en' ? 'You need quick landmarks for the first week.' : 'تحتاج إلى نقاط سريعة للأسبوع الأول.', href: servicesPath(locale), badge: locale === 'fr' ? 'Service' : locale === 'en' ? 'Service' : 'الخدمة' },
  { title: locale === 'fr' ? 'Je cherche un logement' : locale === 'en' ? 'Looking for housing' : 'أبحث عن سكن', text: locale === 'fr' ? 'Tu veux chercher sans te faire piéger.' : locale === 'en' ? 'You want to search without getting trapped.' : 'تريد البحث من دون الوقوع في فخ.', href: resourcesPath(locale), badge: locale === 'fr' ? 'Resource' : locale === 'en' ? 'Resource' : 'مورد' },
  { title: locale === 'fr' ? 'Je suis étudiant' : locale === 'en' ? 'I am a student' : 'أنا طالب', text: locale === 'fr' ? 'Tu veux comprendre ce qui compte maintenant.' : locale === 'en' ? 'You want to understand what matters now.' : 'تريد فهم ما يهم الآن.', href: orientationServicePath(locale), badge: locale === 'fr' ? 'Call' : locale === 'en' ? 'Call' : 'مكالمة' },
  { title: locale === 'fr' ? 'J’ai peur d’une arnaque' : locale === 'en' ? 'I’m worried about a scam' : 'أخشى من احتيال', text: locale === 'fr' ? 'Tu veux vérifier avant d’envoyer de l’argent ou des documents.' : locale === 'en' ? 'You want to check before sending money or documents.' : 'تريد التحقق قبل إرسال المال أو الوثائق.', href: antiScamServicePath(locale), badge: locale === 'fr' ? 'Trust' : locale === 'en' ? 'Trust' : 'ثقة' },
  { title: locale === 'fr' ? 'Je veux parler à quelqu’un' : locale === 'en' ? 'I want to speak with someone' : 'أريد التحدث مع شخص', text: locale === 'fr' ? 'Tu préfères une lecture humaine et directe.' : locale === 'en' ? 'You prefer a human, direct read of your situation.' : 'تفضّل قراءة إنسانية ومباشرة لوضعك.', href: bookingPath(locale), badge: locale === 'fr' ? 'Call' : locale === 'en' ? 'Call' : 'مكالمة' },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';
  return { title: `${copy[locale].eyebrow} | Marhaban Canada`, description: copy[locale].text };
}

export default async function CommencerPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const { dir, lang } = getHtmlAttrs(locale);
  const t = copy[locale];
  const items = cases(locale);

  const visual = (
    <div className="grid gap-3 sm:grid-cols-2">
      {t.pills.map((pill) => (
        <div key={pill} className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm font-medium text-[#edf7f2]">
          {pill}
        </div>
      ))}
    </div>
  );

  return (
    <PageShell dir={dir} lang={lang}>
      <PageHero
        dark
        eyebrow={t.eyebrow}
        title={t.title}
        text={t.text}
        primary={{ label: t.primary, href: bookingPath(locale) }}
        secondary={{ label: t.secondary, href: servicesPath(locale) }}
        pills={t.pills}
        visual={visual}
      />

      <Section>
        <SectionHeader eyebrow={t.routeTitle} title={t.routeTitle} text={t.routeText} />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <RouteCard key={item.title} title={item.title} text={item.text} href={item.href} cta={t.routeCta} badge={item.badge} />
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <TrustNotice title={t.trustTitle} text={t.trustText} bullets={t.trustBullets} />
      </Section>

      <Section tone="dark" className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/12 bg-white/[0.06] p-6 text-center shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-8">
          <p className="text-sm leading-relaxed text-[#edf7f2]">{legalDisclaimer[locale]}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={bookingPath(locale)} className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-marhaban-gold px-5 py-2.5 text-sm font-bold text-marhaban-ink">
              {t.primary}
            </a>
            <a href={servicesPath(locale)} className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/16 bg-white/[0.06] px-5 py-2.5 text-sm font-bold text-white">
              {t.secondary}
            </a>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
