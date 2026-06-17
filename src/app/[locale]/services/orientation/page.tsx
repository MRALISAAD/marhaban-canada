import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getHtmlAttrs, isLocale, type Locale } from '@/i18n/locales';
import { bookingPath } from '@/lib/routes';
import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/sections/PageHero';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import bookingCopyData from '@/content/bookingCopy.json';
import { legalDisclaimer } from '@/content/legalDisclaimer';

type Props = { params: Promise<{ locale: string }> };

type BookingCatalog = {
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
    eyebrow: 'Service principal',
    title: 'Un appel pour clarifier tes prochaines étapes au Canada.',
    subtitle:
      'Tu prépares ton arrivée ou tu viens d’arriver ? Marhaban Canada t’aide à organiser tes priorités, éviter les erreurs courantes et repartir avec un plan simple.',
    primary: 'Réserver un appel',
    secondary: 'Voir comment ça marche',
    heroPills: ['Orientation pratique', '30 minutes', '29 $', 'FR / EN / AR'],
    problemEyebrow: 'Le problème',
    problemTitle: 'Quand tout arrive en même temps, on perd vite le fil.',
    problemText:
      'Entre les documents, le logement, la banque, le téléphone, les études, le travail et les arnaques, beaucoup de nouveaux arrivants avancent sans ordre clair. Cet appel sert à remettre les choses dans le bon sens.',
    problemBullets: [
      'Trop d’informations contradictoires en ligne',
      'Des décisions à prendre sans repère local',
      'Une peur de faire une erreur coûteuse',
      'Le besoin d’une prochaine étape simple',
    ],
    whoEyebrow: 'Pour qui',
    whoTitle: 'Pour les personnes qui ont besoin d’un premier cadre clair.',
    whoText:
      'Le service est pensé pour les nouveaux arrivants, les étudiants et les familles qui veulent un échange humain, concret et sans promesse irréaliste.',
    whoItems: [
      {
        title: 'Je prépare mon arrivée',
        text: 'Je veux arriver avec un ordre simple pour ne pas improviser au dernier moment.',
      },
      {
        title: 'Je viens d’arriver',
        text: 'Je veux comprendre ce qui est prioritaire maintenant, pas dans trois semaines.',
      },
      {
        title: 'Je suis étudiant',
        text: 'Je veux mieux organiser mes démarches et éviter les mauvaises infos.',
      },
      {
        title: 'Je cherche un logement',
        text: 'Je veux savoir quoi vérifier avant de m’engager ou de payer.',
      },
      {
        title: 'J’ai peur d’une arnaque',
        text: 'Je veux un second regard avant d’envoyer de l’argent ou des documents.',
      },
      {
        title: 'Je veux parler à quelqu’un',
        text: 'Je préfère un échange humain plutôt que de rester seul devant dix onglets.',
      },
    ],
    includedEyebrow: 'Ce qui est inclus',
    includedTitle: 'Ce que tu obtiens pendant et après l’appel.',
    includedText:
      'L’objectif n’est pas de tout faire, mais de t’aider à avancer avec une vision claire et des priorités utiles.',
    included: [
      'Analyse simple de ta situation',
      'Priorités pratiques à faire dans l’ordre',
      'Checklist personnalisée simple',
      'Ressources officielles utiles',
      'Résumé clair après l’appel',
    ],
    notIncludedEyebrow: 'Ce qui n’est pas inclus',
    notIncludedTitle: 'Des limites claires, sans ambiguïté.',
    notIncludedText:
      'Ce service reste un accompagnement pratique et informatif. Il ne remplace pas les professionnels autorisés ni les institutions officielles.',
    notIncluded: [
      'Pas de conseil en immigration',
      'Pas de conseil juridique',
      'Pas de garantie de résultat',
      'Pas de remplissage officiel de formulaires',
      'Pas de remplacement d’un professionnel autorisé',
    ],
    processEyebrow: 'Comment ça marche',
    processTitle: 'Un déroulé simple, du premier clic à la prochaine étape.',
    processText:
      'L’expérience doit être fluide. Tu sais quoi faire, pourquoi tu le fais, et ce que tu recevras ensuite.',
    processSteps: [
      {
        title: '1. Tu réserves un créneau',
        text: 'Tu cliques sur réserver et tu choisis un moment adapté à ton fuseau horaire.',
      },
      {
        title: '2. Tu expliques ta situation',
        text: 'Tu partages le contexte utile, sans avoir besoin d’écrire un long message.',
      },
      {
        title: '3. On clarifie les priorités',
        text: 'On remet de l’ordre dans les démarches, les urgences et les points à vérifier.',
      },
      {
        title: '4. Tu repars avec un plan',
        text: 'Tu repars avec une direction simple, des ressources et un résumé clair.',
      },
    ],
    priceEyebrow: 'Prix',
    priceTitle: 'Appel orientation — 30 min',
    priceText: '29 $',
    priceBody:
      'C’est l’offre la plus simple pour commencer si tu veux un vrai point de départ, pas une liste d’informations de plus.',
    priceHighlights: ['30 minutes', 'Orientation pratique', 'Résumé après l’appel', 'FR / EN / AR'],
    faqEyebrow: 'Questions fréquentes',
    faqTitle: 'Avant de réserver.',
    faq: [
      ['Est-ce un service d’immigration ?', 'Non. Marhaban Canada offre de l’orientation pratique et de l’information générale seulement.'],
      ['Est-ce que vous remplissez les formulaires ?', 'Non. On t’aide à comprendre et à organiser tes prochaines étapes, sans faire de conseil réglementé.'],
      ['Puis-je réserver avant d’arriver ?', 'Oui. Le service est utile avant l’arrivée comme après l’installation.'],
      ['Est-ce utile si je suis étudiant ?', 'Oui. Le format aide à clarifier les priorités, les ressources et les erreurs à éviter.'],
      ['Qu’est-ce que je reçois après l’appel ?', 'Un résumé clair avec les priorités, les ressources utiles et la prochaine étape.'],
      ['Puis-je parler en arabe ou en anglais ?', 'Oui. Tu peux choisir la langue de l’appel selon ta préférence.'],
    ],
    finalEyebrow: 'Prêt à avancer',
    finalTitle: 'Tu n’as pas besoin de tout comprendre pour commencer.',
    finalText: 'Réserve un appel d’orientation et repars avec une prochaine étape claire, simple et utile.',
    finalCta: 'Réserver un appel',
  },
  en: {
    eyebrow: 'Main service',
    title: 'A call to clarify your next steps in Canada.',
    subtitle:
      'If you are preparing to arrive or have just arrived, Marhaban Canada helps you organize priorities, avoid common mistakes, and leave with a simple plan.',
    primary: 'Book a call',
    secondary: 'See how it works',
    heroPills: ['Practical orientation', '30 minutes', '$29', 'FR / EN / AR'],
    problemEyebrow: 'The problem',
    problemTitle: 'When everything happens at once, it is easy to lose the thread.',
    problemText:
      'Documents, housing, banking, phone, school, work, and scams can all land at the same time. This call helps you bring order back into the process.',
    problemBullets: [
      'Too much conflicting information online',
      'Decisions to make without local context',
      'Fear of making a costly mistake',
      'The need for one clear next step',
    ],
    whoEyebrow: 'Who it is for',
    whoTitle: 'For people who need a first clear frame.',
    whoText:
      'This service is made for newcomers, students, and families who want a human, practical exchange without unrealistic promises.',
    whoItems: [
      {
        title: 'I am preparing to arrive',
        text: 'I want to arrive with a simple order instead of improvising at the last minute.',
      },
      {
        title: 'I just arrived',
        text: 'I want to know what matters first, not in three weeks.',
      },
      {
        title: 'I am a student',
        text: 'I want to organize my steps and avoid bad information.',
      },
      {
        title: 'I am looking for housing',
        text: 'I want to know what to check before I commit or pay.',
      },
      {
        title: 'I am worried about a scam',
        text: 'I want a second look before sending money or documents.',
      },
      {
        title: 'I want to speak with someone',
        text: 'I prefer a human exchange instead of ten tabs and guesswork.',
      },
    ],
    includedEyebrow: 'What is included',
    includedTitle: 'What you get during and after the call.',
    includedText:
      'The goal is not to solve everything. It is to help you move forward with clear priorities and useful direction.',
    included: [
      'Simple review of your situation',
      'Practical priorities in order',
      'Simple personalized checklist',
      'Useful official resources',
      'Clear summary after the call',
    ],
    notIncludedEyebrow: 'What is not included',
    notIncludedTitle: 'Clear boundaries, no ambiguity.',
    notIncludedText:
      'This service stays practical and informative. It does not replace authorized professionals or official institutions.',
    notIncluded: [
      'No immigration advice',
      'No legal advice',
      'No guaranteed outcome',
      'No official form completion',
      'No replacement for an authorized professional',
    ],
    processEyebrow: 'How it works',
    processTitle: 'A simple flow, from the first click to the next step.',
    processText:
      'The experience should feel easy. You know what to do, why you are doing it, and what happens next.',
    processSteps: [
      {
        title: '1. You book a slot',
        text: 'You click book and choose a time that fits your schedule and timezone.',
      },
      {
        title: '2. You explain your situation',
        text: 'You share the useful context without needing to write a long message.',
      },
      {
        title: '3. We clarify priorities',
        text: 'We sort out the steps, the urgency, and what should be checked first.',
      },
      {
        title: '4. You leave with a plan',
        text: 'You get a simple direction, useful resources, and a clear summary.',
      },
    ],
    priceEyebrow: 'Price',
    priceTitle: 'Orientation call — 30 min',
    priceText: '$29',
    priceBody:
      'This is the simplest starting offer if you want a real point of direction, not another pile of information.',
    priceHighlights: ['30 minutes', 'Practical orientation', 'Summary after the call', 'FR / EN / AR'],
    faqEyebrow: 'FAQ',
    faqTitle: 'Before you book.',
    faq: [
      ['Is this an immigration service?', 'No. Marhaban Canada offers practical orientation and general information only.'],
      ['Do you fill out forms?', 'No. We help you understand and organize your next steps, without regulated advice.'],
      ['Can I book before I arrive?', 'Yes. The service is useful before arrival and after settlement.'],
      ['Is this useful for students?', 'Yes. It helps clarify priorities, resources, and mistakes to avoid.'],
      ['What do I receive after the call?', 'A clear summary with priorities, useful resources, and the next step.'],
      ['Can I speak Arabic or English?', 'Yes. You can choose the call language you prefer.'],
    ],
    finalEyebrow: 'Ready to move forward',
    finalTitle: 'You do not need to understand everything to start.',
    finalText: 'Book an orientation call and leave with one clear, useful next step.',
    finalCta: 'Book a call',
  },
  ar: {
    eyebrow: 'الخدمة الرئيسية',
    title: 'مكالمة توضّح خطوتك التالية في كندا.',
    subtitle:
      'إذا كنت تستعد للوصول أو وصلت للتو، تساعدك مرحبا كندا على ترتيب الأولويات وتجنب الأخطاء الشائعة والخروج بخطة بسيطة.',
    primary: 'احجز مكالمة',
    secondary: 'شاهد كيف يعمل الأمر',
    heroPills: ['توجيه عملي', '30 دقيقة', '29 $', 'FR / EN / AR'],
    problemEyebrow: 'المشكلة',
    problemTitle: 'عندما يحدث كل شيء دفعة واحدة، من السهل أن تضيع.',
    problemText:
      'الوثائق، السكن، البنك، الهاتف، الدراسة، العمل، والاحتيال قد تظهر جميعها في الوقت نفسه. هذه المكالمة تعيد ترتيب الأمور.',
    problemBullets: [
      'معلومات كثيرة ومتضاربة على الإنترنت',
      'قرارات يجب اتخاذها من دون سياق محلي',
      'الخوف من ارتكاب خطأ مكلف',
      'الحاجة إلى خطوة تالية واضحة',
    ],
    whoEyebrow: 'لمن هي',
    whoTitle: 'للأشخاص الذين يحتاجون إلى إطار أولي واضح.',
    whoText:
      'هذه الخدمة مصممة للقادمين الجدد والطلاب والعائلات الذين يريدون تبادلاً عملياً وإنسانياً من دون وعود غير واقعية.',
    whoItems: [
      {
        title: 'أحضّر لوصولي',
        text: 'أريد الوصول مع ترتيب بسيط بدل الارتجال في اللحظة الأخيرة.',
      },
      {
        title: 'وصلت للتو',
        text: 'أريد معرفة ما يهم أولاً، وليس بعد ثلاثة أسابيع.',
      },
      {
        title: 'أنا طالب',
        text: 'أريد ترتيب خطواتي وتجنب المعلومات الخاطئة.',
      },
      {
        title: 'أبحث عن سكن',
        text: 'أريد معرفة ما يجب التحقق منه قبل الالتزام أو الدفع.',
      },
      {
        title: 'أخشى من احتيال',
        text: 'أريد رأياً ثانياً قبل إرسال المال أو الوثائق.',
      },
      {
        title: 'أريد التحدث مع شخص',
        text: 'أفضل تواصلاً إنسانياً بدل عشر نوافذ مفتوحة والتخمين.',
      },
    ],
    includedEyebrow: 'ما هو متضمن',
    includedTitle: 'ما الذي تحصل عليه أثناء المكالمة وبعدها.',
    includedText:
      'الهدف ليس حل كل شيء، بل مساعدتك على التقدم بأولويات واضحة وتوجيه مفيد.',
    included: [
      'مراجعة بسيطة لوضعك',
      'أولويات عملية بالترتيب',
      'قائمة تحقق شخصية مبسطة',
      'موارد رسمية مفيدة',
      'ملخص واضح بعد المكالمة',
    ],
    notIncludedEyebrow: 'ما ليس متضمناً',
    notIncludedTitle: 'حدود واضحة بلا غموض.',
    notIncludedText:
      'تبقى هذه الخدمة عملية ومعلوماتية. وهي لا تحل محل المهنيين المرخصين أو المؤسسات الرسمية.',
    notIncluded: [
      'لا نصائح هجرة',
      'لا نصائح قانونية',
      'لا ضمان للنتيجة',
      'لا إكمال رسمي للنماذج',
      'لا بديل عن مهني مرخص',
    ],
    processEyebrow: 'كيف يعمل الأمر',
    processTitle: 'مسار بسيط من أول نقرة إلى الخطوة التالية.',
    processText:
      'يجب أن تكون التجربة سهلة. تعرف ماذا تفعل، ولماذا تفعل ذلك، وما الذي سيحدث بعده.',
    processSteps: [
      {
        title: '1. تحجز موعداً',
        text: 'تنقر على الحجز وتختار وقتاً مناسباً لجدولك الزمني.',
      },
      {
        title: '2. تشرح وضعك',
        text: 'تشارك السياق المفيد من دون الحاجة إلى كتابة رسالة طويلة.',
      },
      {
        title: '3. نوضح الأولويات',
        text: 'نرتب الخطوات والاستعجال وما يجب التحقق منه أولاً.',
      },
      {
        title: '4. تخرج بخطة',
        text: 'تحصل على اتجاه بسيط وموارد مفيدة وملخص واضح.',
      },
    ],
    priceEyebrow: 'السعر',
    priceTitle: 'مكالمة توجيه — 30 دقيقة',
    priceText: '29 $',
    priceBody:
      'هذه هي أسهل نقطة بداية إذا كنت تريد توجيهاً حقيقياً، وليس مجرد معلومات إضافية.',
    priceHighlights: ['30 دقيقة', 'توجيه عملي', 'ملخص بعد المكالمة', 'FR / EN / AR'],
    faqEyebrow: 'أسئلة شائعة',
    faqTitle: 'قبل الحجز.',
    faq: [
      ['هل هذه خدمة هجرة؟', 'لا. مرحبا كندا تقدم توجيهاً عملياً ومعلومات عامة فقط.'],
      ['هل تملؤون النماذج؟', 'لا. نساعدك على فهم وتنظيم خطواتك التالية، من دون نصائح مرخصة.'],
      ['هل يمكنني الحجز قبل الوصول؟', 'نعم. الخدمة مفيدة قبل الوصول وبعد الاستقرار.'],
      ['هل هي مفيدة للطلاب؟', 'نعم. تساعد على توضيح الأولويات والموارد والأخطاء التي يجب تجنبها.'],
      ['ماذا سأستلم بعد المكالمة؟', 'ملخص واضح فيه الأولويات والموارد المفيدة والخطوة التالية.'],
      ['هل يمكنني التحدث بالعربية أو الإنجليزية؟', 'نعم. يمكنك اختيار لغة المكالمة التي تفضلها.'],
    ],
    finalEyebrow: 'جاهز للتقدم',
    finalTitle: 'لا تحتاج أن تفهم كل شيء لتبدأ.',
    finalText: 'احجز مكالمة توجيه واخرج بخطوة تالية واضحة ومفيدة.',
    finalCta: 'احجز مكالمة',
  },
} as const satisfies Record<Locale, {
  eyebrow: string;
  title: string;
  subtitle: string;
  primary: string;
  secondary: string;
  heroPills: readonly string[];
  problemEyebrow: string;
  problemTitle: string;
  problemText: string;
  problemBullets: readonly string[];
  whoEyebrow: string;
  whoTitle: string;
  whoText: string;
  whoItems: readonly { title: string; text: string }[];
  includedEyebrow: string;
  includedTitle: string;
  includedText: string;
  included: readonly string[];
  notIncludedEyebrow: string;
  notIncludedTitle: string;
  notIncludedText: string;
  notIncluded: readonly string[];
  processEyebrow: string;
  processTitle: string;
  processText: string;
  processSteps: readonly { title: string; text: string }[];
  priceEyebrow: string;
  priceTitle: string;
  priceText: string;
  priceBody: string;
  priceHighlights: readonly string[];
  faqEyebrow: string;
  faqTitle: string;
  faq: readonly [string, string][];
  finalEyebrow: string;
  finalTitle: string;
  finalText: string;
  finalCta: string;
}>;

