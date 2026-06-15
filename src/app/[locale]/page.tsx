'use client';

import { useCallback } from 'react';
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
  Home,
  Landmark,
  MapPinned,
  Phone,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import { ProgressBar } from '@/components/ProgressBar';
import { ProvinceSelector } from '@/components/ProvinceSelector';
import { useLanguage } from '@/components/LanguageProvider';
import { HomepageGsapEffects } from '@/components/animations/HomepageGsapEffects';
import { getHtmlAttrs, type Locale } from '@/i18n/locales';
import { useLocalStorageState } from '@/lib/useLocalStorageState';
import { cn } from '@/lib/cn';

type VisualCard = {
  label: string;
  title: string;
  text: string;
  href: string;
  icon: LucideIcon;
};

type OfferCard = {
  eyebrow: string;
  title: string;
  price: string;
  detail: string;
  points: readonly string[];
};

type TagCard = {
  label: string;
  href: string;
};

type GuideCard = {
  category: string;
  title: string;
  text: string;
  href: string;
};

const homeTexts = {
  fr: {
    heroEyebrow: 'Marhaban Canada — Orientation pratique pour nouveaux arrivants au Canada',
    heroTitle: 'Tu arrives au Canada ? On t’aide à savoir quoi faire en premier.',
    heroSubtitle:
      'En 30 minutes, repars avec une mini-feuille de route claire : tes priorités, tes prochaines étapes et les erreurs à éviter.',
    primaryCta: 'Réserver un appel',
    secondaryCta: 'Voir mon parcours',
    proof: ['FR / EN / AR', 'Sources à vérifier', 'Approche humaine'],
    visualPassport: 'Dossier arrivée',
    visualChecklist: 'Priorités cette semaine',
    visualMap: 'Canada',
    visualTags: ['Logement', 'NAS', 'Banque', 'Anti-arnaque'],
    progressLabel: 'Ton parcours peut commencer ici',
    progressHelper: 'La progression reste locale sur ton appareil.',
    needsEyebrow: 'Choisis ton besoin',
    needsTitle: 'Commence par le sujet qui te bloque maintenant.',
    needsText:
      'Chaque entrée mène vers un repère clair, sans jargon inutile et sans promesse réglementée.',
    needs: [
      { label: 'Préparer', title: 'Avant arrivée', text: 'Documents pratiques d’installation, budget, premières décisions et sources à garder sous la main.', href: '/parcours', icon: MapPinned },
      { label: 'S’installer', title: 'Première semaine', text: 'Les démarches à prioriser dès les premiers jours au Canada.', href: '/checklist/semaine-1', icon: ClipboardCheck },
      { label: 'Trouver', title: 'Logement', text: 'Repères pratiques, questions à poser et signaux d’alerte avant de payer.', href: '/ressources', icon: Home },
      { label: 'Comprendre', title: 'Documents pratiques d’installation', text: 'NAS, santé, preuves utiles et liens officiels à vérifier pour ton installation.', href: '/parcours/guide/steps/nas', icon: FileCheck2 },
      { label: 'Avancer', title: 'Emploi / CV', text: 'Adapter ton CV, cibler les premières recherches et éviter les fausses offres.', href: '/ressources', icon: BriefcaseBusiness },
      { label: 'Étudier', title: 'Études', text: 'Organiser les questions importantes avant campus, logement et budget.', href: '/ressources', icon: GraduationCap },
      { label: 'Pratique', title: 'Banque / Téléphone', text: 'Comparer, ouvrir les bons comptes et comprendre les premiers frais.', href: '/parcours/guide/steps/bank', icon: Phone },
      { label: 'Vérifier', title: 'Situation suspecte', text: 'Ralentir, vérifier les preuves et repérer les demandes à risque.', href: '/arnaques', icon: AlertTriangle },
    ],
    servicesEyebrow: 'Nos offres',
    servicesTitle: 'Choisis le niveau d’orientation pratique adapté à ton moment.',
    offerDisclaimer:
      'Accompagnement informatif. Ne remplace pas un professionnel autorisé pour les questions juridiques ou réglementées.',
    services: [
      {
        eyebrow: '30 min · 10 premiers appels',
        title: 'Appel Orientation bêta',
        price: '10 $',
        detail: 'Pour repartir avec une clarification de ta situation, des priorités pratiques et des étapes recommandées.',
        points: ['Clarification de ta situation', 'Priorités pratiques', 'Ressources utiles', 'Résumé après l’appel'],
      },
      {
        eyebrow: '30 min',
        title: 'Appel Orientation',
        price: '29 $',
        detail: 'Pour comprendre quoi faire, dans quel ordre, avec quelles ressources utiles et quelles erreurs éviter.',
        points: ['Ordre des étapes', 'Ressources utiles', 'Erreurs à éviter'],
      },
      {
        eyebrow: '45 min + checklist',
        title: 'Pack Installation',
        price: '69 $',
        detail: 'Pour préparer ton arrivée ou organiser ta première semaine avec une checklist personnalisée.',
        points: ['Checklist personnalisée', 'Première semaine', 'Documents pratiques d’installation'],
      },
      {
        eyebrow: '60 min + résumé détaillé',
        title: 'Pack Complet',
        price: '99 $',
        detail: 'Pour les personnes qui veulent un plan plus structuré, clair et facile à suivre.',
        points: ['Plan structuré', 'Résumé détaillé', 'Priorités et erreurs à éviter'],
      },
    ],
    reserve: 'Réserver',
    discoverEyebrow: 'Trouve ton parcours',
    discoverTitle: 'Choisis une situation, puis avance avec les bons repères.',
    discoverText:
      'Les tags servent de portes d’entrée rapides. Pas besoin de tout lire pour commencer.',
    tags: [
      { label: 'Je suis étudiant', href: '/ressources' },
      { label: 'Je viens bientôt', href: '/parcours' },
      { label: 'Je suis déjà arrivé', href: '/checklist' },
      { label: 'Je cherche un logement', href: '/ressources' },
      { label: 'Je veux travailler', href: '/ressources' },
      { label: 'Je veux éviter une arnaque', href: '/arnaques' },
      { label: 'Je suis perdu', href: '/contact' },
    ],
    storyEyebrow: 'Comment ça marche',
    storyTitle: 'Une méthode simple pour transformer le flou en prochaines étapes.',
    storyText:
      'Tu expliques ton profil général, on clarifie tes priorités, puis tu repars avec des étapes pratiques, des ressources utiles et les erreurs à éviter.',
    values: [
      { title: '1. Clarifier', text: 'Ton profil général, ton moment et tes blocages.' },
      { title: '2. Prioriser', text: 'Ce qui compte maintenant, sans tout mélanger.' },
      { title: '3. Avancer', text: 'Une mini-feuille de route claire et utile.' },
    ],
    scopeEyebrow: 'Cadre clair',
    scopeTitle: 'Ce qu’on fait / ce qu’on ne fait pas',
    doesTitle: 'Ce qu’on fait',
    does: ['Orientation pratique', 'Priorités', 'Ressources utiles', 'Erreurs à éviter', 'Documents pratiques d’installation'],
    doesNotTitle: 'Ce qu’on ne fait pas',
    doesNot: ['Conseils juridiques', 'Conseils en immigration', 'Service de visa ou permis', 'Garantie de logement', 'Garantie d’emploi'],
    scamEyebrow: 'Anti-arnaque',
    scamTitle: 'Avant de payer quelqu’un, vérifie.',
    scamText:
      'Logement trop beau, faux recruteur, pression pour payer vite, promesse garantie : ralentis et vérifie avant d’envoyer de l’argent ou des documents pratiques d’installation.',
    scamCta: 'Vérifier une situation suspecte',
    guidesEyebrow: 'Guides pratiques',
    guidesTitle: 'Un format journal pour lire vite, agir mieux.',
    guides: [
      { category: 'Premiers jours', title: 'La checklist de la première semaine', text: 'Un ordre simple pour ne pas tout faire en même temps.', href: '/checklist/semaine-1' },
      { category: 'Installation', title: 'NAS, santé, banque : quoi vérifier ?', text: 'Les étapes pratiques fréquentes et les liens à garder sous la main.', href: '/parcours/guide/steps/nas' },
      { category: 'Logement', title: 'Repérer une annonce risquée', text: 'Les signaux qui doivent te faire ralentir avant de payer.', href: '/arnaques' },
      { category: 'Ressources', title: 'Où chercher une information fiable', text: 'Retrouver les bons organismes et préparer les bonnes questions.', href: '/ressources' },
    ],
    soonEyebrow: 'Retours',
    soonTitle: 'Premiers retours bientôt disponibles.',
    soonText:
      'La section témoignages sera publiée avec des retours réels. En attendant, Marhaban Canada garde une promesse simple : clarté, prudence et accompagnement général.',
    finalTitle: 'Tu n’as pas besoin de tout comprendre seul.',
    finalText: 'Réserve un appel et repars avec une vision plus claire de tes prochaines étapes.',
    finalResources: 'Voir les ressources',
    finalScam: 'Vérifier une situation suspecte',
    footerColumns: [
      { title: 'Accompagnement', links: ['Appel découverte', 'Appel orientation', 'Pack accompagnement'] },
      { title: 'Ressources', links: ['Parcours', 'Checklist', 'Guides pratiques'] },
      { title: 'Confiance', links: ['Anti-arnaque', 'Sources officielles', 'Cadre du service'] },
      { title: 'Langues', links: ['Français', 'English', 'العربية'] },
    ],
    disclaimer:
      'Marhaban Canada offre de l’orientation pratique et de l’information générale. Nous ne fournissons pas de conseils juridiques ni de conseils en immigration. Pour les questions liées aux visas, permis, résidence permanente, admissibilité ou stratégie d’immigration, veuillez consulter un représentant autorisé.',
  },
  en: {
    heroEyebrow: 'Marhaban Canada — Practical orientation for newcomers to Canada',
    heroTitle: 'Arriving in Canada? We help you know what to do first.',
    heroSubtitle:
      'In 30 minutes, leave with a clear mini-roadmap: your priorities, next practical steps, and mistakes to avoid.',
    primaryCta: 'Book a call',
    secondaryCta: 'View my journey',
    proof: ['FR / EN / AR', 'Sources to verify', 'Human approach'],
    visualPassport: 'Arrival file',
    visualChecklist: 'This week’s priorities',
    visualMap: 'Canada',
    visualTags: ['Housing', 'SIN', 'Banking', 'Scam check'],
    progressLabel: 'Your journey can start here',
    progressHelper: 'Progress stays local on your device.',
    needsEyebrow: 'Choose your need',
    needsTitle: 'Start with the topic blocking you right now.',
    needsText:
      'Each entry leads to clear guidance, without unnecessary jargon or regulated promises.',
    needs: [
      { label: 'Prepare', title: 'Before arrival', text: 'Practical settlement documents, budget, first decisions, and sources to keep nearby.', href: '/parcours', icon: MapPinned },
      { label: 'Settle', title: 'First week', text: 'The steps to prioritize during your first days in Canada.', href: '/checklist/semaine-1', icon: ClipboardCheck },
      { label: 'Find', title: 'Housing', text: 'Practical markers, questions to ask, and warning signs before paying.', href: '/ressources', icon: Home },
      { label: 'Understand', title: 'Practical settlement documents', text: 'SIN, health, useful proofs, and official links to verify for settlement.', href: '/parcours/guide/steps/nas', icon: FileCheck2 },
      { label: 'Move', title: 'Work / CV', text: 'Adapt your CV, target early searches, and avoid fake offers.', href: '/ressources', icon: BriefcaseBusiness },
      { label: 'Study', title: 'Studies', text: 'Organize key questions before campus, housing, and budget decisions.', href: '/ressources', icon: GraduationCap },
      { label: 'Practical', title: 'Bank / Phone', text: 'Compare options, open the right accounts, and understand first fees.', href: '/parcours/guide/steps/bank', icon: Phone },
      { label: 'Verify', title: 'Suspicious situation', text: 'Slow down, check evidence, and spot risky requests.', href: '/arnaques', icon: AlertTriangle },
    ],
    servicesEyebrow: 'Our offers',
    servicesTitle: 'Choose the practical orientation level that fits your moment.',
    offerDisclaimer:
      'Informational orientation only. This does not replace an authorized professional for legal or regulated questions.',
    services: [
      {
        eyebrow: '30 min · first 10 calls',
        title: 'Beta Orientation Call',
        price: '$10',
        detail: 'Leave with clarification of your situation, practical priorities, and recommended steps.',
        points: ['Clarification of your situation', 'Practical priorities', 'Useful resources', 'Summary after the call'],
      },
      {
        eyebrow: '30 min',
        title: 'Orientation Call',
        price: '$29',
        detail: 'Understand what to do, in what order, with which useful resources and mistakes to avoid.',
        points: ['Step order', 'Useful resources', 'Mistakes to avoid'],
      },
      {
        eyebrow: '45 min + checklist',
        title: 'Settlement Pack',
        price: '$69',
        detail: 'Prepare your arrival or organize your first week with a personalized checklist.',
        points: ['Personalized checklist', 'First week', 'Practical settlement documents'],
      },
      {
        eyebrow: '60 min + detailed summary',
        title: 'Complete Pack',
        price: '$99',
        detail: 'For people who want a more structured, clear, and easy-to-follow plan.',
        points: ['Structured plan', 'Detailed summary', 'Priorities and mistakes to avoid'],
      },
    ],
    reserve: 'Book',
    discoverEyebrow: 'Find your path',
    discoverTitle: 'Choose a situation, then move with the right markers.',
    discoverText:
      'Tags are quick entry points. You do not need to read everything to begin.',
    tags: [
      { label: 'I am a student', href: '/ressources' },
      { label: 'I am coming soon', href: '/parcours' },
      { label: 'I already arrived', href: '/checklist' },
      { label: 'I need housing', href: '/ressources' },
      { label: 'I want to work', href: '/ressources' },
      { label: 'I want to avoid a scam', href: '/arnaques' },
      { label: 'I feel lost', href: '/contact' },
    ],
    storyEyebrow: 'How it works',
    storyTitle: 'A simple method to turn confusion into next steps.',
    storyText:
      'You explain your general profile, we clarify your priorities, then you leave with practical steps, useful resources, and mistakes to avoid.',
    values: [
      { title: '1. Clarify', text: 'Your general profile, timing, and blockers.' },
      { title: '2. Prioritize', text: 'What matters now, without mixing everything.' },
      { title: '3. Move', text: 'A clear and useful mini-roadmap.' },
    ],
    scopeEyebrow: 'Clear scope',
    scopeTitle: 'What we do / what we do not do',
    doesTitle: 'What we do',
    does: ['Practical orientation', 'Priorities', 'Useful resources', 'Mistakes to avoid', 'Practical settlement documents'],
    doesNotTitle: 'What we do not do',
    doesNot: ['Legal advice', 'Immigration advice', 'Visa or permit service', 'Housing guarantee', 'Job guarantee'],
    scamEyebrow: 'Scam prevention',
    scamTitle: 'Before paying someone, verify.',
    scamText:
      'Too-perfect housing, fake recruiters, pressure to pay quickly, guaranteed promises: slow down and verify before sending money or practical settlement documents.',
    scamCta: 'Check a suspicious situation',
    guidesEyebrow: 'Practical guides',
    guidesTitle: 'A journal-like format to read fast and act better.',
    guides: [
      { category: 'First days', title: 'The first-week checklist', text: 'A simple order so you do not do everything at once.', href: '/checklist/semaine-1' },
      { category: 'Settlement', title: 'SIN, health, banking: what to verify?', text: 'Common practical steps and links to keep nearby.', href: '/parcours/guide/steps/nas' },
      { category: 'Housing', title: 'Spot a risky listing', text: 'Signals that should make you slow down before paying.', href: '/arnaques' },
      { category: 'Resources', title: 'Where to find reliable information', text: 'Find the right organizations and prepare better questions.', href: '/ressources' },
    ],
    soonEyebrow: 'Feedback',
    soonTitle: 'First testimonials coming soon.',
    soonText:
      'This section will be published with real feedback. Until then, Marhaban Canada keeps a simple promise: clarity, caution, and general support.',
    finalTitle: 'You do not need to understand everything alone.',
    finalText: 'Book a call and leave with a clearer view of your next practical steps.',
    finalResources: 'View resources',
    finalScam: 'Check a suspicious situation',
    footerColumns: [
      { title: 'Support', links: ['Discovery call', 'Orientation call', 'Support pack'] },
      { title: 'Resources', links: ['Journey', 'Checklist', 'Practical guides'] },
      { title: 'Trust', links: ['Scam prevention', 'Official sources', 'Service scope'] },
      { title: 'Languages', links: ['Français', 'English', 'العربية'] },
    ],
    disclaimer:
      'Marhaban Canada offers practical orientation and general information. We do not provide legal advice or immigration advice. For questions related to visas, permits, permanent residence, admissibility, or immigration strategy, please consult an authorized representative.',
  },
  ar: {
    heroEyebrow: 'مرحبا كندا — توجيه عملي للقادمين الجدد إلى كندا',
    heroTitle: 'هل تصل إلى كندا؟ نساعدك على معرفة ما تفعله أولاً.',
    heroSubtitle:
      'في 30 دقيقة، تخرج بخارطة طريق صغيرة وواضحة: أولوياتك، خطواتك العملية التالية، والأخطاء التي يجب تجنبها.',
    primaryCta: 'احجز مكالمة',
    secondaryCta: 'اعرض مساري',
    proof: ['FR / EN / AR', 'مصادر للتحقق', 'نهج إنساني'],
    visualPassport: 'ملف الوصول',
    visualChecklist: 'أولويات هذا الأسبوع',
    visualMap: 'كندا',
    visualTags: ['السكن', 'الوثائق', 'البنك', 'مكافحة الاحتيال'],
    progressLabel: 'يمكن أن يبدأ مسارك من هنا',
    progressHelper: 'يبقى التقدم محفوظاً محلياً على جهازك.',
    needsEyebrow: 'اختر حاجتك',
    needsTitle: 'ابدأ بالموضوع الذي يوقفك الآن.',
    needsText:
      'كل مدخل يقودك إلى توجيه واضح، بدون تعقيد زائد أو وعود منظمة.',
    needs: [
      { label: 'تحضير', title: 'قبل الوصول', text: 'وثائق عملية للاستقرار، ميزانية، قرارات أولى ومصادر تبقى قريبة منك.', href: '/parcours', icon: MapPinned },
      { label: 'استقرار', title: 'الأسبوع الأول', text: 'الخطوات التي تستحق الأولوية في الأيام الأولى في كندا.', href: '/checklist/semaine-1', icon: ClipboardCheck },
      { label: 'بحث', title: 'السكن', text: 'إرشادات عملية وأسئلة مهمة وإشارات تحذير قبل الدفع.', href: '/ressources', icon: Home },
      { label: 'فهم', title: 'وثائق عملية للاستقرار', text: 'رقم التأمين، الصحة، الإثباتات المفيدة والروابط الرسمية للاستقرار.', href: '/parcours/guide/steps/nas', icon: FileCheck2 },
      { label: 'تقدم', title: 'العمل / السيرة', text: 'تعديل السيرة، بدء البحث وتجنب العروض الوهمية.', href: '/ressources', icon: BriefcaseBusiness },
      { label: 'دراسة', title: 'الدراسة', text: 'تنظيم الأسئلة المهمة قبل قرارات الجامعة والسكن والميزانية.', href: '/ressources', icon: GraduationCap },
      { label: 'عملي', title: 'البنك / الهاتف', text: 'مقارنة الخيارات وفهم الحسابات والرسوم الأولى.', href: '/parcours/guide/steps/bank', icon: Phone },
      { label: 'تحقق', title: 'وضع مشبوه', text: 'تمهل، تحقق من الأدلة، وانتبه للطلبات عالية المخاطر.', href: '/arnaques', icon: AlertTriangle },
    ],
    servicesEyebrow: 'عروضنا',
    servicesTitle: 'اختر مستوى التوجيه العملي المناسب لمرحلتك.',
    offerDisclaimer:
      'توجيه معلوماتي فقط. لا يحل محل مختص معتمد في الأسئلة القانونية أو المنظمة.',
    services: [
      {
        eyebrow: '30 دقيقة · أول 10 مكالمات',
        title: 'مكالمة توجيه بيتا',
        price: '10 $',
        detail: 'للخروج بتوضيح وضعك العام، أولويات عملية، وخطوات موصى بها.',
        points: ['توضيح وضعك العام', 'أولويات عملية', 'موارد مفيدة', 'ملخص بعد المكالمة'],
      },
      {
        eyebrow: '30 دقيقة',
        title: 'مكالمة توجيه',
        price: '29 $',
        detail: 'لفهم ماذا تفعل، وبأي ترتيب، ومع أي موارد مفيدة وأخطاء يجب تجنبها.',
        points: ['ترتيب الخطوات', 'موارد مفيدة', 'أخطاء يجب تجنبها'],
      },
      {
        eyebrow: '45 دقيقة + قائمة تحقق',
        title: 'حزمة الاستقرار',
        price: '69 $',
        detail: 'لتحضير وصولك أو تنظيم أسبوعك الأول مع قائمة تحقق مخصصة.',
        points: ['قائمة تحقق مخصصة', 'الأسبوع الأول', 'وثائق عملية للاستقرار'],
      },
      {
        eyebrow: '60 دقيقة + ملخص مفصل',
        title: 'الحزمة الكاملة',
        price: '99 $',
        detail: 'للأشخاص الذين يريدون خطة أكثر تنظيماً ووضوحاً وسهلة المتابعة.',
        points: ['خطة منظمة', 'ملخص مفصل', 'أولويات وأخطاء يجب تجنبها'],
      },
    ],
    reserve: 'احجز',
    discoverEyebrow: 'ابحث عن مسارك',
    discoverTitle: 'اختر وضعك ثم تقدم مع الإرشادات المناسبة.',
    discoverText:
      'الوسوم هي مداخل سريعة. لا تحتاج إلى قراءة كل شيء حتى تبدأ.',
    tags: [
      { label: 'أنا طالب', href: '/ressources' },
      { label: 'سأصل قريباً', href: '/parcours' },
      { label: 'وصلت بالفعل', href: '/checklist' },
      { label: 'أبحث عن سكن', href: '/ressources' },
      { label: 'أريد العمل', href: '/ressources' },
      { label: 'أريد تجنب الاحتيال', href: '/arnaques' },
      { label: 'أنا تائه', href: '/contact' },
    ],
    storyEyebrow: 'كيف يعمل',
    storyTitle: 'طريقة بسيطة لتحويل التشتت إلى خطوات تالية.',
    storyText:
      'تشرح ملفك العام، نوضح أولوياتك، ثم تخرج بخطوات عملية وموارد مفيدة وأخطاء يجب تجنبها.',
    values: [
      { title: '1. توضيح', text: 'ملفك العام، توقيتك، وما يوقفك.' },
      { title: '2. ترتيب', text: 'ما يهم الآن بدون خلط كل شيء.' },
      { title: '3. تقدم', text: 'خارطة طريق صغيرة واضحة ومفيدة.' },
    ],
    scopeEyebrow: 'إطار واضح',
    scopeTitle: 'ما نفعله / ما لا نفعله',
    doesTitle: 'ما نفعله',
    does: ['توجيه عملي', 'أولويات', 'موارد مفيدة', 'أخطاء يجب تجنبها', 'وثائق عملية للاستقرار'],
    doesNotTitle: 'ما لا نفعله',
    doesNot: ['نصائح قانونية', 'نصائح في الهجرة', 'خدمة تأشيرات أو تصاريح', 'ضمان سكن', 'ضمان عمل'],
    scamEyebrow: 'مكافحة الاحتيال',
    scamTitle: 'قبل أن تدفع لأي شخص، تحقق.',
    scamText:
      'سكن مثالي بشكل مبالغ فيه، صاحب عمل مزيف، ضغط للدفع بسرعة، وعود مضمونة: تمهل وتحقق قبل إرسال المال أو وثائق عملية للاستقرار.',
    scamCta: 'تحقق من وضع مشبوه',
    guidesEyebrow: 'أدلة عملية',
    guidesTitle: 'صيغة قريبة من المجلة للقراءة بسرعة والتصرف أفضل.',
    guides: [
      { category: 'الأيام الأولى', title: 'قائمة الأسبوع الأول', text: 'ترتيب بسيط حتى لا تفعل كل شيء في نفس الوقت.', href: '/checklist/semaine-1' },
      { category: 'الاستقرار', title: 'التأمين، الصحة، البنك: ماذا أتحقق؟', text: 'خطوات عملية متكررة وروابط مهمة تبقى قريبة منك.', href: '/parcours/guide/steps/nas' },
      { category: 'السكن', title: 'اكتشاف إعلان عالي المخاطر', text: 'إشارات يجب أن تجعلك تتمهل قبل الدفع.', href: '/arnaques' },
      { category: 'الموارد', title: 'أين أجد معلومة موثوقة', text: 'الوصول إلى الجهات المناسبة وتحضير أسئلة أفضل.', href: '/ressources' },
    ],
    soonEyebrow: 'آراء',
    soonTitle: 'أول الآراء ستكون متاحة قريباً.',
    soonText:
      'ستنشر هذه المساحة مع آراء حقيقية. إلى ذلك الحين، تحافظ مرحبا كندا على وعد بسيط: وضوح، حذر، ومرافقة عامة.',
    finalTitle: 'لا تحتاج إلى فهم كل شيء وحدك.',
    finalText: 'احجز مكالمة واخرج برؤية أوضح لخطواتك العملية التالية.',
    finalResources: 'عرض الموارد',
    finalScam: 'تحقق من وضع مشبوه',
    footerColumns: [
      { title: 'المرافقة', links: ['مكالمة تعارف', 'مكالمة توجيه', 'حزمة مرافقة'] },
      { title: 'الموارد', links: ['المسار', 'قائمة التحقق', 'أدلة عملية'] },
      { title: 'الثقة', links: ['مكافحة الاحتيال', 'مصادر رسمية', 'حدود الخدمة'] },
      { title: 'اللغات', links: ['Français', 'English', 'العربية'] },
    ],
    disclaimer:
      'تقدم مرحبا كندا توجيهاً عملياً ومعلومات عامة. نحن لا نقدم نصائح قانونية ولا نصائح في الهجرة. للأسئلة المتعلقة بالتأشيرات أو التصاريح أو الإقامة الدائمة أو الأهلية أو استراتيجية الهجرة، يرجى استشارة ممثل معتمد.',
  },
} as const satisfies Record<Locale, unknown>;

