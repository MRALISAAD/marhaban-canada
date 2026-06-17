import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
    title: 'Avant de payer, prends le temps de vérifier.',
    subtitle: "On t'aide à repérer les signaux d'alerte avant de payer quelqu'un ou d'envoyer des documents.",
    primary: 'Me faire orienter avant de payer',
    secondary: 'Voir les ressources',
    pills: ['Red flags', 'Sources officielles', 'Avant de payer', "Avant d'envoyer"],
    situationsTitle: 'Situations fréquentes',
    situationsText: 'Logement trop beau pour être vrai, faux recruteur, frais urgents, faux agent, pression pour payer vite.',
    checklistTitle: "Ce qu'il faut vérifier",
    checklistBullets: ["L'identité de la personne", "Le contrat ou l'écrit", 'Le site officiel ou la source reconnue', 'La cohérence de la demande'],
    questionsTitle: 'Questions à poser avant de payer',
    questionsBullets: ['Qui êtes-vous ?', 'Pourquoi ce paiement ?', "Où puis-je vérifier l'information ?", 'Puis-je avoir un écrit ?'],
    sourcesTitle: 'Sources officielles à consulter',
    sourcesBullets: ['Sites gouvernementaux', 'Institutions reconnues', "Organismes d'aide fiables"],
    finalTitle: 'Si tu hésites, ralentis.',
    finalText: "Une lecture humaine avant d'agir peut éviter des erreurs coûteuses.",
  },
  en: {
    eyebrow: 'Anti-scam',
    title: 'Before paying, take time to check.',
    subtitle: 'We help you spot warning signs before you pay someone or send documents.',
    primary: 'Get guidance before paying',
    secondary: 'See resources',
    pills: ['Red flags', 'Official sources', 'Before paying', 'Before sending'],
    situationsTitle: 'Common situations',
    situationsText: 'Too-good-to-be-true housing, fake recruiter, urgent fees, fake agent, pressure to pay fast.',
    checklistTitle: 'What to verify',
    checklistBullets: ["The person's identity", 'The contract or written proof', 'The official website or recognized source', 'Whether the request makes sense'],
    questionsTitle: 'Questions to ask before paying',
    questionsBullets: ['Who are you?', 'Why is this payment needed?', 'Where can I verify this information?', 'Can I have it in writing?'],
    sourcesTitle: 'Official sources to check',
    sourcesBullets: ['Government websites', 'Recognized institutions', 'Reliable support organizations'],
    finalTitle: 'If you are unsure, slow down.',
    finalText: 'A human read before acting can prevent costly mistakes.',
  },
  ar: {
    eyebrow: 'مكافحة الاحتيال',
    title: 'قبل أن تدفع، خذ وقتك للتحقق.',
    subtitle: 'نساعدك على ملاحظة إشارات التحذير قبل الدفع أو إرسال الوثائق.',
    primary: 'احصل على توجيه قبل الدفع',
    secondary: 'عرض الموارد',
    pills: ['إشارات حمراء', 'مصادر رسمية', 'قبل الدفع', 'قبل الإرسال'],
    situationsTitle: 'حالات شائعة',
    situationsText: 'سكن يبدو رائعاً جداً، مجند مزيف، رسوم عاجلة، وكيل مزيف، ضغط للدفع بسرعة.',
    checklistTitle: 'ما الذي يجب التحقق منه',
    checklistBullets: ['هوية الشخص', 'العقد أو الإثبات المكتوب', 'الموقع الرسمي أو المصدر المعترف به', 'مدى منطقية الطلب'],
    questionsTitle: 'أسئلة يجب طرحها قبل الدفع',
    questionsBullets: ['من أنت؟', 'لماذا هذا الدفع؟', 'أين أتحقق من هذه المعلومة؟', 'هل يمكنني الحصول عليها كتابة؟'],
    sourcesTitle: 'مصادر رسمية للمراجعة',
    sourcesBullets: ['المواقع الحكومية', 'المؤسسات المعترف بها', 'منظمات الدعم الموثوقة'],
    finalTitle: 'إذا لم تكن متأكداً، تمهل.',
    finalText: 'قراءة إنسانية قبل التصرف قد تمنع أخطاء مكلفة.',
  },
} as const satisfies Record<Locale, {
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
    locale === 'fr' ? 'Frais urgents' : locale === 'en' ? 'Urgent fees' : 'رسوم عاجلة',
    locale === 'fr' ? 'Faux agent' : locale === 'en' ? 'Fake agent' : 'وكيل مزيف',
    locale === 'fr' ? 'Pression pour payer vite' : locale === 'en' ? 'Pressure to pay fast' : 'ضغط للدفع بسرعة',
    locale === 'fr' ? 'Demande de documents sensibles' : locale === 'en' ? 'Request for sensitive documents' : 'طلب وثائق حساسة',
  ];

  return (
    <PageShell dir={dir} lang={lang}>
      <PageHero
        dark
        eyebrow={t.eyebrow}
        title={t.title}
        text={t.subtitle}
        primary={{ label: t.primary, href: bookingPath(locale) }}
        secondary={{ label: t.secondary, href: resourcesPath(locale) }}
        pills={t.pills}
      />

      <Section>
        <SectionHeader eyebrow={t.situationsTitle} title={t.situationsTitle} text={t.situationsText} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {redFlags.map((flag) => (
            <div key={flag} className="rounded-[1.5rem] border border-marhaban-leaf/15 bg-white p-5 shadow-warm-sm">
              <p className="text-sm font-semibold text-marhaban-ink">{flag}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-6 lg:grid-cols-2">
          <TrustNotice title={t.checklistTitle} text={locale === 'fr' ? "Avant d'agir, vérifie les bases." : locale === 'en' ? 'Before acting, check the basics.' : 'قبل التصرف، تحقق من الأساسيات.'} bullets={t.checklistBullets} />
          <TrustNotice title={t.questionsTitle} text={locale === 'fr' ? "Des questions simples peuvent faire gagner du temps." : locale === 'en' ? 'Simple questions can save time.' : 'الأسئلة البسيطة قد توفر الوقت.'} bullets={t.questionsBullets} />
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div className="rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm">
            <SectionHeader eyebrow={t.sourcesTitle} title={t.sourcesTitle} text={locale === 'fr' ? "Vérifie d'abord les sources sûres." : locale === 'en' ? 'Check safe sources first.' : 'تحقق من المصادر الآمنة أولاً.'} />
            <ul className="mt-6 space-y-3 text-sm text-marhaban-muted">
              {t.sourcesBullets.map((item) => (
                <li key={item} className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 px-4 py-3">• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">
              {locale === 'fr' ? 'Avant de payer' : locale === 'en' ? 'Before paying' : 'قبل الدفع'}
            </p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-marhaban-ink">{t.finalTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-marhaban-muted">{t.finalText}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={bookingPath(locale)} className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-marhaban-forestDark px-5 py-2.5 text-sm font-bold text-white">
                {t.primary}
              </a>
              <a href={servicesPath(locale)} className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-marhaban-leaf/15 bg-marhaban-mint/40 px-5 py-2.5 text-sm font-bold text-marhaban-ink">
                {locale === 'fr' ? 'Voir les services' : locale === 'en' ? 'See services' : 'عرض الخدمات'}
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Section id="signaler" className="scroll-mt-28 py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            eyebrow={locale === 'fr' ? 'Signalement' : locale === 'en' ? 'Report' : 'بلاغ'}
            title={locale === 'fr' ? 'Soumettre une situation pour avis' : locale === 'en' ? 'Submit a situation for review' : 'تقديم وضع للمراجعة'}
            text={locale === 'fr' ? "Nous l'examinons de maniere informative et prudente. Pas de conseil juridique." : locale === 'en' ? 'We review it in an informative and cautious way. No legal advice.' : 'سنراجعه بطريقة معلوماتية وحذرة. لا نصيحة قانونية.'}
          />
          <div className="mt-8">
            <ScamCheckForm locale={locale} dir={dir} />
          </div>
        </div>
      </Section>

      <Section tone="dark" className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/12 bg-white/[0.06] p-6 text-center shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-8">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">{locale === 'fr' ? "Si tu hésites, parle-en avant d'agir." : locale === 'en' ? 'If you are unsure, talk it through first.' : 'إذا كنت غير متأكد، تحدث قبل التصرف.'}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#edf7f2]">{t.finalText}</p>
          <p className="mt-6 text-sm leading-relaxed text-[#d8e7df]">{legalDisclaimer[locale]}</p>
        </div>
      </Section>
    </PageShell>
  );
}
