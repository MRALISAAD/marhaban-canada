import type { Metadata } from 'next';
import Image from 'next/image';
import LocalizedLink from '@/components/LocalizedLink';
import { notFound } from 'next/navigation';
import { ArrowRight, CalendarCheck, CheckCircle2, ChevronDown, MailCheck, MessageCircle } from 'lucide-react';
import { AnimatedCTA, AnimatedCard, SectionReveal, StaggerGroup } from '@/components/animations/MarketingMotion';
import { getHtmlAttrs, isLocale, type Locale } from '@/i18n/locales';
import { ReserveForm, type ReserveTexts } from './ReserveForm';

type Props = {
  params: Promise<{ locale: string }>;
};

const disclaimer = {
  fr: "Marhaban Canada offre de l'orientation pratique et de l'information générale. Nous ne fournissons pas de conseils juridiques ni de conseils en immigration. Pour les questions liées aux visas, permis, résidence permanente, admissibilité ou stratégie d'immigration, veuillez consulter un représentant autorisé.",
  en: 'Marhaban Canada offers practical orientation and general information. We do not provide legal advice or immigration advice. For questions related to visas, permits, permanent residence, admissibility, or immigration strategy, please consult an authorized representative.',
  ar: 'تقدم مرحبا كندا توجيهاً عملياً ومعلومات عامة. نحن لا نقدم نصائح قانونية ولا نصائح في الهجرة. للأسئلة المتعلقة بالتأشيرات أو التصاريح أو الإقامة الدائمة أو الأهلية أو استراتيجية الهجرة، يرجى استشارة ممثل معتمد.',
} as const;

type Offer = {
  name: string;
  duration: string;
  price: string;
  benefit: string;
  points: readonly string[];
};

type PageText = ReserveTexts & {
  eyebrow: string;
  title: string;
  subtitle: string;
  heroImageAlt: string;
  trust: readonly string[];
  promise: string;
  betaTitle: string;
  betaMeta: string;
  betaText: string;
  betaPrice: string;
  betaCta: string;
  offersEyebrow: string;
  offersTitle: string;
  offersIntro: string;
  reserve: string;
  betaBadge: string;
  offers: readonly Offer[];
  formTitle: string;
  formText: string;
  formIntro: string;
  formSafety: string;
  summaryTitle: string;
  stepsTitle: string;
  steps: readonly { title: string; text: string }[];
  faqEyebrow: string;
  faqTitle: string;
  faq: readonly { q: string; a: string }[];
  finalTitle: string;
  finalText: string;
  formCta: string;
};

