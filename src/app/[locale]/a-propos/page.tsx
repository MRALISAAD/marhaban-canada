import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check, ArrowRight } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import { getHtmlAttrs, isLocale, type Locale } from '@/i18n/locales';
import { bookingPath, resourcesPath } from '@/lib/routes';
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
    pillarsEyebrow: 'Notre approche',
    pillarsTitle: 'Notre mission',
    pillarsText: 'Faire gagner du temps, réduire le stress, et aider à reconnaître les situations où il faut ralentir ou vérifier.',
    pillars: ['Pratique', 'Clair', 'Humain', 'Transparent'] as readonly string[],
    storyTitle: 'Nos limites sont explicites',
    storyText:
      'Nous ne sommes pas un cabinet juridique, ni un service gouvernemental, ni un remplaçant des démarches officielles. Nous aidons à comprendre, organiser et prioriser.',
    bullets: ['Pas de conseil juridique', 'Pas de conseil en immigration', 'Pas de garantie de résultat'] as readonly string[],
    finalEyebrow: 'Prêt à commencer ?',
    finalTitle: 'Clarifie tes prochaines étapes.',
    finalText: '30 min pour faire le point et repartir avec une direction claire.',
  },
  en: {
    eyebrow: 'About',
    title: 'A practical, human, transparent service.',
    text: 'Marhaban Canada exists to help newcomers understand their first steps better, without jargon, pressure, or unrealistic promises.',
    primary: 'Start',
    secondary: 'Book a call',
    pillarsEyebrow: 'Our approach',
    pillarsTitle: 'Our mission',
    pillarsText: 'Save time, reduce stress, and help people recognize when they should slow down or verify.',
    pillars: ['Practical', 'Clear', 'Human', 'Transparent'] as readonly string[],
    storyTitle: 'Our limits are explicit',
    storyText:
      'We are not a law firm, not a government service, and not a replacement for official procedures. We help people understand, organize, and prioritize.',
    bullets: ['No legal advice', 'No immigration advice', 'No guarantee of results'] as readonly string[],
    finalEyebrow: 'Ready to start?',
    finalTitle: 'Clarify your next steps.',
    finalText: '30 min to review your situation and leave with one clear direction.',
  },
  ar: {
    eyebrow: 'من نحن',
    title: 'خدمة عملية وإنسانية وشفافة.',
    text: 'توجد مرحبا كندا لمساعدة القادمين الجدد على فهم خطواتهم الأولى بشكل أفضل، من دون مصطلحات معقدة أو ضغط أو وعود غير واقعية.',
    primary: 'ابدأ',
    secondary: 'احجز مكالمة',
    pillarsEyebrow: 'نهجنا',
    pillarsTitle: 'مهمتنا',
    pillarsText: 'توفير الوقت، تقليل التوتر، ومساعدة الناس على معرفة متى يجب التريث أو التحقق.',
    pillars: ['عملي', 'واضح', 'إنساني', 'شفاف'] as readonly string[],
    storyTitle: 'حدودنا واضحة',
    storyText:
      'نحن لسنا مكتباً قانونياً، ولا خدمة حكومية، ولا بديلاً عن الإجراءات الرسمية. نحن نساعد على الفهم والتنظيم وتحديد الأولويات.',
    bullets: ['لا نصائح قانونية', 'لا نصائح هجرة', 'لا ضمان للنتائج'] as readonly string[],
    finalEyebrow: 'هل أنت مستعد للبدء؟',
    finalTitle: 'وضّح خطواتك التالية.',
    finalText: '30 دقيقة لمراجعة وضعك والخروج بتوجه واضح.',
  },
} as const satisfies Record<Locale, {
  eyebrow: string;
  title: string;
  text: string;
  primary: string;
  secondary: string;
  pillarsEyebrow: string;
  pillarsTitle: string;
  pillarsText: string;
  pillars: readonly string[];
  storyTitle: string;
  storyText: string;
  bullets: readonly string[];
  finalEyebrow: string;
  finalTitle: string;
  finalText: string;
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
  const heroVisual = (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-marhaban-leaf/20" aria-hidden="true" />
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-marhaban-clay">
          Marhaban Canada
        </p>
        <span className="h-px flex-1 bg-marhaban-leaf/20" aria-hidden="true" />
      </div>
      <div className="rounded-[1.5rem] border border-marhaban-leaf/15 bg-marhaban-mint/35 p-5">
        <p className="font-heading text-2xl font-semibold leading-tight text-marhaban-ink">
          {locale === 'fr'
            ? 'Comprendre avant de décider.'
            : locale === 'en'
              ? 'Understand before deciding.'
              : 'افهم قبل أن تقرر.'}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-marhaban-muted">
          {locale === 'fr'
            ? 'Notre rôle reste simple : clarifier, organiser, orienter vers les bonnes ressources.'
            : locale === 'en'
              ? 'Our role stays simple: clarify, organize, and point to the right resources.'
              : 'دورنا بسيط: التوضيح، التنظيم، والإرشاد نحو الموارد المناسبة.'}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {t.pillars.map((pillar) => (
          <span
            key={pillar}
            className="rounded-[1rem] border border-marhaban-leaf/12 bg-white px-4 py-3 text-sm font-semibold text-marhaban-ink"
          >
            {pillar}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <PageShell dir={dir} lang={lang}>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        text={t.text}
        primary={{ label: t.primary, href: bookingPath(locale) }}
        secondary={{ label: locale === 'fr' ? 'Voir les ressources' : locale === 'en' ? 'See resources' : 'عرض الموارد', href: resourcesPath(locale) }}
        visual={heroVisual}
      />

      {/* ── Mission + limites ── */}
      <Section>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div className="rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm sm:p-7">
            <SectionHeader eyebrow={t.pillarsEyebrow} title={t.pillarsTitle} text={t.pillarsText} />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.pillars.map((pillar) => (
                <div
                  key={pillar}
                  className="flex items-center gap-3 rounded-[1.25rem] border border-marhaban-leaf/15 bg-marhaban-mint/30 px-4 py-3.5 transition duration-200 hover:border-marhaban-leaf/30 hover:bg-marhaban-mint/50"
                >
                  <Check className="h-4 w-4 flex-shrink-0 text-marhaban-leaf" aria-hidden="true" />
                  <span className="font-heading text-base font-semibold text-marhaban-ink">{pillar}</span>
                </div>
              ))}
            </div>
          </div>
          <TrustNotice title={t.storyTitle} text={t.storyText} bullets={t.bullets} />
        </div>
      </Section>

      {/* ── Final CTA — split dark ── */}
      <Section tone="dark" className="py-14 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow-light">{t.finalEyebrow}</p>
            <h2 className="heading-section mt-3 !text-white">{t.finalTitle}</h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-[#edf7f2]">{t.finalText}</p>
          </div>
          <div className="flex flex-col gap-4">
            <LocalizedLink
              href={bookingPath(locale)}
              className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-marhaban-gold px-8 py-4 text-sm font-bold text-marhaban-ink shadow-[0_18px_60px_rgba(213,168,79,0.30)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark"
            >
              {t.secondary}
              <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
            </LocalizedLink>
            <p className="text-xs leading-relaxed text-white/55">{legalDisclaimer[locale]}</p>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
