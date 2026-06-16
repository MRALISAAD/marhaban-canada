import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2, Compass, ShieldCheck } from 'lucide-react';
import { getHtmlAttrs, isLocale, type Locale } from '@/i18n/locales';
import { withLocale } from '@/lib/i18n-utils';

type Props = {
  params: Promise<{ locale: string }>;
};

const text = {
  fr: {
    eyebrow: 'Orientation pratique',
    title: 'Un service clair pour organiser ton installation au Canada.',
    intro:
      'Marhaban Canada aide les nouveaux arrivants à transformer trop d’informations en priorités, étapes pratiques, ressources utiles et erreurs à éviter.',
    cta: 'Réserver un appel',
    secondary: 'Voir les ressources',
    howTitle: 'Ce que l’orientation peut clarifier',
    items: ['Ton profil général', 'Tes priorités immédiates', 'Les prochaines étapes pratiques', 'Les ressources utiles', 'Les erreurs à éviter'],
    scopeTitle: 'Cadre du service',
    scope:
      'Marhaban Canada offre de l’orientation pratique et de l’information générale. Nous ne fournissons pas de conseils juridiques ni de conseils en immigration. Pour les questions liées aux visas, permis, résidence permanente, admissibilité ou stratégie d’immigration, veuillez consulter un représentant autorisé.',
  },
  en: {
    eyebrow: 'Practical orientation',
    title: 'A clear service to organize your settlement in Canada.',
    intro:
      'Marhaban Canada helps newcomers turn too much information into priorities, practical steps, useful resources, and mistakes to avoid.',
    cta: 'Book a call',
    secondary: 'View resources',
    howTitle: 'What orientation can clarify',
    items: ['Your general profile', 'Your immediate priorities', 'Your next practical steps', 'Useful resources', 'Mistakes to avoid'],
    scopeTitle: 'Service scope',
    scope:
      'Marhaban Canada offers practical orientation and general information. We do not provide legal advice or immigration advice. For questions related to visas, permits, permanent residence, admissibility, or immigration strategy, please consult an authorized representative.',
  },
  ar: {
    eyebrow: 'توجيه عملي',
    title: 'خدمة واضحة لتنظيم استقرارك في كندا.',
    intro:
      'تساعد مرحبا كندا القادمين الجدد على تحويل كثرة المعلومات إلى أولويات وخطوات عملية وموارد مفيدة وأخطاء يجب تجنبها.',
    cta: 'احجز مكالمة',
    secondary: 'عرض الموارد',
    howTitle: 'ما الذي يمكن أن يوضحه التوجيه',
    items: ['ملفك العام', 'أولوياتك الفورية', 'خطواتك العملية التالية', 'موارد مفيدة', 'أخطاء يجب تجنبها'],
    scopeTitle: 'إطار الخدمة',
    scope:
      'تقدم مرحبا كندا توجيهاً عملياً ومعلومات عامة. نحن لا نقدم نصائح قانونية ولا نصائح في الهجرة. للأسئلة المتعلقة بالتأشيرات أو التصاريح أو الإقامة الدائمة أو الأهلية أو استراتيجية الهجرة، يرجى استشارة ممثل معتمد.',
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';
  const t = text[locale];

  return {
    title: `${t.eyebrow} | Marhaban Canada`,
    description: t.intro,
  };
}

export default async function OrientationPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const { dir, lang } = getHtmlAttrs(locale);
  const t = text[locale];

  return (
    <main className="warm-page px-4 py-12 sm:px-6 lg:px-8" dir={dir} lang={lang}>
      <div className="mx-auto max-w-6xl">
        <section className="rounded-[2.5rem] border border-marhaban-leaf/10 bg-white/86 p-6 shadow-warm sm:p-8">
          <p className="inline-flex rounded-full bg-marhaban-mint px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-marhaban-leaf">
            {t.eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-marhaban-ink sm:text-5xl">
            {t.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base text-slate-700 sm:text-lg">{t.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={withLocale('/book', locale)}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-marhaban-ink px-5 py-2.5 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={withLocale('/ressources', locale)}
              className="inline-flex min-h-[48px] items-center rounded-full border border-stone-300 bg-marhaban-cream px-5 py-2.5 text-sm font-bold text-marhaban-ink transition hover:bg-marhaban-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-2"
            >
              {t.secondary}
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <article className="rounded-[2rem] border border-stone-200 bg-white/[0.88] p-6 shadow-warm-sm">
            <Compass className="h-8 w-8 text-marhaban-leaf" />
            <h2 className="mt-5 text-2xl font-semibold text-marhaban-ink">{t.howTitle}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {t.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-marhaban-leaf" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-[2rem] border border-amber-200 bg-[#FFF4E3] p-6 shadow-warm-sm">
            <ShieldCheck className="h-8 w-8 text-marhaban-clay" />
            <h2 className="mt-5 text-2xl font-semibold text-marhaban-ink">{t.scopeTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">{t.scope}</p>
          </article>
        </section>
      </div>
    </main>
  );
}