const pageTexts: Record<Locale, PageText> = {
  fr: {
    eyebrow: 'Réserver un appel',
    title: "Réserver un appel d'orientation",
    subtitle: 'Choisis ton besoin, envoie ta demande, puis reçois une confirmation avant l’appel. Tu repars avec un plan clair, pas avec plus de flou.',
    heroImageAlt: 'Appel d’orientation Marhaban Canada dans un intérieur chaleureux et rassurant',
    trust: ['30 minutes', 'Résumé après l’appel', 'Pas de conseil juridique', 'FR / EN / AR'],
    promise: 'Un échange humain, pratique et transparent. Pas de conseil juridique, pas de promesse impossible, et un résumé clair après l’appel.',
    betaTitle: 'Appel orientation bêta',
    betaMeta: '30 minutes · 10 premiers appels',
    betaText: 'Pour les premiers appels de validation : tu expliques ta situation, on trie les priorités, puis tu sais quoi faire ensuite.',
    betaPrice: '10 $',
    betaCta: 'Demander l’appel bêta',
    offersEyebrow: 'Les offres',
    offersTitle: 'Choisis l’appel qui correspond à ta situation.',
    offersIntro: 'Chaque carte explique qui elle aide, ce qu’elle inclut, ce que tu reçois après l’appel et ce qui n’est pas promis.',
    reserve: 'Réserver',
    betaBadge: 'Offre de lancement',
    offers: [
      {
        name: 'Appel Orientation bêta',
        duration: '30 minutes · premiers appels',
        price: '10 $',
        benefit: 'Pour clarifier ta situation et savoir quoi faire en premier.',
        points: ['Pour les premiers appels de validation', 'Priorités pratiques', 'Ressources utiles', 'Résumé après l’appel'],
      },
      {
        name: 'Appel Orientation',
        duration: '30 minutes',
        price: '29 $',
        benefit: 'Pour comprendre quoi faire, dans quel ordre, avec quelles ressources utiles.',
        points: ['Ordre des étapes', 'Erreurs à éviter', 'Ce que tu reçois après l’appel'],
      },
      {
        name: 'Pack Installation',
        duration: '45 minutes + checklist personnalisée',
        price: '69 $',
        benefit: 'Pour préparer ton arrivée ou organiser ta première semaine au Canada.',
        points: ['Checklist personnalisée', 'Première semaine', 'Documents pratiques d’installation'],
      },
      {
        name: 'Pack Complet',
        duration: '60 minutes + résumé détaillé',
        price: '99 $',
        benefit: 'Pour repartir avec un plan plus structuré et facile à suivre.',
        points: ['Plan structuré', 'Résumé détaillé', 'Priorités et erreurs à éviter'],
      },
    ],
    formTitle: 'Le formulaire complet est sur cette page.',
    formText: 'Réponds simplement. Pas besoin d’écrire un long message.',
    formIntro: 'On confirme le bon format avant l’appel.',
    formSafety: 'Ne partage pas ton NAS, tes mots de passe ou tes informations bancaires.',
    summaryTitle: 'Ce que tu recevras',
    stepsTitle: 'Ce qui se passe avant et après la réservation.',
    steps: [
      { title: 'Remplis le formulaire', text: 'Deux minutes suffisent pour dire ce que tu veux clarifier et la langue que tu préfères.' },
      { title: 'On confirme le bon format', text: 'On vérifie que l’appel d’orientation correspond à ta situation avant l’envoi de la confirmation.' },
      { title: 'Tu fais l’appel', text: 'On clarifie les priorités, les étapes pratiques et les signaux à vérifier avant de payer ou d’envoyer des documents.' },
      { title: 'Tu reçois un résumé clair', text: 'Tu repars avec une mini-feuille de route simple, utile et facile à relire.' },
    ],
    faqEyebrow: 'Questions avant de réserver',
    faqTitle: 'Simple, clair, sans promesse impossible.',
    faq: [
      { q: 'Est-ce que l’appel bêta est vraiment à 10 $ ?', a: 'Oui, pour les premiers appels disponibles pendant la phase bêta. Le tarif sert à tester le format avant les offres régulières.' },
      { q: 'Est-ce du conseil juridique ou immigration ?', a: 'Non. L’appel sert à clarifier les démarches pratiques et les ressources utiles. Pour une stratégie de visa, permis ou résidence permanente, il faut consulter un représentant autorisé.' },
      { q: 'Est-ce que je peux réserver avant d’arriver ?', a: 'Oui. Tu peux réserver avant ton arrivée ou une fois sur place. On s’adapte à ton moment.' },
      { q: 'Est-ce que vous aidez pour le logement ?', a: 'On aide à mieux préparer la recherche et à repérer les signaux d’alerte, mais on ne garantit pas de logement et on ne remplace pas un bailleur ou un agent.' },
      { q: 'Que dois-je préparer avant l’appel ?', a: 'Ton statut général, ta ville cible, ton moment d’arrivée et les questions qui te bloquent. Pas besoin de documents sensibles.' },
      { q: 'Qu’est-ce que je reçois après l’appel ?', a: 'Un résumé clair avec tes priorités, les étapes utiles et les points à vérifier avant d’aller plus loin.' },
      { q: 'Est-ce que l’appel garantit un résultat ?', a: 'Non. Marhaban Canada n’offre ni garantie de résultat, ni promesse de visa, de permis, de logement ou d’emploi.' },
      { q: 'Est-ce que je peux vérifier une situation suspecte ?', a: 'Oui. Si tu hésites avant de payer ou de partager des documents, on peut t’aider à vérifier les signaux d’alerte.' },
      { q: 'Puis-je parler en arabe ou en anglais ?', a: 'Oui. Tu peux demander un appel en français, anglais ou arabe.' },
    ],
    finalTitle: 'Tu ne sais pas par quoi commencer ?',
    finalText: 'Réserve un appel d’orientation et repars avec tes prochaines étapes, un résumé clair et des ressources fiables.',
    formCta: 'Réserver maintenant',
    form: {
      name: 'Ton prénom',
      email: 'Ton email',
      status: 'Ton statut',
      statusOptions: {
        student: 'Étudiant international',
        worker: 'Travailleur temporaire',
        pr: 'Résident permanent',
        preparing: 'Je prépare mon arrivée',
        arrived: 'Je suis déjà arrivé',
        other: 'Autre',
      },
      city: 'Ville cible au Canada',
      need: 'Ton besoin principal',
      needPlaceholder: 'Décris en quelques mots ce qui te bloque ou ce que tu veux clarifier',
      submit: 'Demander un appel',
    },
    confirmation: 'Merci. On te recontacte par email dans les 24 h pour confirmer ton créneau.',
    errorText: 'Une erreur est survenue. Réessaie.',
  },
  en: {
    eyebrow: 'Book a call',
    title: 'Book an orientation call',
    subtitle: 'Choose your need, send your request, then receive confirmation before the call. You leave with a clear plan, not more confusion.',
    heroImageAlt: 'Marhaban Canada orientation call in a warm, reassuring interior',
    trust: ['30 minutes', 'Summary after the call', 'No legal advice', 'FR / EN / AR'],
    promise: 'A human, practical, transparent exchange. No legal advice, no impossible promises, and a clear summary after the call.',
    betaTitle: 'Beta orientation call',
    betaMeta: '30 minutes · first 10 calls',
    betaText: 'For the first validation calls: explain your situation, sort priorities, then know what to do next.',
    betaPrice: '$10',
    betaCta: 'Request the beta call',
    offersEyebrow: 'Offers',
    offersTitle: 'Choose the call that fits your situation.',
    offersIntro: 'Each card explains who it helps, what it includes, what you receive after the call, and what is not promised.',
    reserve: 'Book',
    betaBadge: 'Launch offer',
    offers: [
      {
        name: 'Beta Orientation Call',
        duration: '30 minutes · first calls',
        price: '$10',
        benefit: 'Clarify your situation and know what to do first.',
        points: ['For the first validation calls', 'Practical priorities', 'Useful resources', 'Summary after the call'],
      },
      {
        name: 'Orientation Call',
        duration: '30 minutes',
        price: '$29',
        benefit: 'Understand what to do, in what order, with useful resources.',
        points: ['Step order', 'Mistakes to avoid', 'What you receive after the call'],
      },
      {
        name: 'Settlement Pack',
        duration: '45 minutes + personalized checklist',
        price: '$69',
        benefit: 'Prepare your arrival or organize your first week in Canada.',
        points: ['Personalized checklist', 'First week', 'Practical settlement documents'],
      },
      {
        name: 'Complete Pack',
        duration: '60 minutes + detailed summary',
        price: '$99',
        benefit: 'Leave with a more structured and easy-to-follow plan.',
        points: ['Structured plan', 'Detailed summary', 'Priorities and mistakes to avoid'],
      },
    ],
    formTitle: 'The full form is on this page.',
    formText: 'Answer simply. No need to write a long message.',
    formIntro: 'We confirm the right format before the call.',
    formSafety: 'Do not share your SIN, passwords, or banking details.',
    summaryTitle: 'What you will receive',
    stepsTitle: 'What happens before and after booking.',
    steps: [
      { title: 'Fill out the form', text: 'Two minutes is enough to tell us what you want to clarify and which language you prefer.' },
      { title: 'We confirm the right format', text: 'We check that the orientation call fits your situation before the confirmation is sent.' },
      { title: 'You have the call', text: 'We clarify priorities, practical steps, and warning signs before you pay or share documents.' },
      { title: 'You receive a clear summary', text: 'You leave with a short roadmap that is easy to review later.' },
    ],
    faqEyebrow: 'Questions before booking',
    faqTitle: 'Simple, clear, no impossible promise.',
    faq: [
      { q: 'Is the beta call really $10?', a: 'Yes, for the first available calls during the beta phase. The price helps test the format before regular offers.' },
      { q: 'Is this legal or immigration advice?', a: 'No. The call clarifies practical steps and useful resources. For visa, permit, or permanent residence strategy, consult an authorized representative.' },
      { q: 'Can I book before I arrive?', a: 'Yes. You can book before you arrive or after you are already in Canada. We adapt to your timing.' },
      { q: 'Can you help with housing?', a: 'We help you prepare the search and spot warning signs, but we do not guarantee housing or replace a landlord or agent.' },
      { q: 'What should I prepare before the call?', a: 'Your general status, target city, arrival timing, and the questions blocking you. No sensitive documents required.' },
      { q: 'What do I get after the call?', a: 'A clear summary with your priorities, the useful next steps, and the points to verify before moving forward.' },
      { q: 'Does the call guarantee a result?', a: 'No. Marhaban Canada does not guarantee a visa, permit, housing, or job outcome.' },
      { q: 'Can I check a suspicious situation?', a: 'Yes. If you are unsure before paying or sharing documents, we can help you check the warning signs.' },
      { q: 'Can I speak Arabic or French?', a: 'Yes. You can request the call in French, English, or Arabic.' },
    ],
    finalTitle: 'You do not need to figure everything out alone.',
    finalText: 'Book an orientation call and leave with clearer next steps, a short summary, and trusted resources.',
    formCta: 'Book now',
    form: {
      name: 'Your first name',
      email: 'Your email',
      status: 'Your status',
      statusOptions: {
        student: 'International student',
        worker: 'Temporary worker',
        pr: 'Permanent resident',
        preparing: "I'm preparing my arrival",
        arrived: "I've already arrived",
        other: 'Other',
      },
      city: 'Target city in Canada',
      need: 'Your main need',
      needPlaceholder: 'Briefly describe what is blocking you or what you want to clarify',
      submit: 'Request a call',
    },
    confirmation: "Thank you. We'll contact you by email within 24 hours to confirm your time slot.",
    errorText: 'An error occurred. Please try again.',
  },
  ar: {
    eyebrow: 'حجز مكالمة',
    title: 'احجز مكالمة توجيه',
    subtitle: 'اختر حاجتك، أرسل طلبك، ثم استلم التأكيد قبل المكالمة. ستخرج بخطة واضحة لا بمزيد من التشتت.',
    heroImageAlt: 'مكالمة توجيه مع مرحبا كندا في أجواء دافئة ومطمئنة',
    trust: ['30 دقيقة', 'ملخص بعد المكالمة', 'لا نصيحة قانونية', 'FR / EN / AR'],
    promise: 'محادثة إنسانية وعملية وشفافة. لا نصيحة قانونية ولا وعود مستحيلة، مع ملخص واضح بعد المكالمة.',
    betaTitle: 'مكالمة توجيه بيتا',
    betaMeta: '30 دقيقة · أول 10 مكالمات',
    betaText: 'لأول مكالمات التحقق: تشرح وضعك، نرتب الأولويات، ثم تعرف الخطوة التالية.',
    betaPrice: '10 $',
    betaCta: 'طلب مكالمة بيتا',
    offersEyebrow: 'العروض',
    offersTitle: 'اختر المكالمة المناسبة لوضعك.',
    offersIntro: 'كل بطاقة توضح من تساعده، وما الذي تشمله، وما الذي تحصل عليه بعد المكالمة، وما الذي لا يُعد به.',
    reserve: 'احجز',
    betaBadge: 'عرض إطلاق',
    offers: [
      {
        name: 'مكالمة توجيه بيتا',
        duration: '30 دقيقة · أول المكالمات',
        price: '10 $',
        benefit: 'لتوضيح وضعك العام والخروج بأولويات أولى.',
        points: ['لأول مكالمات التحقق', 'أولويات عملية', 'موارد مفيدة', 'ملخص بعد المكالمة'],
      },
      {
        name: 'مكالمة توجيه',
        duration: '30 دقيقة',
        price: '29 $',
        benefit: 'لفهم ماذا تفعل، وبأي ترتيب، ومع أي موارد مفيدة.',
        points: ['ترتيب الخطوات', 'أخطاء يجب تجنبها', 'ما الذي تستلمه بعد المكالمة'],
      },
      {
        name: 'حزمة الاستقرار',
        duration: '45 دقيقة + قائمة تحقق مخصصة',
        price: '69 $',
        benefit: 'لتحضير وصولك أو تنظيم أسبوعك الأول في كندا.',
        points: ['قائمة تحقق مخصصة', 'الأسبوع الأول', 'وثائق عملية للاستقرار'],
      },
      {
        name: 'الحزمة الكاملة',
        duration: '60 دقيقة + ملخص مفصل',
        price: '99 $',
        benefit: 'لخطة أكثر تنظيماً وسهلة المتابعة.',
        points: ['خطة منظمة', 'ملخص مفصل', 'أولويات وأخطاء يجب تجنبها'],
      },
    ],
    formTitle: 'النموذج الكامل موجود في هذه الصفحة.',
    formText: 'أجب ببساطة. لا حاجة إلى رسالة طويلة.',
    formIntro: 'نؤكد الشكل المناسب قبل المكالمة.',
    formSafety: 'لا تشارك رقم التأمين أو كلمات المرور أو المعلومات المصرفية.',
    summaryTitle: 'ما ستحصل عليه',
    stepsTitle: 'ما يحدث قبل الحجز وبعده.',
    steps: [
      { title: 'املأ النموذج', text: 'دقيقتان تكفيان لتخبرنا بما تريد توضيحه واللغة التي تفضلها.' },
      { title: 'نؤكد الشكل المناسب', text: 'نتأكد أن مكالمة التوجيه تناسب وضعك قبل إرسال التأكيد.' },
      { title: 'تجري المكالمة', text: 'نوضح الأولويات والخطوات العملية وإشارات التحذير قبل الدفع أو مشاركة الوثائق.' },
      { title: 'تستلم ملخصاً واضحاً', text: 'تخرج بخارطة طريق قصيرة وسهلة المراجعة.' },
    ],
    faqEyebrow: 'أسئلة قبل الحجز',
    faqTitle: 'واضح وبسيط، بدون وعود مستحيلة.',
    faq: [
      { q: 'هل مكالمة بيتا فعلاً 10 $؟', a: 'نعم، لأول المكالمات المتاحة في مرحلة بيتا. الهدف هو تجربة الصيغة قبل العروض العادية.' },
      { q: 'هل هذه نصيحة قانونية أو هجرة؟', a: 'لا. المكالمة توضّح الخطوات العملية والموارد المفيدة. لاستراتيجية التأشيرة أو التصريح أو الإقامة الدائمة، يجب استشارة ممثل معتمد.' },
      { q: 'هل يمكنني الحجز قبل الوصول؟', a: 'نعم. يمكنك الحجز قبل الوصول أو بعد الوصول إلى كندا. نتكيف مع توقيتك.' },
      { q: 'هل تساعدون في السكن؟', a: 'نساعدك على التحضير للبحث ورصد إشارات التحذير، لكننا لا نضمن السكن ولا نستبدل المالك أو الوسيط.' },
      { q: 'ماذا أجهز قبل المكالمة؟', a: 'وضعك العام، المدينة المستهدفة، توقيت الوصول، والأسئلة التي تعيقك. لا حاجة لوثائق حساسة.' },
      { q: 'ماذا سأستلم بعد المكالمة؟', a: 'ملخص واضح فيه أولوياتك، والخطوات المفيدة التالية، والنقاط التي يجب التحقق منها قبل المتابعة.' },
      { q: 'هل تضمن المكالمة نتيجة؟', a: 'لا. مرحبا كندا لا تضمن نتيجة للهجرة أو التصريح أو السكن أو العمل.' },
      { q: 'هل يمكنني التحقق من وضع مشبوه؟', a: 'نعم. إذا كنت متردداً قبل الدفع أو مشاركة الوثائق، يمكننا مساعدتك على مراجعة إشارات التحذير.' },
      { q: 'هل يمكنني التحدث بالعربية أو الإنجليزية؟', a: 'نعم. يمكنك طلب المكالمة بالفرنسية أو الإنجليزية أو العربية.' },
    ],
    finalTitle: 'لا تحتاج إلى أن تفهم كل شيء وحدك.',
    finalText: 'احجز مكالمة توجيه واخرج بخطواتك التالية وملخص قصير وموارد موثوقة.',
    formCta: 'احجز الآن',
    form: {
      name: 'اسمك الأول',
      email: 'بريدك الإلكتروني',
      status: 'وضعك',
      statusOptions: {
        student: 'طالب دولي',
        worker: 'عامل مؤقت',
        pr: 'مقيم دائم',
        preparing: 'أنا أحضّر لوصولي',
        arrived: 'وصلت بالفعل',
        other: 'أخرى',
      },
      city: 'المدينة المستهدفة في كندا',
      need: 'حاجتك الرئيسية',
      needPlaceholder: 'اشرح بإيجاز ما يعيقك أو ما تريد توضيحه',
      submit: 'طلب مكالمة',
    },
    confirmation: 'شكرًا. سنتواصل معك عبر البريد الإلكتروني خلال 24 ساعة لتأكيد موعدك.',
    errorText: 'حدث خطأ. حاول مرة أخرى.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';
  const t = pageTexts[locale];
  return {
    title: `${t.title} | Marhaban Canada`,
    description: t.subtitle,
  };
}

export default async function ReserverPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const { dir, lang } = getHtmlAttrs(locale);
  const t = pageTexts[locale];
  const bookingActionsHref = '#booking-form';

  return (
    <main className="warm-page overflow-hidden" dir={dir} lang={lang}>
      <section className="marhaban-hero-shell px-4 pb-10 pt-8 text-white sm:px-6 sm:pb-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div className="space-y-6">
            <SectionReveal>
              <p className="inline-flex rounded-full border border-white/14 bg-white/[0.08] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-marhaban-gold backdrop-blur">
                {t.eyebrow}
              </p>
              <h1 className="mt-6 max-w-4xl text-[clamp(2.7rem,5vw,4.9rem)] font-semibold leading-[0.96] text-white">
                {t.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base text-white/76 sm:text-lg">{t.subtitle}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {t.trust.map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.08] px-3 py-2 text-xs font-semibold text-white/82">
                    <CheckCircle2 className="h-3.5 w-3.5 text-marhaban-gold" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-5 max-w-3xl rounded-3xl border border-white/12 bg-white/[0.08] p-4 text-sm font-semibold text-white/78 shadow-warm-sm">
                {t.promise}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <AnimatedCTA className="inline-flex">
                  <a
                    href={bookingActionsHref}
                    className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-marhaban-gold px-6 py-3 text-sm font-bold text-marhaban-ink shadow-[0_18px_60px_rgba(213,168,79,0.24)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark"
                  >
                    {t.betaCta}
                    <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
                  </a>
                </AnimatedCTA>
                <AnimatedCTA className="inline-flex">
                  <a
                    href="#faq"
                    className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/18 bg-white/[0.08] px-6 py-3 text-sm font-bold text-white shadow-warm-sm transition hover:bg-white/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark"
                  >
                    {locale === 'fr' ? 'Questions fréquentes' : locale === 'en' ? 'FAQ' : 'الأسئلة الشائعة'}
                  </a>
                </AnimatedCTA>
              </div>
            </SectionReveal>
          </div>

          <SectionReveal className="rounded-[2rem] border border-white/12 bg-white/[0.06] p-4 shadow-[0_28px_100px_rgba(0,0,0,0.28)] backdrop-blur-sm">
            <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10">
                <div className="relative aspect-[4/5] min-h-[320px]">
                  <Image
                    src="/assets/marhaban/visuel-reservation.jpg"
                    alt={t.heroImageAlt}
                    fill
                    sizes="(min-width: 1024px) 38vw, calc(100vw - 2rem)"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-[1.6rem] border border-white/12 bg-white/[0.08] p-4 text-white shadow-warm-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-gold">{locale === 'fr' ? 'Inclus dans l’appel' : locale === 'en' ? 'Included in the call' : 'يشمل الاتصال'}</p>
                  <div className="mt-3 grid gap-2">
                    {['30 minutes', 'FR / EN / AR', 'Résumé clair', 'Orientation pratique'].map((item) => (
                      <span key={item} className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-3 py-2 text-xs font-semibold text-white/82">
                        <CheckCircle2 className="h-3.5 w-3.5 text-marhaban-gold" aria-hidden="true" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-[1.6rem] border border-marhaban-gold/18 bg-marhaban-gold/10 p-4 text-white shadow-warm-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-gold">{t.betaMeta}</p>
                  <h2 className="mt-3 text-2xl font-semibold">{t.betaTitle}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/76">{t.betaText}</p>
                  <p className="mt-4 text-4xl font-semibold text-marhaban-gold">{t.betaPrice}</p>
                  <p className="mt-2 text-xs font-semibold text-white/54">{t.betaCta}</p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section id="offers" className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-clay">{t.offersEyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold text-marhaban-ink sm:text-4xl">{t.offersTitle}</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-700">{t.offersIntro}</p>
          </div>
          <StaggerGroup className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {t.offers.map((offer, index) => (
              <OfferCard
                key={offer.name}
                offer={offer}
                cta={t.reserve}
                featured={index === 0}
                href={bookingActionsHref}
                badge={index === 0 ? t.betaBadge : undefined}
              />
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section id="booking-form" className="scroll-mt-24 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <SectionReveal className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">{t.formTitle}</p>
            <h2 className="text-3xl font-semibold leading-tight text-marhaban-ink sm:text-4xl">{t.formText}</h2>
            <p className="max-w-xl text-base leading-relaxed text-slate-700">{t.formIntro}</p>
            <div className="rounded-3xl border border-marhaban-leaf/12 bg-marhaban-mint/70 p-5 text-sm text-marhaban-ink shadow-warm-sm">
              <p className="font-semibold">{t.formSafety}</p>
            </div>
            <div className="rounded-3xl border border-marhaban-leaf/12 bg-white/88 p-5 shadow-warm-sm">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-clay">{t.summaryTitle}</p>
              <ul className="mt-4 space-y-3 text-sm text-marhaban-ink/72">
                {['Priorités claires', 'Ressources utiles', 'Étapes recommandées', 'Erreurs à éviter'].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-marhaban-leaf" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          <SectionReveal className="rounded-[2rem] border border-marhaban-leaf/14 bg-white/96 p-5 shadow-[0_22px_70px_rgba(31,45,43,0.08)] sm:p-8">
            <ReserveForm texts={t} dir={dir} />
          </SectionReveal>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionReveal>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">Processus</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-marhaban-ink sm:text-4xl">{t.stepsTitle}</h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-700">{t.promise}</p>
            </SectionReveal>
            <StaggerGroup className="grid gap-4 sm:grid-cols-2">
              {t.steps.map((step, index) => {
                const icons = [MessageCircle, MailCheck, CalendarCheck, CheckCircle2];
                const Icon = icons[index] ?? CheckCircle2;
                return (
                  <AnimatedCard key={step.title} className="rounded-3xl border border-marhaban-leaf/12 bg-white p-5 shadow-warm-sm">
                    <div className="flex gap-4">
                      <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-marhaban-mint text-marhaban-leaf">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-clay">0{index + 1}</p>
                        <h3 className="mt-1 text-lg font-semibold text-marhaban-ink">{step.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-700">{step.text}</p>
                      </div>
                    </div>
                  </AnimatedCard>
                );
              })}
            </StaggerGroup>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <SectionReveal className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">{t.faqEyebrow}</p>
            <h2 className="text-3xl font-semibold leading-tight text-marhaban-ink sm:text-4xl">{t.faqTitle}</h2>
            <div className="rounded-3xl border border-marhaban-leaf/12 bg-marhaban-mint/70 p-5 text-sm leading-relaxed text-marhaban-ink shadow-warm-sm">
              {disclaimer[locale]}
            </div>
          </SectionReveal>
          <StaggerGroup className="grid gap-3">
            {t.faq.map((item) => (
              <details key={item.q} className="group rounded-3xl border border-marhaban-leaf/12 bg-white/96 p-5 shadow-warm-sm open:bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-marhaban-ink">
                  <span>{item.q}</span>
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-marhaban-leaf transition group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="mt-4 border-t border-marhaban-leaf/10 pt-4 text-sm leading-relaxed text-marhaban-ink/72">{item.a}</p>
              </details>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <SectionReveal className="px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-marhaban-leaf/12 bg-marhaban-ink p-6 text-white shadow-warm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <MailCheck className="h-8 w-8 text-marhaban-gold" aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-semibold">{t.finalTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{t.finalText}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <AnimatedCTA className="inline-flex">
                <a
                  href={bookingActionsHref}
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-marhaban-ink transition hover:bg-marhaban-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-ink"
                >
                  {t.formCta}
                  <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
                </a>
              </AnimatedCTA>
              <AnimatedCTA className="inline-flex">
                <LocalizedLink
                  href="/ressources"
                  className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-white/18 bg-white/[0.05] px-5 py-3 text-sm font-bold text-white transition hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-ink"
                >
                  {locale === 'fr' ? 'Voir les ressources' : locale === 'en' ? 'View resources' : 'عرض الموارد'}
                </LocalizedLink>
              </AnimatedCTA>
            </div>
          </div>
        </div>
      </SectionReveal>
    </main>
  );
}

function OfferCard({ offer, cta, featured, href, badge }: { offer: Offer; cta: string; featured: boolean; href: string; badge?: string }) {
  return (
    <AnimatedCard featured={featured}>
      <article className={`relative flex min-h-[300px] flex-col overflow-hidden rounded-[1.75rem] border p-5 shadow-warm-sm sm:p-6 ${featured ? 'border-marhaban-gold/24 bg-marhaban-forestDark text-white shadow-[0_30px_90px_rgba(8,42,36,0.22)]' : 'border-marhaban-leaf/10 bg-white text-marhaban-ink'}`}>
        {featured ? <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-marhaban-gold/80 to-transparent" aria-hidden="true" /> : null}
        {badge ? <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-gold">{badge}</p> : null}
        <p className={`text-xs font-bold uppercase tracking-[0.12em] ${featured ? 'text-marhaban-gold' : 'text-marhaban-clay'}`}>{offer.duration}</p>
        <h3 className={`mt-3 text-2xl font-semibold leading-tight ${featured ? 'text-white' : 'text-marhaban-ink'}`}>{offer.name}</h3>
        <p className={`mt-3 text-3xl font-semibold ${featured ? 'text-marhaban-gold' : 'text-marhaban-leaf'}`}>{offer.price}</p>
        <p className={`mt-4 text-sm ${featured ? 'text-white/76' : 'text-marhaban-ink/70'}`}>{offer.benefit}</p>
        <ul className={`mt-4 space-y-2 text-sm ${featured ? 'text-white/72' : 'text-marhaban-ink/68'}`}>
          {offer.points.map((point) => (
            <li key={point} className="flex items-start gap-2">
              <CheckCircle2 className={`mt-0.5 h-4 w-4 flex-shrink-0 ${featured ? 'text-marhaban-gold' : 'text-marhaban-leaf'}`} aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <a
          href={href}
          className={`mt-5 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            featured
              ? 'bg-marhaban-gold text-marhaban-ink hover:bg-white focus-visible:ring-marhaban-gold/50 focus-visible:ring-offset-marhaban-forestDark'
              : 'bg-marhaban-ink text-white hover:bg-marhaban-leaf focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-marhaban-cream'
          }`}
        >
          {cta}
          <CalendarCheck className="h-4 w-4" aria-hidden="true" />
        </a>
      </article>
    </AnimatedCard>
  );
}