export default function HomePage() {
  const { content, locale } = useLanguage();
  const { dir } = getHtmlAttrs(locale);
  const [hasStarted, setHasStarted] = useLocalStorageState<boolean>('mc_has_started', {
    defaultValue: false,
    parse: (value) => value === 'true',
    serialize: (value) => (value ? 'true' : 'false'),
  });

  const handleStart = useCallback(() => {
    setHasStarted(true);
  }, [setHasStarted]);

  const t = homeTexts[locale] ?? homeTexts.fr;

  return (
    <HomepageGsapEffects>
    <main className="warm-page overflow-hidden" dir={dir}>
      <section className="relative min-h-[calc(100svh-72px)] px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid min-h-[calc(100svh-112px)] max-w-7xl gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="relative z-10 max-w-3xl py-8 sm:py-12">
            <p
              className="inline-flex rounded-full border border-marhaban-leaf/15 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-marhaban-leaf shadow-warm-sm"
              data-animate="hero-item"
            >
              {t.heroEyebrow}
            </p>
            <h1
              className="mt-6 text-5xl font-semibold leading-[0.98] text-marhaban-ink sm:text-6xl lg:text-7xl"
              data-animate="hero-item"
            >
              {t.heroTitle}
            </h1>
            <p
              className="mt-6 max-w-2xl text-base text-slate-700 sm:text-lg"
              data-animate="hero-item"
            >
              {t.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3" data-animate="hero-item">
              <LocalizedLink
                href="/book"
                className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-marhaban-ink px-6 py-3 text-sm font-bold text-white shadow-warm transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/45 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-cream"
              >
                {t.primaryCta}
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              </LocalizedLink>
              <LocalizedLink
                href="/parcours"
                onClick={handleStart}
                className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-marhaban-leaf/25 bg-white/80 px-6 py-3 text-sm font-bold text-marhaban-ink shadow-warm-sm transition hover:bg-marhaban-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-cream"
              >
                {t.secondaryCta}
                <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
              </LocalizedLink>
            </div>
            <div className="mt-8 flex flex-wrap gap-2" data-animate="hero-item">
              {t.proof.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-xs font-semibold text-marhaban-ink ring-1 ring-marhaban-leaf/10"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-marhaban-leaf" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <HeroVisual
            passport={t.visualPassport}
            checklist={t.visualChecklist}
            map={t.visualMap}
            tags={t.visualTags}
          />
        </div>
      </section>

      <section className="bg-marhaban-ink px-4 py-5 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[1fr_1fr] md:items-center" data-animate="section">
          <ProgressBar
            progress={hasStarted ? 16 : 0}
            label={t.progressLabel}
            helper={t.progressHelper}
          />
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-4">
            <ProvinceSelector />
          </div>
        </div>
      </section>

      <SectionBand>
        <SectionHeader eyebrow={t.needsEyebrow} title={t.needsTitle} text={t.needsText} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-animate-group>
          {t.needs.map((item) => (
            <NeedCard key={item.title} item={item} />
          ))}
        </div>
      </SectionBand>

      <SectionBand className="bg-white/70">
        <SectionHeader eyebrow={t.servicesEyebrow} title={t.servicesTitle} />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4" data-animate-group>
          {t.services.map((item, index) => (
            <OfferCard key={item.title} item={item} cta={t.reserve} featured={index === 1} />
          ))}
        </div>
        <p className="mt-5 rounded-2xl border border-marhaban-leaf/10 bg-marhaban-cream/80 px-4 py-3 text-sm font-semibold text-slate-700">
          {t.offerDisclaimer}
        </p>
      </SectionBand>

      <SectionBand className="bg-marhaban-mint/70">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <SectionHeader eyebrow={t.discoverEyebrow} title={t.discoverTitle} text={t.discoverText} />
          <div className="rounded-[2rem] border border-marhaban-leaf/15 bg-marhaban-cream/80 p-4 shadow-warm sm:p-6">
            <div className="flex flex-wrap gap-3">
              {t.tags.map((tag, index) => (
                <JourneyTag key={tag.label} tag={tag} index={index} onStart={handleStart} />
              ))}
            </div>
          </div>
        </div>
      </SectionBand>

      <section className="bg-marhaban-ink px-4 py-14 text-white sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center" data-animate="section">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-marhaban-gold">
              {t.storyEyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
              {t.storyTitle}
            </h2>
            <p className="mt-5 max-w-2xl text-base text-white/75 sm:text-lg">{t.storyText}</p>
          </div>
          <div className="relative min-h-[420px]">
            <div className="absolute inset-x-0 top-4 rounded-[2rem] bg-marhaban-clay p-6 shadow-warm sm:p-8">
              <Sparkles className="h-8 w-8 text-white" aria-hidden="true" />
              <p className="mt-10 text-3xl font-semibold leading-tight text-white">
                Marhaban Canada
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 grid gap-4 sm:grid-cols-3">
              {t.values.map((value) => (
                <article
                  key={value.title}
                  className="rounded-[1.5rem] border border-white/12 bg-white p-5 text-marhaban-ink shadow-warm"
                >
                  <h3 className="text-lg font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{value.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F3D7B3] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.25rem] border border-amber-900/10 bg-[#FFF4E3] p-6 shadow-warm sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center" data-animate="section">
          <div>
            <p className="inline-flex rounded-full bg-amber-900 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white">
              {t.scamEyebrow}
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-amber-950 sm:text-5xl">
              {t.scamTitle}
            </h2>
          </div>
          <div>
            <p className="text-base text-amber-950/80 sm:text-lg">{t.scamText}</p>
            <LocalizedLink
              href="/arnaques"
              className="mt-6 inline-flex min-h-[50px] items-center gap-2 rounded-full bg-amber-900 px-6 py-3 text-sm font-bold text-white shadow-warm-sm transition hover:bg-amber-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF4E3]"
            >
              {t.scamCta}
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            </LocalizedLink>
          </div>
        </div>
      </section>

      <SectionBand className="bg-white/70">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeader eyebrow={t.scopeEyebrow} title={t.scopeTitle} />
          <div className="grid gap-4 md:grid-cols-2">
            <ScopeCard title={t.doesTitle} items={t.does} positive />
            <ScopeCard title={t.doesNotTitle} items={t.doesNot} />
          </div>
        </div>
      </SectionBand>

      <SectionBand>
        <SectionHeader eyebrow={t.guidesEyebrow} title={t.guidesTitle} />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4" data-animate-group>
          {t.guides.map((guide) => (
            <GuideCard key={guide.title} guide={guide} />
          ))}
        </div>
      </SectionBand>

      <SectionBand className="bg-white/70">
        <div className="grid gap-6 rounded-[2.25rem] border border-marhaban-leaf/15 bg-marhaban-mint/75 p-6 shadow-warm sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-marhaban-leaf">
              {t.soonEyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-marhaban-ink sm:text-4xl">
              {t.soonTitle}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-[1fr_0.85fr]">
            <p className="rounded-[1.5rem] bg-white/80 p-5 text-sm text-slate-700 shadow-warm-sm sm:text-base">
              {t.soonText}
            </p>
            <div className="rounded-[1.5rem] bg-marhaban-ink p-5 text-white shadow-warm-sm">
              <UsersRound className="h-7 w-7 text-marhaban-gold" aria-hidden="true" />
              <p className="mt-5 text-sm font-semibold text-white/85">{content.brand}</p>
              <p className="mt-2 text-2xl font-semibold leading-tight text-white">
                {t.values.map((value) => value.title).join(' · ')}
              </p>
            </div>
          </div>
        </div>
      </SectionBand>

      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8" data-floating-book-call-hide>
        <div className="mx-auto max-w-7xl rounded-[2.25rem] bg-marhaban-ink p-6 text-white shadow-warm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1.8fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-marhaban-gold">{content.brand}</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl">{t.finalTitle}</h2>
              <p className="mt-4 max-w-md text-sm text-white/72">{t.finalText}</p>
              <p className="mt-4 max-w-md text-xs leading-relaxed text-white/55">{t.disclaimer}</p>
              <LocalizedLink
                href="/book"
                className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-marhaban-ink transition hover:bg-marhaban-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-ink"
              >
                {t.primaryCta}
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              </LocalizedLink>
              <div className="mt-3 flex flex-wrap gap-3">
                <LocalizedLink href="/ressources" className="text-sm font-semibold text-white/75 underline-offset-4 hover:text-white hover:underline">
                  {t.finalResources}
                </LocalizedLink>
                <LocalizedLink href="/arnaques" className="text-sm font-semibold text-white/75 underline-offset-4 hover:text-white hover:underline">
                  {t.finalScam}
                </LocalizedLink>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {t.footerColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-marhaban-gold">
                    {column.title}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {column.links.map((link) => (
                      <li key={link} className="text-sm text-white/74">
                        {link}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
    </HomepageGsapEffects>
  );
}

function SectionBand({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('px-4 py-12 sm:px-6 sm:py-16 lg:px-8', className)} data-animate="section">
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-marhaban-clay">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold leading-tight text-marhaban-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {text ? <p className="mt-4 text-base text-slate-700 sm:text-lg">{text}</p> : null}
    </div>
  );
}

function HeroVisual({
  passport,
  checklist,
  map,
  tags,
}: {
  passport: string;
  checklist: string;
  map: string;
  tags: readonly string[];
}) {
  return (
    <div className="relative min-h-[520px] lg:min-h-[660px]" aria-hidden="true">
      <div className="absolute inset-0 rounded-[3rem] bg-marhaban-mint shadow-warm" />
      <div className="absolute -right-8 top-10 h-44 w-44 rounded-full bg-marhaban-gold/35 blur-2xl" data-animate="hero-float" />
      <div className="absolute left-8 top-10 h-36 w-36 rounded-full bg-marhaban-clay/20 blur-2xl" data-animate="hero-float" />

      <div className="absolute left-6 top-8 w-52 rotate-[-7deg] rounded-[1.6rem] border border-marhaban-leaf/20 bg-white p-5 shadow-warm sm:left-10 sm:w-60" data-animate="hero-card">
        <div className="flex items-center justify-between">
          <span className="h-10 w-10 rounded-full bg-marhaban-ink" />
          <BadgeCheck className="h-7 w-7 text-marhaban-leaf" />
        </div>
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-marhaban-clay">
          {passport}
        </p>
        <div className="mt-4 space-y-2">
          <span className="block h-3 rounded-full bg-stone-200" />
          <span className="block h-3 w-2/3 rounded-full bg-stone-200" />
        </div>
      </div>

      <div className="absolute right-4 top-28 w-64 rotate-[5deg] rounded-[1.8rem] border border-stone-200 bg-[#FFF7EA] p-5 shadow-warm sm:right-10 sm:w-72" data-animate="hero-card">
        <p className="text-sm font-bold text-marhaban-ink">{checklist}</p>
        <div className="mt-5 space-y-3">
          {[FileCheck2, Banknote, Home].map((Icon, index) => (
            <div key={index} className="flex items-center gap-3 rounded-2xl bg-white/80 p-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-marhaban-mint text-marhaban-leaf">
                <Icon className="h-4 w-4" />
              </span>
              <span className="h-2 flex-1 rounded-full bg-stone-200" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-28 left-8 right-8 rounded-[2rem] bg-marhaban-ink p-6 text-white shadow-warm sm:left-16 sm:right-16" data-animate="hero-card">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-marhaban-gold">
              {map}
            </p>
            <div className="mt-5 h-28 rounded-[45%_55%_42%_58%/56%_35%_65%_44%] bg-marhaban-leaf" />
          </div>
          <Landmark className="h-10 w-10 text-white/70" />
        </div>
      </div>

      <div className="absolute bottom-8 left-4 right-4 flex flex-wrap justify-center gap-2">
        {tags.map((tag, index) => (
          <span
            key={tag}
            className={cn(
              'rounded-full px-4 py-2 text-xs font-bold shadow-warm-sm',
              index % 2 === 0 ? 'bg-white text-marhaban-ink' : 'bg-marhaban-clay text-white',
            )}
            data-animate="hero-card"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function NeedCard({ item }: { item: VisualCard }) {
  const Icon = item.icon;

  return (
    <LocalizedLink
      href={item.href}
      className="group flex min-h-[240px] flex-col justify-between rounded-[1.8rem] border border-marhaban-leaf/10 bg-white p-5 shadow-warm-sm transition hover:-translate-y-1 hover:shadow-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35"
      data-animate="card"
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full bg-marhaban-mint px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-marhaban-leaf">
            {item.label}
          </span>
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

function OfferCard({
  item,
  cta,
  featured,
}: {
  item: OfferCard;
  cta: string;
  featured: boolean;
}) {
  return (
    <article
      className={cn(
        'rounded-[2rem] border p-6 shadow-warm-sm',
        featured
          ? 'border-marhaban-ink bg-marhaban-ink text-white'
          : 'border-stone-200 bg-marhaban-cream text-marhaban-ink',
      )}
      data-animate="offer-card"
    >
      <p
        className={cn(
          'text-xs font-bold uppercase tracking-[0.16em]',
          featured ? 'text-marhaban-gold' : 'text-marhaban-clay',
        )}
      >
        {item.eyebrow}
      </p>
      <h3 className={cn('mt-4 text-2xl font-semibold', featured ? 'text-white' : 'text-marhaban-ink')}>
        {item.title}
      </h3>
      <p className={cn('mt-3 text-3xl font-semibold', featured ? 'text-white' : 'text-marhaban-leaf')}>
        {item.price}
      </p>
      <p className={cn('mt-4 text-sm', featured ? 'text-white/76' : 'text-slate-700')}>{item.detail}</p>
      <ul className="mt-6 space-y-3">
        {item.points.map((point) => (
          <li key={point} className={cn('flex items-start gap-2 text-sm', featured ? 'text-white/82' : 'text-slate-700')}>
            <CheckCircle2 className={cn('mt-0.5 h-4 w-4 flex-shrink-0', featured ? 'text-marhaban-gold' : 'text-marhaban-leaf')} />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <LocalizedLink
        href="/book"
        className={cn(
          'mt-7 inline-flex min-h-[46px] items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          featured
            ? 'bg-white text-marhaban-ink hover:bg-marhaban-mint focus-visible:ring-white/50 focus-visible:ring-offset-marhaban-ink'
            : 'bg-marhaban-ink text-white hover:bg-marhaban-leaf focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-marhaban-cream',
        )}
      >
        {cta}
        <CalendarCheck className="h-4 w-4" aria-hidden="true" />
      </LocalizedLink>
    </article>
  );
}

function ScopeCard({
  title,
  items,
  positive = false,
}: {
  title: string;
  items: readonly string[];
  positive?: boolean;
}) {
  return (
    <article className={cn(
      'rounded-[2rem] border p-6 shadow-warm-sm',
      positive ? 'border-marhaban-leaf/15 bg-marhaban-mint/75' : 'border-amber-200 bg-[#FFF4E3]',
    )}>
      <h3 className="text-xl font-semibold text-marhaban-ink">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
            <CheckCircle2 className={cn('mt-0.5 h-4 w-4 flex-shrink-0', positive ? 'text-marhaban-leaf' : 'text-marhaban-clay')} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function JourneyTag({
  tag,
  index,
  onStart,
}: {
  tag: TagCard;
  index: number;
  onStart: () => void;
}) {
  const isDark = index % 3 === 0;

  return (
    <LocalizedLink
      href={tag.href}
      onClick={tag.href === '/parcours' || tag.href === '/checklist' ? onStart : undefined}
      className={cn(
        'inline-flex min-h-[48px] items-center rounded-full px-5 py-3 text-sm font-bold shadow-warm-sm transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35',
        isDark ? 'bg-marhaban-ink text-white' : 'bg-white text-marhaban-ink',
      )}
      data-animate="pill"
    >
      {tag.label}
    </LocalizedLink>
  );
}

function GuideCard({ guide }: { guide: GuideCard }) {
  return (
    <article className="flex min-h-[280px] flex-col justify-between rounded-[1.8rem] border border-stone-200 bg-white p-5 shadow-warm-sm" data-animate="card">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-marhaban-clay">
          {guide.category}
        </p>
        <h3 className="mt-5 text-xl font-semibold leading-tight text-marhaban-ink">{guide.title}</h3>
        <p className="mt-3 text-sm text-slate-600">{guide.text}</p>
      </div>
      <LocalizedLink
        href={guide.href}
        className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-marhaban-leaf transition hover:text-marhaban-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35"
      >
        <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
        <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
      </LocalizedLink>
    </article>
  );
}
