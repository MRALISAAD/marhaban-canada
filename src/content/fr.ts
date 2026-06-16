// frContent.ts
// ✅ Version cohérente (anti-404) :
// - Step id: "telephone" (au lieu de "mobile")
// - guideOrder cohérent
// - quickGuides pointe vers des routes existantes

export type SourceLink = { name: string; url: string };

export type StepGuide = {
  id: StepId;
  title: string;
  description: string;
  href: string;
  summary: string;
  what: string;
  why: string;
  how: string[];
  avoid: string[];
  sources: SourceLink[];
};

import type { Locale } from '@/i18n/locales';
import type { ScamMicrocopy, ScamHousingContent, ScamGuideContentDetails, GuideGroup } from './contentTypes';

export type LocaleContent = {
  locale: Locale;
  dir: "ltr" | "rtl";
  brand: string;
  contactEmail: string;

  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };

  microcopy: Record<string, string>;

  serviceAccompagnementDefinition: { title: string; body: string };
  serviceAccompagnementWhatIs: string[];
  serviceAccompagnementWhatIsNot: string[];
  serviceAccompagnementWhatIsTitle: string;
  serviceAccompagnementWhatIsNotTitle: string;
  serviceAccompagnementNoProxy: string;
  serviceAccompagnementPillar: string;
  serviceAccompagnementDisclaimer: string;

  seoDescriptions: { meta: string; og: string; pdfHeader: string };

  services: {
    title: string;
    cards: Array<{
      title: string;
      description: string;
      icon: string;
      sources: SourceLink[];
    }>;
  };

  navLinks: Array<{ label: string; href: string }>;

  checklist: {
    title: string;
    subtitle: string;
    shareLabel: string;
    resetLabel: string;
    shareSuccess: string;
    shareError: string;
    items: StepGuide[];
  };

  steps: Record<StepId, StepGuide>;

  survival48h: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      href: string;
      sources: SourceLink[];
    }>;
  };

  budget: {
    title: string;
    subtitle: string;
    note: string;
    cityLabel: string;
    householdLabel: string;
    totalLabel: string;
    breakdownLabels: { rent: string; groceries: string; transport: string };
    households: Array<{ id: string; label: string; multiplier: number }>;
    cities: Array<{
      id: string;
      label: string;
      rent: number;
      groceries: number;
      transport: number;
      cityMultiplier: number;
      sources: SourceLink[];
    }>;
  };

  resourceSources: Array<{
    title: string;
    description: string;
    href: string;
    sources: SourceLink[];
  }>;

  resources: {
    header: {
      title: string;
      subtitle: string;
      searchPlaceholder: string;
      provinceLabel: string;
      categoryLabel: string;
    };
    accompaniment: {
      shortDefinition: string;
      noProxyLine: string;
      footerHelp: string;
    };
    quickGuides: {
      documentsCard: { title: string; body: string; ctaLabel: string; href: string };
      transportCard: { title: string; body: string; ctaLabel: string; href: string };
      creditCard: { title: string; body: string; ctaLabel: string; href: string };
    };
    sections: Record<string, { title: string; hint: string }>;
    ui: {
      recommendedStart: string;
      openResource: string;
      addFavorite: string;
      seeGuide: string;
      backToPath: string;
    };
  };

  resourcesPage: {
    labels: {
      eyebrow: string;
      title: string;
      subtitle: string;
      searchPlaceholder: string;
      provinceLabel: string;
      categoryLabel: string;
      filterAll: string;
      officialLabel: string;
      recommendedLabel: string;
      openLabel: string;
      addFavoriteLabel: string;
      removeFavoriteLabel: string;
      emptyState: string;
      allProvincesLabel: string;
      guideCalloutTitle: string;
      guideWhatTitle: string;
      guideWhyTitle: string;
      guideHowTitle: string;
      guidePitfallsTitle: string;
      guideActionsTitle: string;
      guideSourcesTitle: string;
      guideActionPrompt: string;
      guideEyebrow: string;
    };
    provinceOptions: Array<{ value: string; label: string }>;
    categories: Array<{ id: string; title: string; description: string }>;
    items: Record<string, { title: string; description: string }>;
    guides: Record<
      string,
      {
        title: string;
        summary: string;
        callout: string;
        what: string;
        why: string[];
        how: string[];
        pitfalls: string[];
        actions: string[];
        ctaLabel: string;
        ctaHref: string;
        sources: SourceLink[];
      }
    >;
  };

  guideOrder: StepId[];
  guides: Record<
    CoreStepId,
    {
      slug: StepId;
      title: string;
      icon: string;
      urgency: number;
      sections: {
        description: { text: string; sources: SourceLink[] };
        why: { text: string; sources: SourceLink[] };
        documents: { items: string[]; sources: SourceLink[] };
        where: { text: string; sources: SourceLink[] };
        cost: { text: string; sources: SourceLink[] };
        proTip: { text: string; sources: SourceLink[] };
        fraudAlert: { text: string; sources: SourceLink[] };
      };
    }
  > &
    Partial<
      Record<
        OptionalStepId,
        {
          slug: StepId;
          title: string;
          icon: string;
          urgency: number;
          sections: {
            description: { text: string; sources: SourceLink[] };
            why: { text: string; sources: SourceLink[] };
            documents: { items: string[]; sources: SourceLink[] };
            where: { text: string; sources: SourceLink[] };
            cost: { text: string; sources: SourceLink[] };
            proTip: { text: string; sources: SourceLink[] };
            fraudAlert: { text: string; sources: SourceLink[] };
          };
        }
      >
    >;

  globalDisclaimer: string;

  antiFraud: { title: string; body: string; note: string };

  scams: {
    microcopy: ScamMicrocopy;
    housing: ScamHousingContent;
    guides: Record<string, ScamGuideContentDetails>;
  };

  guidePage: {
    subtitle: string;
    ctaLabel: string;
    infoPill: string;
    priorityLegend: string;
    timelineTitle: string;
    timelineSubtitle: string;
    groups: GuideGroup[];
  };

  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    cta: string;
    successTitle: string;
    successBody: string;
    error: string;
  };

  floatingCta: { label: string; href: string };

  footer: { 
    disclaimer: string; 
    rights: string;
    mission?: string;
    quickGuidesTitle?: string;
    sources?: string;
    copyright?: string;
  };

  howToUsePage: {
    title: string;
    whatThisSiteDoes: {
      title: string;
      items: string[];
    };
    whatThisSiteDoesNotDo: {
      title: string;
      items: string[];
    };
    howToUseItStepByStep: {
      title: string;
      items: string[];
    };
  };

  shared: {
    sourceLabel: string;
    officialLink: string;
    budgetLegend: string;
    disclaimer: string;
    radarTitle: string;
    radarBody: string;
    sourcesIntro: string;
    viewAllSteps: string;
    sectionLabels: { what: string; why: string; how: string; avoid: string; sources: string; docs?: string; smartTips?: string };
    easyReadOn: string;
    easyReadOff: string;
    nav?: {
      home: string;
      checklist: string;
      parcours: string;
      ressources: string;
      arnaques: string;
      about: string;
      contact: string;
      legal: string;
      plus?: string;
      switchToFr: string;
      switchToEn: string;
      switchToAr: string;
    };
    ctas?: {
      start: string;
      startJourney: string;
      viewChecklist: string;
      viewJourney: string;
      viewGuides: string;
      viewGuide: string;
      findOffice: string;
      backToHome: string;
      continue: string;
      next: string;
      previous: string;
      download: string;
      share: string;
      reset: string;
      search: string;
      filter: string;
      all: string;
    };
    commonPhrases?: {
      whyItMatters: string;
      whatYouNeed: string;
      stepByStep: string;
      importantNote: string;
      warning: string;
      tip: string;
      remember: string;
      avoid: string;
      sources: string;
      official: string;
      recommended: string;
      urgent: string;
      optional: string;
    };
    scamLabels?: {
      scenario: string;
      redFlags: string;
      actions: string;
      neverDo: string;
      mantra: string;
      victimPlan: string;
    };
    footer?: {
      tagline: string;
      contact: string;
      privacy: string;
      legal: string;
    };
  };

  contactPage: {
    title: string;
    question: string;
    writeToUs: string;
    privacy: string;
    responseTime: string;
    disclaimer: string;
    intro?: string;
    safetyNote?: string;
    formName?: string;
    formEmail?: string;
    formMessage?: string;
    formTopic?: string;
    formTopicOptions?: { value: string; label: string }[];
    formSubmit?: string;
    formSuccess?: string;
    formError?: string;
    secondaryLinks?: {
      legal: string;
      scams: string;
      checklist: string;
    };
  };

  aboutPage?: {
    title: string;
    intro: string;
    mission: { title: string; content: string };
    whatWeDo: { title: string; items: string[] };
    whatWeDontDo: { title: string; items: string[] };
    sources: { title: string; intro: string; examples: string[] };
    cta: { label: string; href: string };
  };

  legalPage?: {
    title: string;
    editor: { title: string; content: string };
    usage: { title: string; content: string };
    responsibilities: { title: string; content: string };
    dataProtection: {
      title: string;
      whatLabel?: string;
      what: string;
      whyLabel?: string;
      why: string;
      retentionLabel?: string;
      retention: string;
    };
    cookies: { title: string; content: string };
    intellectualProperty: { title: string; content: string };
    contact: { title: string; email: string };
  };
};

