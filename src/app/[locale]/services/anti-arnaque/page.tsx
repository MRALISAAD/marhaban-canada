import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, AlertTriangle, ShieldCheck } from 'lucide-react';
import { getHtmlAttrs, isLocale, type Locale } from '@/i18n/locales';
import { bookingPath, resourcesPath, servicesPath } from '@/lib/routes';
import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { TrustNotice } from '@/components/sections/TrustNotice';
import { legalDisclaimer } from '@/content/legalDisclaimer';
import { ScamCheckForm } from '@/components/forms/ScamCheckForm';

type Props = { params: Promise<{ locale: string }> };

const copy = {
  fr: {
    eyebrow: 'Anti-arnaque',
    title: 'Avant de payer, prends 2 minutes pour vérifier les signaux.',
    subtitle: "Repère les signaux de risque avant de payer quelqu'un ou d'envoyer tes documents.",
    primary: 'Vérifier une situation',
    secondary: 'Voir les ressources',
    pills: ['Signaux de risque', 'Sources officielles', 'Avant de payer', 'À vérifier'] as readonly string[],
    situationsTitle: 'Ces situations méritent attention',
    situationsText: "Demande urgente, promesse trop belle, pression pour payer vite — chaque signal vaut quelques minutes de vérification.",
    checklistTitle: "Ce qu'il faut vérifier",
    checklistBullets: ["L'identité de la personne", "Le contrat ou l'écrit", 'Le site officiel ou la source reconnue', 'La cohérence de la demande'] as readonly string[],
    questionsTitle: 'Questions à poser avant de payer',
    questionsBullets: ['Qui êtes-vous ?', 'Pourquoi ce paiement ?', "Où puis-je vérifier l'information ?", 'Puis-je avoir un écrit ?'] as readonly string[],
    sourcesTitle: 'Sources officielles à consulter',
    sourcesBullets: ['Sites gouvernementaux', 'Institutions reconnues', "Organismes d'aide fiables"] as readonly string[],
    finalTitle: 'Si tu hésites, ralentis.',
    finalText: "Une lecture humaine avant d'agir peut éviter des erreurs coûteuses.",
    howEyebrow: 'Comment ça marche',
    howTitle: "Un processus simple pour vérifier avant d'agir.",
    howText: 'Trois étapes claires pour analyser une situation sans prise de décision précipitée.',
    howCards: [
      { title: 'Décris ta situation', text: 'Soumets la demande ou le message reçu. Aucun document sensible requis.' },
      { title: 'On analyse les signaux', text: 'Nous repérons les éléments qui méritent attention, sans porter de jugement définitif.' },
      { title: 'Tu reçois une réponse orientative', text: 'Par email, avec des observations et des ressources officielles utiles.' },
    ] as readonly { title: string; text: string }[],
  },
  en: {
    eyebrow: 'Anti-scam',
    title: 'Before paying, take 2 minutes to check the key signals.',
    subtitle: 'Spot risk signals before you pay someone or send your documents.',
    primary: 'Check a situation',
    secondary: 'See resources',
    pills: ['Risk signals', 'Official sources', 'Before paying', 'To verify'] as readonly string[],
    situationsTitle: 'These situations deserve attention',
    situationsText: 'Urgent request, too-good promise, pressure to pay fast — each signal is worth a few minutes of checking.',
    checklistTitle: 'What to verify',
    checklistBullets: ["The person's identity", 'The contract or written proof', 'The official website or recognized source', 'Whether the request makes sense'] as readonly string[],
    questionsTitle: 'Questions to ask before paying',
    questionsBullets: ['Who are you?', 'Why is this payment needed?', 'Where can I verify this information?', 'Can I have it in writing?'] as readonly string[],
    sourcesTitle: 'Official sources to check',
    sourcesBullets: ['Government websites', 'Recognized institutions', 'Reliable support organizations'] as readonly string[],
    finalTitle: 'If you are unsure, slow down.',
    finalText: 'A human read before acting can prevent costly mistakes.',
    howEyebrow: 'How it works',
    howTitle: 'A simple process to verify before you act.',
    howText: 'Three clear steps to review a situation without rushing to conclusions.',
    howCards: [
      { title: 'Describe your situation', text: 'Submit the request or message you received. No sensitive document required.' },
      { title: 'We review the signals', text: 'We identify elements that deserve attention, without making a definitive judgment.' },
      { title: 'You get an informational response', text: 'By email, with observations and useful official resources.' },
    ] as readonly { title: string; text: string }[],
  },
  ar: {
    eyebrow: 'مكافحة الاحتيال',
    title: 'قبل أن تدفع، خذ دقيقتين للتحقق من الإشارات المهمة.',
    subtitle: 'تعرّف على إشارات المخاطر قبل الدفع أو إرسال وثائقك.',
    primary: 'التحقق من وضع',
    secondary: 'عرض الموارد',
    pills: ['إشارات مخاطر', 'مصادر رسمية', 'قبل الدفع', 'للتحقق'] as readonly string[],
    situationsTitle: 'هذه الحالات تستحق انتباهك',
    situationsText: 'طلب عاجل، وعد جميل جداً، ضغط للدفع بسرعة — كل إشارة تستحق بضع دقائق للتحقق.',
    checklistTitle: 'ما الذي يجب التحقق منه',
    checklistBullets: ['هوية الشخص', 'العقد أو الإثبات المكتوب', 'الموقع الرسمي أو المصدر المعترف به', 'مدى منطقية الطلب'] as readonly string[],
    questionsTitle: 'أسئلة يجب طرحها قبل الدفع',
    questionsBullets: ['من أنت؟', 'لماذا هذا الدفع؟', 'أين أتحقق من هذه المعلومة؟', 'هل يمكنني الحصول عليها كتابة؟'] as readonly string[],
    sourcesTitle: 'مصادر رسمية للمراجعة',
    sourcesBullets: ['المواقع الحكومية', 'المؤسسات المعترف بها', 'منظمات الدعم الموثوقة'] as readonly string[],
    finalTitle: 'إذا لم تكن متأكداً، تمهل.',
    finalText: 'قراءة إنسانية قبل التصرف قد تمنع أخطاء مكلفة.',
    howEyebrow: 'كيف يتم الأمر',
    howTitle: 'مسار بسيط للتحقق قبل اتخاذ أي إجراء.',
    howText: 'ثلاث خطوات واضحة لمراجعة الوضع دون استعجال.',
    howCards: [
      { title: 'صف وضعك', text: 'أرسل الطلب أو الرسالة التي تلقيتها. لا حاجة لوثائق حساسة.' },
      { title: 'نحلل الإشارات', text: 'نحدد العناصر التي تستحق الانتباه دون إصدار حكم نهائي.' },
      { title: 'تتلقى رداً إرشادياً', text: 'عبر البريد الإلكتروني مع ملاحظات وموارد رسمية مفيدة.' },
    ] as readonly { title: string; text: string }[],
  },
} satisfies Record<Locale, {
  eyebrow: string;
  title: string;
  subtitle: string;
  primary: string;
  secondary: string;
  pills: readonly string[];
  situationsTitle: string;
  situationsText: string;
  checklistTitle: string;
  checklistBullets: readonly string[];
  questionsTitle: string;
  questionsBullets: readonly string[];
  sourcesTitle: string;
  sourcesBullets: readonly string[];
  finalTitle: string;
  finalText: string;
  howEyebrow: string;
  howTitle: string;
  howText: string;
  howCards: readonly { title: string; text: string }[];
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';
  return { title: `${copy[locale].title} | Marhaban Canada`, description: copy[locale].subtitle };
}

