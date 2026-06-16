import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getHtmlAttrs, isLocale, type Locale } from '@/i18n/locales';
import { bookingPath, startPath } from '@/lib/routes';
import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/sections/PageHero';
import { TrustNotice } from '@/components/sections/TrustNotice';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { legalDisclaimer } from '@/content/legalDisclaimer';

type Props = { params: Promise<{ locale: string }> };

const copy = {
  fr: {
    eyebrow: 'À propos',
    title: 'Un service pratique, humain et transparent.',
    text: 'Marhaban Canada existe pour aider les nouveaux arrivants à mieux comprendre leurs premières étapes, sans jargon, sans pression et sans promesse irréaliste.',
    primary: 'Commencer',
    secondary: 'Réserver un appel',
    pillarsTitle: 'Notre mission',
    pillarsText: 'Faire gagner du temps, réduire le stress, et aider à reconnaître les situations où il faut ralentir ou vérifier.',
    pillars: ['Pratique', 'Clair', 'Humain', 'Transparent'],
    storyTitle: 'Nos limites sont explicites',
    storyText:
      'Nous ne sommes pas un cabinet juridique, ni un service gouvernemental, ni un remplaçant des démarches officielles. Nous aidons à comprendre, organiser et prioriser.',
    bullets: ['Pas de conseil juridique', 'Pas de conseil en immigration', 'Pas de garantie de résultat'],
  },
  en: {
    eyebrow: 'About',
    title: 'A practical, human, transparent service.',
    text: 'Marhaban Canada exists to help newcomers understand their first steps better, without jargon, pressure, or unrealistic promises.',
    primary: 'Start',
    secondary: 'Book a call',
    pillarsTitle: 'Our mission',
    pillarsText: 'Save time, reduce stress, and help people recognize when they should slow down or verify.',
    pillars: ['Practical', 'Clear', 'Human', 'Transparent'],
    storyTitle: 'Our limits are explicit',
    storyText:
      'We are not a law firm, not a government service, and not a replacement for official procedures. We help people understand, organize, and prioritize.',
    bullets: ['No legal advice', 'No immigration advice', 'No guarantee of results'],
  },
  ar: {
    eyebrow: 'من نحن',
    title: 'خدمة عملية وإنسانية وشفافة.',
    text: 'توجد مرحبا كندا لمساعدة القادمين الجدد على فهم خطواتهم الأولى بشكل أفضل، من دون مصطلحات معقدة أو ضغط أو وعود غير واقعية.',
    primary: 'ابدأ',
    secondary: 'احجز مكالمة',
    pillarsTitle: 'مهمتنا',
    pillarsText: 'توفير الوقت، تقليل التوتر، ومساعدة الناس على معرفة متى يجب التريث أو التحقق.',
    pillars: ['عملي', 'واضح', 'إنساني', 'شفاف'],
    storyTitle: 'حدودنا واضحة',
    storyText:
      'نحن لسنا مكتباً قانونياً، ولا خدمة حكومية، ولا بديلاً عن الإجراءات الرسمية. نحن نساعد على الفهم والتنظيم وتحديد الأولويات.',
    bullets: ['لا نصائح قانونية', 'لا نصائح هجرة', 'لا ضمان للنتائج'],
  },
} as const satisfies Record<Locale, {
  eyebrow: string;
  title: string;
  text: string;
  primary: string;
  secondary: string;
  pillarsTitle: string;
  pillarsText: string;
  pillars: readonly string[];
  storyTitle: string;
  storyText: string;
  bullets: readonly string[];
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';
  return { title: `${copy[locale].eyebrow} | Marhaban Canada`, description: copy[locale].text };
}

export default async function AProposPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const { dir, lang } = getHtmlAttrs(locale);
  const t = copy[locale];

  return (
    <PageShell dir={dir} lang={lang}>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        text={t.text}
        primary={{ label: t.primary, href: startPath(locale) }}
        secondary={{ label: t.secondary, href: bookingPath(locale) }}
        pills={t.pillars}
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div className="rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm">
            <SectionHeader eyebrow={t.pillarsTitle} title={t.pillarsTitle} text={t.pillarsText} />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.pillars.map((pillar) => (
                <div key={pillar} className="rounded-2xl border border-marhaban-leaf/15 bg-marhaban-warm/70 px-4 py-3 text-sm font-semibold text-marhaban-ink">
                  {pillar}
                </div>
              ))}
            </div>
          </div>
          <TrustNotice title={t.storyTitle} text={t.storyText} bullets={t.bullets} />
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
