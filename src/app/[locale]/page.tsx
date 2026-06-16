import type { Metadata } from 'next';
import { getHtmlAttrs, type Locale } from '@/i18n/locales';
import { bookingPath, orientationServicePath, antiScamServicePath, resourcesPath } from '@/lib/routes';
import { legalDisclaimer } from '@/content/legalDisclaimer';
import { PageHero } from '@/components/sections/PageHero';
import { RouteCard } from '@/components/sections/RouteCard';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { RoadmapStage } from '@/components/sections/RoadmapStage';
import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/marketing/SectionHeader';

type Props = { params: Promise<{ locale: string }> };

const homeCopy = {
  fr: {
    eyebrow: 'Marhaban Canada',
    title: 'Un appel pour clarifier tes prochaines étapes au Canada.',
    text: 'Tu prépares ton arrivée ou tu viens d’arriver ? Marhaban Canada t’aide à mettre de l’ordre dans tes priorités, éviter les erreurs courantes et avancer avec un plan simple.',
    primary: 'Découvrir l’appel orientation',
    secondary: 'Réserver un appel',
    pills: ['Orientation pratique', 'FR / EN / AR', 'Pas de conseil juridique', 'Pas de garantie de résultat'],
    problemTitle: 'Pourquoi les premiers jours sont confus',
    problemText: 'On te demande de tout comprendre vite: logement, documents, banque, téléphone, transports, arnaques, ressources. Le bon ordre change tout.',
    serviceTitle: 'Service principal',
    serviceText: 'Appel orientation — 30 min, prix de lancement: 29 $. Tu repars avec une mini-feuille de route claire pour savoir quoi faire ensuite.',
    serviceCta: 'Voir le service',
    situationTitle: 'Situations qu’on aide',
    situationText: 'Tu peux entrer par le besoin, puis aller vers le bon service, le bon guide ou la réservation.',
    stepTitle: 'Comment ça marche',
    antiTitle: 'Avant de payer, vérifie',
    antiText: 'Quand un message t’appuie pour aller vite, ralentis et regarde les signaux d’alerte.',
    finalTitle: 'Tu ne sais pas par où commencer ?',
    finalText: 'Réserve un appel d’orientation et repars avec tes prochaines étapes, ou consulte d’abord la page du service principal.',
    finalCta: 'Réserver un appel',
  },
  en: {
    eyebrow: 'Marhaban Canada',
    title: 'A call to clarify your next steps in Canada.',
    text: 'Arriving soon or already here? Marhaban Canada helps you bring order to your priorities, avoid common mistakes, and move forward with a simple plan.',
    primary: 'Discover the orientation call',
    secondary: 'Book a call',
    pills: ['Practical orientation', 'FR / EN / AR', 'No legal advice', 'No guaranteed outcome'],
    problemTitle: 'Why the first days feel messy',
    problemText: 'You’re asked to understand housing, documents, banking, phone plans, transport, scams, and resources all at once. Order matters.',
    serviceTitle: 'Main service',
    serviceText: 'Orientation call — 30 min, launch price: $29. Leave with a clear mini-roadmap for what to do next.',
    serviceCta: 'View service',
    situationTitle: 'Situations we help with',
    situationText: 'Start with your situation, then move to the right service, guide, or booking flow.',
    stepTitle: 'How it works',
    antiTitle: 'Before paying, check',
    antiText: 'If a message pushes you to act fast, slow down and look for warning signs.',
    finalTitle: 'Not sure where to start?',
    finalText: 'Book an orientation call and leave with your next steps, or review the main service page first.',
    finalCta: 'Book a call',
  },
  ar: {
    eyebrow: 'مرحبا كندا',
    title: 'مكالمة لتوضيح خطوتك التالية في كندا.',
    text: 'سواء كنت على وشك الوصول أو وصلت بالفعل، تساعدك مرحبا كندا على ترتيب أولوياتك وتجنب الأخطاء الشائعة والمضي بخطة بسيطة.',
    primary: 'اكتشف مكالمة التوجيه',
    secondary: 'احجز مكالمة',
    pills: ['توجيه عملي', 'FR / EN / AR', 'لا نصائح قانونية', 'لا ضمانات للنتيجة'],
    problemTitle: 'لماذا تبدو الأيام الأولى مربكة',
    problemText: 'يطلب منك فهم السكن والوثائق والبنك والهاتف والنقل والاحتيال والموارد دفعة واحدة. الترتيب مهم.',
    serviceTitle: 'الخدمة الرئيسية',
    serviceText: 'مكالمة توجيه — 30 دقيقة، سعر إطلاق: 29 $. ستخرج بخارطة طريق مختصرة لما يجب فعله بعد ذلك.',
    serviceCta: 'عرض الخدمة',
    situationTitle: 'الحالات التي نساعد فيها',
    situationText: 'ابدأ من حالتك، ثم انتقل إلى الخدمة أو الدليل أو الحجز المناسب.',
    stepTitle: 'كيف يعمل الأمر',
    antiTitle: 'قبل أن تدفع، تحقق',
    antiText: 'إذا دفعك أحدهم للتصرف بسرعة، فخفف السرعة وابحث عن إشارات التحذير.',
    finalTitle: 'لا تعرف من أين تبدأ؟',
    finalText: 'احجز مكالمة توجيه واخرج بخطواتك التالية، أو راجع صفحة الخدمة الرئيسية أولاً.',
    finalCta: 'احجز مكالمة',
  },
} as const satisfies Record<Locale, {
  eyebrow: string;
  title: string;
  text: string;
  primary: string;
  secondary: string;
  pills: readonly string[];
  problemTitle: string;
  problemText: string;
  serviceTitle: string;
  serviceText: string;
  serviceCta: string;
  situationTitle: string;
  situationText: string;
  stepTitle: string;
  antiTitle: string;
  antiText: string;
  finalTitle: string;
  finalText: string;
  finalCta: string;
}>;

