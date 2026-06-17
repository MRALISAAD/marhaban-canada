import type { Metadata } from 'next';
import { ArrowRight, Check, ShieldAlert, Compass, ShieldCheck, BookOpen, Phone } from 'lucide-react';
import { getHtmlAttrs, type Locale } from '@/i18n/locales';
import { bookingPath, orientationServicePath, antiScamServicePath, resourcesPath, startPath } from '@/lib/routes';
import { withLocale } from '@/lib/i18n-utils';
import { legalDisclaimer } from '@/content/legalDisclaimer';
import { PageHero } from '@/components/sections/PageHero';
import { RouteCard } from '@/components/sections/RouteCard';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { RoadmapStage } from '@/components/sections/RoadmapStage';
import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import LocalizedLink from '@/components/LocalizedLink';

type Props = { params: Promise<{ locale: string }> };

const homeCopy = {
  fr: {
    eyebrow: 'Marhaban Canada',
    title: 'Arriver au Canada, sans te sentir perdu.',
    text: 'Tu prépares ton arrivée ou tu viens d\'arriver ? On t\'aide à clarifier tes priorités, éviter les arnaques et avancer avec un plan simple.',
    primary: 'Réserver un appel',
    secondary: 'Comment ça marche',
    pills: ['Accompagnement pratique', 'FR / EN / AR', 'Anti-arnaque', 'Pas de conseil juridique'],
    visualLabel: 'Ce qu\'on couvre',
    visualTopics: [
      'Avant l\'arrivée', 'Première semaine',
      'Logement', 'Documents',
      'Banque', 'Santé',
      'Études', 'Anti-arnaque',
    ],
    trustItems: [
      { icon: '✦', label: 'Accompagnement pratique', desc: 'Priorités claires, pas de jargon.' },
      { icon: '⬡', label: 'Anti-arnaque', desc: 'Vérifie avant d\'agir ou de payer.' },
      { icon: '◈', label: 'Ressources claires', desc: 'Guides simples et vérifiés.' },
      { icon: '◎', label: 'Appel personnalisé', desc: '30 min, un plan fait pour toi.' },
    ],
    serviceEyebrow: 'Service principal',
    serviceTitle: 'Un appel pour clarifier ton départ.',
    serviceText: 'En 30 minutes, on trie ce qui est urgent et tu repars avec tes prochaines étapes.',
    situationEyebrow: 'Par où commencer',
    situationTitle: 'Quelle est ta situation ?',
    situationText: 'Choisis ton point de départ. On t\'oriente vers le bon service ou la bonne ressource.',
    processEyebrow: 'Comment ça marche',
    processTitle: 'Trois étapes. Du flou au plan clair.',
    processText: 'Un parcours simple et direct pour savoir quoi faire ensuite.',
    antiEyebrow: 'Anti-arnaque',
    antiTitle: 'Avant de payer quelqu\'un, vérifie.',
    antiText: 'Les arnaques ciblent les nouveaux arrivants. Quand un message t\'appuie pour aller vite, ralentis — c\'est souvent le signe qu\'il faut vérifier.',
    antiCta: 'Vérifier une situation',
    antiSecondary: 'Voir les ressources',
    resourceEyebrow: 'Guides pratiques',
    resourceTitle: 'Tout ce dont tu as besoin pour tes premiers jours.',
    resourceText: 'Des guides clairs et vérifiés, organisés par thème.',
    finalTitle: 'Tu n\'as pas besoin de tout comprendre seul.',
    finalText: 'Un appel de 30 minutes suffit pour clarifier tes priorités et repartir avec un plan.',
    finalCta: 'Réserver un appel',
    finalSecondary: 'Voir le service',
  },
  en: {
    eyebrow: 'Marhaban Canada',
    title: 'Arriving in Canada, without feeling lost.',
    text: 'Preparing your arrival or just landed? We help you clarify priorities, avoid scams, and move forward with a simple plan.',
    primary: 'Book a call',
    secondary: 'How it works',
    pills: ['Practical guidance', 'FR / EN / AR', 'Anti-scam', 'No legal advice'],
    visualLabel: 'What we cover',
    visualTopics: [
      'Before arrival', 'First week',
      'Housing', 'Documents',
      'Banking', 'Health',
      'Studies', 'Anti-scam',
    ],
    trustItems: [
      { icon: '✦', label: 'Practical support', desc: 'Clear priorities, no jargon.' },
      { icon: '⬡', label: 'Anti-scam', desc: 'Check before you act or pay.' },
      { icon: '◈', label: 'Clear resources', desc: 'Simple, verified guides.' },
      { icon: '◎', label: 'Personal call', desc: '30 min, a plan made for you.' },
    ],
    serviceEyebrow: 'Main service',
    serviceTitle: 'A call to clarify your first steps.',
    serviceText: 'In 30 minutes, we sort what\'s urgent and you leave with your next steps.',
    situationEyebrow: 'Where to start',
    situationTitle: 'What is your situation?',
    situationText: 'Choose your starting point. We\'ll guide you to the right service or resource.',
    processEyebrow: 'How it works',
    processTitle: 'Three steps. From uncertainty to clarity.',
    processText: 'A simple, direct path to knowing what to do next.',
    antiEyebrow: 'Anti-scam',
    antiTitle: 'Before paying someone, check.',
    antiText: 'Scams target newcomers. When a message pushes you to act fast, slow down — that\'s often the sign to verify.',
    antiCta: 'Check a situation',
    antiSecondary: 'See resources',
    resourceEyebrow: 'Practical guides',
    resourceTitle: 'Everything you need for your first days.',
    resourceText: 'Clear, verified guides organized by topic.',
    finalTitle: 'You don\'t need to figure it all out alone.',
    finalText: 'A 30-minute call is enough to clarify your priorities and leave with a plan.',
    finalCta: 'Book a call',
    finalSecondary: 'See the service',
  },
  ar: {
    eyebrow: 'مرحبا كندا',
    title: 'الوصول إلى كندا، دون الشعور بالضياع.',
    text: 'سواء كنت تستعد لقدومك أو وصلت للتو، نساعدك على توضيح أولوياتك وتجنب الاحتيال والتقدم بخطة بسيطة.',
    primary: 'احجز مكالمة',
    secondary: 'كيف يعمل',
    pills: ['توجيه عملي', 'FR / EN / AR', 'مكافحة الاحتيال', 'لا نصائح قانونية'],
    visualLabel: 'ما نغطيه',
    visualTopics: [
      'قبل الوصول', 'الأسبوع الأول',
      'السكن', 'الوثائق',
      'البنك', 'الصحة',
      'الدراسة', 'مكافحة الاحتيال',
    ],
    trustItems: [
      { icon: '✦', label: 'دعم عملي', desc: 'أولويات واضحة، بدون تعقيد.' },
      { icon: '⬡', label: 'مكافحة الاحتيال', desc: 'تحقق قبل أن تتصرف أو تدفع.' },
      { icon: '◈', label: 'موارد واضحة', desc: 'أدلة بسيطة وموثوقة.' },
      { icon: '◎', label: 'مكالمة شخصية', desc: '30 دقيقة، خطة مصممة لك.' },
    ],
    serviceEyebrow: 'الخدمة الرئيسية',
    serviceTitle: 'مكالمة لتوضيح خطواتك الأولى.',
    serviceText: 'في 30 دقيقة، نرتب ما هو عاجل وتغادر بخطواتك التالية.',
    situationEyebrow: 'من أين تبدأ',
    situationTitle: 'ما هو وضعك؟',
    situationText: 'اختر نقطة انطلاقك. سنرشدك إلى الخدمة أو المورد المناسب.',
    processEyebrow: 'كيف يعمل',
    processTitle: 'ثلاث خطوات. من الغموض إلى الوضوح.',
    processText: 'مسار بسيط ومباشر لمعرفة ما يجب فعله بعد ذلك.',
    antiEyebrow: 'مكافحة الاحتيال',
    antiTitle: 'قبل أن تدفع لأحد، تحقق.',
    antiText: 'تستهدف عمليات الاحتيال القادمين الجدد. عندما يضغط عليك أحدهم للتصرف بسرعة، تمهّل.',
    antiCta: 'تحقق من وضع',
    antiSecondary: 'عرض الموارد',
    resourceEyebrow: 'أدلة عملية',
    resourceTitle: 'كل ما تحتاجه لأيامك الأولى.',
    resourceText: 'أدلة واضحة وموثوقة، منظمة حسب الموضوع.',
    finalTitle: 'لا تحتاج إلى فهم كل شيء وحدك.',
    finalText: 'مكالمة 30 دقيقة كافية لتوضيح أولوياتك والمغادرة بخطة.',
    finalCta: 'احجز مكالمة',
    finalSecondary: 'عرض الخدمة',
  },
} as const satisfies Record<string, {
  eyebrow: string; title: string; text: string;
  primary: string; secondary: string; pills: readonly string[];
  visualLabel: string; visualTopics: readonly string[];
  trustItems: readonly { icon: string; label: string; desc: string }[];
  serviceEyebrow: string; serviceTitle: string; serviceText: string;
  situationEyebrow: string; situationTitle: string; situationText: string;
  processEyebrow: string; processTitle: string; processText: string;
  antiEyebrow: string; antiTitle: string; antiText: string; antiCta: string; antiSecondary: string;
  resourceEyebrow: string; resourceTitle: string; resourceText: string;
  finalTitle: string; finalText: string; finalCta: string; finalSecondary: string;
}>;