// ✅ Source de vérité unique pour les slugs/ids
// Import stepIds from guideSteps.ts to ensure consistency across all locales
import { stepIds as guideStepIds } from './guideSteps';
export const stepIds = guideStepIds;
export type StepId = (typeof guideStepIds)[number];
type CoreStepId = "nas" | "phone" | "bank" | "housing" | "health";
type OptionalStepId = Exclude<StepId, CoreStepId>;

const buildStepsRecord = (steps: StepGuide[]) =>
  steps.reduce((acc, step) => {
    acc[step.id] = step;
    return acc;
  }, {} as Record<StepId, StepGuide>);

const frSteps: StepGuide[] = [
  {
    id: "nas",
    title: "Numéro d'assurance sociale (NAS)",
    description: "Utilisé pour travailler, payer les impôts et recevoir certains services.",
    href: "/parcours/guide/steps/nas",
    summary: "Le NAS te relie aux impôts, à l’emploi et aux programmes fédéraux. Sans lui, aucun employeur ne peut te payer légalement.",
    what: "Le NAS est un numéro unique délivré par Service Canada qui prouve que tu es autorisé à travailler ou à recevoir des prestations.",
    why: "Il sécurise ton dossier fiscal et aide à éviter l’usurpation d’identité.",
    how: [
      "Réserve une visite dans un centre Service Canada (ou applique en ligne si ton dossier le permet).",
      "Apporte une pièce d’identité, une preuve utile pour ton installation et une preuve d’adresse canadienne.",
      "Garde la lettre NAS dans un dossier physique, ne partage jamais ce numéro par messagerie.",
    ],
    avoid: [
      "Ne donne ton NAS qu’à un employeur confirmé, à ta banque ou aux autorités.",
      "Refuse toute offre payante te promettant un NAS plus rapide.",
    ],
    sources: [{ name: "Service Canada", url: "https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html" }],
  },
  {
    id: "health",
    title: "Carte santé provinciale",
    description: "Accès au système public dans ta province d'arrivée.",
    href: "/parcours/guide/steps/health",
    summary: "Chaque province gère son assurance maladie. Tant que ta carte n’est pas active, tes soins urgents peuvent coûter très cher.",
    what: "La carte santé confirme ton accès au régime public selon les règles provinciales (RAMQ, OHIP, MSP, etc.).",
    why: "Elle couvre les consultations médicales essentielles et évite d’avancer des frais élevés.",
    how: [
      "Consulte le site de ta province pour confirmer formulaires et délais.",
      "Réunis pièces d’identité, preuves utiles pour ton installation et preuve de résidence (bail, facture).",
      "Dépose ta demande en ligne ou en personne, puis surveille la poste.",
    ],
    avoid: [
      "Ne mens pas sur ta date d’arrivée ou ton adresse : la carte peut être annulée.",
      "Méfie-toi des sites non gouvernementaux qui facturent des formulaires gratuits.",
    ],
    sources: [{ name: "IRCC – Soins de santé", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/apprendre-canada/soins-sante/systeme-soins-sante.html" }],
  },
  {
    id: "bank",
    title: "Compte bancaire",
    description: "Structure tes finances et prépare ton historique de crédit.",
    href: "/parcours/guide/steps/bank",
    summary: "Ouvrir un compte local facilite les virements d’employeur, la location d’un logement et l’accès aux produits newcomers.",
    what: "Un compte canadien et une carte de crédit sécurisée permettent de recevoir des revenus, de payer et de bâtir ta cote.",
    why: "Les banques demandent souvent un compte actif pour vérifier l’identité et réduire la fraude.",
    how: [
      "Compare les programmes d’accueil (frais réduits, transfert international).",
      "Prends rendez-vous en succursale avec pièce d’identité et preuve d’adresse.",
      "Demande une carte de crédit sécurisée ou un programme newcomer adapté.",
    ],
    avoid: ["Ne partage jamais ton NIP ou tes codes bancaires.", "Ne signe aucun produit dont tu ne comprends pas les frais."],
    sources: [{ name: "ACFC – Ouvrir un compte", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/comptes-bancaires/ouvrir-compte-bancaire.html" }],
  },
  {
    id: "phone",
    title: "Téléphone / SIM",
    description: "Obtenir un numéro local pour les démarches et communications.",
    href: "/parcours/guide/steps/phone",
    summary: "Un numéro local facilite les vérifications d’identité et évite les frais d’itinérance exorbitants.",
    what: "Il s’agit d’acheter une SIM/eSIM canadienne et de choisir un forfait adapté à ton premier mois.",
    why: "Les démarches administratives exigent souvent un numéro local pour confirmer un compte.",
    how: [
      "Compare les forfaits newcomers chez Bell, Rogers et Telus et les options prépayées.",
      "Achète ta SIM à l’aéroport ou en boutique officielle pour activer immédiatement.",
      "Conserve la facture afin de prouver ton adresse ou ta date d’arrivée si demandé.",
    ],
    avoid: ["Évite d’acheter une SIM à des revendeurs non autorisés.", "Ne partage pas tes codes de portabilité ou ton compte en ligne."],
    sources: [{ name: "ISDE – Services sans fil", url: "https://ised-isde.canada.ca/site/services-telecommunications/fr/services-sans-fil" }],
  },
  {
    id: "housing",
    title: "Recherche de logement",
    description: "Montre un dossier propre et sais les règles provinciales.",
    href: "/parcours/guide/steps/housing",
    summary: "Un bail écrit et conforme protège tes droits. Les propriétaires sérieux exigent un dossier complet même sans historique local.",
    what: "Le dossier locataire regroupe tes preuves de revenus, références et dépôt légal selon la province.",
    why: "Il réduit le risque d’arnaques et t’aide à louer dans des conditions claires.",
    how: [
      "Prépare CV locatif, relevés bancaires et lettre d’emploi ou de soutien.",
      "Planifie des visites (physiques ou vidéo) et vérifie l’identité du bailleur.",
      "Lis chaque clause du bail et paie via modes traçables après signature.",
    ],
    avoid: ["Ne transfère jamais d’argent avant d’avoir un bail signé.", "Refuse les demandes de copies de NAS ou passeport non nécessaires."],
    sources: [
      { name: "IRCC – Se loger", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/vie-canada/logement.html" },
      { name: "SCHL", url: "https://www.cmhc-schl.gc.ca/fr/consommateurs" },
    ],
  },
];

export const frContent: LocaleContent = {
  locale: "fr",
  dir: "ltr",
  brand: "Marhaban Canada",
  contactEmail: "contact@marhabancanada.ca",

  hero: {
    title: "Ton arrivée au Canada, un clic à la fois.",
    subtitle: "Chaque étape est expliquée simplement avec ses sources officielles.",
    ctaPrimary: "Voir la checklist",
    ctaSecondary: "Explorer les sources",
  },

  microcopy: {
    homeTitle: "Les premières étapes après ton arrivée au Canada",
    homeSubtitle: "Marhaban Canada — Orientation pratique pour nouveaux arrivants au Canada.",
    homeCtaPrimary: "Commencer le parcours",
    homeCtaSub: "Gratuit · Basé sur des sources officielles · Sans inscription",
    journeyTitle: "Ton parcours d'installation",
    journeySubtitle: "L'ordre le plus simple pour démarrer sans stress.",
    phaseWeek1Title: "Semaine 1",
    phaseWeek1Desc: "Ces étapes te rendent opérationnel rapidement. Une à la fois, à ton rythme.",
    phaseMonth1Title: "Mois 1",
    phaseMonth1Desc: "Rien d'urgent. Avance quand tu te sens prêt.",
    phaseOngoingTitle: "En continu",
    phaseOngoingDesc: "À garder en tête pour les semaines qui suivent.",
    breadcrumbHome: "Accueil",
    breadcrumbJourney: "Parcours",
    breadcrumbGuide: "Guide",
    breadcrumbBlog: "Blog",
    youAreHere: "Tu es ici",
    statusInStep: "Tu es à l'étape {step} ({phase}). Bon point de départ.",
    nextStepLabel: "Étape suivante",
    backLabel: "Retour",
    backToJourneyLabel: "Retour au parcours",
    recommendedNextStepTitle: "Prochaine étape recommandée",
    recommendedNextStepDesc: "Quand tu veux, tu peux passer à l'étape suivante.",
    viewGuideCta: "Voir le guide",
    relatedArticlesTitle: "Articles liés",
    priorityReadsTitle: "À lire en priorité",
    priorityReadsDesc: "Si tu viens d'arriver, commence par ces articles.",
    searchPlaceholder: "Rechercher (logement, crédit, NAS...)",
    mottoLabel: "Le mot d'ordre",
    docsLabel: "Ce qu'il te faut (rien de plus)",
    smartTipsLabel: "Bon à savoir (astuces utiles)",
    guideStartLabel: "Début du guide",
    guideEndLabel: "Fin du guide",
    noCommitmentLabel: "Sans engagement · Tu peux changer plus tard.",
    continueWhenReadyLabel: "Quand tu veux, tu peux continuer.",
    whyIntroLabel: "Sans cette étape, plusieurs démarches deviennent compliquées.",
    howIntroLabel: "Suis ces étapes dans l'ordre. Rien de compliqué.",
    docsIntroLabel: "Prépare ces documents avant d'y aller.",
    avoidIntroLabel: "À éviter absolument (pour ta sécurité)",
  },

  serviceAccompagnementDefinition: {
    title: "Orientation pratique",
    body: "Un service qui guide, explique et oriente les nouveaux arrivants, étape par étape, sans effectuer les démarches à leur place et sans facturer pour des services officiels. L’objectif est d’aider à comprendre, éviter les erreurs et avancer en sécurité, en s’appuyant uniquement sur des sources officielles.",
  },
  serviceAccompagnementWhatIs: [
    "Orientation claire pour les nouveaux arrivants",
    "Explication simple des démarches officielles",
    "Aide à comprendre l’ordre logique des étapes",
    "Prévention des erreurs et des arnaques",
    "Redirection vers des sources officielles uniquement",
    "Soutien humain, rassurant et non jugeant",
  ],
  serviceAccompagnementWhatIsNot: [
    "Ce n’est pas un service gouvernemental",
    "Ce n’est pas un service de conseils réglementés",
    "Ce n’est pas un agent ou consultant payant",
    "Nous ne remplissons aucun formulaire à votre place",
    "Nous ne prenons aucun rendez-vous à votre place",
    "Nous ne facturons aucun service officiel",
  ],
  serviceAccompagnementWhatIsTitle: "Ce que ce service est",
  serviceAccompagnementWhatIsNotTitle: "Ce que ce service n’est pas",
  serviceAccompagnementNoProxy: "Nous n’effectuons aucune démarche officielle à votre place.",
  serviceAccompagnementPillar: "Marhaban Canada — Orientation pratique pour nouveaux arrivants au Canada.",
  serviceAccompagnementDisclaimer: "Marhaban Canada offre de l’orientation pratique et de l’information générale. Nous ne fournissons pas de conseils juridiques ni de conseils en immigration. Pour les questions liées aux visas, permis, résidence permanente, admissibilité ou stratégie d’immigration, veuillez consulter un représentant autorisé.",

  seoDescriptions: {
    meta: "Orientation pratique pour nouveaux arrivants au Canada : démarches officielles, logement, banque, téléphone, prévention des arnaques.",
    og: "Orientation pratique pour nouveaux arrivants au Canada : démarches officielles, logement, banque, téléphone, prévention des arnaques.",
    pdfHeader: "Orientation pratique pour nouveaux arrivants au Canada : démarches officielles, logement, banque, téléphone, prévention des arnaques.",
  },

  services: {
    title: "Services prioritaires",
    cards: [
      {
        title: "Installation administrative",
        description: "Carte santé, banques et protections essentielles.",
        icon: "home",
        sources: [{ name: "Service Canada", url: "https://www.canada.ca/fr/emploi-developpement-social.html" }],
      },
      {
        title: "Logement fiable",
        description: "Dossier locataire, lecture de bail, signaux d’alarme.",
        icon: "shield",
        sources: [{ name: "SCHL", url: "https://www.cmhc-schl.gc.ca/fr/consommateurs" }],
      },
      {
        title: "Carrière locale",
        description: "CV canadien, entretiens, normes salariales officielles.",
        icon: "briefcase",
        sources: [{ name: "Guichet-Emplois", url: "https://www.guichetemplois.gc.ca" }],
      },
      {
        title: "Réseaux provinciaux",
        description: "Organismes francophones, ressources communautaires.",
        icon: "globe",
        sources: [{ name: "IRCC", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete.html" }],
      },
    ],
  },

  navLinks: [
    { label: "Services", href: "#services" },
    { label: "Étapes", href: "#etapes" },
    { label: "Budget", href: "#budget" },
    { label: "Guides", href: "/parcours/guide" },
    { label: "Sources & Fiabilité", href: "/sources" },
    { label: "Mentions / Avertissement", href: "/mentions" },
  ],

  checklist: {
    title: "Vos 5 premières étapes",
    subtitle: "1 clic = 1 page détaillée. Coche et avance à ton rythme.",
    shareLabel: "Partager ma progression",
    resetLabel: "Réinitialiser",
    shareSuccess: "Progression copiée, tu peux l’envoyer.",
    shareError: "Impossible de partager maintenant.",
    items: frSteps,
  },

  steps: buildStepsRecord(frSteps),

  survival48h: {
    title: "Plan 48h",
    subtitle: "Stabilise transport, logement temporaire et connectivité.",
    items: [
      {
        title: "Sortir de l’aéroport",
        description: "REM Montréal, UP Express Toronto et Canada Line Vancouver offrent des trajets sûrs et traçables.",
        href: "https://tc.canada.ca/fr/services-transports.html",
        sources: [{ name: "Transports Canada", url: "https://tc.canada.ca" }],
      },
      {
        title: "Se déplacer en ville",
        description: "Achète ta carte OPUS, PRESTO ou Compass dès l’arrivée pour bénéficier des tarifs locaux.",
        href: "https://www.canada.ca/fr.html",
        sources: [{ name: "Autorités locales", url: "https://www.canada.ca/fr.html" }],
      },
      {
        title: "Hébergement temporaire",
        description: "Priorise les résidences étudiantes ouvertes aux nouveaux arrivants ou les auberges listées par la ville.",
        href: "https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants.html",
        sources: [{ name: "IRCC", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete.html" }],
      },
      {
        title: "SIM canadienne",
        description: "Les kiosques Bell, Rogers et Telus à l’aéroport proposent des forfaits newcomers sans crédit.",
        href: "https://ised-isde.canada.ca/site/services-telecommunications/fr/services-sans-fil",
        sources: [{ name: "ISDE", url: "https://ised-isde.canada.ca" }],
      },
    ],
  },

  budget: {
    title: "Budget mensuel estimatif",
    subtitle: "Panier de survie = loyer + épicerie + transport x profil foyer.",
    note: "Les montants proviennent des villes ou agences officielles et sont mis à jour régulièrement.",
    cityLabel: "Choisir une ville",
    householdLabel: "Composition du foyer",
    totalLabel: "Panier estimé",
    breakdownLabels: { rent: "Loyer", groceries: "Épicerie", transport: "Transport" },
    households: [
      { id: "solo", label: "1 adulte", multiplier: 1 },
      { id: "couple", label: "Couple", multiplier: 1.35 },
      { id: "famille", label: "Famille (3+)", multiplier: 1.6 },
    ],
    cities: [
      {
        id: "montreal",
        label: "Montréal",
        rent: 1500,
        groceries: 420,
        transport: 94,
        cityMultiplier: 1,
        sources: [{ name: "SCHL", url: "https://www.cmhc-schl.gc.ca/fr/consommateurs" }],
      },
      {
        id: "toronto",
        label: "Toronto",
        rent: 2200,
        groceries: 520,
        transport: 156,
        cityMultiplier: 1.2,
        sources: [{ name: "Ville de Toronto", url: "https://www.toronto.ca" }],
      },
      {
        id: "calgary",
        label: "Calgary",
        rent: 1750,
        groceries: 450,
        transport: 112,
        cityMultiplier: 1.05,
        sources: [{ name: "Ville de Calgary", url: "https://www.calgary.ca" }],
      },
    ],
  },

  resourceSources: [
    {
      title: "Trouver une clinique francophone",
      description: "Liste des cliniques communautaires francophones par province.",
      href: "https://santefrancais.ca",
      sources: [{ name: "Réseau Santé en français", url: "https://santefrancais.ca" }],
    },
    {
      title: "Programmes d’intégration IRCC",
      description: "Ateliers gratuits pour CV, logement et droits.",
      href: "https://ircc.canada.ca/francais/services/immigration-canada/etablir.html",
      sources: [{ name: "IRCC", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete.html" }],
    },
    {
      title: "Protection du consommateur",
      description: "Guide anti-fraude pour les locations et achats.",
      href: "https://www.canada.ca/fr/agence-consommation-matiere-financiere.html",
      sources: [{ name: "ACFC", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere.html" }],
    },
  ],

  resources: {
    header: {
      title: "Ressources officielles et communautaires",
      subtitle: "Liens vérifiés, classés par besoin.",
      searchPlaceholder: "Rechercher une ressource (logement, santé, emploi...)",
      provinceLabel: "Province",
      categoryLabel: "Catégorie",
    },
    accompaniment: {
      shortDefinition: "Ce site propose de l’orientation pratique et de l’information générale pour les nouveaux arrivants.",
      noProxyLine: "Nous n’effectuons aucune démarche officielle à votre place.",
      footerHelp: "Besoin d’aide pour savoir quoi faire en premier ? Le service d’accompagnement peut t’orienter selon ta situation.",
    },
    quickGuides: {
      documentsCard: {
        title: "Documents pratiques d’installation",
        body: "Prépare tes papiers une fois pour éviter les blocages.",
        ctaLabel: "Voir la checklist d’installation",
        href: "/checklist",
      },
      transportCard: {
        title: "Transport et conduite",
        body: "Comprendre les règles locales avant de conduire.",
        ctaLabel: "Voir les ressources transport",
        href: "/ressources/guides/transport",
      },
      creditCard: {
        title: "Crédit et banque",
        body: "Évite les erreurs qui restent longtemps.",
        ctaLabel: "Voir le guide banque",
        href: "/parcours/guide/steps/bank",
      },
    },
    sections: {
      arrival: { title: "Arrivée", hint: "À consulter dès l’arrivée pour comprendre les étapes officielles." },
      housing: { title: "Logement", hint: "À consulter avant toute visite ou dépôt." },
      health: { title: "Santé", hint: "À faire dès l’arrivée, même si la carte n’est pas encore reçue." },
      jobs: { title: "Emploi", hint: "Utile pour chercher un emploi sans tomber dans les pièges." },
      documents: { title: "Documents pratiques d’installation", hint: "Pour préparer tes papiers utiles une fois, et gagner du temps." },
      transport: { title: "Transport", hint: "Pour comprendre conduite et transport selon ta province." },
      credit: { title: "Crédit", hint: "Utile dès le premier mois pour éviter des erreurs longues à corriger." },
      taxes: { title: "Impôts", hint: "Pour garder tes documents et éviter le stress des impôts." },
      integration: { title: "Intégration", hint: "Pour trouver de l’aide locale et des services fiables." },
    },
    ui: {
      recommendedStart: "⭐ Recommandé pour commencer",
      openResource: "Ouvrir la ressource",
      addFavorite: "Ajouter aux favoris",
      seeGuide: "Voir le guide associé →",
      backToPath: "Retourner au parcours →",
    },
  },

  resourcesPage: {
    labels: {
      eyebrow: "Ressources",
      title: "Ressources officielles et communautaires",
      subtitle: "Liens vérifiés, classés par besoin.",
      searchPlaceholder: "Rechercher (logement, santé, emploi...)",
      provinceLabel: "Province",
      categoryLabel: "Catégorie",
      filterAll: "Toutes",
      officialLabel: "Officiel",
      recommendedLabel: "Recommandé",
      openLabel: "Ouvrir la ressource",
      addFavoriteLabel: "Ajouter aux favoris",
      removeFavoriteLabel: "Retirer des favoris",
      emptyState: "Aucune ressource ne correspond à cette recherche.",
      allProvincesLabel: "Canada",
      guideCalloutTitle: "Le mot d’ordre",
      guideWhatTitle: "Ce que c’est",
      guideWhyTitle: "Pourquoi c’est important",
      guideHowTitle: "Comment faire",
      guidePitfallsTitle: "Pièges à éviter",
      guideActionsTitle: "Actions directes",
      guideSourcesTitle: "Sources officielles",
      guideActionPrompt: "Prêt à passer à l’action ?",
      guideEyebrow: "Guide",
    },
    provinceOptions: [
      { value: "qc", label: "Québec" },
      { value: "on", label: "Ontario" },
      { value: "bc", label: "Colombie-Britannique" },
      { value: "ab", label: "Alberta" },
      { value: "other", label: "Autre province" },
    ],
    categories: [
      { id: "arrival", title: "Arrivée", description: "Profil général, étapes pratiques et installation." },
      { id: "housing", title: "Logement", description: "Bail, dépôt, règles locales." },
      { id: "health", title: "Santé", description: "Carte santé, couverture, cliniques." },
      { id: "employment", title: "Emploi", description: "Offres, droits, normes." },
      { id: "documents", title: "Documents pratiques d’installation", description: "Papiers utiles et copies." },
      { id: "transport", title: "Transport", description: "Conduite et cartes de transport." },
      { id: "credit", title: "Crédit", description: "Score et bonnes pratiques." },
      { id: "taxes", title: "Impôts", description: "Déclaration annuelle et documents." },
      { id: "integration", title: "Intégration", description: "Services locaux et réseaux." },
    ],
    items: {
      "arrival-services": { title: "Services pour nouveaux arrivants", description: "Infos d’accueil et services officiels." },
      ircc: { title: "IRCC - site officiel", description: "Portail officiel Canada.ca." },
      cmhc: { title: "SCHL - logement", description: "Conseils et informations logement." },
      "tal-qc": { title: "Tribunal administratif du logement (QC)", description: "Règles et droits locatifs au Québec." },
      "health-card": { title: "Carte d’assurance maladie", description: "Processus officiel + liens provinciaux." },
      ramq: { title: "RAMQ (Québec)", description: "Couverture santé du Québec." },
      ohip: { title: "OHIP (Ontario)", description: "Couverture santé de l’Ontario." },
      msp: { title: "MSP (Colombie-Britannique)", description: "Couverture santé de la C.-B." },
      ahcip: { title: "AHCIP (Alberta)", description: "Couverture santé de l’Alberta." },
      jobbank: { title: "Guichet-Emplois", description: "Offres d’emploi officielles." },
      "labour-standards": { title: "Normes du travail", description: "Droits et protections officielles." },
      "documents-guide": { title: "Guide d’installation", description: "Checklist de documents pratiques d’installation." },
      "transport-guide": { title: "Guide Transport", description: "Conduite + étapes par province." },
      "credit-guide": { title: "Guide Crédit", description: "Score et démarrage propre." },
      driving: { title: "Conduite au Canada", description: "Informations officielles Canada." },
      saaq: { title: "SAAQ (Québec)", description: "Conduite et véhicules au Québec." },
      "service-ontario-driving": { title: "ServiceOntario - conduite", description: "Conduite et routes en Ontario." },
      icbc: { title: "ICBC (C.-B.)", description: "Conduite et assurances en C.-B." },
      "alberta-registries": { title: "Alberta registries", description: "Conduite et services en Alberta." },
      "credit-score": { title: "Score de crédit (ACFC)", description: "Comprendre et améliorer ton score." },
      taxes: { title: "Impôts (ARC)", description: "Déclaration annuelle et documents." },
      integration: { title: "211 Canada", description: "Aide locale rapide." },
    },
    guides: {
      documents: {
        title: "Documents pratiques d’installation",
        summary: "Prépare tes papiers une fois, gagne du temps à chaque étape.",
        callout: "Une copie claire vaut une heure de stress en moins.",
        what: "Les documents pratiques d’installation servent aux étapes courantes (emploi, santé, logement).",
        why: ["Éviter les blocages administratifs", "Gagner du temps", "Protéger tes originaux"],
        how: ["Scanner tes pièces utiles pour l’installation", "Créer un dossier numérique", "Imprimer des copies clés", "Stocker une copie hors ligne"],
        pitfalls: ["Partager tes documents pratiques d’installation sans vérification", "Perdre les originaux", "Ne pas sauvegarder les copies"],
        actions: ["Préparer une checklist personnelle", "Créer un dossier cloud sécurisé"],
        ctaLabel: "Checklist de documents pratiques d’installation",
        ctaHref: "/checklist",
        sources: [{ name: "IRCC", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete.html" }],
      },
      transport: {
        title: "Transport et conduite",
        summary: "Comprendre les démarches selon ta province.",
        callout: "Des règles de conduite claires = liberté + sécurité.",
        what: "Les règles de conduite et les cartes de transport varient selon la province.",
        why: ["Éviter les amendes", "Se déplacer facilement", "Assurance valide"],
        how: ["Vérifier les règles provinciales", "Préparer les papiers utiles", "Réserver les tests si requis"],
        pitfalls: ["Conduire sans autorisation valide", "Ignorer les délais provinciaux"],
        actions: ["Choisir un mode de transport temporaire", "Planifier un rendez-vous"],
        ctaLabel: "Voir les étapes de conduite (selon province)",
        ctaHref: "https://www.canada.ca/fr/services/transport/conduire.html",
        sources: [{ name: "Canada.ca", url: "https://www.canada.ca/fr/services/transport.html" }],
      },
      credit: {
        title: "Crédit et score",
        summary: "Démarrer proprement et éviter les erreurs.",
        callout: "Petit départ, gros impact sur le long terme.",
        what: "Le score de crédit impacte logement, prêts et services.",
        why: ["Négocier de meilleurs taux", "Faciliter la location", "Construire une réputation financière"],
        how: ["Demander une carte adaptée", "Payer à temps", "Limiter l’utilisation"],
        pitfalls: ["Retards de paiement", "Utilisation trop élevée"],
        actions: ["Suivre ton score régulièrement", "Garder un historique propre"],
        ctaLabel: "Comprendre le score + démarrer proprement",
        ctaHref: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/credit.html",
        sources: [{ name: "ACFC", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere.html" }],
      },
    },
  },

  // ✅ Cohérent avec StepId
  guideOrder: ["nas", "health", "bank", "phone", "housing"],

  guides: {
    nas: {
      slug: "nas",
      title: "NAS (Service Canada)",
      icon: "IdCard",
      urgency: 9,
      sections: {
        description: {
          text: "Le NAS est le numéro d’assurance sociale qui te permet de travailler légalement et d’accéder aux programmes fédéraux.",
          sources: [{ name: "Service Canada", url: "https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html" }],
        },
        why: {
          text: "Sans NAS, ton employeur ne peut pas te verser de salaire ni déclarer tes retenues, et certains crédits d’impôt seront bloqués.",
          sources: [{ name: "Agence du revenu du Canada", url: "https://www.canada.ca/fr/agence-revenu.html" }],
        },
        documents: {
          items: ["Passeport en cours de validité", "Permis d’études ou de travail", "Preuve d’adresse canadienne (bail, facture, lettre d’accueil)"],
          sources: [{ name: "Service Canada – Documents acceptés", url: "https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale/documents.html" }],
        },
        where: {
          text: "Présente-toi dans un Centre Service Canada ou utilise la procédure en ligne officielle si tu es admissible.",
          sources: [{ name: "Trouver un Centre Service Canada", url: "https://catalogue.servicecanada.gc.ca/services/centre-service-canada" }],
        },
        cost: {
          text: "Gratuit – aucune entreprise n’est autorisée à te facturer l’obtention du NAS.",
          sources: [{ name: "Service Canada – FAQ NAS", url: "https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale/questions.html" }],
        },
        proTip: {
          text: "Scanne ta lettre NAS, garde-la hors ligne et ne partage jamais ton numéro par SMS ou messagerie.",
          sources: [{ name: "Service Canada – Protection du NAS", url: "https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale/proteger.html" }],
        },
        fraudAlert: {
          text: "Aucun agent ne te demandera ton NAS par téléphone pour « déverrouiller » un dossier. Raccroche et contacte Service Canada directement.",
          sources: [{ name: "GRC – Fraude", url: "https://www.grc-rcmp.gc.ca/fr/escroqueries-locatives" }],
        },
      },
    },

    health: {
      slug: "health",
      title: "Carte santé provinciale",
      icon: "HeartPulse",
      urgency: 8,
      sections: {
        description: {
          text: "Chaque province délivre sa carte d’assurance maladie (RAMQ, OHIP, MSP, etc.) qui couvre les soins essentiels.",
          sources: [{ name: "IRCC – Soins de santé", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/apprendre-canada/soins-sante/systeme-soins-sante.html" }],
        },
        why: {
          text: "Certaines provinces imposent une période d’attente; sans carte, une simple visite peut coûter très cher.",
          sources: [{ name: "Gouvernement du Québec – RAMQ", url: "https://www.quebec.ca/sante/assurance-maladie" }],
        },
        documents: {
          items: ["Pièce d’identité et preuve utile pour ton installation", "Preuve de résidence (bail, facture d’énergie)", "Formulaire provincial rempli"],
          sources: [{ name: "Ontario – OHIP", url: "https://www.ontario.ca/fr/page/obtenir-une-carte-sante" }],
        },
        where: {
          text: "Fais ta demande auprès de l’organisme provincial (RAMQ, ServiceOntario, Service BC) ou en ligne si offert.",
          sources: [{ name: "ServiceOntario", url: "https://www.ontario.ca/page/serviceontario" }],
        },
        cost: {
          text: "Gratuit : la carte est gratuite, mais une assurance privée temporaire peut être utile durant l’attente.",
          sources: [{ name: "Gouvernement de la C.-B. – MSP", url: "https://www2.gov.bc.ca/gov/content/sante/assurance-sante-medicale" }],
        },
        proTip: {
          text: "Souscris à une assurance temporaire (voyage/étudiant) jusqu’à l’activation de ta couverture provinciale.",
          sources: [{ name: "IRCC – Assurance privée", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/soins-sante/assurance-maladie.html" }],
        },
        fraudAlert: {
          text: "Les formulaires sont gratuits : évite les sites qui facturent des « frais de traitement ».",
          sources: [{ name: "Consumer Protection Ontario", url: "https://www.ontario.ca/fr/page/consumer-protection-ontario" }],
        },
      },
    },

    bank: {
      slug: "bank",
      title: "Compte bancaire",
      icon: "Wallet",
      urgency: 7,
      sections: {
        description: {
          text: "Les banques canadiennes offrent des forfaits « nouveaux arrivants » pour gérer ton argent dès le départ.",
          sources: [{ name: "ACFC – Offres newcomers", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/comptes-bancaires/offres-bancaires-nouveaux-arrivants.html" }],
        },
        why: {
          text: "Un compte local facilite les dépôts de salaire, les paiements traçables pour le logement et la construction du crédit.",
          sources: [{ name: "ACFC – Crédit", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/credit.html" }],
        },
        documents: {
          items: ["Pièce d’identité et preuve utile pour ton installation", "Preuve d’adresse canadienne", "NAS (facultatif mais souvent demandé)"],
          sources: [{ name: "ACFC – Ouvrir un compte", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/comptes-bancaires/ouvrir-compte-bancaire.html" }],
        },
        where: {
          text: "Prends rendez-vous en succursale (ou en ligne) avec une banque/cooperative reconnue.",
          sources: [{ name: "ACFC – Liste des banques", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/banques/liste.html" }],
        },
        cost: {
          text: "Souvent : frais mensuels gratuits pendant 12 mois avec les programmes newcomers, puis tarifs standards.",
          sources: [{ name: "ACFC – Offres newcomers", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/comptes-bancaires/offres-bancaires-nouveaux-arrivants.html" }],
        },
        proTip: {
          text: "Demande une carte de crédit garantie pour démarrer ton historique avec un risque maîtrisé.",
          sources: [{ name: "ACFC – Cartes garanties", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/cartes-credit/garanties.html" }],
        },
        fraudAlert: {
          text: "Ne paie jamais pour « réserver » un rendez-vous bancaire et refuse tout transfert vers un compte personnel.",
          sources: [{ name: "ACFC – Prévenir la fraude", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/protection-fraude.html" }],
        },
      },
    },

    phone: {
      slug: "phone",
      title: "Téléphone et données",
      icon: "PhoneCall",
      urgency: 6,
      sections: {
        description: {
          text: "Un numéro canadien facilite les vérifications d’identité (banques, services en ligne) et la sécurisation des comptes.",
          sources: [{ name: "ISDE – Services sans fil", url: "https://ised-isde.canada.ca/site/services-telecommunications/fr/services-sans-fil" }],
        },
        why: {
          text: "Beaucoup de services utilisent des SMS de vérification pour sécuriser l’accès à ton compte.",
          sources: [{ name: "CRTC – Code sur les services sans fil", url: "https://crtc.gc.ca/fra/phone/mobile/wirelesscode.htm" }],
        },
        documents: {
          items: ["Passeport ou pièce d’identité avec photo", "Coordonnées locales (adresse et email)", "Optionnel : solvabilité pour forfaits postpayés"],
          sources: [{ name: "CRTC – Code sans fil", url: "https://crtc.gc.ca/fra/phone/mobile/wirelesscode.htm" }],
        },
        where: {
          text: "Achète une SIM/eSIM via un kiosque officiel (aéroport, boutique) ou directement chez un opérateur reconnu.",
          sources: [{ name: "CRTC – Fournisseurs", url: "https://crtc.gc.ca/fra/phone/mobile/tel.htm" }],
        },
        cost: {
          text: "Les forfaits prépayés varient selon la province et les promos; BYOD est souvent le meilleur départ.",
          sources: [{ name: "ISDE – Comparateur", url: "https://www.ic.gc.ca/eic/site/086.nsf/fra/00006.html" }],
        },
        proTip: {
          text: "Privilégie le BYOD (apporte ton appareil) pour éviter un engagement long avant d’avoir un historique de crédit.",
          sources: [{ name: "CRTC – Code sans fil", url: "https://crtc.gc.ca/fra/phone/mobile/wirelesscode.htm" }],
        },
        fraudAlert: {
          text: "Méfie-toi des revendeurs non autorisés, des dépôts cash et des promesses « trop belles ». Exige un reçu officiel.",
          sources: [{ name: "ISDE – Conseils anti-fraude", url: "https://ised-isde.canada.ca/site/mesures-consommateurs/fr/protection-consommateur/fraude" }],
        },
      },
    },

    housing: {
      slug: "housing",
      title: "Logement locatif",
      icon: "Home",
      urgency: 8,
      sections: {
        description: {
          text: "La location passe par un bail écrit conforme aux règles provinciales et un dossier locataire crédible.",
          sources: [{ name: "IRCC – Se loger", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/vie-canada/logement.html" }],
        },
        why: {
          text: "Un bail officiel protège ton dépôt, clarifie les règles et diminue les risques d’abus.",
          sources: [{ name: "SCHL – Droits des locataires", url: "https://www.cmhc-schl.gc.ca/fr/consommateurs" }],
        },
        documents: {
          items: ["Lettre d’emploi ou preuves de revenus", "Références locatives ou professionnelles", "Relevés bancaires ou preuve d’épargne"],
          sources: [{ name: "SCHL – Préparer son dossier", url: "https://www.cmhc-schl.gc.ca/fr/consommateurs/guide-location" }],
        },
        where: {
          text: "Visite le logement (physique/vidéo) et vérifie l’identité du bailleur via des sources fiables.",
          sources: [{ name: "Tribunal administratif du logement (QC)", url: "https://www.tal.gouv.qc.ca" }],
        },
        cost: {
          text: "Le dépôt légal varie selon la province. N’accepte pas des demandes au-delà de ce qui est permis.",
          sources: [{ name: "Ontario – Dépôts", url: "https://www.ontario.ca/fr/page/loyer-depot" }],
        },
        proTip: {
          text: "Paie par moyens traçables (virement/chèque) et envoie un récapitulatif par email après chaque visite.",
          sources: [{ name: "ACFC – Paiements traçables", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/transferts-electroniques.html" }],
        },
        fraudAlert: {
          text: "Pas de bail signé = pas d’argent. Méfie-toi des annonces qui refusent les visites.",
          sources: [{ name: "GRC – Fraude locative", url: "https://www.grc-rcmp.gc.ca/fr/escroqueries-locatives" }],
        },
      },
    },
  },

  globalDisclaimer: "Information et orientation uniquement. Vérifie toujours les conditions sur les sites officiels avant de te déplacer.",

  antiFraud: {
    title: "Intégrité et anti-fraude",
    body: "Nous n’accélérons aucune démarche officielle, ne fabriquons aucun document pratique d’installation et nous renvoyons systématiquement vers les sites gouvernementaux.",
    note: "Signale tout comportement suspect à l’ASFC ou à IRCC (lien officiel dans chaque étape).",
  },

  // (je garde ton bloc scams tel quel pour ne pas te casser le reste)
  scams: {
    microcopy: {
      searchPlaceholder: "Rechercher une arnaque (logement, emploi...)",
      frequentTitle: "Arnaques fréquentes",
      startHousingTitle: "Commencer par le logement",
      startHousingText: "Si on te demande de payer avant une visite, arrête tout : c'est un signal d'arnaque très fréquent.",
      startHousingSubtext: "Exemples, signaux d'alerte et quoi faire.",
      startHousingCta: "Voir les arnaques logement →",
      startHousingCtaAria: "Voir les arnaques liées au logement",
      breadcrumb: { home: "Accueil", scams: "Arnaques" },
      backToScams: "Retour aux arnaques",
      goToJourney: "Aller au parcours",
      notFound: "Guide introuvable. Retourne aux catégories d'arnaques pour choisir un guide valide.",
      needMoreTitle: "Besoin d’aller plus loin ?",
      needMoreText: "Consulte le guide logement pour comprendre les étapes et éviter les erreurs.",
      needMoreCta: "Voir le guide logement →",
      housingLabel: "Logement",
      pageEyebrow: "Arnaques",
      pageTitle: "Arnaques fréquentes : comment les repérer en 2 minutes",
      pageSubtitle: "Tu n'es pas seul. Le but : comprendre, éviter, agir.",
      rulesTitle: "Règles d'or",
      planTitle: "Plan d'action en 5 étapes",
      planSubtitle: "Simple, rapide, sans panique.",
      categoriesTitle: "Catégories d'arnaques",
      planLinkLabel: "Plan d'action en 5 étapes",
      victimTitle: "Je pense être victime : quoi faire ?",
      victimSubtitle: "Plan d'action en 5 étapes, sans panique.",
      victimPlanSteps: [
        "Ne panique pas et arrête tout paiement immédiatement.",
        "Garde toutes les preuves (screenshots, emails, conversations, reçus).",
        "Contacte ta banque ou ton institution financière pour bloquer les transactions.",
        "Signale l'arnaque à la police (rapport de police) et à l'organisme approprié (ex: CAFC pour fraude financière).",
        "Consulte les ressources officielles pour comprendre tes options légales et protéger ton identité.",
      ],
    },
    housing: {
      rules: ["Ne paie jamais avant une visite.", "Refuse les transferts anonymes (crypto, cartes cadeaux).", "Vérifie le propriétaire et l’adresse."],
      planSteps: ["Demande une visite réelle.", "Vérifie l’annonce (photos, adresse, prix).", "Signe un bail officiel seulement après visite."],
    },
    guides: {
      logement: {
        subtitle: "Arnaques courantes liées à la location.",
        scenario: [
          "Annonce trop belle pour être vraie (prix bas, photos parfaites).",
          "Le propriétaire est à l étranger et ne peut pas faire visiter.",
          "Demande de virement d'argent avant toute visite ou signature de bail.",
          "Pression pour décider rapidement et payer immédiatement.",
        ],
        redFlags: [
          'Demande de dépôt de sécurité élevé ou "frais de dossier" non remboursables.',
          "Communication uniquement par email ou messagerie instantanée, jamais par téléphone.",
          "Refus de fournir une adresse physique ou de faire visiter le logement.",
          "Contrat de location avec des clauses inhabituelles ou abusives.",
        ],
        actions: [
          "Exiger une visite physique du logement.",
          "Vérifier l identité du propriétaire et la légalité de l annonce.",
          "Ne jamais virer d'argent avant la signature d'un bail légal et la remise des clés.",
          "Utiliser des moyens de paiement traçables (chèque, virement bancaire).",
        ],
        neverDo: [
          "Payer avant visite et bail signe",
          "Envoyer des documents pratiques d’installation sensibles sans vérification",
          "Accepter un contrat sans adresse claire",
        ],
        mantra: "Pas de visite = pas d'argent.",
        sources: [
          { label: "SCHL - logement", href: "https://www.cmhc-schl.gc.ca/" },
          { label: "Canada.ca - fraude", href: "https://www.antifraudcentre-centreantifraude.ca/" },
        ],
      },
      emploi: {
        subtitle: "Arnaques liées aux offres d'emploi et au recrutement.",
        scenario: [
          "Offre d'emploi non sollicitée avec un salaire irréaliste.",
          "Demande de paiement pour du matériel, une formation, ou un contrôle de casier judiciaire.",
          "Entretien d embauche par messagerie instantanée sans contact vocal ou vidéo.",
          "Pression pour fournir des informations personnelles (NAS, compte bancaire) trop tôt.",
        ],
        redFlags: [
          "Fautes d'orthographe et de grammaire dans l'offre d'emploi.",
          "Adresse email générique (Gmail, Outlook) pour le recruteur.",
          "Processus de recrutement anormalement rapide et sans vérification.",
          "Demande de racheter du matériel avec remboursement promis.",
        ],
        actions: [
          "Rechercher l entreprise et le recruteur sur LinkedIn ou leur site officiel.",
          "Ne jamais payer pour un emploi ou des \"frais de dossier\".",
          "Ne jamais fournir de NAS ou de coordonnées bancaires avant un contrat signé.",
          "Utiliser le Guichet-Emplois officiel pour vérifier la légitimité des offres.",
        ],
        neverDo: ["Payer pour travailler", "Donner ton NAS avant contrat signe", "Envoyer tes originaux"],
        mantra: "Un vrai emploi ne demande jamais de frais.",
        sources: [
          { label: "Guichet-Emplois", href: "https://www.guichetemplois.gc.ca/" },
          { label: "Centre antifraude", href: "https://www.antifraudcentre-centreantifraude.ca/" },
        ],
      },
      telephone: {
        subtitle: "Arnaques liées aux forfaits mobiles et aux services téléphoniques.",
        scenario: [
          "Appels non sollicités promettant des rabais incroyables sur les forfaits.",
          "Pression pour changer de fournisseur ou souscrire à des options non désirées.",
          "Facturation surprise avec des frais cachés ou des services non autorisés.",
          "Vol de données personnelles sous prétexte de \"vérification de compte\".",
        ],
        redFlags: [
          "Offres trop belles pour être vraies, \"seulement aujourd hui\".",
          "Demande d informations personnelles (mot de passe, NAS) par téléphone.",
          "Représentant agressif ou refusant de fournir des informations claires.",
          "Difficulté à annuler un service ou à obtenir un remboursement.",
        ],
        actions: ["Ne jamais partager d informations sensibles par téléphone.", "Vérifier les offres sur les sites officiels.", "Lire attentivement les contrats.", "Contacter le CRTC ou l opérateur en cas de litige."],
        neverDo: ["Signer sans lire", "Accepter un engagement long sans besoin", "Perdre les preuves"],
        mantra: "Lis tout, surtout les frais.",
        sources: [{ label: "CRTC - services mobiles", href: "https://crtc.gc.ca/fra/phone/mobile.htm" }],
      },
      banque: {
        subtitle: "Arnaques financières et bancaires.",
        scenario: [
          "Appels ou emails se faisant passer pour votre banque demandant des informations confidentielles.",
          "Pression pour effectuer un virement urgent pour \"sécuriser\" votre compte.",
          "Offres de prêts ou cartes de crédit sans vérification de crédit (trop facile).",
          "Phishing : faux sites web bancaires pour voler vos identifiants.",
        ],
        redFlags: ["Demande de votre NIP, mot de passe ou codes de vérification.", "Urgence extrême, menaces.", "Liens suspects dans les emails ou SMS.", "Fautes d'orthographe."],
        actions: ["Ne jamais cliquer sur des liens suspects.", "Contacter ta banque via le numéro officiel.", "Vérifier l URL (https, cadenas).", "Signaler les tentatives de fraude."],
        neverDo: ["Donner ton PIN", "Envoyer des codes de vérification", "Transférer de l'argent en urgence"],
        mantra: "Ta banque ne demande jamais ton PIN.",
        sources: [
          {
            label: "ACFC - securite bancaire",
            href: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/securite.html",
          },
        ],
      },
      immigration: {
        subtitle: "Arnaques liées aux promesses garanties et aux faux représentants.",
        scenario: [
          "Promesses garanties pour des démarches réglementées, sans conditions.",
          "Demande de paiement élevé pour des services gratuits.",
          "Faux agents vous contactant par email ou téléphone.",
          "Demande de documents originaux ou d'argent en espèces.",
        ],
        redFlags: ["Frais cachés.", "Pression pour agir vite.", "Paiements non officiels (crypto, cartes cadeaux).", "Absence de licence."],
        actions: ["Vérifier la légitimité sur les sites officiels.", "Ne jamais payer pour des services gratuits.", "Ne jamais envoyer des originaux.", "Conserver toutes les preuves."],
        neverDo: ["Payer en crypto", "Donner tes documents sans vérification", "Croire aux garanties"],
        mantra: "Personne ne peut garantir un résultat officiel.",
        sources: [
          {
            label: "IRCC - site officiel",
            href: "https://www.canada.ca/fr/immigration-refugies-citoyennete.html",
          },
          { label: "Centre antifraude", href: "https://www.antifraudcentre-centreantifraude.ca/" },
        ],
      },
      marketplace: {
        subtitle: "Arnaques lors d achats ou ventes sur les plateformes en ligne.",
        scenario: [
          "Vendeur demandant un paiement anticipé via une méthode non sécurisée.",
          "Acheteur proposant de payer plus et demandant un remboursement.",
          "Pression pour finaliser hors plateforme.",
          "Produit non conforme après paiement.",
        ],
        redFlags: ["Profil récent.", "Refus de rencontre.", "Demande de codes.", "Messages génériques."],
        actions: ["Remise en main propre.", "Paiements sécurisés si possible.", "Se méfier des offres trop alléchantes.", "Signaler les profils."],
        neverDo: ["Envoyer un acompte", "Rencontrer seul dans un lieu isolé", "Partager tes infos bancaires"],
        mantra: "Pas de rencontre = pas d achat.",
        sources: [
          { label: "Centre antifraude", href: "https://www.antifraudcentre-centreantifraude.ca/" },
          { label: "Conseils de sécurité (Kijiji)", href: "https://help.kijiji.ca/helpdesk/safety" },
        ],
      },
    },
  },

  guidePage: {
    subtitle: "5 démarches classées par urgence pour te guider même quand la charge mentale est élevée.",
    ctaLabel: "Commencer par le NAS",
    infoPill: "5 étapes prioritaires",
    priorityLegend: "Priorité affichée : 10 = immédiat, 1 = à planifier bientôt.",
    timelineTitle: "Parcours express",
    timelineSubtitle: "Comprends l’ordre d’exécution sans lire toutes les fiches en détail.",
    groups: [
      { title: "Statut & santé", description: "Sécurise ton droit de travailler et ta couverture médicale avant le reste.", slugs: ["nas", "health"] },
      // ✅ cohérent avec guideOrder : bank -> phone -> housing (ou change l’ordre si tu veux)
      { title: "Installation quotidienne", description: "Prépare tes finances, ton téléphone et ton logement.", slugs: ["bank", "phone", "housing"] },
    ],
  },

  newsletter: {
    title: "Rejoins la communauté",
    description: "Un email par mois avec rappels officiels et alertes anti-arnaques.",
    placeholder: "ton.email@email.com",
    cta: "Je m’inscris",
    successTitle: "Bienvenue !",
    successBody: "Tu recevras nos ressources officielles très bientôt.",
    error: "Impossible pour l’instant. Réessaie plus tard.",
  },

  floatingCta: { label: "Besoin d’aide ?", href: "mailto:contact@marhabancanada.ca" },

  footer: {
    disclaimer: "Marhaban Canada offre de l’orientation pratique et de l’information générale. Nous ne fournissons pas de conseils juridiques ni de conseils en immigration. Pour les questions liées aux visas, permis, résidence permanente, admissibilité ou stratégie d’immigration, veuillez consulter un représentant autorisé.",
    rights: "Tous droits réservés.",
    mission: "Orientation pratique pour nouveaux arrivants au Canada.",
    quickGuidesTitle: "Guides rapides",
    sources: "Sources",
    copyright: `© ${new Date().getFullYear()} Marhaban Canada. Tous droits réservés.`,
  },

  howToUsePage: {
    title: "Comment utiliser ce site",
    whatThisSiteDoes: {
      title: "Ce que ce site fait",
      items: [
        "Fournit des informations fiables et vérifiées pour t'aider à t'installer au Canada.",
        "Propose une checklist interactive pour suivre tes démarches.",
        "Explique les étapes complexes avec un langage simple.",
        "Partage des sources officielles pour chaque information.",
        "Met en avant les erreurs courantes à éviter.",
      ],
    },
    whatThisSiteDoesNotDo: {
      title: "Ce que ce site ne fait PAS",
      items: [
        "Ne remplace PAS les conseils juridiques, les conseils en immigration ou un représentant autorisé.",
        "Ne collecte AUCUNE donnée personnelle (ta progression est sauvegardée localement sur ton appareil).",
        "Ne garantit PAS l'obtention de documents ou de services (chaque cas est unique).",
        "Ne fournit PAS de conseils juridiques ou financiers personnalisés.",
        "Ne t'aide PAS à remplir des formulaires ou à prendre des rendez-vous.",
      ],
    },
    howToUseItStepByStep: {
      title: "Comment l'utiliser étape par étape",
      items: [
        "Commence par la checklist pour avoir une vue d'ensemble.",
        "Clique sur chaque étape pour accéder au guide détaillé.",
        "Coche les étapes que tu as complétées pour suivre ta progression.",
        "Utilise les liens 'Sources officielles' pour vérifier les informations.",
        "Active le 'Mode Lecture facile' si tu préfères un texte plus aéré.",
        "N'hésite pas à consulter la section 'Arnaques' pour éviter les pièges.",
      ],
    },
  },

  shared: {
    sourceLabel: "Source",
    officialLink: "Lien officiel",
    budgetLegend: "Loyer + transport + épicerie x coefficient foyer.",
    disclaimer: "Marhaban Canada offre de l’orientation pratique et de l’information générale. Nous ne fournissons pas de conseils juridiques ni de conseils en immigration. Pour les questions liées aux visas, permis, résidence permanente, admissibilité ou stratégie d’immigration, veuillez consulter un représentant autorisé.",
    radarTitle: "Radar anti-arnaque",
    radarBody: "Vérifie toujours les expéditeurs, refuse les paiements en cartes cadeaux et garde des copies numériques de tes preuves.",
    sourcesIntro: "Chaque recommandation s'appuie sur un site gouvernemental ou parapublic vérifiable.",
    viewAllSteps: "Voir toutes les étapes",
    sectionLabels: {
      what: "Qu'est-ce que c'est ?",
      why: "Pourquoi c'est important ?",
      how: "Comment faire",
      avoid: "À éviter",
      sources: "Sources officielles",
      docs: "Documents nécessaires",
      smartTips: "Bon à savoir",
    },
    easyReadOn: "Mode Lecture facile",
    easyReadOff: "Mode Normal",
    ctas: {
      start: "Commencer",
      startJourney: "Commencer le parcours",
      viewChecklist: "Voir la checklist",
      viewJourney: "Voir le parcours",
      viewGuides: "Voir les guides",
      viewGuide: "Voir le guide",
      findOffice: "Trouver un bureau",
      backToHome: "Retour à l'accueil",
      continue: "Continuer",
      next: "Suivant",
      previous: "Précédent",
      download: "Télécharger",
      share: "Partager",
      reset: "Réinitialiser",
      search: "Rechercher",
      filter: "Filtrer",
      all: "Toutes",
    },
    commonPhrases: {
      whyItMatters: "Pourquoi c'est important",
      whatYouNeed: "Ce dont tu as besoin",
      stepByStep: "Étape par étape",
      importantNote: "Note importante",
      warning: "Attention",
      tip: "Astuce",
      remember: "Rappelle-toi",
      avoid: "À éviter",
      sources: "Sources",
      official: "Officiel",
      recommended: "Recommandé",
      urgent: "Urgent",
      optional: "Optionnel",
    },
    scamLabels: {
      scenario: "Le scénario",
      redFlags: "Signaux d'alarme",
      actions: "Actions à prendre",
      neverDo: "Ne jamais faire",
      mantra: "Le mantra",
      victimPlan: "Plan d'action si tu es victime",
    },
    nav: {
      home: "Accueil",
      checklist: "Checklist",
      parcours: "Parcours",
      ressources: "Ressources",
      arnaques: "Arnaques",
      about: "À propos",
      contact: "Contact",
      legal: "Mentions légales",
      plus: "Plus",
      switchToFr: "FR",
      switchToEn: "EN",
      switchToAr: "AR",
    },
  },

  contactPage: {
    title: "Contact",
    question: "Vous avez une question ou une suggestion ?",
    writeToUs: "Écrivez-nous à",
    privacy: "Aucune donnée personnelle n'est collectée via ce formulaire.",
    responseTime: "Nous répondons dans les meilleurs délais.",
    disclaimer:
      "Service d'information et d'accompagnement. Ne remplace pas les services gouvernementaux. Les démarches officielles doivent toujours être validées sur les sites gouvernementaux.",
    intro: "Nous sommes là pour t'aider. Pose ta question et nous te répondrons rapidement.",
    safetyNote: "Ne partage jamais ton NAS, tes mots de passe ou tes informations bancaires par email.",
    formName: "Nom",
    formEmail: "Email",
    formMessage: "Message",
    formTopic: "Sujet",
    formTopicOptions: [
      { value: "general", label: "Question générale" },
      { value: "checklist", label: "Checklist" },
      { value: "scams", label: "Arnaques" },
      { value: "technical", label: "Problème technique" },
      { value: "other", label: "Autre" },
    ],
    formSubmit: "Envoyer le message",
    formSuccess: "Message envoyé avec succès. Nous te répondrons bientôt.",
    formError: "Une erreur est survenue. Réessaie plus tard.",
    secondaryLinks: {
      legal: "Mentions légales",
      scams: "Arnaques",
      checklist: "Checklist",
    },
  },

  aboutPage: {
    title: "À propos de Marhaban Canada",
    intro: "Un service d'accompagnement et d'orientation pour simplifier ton installation au Canada.",
    mission: {
      title: "Notre mission",
      content: "Marhaban Canada — Orientation pratique pour nouveaux arrivants au Canada. Nous simplifions l'installation en fournissant des informations claires, basées sur des sources officielles.",
    },
    whatWeDo: {
      title: "Ce que la plateforme fait",
      items: [
        "Fournit des informations fiables et vérifiées pour t'aider à t'installer au Canada.",
        "Propose une checklist interactive pour suivre tes démarches.",
        "Explique les étapes complexes avec un langage simple.",
        "Partage des sources officielles pour chaque information.",
        "Met en avant les erreurs courantes à éviter.",
      ],
    },
    whatWeDontDo: {
      title: "Ce que la plateforme ne fait pas",
      items: [
        "Ne remplace pas les services d'un représentant autorisé.",
        "Ne collecte aucune donnée personnelle (ta progression est sauvegardée localement sur ton appareil).",
        "Ne garantit pas l'obtention de documents ou de services (chaque cas est unique).",
        "Ne fournit pas de conseils juridiques ou financiers personnalisés.",
        "Ne t'aide pas à remplir des formulaires ou à prendre des rendez-vous.",
      ],
    },
    sources: {
      title: "Comment on choisit les sources",
      intro: "Nous sélectionnons uniquement des sources officielles et vérifiables. Voici quelques exemples :",
      examples: [
        "Service Canada (NAS, services pratiques, etc.)",
        "IRCC (Immigration, Réfugiés et Citoyenneté Canada)",
        "RAMQ, OHIP, MSP (cartes santé provinciales)",
        "ACFC (Agence de la consommation en matière financière du Canada)",
        "Sites gouvernementaux provinciaux et municipaux",
      ],
    },
    cta: {
      label: "Commencer la checklist",
      href: "/checklist",
    },
  },

  legalPage: {
    title: "Mentions légales",
    editor: {
      title: "Éditeur du site",
      content: "Marhaban Canada est un service d'information et d'accompagnement indépendant, non gouvernemental. Ce site est édité par Marhaban Canada.",
    },
    usage: {
      title: "Utilisation de l'information",
      content: "Les informations présentes sur ce site sont fournies à titre informatif uniquement. Elles ne constituent pas des conseils juridiques, financiers ou professionnels. Toujours vérifier les informations sur les sites officiels gouvernementaux.",
    },
    responsibilities: {
      title: "Responsabilités et limites",
      content: "Marhaban Canada ne peut être tenu responsable des décisions prises sur la base des informations fournies. Chaque situation est unique et nécessite une vérification auprès des autorités compétentes. Nous ne garantissons pas l'exactitude, la complétude ou l'actualité des informations.",
    },
    dataProtection: {
      title: "Protection des données",
      what: "Nous ne collectons aucune donnée personnelle via ce site. Ta progression dans la checklist est sauvegardée uniquement sur ton appareil (localStorage).",
      why: "Aucune donnée n'est transmise à nos serveurs. Tout reste local sur ton navigateur.",
      retention: "Les données stockées localement peuvent être supprimées à tout moment via le bouton 'Réinitialiser' dans la checklist.",
    },
    cookies: {
      title: "Cookies et stockage local",
      content: "Ce site utilise uniquement le stockage local (localStorage) de ton navigateur pour sauvegarder ta progression dans la checklist. Aucun cookie de suivi n'est utilisé. Tu peux supprimer ces données à tout moment via les paramètres de ton navigateur.",
    },
    intellectualProperty: {
      title: "Propriété intellectuelle",
      content: "Le contenu de ce site (textes, structure, design) est protégé par le droit d'auteur. Les sources officielles citées restent la propriété de leurs éditeurs respectifs (gouvernements, organismes publics).",
    },
    contact: {
      title: "Contact légal",
      email: "contact@marhabancanada.ca",
    },
  },
};