const situations = (locale: Locale) => [
  { title: locale === 'fr' ? 'Je prépare mon arrivée' : locale === 'en' ? 'Preparing arrival' : 'أحضّر وصولي', text: locale === 'fr' ? 'Tu veux un ordre simple avant le départ.' : locale === 'en' ? 'You want a simple order before you leave.' : 'تريد ترتيباً بسيطاً قبل السفر.', href: orientationServicePath(locale), badge: locale === 'fr' ? 'Orientation' : locale === 'en' ? 'Orientation' : 'توجيه' },
  { title: locale === 'fr' ? 'Je viens d’arriver' : locale === 'en' ? 'Just arrived' : 'وصلت للتو', text: locale === 'fr' ? 'Tu as besoin de repères rapides pour la première semaine.' : locale === 'en' ? 'You need quick landmarks for the first week.' : 'تحتاج إلى نقاط سريعة للأسبوع الأول.', href: orientationServicePath(locale), badge: locale === 'fr' ? 'Service' : locale === 'en' ? 'Service' : 'الخدمة' },
  { title: locale === 'fr' ? 'Je cherche un logement' : locale === 'en' ? 'Looking for housing' : 'أبحث عن سكن', text: locale === 'fr' ? 'Tu veux chercher sans te faire piéger.' : locale === 'en' ? 'You want to search without getting trapped.' : 'تريد البحث من دون الوقوع في فخ.', href: resourcesPath(locale), badge: locale === 'fr' ? 'Resource' : locale === 'en' ? 'Resource' : 'مورد' },
  { title: locale === 'fr' ? 'Je suis étudiant' : locale === 'en' ? 'I am a student' : 'أنا طالب', text: locale === 'fr' ? 'Tu veux comprendre ce qui compte maintenant.' : locale === 'en' ? 'You want to understand what matters now.' : 'تريد فهم ما يهم الآن.', href: orientationServicePath(locale), badge: locale === 'fr' ? 'Call' : locale === 'en' ? 'Call' : 'مكالمة' },
  { title: locale === 'fr' ? 'J’ai peur d’une arnaque' : locale === 'en' ? 'I’m worried about a scam' : 'أخشى من احتيال', text: locale === 'fr' ? 'Tu veux vérifier avant d’envoyer de l’argent ou des documents.' : locale === 'en' ? 'You want to check before sending money or documents.' : 'تريد التحقق قبل إرسال المال أو الوثائق.', href: antiScamServicePath(locale), badge: locale === 'fr' ? 'Trust' : locale === 'en' ? 'Trust' : 'ثقة' },
  { title: locale === 'fr' ? 'Je veux parler à quelqu’un' : locale === 'en' ? 'I want to speak with someone' : 'أريد التحدث مع شخص', text: locale === 'fr' ? 'Tu préfères une lecture humaine et directe.' : locale === 'en' ? 'You prefer a human, direct read of your situation.' : 'تفضّل قراءة إنسانية ومباشرة لوضعك.', href: bookingPath(locale), badge: locale === 'fr' ? 'Call' : locale === 'en' ? 'Call' : 'مكالمة' },
];

