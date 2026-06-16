'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  GraduationCap,
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
import { useLanguage } from '@/components/LanguageProvider';
import { AnimatedCTA, AnimatedCard, FloatingVisual, SectionReveal, StaggerGroup } from '@/components/animations/MarketingMotion';
import { getHtmlAttrs, type Locale } from '@/i18n/locales';
import { cn } from '@/lib/cn';
import { bookingPath } from '@/lib/routes';

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

type AudienceData = {
  icon: LucideIcon;
  label: string;
  title: string;
  text: string;
  href: string;
};

type PricingData = {
  title: string;
  price: string;
  duration: string;
  benefit: string;
  note: string;
  href: string;
  featured?: boolean;
};

type FAQData = {
  q: string;
  a: string;
};

const disclaimer = {
  fr: 'Marhaban Canada offre de l’orientation pratique et de l’information générale. Nous ne fournissons pas de conseils juridiques ni de conseils en immigration. Pour les questions liées aux visas, permis, résidence permanente, admissibilité ou stratégie d’immigration, veuillez consulter un représentant autorisé.',
  en: 'Marhaban Canada offers practical orientation and general information. We do not provide legal advice or immigration advice. For questions related to visas, permits, permanent residence, admissibility, or immigration strategy, please consult an authorized representative.',
  ar: 'تقدم مرحبا كندا توجيهاً عملياً ومعلومات عامة. نحن لا نقدم نصائح قانونية ولا نصائح في الهجرة. للأسئلة المتعلقة بالتأشيرات أو التصاريح أو الإقامة الدائمة أو الأهلية أو استراتيجية الهجرة، يرجى استشارة ممثل معتمد.',
} as const;

