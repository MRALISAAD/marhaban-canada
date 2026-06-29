import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ExternalLink,
  Landmark,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import { BookingModalTrigger } from '@/components/booking/BookingModalTrigger';
import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import { getHtmlAttrs, isLocale, type Locale } from '@/i18n/locales';

type Props = { params: Promise<{ locale: string }> };

const copy = {
  fr: {
    metaTitle: "Avant de payer quelqu'un, vérifie. | Marhaban Canada",
    metaDescription: 'Reconnaître les signaux, vérifier les sources, éviter les pièges courants au Canada.',
    hero: {
      title: "Avant de payer quelqu'un, vérifie.",
      subtitle: 'Reconnaître les signaux, vérifier les sources, éviter les pièges courants au Canada.',
      primary: 'Vérifier une situation',
      secondary: 'Voir les exemples',
    },
    categories: [
      { label: 'Logement', icon: Building2 },
      { label: 'Emploi', icon: BriefcaseBusiness },
      { label: 'Immigration', icon: Landmark },
      { label: 'Vérification', icon: ShieldCheck },
    ],
    examplesTitle: 'À quoi ressemble une arnaque ?',
    examples: [
      {
        title: 'Faux email IRCC',
        preview: "Vous devez payer 250$ pour valider votre demande d'immigration...",
        flags: ['IRCC ne demande jamais de paiement par email', 'Lien non-gouvernemental', 'Pression urgente'],
        lesson: 'IRCC communique seulement via le portail officiel ou par courrier postal.',
      },
      {
        title: 'Fausse annonce de logement',
        preview: 'Appartement disponible, visites sur rendez-vous, dépôt requis avant visite...',
        flags: ['Dépôt sans visite réelle', 'Prix trop bas', 'Propriétaire absent'],
        lesson: "Ne verse jamais un dépôt avant d'avoir visité en personne.",
      },
      {
        title: 'Faux consultant en immigration',
        preview: "Je peux t'obtenir ton permis en 2 semaines, frais de dossier 800$...",
        flags: ['Promesse de résultat garanti', 'Non inscrit au CISR', 'Paiement hors facture'],
        lesson: 'Seuls les membres du CISR sont autorisés à représenter des clients en immigration.',
      },
    ],
    checksTitle: '4 vérifications que tu peux faire maintenant',
    checks: [
      {
        title: 'Vérifier un organisme fédéral',
        text: 'Tous les ministères fédéraux ont un site en .gc.ca. Méfie-toi des copies.',
        href: 'https://www.canada.ca',
        label: 'canada.ca',
      },
      {
        title: 'Vérifier un consultant',
        text: 'Seuls les membres du CISR (ICCRC) peuvent représenter des clients en immigration.',
        href: 'https://www.iccrc-crcic.ca',
        label: 'iccrc-crcic.ca',
      },
      {
        title: 'Appeler IRCC directement',
        text: 'Le numéro officiel est le 1-888-242-2100. Ne rappelle jamais un numéro inconnu.',
        phone: '1-888-242-2100',
      },
      {
        title: 'Signaler une fraude',
        text: 'Centre antifraude du Canada — signale en ligne ou appelle le 1-888-495-8501.',
        href: 'https://www.antifraudcentre-centreantifraude.ca',
        label: 'antifraudcentre-centreantifraude.ca',
      },
    ],
    comparisonTitle: "Comment distinguer le légitime de l'arnaque",
    comparisonHeaders: ['Légitime', 'Arnaque'],
    comparisonRows: [
      ['Site officiel .gc.ca ou .ca reconnu', 'Site copié ou adresse email douteuse'],
      ['Pas de paiement avant service confirmé', 'Dépôt ou frais requis avant toute confirmation'],
      ['Identité vérifiable (CISR, barreau)', "Aucun numéro d'inscription ou de licence"],
      ['Délais réalistes', 'Promesses de résultat garanti ou rapide'],
      ['Contrat écrit signé', 'Accord verbal uniquement'],
    ],
    final: {
      title: "Un doute ? Parle-en avant d'agir.",
      subtitle: "Un appel gratuit de 15 minutes peut t'aider à clarifier la situation avant de payer.",
      cta: 'Réserver un appel gratuit',
      disabled: 'Appel orientation — bientôt disponible',
    },
  },
  en: {
    metaTitle: 'Before you pay anyone, verify. | Marhaban Canada',
    metaDescription: 'Recognize the signals, verify sources, avoid common traps in Canada.',
    hero: {
      title: 'Before you pay anyone, verify.',
      subtitle: 'Recognize the signals, verify sources, avoid common traps in Canada.',
      primary: 'Verify a situation',
      secondary: 'See examples',
    },
    categories: [
      { label: 'Housing', icon: Building2 },
      { label: 'Employment', icon: BriefcaseBusiness },
      { label: 'Immigration', icon: Landmark },
      { label: 'Verification', icon: ShieldCheck },
    ],
    examplesTitle: 'What does a scam look like?',
    examples: [
      {
        title: 'Fake IRCC email',
        preview: 'You must pay $250 to validate your immigration application...',
        flags: ['IRCC never asks for payment by email', 'Non-government link', 'Urgent pressure'],
        lesson: 'IRCC only communicates through the official portal or by postal mail.',
      },
      {
        title: 'Fake housing listing',
        preview: 'Apartment available, visits by appointment, deposit required before visit...',
        flags: ['Deposit without a real visit', 'Price too low', 'Landlord absent'],
        lesson: 'Never send a deposit before visiting in person.',
      },
      {
        title: 'Fake immigration consultant',
        preview: 'I can get your permit in 2 weeks, $800 file fee...',
        flags: ['Guaranteed result promise', 'Not registered with CICC', 'Payment outside invoice'],
        lesson: 'Only CICC members are authorized to represent immigration clients.',
      },
    ],
    checksTitle: '4 checks you can do right now',
    checks: [
      {
        title: 'Verify a federal agency',
        text: 'All federal departments have a .gc.ca website. Be careful with copies.',
        href: 'https://www.canada.ca',
        label: 'canada.ca',
      },
      {
        title: 'Verify a consultant',
        text: 'Only CICC (ICCRC) members can represent immigration clients.',
        href: 'https://www.iccrc-crcic.ca',
        label: 'iccrc-crcic.ca',
      },
      {
        title: 'Call IRCC directly',
        text: 'The official number is 1-888-242-2100. Never call back an unknown number.',
        phone: '1-888-242-2100',
      },
      {
        title: 'Report fraud',
        text: 'Canadian Anti-Fraud Centre — report online or call 1-888-495-8501.',
        href: 'https://www.antifraudcentre-centreantifraude.ca',
        label: 'antifraudcentre-centreantifraude.ca',
      },
    ],
    comparisonTitle: 'How to tell legitimate from scam',
    comparisonHeaders: ['Legitimate', 'Scam'],
    comparisonRows: [
      ['Official .gc.ca or recognized .ca website', 'Copied site or suspicious email address'],
      ['No payment before confirmed service', 'Deposit or fees required before any confirmation'],
      ['Verifiable identity (CICC, bar association)', 'No registration or licence number'],
      ['Realistic timelines', 'Guaranteed or fast result promises'],
      ['Signed written contract', 'Verbal agreement only'],
    ],
    final: {
      title: 'A doubt? Talk about it before acting.',
      subtitle: 'A free 15-minute call can help you clarify the situation before paying.',
      cta: 'Book a free call',
      disabled: 'Orientation call — coming soon',
    },
  },
  ar: {
    metaTitle: 'قبل أن تدفع لأي شخص، تحقق. | مرحبا كندا',
    metaDescription: 'تعرّف على الإشارات، تحقق من المصادر، وتجنّب الفخاخ الشائعة في كندا.',
    hero: {
      title: 'قبل أن تدفع لأي شخص، تحقق.',
      subtitle: 'تعرّف على الإشارات، تحقق من المصادر، وتجنّب الفخاخ الشائعة في كندا.',
      primary: 'تحقق من وضع',
      secondary: 'رؤية الأمثلة',
    },
    categories: [
      { label: 'السكن', icon: Building2 },
      { label: 'العمل', icon: BriefcaseBusiness },
      { label: 'الهجرة', icon: Landmark },
      { label: 'التحقق', icon: ShieldCheck },
    ],
    examplesTitle: 'كيف تبدو عملية الاحتيال؟',
    examples: [
      {
        title: 'بريد مزيف من IRCC',
        preview: 'يجب أن تدفع 250 دولاراً لتأكيد طلب الهجرة الخاص بك...',
        flags: ['IRCC لا تطلب الدفع عبر البريد الإلكتروني', 'رابط غير حكومي', 'ضغط عاجل'],
        lesson: 'تتواصل IRCC فقط عبر البوابة الرسمية أو البريد العادي.',
      },
      {
        title: 'إعلان سكن مزيف',
        preview: 'شقة متاحة، الزيارات بموعد، وديعة مطلوبة قبل الزيارة...',
        flags: ['وديعة بدون زيارة حقيقية', 'سعر منخفض جداً', 'المالك غائب'],
        lesson: 'لا تدفع وديعة أبداً قبل أن تزور السكن شخصياً.',
      },
      {
        title: 'مستشار هجرة مزيف',
        preview: 'أستطيع الحصول على تصريحك خلال أسبوعين، رسوم الملف 800 دولار...',
        flags: ['وعد بنتيجة مضمونة', 'غير مسجل لدى CICC', 'دفع بدون فاتورة'],
        lesson: 'أعضاء CICC فقط مخولون بتمثيل العملاء في الهجرة.',
      },
    ],
    checksTitle: '4 تحققات يمكنك إجراؤها الآن',
    checks: [
      {
        title: 'التحقق من جهة فيدرالية',
        text: 'كل الوزارات الفيدرالية لديها موقع ينتهي بـ .gc.ca. احذر من النسخ المقلدة.',
        href: 'https://www.canada.ca',
        label: 'canada.ca',
      },
      {
        title: 'التحقق من مستشار',
        text: 'أعضاء CICC (ICCRC) فقط يمكنهم تمثيل العملاء في الهجرة.',
        href: 'https://www.iccrc-crcic.ca',
        label: 'iccrc-crcic.ca',
      },
      {
        title: 'الاتصال بـ IRCC مباشرة',
        text: 'الرقم الرسمي هو 1-888-242-2100. لا تعاود الاتصال برقم مجهول.',
        phone: '1-888-242-2100',
      },
      {
        title: 'الإبلاغ عن احتيال',
        text: 'المركز الكندي لمكافحة الاحتيال — بلّغ عبر الإنترنت أو اتصل بـ 1-888-495-8501.',
        href: 'https://www.antifraudcentre-centreantifraude.ca',
        label: 'antifraudcentre-centreantifraude.ca',
      },
    ],
    comparisonTitle: 'كيف تميّز الشرعي من الاحتيال',
    comparisonHeaders: ['شرعي', 'احتيال'],
    comparisonRows: [
      ['موقع رسمي .gc.ca أو .ca معروف', 'موقع منسوخ أو بريد إلكتروني مشبوه'],
      ['لا دفع قبل تأكيد الخدمة', 'وديعة أو رسوم قبل أي تأكيد'],
      ['هوية قابلة للتحقق (CICC، نقابة المحامين)', 'لا رقم تسجيل أو ترخيص'],
      ['مواعيد واقعية', 'وعود بنتيجة مضمونة أو سريعة'],
      ['عقد مكتوب وموقّع', 'اتفاق شفهي فقط'],
    ],
    final: {
      title: 'شك؟ تحدث عنه قبل أن تتصرف.',
      subtitle: 'مكالمة مجانية مدتها 15 دقيقة يمكن أن تساعدك على توضيح الوضع قبل الدفع.',
      cta: 'احجز مكالمة مجانية',
      disabled: 'مكالمة التوجيه — قريباً',
    },
  },
} as const satisfies Record<Locale, {
  metaTitle: string;
  metaDescription: string;
  hero: { title: string; subtitle: string; primary: string; secondary: string };
  categories: readonly { label: string; icon: typeof Building2 }[];
  examplesTitle: string;
  examples: readonly { title: string; preview: string; flags: readonly string[]; lesson: string }[];
  checksTitle: string;
  checks: readonly { title: string; text: string; href?: string; label?: string; phone?: string }[];
  comparisonTitle: string;
  comparisonHeaders: readonly [string, string];
  comparisonRows: readonly (readonly [string, string])[];
  final: { title: string; subtitle: string; cta: string; disabled: string };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';
  return { title: copy[locale].metaTitle, description: copy[locale].metaDescription };
}