export default async function AntiScamServicePage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const { dir, lang } = getHtmlAttrs(locale);
  const t = copy[locale];

  const redFlags = [
    locale === 'fr' ? 'Dépôt avant visite' : locale === 'en' ? 'Deposit before viewing' : 'دفع قبل المعاينة',
    locale === 'fr' ? 'Faux recruteur' : locale === 'en' ? 'Fake recruiter' : 'مجند مزيف',
    locale === 'fr' ? 'Frais urgents demandés' : locale === 'en' ? 'Urgent fees requested' : 'رسوم عاجلة مطلوبة',
    locale === 'fr' ? 'Agent non vérifiable' : locale === 'en' ? 'Unverifiable agent' : 'وكيل غير قابل للتحقق',
    locale === 'fr' ? 'Pression pour payer vite' : locale === 'en' ? 'Pressure to pay fast' : 'ضغط للدفع بسرعة',
    locale === 'fr' ? 'Demande de documents sensibles' : locale === 'en' ? 'Request for sensitive documents' : 'طلب وثائق حساسة',
  ];

  const signalLabel =
    locale === 'fr' ? 'Signal à vérifier'
    : locale === 'en' ? 'Signal to check'
    : 'إشارة للتحقق';

  return (
    <PageShell dir={dir} lang={lang}>
      <PageHero
        dark
        eyebrow={t.eyebrow}
        title={t.title}
        text={t.subtitle}
        primary={{ label: t.primary, href: '#signaler' }}
        secondary={{ label: t.secondary, href: resourcesPath(locale) }}
        pills={t.pills}
      />

      {/* ── Signaux à vérifier ── */}
      <Section>
        <SectionHeader
          eyebrow={locale === 'fr' ? 'Signaux à vérifier' : locale === 'en' ? 'Signals to check' : 'إشارات للتحقق'}
          title={t.situationsTitle}
          text={t.situationsText}
        />
        <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {redFlags.map((flag) => (
            <div
              key={flag}
              className="flex items-start gap-3 rounded-[1.75rem] border border-marhaban-clay/20 bg-white p-5 shadow-warm-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-marhaban-clay/35 hover:shadow-warm-sm"
            >
              <span className="mt-0.5 grid h-8 w-8 flex-shrink-0 place-items-center rounded-xl bg-marhaban-clay/8 text-marhaban-clay">
                <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-marhaban-ink">{flag}</p>
                <p className="mt-0.5 text-xs text-marhaban-clay">{signalLabel}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Comment ça marche ── */}
      <Section tone="muted" className="py-14 sm:py-16 lg:py-20">
        <SectionHeader eyebrow={t.howEyebrow} title={t.howTitle} text={t.howText} />
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {t.howCards.map((item, index) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm transition duration-200 hover:-translate-y-1 hover:border-marhaban-clay/25 hover:shadow-warm sm:p-7"
            >
              <p className="inline-flex rounded-full border border-marhaban-clay/25 bg-marhaban-clay/8 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">
                0{index + 1}
              </p>
              <h3 className="mt-4 font-heading text-xl font-semibold leading-tight text-marhaban-ink sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-marhaban-ink/78">{item.text}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* ── Checklist + Questions ── */}
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <TrustNotice
            title={t.checklistTitle}
            text={locale === 'fr' ? "Avant d'agir, vérifie les bases." : locale === 'en' ? 'Before acting, check the basics.' : 'قبل التصرف، تحقق من الأساسيات.'}
            bullets={t.checklistBullets}
          />
          <TrustNotice
            title={t.questionsTitle}
            text={locale === 'fr' ? "Des questions simples peuvent faire gagner du temps." : locale === 'en' ? 'Simple questions can save time.' : 'الأسئلة البسيطة قد توفر الوقت.'}
            bullets={t.questionsBullets}
          />
        </div>
      </Section>

      {/* ── Sources + Avant de payer ── */}
      <Section tone="muted">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div className="rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">
              {locale === 'fr' ? 'Sources sûres' : locale === 'en' ? 'Safe sources' : 'مصادر موثوقة'}
            </p>
            <h3 className="mt-3 font-heading text-xl font-semibold leading-tight text-marhaban-ink sm:text-2xl">
              {t.sourcesTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-marhaban-muted">
              {locale === 'fr' ? "Vérifie d'abord les sources sûres." : locale === 'en' ? 'Check safe sources first.' : 'تحقق من المصادر الآمنة أولاً.'}
            </p>
            <ul className="mt-6 space-y-3">
              {t.sourcesBullets.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-[1.25rem] border border-marhaban-leaf/12 bg-marhaban-mint/30 px-4 py-3.5 text-sm font-medium text-marhaban-ink"
                >
                  <ShieldCheck className="h-4 w-4 flex-shrink-0 text-marhaban-leaf" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">
              {locale === 'fr' ? 'Avant de payer' : locale === 'en' ? 'Before paying' : 'قبل الدفع'}
            </p>
            <h3 className="mt-3 font-heading text-xl font-semibold leading-tight text-marhaban-ink sm:text-2xl">
              {t.finalTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-marhaban-muted">{t.finalText}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={bookingPath(locale)}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-marhaban-forestDark px-6 py-3 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2"
              >
                {locale === 'fr' ? 'Réserver un appel' : locale === 'en' ? 'Book a call' : 'احجز مكالمة'}
                <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
              </a>
              <a
                href={servicesPath(locale)}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-marhaban-leaf/20 bg-marhaban-mint/40 px-6 py-3 text-sm font-bold text-marhaban-ink transition hover:bg-marhaban-mint hover:border-marhaban-leaf/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2"
              >
                {locale === 'fr' ? 'Voir les services' : locale === 'en' ? 'See services' : 'عرض الخدمات'}
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Signalement (ScamCheckForm) ── */}
      <Section id="signaler" className="scroll-mt-28 py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            eyebrow={locale === 'fr' ? 'Signalement' : locale === 'en' ? 'Report' : 'بلاغ'}
            title={locale === 'fr' ? 'Soumettre une situation pour avis' : locale === 'en' ? 'Submit a situation for review' : 'تقديم وضع للمراجعة'}
            text={locale === 'fr' ? "Nous l'examinons de manière informative et prudente. Pas de conseil juridique." : locale === 'en' ? 'We review it in an informative and cautious way. No legal advice.' : 'سنراجعه بطريقة معلوماتية وحذرة. لا نصيحة قانونية.'}
          />
          <div className="mt-8">
            <ScamCheckForm locale={locale} dir={dir} />
          </div>
        </div>
      </Section>

      {/* ── CTA final — split dark ── */}
      <Section tone="dark" className="py-14 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow-light">
              {locale === 'fr' ? 'Si tu hésites, ralentis.' : locale === 'en' ? 'If unsure, slow down.' : 'إذا ترددت، تمهّل.'}
            </p>
            <h2 className="heading-section mt-3 !text-white">
              {locale === 'fr' ? "Parle-en avant d'agir." : locale === 'en' ? 'Talk it through before acting.' : 'تحدث قبل التصرف.'}
            </h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-[#edf7f2]">{t.finalText}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href="#signaler"
                className="flex-1 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-marhaban-gold px-8 py-4 text-sm font-bold text-marhaban-ink shadow-[0_18px_60px_rgba(213,168,79,0.30)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark"
              >
                {t.primary}
                <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
              </a>
              <a
                href={bookingPath(locale)}
                className="flex-1 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-white/16 bg-white/[0.06] px-8 py-4 text-sm font-bold text-white transition hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark"
              >
                {locale === 'fr' ? 'Réserver un appel' : locale === 'en' ? 'Book a call' : 'احجز مكالمة'}
              </a>
            </div>
            <p className="text-xs leading-relaxed text-white/55">{legalDisclaimer[locale]}</p>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