const trustIconMap: Record<string, typeof Compass> = {
  '✦': Compass,
  '⬡': ShieldCheck,
  '◈': BookOpen,
  '◎': Phone,
};

const situations = (locale: Locale) => [
  {
    title: locale === 'fr' ? 'Je prépare mon arrivée' : locale === 'en' ? 'Preparing my arrival' : 'أحضّر وصولي',
    text: locale === 'fr' ? 'Tu veux un ordre simple et les démarches prioritaires avant de partir.' : locale === 'en' ? 'You want a simple checklist and priority steps before you leave.' : 'تريد ترتيباً بسيطاً وخطوات أولوية قبل السفر.',
    href: orientationServicePath(locale),
    badge: locale === 'fr' ? 'Orientation' : locale === 'en' ? 'Orientation' : 'توجيه',
    cta: locale === 'fr' ? 'Découvrir' : locale === 'en' ? 'Discover' : 'اكتشف',
  },
  {
    title: locale === 'fr' ? 'Je viens d\'arriver' : locale === 'en' ? 'Just arrived' : 'وصلت للتو',
    text: locale === 'fr' ? 'Tu as besoin de repères rapides pour ta première semaine.' : locale === 'en' ? 'You need quick landmarks for your first week.' : 'تحتاج إلى نقاط مرجعية سريعة لأسبوعك الأول.',
    href: bookingPath(locale),
    badge: locale === 'fr' ? 'Appel rapide' : locale === 'en' ? 'Quick call' : 'مكالمة سريعة',
    cta: locale === 'fr' ? 'Réserver' : locale === 'en' ? 'Book' : 'احجز',
  },
  {
    title: locale === 'fr' ? 'Étudiant international' : locale === 'en' ? 'International student' : 'طالب دولي',
    text: locale === 'fr' ? 'Tu veux comprendre ce qui compte maintenant pour bien démarrer.' : locale === 'en' ? 'You want to understand what matters right now to start well.' : 'تريد فهم ما يهم الآن لبداية جيدة.',
    href: orientationServicePath(locale),
    badge: locale === 'fr' ? 'Étudiant' : locale === 'en' ? 'Student' : 'طالب',
    cta: locale === 'fr' ? 'Voir le service' : locale === 'en' ? 'See the service' : 'عرض الخدمة',
  },
  {
    title: locale === 'fr' ? 'Vérifier une arnaque' : locale === 'en' ? 'Verify a scam' : 'التحقق من احتيال',
    text: locale === 'fr' ? 'Tu as reçu un message suspect ou on te demande de l\'argent. Vérifie avant d\'agir.' : locale === 'en' ? 'You received a suspicious message or someone is asking for money. Check before you act.' : 'تلقيت رسالة مشبوهة أو يطلب منك أحدهم المال. تحقق قبل أن تتصرف.',
    href: antiScamServicePath(locale),
    badge: locale === 'fr' ? 'Anti-arnaque' : locale === 'en' ? 'Anti-scam' : 'مكافحة الاحتيال',
    cta: locale === 'fr' ? 'Vérifier' : locale === 'en' ? 'Verify' : 'تحقق',
  },
  {
    title: locale === 'fr' ? 'Les bonnes démarches' : locale === 'en' ? 'The right steps' : 'الخطوات الصحيحة',
    text: locale === 'fr' ? 'Tu veux savoir par où commencer sans te perdre dans les démarches.' : locale === 'en' ? 'You want to know where to start without getting lost in the process.' : 'تريد معرفة من أين تبدأ دون أن تضيع في الإجراءات.',
    href: startPath(locale),
    badge: locale === 'fr' ? 'Guide' : locale === 'en' ? 'Guide' : 'دليل',
    cta: locale === 'fr' ? 'Commencer' : locale === 'en' ? 'Start' : 'ابدأ',
  },
];