export default async function AntiArnaquePage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const { dir, lang } = getHtmlAttrs(locale);
  const t = copy[locale];

  return (
    <PageShell dir={dir} lang={lang}>
      <Section tone="dark" className="!py-12 sm:!py-14 lg:!py-16">
        <div className="max-w-4xl">
          <h1 className="font-heading text-4xl font-semibold leading-[0.98] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">{t.hero.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#verifier"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-marhaban-gold px-7 py-3 text-sm font-bold text-marhaban-ink shadow-[0_18px_55px_rgba(213,168,79,0.28)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark"
            >
              {t.hero.primary}
            </a>
            <a
              href="#exemples"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/16 bg-white/[0.06] px-7 py-3 text-sm font-bold text-white transition hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark"
            >
              {t.hero.secondary}
            </a>
          </div>
        </div>
      </Section>

      <Section className="!py-8 sm:!py-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {t.categories.map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl border border-marhaban-leaf/15 bg-white p-4 shadow-warm-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-warm">
              <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-marhaban-mint text-marhaban-forestDark">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="font-heading text-base font-semibold text-marhaban-ink">{label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="exemples" className="scroll-mt-28 !bg-white !py-12 sm:!py-14 lg:!py-16">
        <h2 className="max-w-3xl font-heading text-3xl font-semibold leading-tight text-marhaban-ink sm:text-4xl">
          {t.examplesTitle}
        </h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {t.examples.map((example) => (
            <article key={example.title} className="flex h-full flex-col rounded-[1.5rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-warm">
              <h3 className="font-heading text-xl font-semibold text-marhaban-forestDark">{example.title}</h3>
              <p className="mt-4 rounded-2xl border border-marhaban-leaf/12 border-l-4 border-l-marhaban-clay/40 bg-marhaban-cream/70 p-4 text-sm italic leading-relaxed text-marhaban-ink">
                &quot;{example.preview}&quot;
              </p>
              <ul className="mt-5 space-y-2">
                {example.flags.map((flag) => (
                  <li key={flag} className="flex items-start gap-2 text-sm leading-relaxed text-marhaban-muted">
                    <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-marhaban-clay" aria-hidden="true" />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-marhaban-leaf/12 pt-4 text-sm font-semibold leading-relaxed text-marhaban-ink">
                {example.lesson}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="verifier" className="scroll-mt-28 !py-12 sm:!py-14 lg:!py-16">
        <h2 className="max-w-3xl font-heading text-3xl font-semibold leading-tight text-marhaban-ink sm:text-4xl">
          {t.checksTitle}
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {t.checks.map((check) => (
            <article key={check.title} className="flex h-full flex-col rounded-[1.5rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-warm">
              <h3 className="font-heading text-xl font-semibold text-marhaban-forestDark">{check.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-marhaban-muted">{check.text}</p>
              {'href' in check && 'label' in check ? (
                <a
                  href={check.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-bold text-marhaban-leaf transition hover:text-marhaban-forestDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-2"
                >
                  {check.label}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : (
                <p className="mt-5 font-mono text-sm font-bold text-marhaban-forestDark">{check.phone}</p>
              )}
            </article>
          ))}
        </div>
      </Section>

      <Section className="!bg-white !py-12 sm:!py-14 lg:!py-16">
        <h2 className="max-w-3xl font-heading text-3xl font-semibold leading-tight text-marhaban-ink sm:text-4xl">
          {t.comparisonTitle}
        </h2>
        <div className="mt-8 hidden overflow-hidden rounded-[1.5rem] border border-marhaban-leaf/15 bg-white shadow-warm-sm md:block">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="bg-marhaban-mint/55 px-6 py-4 text-start font-bold text-marhaban-leaf">
                  {t.comparisonHeaders[0]}
                </th>
                <th className="bg-marhaban-alertBg/55 px-6 py-4 text-start font-bold text-marhaban-clay">
                  {t.comparisonHeaders[1]}
                </th>
              </tr>
            </thead>
            <tbody>
              {t.comparisonRows.map(([legit, scam]) => (
                <tr key={legit} className="border-t border-marhaban-leaf/10 transition-colors hover:bg-marhaban-mint/15">
                  <td className="w-1/2 border-e border-marhaban-leaf/10 px-6 py-4 text-marhaban-ink">{legit}</td>
                  <td className="w-1/2 px-6 py-4 text-marhaban-muted">{scam}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 grid gap-4 md:hidden">
          {t.comparisonRows.map(([legit, scam]) => (
            <article key={legit} className="rounded-[1.25rem] border border-marhaban-leaf/15 bg-white p-5 shadow-warm-sm">
              <p className="flex items-start gap-2 text-sm font-semibold leading-relaxed text-marhaban-ink">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-marhaban-leaf" aria-hidden="true" />
                {legit}
              </p>
              <p className="mt-3 flex items-start gap-2 border-t border-marhaban-leaf/10 pt-3 text-sm leading-relaxed text-marhaban-muted">
                <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-marhaban-clay" aria-hidden="true" />
                {scam}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="dark" className="!py-10 sm:!py-12 lg:!py-14">
        <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl">{t.final.title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/78 sm:text-base">{t.final.subtitle}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <BookingModalTrigger
              locale={locale}
              href={`/${locale}/reserver/formulaire`}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-marhaban-gold px-7 py-3 text-sm font-bold text-marhaban-ink shadow-[0_18px_55px_rgba(213,168,79,0.28)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark"
            >
              {t.final.cta}
              <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
            </BookingModalTrigger>
            <span
              aria-disabled="true"
              className="inline-flex min-h-[52px] cursor-not-allowed select-none items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-7 py-3 text-sm font-semibold text-white/45"
            >
              {t.final.disabled}
            </span>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
