'use client';

import { useCallback } from 'react';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Banknote,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  GraduationCap,
  HeartHandshake,
  Home,
  Landmark,
  MailCheck,
  MapPinned,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import { ProvinceSelector } from '@/components/ProvinceSelector';
import { ProgressBar } from '@/components/ProgressBar';
import { useLanguage } from '@/components/LanguageProvider';
import { HomepageGsapEffects } from '@/components/animations/HomepageGsapEffects';
import { getHtmlAttrs, type Locale } from '@/i18n/locales';
import { useLocalStorageState } from '@/lib/useLocalStorageState';
import { cn } from '@/lib/cn';

type NeedCardData = {
  label: string;
  title: string;
  text: string;
  href: string;
  icon: LucideIcon;
};

type OfferData = {
  title: string;
  price: string;
  duration: string;
  benefit: string;
  note: string;
};

type StepData = {
  title: string;
  text: string;
  icon: LucideIcon;
};

type LinkCardData = {
  title: string;
  text: string;
  href: string;
  icon: LucideIcon;
};

type ScopeData = {
  doesTitle: string;
  does: readonly string[];
  doesNotTitle: string;
  doesNot: readonly string[];
};

const disclaimer = {
  fr: 'Marhaban Canada offre de l’orientation pratique et de l’information générale. Nous ne fournissons pas de conseils juridiques ni de conseils en immigration. Pour les questions liées aux visas, permis, résidence permanente, admissibilité ou stratégie d’immigration, veuillez consulter un représentant autorisé.',
  en: 'Marhaban Canada offers practical orientation and general information. We do not provide legal advice or immigration advice. For questions related to visas, permits, permanent residence, admissibility, or immigration strategy, please consult an authorized representative.',
  ar: 'تقدم مرحبا كندا توجيهاً عملياً ومعلومات عامة. نحن لا نقدم نصائح قانونية ولا نصائح في الهجرة. للأسئلة المتعلقة بالتأشيرات أو التصاريح أو الإقامة الدائمة أو الأهلية أو استراتيجية الهجرة، يرجى استشارة ممثل معتمد.',
} as const;