const processSteps = (locale: Locale) => [
  {
    number: '01',
    title: locale === 'fr' ? 'Tu expliques ta situation' : locale === 'en' ? 'You explain your situation' : 'تشرح وضعك',
    text: locale === 'fr' ? 'Tu nous dis où tu en es, ce qui te bloque, et ce que tu dois régler en premier.' : locale === 'en' ? 'You tell us where you are, what\'s blocking you, and what you need to sort out first.' : 'تقول لنا أين أنت، وما الذي يعيقك، وما الذي يجب ترتيبه أولاً.',
  },
  {
    number: '02',
    title: locale === 'fr' ? 'On clarifie les priorités' : locale === 'en' ? 'We clarify your priorities' : 'نوضح الأولويات',
    text: locale === 'fr' ? 'On trie ce qui est urgent, ce qui peut attendre, et ce qui nécessite une attention immédiate.' : locale === 'en' ? 'We sort what\'s urgent, what can wait, and what needs immediate attention.' : 'نرتب ما هو عاجل، وما يمكن الانتظار، وما يحتاج إلى اهتمام فوري.',
  },
  {
    number: '03',
    title: locale === 'fr' ? 'Tu repars avec un plan simple' : locale === 'en' ? 'You leave with a simple plan' : 'تغادر بخطة بسيطة',
    text: locale === 'fr' ? 'Tu sais quoi faire ensuite. Pas de liste infinie — juste les prochaines étapes qui comptent.' : locale === 'en' ? 'You know what to do next. No endless list — just the next steps that matter.' : 'تعرف ما تفعله بعد ذلك. لا قائمة لا نهاية لها — فقط الخطوات التالية المهمة.',
  },
];