const steps = (locale: Locale) => [
  {
    number: '1',
    title: locale === 'fr' ? 'Tu expliques ta situation' : locale === 'en' ? 'You explain your situation' : 'تشرح وضعك',
    text: locale === 'fr' ? 'Tu nous dis où tu es et ce qui te bloque.' : locale === 'en' ? 'You tell us where you are and what is blocking you.' : 'تقول لنا أين أنت وما الذي يعيقك.',
  },
  {
    number: '2',
    title: locale === 'fr' ? 'On clarifie tes priorités' : locale === 'en' ? 'We clarify your priorities' : 'نوضح الأولويات',
    text: locale === 'fr' ? 'On trie ce qui est urgent, utile et secondaire.' : locale === 'en' ? 'We sort what is urgent, useful, and secondary.' : 'نرتب ما هو عاجل ومفيد وثانوي.',
  },
  {
    number: '3',
    title: locale === 'fr' ? 'Tu réserves un appel' : locale === 'en' ? 'You book a call' : 'تحجز مكالمة',
    text: locale === 'fr' ? 'Tu choisis le bon format selon ton besoin.' : locale === 'en' ? 'You choose the right format for your need.' : 'تختار الصيغة الأنسب لاحتياجك.',
  },
  {
    number: '4',
    title: locale === 'fr' ? 'Tu repars avec une mini-feuille de route' : locale === 'en' ? 'You leave with a mini roadmap' : 'تغادر بخارطة طريق مختصرة',
    text: locale === 'fr' ? 'Tu sais quoi faire ensuite, sans te perdre.' : locale === 'en' ? 'You know what to do next, without getting lost.' : 'تعرف ما الذي تفعله بعد ذلك بلا ضياع.',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam === 'en' || localeParam === 'ar' ? localeParam : 'fr';
  return {
    title: `Marhaban Canada | ${homeCopy[locale].title}`,
    description: homeCopy[locale].text,
  };
}

export default async function HomePage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = localeParam === 'en' || localeParam === 'ar' ? localeParam : 'fr';
  const { dir, lang } = getHtmlAttrs(locale);
  const t = homeCopy[locale];
  const situationCards = situations(locale);
  const roadmap = steps(locale);
  const orientationService = {
    title: locale === 'fr' ? 'Appel orientation' : locale === 'en' ? 'Orientation call' : 'مكالمة توجيه',
    price: locale === 'fr' ? '29 $' : '$29',
    duration: locale === 'fr' ? '30 minutes' : '30 minutes',
    label: locale === 'fr' ? 'Prix de lancement' : locale === 'en' ? 'Launch price' : 'سعر إطلاق',
    bestFor:
      locale === 'fr'
        ? 'Pour les nouveaux arrivants, étudiants et familles qui veulent mettre de l’ordre avant de décider.'
        : locale === 'en'
          ? 'For newcomers, students, and families who want clarity before deciding.'
          : 'للقادمين الجدد والطلاب والعائلات الذين يريدون الوضوح قبل اتخاذ القرار.',
    included:
      locale === 'fr'
        ? ['Analyse simple de la situation', 'Priorités à faire', 'Checklist personnalisée simple', 'Ressources utiles']
        : locale === 'en'
          ? ['Simple situation review', 'Priority actions', 'Simple personalized checklist', 'Useful resources']
          : ['تحليل بسيط للوضع', 'الأولويات المطلوبة', 'قائمة تحقق شخصية مبسطة', 'موارد مفيدة'],
    notIncluded:
      locale === 'fr'
        ? 'Pas de conseil juridique, pas de conseil en immigration et pas de garantie de résultat.'
        : locale === 'en'
          ? 'No legal advice, no immigration advice, and no guarantee of outcome.'
          : 'لا نصائح قانونية، ولا نصائح هجرة، ولا ضمان للنتيجة.',
  };

  const visual = (
    <div className="grid gap-4">
      <div className="rounded-[1.5rem] border border-white/12 bg-white/[0.08] p-4">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/80">30 min</span>
          <span className="rounded-full border border-marhaban-gold/20 bg-marhaban-gold/10 px-3 py-1 text-xs font-semibold text-marhaban-gold">
            {locale === 'fr' ? 'Résumé après appel' : locale === 'en' ? 'Summary after the call' : 'ملخص بعد المكالمة'}
          </span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            locale === 'fr' ? 'Priorités' : locale === 'en' ? 'Priorities' : 'الأولويات',
            locale === 'fr' ? 'Documents' : locale === 'en' ? 'Documents' : 'الوثائق',
            locale === 'fr' ? 'Logement' : locale === 'en' ? 'Housing' : 'السكن',
            locale === 'fr' ? 'Anti-arnaque' : locale === 'en' ? 'Anti-scam' : 'مكافحة الاحتيال',
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm font-medium text-white/84">
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[1.5rem] border border-marhaban-gold/16 bg-marhaban-gold/10 p-4 text-sm leading-relaxed text-[#d8e7df]">
        <p className="font-semibold text-marhaban-gold">
          {locale === 'fr' ? 'Ce que tu repars avec' : locale === 'en' ? 'What you leave with' : 'ما الذي ستخرج به'}
        </p>
        <p className="mt-2">
          {locale === 'fr'
            ? 'Une prochaine étape claire, des ressources utiles et une lecture simple de ce qui mérite ton attention.'
            : locale === 'en'
              ? 'A clear next step, useful resources, and a simple read on what deserves your attention.'
              : 'خطوة تالية واضحة، وموارد مفيدة، وفهم بسيط لما يستحق انتباهك.'}
        </p>
      </div>
    </div>
  );

  return (
    <PageShell dir={dir} lang={lang}>
      <PageHero
        dark
        eyebrow={t.eyebrow}
        title={t.title}
        text={t.text}
        primary={{ label: t.primary, href: orientationServicePath(locale) }}
        secondary={{ label: t.secondary, href: bookingPath(locale) }}
        pills={t.pills}
        visual={visual}
      />

      <Section tone="muted">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            locale === 'fr' ? '30 minutes pour clarifier' : locale === 'en' ? '30 minutes to clarify' : '30 دقيقة لتوضيح الأمور',
            locale === 'fr' ? 'Priorités simples' : locale === 'en' ? 'Simple priorities' : 'أولويات بسيطة',
            locale === 'fr' ? 'Ressources utiles' : locale === 'en' ? 'Useful resources' : 'موارد مفيدة',
            locale === 'fr' ? 'Erreurs à éviter' : locale === 'en' ? 'Mistakes to avoid' : 'أخطاء يجب تجنبها',
          ].map((item) => (
            <div key={item} className="rounded-[1.5rem] border border-marhaban-leaf/15 bg-white p-5 text-sm font-medium text-marhaban-ink shadow-warm-sm">
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow={locale === 'fr' ? 'Service principal' : locale === 'en' ? 'Main service' : 'الخدمة الرئيسية'}
          title={t.serviceTitle}
          text={t.serviceText}
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <ServiceCard
            service={orientationService}
            href={orientationServicePath(locale)}
            cta={t.serviceCta}
            featured
          />
          <div className="rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 shadow-warm-sm">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">
              {locale === 'fr' ? 'Problème principal' : locale === 'en' ? 'Main problem' : 'المشكلة الرئيسية'}
            </p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-marhaban-ink">{t.problemTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-marhaban-ink/78">{t.problemText}</p>
            <div className="mt-6 grid gap-3">
              {[
                locale === 'fr' ? 'Tu arrives bientôt ou tu viens d’arriver.' : locale === 'en' ? 'You are arriving soon or already here.' : 'أنت على وشك الوصول أو وصلت بالفعل.',
                locale === 'fr' ? 'Tu veux éviter les erreurs de départ.' : locale === 'en' ? 'You want to avoid early mistakes.' : 'تريد تجنب الأخطاء المبكرة.',
                locale === 'fr' ? 'Tu cherches un ordre simple avant d’agir.' : locale === 'en' ? 'You want a simple order before acting.' : 'تريد ترتيباً بسيطاً قبل التصرف.',
              ].map((point) => (
                <div key={point} className="rounded-2xl border border-marhaban-leaf/15 bg-marhaban-mint/55 px-4 py-3 text-sm text-marhaban-ink">
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeader
          eyebrow={t.situationTitle}
          title={t.situationTitle}
          text={t.situationText}
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {situationCards.map((route) => (
            <RouteCard
              key={route.title}
              title={route.title}
              text={route.text}
              href={route.href}
              cta={locale === 'fr' ? 'Continuer' : locale === 'en' ? 'Continue' : 'تابع'}
              badge={route.badge}
            />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow={t.stepTitle} title={t.stepTitle} text={locale === 'fr' ? 'Un parcours simple, du flou au plan clair.' : locale === 'en' ? 'A simple journey from uncertainty to clarity.' : 'رحلة بسيطة من الغموض إلى الوضوح.'} />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {roadmap.map((step) => (
            <RoadmapStage key={step.number} number={step.number} title={step.title} text={step.text} />
          ))}
          </div>
      </Section>

      <Section tone="dark" className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 text-center shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-gold">
            {locale === 'fr' ? 'Anti-arnaque' : locale === 'en' ? 'Anti-scam' : 'مكافحة الاحتيال'}
          </p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-3xl">{t.antiTitle}</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#edf7f2]">{t.antiText}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={antiScamServicePath(locale)}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-marhaban-gold px-6 py-3 text-sm font-bold text-marhaban-ink shadow-[0_18px_60px_rgba(213,168,79,0.22)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark"
            >
              {locale === 'fr' ? 'Vérifier une situation' : locale === 'en' ? 'Check a situation' : 'تحقق من وضع'}
            </a>
            <a
              href={resourcesPath(locale)}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/16 bg-white/[0.06] px-6 py-3 text-sm font-bold text-white transition hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark"
            >
              {locale === 'fr' ? 'Voir les ressources' : locale === 'en' ? 'See resources' : 'عرض الموارد'}
            </a>
          </div>
        </div>
      </Section>

      <Section tone="dark" className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 text-center shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-8">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">{t.finalTitle}</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#edf7f2]">{t.finalText}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={orientationServicePath(locale)} className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-marhaban-gold px-6 py-3 text-sm font-bold text-marhaban-ink shadow-[0_18px_60px_rgba(213,168,79,0.22)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark">
              {t.primary}
            </a>
            <a href={bookingPath(locale)} className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/16 bg-white/[0.06] px-6 py-3 text-sm font-bold text-white transition hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark">
              {t.secondary}
            </a>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-white/78">{legalDisclaimer[locale]}</p>
        </div>
      </Section>
    </PageShell>
  );
}