const homeTexts = {
  fr: {
    announcement: 'Appels d’orientation de 30 minutes — places bêta disponibles',
    announcementCta: 'Réserver un appel',
    heroEyebrow: 'Marhaban Canada — Orientation pratique pour nouveaux arrivants au Canada',
    heroTitle: 'Arrive au Canada avec un plan clair, pas avec du stress.',
    heroSubtitle:
      'Marhaban Canada t’aide à organiser tes premières étapes : priorités, documents, logement, ressources utiles et erreurs à éviter. Après l’appel, tu repars avec une mini-feuille de route claire.',
    heroImageAlt: 'Nouvel arrivant accompagné par Marhaban Canada dans ses premières démarches au Canada',
    offerImageAlt: 'Appel d’orientation Marhaban Canada pour clarifier les priorités d’installation',
    howImageAlt: 'Checklist pratique Marhaban Canada pour organiser les premières étapes au Canada',
    primaryCta: 'Réserver un appel',
    secondaryCta: 'Voir le parcours',
    proof: ['30 min pour clarifier tes priorités', 'Checklist après l’appel', 'Sources officielles', 'FR / EN / AR'],
    visualChecklist: 'Checklist arrivée',
    visualScam: 'Anti-arnaque',
    visualPlan: 'Plan première semaine',
    visualDoc: 'Documents pratiques d’installation',
    visualTags: ['Logement', 'Banque', 'Téléphone', 'Priorités'],
    workflow: ['Situation', 'Priorités', 'Appel', 'Résumé'],
    progressLabel: 'Ce que tu reçois vite',
    progressHelper: 'Après l’appel, tu repars avec des repères simples, des ressources fiables et les premières erreurs à éviter.',
    needsEyebrow: 'Choisis ton besoin',
    needsTitle: 'Commence par ce qui te bloque maintenant.',
    needsText: 'Choisis la situation qui te ressemble pour aller droit vers le bon repère.',
    needs: [
      { label: 'Préparer', title: 'Préparer mon arrivée', text: 'Budget, documents utiles et premières décisions avant le départ.', href: '/parcours', icon: MapPinned },
      { label: 'Semaine 1', title: 'Première semaine au Canada', text: 'Un ordre clair pour ne pas tout faire en même temps.', href: '/checklist/semaine-1', icon: ClipboardCheck },
      { label: 'Logement', title: 'Logement', text: 'Questions à poser, preuves à vérifier et signaux d’alerte avant de payer.', href: '/ressources', icon: Home },
      { label: 'Documents', title: 'Documents essentiels', text: 'NAS, santé, preuves utiles et liens officiels à garder sous la main.', href: '/parcours/guide/steps/nas', icon: FileCheck2 },
      { label: 'Pratique', title: 'Banque / téléphone', text: 'Comparer les options, comprendre les frais et préparer les bons rendez-vous.', href: '/parcours/guide/steps/bank', icon: Phone },
      { label: 'Vérifier', title: 'Vérifier une situation suspecte', text: 'Ralentir, vérifier les preuves et repérer les demandes à risque.', href: '/arnaques', icon: AlertTriangle },
    ],
    offersEyebrow: 'Nos offres',
    offersTitle: 'Choisis l’offre qui correspond à ton besoin maintenant.',
    offersText: 'Chaque offre explique qui elle aide, ce qu’elle inclut, ce que tu reçois après l’appel et ce qui n’est pas promis.',
    reserve: 'Réserver',
    offers: [
      { title: 'Appel Orientation bêta', price: '10 $', duration: '30 minutes · 10 premiers appels', benefit: 'Pour les premiers appels de validation : clarifier ta situation et savoir quoi faire en premier.', note: 'Ce n’est pas du conseil juridique, ni une promesse de résultat.' },
      { title: 'Appel Orientation', price: '29 $', duration: '30 minutes', benefit: 'Pour quelqu’un qui veut un plan clair et des ressources utiles.', note: 'Ce n’est pas du conseil juridique, ni une promesse de résultat.' },
      { title: 'Pack Installation', price: '69 $', duration: '45 minutes + checklist personnalisée', benefit: 'Pour préparer ton arrivée ou organiser ta première semaine avec plus de structure.', note: 'Ce n’est pas une garantie de logement ou d’emploi.' },
      { title: 'Pack Complet', price: '99 $', duration: '60 minutes + résumé détaillé', benefit: 'Pour repartir avec un plan plus structuré et facile à suivre.', note: 'Ce n’est pas une représentation officielle.' },
    ],
    howEyebrow: 'Comment ça marche',
    howTitle: 'Du doute au plan clair, en quatre étapes.',
    howSteps: [
      { title: 'Tu expliques ta situation', text: 'Tu réponds simplement : où tu en es, ce qui te bloque et ce que tu veux clarifier.', icon: MessageCircle },
      { title: 'On clarifie tes priorités', text: 'On trie ce qui est urgent, ce qui peut attendre et ce qu’il faut vérifier avant de payer.', icon: CalendarCheck },
      { title: 'Tu réserves un appel', text: 'Tu choisis l’offre et le créneau qui correspondent à ton besoin du moment.', icon: MailCheck },
      { title: 'Tu reçois une mini-feuille de route', text: 'Tu repars avec les prochaines étapes, les ressources utiles et les erreurs à éviter.', icon: CheckCircle2 },
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
      { label: 'Je veux parler à quelqu’un', href: '/reserver' },
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
      does: ['Clarifier les priorités', 'Expliquer les étapes pratiques', 'Aider à organiser documents et ressources', 'Signaler les erreurs fréquentes', 'Aider à reconnaître les situations suspectes'],
      doesNotTitle: 'Ce qu’on ne fait pas',
      doesNot: ['Conseil juridique', 'Conseil en immigration', 'Demande de visa/permis', 'Garantie logement/emploi', 'Représentation officielle', 'Promesse de résultat'],
    },
    scamEyebrow: 'Anti-arnaque',
    scamTitle: 'Avant d’envoyer de l’argent ou tes documents, vérifie.',
    scamText:
      'Prends 2 minutes pour vérifier les signaux d’alerte : logement trop beau pour être vrai, dépôt avant visite, faux recruteur, frais urgents ou pression pour payer vite.',
    scamCta: 'Vérifier une situation',
    guidesEyebrow: 'Guides pratiques',
    guidesTitle: 'Des guides courts, utiles et concrets pour avancer dans le bon ordre.',
    guides: [
      { title: 'Checklist avant d’arriver au Canada', text: 'Prépare les premières décisions avant le départ : documents, budget et priorités.', href: '/checklist', icon: ClipboardCheck },
      { title: 'Première semaine au Canada', text: 'Commence par l’ordre le plus utile pour ne rien faire dans le désordre.', href: '/checklist/semaine-1', icon: BookOpenCheck },
      { title: 'Éviter les arnaques au logement', text: 'Repère les signaux d’alerte avant de payer ou d’envoyer des documents.', href: '/arnaques', icon: ShieldCheck },
      { title: 'Banque, téléphone et documents essentiels', text: 'Garde sous la main les repères pratiques pour tes premières démarches.', href: '/parcours/guide/steps/nas', icon: Landmark },
    ],
    socialEyebrow: 'Preuve sociale',
    socialTitle: 'Premiers retours bientôt disponibles.',
    socialText: 'Aucun faux témoignage : cette section restera basée sur des retours réels ou anonymisés.',
    socialQuotes: [`J’ai mieux compris mes priorités.`, `J’ai su quoi faire en premier.`, `J’ai évité de payer avant de vérifier.`],
    audienceEyebrow: `Pour qui`,
    audienceTitle: `Tu arrives, tu étudies, tu travailles, tu t’installes.`,
    audienceText: `Marhaban Canada s’adapte à ton moment et à ta situation.`,
    audiences: [
      { icon: GraduationCap, label: `Étudiant·e`, title: `Tu arrives pour étudier`, text: `Permis d’études, logement campus, ouverture de compte, premières démarches pratiques.`, href: `/ressources` },
      { icon: BriefcaseBusiness, label: `Travailleur·euse`, title: `Tu arrives pour travailler`, text: `NAS, contrat, reconnaissance des diplômes, droits essentiels dès l’arrivée.`, href: `/ressources` },
      { icon: Home, label: `Résident·e permanent·e`, title: `Tu t’installes durablement`, text: `RAMQ, documents d’identité, premières cotisations et repères à long terme.`, href: `/parcours` },
      { icon: MapPinned, label: `Visiteur·euse / famille`, title: `Tu rejoins un proche ou tu explores`, text: `Droits pendant le séjour, soins d’urgence, prochaines étapes selon ton statut.`, href: `/contact` },
    ] as AudienceData[],
    founderEyebrow: `Pourquoi ce service existe`,
    founderTitle: `Né d’une expérience personnelle d’immigration.`,
    founderText: `Marhaban Canada est pensé par quelqu’un qui a lui-même traversé ces démarches — les listes sans fin, les informations contradictoires, et des frais payés à des gens peu fiables. Ce service, c’est ce qu’on aurait voulu trouver à l’arrivée : clair, humain, et honnête sur ce qu’il peut et ne peut pas faire.`,
    founderNote: `Accompagnement pratique et orientation générale — pas de conseil juridique personnalisé.`,
    pricingEyebrow: `Tarifs`,
    pricingTitle: `Transparents, sans surprise.`,
    pricingNote: `Tous les appels sont informatifs. Aucun conseil juridique, aucune garantie de résultat.`,
    pricingCta: `Réserver`,
    pricingCtaFree: `Écrire pour réserver`,
    pricing: [
      { title: `Appel découverte`, price: `Gratuit`, duration: `15 minutes`, benefit: `Poser tes premières questions et comprendre si le service correspond à ta situation.`, note: `Sans engagement — sur demande par email.`, href: `/contact` },
      { title: `Appel orientation`, price: `29 $`, duration: `30 minutes`, benefit: `Clarifier tes priorités, identifier les prochaines étapes pratiques et les ressources utiles.`, note: `Résumé sommaire inclus.`, href: `/reserver`, featured: true },
      { title: `Pack accompagnement`, price: `69 – 99 $`, duration: `60 min + résumé écrit`, benefit: `Plan structuré, ressources ciblées et résumé détaillé après l’appel.`, note: `Résumé pratique inclus.`, href: `/reserver` },
    ] as PricingData[],
    faqEyebrow: `Questions fréquentes`,
    faqTitle: `Ce qu’on nous demande souvent.`,
    faq: [
      { q: `C’est du conseil juridique ?`, a: `Non. Marhaban Canada offre de l’orientation pratique et de l’information générale. Pour toute question liée aux visas, permis ou résidence permanente, consulte un représentant en immigration autorisé (RCIC ou avocat).` },
      { q: `Comment se passe un appel ?`, a: `Tu partages ta situation et ce qui te bloque. On clarifie ensemble les priorités, les ressources utiles et les erreurs à éviter. Tu repars avec un plan pratique — pas une liste de cases à cocher.` },
      { q: `Le service est disponible en arabe et en anglais ?`, a: `Oui. Les appels peuvent se tenir en français, en anglais ou en arabe selon ta préférence.` },
      { q: `Est-ce qu’il y a des garanties ?`, a: `Non — et tout service sérieux te dira la même chose. Il s’agit d’orientation informative. Marhaban Canada ne garantit aucun résultat pour les démarches d’immigration, de logement ou d’emploi.` },
      { q: `Comment savoir si vous êtes légitimes ?`, a: `Bonne question — c’est exactement le bon réflexe. Nos prix sont affichés clairement. Notre cadre de service est visible sur cette page. Et tu peux nous écrire avant de réserver : contact@marhabancanada.ca. C’est la transparence qu’on exige des autres.` },
    ] as FAQData[],
    finalTitle: `Tu ne sais pas par quoi commencer ?`,
    finalText: `Réserve un appel d’orientation et repars avec tes prochaines étapes, un résumé clair et des ressources fiables.`,
    finalResources: `Voir les ressources`,
    finalScam: `Vérifier une situation suspecte`,
  },
  en: {
    announcement: '30-minute orientation calls — beta spots available',
    announcementCta: 'Book a call',
    heroEyebrow: 'Marhaban Canada — Practical orientation for newcomers to Canada',
    heroTitle: 'Arriving in Canada? We help you know what to do, in what order, and who to turn to.',
    heroSubtitle:
      'Clear, human support to understand your priorities, avoid costly mistakes, and move step by step. After the call, you leave with a short roadmap.',
    heroImageAlt: 'Newcomer supported by Marhaban Canada through first steps in Canada',
    offerImageAlt: 'Marhaban Canada orientation call to clarify settlement priorities',
    howImageAlt: 'Marhaban Canada practical checklist for organizing first steps in Canada',
    primaryCta: 'Book a call',
    secondaryCta: 'See the path',
    proof: ['30 minutes to clarify priorities', 'Checklist after the call', 'Official sources', 'FR / EN / AR'],
    visualChecklist: 'Arrival checklist',
    visualScam: 'Scam check',
    visualPlan: 'First-week plan',
    visualDoc: 'Practical settlement documents',
    visualTags: ['Housing', 'Banking', 'Phone', 'Priorities'],
    workflow: ['Situation', 'Priorities', 'Call', 'Summary'],
    progressLabel: 'What you leave with',
    progressHelper: 'After the call, you leave with simple markers, trusted resources, and the first mistakes to avoid.',
    needsEyebrow: 'Choose your need',
    needsTitle: 'Start with what is blocking you now.',
    needsText: 'Choose the situation that matches your moment so you can move to the right next step.',
    needs: [
      { label: 'Prepare', title: 'Prepare my arrival', text: 'Budget, useful documents, and first decisions before departure.', href: '/parcours', icon: MapPinned },
      { label: 'Week 1', title: 'First week in Canada', text: 'A clear order so you do not do everything at once.', href: '/checklist/semaine-1', icon: ClipboardCheck },
      { label: 'Housing', title: 'Housing', text: 'Questions to ask, proof to check, and warning signs before paying.', href: '/ressources', icon: Home },
      { label: 'Documents', title: 'Essential documents', text: 'SIN, health, useful proofs, and official links to keep nearby.', href: '/parcours/guide/steps/nas', icon: FileCheck2 },
      { label: 'Practical', title: 'Bank / phone', text: 'Compare options, understand fees, and prepare the right appointments.', href: '/parcours/guide/steps/bank', icon: Phone },
      { label: 'Verify', title: 'Check a suspicious situation', text: 'Slow down, check evidence, and spot risky requests.', href: '/arnaques', icon: AlertTriangle },
    ],
    offersEyebrow: 'Our offers',
    offersTitle: 'Choose the orientation level that fits your moment.',
    offersText: 'Each offer explains who it helps, what it includes, what you receive after the call, and what is not promised.',
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
      { title: 'Start with a clear order', text: 'Move forward without restarting from scratch.', icon: CheckCircle2 },
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
      { label: 'I want to talk to someone', href: '/reserver' },
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
      'Housing listing, job promise, urgent payment request, or doubtful situation: we help you identify what to check before you pay or share documents.',
    scamCta: 'Check a suspicious situation',
    guidesEyebrow: 'Practical guides',
    guidesTitle: 'Short, useful guides to help you act in the right order.',
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
    audienceEyebrow: 'Who is it for',
    audienceTitle: 'Students, workers, residents, visitors.',
    audienceText: 'Marhaban Canada adapts to your moment and your situation.',
    audiences: [
      { icon: GraduationCap, label: 'Student', title: 'You are coming to study', text: 'Study permit, campus housing, bank account, first practical steps in Canada.', href: '/ressources' },
      { icon: BriefcaseBusiness, label: 'Worker', title: 'You are coming to work', text: 'SIN, contract, diploma recognition, essential rights from day one.', href: '/ressources' },
      { icon: Home, label: 'Permanent resident', title: 'You are settling long-term', text: 'OHIP/RAMQ, identity documents, first contributions, long-term markers.', href: '/parcours' },
      { icon: MapPinned, label: 'Visitor / family', title: 'You are joining someone or exploring', text: 'Rights during your stay, emergency care, next steps based on your status.', href: '/contact' },
    ] as AudienceData[],
    founderEyebrow: 'Why this service exists',
    founderTitle: 'Born from a personal immigration experience.',
    founderText: 'Marhaban Canada was built by someone who went through these same steps — endless lists, contradictory information, and fees paid to unreliable people. This service is what we would have wanted to find on arrival: clear, human, and honest about what it can and cannot do.',
    founderNote: 'Practical guidance and general information — not personalized legal advice.',
    pricingEyebrow: 'Pricing',
    pricingTitle: 'Transparent, no surprises.',
    pricingNote: 'All calls are informational. No legal advice, no guaranteed outcome.',
    pricingCta: 'Book',
    pricingCtaFree: 'Write to book',
    pricing: [
      { title: 'Discovery call', price: 'Free', duration: '15 minutes', benefit: 'Ask your first questions and understand if the service fits your situation.', note: 'No commitment — by email request.', href: '/contact' },
      { title: 'Orientation call', price: '$29', duration: '30 minutes', benefit: 'Clarify your priorities, identify next practical steps and useful resources.', note: 'Short summary included.', href: '/reserver', featured: true },
      { title: 'Support pack', price: '$69 – $99', duration: '60 min + written summary', benefit: 'Structured plan, targeted resources and detailed summary after the call.', note: 'Practical summary included.', href: '/reserver' },
    ] as PricingData[],
    faqEyebrow: 'Frequently asked questions',
    faqTitle: 'What we get asked most.',
    faq: [
      { q: 'Is this legal advice?', a: 'No. Marhaban Canada offers practical orientation and general information. For any question about visas, permits, or permanent residence, please consult an authorized immigration representative (RCIC or lawyer).' },
      { q: 'What does a call look like?', a: 'You share your situation and what is blocking you. We clarify priorities, useful resources, and mistakes to avoid together. You leave with a practical plan — not a checklist of boxes to tick.' },
      { q: 'Can we speak in Arabic or English?', a: 'Yes. Calls can be held in French, English, or Arabic based on your preference.' },
      { q: 'Are there any guarantees?', a: 'No — and any serious service will tell you the same. This is informational orientation. Marhaban Canada does not guarantee any outcome for immigration, housing, or employment steps.' },
      { q: 'How do I know you are legitimate?', a: 'Good question — and exactly the right reflex. Our prices are displayed clearly. Our service scope (what we do / what we do not do) is visible on this page. And you can email us before booking: contact@marhabancanada.ca. That is the transparency we expect from others.' },
    ] as FAQData[],
    finalTitle: 'You do not need to understand everything alone.',
    finalText: 'Book an orientation call and leave with a clearer view of your next practical steps, a short summary, and trusted resources.',
    finalResources: 'View resources',
    finalScam: 'Check a suspicious situation',
  },
  ar: {
    announcement: 'مكالمات توجيه لمدة 30 دقيقة — أماكن تجريبية متاحة',
    announcementCta: 'احجز مكالمة',
    heroEyebrow: 'مرحبا كندا — توجيه عملي للقادمين الجدد إلى كندا',
    heroTitle: 'هل تصل إلى كندا؟ نساعدك على معرفة ما تفعله، بأي ترتيب، وإلى من تلجأ.',
    heroSubtitle:
      'مرافقة واضحة وإنسانية لفهم أولوياتك، تجنب الأخطاء المكلفة، والتقدم خطوة بخطوة. بعد المكالمة تحصل على خارطة طريق قصيرة وواضحة.',
    heroImageAlt: 'وافد جديد يحصل على دعم مرحبا كندا في خطواته الأولى في كندا',
    offerImageAlt: 'مكالمة توجيه من مرحبا كندا لتوضيح أولويات الاستقرار',
    howImageAlt: 'قائمة تحقق عملية من مرحبا كندا لتنظيم الخطوات الأولى في كندا',
    primaryCta: 'احجز مكالمة',
    secondaryCta: 'شاهد المسار',
    proof: ['30 دقيقة لتوضيح الأولويات', 'قائمة تحقق بعد المكالمة', 'مصادر رسمية', 'FR / EN / AR'],
    visualChecklist: 'قائمة الوصول',
    visualScam: 'مكافحة الاحتيال',
    visualPlan: 'خطة الأسبوع الأول',
    visualDoc: 'وثائق عملية للاستقرار',
    visualTags: ['السكن', 'البنك', 'الهاتف', 'الأولويات'],
    workflow: ['الوضع', 'الأولويات', 'المكالمة', 'الملخص'],
    progressLabel: 'ما ستحصل عليه سريعاً',
    progressHelper: 'بعد المكالمة، تخرج بإشارات واضحة وموارد موثوقة وأول الأخطاء التي يجب تجنبها.',
    needsEyebrow: 'اختر حاجتك',
    needsTitle: 'ابدأ بما يوقفك الآن.',
    needsText: 'اختر الحالة التي تشبه وضعك لتصل بسرعة إلى الخطوة المناسبة.',
    needs: [
      { label: 'تحضير', title: 'تحضير وصولي', text: 'ميزانية ووثائق مفيدة وقرارات أولى قبل السفر.', href: '/parcours', icon: MapPinned },
      { label: 'الأسبوع 1', title: 'الأسبوع الأول في كندا', text: 'ترتيب واضح حتى لا تفعل كل شيء في نفس الوقت.', href: '/checklist/semaine-1', icon: ClipboardCheck },
      { label: 'السكن', title: 'السكن', text: 'أسئلة مهمة، أدلة يجب التحقق منها، وإشارات تحذير قبل الدفع.', href: '/ressources', icon: Home },
      { label: 'وثائق', title: 'الوثائق الأساسية', text: 'رقم التأمين، الصحة، الإثباتات المفيدة والروابط الرسمية.', href: '/parcours/guide/steps/nas', icon: FileCheck2 },
      { label: 'عملي', title: 'البنك / الهاتف', text: 'مقارنة الخيارات وفهم الرسوم وتحضير المواعيد المناسبة.', href: '/parcours/guide/steps/bank', icon: Phone },
      { label: 'تحقق', title: 'تحقق من وضع مشبوه', text: 'تمهل، تحقق من الأدلة، وانتبه للطلبات عالية المخاطر.', href: '/arnaques', icon: AlertTriangle },
    ],
    offersEyebrow: 'عروضنا',
    offersTitle: 'اختر مستوى التوجيه المناسب لمرحلتك.',
    offersText: 'كل عرض يوضح من يساعده، وما الذي يشمله، وما الذي تحصل عليه بعد المكالمة، وما الذي لا يُعد به.',
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
      { title: 'ابدأ بترتيب واضح', text: 'تتحرك إلى الأمام بدون أن تبدأ من الصفر.', icon: CheckCircle2 },
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
      { label: 'أريد التحدث مع شخص', href: '/reserver' },
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
      'إعلان سكن، وعد عمل، طلب دفع عاجل أو وضع مشكوك فيه: نساعدك على تحديد ما يجب التحقق منه قبل الدفع أو مشاركة الوثائق.',
    scamCta: 'تحقق من وضع مشبوه',
    guidesEyebrow: 'أدلة عملية',
    guidesTitle: 'أدلة قصيرة ومفيدة لتتصرف بالترتيب الصحيح.',
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
    audienceEyebrow: 'لمن هذه الخدمة',
    audienceTitle: 'طلاب، عمال، مقيمون دائمون، زوار.',
    audienceText: 'مرحبا كندا تتكيف مع وضعك ولحظتك.',
    audiences: [
      { icon: GraduationCap, label: 'طالب·ة', title: 'أنت قادم للدراسة', text: 'تصريح الدراسة، السكن الجامعي، فتح الحساب، الخطوات الأولى العملية.', href: '/ressources' },
      { icon: BriefcaseBusiness, label: 'عامل·ة', title: 'أنت قادم للعمل', text: 'رقم التأمين، العقد، الاعتراف بالشهادات، الحقوق الأساسية من اليوم الأول.', href: '/ressources' },
      { icon: Home, label: 'مقيم·ة دائم·ة', title: 'أنت تستقر على المدى الطويل', text: 'الصحة، وثائق الهوية، أول المساهمات، المراجع على المدى الطويل.', href: '/parcours' },
      { icon: MapPinned, label: 'زائر·ة / عائلة', title: 'أنت تلتحق بشخص أو تستكشف', text: 'الحقوق خلال الإقامة، الرعاية الطارئة، الخطوات التالية حسب وضعك.', href: '/contact' },
    ] as AudienceData[],
    founderEyebrow: 'لماذا هذه الخدمة موجودة',
    founderTitle: 'وُلدت من تجربة شخصية في الهجرة.',
    founderText: 'مرحبا كندا صُممت من شخص مرّ بنفس هذه الخطوات — القوائم اللانهائية، المعلومات المتناقضة، والرسوم المدفوعة لأشخاص غير موثوقين. هذه الخدمة هي ما كنا نتمنى أن نجده عند الوصول: واضحة، إنسانية، وصادقة حول ما يمكنها وما لا يمكنها فعله.',
    founderNote: 'مرافقة عملية ومعلومات عامة — لا نصيحة قانونية شخصية.',
    pricingEyebrow: 'الأسعار',
    pricingTitle: 'شفافة، بدون مفاجآت.',
    pricingNote: 'جميع المكالمات معلوماتية. لا نصيحة قانونية، لا ضمان للنتائج.',
    pricingCta: 'احجز',
    pricingCtaFree: 'اكتب للحجز',
    pricing: [
      { title: 'مكالمة اكتشاف', price: 'مجاناً', duration: '15 دقيقة', benefit: 'طرح أسئلتك الأولى ومعرفة ما إذا كانت الخدمة تناسب وضعك.', note: 'بدون التزام — بطلب عبر البريد الإلكتروني.', href: '/contact' },
      { title: 'مكالمة توجيه', price: '29 $', duration: '30 دقيقة', benefit: 'توضيح الأولويات وتحديد الخطوات العملية التالية والموارد المفيدة.', note: 'ملخص قصير مشمول.', href: '/reserver', featured: true },
      { title: 'حزمة المرافقة', price: '69 – 99 $', duration: '60 دقيقة + ملخص مكتوب', benefit: 'خطة منظمة، موارد مخصصة، وملخص مفصل بعد المكالمة.', note: 'ملخص عملي مشمول.', href: '/reserver' },
    ] as PricingData[],
    faqEyebrow: 'أسئلة متكررة',
    faqTitle: 'ما نُسأل عنه أكثر.',
    faq: [
      { q: 'هل هذه نصيحة قانونية؟', a: 'لا. مرحبا كندا تقدم توجيهاً عملياً ومعلومات عامة. لأي سؤال يتعلق بالتأشيرات أو التصاريح أو الإقامة الدائمة، تواصل مع ممثل هجرة معتمد.' },
      { q: 'كيف تسير المكالمة؟', a: 'تشارك وضعك وما يعيقك. نوضح معاً الأولويات، الموارد المفيدة والأخطاء التي يجب تجنبها. تخرج بخطة عملية — ليست قائمة خانات للملء.' },
      { q: 'هل الخدمة متاحة بالعربية والإنجليزية؟', a: 'نعم. يمكن إجراء المكالمات بالفرنسية أو الإنجليزية أو العربية حسب تفضيلك.' },
      { q: 'هل هناك ضمانات؟', a: 'لا — وأي خدمة جادة ستقول لك الشيء نفسه. هذا توجيه معلوماتي. مرحبا كندا لا تضمن أي نتائج للهجرة أو السكن أو العمل.' },
      { q: 'كيف أعرف أنكم موثوقون؟', a: 'سؤال وجيه — وهذا بالضبط التصرف الصحيح. أسعارنا معروضة بوضوح. إطار خدمتنا مرئي في هذه الصفحة. ويمكنك الكتابة إلينا قبل الحجز: contact@marhabancanada.ca. هذا هو الشفافية التي نطلبها من الآخرين.' },
    ] as FAQData[],
    finalTitle: 'لا تحتاج إلى فهم كل شيء وحدك.',
    finalText: 'احجز مكالمة توجيه واخرج برؤية أوضح لخطواتك العملية التالية، مع ملخص قصير وموارد موثوقة.',
    finalResources: 'عرض الموارد',
    finalScam: 'تحقق من وضع مشبوه',
  },
} as const satisfies Record<Locale, unknown>;

