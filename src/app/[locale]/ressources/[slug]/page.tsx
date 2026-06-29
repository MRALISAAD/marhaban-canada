import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2, ExternalLink, XCircle } from 'lucide-react';
import { getHtmlAttrs, isLocale, type Locale } from '@/i18n/locales';
import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import {
  getResourceGuide,
  isResourceGuideSlug,
  RESOURCE_GUIDE_SLUGS,
} from '@/content/resourceGuides';
import { publicPageMetadata } from '@/lib/seo';

const CALENDLY_FREE_CALL_URL = process.env.NEXT_PUBLIC_CALENDLY_FREE_CALL_URL?.trim() || '';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const locales: Locale[] = ['fr', 'en', 'ar'];
  return locales.flatMap((locale) =>
    RESOURCE_GUIDE_SLUGS.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';
  const guide = getResourceGuide(slug, locale);
  if (!guide) return {};
  return publicPageMetadata({
    locale,
    path: `/ressources/${slug}`,
    title: guide.title,
    description: guide.description,
  });
}

const unavailableText: Record<Locale, string> = {
  fr: 'Le lien de réservation sera bientôt disponible.',
  en: 'The booking link will be available soon.',
  ar: 'سيكون رابط الحجز متاحاً قريباً.',
};

const backText: Record<Locale, string> = {
  fr: '← Retour aux ressources',
  en: '← Back to resources',
  ar: '← العودة إلى الموارد',
};

export default async function ResourceGuidePage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  if (!isResourceGuideSlug(slug)) notFound();

  const locale = localeParam as Locale;
  const { dir, lang } = getHtmlAttrs(locale);
  const guide = getResourceGuide(slug, locale)!;

  return (
    <PageShell dir={dir} lang={lang}>
      {/* ── Hero ── */}
      <section className="px-4 pt-10 pb-4 sm:px-6 sm:pt-12 lg:px-8 lg:pt-14">
        <div className="mx-auto max-w-7xl">
          <a
            href={`/${locale}/ressources`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-marhaban-leaf transition hover:text-marhaban-forestDark"
          >
            {backText[locale]}
          </a>
          <div className="mt-6 rounded-[2.5rem] border border-marhaban-forestDark/10 bg-marhaban-forestDark px-6 py-10 text-white shadow-[0_30px_90px_rgba(0,0,0,0.22)] sm:px-8 sm:py-12 lg:px-12 lg:py-14">
            <p className="inline-flex rounded-full border border-white/12 bg-white/[0.08] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-marhaban-gold">
              {guide.hero.eyebrow}
            </p>
            <h1 className="mt-5 max-w-3xl font-heading text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[0.9] tracking-tight text-white">
              {guide.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-[#edf7f2] sm:text-lg">
              {guide.hero.text}
            </p>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <Section tone="muted" className="py-10 sm:py-12">
        <div className="max-w-3xl">
          <p className="text-[1.05rem] leading-relaxed text-marhaban-ink/88 sm:text-lg">
            {guide.intro}
          </p>
        </div>
      </Section>

      {/* ── Steps ── */}
      <Section className="py-10 sm:py-12">
        <SectionHeader eyebrow="" title={guide.stepsTitle} />
        <ul className="mt-7 space-y-3">
          {guide.steps.map((step, i) => (
            <li
              key={i}
              className="flex items-start gap-4 rounded-[1.5rem] border border-marhaban-leaf/15 bg-white p-5 shadow-warm-sm"
            >
              <CheckCircle2
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-marhaban-leaf"
                aria-hidden="true"
              />
              <p className="text-sm leading-relaxed text-marhaban-ink sm:text-base">{step}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Mistakes ── */}
      <Section tone="muted" className="py-10 sm:py-12">
        <SectionHeader eyebrow="" title={guide.mistakesTitle} />
        <ul className="mt-7 space-y-3">
          {guide.mistakes.map((mistake, i) => (
            <li
              key={i}
              className="flex items-start gap-4 rounded-[1.5rem] border border-marhaban-clay/15 bg-white p-5 shadow-warm-sm"
            >
              <XCircle
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-marhaban-clay"
                aria-hidden="true"
              />
              <p className="text-sm leading-relaxed text-marhaban-ink sm:text-base">{mistake}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Official links ── */}
      {guide.links.length > 0 && (
        <Section className="py-10 sm:py-12">
          <SectionHeader eyebrow="" title={guide.linksTitle} />
          <ul className="mt-7 space-y-3">
            {guide.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-marhaban-leaf/20 bg-marhaban-mint/40 px-5 py-3.5 text-sm font-semibold text-marhaban-ink transition hover:bg-marhaban-mint hover:border-marhaban-leaf/35"
                >
                  {link.label}
                  <ExternalLink className="h-3.5 w-3.5 text-marhaban-leaf" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ── CTA ── */}
      <Section tone="dark" className="py-10 sm:py-12 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          {/* Free call */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-7">
            <p className="text-xs font-bold uppercase tracking-widest text-marhaban-gold">
              {locale === 'fr' ? 'APPEL GRATUIT' : locale === 'en' ? 'FREE CALL' : 'مكالمة مجانية'}
            </p>
            <p className="mt-3 font-heading text-2xl font-semibold text-white">{guide.ctaFree}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#edf7f2]">
              {locale === 'fr'
                ? 'Clarifier ta situation rapidement, sans engagement.'
                : locale === 'en'
                  ? 'Clarify your situation quickly, no commitment.'
                  : 'توضيح وضعك بسرعة، بدون التزام.'}
            </p>
            <div className="mt-5">
              {CALENDLY_FREE_CALL_URL ? (
                <a
                  href={CALENDLY_FREE_CALL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-marhaban-gold px-7 py-3.5 text-sm font-bold text-marhaban-ink shadow-[0_12px_40px_rgba(213,168,79,0.28)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark"
                >
                  {guide.ctaFree}
                  <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
                </a>
              ) : (
                <p className="rounded-2xl border border-white/12 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white/70">
                  {unavailableText[locale]}
                </p>
              )}
            </div>
          </div>

          {/* Orientation call — coming soon */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-7">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-bold uppercase tracking-widest text-marhaban-gold">
                {locale === 'fr' ? 'APPEL ORIENTATION' : locale === 'en' ? 'ORIENTATION CALL' : 'مكالمة توجيه'}
              </p>
              <span className="inline-flex rounded-full border border-marhaban-gold/30 bg-marhaban-gold/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-marhaban-gold">
                {locale === 'fr' ? 'Bientôt disponible' : locale === 'en' ? 'Coming soon' : 'قريباً'}
              </span>
            </div>
            <p className="mt-3 font-heading text-2xl font-semibold text-white">{guide.ctaOrientation}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#edf7f2]">
              {locale === 'fr'
                ? "L'appel orientation 45 min arrive bientôt. Pour l'instant, commence par l'appel gratuit."
                : locale === 'en'
                  ? 'The 45-minute orientation call is coming soon. For now, start with the free call.'
                  : 'مكالمة التوجيه 45 دقيقة قادمة قريباً. في الوقت الحالي، ابدأ بالمكالمة المجانية.'}
            </p>
            <div className="mt-5">
              <span
                aria-disabled="true"
                role="button"
                className="inline-flex min-h-[52px] cursor-not-allowed select-none items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white/40"
              >
                {locale === 'fr' ? 'Bientôt disponible' : locale === 'en' ? 'Coming soon' : 'قريباً'}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-8 text-xs leading-relaxed text-white/60">{guide.disclaimer}</p>
      </Section>
    </PageShell>
  );
}