function LabelList({ items, dark = false }: { items: readonly string[]; dark?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className={[
            'rounded-2xl border px-4 py-3 text-sm leading-relaxed',
            dark
              ? 'border-white/12 bg-white/[0.06] text-[#edf7f2]'
              : 'border-marhaban-leaf/12 bg-marhaban-cream/70 text-marhaban-muted',
          ].join(' ')}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';
  return {
    title: `${copy[locale].title} | Marhaban Canada`,
    description: copy[locale].subtitle,
  };
}

export default async function OrientationServicePage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const { dir, lang } = getHtmlAttrs(locale);
  const t = copy[locale];
  const service = (bookingCopyData as Record<Locale, BookingCatalog>)[locale].services[1];

  return (
    <PageShell dir={dir} lang={lang}>
      <PageHero
        dark
        eyebrow={t.eyebrow}
        title={t.title}
        text={t.subtitle}
        primary={{ label: t.primary, href: bookingPath(locale) }}
        secondary={{ label: t.secondary, href: '#how-it-works' }}
        pills={t.heroPills}
        visual={
          <div className="space-y-4">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5 shadow-[0_22px_80px_rgba(0,0,0,0.18)]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/12 bg-white/[0.08] px-3 py-1 text-xs font-semibold text-[#edf7f2]">
                  {t.priceEyebrow}
                </span>
                <span className="badge-gold">{service.betaLabel ?? t.priceText}</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold leading-tight text-white">{t.priceTitle}</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-marhaban-sand">{t.priceText}</p>
              <p className="mt-4 text-sm leading-relaxed text-[#edf7f2]">{t.priceBody}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {t.priceHighlights.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-[#edf7f2]">
                  {item}
                </div>
              ))}
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 text-sm leading-relaxed text-[#edf7f2]">
              <p className="font-semibold text-white">{locale === 'fr' ? 'Ce que tu repars avec' : locale === 'en' ? 'What you leave with' : 'ما الذي ستخرج به'}</p>
              <p className="mt-2">
                {locale === 'fr'
                  ? 'Une prochaine étape claire, des ressources utiles et un résumé après l’appel.'
                  : locale === 'en'
                    ? 'A clear next step, useful resources, and a summary after the call.'
                    : 'خطوة تالية واضحة، وموارد مفيدة، وملخص بعد المكالمة.'}
              </p>
            </div>
          </div>
        }
      />

      <Section tone="muted">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm">
            <SectionHeader eyebrow={t.problemEyebrow} title={t.problemTitle} text={t.problemText} />
            <div className="mt-6 grid gap-3">
              {t.problemBullets.map((item) => (
                <div key={item} className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-mint/55 px-4 py-3 text-sm text-marhaban-ink">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm">
            <SectionHeader eyebrow={t.whoEyebrow} title={t.whoTitle} text={t.whoText} />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.whoItems.map((item) => (
                <article key={item.title} className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 p-4">
                  <h3 className="text-base font-semibold text-marhaban-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-marhaban-muted">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm">
            <SectionHeader eyebrow={t.includedEyebrow} title={t.includedTitle} text={t.includedText} />
            <div className="mt-6">
              <LabelList items={t.included} />
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm">
            <SectionHeader eyebrow={t.notIncludedEyebrow} title={t.notIncludedTitle} text={t.notIncludedText} />
            <div className="mt-6">
              <LabelList items={t.notIncluded} />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted" id="how-it-works">
        <SectionHeader eyebrow={t.processEyebrow} title={t.processTitle} text={t.processText} />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {t.processSteps.map((step, index) => (
            <article key={step.title} className="rounded-[1.6rem] border border-marhaban-leaf/15 bg-white p-5 shadow-warm-sm">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">0{index + 1}</p>
              <h3 className="mt-3 text-lg font-semibold leading-tight text-marhaban-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-marhaban-muted">{step.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm">
            <SectionHeader eyebrow={t.priceEyebrow} title={t.priceTitle} text={t.priceBody} />
            <div className="mt-6 flex flex-wrap gap-2">
              {t.priceHighlights.map((item) => (
                <span key={item} className="rounded-full border border-marhaban-leaf/15 bg-marhaban-mint/60 px-3 py-1.5 text-xs font-semibold text-marhaban-ink">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={bookingPath(locale)}
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-marhaban-forestDark px-6 py-3 text-sm font-bold text-white shadow-[0_18px_60px_rgba(8,42,36,0.18)] transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                {t.primary}
              </a>
            </div>
          </div>
          <ServiceCard service={{ ...service, label: service.betaLabel }} href={bookingPath(locale)} cta={t.primary} featured />
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeader eyebrow={t.faqEyebrow} title={t.faqTitle} text={locale === 'fr' ? 'Des réponses simples avant de réserver.' : locale === 'en' ? 'Simple answers before booking.' : 'إجابات بسيطة قبل الحجز.'} />
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {t.faq.map(([question, answer]) => (
            <article key={question} className="rounded-[1.5rem] border border-marhaban-leaf/15 bg-white p-5 shadow-warm-sm">
              <h3 className="text-base font-semibold text-marhaban-ink">{question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-marhaban-muted">{answer}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="dark" className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div className="rounded-[2rem] border border-white/12 bg-white/[0.06] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-sand">{t.finalEyebrow}</p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-3xl">{t.finalTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#edf7f2] sm:text-base">{t.finalText}</p>
            <div className="mt-6">
              <a
                href={bookingPath(locale)}
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-marhaban-gold px-6 py-3 text-sm font-bold text-marhaban-ink shadow-[0_20px_70px_rgba(213,168,79,0.24)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark"
              >
                {t.finalCta}
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/12 bg-white/[0.06] p-6 text-sm leading-relaxed text-[#edf7f2] shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-sand">
              {locale === 'fr' ? 'Disclaimer' : locale === 'en' ? 'Disclaimer' : 'إخلاء مسؤولية'}
            </p>
            <p className="mt-3">{legalDisclaimer[locale]}</p>
            <p className="mt-4 text-[#d8e7df]">
              {locale === 'fr'
                ? 'Ce service aide à clarifier et organiser les prochaines étapes. Il ne remplace pas un conseil juridique ou en immigration.'
                : locale === 'en'
                  ? 'This service helps clarify and organize next steps. It does not replace legal or immigration advice.'
                  : 'هذه الخدمة تساعد على توضيح وتنظيم الخطوات التالية. وهي لا تحل محل النصيحة القانونية أو الاستشارية في الهجرة.'}
            </p>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