export default function HomePage() {
  const { locale } = useLanguage();
  const { dir } = getHtmlAttrs(locale);
  const t = homeTexts[locale] ?? homeTexts.fr;
  const bookingHref = bookingPath(locale);

  return (
    <main className="warm-page overflow-hidden" dir={dir}>
      <AnnouncementBar message={t.announcement} cta={t.announcementCta} href={bookingHref} />

      <SectionReveal className="marhaban-hero-shell relative px-4 pb-10 pt-8 text-white sm:px-6 sm:pb-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
          <div className="relative z-10 max-w-3xl py-6 sm:py-10">
            <p className="inline-flex rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-marhaban-gold shadow-warm-sm backdrop-blur">
              {t.heroEyebrow}
            </p>
            <h1 className="mt-6 max-w-4xl text-[clamp(2.8rem,6vw,5.6rem)] font-semibold leading-[0.96] text-white">
              {t.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/76 sm:text-lg">
              {t.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <AnimatedCTA className="inline-flex">
                <LocalizedLink href={bookingHref} className="inline-flex min-h-[56px] items-center gap-2 rounded-full bg-marhaban-gold px-6 py-3 text-sm font-bold text-marhaban-ink shadow-[0_18px_60px_rgba(213,168,79,0.26)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark">
                  {t.primaryCta}
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                </LocalizedLink>
              </AnimatedCTA>
              <AnimatedCTA className="inline-flex">
                <LocalizedLink href="/parcours" className="inline-flex min-h-[56px] items-center gap-2 rounded-full border border-white/18 bg-white/[0.08] px-6 py-3 text-sm font-bold text-white shadow-warm-sm backdrop-blur transition hover:bg-white/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-forestDark">
                  {t.secondaryCta}
                  <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
                </LocalizedLink>
              </AnimatedCTA>
            </div>
            <div className="mt-8 grid gap-2 sm:grid-cols-2">
              {t.proof.map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-3 py-2 text-xs font-semibold text-white/82 ring-1 ring-white/12 backdrop-blur">
                  <CheckCircle2 className="h-3.5 w-3.5 text-marhaban-gold" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <HeroComposition
            locale={locale}
            checklistLabel={t.visualChecklist}
            scamLabel={t.visualScam}
            planLabel={t.visualPlan}
            docLabel={t.visualDoc}
            workflow={t.workflow}
          />
        </div>
      </SectionReveal>

      <SectionBand className="bg-[#FDF8EE]">
        <div className="grid gap-4 lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch">
          <div className="rounded-3xl border border-marhaban-leaf/12 bg-white/86 p-5 shadow-warm-sm sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">{t.progressLabel}</p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-marhaban-ink sm:text-3xl">Tu repars avec des repères utiles, pas une liste floue.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-marhaban-ink/72">{t.progressHelper}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {t.proof.map((item) => (
                <div key={item} className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-mint/55 p-4">
                  <p className="text-sm font-semibold text-marhaban-ink">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-marhaban-leaf/12 bg-marhaban-cream/92 p-5 shadow-warm-sm sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">Choisis ta province</p>
            <p className="mt-3 text-sm leading-relaxed text-marhaban-ink/72">
              La sélection adapte les repères du parcours à ta réalité locale.
            </p>
            <div className="mt-4">
              <ProvinceSelector />
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand>
        <SectionHeader eyebrow={t.needsEyebrow} title={t.needsTitle} text={t.needsText} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.needs.map((item) => (
            <NeedCard key={item.title} item={item} />
          ))}
        </div>
      </SectionBand>

      <SectionBand className="bg-white/60">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <SectionHeader eyebrow={t.howEyebrow} title={t.howTitle} text="Quatre étapes, sans friction, pour passer du doute à un plan clair." />
          <div className="relative">
            <div className="pointer-events-none absolute left-6 right-6 top-6 hidden h-px bg-gradient-to-r from-transparent via-marhaban-leaf/25 to-transparent xl:block" aria-hidden="true" />
            <StaggerGroup className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
              {t.howSteps.map((step, index) => (
                <StepCard key={step.title} step={step} index={index} />
              ))}
            </StaggerGroup>
          </div>
        </div>
      </SectionBand>

      <SectionBand className="bg-[#FDF8EE]">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <SectionHeader eyebrow={t.offersEyebrow} title={t.offersTitle} text={t.offersText} />
          <div className="rounded-3xl border border-marhaban-leaf/12 bg-white/86 p-5 shadow-warm-sm">
            <p className="text-sm font-semibold leading-relaxed text-marhaban-ink/72">{disclaimer[locale]}</p>
          </div>
        </div>
        <FloatingVisual className="mt-8" float="gentle">
          <BrandImagePanel
            src="/assets/marhaban/visuel-appel.jpg"
            alt={t.offerImageAlt}
            sizes="(min-width: 1024px) 1120px, calc(100vw - 2rem)"
            className="aspect-[16/7] min-h-[240px]"
          />
        </FloatingVisual>
        <StaggerGroup className="mt-8 grid gap-5 lg:grid-cols-2">
          {t.offers.map((offer, index) => (
              <OfferCard key={offer.title} offer={offer} cta={t.reserve} featured={index === 1} href={bookingHref} />
          ))}
        </StaggerGroup>
      </SectionBand>

      <SectionBand>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader eyebrow={t.scopeEyebrow} title={t.scopeTitle} text="On clarifie le cadre pour éviter toute confusion, toute pression et toute promesse irréaliste." />
          <ScopeCards scope={t.scope} />
        </div>
      </SectionBand>

      <section className="relative overflow-hidden bg-marhaban-obsidian px-4 py-14 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(213,168,79,0.16),transparent_26rem),radial-gradient(circle_at_82%_30%,rgba(122,144,130,0.18),transparent_22rem)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-white/12 bg-white/[0.05] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-marhaban-gold/30 bg-marhaban-gold/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-marhaban-gold">{t.scamEyebrow}</p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl">{t.scamTitle}</h2>
            <p className="mt-4 max-w-2xl text-base text-white/76 sm:text-lg">{t.scamText}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
            <AnimatedCard className="rounded-[1.65rem] border border-white/12 bg-white/[0.08] p-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-gold">À vérifier avant de payer</p>
              <div className="mt-4 rounded-2xl border border-white/10 bg-marhaban-forestDark/60 p-4 text-sm leading-relaxed text-white/78">
                <p className="font-semibold text-white">“Paiement urgent pour garder ta place.”</p>
                <p className="mt-2">Vérifie le nom, le site, les preuves, le contrat et le mode de paiement avant d’envoyer quoi que ce soit.</p>
              </div>
            </AnimatedCard>
            <div className="grid gap-4">
              <AnimatedCard className="rounded-[1.65rem] border border-marhaban-gold/18 bg-marhaban-gold/10 p-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-gold">Signal utile</p>
                <p className="mt-3 text-lg font-semibold">Ralentir, vérifier, garder une trace.</p>
              </AnimatedCard>
              <AnimatedCard className="rounded-[1.65rem] border border-white/12 bg-white/[0.07] p-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.16)]">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">Checklist courte</p>
                <ul className="mt-3 space-y-2 text-sm text-white/74">
                  <li>Contrat ou lien officiel ?</li>
                  <li>Promesse irréaliste ?</li>
                  <li>Paiement rapide demandé ?</li>
                </ul>
              </AnimatedCard>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-2">
            <LocalizedLink href="/arnaques" className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-marhaban-gold px-6 py-3 text-sm font-bold text-marhaban-ink shadow-[0_18px_60px_rgba(213,168,79,0.22)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-obsidian">
              {t.scamCta}
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            </LocalizedLink>
            <LocalizedLink href="/ressources" className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-white/18 bg-white/[0.06] px-6 py-3 text-sm font-bold text-white transition hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-obsidian">
              {t.finalResources}
            </LocalizedLink>
          </div>
        </div>
      </section>

      <SectionBand>
        <SectionHeader eyebrow={t.guidesEyebrow} title={t.guidesTitle} text="Des guides courts, concrets et utiles pour avancer dans le bon ordre." />
        <StaggerGroup className="mt-8 grid gap-5 lg:grid-cols-2">
          {t.guides.map((guide, index) => (
            <GuideCard key={guide.title} guide={guide} featured={index === 0} />
          ))}
        </StaggerGroup>
      </SectionBand>

      <SectionReveal className="px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8" data-floating-book-call-hide>
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-marhaban-leaf/12 bg-[#FDF8EE] shadow-warm">
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-clay">Marhaban Canada</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-marhaban-ink sm:text-5xl">{t.finalTitle}</h2>
              <p className="mt-4 max-w-2xl text-base text-marhaban-ink/72">{t.finalText}</p>
              <p className="mt-4 max-w-3xl text-xs leading-relaxed text-marhaban-ink/55">{disclaimer[locale]}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
              <LocalizedLink href={bookingPath(locale)} className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-marhaban-forestDark px-5 py-3 text-sm font-bold text-white transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-cream">
                {t.primaryCta}
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              </LocalizedLink>
              <LocalizedLink href="/ressources" className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-marhaban-leaf/18 px-5 py-3 text-sm font-bold text-marhaban-ink transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/30 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-cream">
                {t.finalResources}
              </LocalizedLink>
              <LocalizedLink href="/arnaques" className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-marhaban-leaf/18 px-5 py-3 text-sm font-bold text-marhaban-ink transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/30 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-cream">
                {t.finalScam}
              </LocalizedLink>
            </div>
          </div>
        </div>
      </SectionReveal>
    </main>
  );
}

function AnnouncementBar({ message, cta, href }: { message: string; cta: string; href: string }) {
  return (
    <section className="border-b border-marhaban-leaf/10 bg-[#FDF8EE] px-4 py-3 text-marhaban-ink sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 text-center sm:justify-between sm:text-start">
        <p className="text-sm font-semibold text-marhaban-ink/80">{message}</p>
        <LocalizedLink href={href} className="inline-flex min-h-[36px] items-center rounded-full bg-marhaban-forestDark px-4 py-1.5 text-sm font-bold text-white transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDF8EE]">
          {cta}
        </LocalizedLink>
      </div>
    </section>
  );
}

function SectionBand({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <SectionReveal className={cn('px-4 py-6 sm:px-6 sm:py-8 lg:px-8', className)}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </SectionReveal>
  );
}

function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-clay">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold leading-tight text-marhaban-ink sm:text-4xl lg:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-base text-marhaban-ink/70 sm:text-lg">{text}</p> : null}
    </div>
  );
}

function HeroComposition({
  locale,
  checklistLabel,
  scamLabel,
  planLabel,
  docLabel,
  workflow,
}: {
  locale: Locale;
  checklistLabel: string;
  scamLabel: string;
  planLabel: string;
  docLabel: string;
  workflow: readonly string[];
}) {
  const copy = {
    fr: {
      city: 'Canada / arrivée',
      title: 'De la confusion à un ordre clair',
      subtitle: 'Chaque appel transforme une situation floue en priorités pratiques et en résumé utile.',
      badge: 'Orientation pratique',
      note: 'Une feuille de route simple, humaine et protectrice.',
      scam: 'Vérifier avant de payer',
      scamDetail: 'Ralentir, vérifier les preuves et protéger tes premières démarches au Canada.',
      call: 'Appel d’orientation',
      duration: '30 minutes',
    },
    en: {
      city: 'Canada / arrival',
      title: 'From confusion to clear order',
      subtitle: 'Each call turns a messy situation into practical priorities and a useful summary.',
      badge: 'Practical orientation',
      note: 'A simple, human, protective roadmap.',
      scam: 'Check before you pay',
      scamDetail: 'Slow down, verify proof, and protect your first steps in Canada.',
      call: 'Orientation call',
      duration: '30 minutes',
    },
    ar: {
      city: 'كندا / الوصول',
      title: 'من التشتت إلى ترتيب واضح',
      subtitle: 'كل مكالمة تحول الوضع غير الواضح إلى أولويات عملية وملخص مفيد.',
      badge: 'توجيه عملي',
      note: 'خارطة طريق بسيطة وإنسانية وتحمي خطواتك.',
      scam: 'تحقق قبل الدفع',
      scamDetail: 'تمهل، تحقق من الأدلة، واحمِ خطواتك الأولى في كندا.',
      call: 'مكالمة توجيه',
      duration: '30 دقيقة',
    },
  } as const;
  const t = copy[locale];
  const captions = [checklistLabel, planLabel, t.call, docLabel];

  return (
    <div className="relative order-first lg:order-none">
      <div className="workflow-visual relative overflow-hidden rounded-[2rem] border border-white/12 bg-marhaban-forestDark p-5 shadow-[0_35px_110px_rgba(0,0,0,0.34)] sm:p-6 lg:min-h-[520px] lg:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(213,168,79,0.15),transparent_22rem),radial-gradient(circle_at_82%_18%,rgba(122,144,130,0.16),transparent_18rem)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-7 top-7 flex items-center justify-between border-b border-white/10 pb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45" aria-hidden="true">
          <span>Marhaban Canada</span>
          <span>FR / EN / AR</span>
        </div>

        <div className="relative flex h-full flex-col gap-4 pt-12">
          <FloatingVisual float="gentle" className="w-full" delay={0.06}>
            <AnimatedCard className="rounded-[1.85rem] border border-white/12 bg-white/[0.08] p-5 text-white shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-gold">{t.city}</p>
                  <h2 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl">{t.title}</h2>
                </div>
                <span className="rounded-full border border-marhaban-gold/35 bg-marhaban-gold/12 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-marhaban-gold">
                  {t.badge}
                </span>
              </div>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/72">{t.subtitle}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {workflow.map((item, index) => {
                  const stepIcons = [MessageCircle, ClipboardCheck, CalendarCheck, MailCheck];
                  const Icon = stepIcons[index] ?? CheckCircle2;
                  return (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-marhaban-gold text-marhaban-ink shadow-[0_0_30px_rgba(213,168,79,0.25)]">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-white">{item}</p>
                          <p className="text-xs text-white/58">{captions[index]}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AnimatedCard>
          </FloatingVisual>

          <div className="grid gap-3 sm:grid-cols-2">
            <AnimatedCard className="rounded-[1.5rem] border border-marhaban-gold/20 bg-marhaban-gold/10 p-4 text-white shadow-warm-sm">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-gold">{scamLabel}</p>
              <p className="mt-2 text-xl font-semibold leading-tight">{t.scam}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/66">{t.scamDetail}</p>
            </AnimatedCard>
            <AnimatedCard className="rounded-[1.5rem] border border-white/12 bg-white/[0.08] p-4 text-white shadow-warm-sm">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">{t.duration}</p>
              <p className="mt-2 text-xl font-semibold">{t.call}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/66">{t.note}</p>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrandImagePanel({
  src,
  alt,
  sizes,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={cn('relative overflow-hidden rounded-premium bg-marhaban-mint shadow-premium-card', className)}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

function NeedCard({ item }: { item: NeedCardData }) {
  const Icon = item.icon;
  return (
      <AnimatedCard className="group">
      <LocalizedLink href={item.href} className="relative flex min-h-[240px] flex-col justify-between overflow-hidden rounded-[1.65rem] border border-marhaban-leaf/12 bg-white p-5 shadow-warm-sm transition hover:-translate-y-0.5 hover:border-marhaban-leaf/28 hover:shadow-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-marhaban-gold via-marhaban-leaf to-marhaban-clay opacity-70" aria-hidden="true" />
        <div>
          <div className="flex items-start justify-between gap-4">
            <span className="rounded-full bg-marhaban-mint px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-marhaban-leaf">{item.label}</span>
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-marhaban-forestDark text-marhaban-gold shadow-[0_14px_34px_rgba(8,42,36,0.18)]">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
          </div>
          <h3 className="mt-6 text-[1.06rem] font-semibold leading-tight text-marhaban-ink">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-marhaban-ink/65">{item.text}</p>
        </div>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-marhaban-leaf">
          <ArrowRight className="h-4 w-4 rtl-flip transition group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </LocalizedLink>
    </AnimatedCard>
  );
}

function OfferCard({ offer, cta, featured, href }: { offer: OfferData; cta: string; featured: boolean; href: string }) {
  return (
    <AnimatedCard featured={featured}>
      <article className={cn('relative flex min-h-[320px] flex-col overflow-hidden rounded-[1.75rem] border p-6 shadow-warm-sm', featured ? 'border-marhaban-gold/24 bg-marhaban-forestDark text-white shadow-[0_30px_90px_rgba(8,42,36,0.24)]' : 'border-marhaban-leaf/10 bg-white text-marhaban-ink')}>
        {featured ? <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-marhaban-gold/80 to-transparent" aria-hidden="true" /> : null}
        <p className={cn('text-xs font-bold uppercase tracking-[0.12em]', featured ? 'text-marhaban-gold' : 'text-marhaban-clay')}>{offer.duration}</p>
        <h3 className={cn('mt-4 text-2xl font-semibold', featured ? 'text-white' : 'text-marhaban-ink')}>{offer.title}</h3>
        <p className={cn('mt-3 text-4xl font-semibold', featured ? 'text-marhaban-gold' : 'text-marhaban-leaf')}>{offer.price}</p>
        <p className={cn('mt-4 text-sm', featured ? 'text-white/76' : 'text-marhaban-ink/70')}>{offer.benefit}</p>
        <p className={cn('mt-4 rounded-2xl px-3 py-2 text-xs font-semibold', featured ? 'bg-white/[0.08] text-white/70' : 'bg-white/75 text-marhaban-ink/60')}>{offer.note}</p>
        <LocalizedLink href={href} className={cn('mt-auto inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2', featured ? 'bg-marhaban-gold text-marhaban-ink hover:bg-white focus-visible:ring-marhaban-gold/50 focus-visible:ring-offset-marhaban-forestDark' : 'bg-marhaban-ink text-white hover:bg-marhaban-leaf focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-marhaban-cream')}>
          {cta}
          <CalendarCheck className="h-4 w-4" aria-hidden="true" />
        </LocalizedLink>
      </article>
    </AnimatedCard>
  );
}

function StepCard({ step, index }: { step: StepData; index: number }) {
  const Icon = step.icon;
  return (
    <AnimatedCard className="rounded-3xl border border-marhaban-leaf/10 bg-white p-5 shadow-warm-sm">
      <article>
        <div className="flex items-center justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-marhaban-mint text-marhaban-leaf">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-3xl font-semibold text-marhaban-clay/30">{index + 1}</span>
        </div>
        <h3 className="mt-6 text-xl font-semibold text-marhaban-ink">{step.title}</h3>
        <p className="mt-3 text-sm text-marhaban-ink/65">{step.text}</p>
      </article>
    </AnimatedCard>
  );
}

function ScopeCards({ scope }: { scope: ScopeData }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <AnimatedCard className="rounded-3xl border border-marhaban-leaf/15 bg-marhaban-mint/75 p-6 shadow-warm-sm">
        <article>
          <h3 className="text-xl font-semibold text-marhaban-ink">{scope.doesTitle}</h3>
          <ul className="mt-5 space-y-3">
            {scope.does.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-marhaban-ink/70">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-marhaban-leaf" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </AnimatedCard>
      <AnimatedCard className="rounded-3xl border border-amber-200 bg-[#FFF4E3] p-6 shadow-warm-sm">
        <article>
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
      </AnimatedCard>
    </div>
  );
}

function GuideCard({ guide, featured }: { guide: LinkCardData; featured: boolean }) {
  const Icon = guide.icon;
  return (
    <AnimatedCard featured={featured}>
      <article className={cn('flex min-h-[250px] flex-col justify-between rounded-3xl border p-5 shadow-warm-sm', featured ? 'bg-marhaban-ink text-white' : 'border-marhaban-leaf/10 bg-white text-marhaban-ink')}>
        <div>
          <span className={cn('grid h-11 w-11 place-items-center rounded-2xl', featured ? 'bg-white/10 text-marhaban-gold' : 'bg-marhaban-mint text-marhaban-leaf')}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className={cn('mt-6 text-xl font-semibold leading-tight', featured ? 'text-white sm:text-2xl' : 'text-marhaban-ink')}>{guide.title}</h3>
          <p className={cn('mt-3 text-sm leading-relaxed', featured ? 'text-white/72' : 'text-marhaban-ink/65')}>{guide.text}</p>
        </div>
        <LocalizedLink href={guide.href} className={cn('mt-6 inline-flex items-center gap-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35', featured ? 'text-white' : 'text-marhaban-leaf hover:text-marhaban-ink')}>
          <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
          <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
        </LocalizedLink>
      </article>
    </AnimatedCard>
  );
}