const homeTexts = {
  fr: {
    announcement: 'Appels d’orientation pour nouveaux arrivants — places bêta disponibles',
    announcementCta: 'Réserver',
    heroEyebrow: 'Marhaban Canada — Orientation pratique pour nouveaux arrivants au Canada',
    heroTitle: 'Tu arrives au Canada ? On t’aide à savoir quoi faire en premier.',
    heroSubtitle:
      'Un accompagnement clair et humain pour comprendre tes priorités, éviter les erreurs et avancer étape par étape.',
    primaryCta: 'Réserver un appel',
    secondaryCta: 'Voir mon parcours',
    proof: ['FR / EN / AR', 'Orientation pratique', 'Sources utiles', 'Approche humaine'],
    visualChecklist: 'Checklist arrivée',
    visualScam: 'Anti-arnaque',
    visualPlan: 'Plan première semaine',
    visualDoc: 'Documents pratiques d’installation',
    visualTags: ['Logement', 'Banque', 'Téléphone', 'Priorités'],
    progressLabel: 'Ton parcours peut commencer ici',
    progressHelper: 'La progression reste locale sur ton appareil.',
    needsEyebrow: 'Choisis ton besoin',
    needsTitle: 'Commence par ce qui te bloque maintenant.',
    needsText: 'Des portes d’entrée simples pour passer du flou aux prochaines étapes.',
    needs: [
      { label: 'Préparer', title: 'Préparer mon arrivée', text: 'Budget, documents pratiques d’installation, premières décisions et repères fiables.', href: '/parcours', icon: MapPinned },
      { label: 'Semaine 1', title: 'Première semaine au Canada', text: 'Un ordre clair pour ne pas tout faire en même temps.', href: '/checklist/semaine-1', icon: ClipboardCheck },
      { label: 'Logement', title: 'Logement', text: 'Questions à poser, preuves à vérifier et signaux d’alerte avant de payer.', href: '/ressources', icon: Home },
      { label: 'Documents', title: 'Documents pratiques d’installation', text: 'NAS, santé, preuves utiles et liens officiels à garder sous la main.', href: '/parcours/guide/steps/nas', icon: FileCheck2 },
      { label: 'Emploi', title: 'Emploi / CV', text: 'Adapter ton CV, cibler tes premières recherches et éviter les fausses offres.', href: '/ressources', icon: BriefcaseBusiness },
      { label: 'Études', title: 'Études', text: 'Organiser les questions importantes avant campus, logement et budget.', href: '/ressources', icon: GraduationCap },
      { label: 'Pratique', title: 'Banque / téléphone', text: 'Comparer les options, comprendre les frais et préparer les bons rendez-vous.', href: '/parcours/guide/steps/bank', icon: Phone },
      { label: 'Vérifier', title: 'Vérifier une situation suspecte', text: 'Ralentir, vérifier les preuves et repérer les demandes à risque.', href: '/arnaques', icon: AlertTriangle },
    ],
    offersEyebrow: 'Nos offres',
    offersTitle: 'Choisis le niveau d’orientation adapté à ton moment.',
    offersText: 'Chaque appel reste informatif : l’objectif est de clarifier, prioriser et préparer tes prochaines actions.',
    reserve: 'Réserver',
    offers: [
      { title: 'Appel Orientation bêta', price: '10 $', duration: '30 minutes · 10 premiers appels', benefit: 'Clarifier ta situation et repartir avec les premières priorités.', note: 'Orientation informative, pas réglementée.' },
      { title: 'Appel Orientation', price: '29 $', duration: '30 minutes', benefit: 'Comprendre quoi faire, dans quel ordre, avec quelles ressources utiles.', note: 'Orientation informative, pas réglementée.' },
      { title: 'Pack Installation', price: '69 $', duration: '45 minutes + checklist personnalisée', benefit: 'Préparer ton arrivée ou organiser ta première semaine.', note: 'Checklist pratique incluse.' },
      { title: 'Pack Complet', price: '99 $', duration: '60 minutes + résumé détaillé', benefit: 'Obtenir un plan plus structuré avec priorités et erreurs à éviter.', note: 'Résumé détaillé après l’appel.' },
    ],
    howEyebrow: 'Comment ça marche',
    howTitle: 'Un parcours simple, de la demande au résumé.',
    howSteps: [
      { title: 'Explique ta situation', text: 'Tu partages ton profil général, ton moment et ce qui te bloque.', icon: MessageCircle },
      { title: 'Réserve un appel', text: 'Tu choisis une offre, tu envoies ta demande, puis tu confirmes un créneau.', icon: CalendarCheck },
      { title: 'Reçois une mini-feuille de route', text: 'Après l’appel, tu repars avec des priorités, ressources et erreurs à éviter.', icon: MailCheck },
    ],
    pathsEyebrow: 'Trouve ton parcours',
    pathsTitle: 'Choisis une situation, puis avance avec les bons repères.',
    tags: [
      { label: 'Je suis étudiant', href: '/ressources' },
      { label: 'Je viens bientôt au Canada', href: '/parcours' },
      { label: 'Je suis déjà arrivé', href: '/checklist' },
      { label: 'Je cherche un logement', href: '/ressources' },
      { label: 'Je veux trouver un emploi', href: '/ressources' },
      { label: 'Je suis perdu dans les démarches', href: '/contact' },
      { label: 'Je veux éviter une arnaque', href: '/arnaques' },
      { label: 'Je veux parler à quelqu’un', href: '/book' },
    ],
    storyEyebrow: 'Storytelling',
    storyTitle: 'Créé pour rendre l’arrivée au Canada plus claire.',
    storyText:
      'Marhaban Canada est pensé pour les personnes qui arrivent avec trop d’informations, trop de doutes et pas toujours quelqu’un à qui poser les bonnes questions.',
    values: [
      { title: 'Clarté', text: 'Mettre de l’ordre dans les premières priorités.' },
      { title: 'Confiance', text: 'S’appuyer sur des ressources utiles et des limites transparentes.' },
      { title: 'Humain', text: 'Parler simplement, sans jargon et sans pression.' },
    ],
    scopeEyebrow: 'Cadre clair',
    scopeTitle: 'Ce qu’on fait / ce qu’on ne fait pas',
    scope: {
      doesTitle: 'Ce qu’on fait',
      does: ['Orientation pratique', 'Checklist personnalisée', 'Ressources fiables', 'Priorisation des démarches', 'Vérification des signaux de risque'],
      doesNotTitle: 'Ce qu’on ne fait pas',
      doesNot: ['Conseil juridique', 'Conseil en immigration', 'Représentation', 'Garantie de logement', 'Garantie d’emploi', 'Remplacement d’un organisme gouvernemental'],
    },
    scamEyebrow: 'Anti-arnaque',
    scamTitle: 'Avant de payer quelqu’un, vérifie.',
    scamText:
      'Annonce de logement, promesse d’emploi, demande de paiement urgent ou situation douteuse : on t’aide à identifier les points à vérifier.',
    scamCta: 'Vérifier une situation suspecte',
    guidesEyebrow: 'Guides pratiques',
    guidesTitle: 'Lire vite, décider mieux, agir dans le bon ordre.',
    guides: [
      { title: 'Checklist avant d’arriver au Canada', text: 'Préparer les premières décisions avant le départ.', href: '/checklist', icon: ClipboardCheck },
      { title: 'Première semaine au Canada : par quoi commencer ?', text: 'Un ordre simple pour les premiers jours.', href: '/checklist/semaine-1', icon: BookOpenCheck },
      { title: 'Comment éviter les arnaques au logement ?', text: 'Les signaux à vérifier avant de payer.', href: '/arnaques', icon: ShieldCheck },
      { title: 'NAS, banque, téléphone : les premières démarches', text: 'Les repères pratiques à garder sous la main.', href: '/parcours/guide/steps/nas', icon: Landmark },
    ],
    socialEyebrow: 'Preuve sociale',
    socialTitle: 'Premiers retours bientôt disponibles.',
    socialText: 'Aucun faux témoignage : cette section restera basée sur des retours réels ou anonymisés.',
    socialQuotes: ['J’ai mieux compris mes priorités.', 'J’ai su quoi faire en premier.', 'J’ai évité de payer avant de vérifier.'],
    finalTitle: 'Tu n’as pas besoin de tout comprendre seul.',
    finalText: 'Réserve un appel et repars avec une vision plus claire de tes prochaines étapes.',
    finalResources: 'Voir les ressources',
    finalScam: 'Vérifier une situation suspecte',
  },
  en: {
    announcement: 'Orientation calls for newcomers — beta spots available',
    announcementCta: 'Book',
    heroEyebrow: 'Marhaban Canada — Practical orientation for newcomers to Canada',
    heroTitle: 'Arriving in Canada? We help you know what to do first.',
    heroSubtitle:
      'Clear, human support to understand your priorities, avoid mistakes, and move step by step.',
    primaryCta: 'Book a call',
    secondaryCta: 'View my journey',
    proof: ['FR / EN / AR', 'Practical orientation', 'Useful sources', 'Human approach'],
    visualChecklist: 'Arrival checklist',
    visualScam: 'Scam check',
    visualPlan: 'First-week plan',
    visualDoc: 'Practical settlement documents',
    visualTags: ['Housing', 'Banking', 'Phone', 'Priorities'],
    progressLabel: 'Your journey can start here',
    progressHelper: 'Progress stays local on your device.',
    needsEyebrow: 'Choose your need',
    needsTitle: 'Start with what is blocking you now.',
    needsText: 'Simple entry points to move from confusion to next steps.',
    needs: [
      { label: 'Prepare', title: 'Prepare my arrival', text: 'Budget, practical settlement documents, first decisions, and reliable markers.', href: '/parcours', icon: MapPinned },
      { label: 'Week 1', title: 'First week in Canada', text: 'A clear order so you do not do everything at once.', href: '/checklist/semaine-1', icon: ClipboardCheck },
      { label: 'Housing', title: 'Housing', text: 'Questions to ask, proof to check, and warning signs before paying.', href: '/ressources', icon: Home },
      { label: 'Documents', title: 'Practical settlement documents', text: 'SIN, health, useful proofs, and official links to keep nearby.', href: '/parcours/guide/steps/nas', icon: FileCheck2 },
      { label: 'Work', title: 'Work / CV', text: 'Adapt your CV, target early searches, and avoid fake offers.', href: '/ressources', icon: BriefcaseBusiness },
      { label: 'Studies', title: 'Studies', text: 'Organize key questions before campus, housing, and budget decisions.', href: '/ressources', icon: GraduationCap },
      { label: 'Practical', title: 'Bank / phone', text: 'Compare options, understand fees, and prepare the right appointments.', href: '/parcours/guide/steps/bank', icon: Phone },
      { label: 'Verify', title: 'Check a suspicious situation', text: 'Slow down, check evidence, and spot risky requests.', href: '/arnaques', icon: AlertTriangle },
    ],
    offersEyebrow: 'Our offers',
    offersTitle: 'Choose the orientation level that fits your moment.',
    offersText: 'Each call stays informational: the goal is to clarify, prioritize, and prepare your next actions.',
    reserve: 'Book',
    offers: [
      { title: 'Beta Orientation Call', price: '$10', duration: '30 minutes · first 10 calls', benefit: 'Clarify your situation and leave with first priorities.', note: 'Informational orientation, not regulated advice.' },
      { title: 'Orientation Call', price: '$29', duration: '30 minutes', benefit: 'Understand what to do, in what order, with useful resources.', note: 'Informational orientation, not regulated advice.' },
      { title: 'Settlement Pack', price: '$69', duration: '45 minutes + personalized checklist', benefit: 'Prepare your arrival or organize your first week.', note: 'Practical checklist included.' },
      { title: 'Complete Pack', price: '$99', duration: '60 minutes + detailed summary', benefit: 'Get a more structured plan with priorities and mistakes to avoid.', note: 'Detailed summary after the call.' },
    ],
    howEyebrow: 'How it works',
    howTitle: 'A simple path from request to summary.',
    howSteps: [
      { title: 'Explain your situation', text: 'Share your general profile, timing, and what is blocking you.', icon: MessageCircle },
      { title: 'Book a call', text: 'Choose an offer, send your request, then confirm a time slot.', icon: CalendarCheck },
      { title: 'Receive a mini-roadmap', text: 'After the call, leave with priorities, resources, and mistakes to avoid.', icon: MailCheck },
    ],
    pathsEyebrow: 'Find your path',
    pathsTitle: 'Choose a situation, then move with the right markers.',
    tags: [
      { label: 'I am a student', href: '/ressources' },
      { label: 'I am coming soon to Canada', href: '/parcours' },
      { label: 'I already arrived', href: '/checklist' },
      { label: 'I need housing', href: '/ressources' },
      { label: 'I want to find work', href: '/ressources' },
      { label: 'I feel lost in the steps', href: '/contact' },
      { label: 'I want to avoid a scam', href: '/arnaques' },
      { label: 'I want to talk to someone', href: '/book' },
    ],
    storyEyebrow: 'Story',
    storyTitle: 'Created to make arrival in Canada clearer.',
    storyText:
      'Marhaban Canada is built for people arriving with too much information, too many doubts, and not always someone to ask the right questions.',
    values: [
      { title: 'Clarity', text: 'Put the first priorities in order.' },
      { title: 'Trust', text: 'Use helpful resources and transparent boundaries.' },
      { title: 'Human', text: 'Speak simply, without jargon or pressure.' },
    ],
    scopeEyebrow: 'Clear scope',
    scopeTitle: 'What we do / what we do not do',
    scope: {
      doesTitle: 'What we do',
      does: ['Practical orientation', 'Personalized checklist', 'Reliable resources', 'Prioritizing steps', 'Checking risk signals'],
      doesNotTitle: 'What we do not do',
      doesNot: ['Legal advice', 'Immigration advice', 'Representation', 'Housing guarantee', 'Job guarantee', 'Replacing a government organization'],
    },
    scamEyebrow: 'Scam prevention',
    scamTitle: 'Before paying someone, verify.',
    scamText:
      'Housing listing, job promise, urgent payment request, or doubtful situation: we help you identify what to check.',
    scamCta: 'Check a suspicious situation',
    guidesEyebrow: 'Practical guides',
    guidesTitle: 'Read fast, decide better, act in the right order.',
    guides: [
      { title: 'Checklist before arriving in Canada', text: 'Prepare the first decisions before departure.', href: '/checklist', icon: ClipboardCheck },
      { title: 'First week in Canada: where to start?', text: 'A simple order for the first days.', href: '/checklist/semaine-1', icon: BookOpenCheck },
      { title: 'How to avoid housing scams?', text: 'Signals to verify before paying.', href: '/arnaques', icon: ShieldCheck },
      { title: 'SIN, banking, phone: first steps', text: 'Practical markers to keep nearby.', href: '/parcours/guide/steps/nas', icon: Landmark },
    ],
    socialEyebrow: 'Social proof',
    socialTitle: 'First feedback coming soon.',
    socialText: 'No fake testimonials: this section will stay based on real or anonymized feedback.',
    socialQuotes: ['I understood my priorities better.', 'I knew what to do first.', 'I avoided paying before checking.'],
    finalTitle: 'You do not need to understand everything alone.',
    finalText: 'Book a call and leave with a clearer view of your next practical steps.',
    finalResources: 'View resources',
    finalScam: 'Check a suspicious situation',
  },
  ar: {
    announcement: 'مكالمات توجيه للقادمين الجدد — أماكن تجريبية متاحة',
    announcementCta: 'احجز',
    heroEyebrow: 'مرحبا كندا — توجيه عملي للقادمين الجدد إلى كندا',
    heroTitle: 'هل تصل إلى كندا؟ نساعدك على معرفة ما تفعله أولاً.',
    heroSubtitle:
      'مرافقة واضحة وإنسانية لفهم أولوياتك، تجنب الأخطاء، والتقدم خطوة بخطوة.',
    primaryCta: 'احجز مكالمة',
    secondaryCta: 'اعرض مساري',
    proof: ['FR / EN / AR', 'توجيه عملي', 'مصادر مفيدة', 'نهج إنساني'],
    visualChecklist: 'قائمة الوصول',
    visualScam: 'مكافحة الاحتيال',
    visualPlan: 'خطة الأسبوع الأول',
    visualDoc: 'وثائق عملية للاستقرار',
    visualTags: ['السكن', 'البنك', 'الهاتف', 'الأولويات'],
    progressLabel: 'يمكن أن يبدأ مسارك من هنا',
    progressHelper: 'يبقى التقدم محفوظاً محلياً على جهازك.',
    needsEyebrow: 'اختر حاجتك',
    needsTitle: 'ابدأ بما يوقفك الآن.',
    needsText: 'مداخل بسيطة للانتقال من التشتت إلى الخطوات التالية.',
    needs: [
      { label: 'تحضير', title: 'تحضير وصولي', text: 'ميزانية، وثائق عملية للاستقرار، قرارات أولى ومصادر موثوقة.', href: '/parcours', icon: MapPinned },
      { label: 'الأسبوع 1', title: 'الأسبوع الأول في كندا', text: 'ترتيب واضح حتى لا تفعل كل شيء في نفس الوقت.', href: '/checklist/semaine-1', icon: ClipboardCheck },
      { label: 'السكن', title: 'السكن', text: 'أسئلة مهمة، أدلة يجب التحقق منها، وإشارات تحذير قبل الدفع.', href: '/ressources', icon: Home },
      { label: 'وثائق', title: 'وثائق عملية للاستقرار', text: 'رقم التأمين، الصحة، الإثباتات المفيدة والروابط الرسمية.', href: '/parcours/guide/steps/nas', icon: FileCheck2 },
      { label: 'عمل', title: 'العمل / السيرة', text: 'تعديل السيرة، بدء البحث وتجنب العروض الوهمية.', href: '/ressources', icon: BriefcaseBusiness },
      { label: 'دراسة', title: 'الدراسة', text: 'تنظيم الأسئلة المهمة قبل الجامعة والسكن والميزانية.', href: '/ressources', icon: GraduationCap },
      { label: 'عملي', title: 'البنك / الهاتف', text: 'مقارنة الخيارات وفهم الرسوم وتحضير المواعيد المناسبة.', href: '/parcours/guide/steps/bank', icon: Phone },
      { label: 'تحقق', title: 'تحقق من وضع مشبوه', text: 'تمهل، تحقق من الأدلة، وانتبه للطلبات عالية المخاطر.', href: '/arnaques', icon: AlertTriangle },
    ],
    offersEyebrow: 'عروضنا',
    offersTitle: 'اختر مستوى التوجيه المناسب لمرحلتك.',
    offersText: 'كل مكالمة معلوماتية: الهدف هو التوضيح، ترتيب الأولويات، وتحضير الخطوات التالية.',
    reserve: 'احجز',
    offers: [
      { title: 'مكالمة توجيه بيتا', price: '10 $', duration: '30 دقيقة · أول 10 مكالمات', benefit: 'توضيح وضعك العام والخروج بأولويات أولى.', note: 'توجيه معلوماتي وليس خدمة منظمة.' },
      { title: 'مكالمة توجيه', price: '29 $', duration: '30 دقيقة', benefit: 'فهم ماذا تفعل، وبأي ترتيب، ومع أي موارد مفيدة.', note: 'توجيه معلوماتي وليس خدمة منظمة.' },
      { title: 'حزمة الاستقرار', price: '69 $', duration: '45 دقيقة + قائمة تحقق مخصصة', benefit: 'تحضير وصولك أو تنظيم أسبوعك الأول.', note: 'تشمل قائمة تحقق عملية.' },
      { title: 'الحزمة الكاملة', price: '99 $', duration: '60 دقيقة + ملخص مفصل', benefit: 'خطة أكثر تنظيماً مع أولويات وأخطاء يجب تجنبها.', note: 'ملخص مفصل بعد المكالمة.' },
    ],
    howEyebrow: 'كيف يعمل',
    howTitle: 'مسار بسيط من الطلب إلى الملخص.',
    howSteps: [
      { title: 'اشرح وضعك', text: 'تشارك ملفك العام، توقيتك، وما يوقفك.', icon: MessageCircle },
      { title: 'احجز مكالمة', text: 'تختار عرضاً، ترسل طلبك، ثم تؤكد موعداً.', icon: CalendarCheck },
      { title: 'استلم خارطة طريق صغيرة', text: 'بعد المكالمة، تحصل على أولويات وموارد وأخطاء يجب تجنبها.', icon: MailCheck },
    ],
    pathsEyebrow: 'ابحث عن مسارك',
    pathsTitle: 'اختر وضعك ثم تقدم مع الإرشادات المناسبة.',
    tags: [
      { label: 'أنا طالب', href: '/ressources' },
      { label: 'سأصل قريباً إلى كندا', href: '/parcours' },
      { label: 'وصلت بالفعل', href: '/checklist' },
      { label: 'أبحث عن سكن', href: '/ressources' },
      { label: 'أريد إيجاد عمل', href: '/ressources' },
      { label: 'أنا تائه في الخطوات', href: '/contact' },
      { label: 'أريد تجنب احتيال', href: '/arnaques' },
      { label: 'أريد التحدث مع شخص', href: '/book' },
    ],
    storyEyebrow: 'القصة',
    storyTitle: 'صُمم لجعل الوصول إلى كندا أوضح.',
    storyText:
      'مرحبا كندا موجه للأشخاص الذين يصلون مع معلومات كثيرة، شكوك كثيرة، وليس دائماً شخص يطرحون عليه الأسئلة الصحيحة.',
    values: [
      { title: 'وضوح', text: 'ترتيب الأولويات الأولى.' },
      { title: 'ثقة', text: 'استخدام موارد مفيدة وحدود واضحة.' },
      { title: 'إنساني', text: 'كلام بسيط بدون تعقيد أو ضغط.' },
    ],
    scopeEyebrow: 'إطار واضح',
    scopeTitle: 'ما نفعله / ما لا نفعله',
    scope: {
      doesTitle: 'ما نفعله',
      does: ['توجيه عملي', 'قائمة تحقق مخصصة', 'موارد موثوقة', 'ترتيب الخطوات', 'التحقق من إشارات الخطر'],
      doesNotTitle: 'ما لا نفعله',
      doesNot: ['نصيحة قانونية', 'نصيحة في الهجرة', 'تمثيل', 'ضمان سكن', 'ضمان عمل', 'استبدال جهة حكومية'],
    },
    scamEyebrow: 'مكافحة الاحتيال',
    scamTitle: 'قبل أن تدفع لأي شخص، تحقق.',
    scamText:
      'إعلان سكن، وعد عمل، طلب دفع عاجل أو وضع مشكوك فيه: نساعدك على تحديد ما يجب التحقق منه.',
    scamCta: 'تحقق من وضع مشبوه',
    guidesEyebrow: 'أدلة عملية',
    guidesTitle: 'اقرأ بسرعة، قرر أفضل، وتصرف بالترتيب الصحيح.',
    guides: [
      { title: 'قائمة تحقق قبل الوصول إلى كندا', text: 'تحضير القرارات الأولى قبل السفر.', href: '/checklist', icon: ClipboardCheck },
      { title: 'الأسبوع الأول في كندا: من أين أبدأ؟', text: 'ترتيب بسيط للأيام الأولى.', href: '/checklist/semaine-1', icon: BookOpenCheck },
      { title: 'كيف أتجنب احتيال السكن؟', text: 'إشارات يجب التحقق منها قبل الدفع.', href: '/arnaques', icon: ShieldCheck },
      { title: 'رقم التأمين، البنك، الهاتف: الخطوات الأولى', text: 'إرشادات عملية تبقى قريبة منك.', href: '/parcours/guide/steps/nas', icon: Landmark },
    ],
    socialEyebrow: 'آراء',
    socialTitle: 'أول الآراء ستكون متاحة قريباً.',
    socialText: 'لا توجد شهادات وهمية: ستبقى هذه المساحة مبنية على آراء حقيقية أو مجهولة.',
    socialQuotes: ['فهمت أولوياتي بشكل أفضل.', 'عرفت ماذا أفعل أولاً.', 'تجنبت الدفع قبل التحقق.'],
    finalTitle: 'لا تحتاج إلى فهم كل شيء وحدك.',
    finalText: 'احجز مكالمة واخرج برؤية أوضح لخطواتك العملية التالية.',
    finalResources: 'عرض الموارد',
    finalScam: 'تحقق من وضع مشبوه',
  },
} as const satisfies Record<Locale, unknown>;