const resources = (locale: Locale) => [
  { label: locale === 'fr' ? 'Checklist arrivée' : locale === 'en' ? 'Arrival checklist' : 'قائمة الوصول', href: withLocale('/checklist', locale) },
  { label: locale === 'fr' ? 'Logement' : locale === 'en' ? 'Housing' : 'السكن', href: resourcesPath(locale) },
  { label: locale === 'fr' ? 'Banque' : locale === 'en' ? 'Banking' : 'البنك', href: resourcesPath(locale) },
  { label: locale === 'fr' ? 'Documents' : locale === 'en' ? 'Documents' : 'الوثائق', href: resourcesPath(locale) },
  { label: locale === 'fr' ? 'Santé' : locale === 'en' ? 'Health' : 'الصحة', href: resourcesPath(locale) },
  { label: locale === 'fr' ? 'Anti-arnaque' : locale === 'en' ? 'Anti-scam' : 'مكافحة الاحتيال', href: antiScamServicePath(locale) },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam === 'en' || localeParam === 'ar' ? localeParam as Locale : 'fr';
  const t = homeCopy[locale];
  return {
    title: `Marhaban Canada — ${t.title}`,
    description: t.text,
  };
}

export default async function HomePage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = localeParam === 'en' || localeParam === 'ar' ? localeParam : 'fr';
  const { dir, lang } = getHtmlAttrs(locale);
  const t = homeCopy[locale];
  const situationCards = situations(locale);
  const steps = processSteps(locale);
  const resourceItems = resources(locale);

  const orientationService = {
    title: locale === 'fr' ? 'Appel orientation' : locale === 'en' ? 'Orientation call' : 'مكالمة توجيه',
    price: locale === 'fr' ? '29 $' : '$29',
    duration: '30 min',
    label: locale === 'fr' ? 'Prix de lancement' : locale === 'en' ? 'Launch price' : 'سعر إطلاق',
    bestFor:
      locale === 'fr'
        ? 'Pour les nouveaux arrivants, étudiants et familles qui veulent de la clarté avant d\'agir.'
        : locale === 'en'
          ? 'For newcomers, students, and families who want clarity before acting.'
          : 'للقادمين الجدد والطلاب والعائلات الذين يريدون الوضوح قبل التصرف.',
    included:
      locale === 'fr'
        ? ['Analyse de ta situation', 'Tes 3 priorités immédiates', 'Checklist personnalisée', 'Ressources utiles ciblées']
        : locale === 'en'
          ? ['Situation review', 'Your 3 immediate priorities', 'Personalized checklist', 'Targeted useful resources']
          : ['تحليل وضعك', 'أولوياتك الثلاث الفورية', 'قائمة تحقق شخصية', 'موارد مفيدة مستهدفة'],
    notIncluded:
      locale === 'fr'
        ? 'Pas de conseil juridique, pas de conseil en immigration, pas de garantie de résultat.'
        : locale === 'en'
          ? 'No legal advice, no immigration advice, no guaranteed outcome.'
          : 'لا نصائح قانونية، ولا نصائح هجرة، ولا ضمان للنتيجة.',
  };

  const heroVisual = (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-marhaban-gold/25" aria-hidden="true" />
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-marhaban-gold">{t.visualLabel}</p>
        <span className="h-px flex-1 bg-marhaban-gold/25" aria-hidden="true" />
      </div>
      {/* First 2 topics — highlighted as starting points */}
      <div className="grid grid-cols-2 gap-2">
        {t.visualTopics.slice(0, 2).map((topic) => (
          <div
            key={topic}
            className="rounded-[1rem] border border-marhaban-gold/20 bg-marhaban-gold/10 px-4 py-3.5 text-sm font-semibold text-marhaban-gold transition hover:bg-marhaban-gold/15"
          >
            {topic}
          </div>
        ))}
      </div>
      {/* Remaining topics */}
      <div className="grid grid-cols-2 gap-2">
        {t.visualTopics.slice(2).map((topic) => (
          <div
            key={topic}
            className="rounded-[1rem] border border-white/12 bg-white/[0.08] px-4 py-3.5 text-sm font-medium text-[#e8f4ee] transition hover:bg-white/[0.13]"
          >
            {topic}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <PageShell dir={dir} lang={lang}>

      {/* ── Hero ── */}
      <PageHero
        dark
        eyebrow={t.eyebrow}
        title={t.title}
        text={t.text}
        primary={{ label: t.primary, href: bookingPath(locale) }}
        secondary={{ label: t.secondary, href: '#comment-ca-marche' }}
        pills={t.pills}
        visual={heroVisual}
      />

      {/* ── Trust strip ── */}
      <Section tone="muted">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.trustItems.map((item) => {
            const TrustIcon = trustIconMap[item.icon];
            return (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-[1.5rem] border border-marhaban-leaf/12 bg-white p-5 shadow-warm-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-warm-sm"
              >
                <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl border border-marhaban-leaf/20 bg-marhaban-mint/80 text-marhaban-leaf">
                  {TrustIcon
                    ? <TrustIcon className="h-5 w-5" aria-hidden="true" />
                    : <span className="text-base font-bold">{item.icon}</span>
                  }
                </span>
                <div>
                  <p className="text-sm font-semibold text-marhaban-ink">{item.label}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-marhaban-muted">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── Service card ── */}
      <Section>
        <SectionHeader eyebrow={t.serviceEyebrow} title={t.serviceTitle} text={t.serviceText} size="display" />
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <ServiceCard
            service={orientationService}
            href={orientationServicePath(locale)}
            cta={locale === 'fr' ? 'Voir le service' : locale === 'en' ? 'See the service' : 'عرض الخدمة'}
            featured
          />
          <div className="flex flex-col gap-5 rounded-[1.85rem] border border-marhaban-leaf/15 bg-white p-7 shadow-warm-sm">
            <div>
              <p className="eyebrow">{locale === 'fr' ? 'Ce que tu repars avec' : locale === 'en' ? 'What you leave with' : 'ما الذي ستخرج به'}</p>
              <h3 className="heading-card mt-3">
                {locale === 'fr' ? 'Un plan clair, pas une liste infinie.' : locale === 'en' ? 'A clear plan, not an endless list.' : 'خطة واضحة، وليست قائمة لا نهاية لها.'}
              </h3>
              <p className="body-sm mt-3">
                {locale === 'fr'
                  ? 'En 30 minutes, tu comprends quoi faire en premier, quoi éviter, et où aller chercher de l\'aide.'
                  : locale === 'en'
                    ? 'In 30 minutes, you understand what to do first, what to avoid, and where to get help.'
                    : 'في 30 دقيقة، تفهم ما يجب فعله أولاً، وما تجنبه، وأين تطلب المساعدة.'}
              </p>
            </div>
            <div className="space-y-3">
              {[
                locale === 'fr' ? 'Tes 3 priorités immédiates' : locale === 'en' ? 'Your 3 immediate priorities' : 'أولوياتك الثلاث الفورية',
                locale === 'fr' ? 'Les erreurs courantes à éviter' : locale === 'en' ? 'Common mistakes to avoid' : 'الأخطاء الشائعة لتجنبها',
                locale === 'fr' ? 'Des ressources adaptées à ta situation' : locale === 'en' ? 'Resources tailored to your situation' : 'موارد مكيّفة لوضعك',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-[1.25rem] border border-marhaban-leaf/12 bg-marhaban-mint/30 px-4 py-3.5 text-sm font-medium text-marhaban-ink">
                  <Check className="h-4 w-4 flex-shrink-0 text-marhaban-leaf" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
            <a
              href={bookingPath(locale)}
              className="mt-auto inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-marhaban-forestDark px-8 py-4 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2"
            >
              {t.primary}
              <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
            </a>
          </div>
        </div>
      </Section>

      {/* ── Situation cards ── */}
      <Section tone="muted">
        <SectionHeader eyebrow={t.situationEyebrow} title={t.situationTitle} text={t.situationText} align="center" />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {situationCards.map((route, idx) => (
            <RouteCard
              key={route.title}
              title={route.title}
              text={route.text}
              href={route.href}
              cta={route.cta}
              badge={route.badge}
              tone={idx === 3 ? 'dark' : 'light'}
            />
          ))}
        </div>
      </Section>

      {/* ── Process steps ── */}
      <Section id="comment-ca-marche">
        <SectionHeader
          eyebrow={t.processEyebrow}
          title={t.processTitle}
          text={t.processText}
          align="center"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {steps.map((step) => (
            <RoadmapStage
              key={step.number}
              number={step.number}
              title={step.title}
              text={step.text}
            />
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center gap-3">
          <LocalizedLink
            href={bookingPath(locale)}
            className="btn btn-lg btn-primary"
          >
            {t.primary}
            <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
          </LocalizedLink>
          <p className="text-xs text-marhaban-muted">
            {locale === 'fr' ? '30 min · Sans engagement' : locale === 'en' ? '30 min · No commitment' : '٣٠ دقيقة · بدون التزام'}
          </p>
        </div>
      </Section>

      {/* ── Anti-scam section ── */}
      <Section tone="dark">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.09] p-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-12">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-marhaban-gold/30 bg-marhaban-gold/10">
            <ShieldAlert className="h-6 w-6 text-marhaban-gold" aria-hidden="true" />
          </div>
          <p className="eyebrow-light">{t.antiEyebrow}</p>
          <h2 className="heading-section mt-3 !text-white">{t.antiTitle}</h2>
          <p className="body-lead mx-auto mt-4 max-w-2xl !text-[#edf7f2]">{t.antiText}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={antiScamServicePath(locale)}
              className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-marhaban-gold px-8 py-4 text-sm font-bold text-marhaban-ink shadow-[0_18px_60px_rgba(213,168,79,0.30)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark"
            >
              {t.antiCta}
              <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
            </a>
            <a
              href={resourcesPath(locale)}
              className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-white/16 bg-white/[0.06] px-8 py-4 text-sm font-bold text-white transition hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark"
            >
              {t.antiSecondary}
            </a>
          </div>
        </div>
      </Section>

      {/* ── Resource grid ── */}
      <Section tone="muted">
        <SectionHeader eyebrow={t.resourceEyebrow} title={t.resourceTitle} text={t.resourceText} align="center" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resourceItems.map((res) => (
            <LocalizedLink
              key={res.label}
              href={res.href}
              className="group flex items-center justify-between rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-7 shadow-warm-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-warm-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2"
            >
              <span className="text-base font-semibold text-marhaban-ink">{res.label}</span>
              <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl border border-marhaban-leaf/12 bg-marhaban-mint/60 text-marhaban-leaf transition group-hover:bg-marhaban-leaf group-hover:text-white">
                <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
              </span>
            </LocalizedLink>
          ))}
        </div>
        <div className="mt-8 text-center">
          <LocalizedLink
            href={resourcesPath(locale)}
            className="inline-flex items-center gap-2 rounded-full border border-marhaban-leaf/25 bg-white px-6 py-3 text-sm font-semibold text-marhaban-leaf shadow-warm-xs transition hover:border-marhaban-leaf/50 hover:bg-marhaban-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2"
          >
            {locale === 'fr' ? 'Voir tous les guides' : locale === 'en' ? 'See all guides' : 'عرض جميع الأدلة'}
            <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
          </LocalizedLink>
        </div>
      </Section>

      {/* ── Final CTA ── */}
      <Section tone="dark">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-20">
          {/* Left: heading */}
          <div>
            <p className="eyebrow-light">
              {locale === 'fr' ? 'Prêt à commencer ?' : locale === 'en' ? 'Ready to start?' : 'هل أنت مستعد؟'}
            </p>
            <h2 className="heading-section mt-3 !text-white">{t.finalTitle}</h2>
            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-[#edf7f2] sm:text-lg">{t.finalText}</p>
          </div>
          {/* Right: CTAs + disclaimer */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={bookingPath(locale)}
                className="flex-1 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-marhaban-gold px-8 py-4 text-sm font-bold text-marhaban-ink shadow-[0_18px_60px_rgba(213,168,79,0.30)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark"
              >
                {t.finalCta}
                <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
              </a>
              <a
                href={orientationServicePath(locale)}
                className="flex-1 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-white/16 bg-white/[0.06] px-8 py-4 text-sm font-bold text-white transition hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark"
              >
                {t.finalSecondary}
              </a>
            </div>
            <p className="text-xs leading-relaxed text-white/55">{legalDisclaimer[locale]}</p>
          </div>
        </div>
      </Section>

    </PageShell>
  );
}