export default function HomePage() {
  const { locale } = useLanguage();
  const { dir } = getHtmlAttrs(locale);
  const [hasStarted, setHasStarted] = useLocalStorageState<boolean>('mc_has_started', {
    defaultValue: false,
    parse: (value) => value === 'true',
    serialize: (value) => (value ? 'true' : 'false'),
  });
  const t = homeTexts[locale] ?? homeTexts.fr;

  const handleStart = useCallback(() => {
    setHasStarted(true);
  }, [setHasStarted]);

  return (
    <HomepageGsapEffects>
      <main className="warm-page overflow-hidden" dir={dir}>
        <AnnouncementBar message={t.announcement} cta={t.announcementCta} />

        <section className="relative px-4 pb-10 pt-8 sm:px-6 lg:px-8">
          <div className="mx-auto grid min-h-[calc(100svh-132px)] max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="relative z-10 max-w-3xl py-8 sm:py-12">
              <p className="inline-flex rounded-full border border-marhaban-leaf/15 bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-marhaban-leaf shadow-warm-sm" data-animate="hero-item">
                {t.heroEyebrow}
              </p>
              <h1 className="mt-6 text-5xl font-semibold leading-[0.98] text-marhaban-ink sm:text-6xl lg:text-7xl" data-animate="hero-item">
                {t.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-base text-slate-700 sm:text-lg" data-animate="hero-item">
                {t.heroSubtitle}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3" data-animate="hero-item">
                <LocalizedLink href="/book" className="inline-flex min-h-[54px] items-center gap-2 rounded-full bg-marhaban-ink px-6 py-3 text-sm font-bold text-white shadow-warm transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/45 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-cream">
                  {t.primaryCta}
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                </LocalizedLink>
                <LocalizedLink href="/parcours" onClick={handleStart} className="inline-flex min-h-[54px] items-center gap-2 rounded-full border border-marhaban-leaf/25 bg-white/85 px-6 py-3 text-sm font-bold text-marhaban-ink shadow-warm-sm transition hover:bg-marhaban-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-cream">
                  {t.secondaryCta}
                  <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
                </LocalizedLink>
              </div>
              <div className="mt-8 grid gap-2 sm:grid-cols-2" data-animate="hero-item">
                {t.proof.map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 text-xs font-semibold text-marhaban-ink ring-1 ring-marhaban-leaf/10">
                    <CheckCircle2 className="h-3.5 w-3.5 text-marhaban-leaf" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <HeroVisual
              checklist={t.visualChecklist}
              scam={t.visualScam}
              plan={t.visualPlan}
              doc={t.visualDoc}
              tags={t.visualTags}
            />
          </div>
        </section>

        <section className="bg-marhaban-ink px-4 py-5 text-white sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[1fr_1fr] md:items-center" data-animate="section">
            <ProgressBar progress={hasStarted ? 16 : 0} label={t.progressLabel} helper={t.progressHelper} />
            <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
              <ProvinceSelector />
            </div>
          </div>
        </section>

        <SectionBand>
          <SectionHeader eyebrow={t.needsEyebrow} title={t.needsTitle} text={t.needsText} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-animate-group>
            {t.needs.map((item) => (
              <NeedCard key={item.title} item={item} onStart={handleStart} />
            ))}
          </div>
        </SectionBand>

        <SectionBand className="bg-white/60">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <SectionHeader eyebrow={t.offersEyebrow} title={t.offersTitle} text={t.offersText} />
            <div className="rounded-3xl border border-marhaban-leaf/10 bg-marhaban-mint/65 p-5 shadow-warm-sm">
              <p className="text-sm font-semibold leading-relaxed text-marhaban-ink">{disclaimer[locale]}</p>
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4" data-animate-group>
            {t.offers.map((offer, index) => (
              <OfferCard key={offer.title} offer={offer} cta={t.reserve} featured={index === 1} />
            ))}
          </div>
        </SectionBand>

        <SectionBand>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <SectionHeader eyebrow={t.howEyebrow} title={t.howTitle} />
            <div className="grid gap-4 md:grid-cols-3" data-animate-group>
              {t.howSteps.map((step, index) => (
                <StepCard key={step.title} step={step} index={index} />
              ))}
            </div>
          </div>
        </SectionBand>

        <SectionBand className="bg-marhaban-mint/70">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <SectionHeader eyebrow={t.pathsEyebrow} title={t.pathsTitle} />
            <div className="flex flex-wrap gap-3 rounded-3xl border border-marhaban-leaf/15 bg-marhaban-cream/85 p-5 shadow-warm-sm">
              {t.tags.map((tag, index) => (
                <JourneyTag key={tag.label} tag={tag} index={index} onStart={handleStart} />
              ))}
            </div>
          </div>
        </SectionBand>

        <section className="bg-marhaban-ink px-4 py-14 text-white sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center" data-animate="section">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-gold">{t.storyEyebrow}</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">{t.storyTitle}</h2>
              <p className="mt-5 max-w-2xl text-base text-white/75 sm:text-lg">{t.storyText}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {t.values.map((value) => (
                <article key={value.title} className="rounded-3xl border border-white/10 bg-white/[0.08] p-5 shadow-warm-sm">
                  <HeartHandshake className="h-7 w-7 text-marhaban-gold" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-semibold text-white">{value.title}</h3>
                  <p className="mt-3 text-sm text-white/70">{value.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <SectionBand className="bg-white/65">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <SectionHeader eyebrow={t.scopeEyebrow} title={t.scopeTitle} />
            <ScopeCards scope={t.scope} />
          </div>
        </SectionBand>

        <section className="bg-[#F3D7B3] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 rounded-3xl border border-amber-900/10 bg-[#FFF4E3] p-6 shadow-warm sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center" data-animate="section">
            <div>
              <p className="inline-flex rounded-full bg-amber-900 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white">{t.scamEyebrow}</p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-amber-950 sm:text-5xl">{t.scamTitle}</h2>
            </div>
            <div>
              <p className="text-base text-amber-950/80 sm:text-lg">{t.scamText}</p>
              <LocalizedLink href="/arnaques" className="mt-6 inline-flex min-h-[50px] items-center gap-2 rounded-full bg-amber-900 px-6 py-3 text-sm font-bold text-white shadow-warm-sm transition hover:bg-amber-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF4E3]">
                {t.scamCta}
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              </LocalizedLink>
            </div>
          </div>
        </section>

        <SectionBand>
          <SectionHeader eyebrow={t.guidesEyebrow} title={t.guidesTitle} />
          <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr_0.95fr]" data-animate-group>
            {t.guides.map((guide, index) => (
              <GuideCard key={guide.title} guide={guide} featured={index === 0} />
            ))}
          </div>
        </SectionBand>

        <SectionBand className="bg-white/65">
          <div className="grid gap-6 rounded-3xl border border-marhaban-leaf/15 bg-marhaban-mint/75 p-6 shadow-warm sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-leaf">{t.socialEyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold text-marhaban-ink sm:text-4xl">{t.socialTitle}</h2>
              <p className="mt-3 text-sm text-slate-700">{t.socialText}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {t.socialQuotes.map((quote) => (
                <p key={quote} className="rounded-2xl bg-white/85 p-5 text-sm font-semibold text-marhaban-ink shadow-warm-sm">
                  “{quote}”
                </p>
              ))}
            </div>
          </div>
        </SectionBand>

        <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8" data-floating-book-call-hide>
          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-marhaban-ink text-white shadow-warm">
            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-gold">Marhaban Canada</p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-5xl">{t.finalTitle}</h2>
                <p className="mt-4 max-w-2xl text-base text-white/75">{t.finalText}</p>
                <p className="mt-5 max-w-3xl text-xs leading-relaxed text-white/55">{disclaimer[locale]}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
                <LocalizedLink href="/book" className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-marhaban-ink transition hover:bg-marhaban-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-ink">
                  {t.primaryCta}
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                </LocalizedLink>
                <LocalizedLink href="/ressources" className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-white/25 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-ink">
                  {t.finalResources}
                </LocalizedLink>
                <LocalizedLink href="/arnaques" className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-white/25 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-ink">
                  {t.finalScam}
                </LocalizedLink>
              </div>
            </div>
          </div>
        </section>
      </main>
    </HomepageGsapEffects>
  );
}

function AnnouncementBar({ message, cta }: { message: string; cta: string }) {
  return (
    <section className="border-b border-marhaban-leaf/10 bg-marhaban-ink px-4 py-3 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 text-center sm:justify-between sm:text-start">
        <p className="text-sm font-semibold text-white/88">{message}</p>
        <LocalizedLink href="/book" className="inline-flex min-h-[36px] items-center rounded-full bg-white px-4 py-1.5 text-sm font-bold text-marhaban-ink transition hover:bg-marhaban-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
          {cta}
        </LocalizedLink>
      </div>
    </section>
  );
}

function SectionBand({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={cn('px-4 py-12 sm:px-6 sm:py-16 lg:px-8', className)} data-animate="section">
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-clay">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold leading-tight text-marhaban-ink sm:text-4xl lg:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-base text-slate-700 sm:text-lg">{text}</p> : null}
    </div>
  );
}

function HeroVisual({
  checklist,
  scam,
  plan,
  doc,
  tags,
}: {
  checklist: string;
  scam: string;
  plan: string;
  doc: string;
  tags: readonly string[];
}) {
  return (
    <div className="relative min-h-[560px] lg:min-h-[680px]" aria-hidden="true">
      <div className="absolute inset-0 rounded-[2rem] bg-marhaban-mint shadow-warm" />
      <div className="absolute left-8 top-8 h-40 w-40 rounded-[45%_55%_60%_40%/45%_35%_65%_55%] bg-marhaban-sand/45 blur-xl" data-animate="hero-float" />
      <div className="absolute bottom-16 right-2 h-52 w-52 rounded-[55%_45%_42%_58%/40%_50%_50%_60%] bg-marhaban-clay/20 blur-2xl" data-animate="hero-float" />

      <div className="absolute left-5 top-8 w-64 rotate-[-4deg] rounded-3xl border border-marhaban-leaf/15 bg-white p-5 shadow-warm sm:left-10 sm:w-72" data-animate="hero-card">
        <div className="flex items-center justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-marhaban-ink text-white">
            <ClipboardCheck className="h-5 w-5" />
          </span>
          <BadgeCheck className="h-7 w-7 text-marhaban-leaf" />
        </div>
        <p className="mt-7 text-xs font-bold uppercase tracking-[0.12em] text-marhaban-clay">{checklist}</p>
        <div className="mt-4 space-y-3">
          {[0, 1, 2].map((item) => (
            <span key={item} className="flex items-center gap-3">
              <span className="h-4 w-4 rounded-full bg-marhaban-mint ring-1 ring-marhaban-leaf/20" />
              <span className={cn('h-2 rounded-full bg-stone-200', item === 1 ? 'w-2/3' : 'w-full')} />
            </span>
          ))}
        </div>
      </div>

      <div className="absolute right-4 top-32 w-60 rotate-[5deg] rounded-3xl border border-amber-900/10 bg-[#FFF4E3] p-5 shadow-warm sm:right-10 sm:w-72" data-animate="hero-card">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-900 text-white">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <p className="text-sm font-bold text-amber-950">{scam}</p>
        </div>
        <p className="mt-5 text-2xl font-semibold leading-tight text-amber-950">{plan}</p>
      </div>

      <div className="absolute bottom-28 left-8 right-8 rounded-3xl bg-marhaban-ink p-6 text-white shadow-warm sm:left-16 sm:right-16" data-animate="hero-card">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-gold">{doc}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[FileCheck2, Banknote, Home].map((Icon, index) => (
            <div key={index} className="rounded-2xl bg-white/[0.08] p-3">
              <Icon className="h-5 w-5 text-white/78" />
              <span className="mt-6 block h-2 rounded-full bg-white/18" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-4 right-4 flex flex-wrap justify-center gap-2">
        {tags.map((tag, index) => (
          <span key={tag} className={cn('rounded-full px-4 py-2 text-xs font-bold shadow-warm-sm', index % 2 === 0 ? 'bg-white text-marhaban-ink' : 'bg-marhaban-clay text-white')} data-animate="hero-card">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function NeedCard({ item, onStart }: { item: NeedCardData; onStart: () => void }) {
  const Icon = item.icon;
  return (
    <LocalizedLink href={item.href} onClick={item.href === '/parcours' || item.href === '/checklist/semaine-1' ? onStart : undefined} className="group flex min-h-[240px] flex-col justify-between rounded-3xl border border-marhaban-leaf/10 bg-white p-5 shadow-warm-sm transition hover:-translate-y-1 hover:shadow-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35" data-animate="card">
      <div>
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full bg-marhaban-mint px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-marhaban-leaf">{item.label}</span>
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-marhaban-ink text-white">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>
        <h3 className="mt-7 text-xl font-semibold text-marhaban-ink">{item.title}</h3>
        <p className="mt-3 text-sm text-slate-600">{item.text}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-marhaban-leaf">
        <ArrowRight className="h-4 w-4 rtl-flip transition group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </LocalizedLink>
  );
}

function OfferCard({ offer, cta, featured }: { offer: OfferData; cta: string; featured: boolean }) {
  return (
    <article className={cn('flex min-h-[350px] flex-col rounded-3xl border p-6 shadow-warm-sm', featured ? 'border-marhaban-ink bg-marhaban-ink text-white' : 'border-stone-200 bg-marhaban-cream text-marhaban-ink')} data-animate="offer-card">
      <p className={cn('text-xs font-bold uppercase tracking-[0.12em]', featured ? 'text-marhaban-gold' : 'text-marhaban-clay')}>{offer.duration}</p>
      <h3 className={cn('mt-4 text-2xl font-semibold', featured ? 'text-white' : 'text-marhaban-ink')}>{offer.title}</h3>
      <p className={cn('mt-3 text-4xl font-semibold', featured ? 'text-white' : 'text-marhaban-leaf')}>{offer.price}</p>
      <p className={cn('mt-4 text-sm', featured ? 'text-white/76' : 'text-slate-700')}>{offer.benefit}</p>
      <p className={cn('mt-4 rounded-2xl px-3 py-2 text-xs font-semibold', featured ? 'bg-white/[0.08] text-white/70' : 'bg-white/75 text-slate-600')}>{offer.note}</p>
      <LocalizedLink href="/book" className={cn('mt-auto inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2', featured ? 'bg-white text-marhaban-ink hover:bg-marhaban-mint focus-visible:ring-white/50 focus-visible:ring-offset-marhaban-ink' : 'bg-marhaban-ink text-white hover:bg-marhaban-leaf focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-marhaban-cream')}>
        {cta}
        <CalendarCheck className="h-4 w-4" aria-hidden="true" />
      </LocalizedLink>
    </article>
  );
}

function StepCard({ step, index }: { step: StepData; index: number }) {
  const Icon = step.icon;
  return (
    <article className="rounded-3xl border border-stone-200 bg-white p-5 shadow-warm-sm" data-animate="card">
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-marhaban-mint text-marhaban-leaf">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="text-3xl font-semibold text-marhaban-clay/30">{index + 1}</span>
      </div>
      <h3 className="mt-6 text-xl font-semibold text-marhaban-ink">{step.title}</h3>
      <p className="mt-3 text-sm text-slate-600">{step.text}</p>
    </article>
  );
}

function JourneyTag({ tag, index, onStart }: { tag: { label: string; href: string }; index: number; onStart: () => void }) {
  const isDark = index % 4 === 0;
  return (
    <LocalizedLink href={tag.href} onClick={tag.href === '/parcours' || tag.href === '/checklist' ? onStart : undefined} className={cn('inline-flex min-h-[48px] items-center rounded-full px-5 py-3 text-sm font-bold shadow-warm-sm transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35', isDark ? 'bg-marhaban-ink text-white' : 'bg-white text-marhaban-ink')} data-animate="pill">
      {tag.label}
    </LocalizedLink>
  );
}

function ScopeCards({ scope }: { scope: ScopeData }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <article className="rounded-3xl border border-marhaban-leaf/15 bg-marhaban-mint/75 p-6 shadow-warm-sm">
        <h3 className="text-xl font-semibold text-marhaban-ink">{scope.doesTitle}</h3>
        <ul className="mt-5 space-y-3">
          {scope.does.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-marhaban-leaf" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </article>
      <article className="rounded-3xl border border-amber-200 bg-[#FFF4E3] p-6 shadow-warm-sm">
        <h3 className="text-xl font-semibold text-marhaban-ink">{scope.doesNotTitle}</h3>
        <ul className="mt-5 space-y-3">
          {scope.doesNot.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-amber-950/80">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-marhaban-clay" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}

function GuideCard({ guide, featured }: { guide: LinkCardData; featured: boolean }) {
  const Icon = guide.icon;
  return (
    <article className={cn('flex min-h-[260px] flex-col justify-between rounded-3xl border p-5 shadow-warm-sm', featured ? 'bg-marhaban-ink text-white lg:row-span-2' : 'border-stone-200 bg-white text-marhaban-ink')} data-animate="card">
      <div>
        <span className={cn('grid h-11 w-11 place-items-center rounded-2xl', featured ? 'bg-white/10 text-marhaban-gold' : 'bg-marhaban-mint text-marhaban-leaf')}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className={cn('mt-6 text-xl font-semibold leading-tight', featured ? 'text-white sm:text-3xl' : 'text-marhaban-ink')}>{guide.title}</h3>
        <p className={cn('mt-3 text-sm', featured ? 'text-white/72' : 'text-slate-600')}>{guide.text}</p>
      </div>
      <LocalizedLink href={guide.href} className={cn('mt-6 inline-flex items-center gap-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35', featured ? 'text-white' : 'text-marhaban-leaf hover:text-marhaban-ink')}>
        <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
        <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
      </LocalizedLink>
    </article>
  );
}
