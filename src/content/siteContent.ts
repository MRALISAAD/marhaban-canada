export type Locale = "fr" | "en" | "ar";

export type Source = {
  name: string;
  url: string;
};

export type StepGuide = {
  id: "nas" | "sante" | "banque" | "logement" | "mobile";
  title: string;
  description: string;
  href: string;
  summary: string;
  what: string;
  why: string;
  how: string[];
  avoid: string[];
  sources: Source[];
};

export type SurvivalTip = {
  title: string;
  description: string;
  href: string;
  sources: Source[];
};

export type ServiceCard = {
  title: string;
  description: string;
  icon: "home" | "shield" | "briefcase" | "globe";
  sources: Source[];
};

export type GuideTextBlock = {
  text: string;
  sources: Source[];
};

export type ServiceAccompagnementDefinition = {
  title: string;
  body: string;
};

export type GuideSections = {
  description: GuideTextBlock;
  why: GuideTextBlock;
  documents: {
    items: string[];
    sources: Source[];
  };
  where: GuideTextBlock;
  cost: GuideTextBlock;
  proTip: GuideTextBlock;
  fraudAlert: GuideTextBlock;
};

export type Guide = {
  slug: string;
  title: string;
  icon: string;
  urgency: number;
  sections: GuideSections;
};

export type GuideGroup = {
  title: string;
  description: string;
  slugs: string[];
};

export type BudgetCity = {
  id: string;
  label: string;
  rent: number;
  groceries: number;
  transport: number;
  cityMultiplier: number;
  sources: Source[];
};

export type ResourceItem = {
  title: string;
  description: string;
  href: string;
  sources: Source[];
};

export type ResourceCategory = {
  id: string;
  title: string;
  description: string;
};

export type ResourceGuide = {
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
  sources: Source[];
};

export type ResourcesExperienceContent = {
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
  sections: {
    arrival: { title: string; hint: string };
    housing: { title: string; hint: string };
    health: { title: string; hint: string };
    jobs: { title: string; hint: string };
    documents: { title: string; hint: string };
    transport: { title: string; hint: string };
    credit: { title: string; hint: string };
    taxes: { title: string; hint: string };
    integration: { title: string; hint: string };
  };
  ui: {
    recommendedStart: string;
    openResource: string;
    addFavorite: string;
    seeGuide: string;
    backToPath: string;
  };
};



export type ScamMicrocopy = {
  searchPlaceholder: string;
  frequentTitle: string;
  startHousingTitle: string;
  startHousingText: string;
  startHousingCta: string;
  breadcrumb: { home: string; scams: string; };
  backToScams: string;
  goToJourney: string;
  notFound: string;
  needMoreTitle: string;
  needMoreText: string;
  needMoreCta: string;
  housingLabel: string;
  pageEyebrow: string;
  pageTitle: string;
  pageSubtitle: string;
  rulesTitle: string;
  planTitle: string;
  planSubtitle: string;
  categoriesTitle: string;
  planLinkLabel: string;
};

export type ScamHousingContent = {
  rules: string[];
  planSteps: string[];
};

export type ScamGuideContentDetails = {
  subtitle: string;
  scenario: string[];
  redFlags: string[];
  actions: string[];
  mantra: string;
};

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
  microcopy: {
    homeTitle: string;
    homeSubtitle: string;
    homeCtaPrimary: string;
    homeCtaSub: string;
    journeyTitle: string;
    journeySubtitle: string;
    phaseWeek1Title: string;
    phaseWeek1Desc: string;
    phaseMonth1Title: string;
    phaseMonth1Desc: string;
    phaseOngoingTitle: string;
    phaseOngoingDesc: string;
    breadcrumbHome: string;
    breadcrumbJourney: string;
    breadcrumbGuide: string;
    breadcrumbBlog: string;
    youAreHere: string;
    statusInStep: string;
    nextStepLabel: string;
    backLabel: string;
    backToJourneyLabel: string;
    recommendedNextStepTitle: string;
    recommendedNextStepDesc: string;
    viewGuideCta: string;
    relatedArticlesTitle: string;
    priorityReadsTitle: string;
    priorityReadsDesc: string;
    searchPlaceholder: string;
  };
  serviceAccompagnementDefinition: ServiceAccompagnementDefinition;
  serviceAccompagnementWhatIs: string[];
  serviceAccompagnementWhatIsNot: string[];
  serviceAccompagnementWhatIsTitle: string;
  serviceAccompagnementWhatIsNotTitle: string;
  serviceAccompagnementNoProxy: string;
  serviceAccompagnementPillar: string;
  serviceAccompagnementDisclaimer: string;
  seoDescriptions: {
    meta: string;
    og: string;
    pdfHeader: string;
  };
  services: {
    title: string;
    cards: ServiceCard[];
  };
  navLinks: { label: string; href: string }[];
  checklist: {
    title: string;
    subtitle: string;
    shareLabel: string;
    resetLabel: string;
    shareSuccess: string;
    shareError: string;
    items: StepGuide[];
  };
  steps: Record<StepGuide["id"], StepGuide>;
  survival48h: {
    title: string;
    subtitle: string;
    items: SurvivalTip[];
  };
  budget: {
    title: string;
    subtitle: string;
    note: string;
    cityLabel: string;
    householdLabel: string;
    totalLabel: string;
    breakdownLabels: {
      rent: string;
      groceries: string;
      transport: string;
    };
    households: { id: string; label: string; multiplier: number }[];
    cities: BudgetCity[];
  };
  resourceSources: ResourceItem[];
  resources: ResourcesExperienceContent;
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
    provinceOptions: { value: string; label: string }[];
    categories: ResourceCategory[];
    items: Record<string, { title: string; description: string }>;
    guides: Record<'documents' | 'transport' | 'credit', ResourceGuide>;
  };
  antiFraud: {
    title: string;
    body: string;
    note: string;
  };
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
  floatingCta: {
    label: string;
    href: string;
  };
  footer: {
    disclaimer: string;
    rights: string;
  };
  guides: Record<string, Guide>;
  guideOrder: string[];
  globalDisclaimer: string;
  shared: {
    sourceLabel: string;
    officialLink: string;
    budgetLegend: string;
    disclaimer: string;
    radarTitle: string;
    radarBody: string;
    sourcesIntro: string;
    viewAllSteps: string;
    sectionLabels: {
      what: string;
      why: string;
      how: string;
      avoid: string;
      sources: string;
    };
  };
};

export const locales: Locale[] = ["fr", "en", "ar"];
export const defaultLocale: Locale = "fr";

const frSteps: StepGuide[] = [
  {
    id: "nas",
    title: "Numéro d'assurance sociale (NAS)",
    description: "Utilisé pour travailler, payer les impôts et recevoir certains services.",
    href: "/parcours/guide/steps/nas",
    summary: "Le NAS te relie aux impôts, à l’emploi et aux programmes fédéraux. Sans lui, aucun employeur ne peut te payer légalement.",
    what: "Le NAS est un numéro unique délivré par Service Canada qui prouve que tu es autorisé à travailler ou à recevoir des prestations.",
    why: "Il sécurise ton dossier fiscal et évite que quelqu’un d’autre utilise ton identité pour travailler ou toucher des crédits.",
    how: [
      "Réserve une visite dans un centre Service Canada (ou applique en ligne si ton dossier le permet).",
      "Apporte passeport, permis d’études ou de travail et une preuve d’adresse canadienne.",
      "Garde la lettre NAS dans un dossier physique, ne partage jamais ce numéro par messagerie.",
    ],
    avoid: [
      "Ne donne ton NAS qu’à un employeur confirmé, à ta banque ou aux autorités.",
      "Refuse toute offre payante te promettant un NAS plus rapide.",
    ],
    sources: [
      { name: "Service Canada", url: "https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html" },
    ],
  },
  {
    id: "sante",
    title: "Carte santé provinciale",
    description: "Accès au système public dans ta province d’arrivée.",
    href: "/parcours/guide/steps/sante",
    summary: "Chaque province gère son assurance maladie. Tant que ta carte n’est pas active, tes soins urgents peuvent coûter très cher.",
    what: "La carte santé prouve ton admissibilité au régime public (RAMQ, OHIP, MSP, etc.).",
    why: "Elle couvre les consultations médicales essentielles et évite d’avancer des frais élevés.",
    how: [
      "Consulte le site de ta province pour confirmer formulaires et délais.",
      "Réunis pièces d’identité, permis et preuve de résidence (bail, facture).",
      "Dépose ta demande en ligne ou en personne, puis surveille la poste.",
    ],
    avoid: [
      "Ne mens pas sur ta date d’arrivée ou ton adresse: la carte peut être annulée.",
      "Méfie-toi des sites non gouvernementaux qui facturent des formulaires gratuits.",
    ],
    sources: [
      { name: "IRCC – Soins de santé", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/apprendre-canada/soins-sante/systeme-soins-sante.html" },
    ],
  },
  {
    id: "banque",
    title: "Compte bancaire",
    description: "Structure tes finances et prépare ton historique de crédit.",
    href: "/parcours/guide/steps/banque",
    summary: "Ouvrir un compte local facilite les virements d’employeur, la location d’un logement et l’accès aux produits newcomers.",
    what: "Un compte canadien et une carte de crédit sécurisée permettent de recevoir des revenus, de payer et de bâtir ta cote.",
    why: "Les banques demandent souvent un compte actif pour vérifier solvabilité et prévenir le blanchiment.",
    how: [
      "Compare les programmes d’accueil (frais réduits, transfert international).",
      "Prends rendez-vous en succursale avec passeport, permis et preuve d’adresse.",
      "Demande une carte de crédit sécurisée ou un programme newcomer adapté.",
    ],
    avoid: [
      "Ne partage jamais ton NIP ou tes codes bancaires.",
      "Ne signe aucun produit dont tu ne comprends pas les frais.",
    ],
    sources: [
      { name: "ACFC – Ouvrir un compte", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/comptes-bancaires/ouvrir-compte-bancaire.html" },
    ],
  },
  {
    id: "logement",
    title: "Recherche de logement",
    description: "Montre un dossier propre et sais les règles provinciales.",
    href: "/parcours/guide/steps/logement",
    summary: "Un bail écrit et conforme protège tes droits. Les propriétaires sérieux exigent un dossier complet même sans historique local.",
    what: "Le dossier locataire regroupe tes preuves de revenus, références et dépôt légal selon la province.",
    why: "Il réduit le risque d’arnaques et t’assure que le logement respecte les normes locales.",
    how: [
      "Prépare CV locatif, relevés bancaires et lettre d’emploi ou de soutien.",
      "Planifie des visites (physiques ou vidéo) et vérifie l’identité du bailleur.",
      "Lis chaque clause du bail et paie via modes traçables après signature.",
    ],
    avoid: [
      "Ne transfère jamais d’argent avant d’avoir un bail signé.",
      "Refuse les demandes de copies de NAS ou passeport non nécessaires.",
    ],
    sources: [
      { name: "IRCC – Se loger", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/vie-canada/logement.html" },
      { name: "SCHL", url: "https://www.cmhc-schl.gc.ca/fr/consommateurs" },
    ],
  },
  {
    id: "mobile",
    title: "Téléphone / SIM",
    description: "Obtenir un numéro local pour les démarches et communications.",
    href: "/parcours/guide/steps/mobile",
    summary: "Un numéro local facilite les vérifications d’identité et évite les frais d’itinérance exorbitants.",
    what: "Il s’agit d’acheter une SIM/eSIM canadienne et de choisir un forfait adapté à ton premier mois.",
    why: "Les démarches administratives exigent souvent un numéro local pour confirmer un compte.",
    how: [
      "Compare les forfaits newcomers chez Bell, Rogers, Telus et les options prépayées.",
      "Achète ta SIM à l’aéroport ou en boutique officielle pour activer immédiatement.",
      "Conserve la facture afin de prouver ton adresse ou ta date d’arrivée si demandé.",
    ],
    avoid: [
      "Évite d’acheter une SIM à des revendeurs non autorisés.",
      "Ne partage pas tes codes de portabilité ou ton compte en ligne.",
    ],
    sources: [
      { name: "ISDE – Services sans fil", url: "https://ised-isde.canada.ca/site/services-telecommunications/fr/services-sans-fil" },
    ],
  },
];

const arSteps: StepGuide[] = [
  {
    id: "nas",
    title: "رقم التأمين الاجتماعي",
    description: "هوية إلزامية للعمل والحصول على المزايا.",
    href: "/parcours/guide/steps/nas",
    summary: "الـ NAS يربطك بالضرائب والعمل. من دونه لا يمكن لأي صاحب عمل أن يدفع لك شرعياً.",
    what: "رقم تصدره Service Canada يثبت حقك في العمل أو تلقي المزايا.",
    why: "يحمي ملفك الضريبي من انتحال الهوية ويمنع استخدام بياناتك بشكل احتيالي.",
    how: [
      "احجز موعداً في مركز Service Canada أو قدّم عبر الإنترنت إذا كنت مؤهلاً.",
      "أحضر جواز السفر، تصريح الإقامة، ودليل السكن الكندي.",
      "احفظ رسالة الرقم في مكان آمن ولا تشارك الرقم عبر الرسائل.",
    ],
    avoid: [
      "لا تقدم الرقم إلا لصاحب عمل موثوق أو بنك أو جهة حكومية.",
      "ارفض أي خدمة مدفوعة تدّعي تسريع الحصول على الرقم.",
    ],
    sources: [
      { name: "Service Canada", url: "https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html" },
    ],
  },
  {
    id: "sante",
    title: "بطاقة التأمين الصحي",
    description: "دخولك إلى النظام الصحي في مقاطعتك.",
    href: "/parcours/guide/steps/sante",
    summary: "كل مقاطعة تدير تغطيتها. بدون البطاقة قد تدفع مبالغ مرتفعة للعلاج.",
    what: "البطاقة تثبت أهليتك لبرامج التأمين الصحي العامة (RAMQ، OHIP...).",
    why: "تغطي الزيارات الأساسية وتمنع تحمل التكاليف الكاملة للطوارئ.",
    how: [
      "راجع موقع المقاطعة لمعرفة الاستمارات والمهل.",
      "جهّز الهوية، تصريح الإقامة، ودليل السكن.",
      "قدّم الطلب عبر الإنترنت أو في مركز الخدمة وانتظر البطاقة بالبريد.",
    ],
    avoid: [
      "لا تقدّم معلومات كاذبة حول تاريخ الدخول أو العنوان.",
      "احذر المواقع غير الرسمية التي تطلب رسوماً لا داعي لها.",
    ],
    sources: [
      { name: "IRCC – الصحة", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/apprendre-canada/soins-sante/systeme-soins-sante.html" },
    ],
  },
  {
    id: "banque",
    title: "فتح حساب بنكي",
    description: "لتنظيم أموالك وبناء تاريخ ائتماني.",
    href: "/parcours/guide/steps/banque",
    summary: "الحساب المحلي يسهل تلقي الرواتب ودفع الإيجار والحصول على منتجات الوافدين الجدد.",
    what: "حساب بالدولار الكندي وبطاقة ائتمان مضمونة لتلقي الدخل والبدء بتكوين سجل ائتماني.",
    why: "تطلبه البنوك والمالكون للتحقق من الملاءة ومكافحة الاحتيال.",
    how: [
      "قارن عروض الوافدين الجدد والرسوم المرتبطة بها.",
      "حدد موعداً وأحضر جواز السفر، التصريح، ودليل العنوان.",
      "اطلب بطاقة ائتمان مضمونة أو حزمة newcomers مناسبة.",
    ],
    avoid: [
      "لا تشارك أرقام التعريف الشخصية أو كلمات المرور البنكية.",
      "اقرأ كل عقد قبل التوقيع، خاصة الرسوم الخفية.",
    ],
    sources: [
      { name: "ACFC – فتح حساب", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/comptes-bancaires/ouvrir-compte-bancaire.html" },
    ],
  },
  {
    id: "logement",
    title: "إيجاد سكن",
    description: "ملف مستأجر واضح وبنود إيجار قانونية.",
    href: "/parcours/guide/steps/logement",
    summary: "عقد الإيجار المكتوب يحميك. سيطلب المالك الجاد ملفاً موثقاً حتى بدون تاريخ كندي.",
    what: "ملف مستأجر يضم إثباتات الدخل والمراجع والوديعة القانونية حسب المقاطعة.",
    why: "يقلل من مخاطر الاحتيال ويضمن احترام القوانين المحلية.",
    how: [
      "جهّز السيرة السكنية، الكشوف البنكية، وخطاب العمل أو الكفالة.",
      "نسّق زيارات فعلية أو عبر فيديو وتحقق من هوية المالك.",
      "اقرأ البنود وادفع بأساليب قابلة للتعقب بعد التوقيع فقط.",
    ],
    avoid: [
      "لا تحوّل أي مبلغ قبل توقيع عقد رسمي.",
      "لا ترسل نسخة NAS أو الجواز إن لم يكن ضرورياً.",
    ],
    sources: [
      { name: "IRCC – السكن", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/vie-canada/logement.html" },
      { name: "SCHL", url: "https://www.cmhc-schl.gc.ca/fr/consommateurs" },
    ],
  },
  {
    id: "mobile",
    title: "خطة الهاتف والبيانات",
    description: "رقم محلي لتأكيد هويتك وإنهاء معاملاتك.",
    href: "/parcours/guide/steps/mobile",
    summary: "الرقم الكندي ضروري للتحقق الثنائي ولتجنب رسوم التجوال المرتفعة.",
    what: "شراء SIM أو eSIM واختيار باقة تناسب الأسابيع الأولى.",
    why: "معظم البنوك والجهات الحكومية ترسل رموزاً لمرة واحدة إلى رقم كندي.",
    how: [
      "قارن باقات Bell وRogers وTelus مع العروض المدفوعة مسبقاً.",
      "اشترِ الشريحة من متجر رسمي وفعّلها فوراً.",
      "احتفظ بالفاتورة والبريد الإلكتروني للتفعيل كدليل عنوان.",
    ],
    avoid: [
      "ابتعد عن البائعين غير المعتمدين في المطار.",
      "لا تشارك بيانات تسجيل الدخول لحسابك لدى المزود.",
    ],
    sources: [
      { name: "ISDE – خدمات لاسلكية", url: "https://ised-isde.canada.ca/site/services-telecommunications/fr/services-sans-fil" },
    ],
  },
];

const buildStepsRecord = (steps: StepGuide[]) =>
  steps.reduce(
    (acc, step) => {
      acc[step.id] = step;
      return acc;
    },
    {} as Record<StepGuide["id"], StepGuide>,
  );


const frScamsContent = {
  microcopy: {
    searchPlaceholder: "Rechercher une arnaque (logement, emploi...)",
    frequentTitle: "Arnaques fréquentes",
    startHousingTitle: "Commencer par le logement",
    startHousingText:
      "Si on te demande de payer avant une visite, stop. C’est un signal d’arnaque fréquent.",
    startHousingCta: "Voir arnaques logement →",
    breadcrumb: { home: "Accueil", scams: "Arnaques" },
    backToScams: "Retour aux arnaques",
    goToJourney: "Aller au parcours",
    notFound: "Guide introuvable. Retourne aux catégories d'arnaques pour choisir un guide valide.",
    needMoreTitle: "Besoin d’aller plus loin ?",
    needMoreText: "Consulte le guide logement pour comprendre les étapes et éviter les erreurs.",
    needMoreCta: "Voir le guide logement →",
    housingLabel: "Logement",
    pageEyebrow: "Arnaques",
    pageTitle: "Arnaques frequentes : comment les reperer en 2 minutes",
    pageSubtitle: "Tu n es pas seul. Le but : comprendre, eviter, agir.",
    rulesTitle: "Regles d or",
    planTitle: "Plan d action en 5 etapes",
    planSubtitle: "Simple, rapide, sans panique.",
    categoriesTitle: "Categories d arnaques",
    planLinkLabel: "Plan d action 5 etapes",
  },
  housing: {
    rules: [
      "Ne paie jamais avant une visite.",
      "Refuse les transferts anonymes (crypto, cartes cadeaux).",
      "Vérifie le propriétaire et l’adresse.",
    ],
    planSteps: [
      "Demande une visite réelle.",
      "Vérifie l’annonce (photos, adresse, prix).",
      "Signe un bail officiel seulement après visite.",
    ],
  },
};

const enScamsContent = {
  microcopy: {
    searchPlaceholder: "Search a scam (housing, jobs...)",
    frequentTitle: "Frequent Scams",
    startHousingTitle: "Start with housing",
    startHousingText:
      "If you are asked to pay before a visit, stop. It's a common scam red flag.",
    startHousingCta: "View housing scams →",
    breadcrumb: { home: "Home", scams: "Scams" },
    backToScams: "Back to scams",
    goToJourney: "Go to journey",
    notFound: "Guide not found. Return to scam categories to choose a valid guide.",
    needMoreTitle: "Need to go further?",
    needMoreText: "Consult the housing guide to understand the steps and avoid mistakes.",
    needMoreCta: "View the housing guide →",
    housingLabel: "Housing",
    pageEyebrow: "Scams",
    pageTitle: "Common scams: spot them in 2 minutes",
    pageSubtitle: "You are not alone. The goal: understand, avoid, act.",
    rulesTitle: "Golden rules",
    planTitle: "5-step action plan",
    planSubtitle: "Simple, fast, no panic.",
    categoriesTitle: "Scam categories",
    planLinkLabel: "5-step action plan",
  },
  housing: {
    rules: [
      "Never pay before a visit.",
      "Refuse anonymous transfers (crypto, gift cards).",
      "Verify the landlord and address.",
    ],
    planSteps: [
      "Request a real visit.",
      "Verify the listing (photos, address, price).",
      "Sign an official lease only after visiting.",
    ],
  },
};

const arScamsContent = {
  microcopy: {
    searchPlaceholder: "ابحث عن احتيال (السكن، العمل...)",
    frequentTitle: "أنواع الاحتيال الشائعة",
    startHousingTitle: "ابدأ بالسكن",
    startHousingText:
      "إذا طُلب منك الدفع قبل الزيارة، توقّف. هذه إشارة احتيال شائعة.",
    startHousingCta: "عرض احتيال السكن →",
    breadcrumb: { home: "الرئيسية", scams: "الاحتيال" },
    backToScams: "العودة إلى الاحتيال",
    goToJourney: "الذهاب إلى المسار",
    notFound: "الدليل غير موجود. ارجع إلى فئات الاحتيال لاختيار دليل صالح.",
    needMoreTitle: "تريد التعمق أكثر؟",
    needMoreText: "اطّلع على دليل السكن لفهم الخطوات وتجنب الأخطاء.",
    needMoreCta: "عرض دليل السكن →",
    housingLabel: "السكن",
    pageEyebrow: "الاحتيال",
    pageTitle: "أشهر أساليب الاحتيال: كيف تكتشفها في دقيقتين",
    pageSubtitle: "أنت لست وحدك. الهدف: الفهم، التجنب، والتحرك.",
    rulesTitle: "قواعد ذهبية",
    planTitle: "خطة عمل من 5 خطوات",
    planSubtitle: "بسيطة، سريعة، بلا هلع.",
    categoriesTitle: "فئات الاحتيال",
    planLinkLabel: "خطة عمل من 5 خطوات",
  },
  housing: {
    rules: [
      "لا تدفع أبداً قبل الزيارة.",
      "ارفض التحويلات المجهولة (العملات المشفرة، بطاقات الهدايا).",
      "تحقق من المالك والعنوان.",
    ],
    planSteps: [
      "اطلب زيارة حقيقية.",
      "تحقق من الإعلان (الصور، العنوان، السعر).",
      "وقّع على عقد إيجار رسمي بعد الزيارة فقط.",
    ],
  },
};

const baseContent: Record<"fr" | "ar", LocaleContent> = {
  fr: {
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
      homeSubtitle:
        "Marhaban Canada est un service d’accompagnement et d’orientation destiné aux nouveaux arrivants au Canada.",
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
    },
    serviceAccompagnementDefinition: {
      title: "Service d’accompagnement",
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
      "Ce n’est pas un service d’immigration",
      "Ce n’est pas un agent ou consultant payant",
      "Nous ne remplissons aucun formulaire à votre place",
      "Nous ne prenons aucun rendez-vous à votre place",
      "Nous ne facturons aucun service officiel",
    ],
    serviceAccompagnementWhatIsTitle: "Ce que ce service est",
    serviceAccompagnementWhatIsNotTitle: "Ce que ce service n’est pas",
    serviceAccompagnementNoProxy: "Nous n’effectuons aucune démarche officielle à votre place.",
    serviceAccompagnementPillar:
      "Marhaban Canada est un service d’accompagnement et d’orientation destiné aux nouveaux arrivants au Canada.",
    serviceAccompagnementDisclaimer:
      "Ce site propose un service d’accompagnement et d’orientation. Il ne remplace pas les services officiels du gouvernement.",
    seoDescriptions: {
      meta: "Service d’accompagnement pour nouveaux arrivants au Canada : démarches officielles, logement, banque, téléphone, prévention des arnaques.",
      og: "Service d’accompagnement pour nouveaux arrivants au Canada : démarches officielles, logement, banque, téléphone, prévention des arnaques.",
      pdfHeader: "Service d’accompagnement pour nouveaux arrivants au Canada : démarches officielles, logement, banque, téléphone, prévention des arnaques.",
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
          href: "https://www.canada.ca/fr/emploi-developpement-social.html",
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
      breakdownLabels: {
        rent: "Loyer",
        groceries: "Épicerie",
        transport: "Transport",
      },
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
        shortDefinition:
          "Ce site propose un service d’accompagnement et d’orientation. Il ne remplace pas les services officiels du gouvernement.",
        noProxyLine: "Nous n’effectuons aucune démarche officielle à votre place.",
        footerHelp:
          "Besoin d’aide pour savoir quoi faire en premier ? Le service d’accompagnement peut t’orienter selon ta situation.",
      },
      quickGuides: {
        documentsCard: {
          title: "Documents essentiels",
          body: "Prépare tes papiers une fois pour éviter les blocages.",
          ctaLabel: "Voir le guide documents",
          href: "/parcours/guide/steps/integration",
        },
        transportCard: {
          title: "Transport et permis",
          body: "Comprendre les règles locales avant de conduire.",
          ctaLabel: "Voir le guide transport",
          href: "/parcours/guide/steps/license",
        },
        creditCard: {
          title: "Crédit et banque",
          body: "Évite les erreurs qui restent longtemps.",
          ctaLabel: "Voir le guide crédit",
          href: "/parcours/guide/steps/bank",
        },
      },
      sections: {
        arrival: {
          title: "Arrivée",
          hint: "À consulter dès l’arrivée pour comprendre les étapes officielles.",
        },
        housing: {
          title: "Logement",
          hint: "À consulter avant toute visite ou dépôt.",
        },
        health: {
          title: "Santé",
          hint: "À faire dès l’arrivée, même si la carte n’est pas encore reçue.",
        },
        jobs: {
          title: "Emploi",
          hint: "Utile pour chercher un emploi sans tomber dans les pièges.",
        },
        documents: {
          title: "Documents",
          hint: "Pour préparer tes papiers une fois, et gagner du temps.",
        },
        transport: {
          title: "Transport",
          hint: "Pour comprendre permis et transport selon ta province.",
        },
        credit: {
          title: "Crédit",
          hint: "Utile dès le premier mois pour éviter des erreurs longues à corriger.",
        },
        taxes: {
          title: "Impôts",
          hint: "Pour garder tes documents et éviter le stress des impôts.",
        },
        integration: {
          title: "Intégration",
          hint: "Pour trouver de l’aide locale et des services fiables.",
        },
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
        searchPlaceholder: "Rechercher (immigration, santé, emploi...)",
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
        { id: "arrival", title: "Arrivée", description: "Statut, démarches et installation." },
        { id: "housing", title: "Logement", description: "Bail, dépôt, règles locales." },
        { id: "health", title: "Santé", description: "Carte santé, couverture, cliniques." },
        { id: "employment", title: "Emploi", description: "Offres, droits, normes." },
        { id: "documents", title: "Documents", description: "Papiers essentiels et copies." },
        { id: "transport", title: "Transport", description: "Permis et cartes de transport." },
        { id: "credit", title: "Crédit", description: "Score et bonnes pratiques." },
        { id: "taxes", title: "Impôts", description: "Déclaration et documents." },
        { id: "integration", title: "Intégration", description: "Services locaux et réseaux." },
      ],
      items: {
        "arrival-services": {
          title: "Services pour nouveaux arrivants",
          description: "Infos d’accueil et services officiels.",
        },
        ircc: {
          title: "IRCC - immigration",
          description: "Portail officiel pour l’immigration.",
        },
        cmhc: {
          title: "SCHL - logement",
          description: "Conseils et informations logement.",
        },
        "tal-qc": {
          title: "Tribunal administratif du logement (QC)",
          description: "Règles et droits locatifs au Québec.",
        },
        "health-card": {
          title: "Carte d’assurance maladie",
          description: "Processus officiel + liens provinciaux.",
        },
        ramq: {
          title: "RAMQ (Québec)",
          description: "Couverture santé du Québec.",
        },
        ohip: {
          title: "OHIP (Ontario)",
          description: "Couverture santé de l’Ontario.",
        },
        msp: {
          title: "MSP (Colombie-Britannique)",
          description: "Couverture santé de la C.-B.",
        },
        ahcip: {
          title: "AHCIP (Alberta)",
          description: "Couverture santé de l’Alberta.",
        },
        jobbank: {
          title: "Guichet-Emplois",
          description: "Offres d’emploi officielles.",
        },
        "labour-standards": {
          title: "Normes du travail",
          description: "Droits et protections officielles.",
        },
        "documents-guide": {
          title: "Guide Documents",
          description: "Checklist documents à préparer.",
        },
        "transport-guide": {
          title: "Guide Transport",
          description: "Permis + démarches par province.",
        },
        "credit-guide": {
          title: "Guide Crédit",
          description: "Score et démarrage propre.",
        },
        driving: {
          title: "Permis de conduire",
          description: "Informations officielles Canada.",
        },
        saaq: {
          title: "SAAQ (Québec)",
          description: "Permis et véhicules au Québec.",
        },
        "service-ontario-driving": {
          title: "ServiceOntario - permis",
          description: "Permis et routes en Ontario.",
        },
        icbc: {
          title: "ICBC (C.-B.)",
          description: "Permis et assurances en C.-B.",
        },
        "alberta-registries": {
          title: "Alberta registries",
          description: "Permis et services en Alberta.",
        },
        "credit-score": {
          title: "Score de crédit (ACFC)",
          description: "Comprendre et améliorer ton score.",
        },
        taxes: {
          title: "Impôts (ARC)",
          description: "Déclaration annuelle et documents.",
        },
        integration: {
          title: "211 Canada",
          description: "Aide locale rapide.",
        },
      },
      guides: {
        documents: {
          title: "Documents essentiels",
          summary: "Prépare tes papiers une fois, gagne du temps à chaque étape.",
          callout: "Une copie claire vaut une heure de stress en moins.",
          what: "Les documents essentiels servent à toutes les démarches (emploi, santé, logement).",
          why: ["Éviter les blocages administratifs", "Gagner du temps", "Protéger tes originaux"],
          how: [
            "Scanner passeport et permis",
            "Créer un dossier numérique",
            "Imprimer des copies clés",
            "Stocker une copie hors ligne",
          ],
          pitfalls: [
            "Partager tes documents sans vérification",
            "Perdre les originaux",
            "Ne pas sauvegarder les copies",
          ],
          actions: ["Préparer une checklist personnelle", "Créer un dossier cloud sécurisé"],
          ctaLabel: "Checklist documents à préparer",
          ctaHref: "/checklist",
          sources: [{ name: "IRCC", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete.html" }],
        },
        transport: {
          title: "Transport et permis",
          summary: "Comprendre les démarches selon ta province.",
          callout: "Un permis valide = liberté + sécurité.",
          what: "Le permis et les cartes de transport varient selon la province.",
          why: ["Éviter les amendes", "Se déplacer facilement", "Assurance valide"],
          how: ["Vérifier les règles provinciales", "Préparer les documents", "Réserver les tests si requis"],
          pitfalls: ["Conduire sans permis valide", "Ignorer les délais de conversion"],
          actions: ["Choisir un mode de transport temporaire", "Planifier un rendez-vous"],
          ctaLabel: "Voir démarches permis (selon province)",
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
    guideOrder: ["nas", "sante", "banque", "telephone", "logement"],
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
            items: [
              "Passeport en cours de validité",
              "Permis d’études ou de travail",
              "Preuve d’adresse canadienne (bail, facture, lettre d’accueil)",
            ],
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
            sources: [{ name: "ASFC – Signaler une fraude", url: "https://www.cbsa-asfc.gc.ca/menu-fra.html" }],
          },
        },
      },
      sante: {
        slug: "sante",
        title: "Carte santé provinciale",
        icon: "HeartPulse",
        urgency: 8,
        sections: {
          description: {
            text: "Chaque province délivre sa carte d’assurance maladie (RAMQ, OHIP, MSP, etc.) qui couvre les soins essentiels.",
            sources: [{ name: "IRCC – Soins de santé", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/apprendre-canada/soins-sante/systeme-soins-sante.html" }],
          },
          why: {
            text: "Certains territoires imposent un délai de carence de quelques mois; sans carte, une simple visite peut coûter plusieurs centaines de dollars.",
            sources: [{ name: "Gouvernement du Québec – RAMQ", url: "https://www.quebec.ca/sante/assurance-maladie" }],
          },
          documents: {
            items: [
              "Passeport et permis (travail, étude ou résidence permanente)",
              "Preuve de résidence (bail, facture d’énergie)",
              "Formulaire provincial rempli",
            ],
            sources: [{ name: "Ontario – OHIP", url: "https://www.ontario.ca/fr/page/obtenir-une-carte-sante" }],
          },
          where: {
            text: "Prends rendez-vous auprès de l’organisme provincial (RAMQ, ServiceOntario, Service BC) ou dépose ton formulaire en ligne si offert.",
            sources: [{ name: "ServiceOntario", url: "https://www.ontario.ca/page/serviceontario" }],
          },
          cost: {
            text: "Gratuit : aucune province ne facture la carte elle-même, mais certaines exigent une assurance privée temporaire pendant la période d’attente.",
            sources: [{ name: "Gouvernement de la Colombie-Britannique – MSP", url: "https://www2.gov.bc.ca/gov/content/sante/assurance-sante-medicale" }],
          },
          proTip: {
            text: "Souscris à une assurance voyage ou étudiants pour couvrir les soins urgents jusqu’à l’activation de ta carte.",
            sources: [{ name: "IRCC – Assurance privée", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/soins-sante/assurance-maladie.html" }],
          },
          fraudAlert: {
            text: "Les formulaires sont gratuits : évite les sites qui facturent des « frais de traitement » ou promettent une carte accélérée.",
            sources: [{ name: "Consumer Protection Ontario", url: "https://www.ontario.ca/page/consumer-protection-ontario" }],
          },
        },
      },
      banque: {
        slug: "banque",
        title: "Compte bancaire",
        icon: "Wallet",
        urgency: 7,
        sections: {
          description: {
            text: "Les banques canadiennes offrent des forfaits « nouveaux arrivants » permettant de gérer ton argent dès le premier jour.",
            sources: [{ name: "ACFC – Offres newcomers", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/comptes-bancaires/offres-bancaires-nouveaux-arrivants.html" }],
          },
          why: {
            text: "Un compte local facilite les dépôts de salaire, garantit des paiements traçables pour le logement et aide à bâtir l’historique de crédit.",
            sources: [{ name: "ACFC – Crédit", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/credit.html" }],
          },
          documents: {
            items: [
              "Passeport et preuve de statut (permis, confirmation de RP)",
              "Preuve d’adresse canadienne",
              "NAS (facultatif mais souvent demandé)",
            ],
            sources: [{ name: "ACFC – Ouvrir un compte", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/comptes-bancaires/ouvrir-compte-bancaire.html" }],
          },
          where: {
            text: "Prends rendez-vous en succursale ou en ligne avec les grandes banques ou coopératives reconnues.",
            sources: [{ name: "Banques sous réglementation fédérale", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/banques/liste.html" }],
          },
          cost: {
            text: "La plupart des programmes newcomers offrent les frais mensuels gratuits pendant 12 mois, ensuite les tarifs standards s’appliquent.",
            sources: [{ name: "ACFC – Offres newcomers", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/comptes-bancaires/offres-bancaires-nouveaux-arrivants.html" }],
          },
          proTip: {
            text: "Demande une carte de crédit garantie pour commencer ton historique tout en gardant un dépôt de sécurité.",
            sources: [{ name: "ACFC – Cartes garanties", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/cartes-credit/garanties.html" }],
          },
          fraudAlert: {
            text: "Ne paie jamais pour « réserver » un rendez-vous bancaire et refuse tout transfert vers un compte personnel lors de l’ouverture.",
            sources: [{ name: "ACFC – Prévenir la fraude", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/protection-fraude.html" }],
          },
        },
      },
      telephone: {
        slug: "telephone",
        title: "Téléphone et données",
        icon: "PhoneCall",
        urgency: 6,
        sections: {
          description: {
            text: "Obtenir un numéro canadien facilite les vérifications d’identité (banques, IRCC) et l’activation des services en ligne.",
            sources: [{ name: "ISDE – Services sans fil", url: "https://ised-isde.canada.ca/site/services-telecommunications/fr/services-sans-fil" }],
          },
          why: {
            text: "Beaucoup de fournisseurs exigent une authentification par SMS pour sécuriser ton compte bancaire ou ton dossier IRCC.",
            sources: [{ name: "CRTC – Code sur les services sans fil", url: "https://crtc.gc.ca/fra/phone/mobile/wirelesscode.htm" }],
          },
          documents: {
            items: [
              "Passeport ou pièce d’identité avec photo",
              "Coordonnées locales (adresse et email)",
              "Optionnel: preuve de solvabilité pour les forfaits postpayés",
            ],
            sources: [{ name: "CRTC – Code sans fil", url: "https://crtc.gc.ca/fra/phone/mobile/wirelesscode.htm" }],
          },
          where: {
            text: "Achète une SIM/eSIM dans un kiosque officiel (aéroport, centre commercial) ou commande directement auprès des opérateurs reconnus.",
            sources: [{ name: "CRTC – Liste des fournisseurs", url: "https://crtc.gc.ca/fra/phone/mobile/tel.htm" }],
          },
          cost: {
            text: "Les forfaits prépayés commencent autour de 35–45 $/mois pour 20 Go, mais varient selon la province et les promotions BYOD.",
            sources: [{ name: "ISDE – Comparateur de services", url: "https://www.ic.gc.ca/eic/site/086.nsf/fra/00006.html" }],
          },
          proTip: {
            text: "Info générale : privilégie le mode BYOD (apporte ton appareil) pour éviter de lier ton forfait à une cote de crédit que tu dois encore établir.",
            sources: [{ name: "CRTC – Code sans fil", url: "https://crtc.gc.ca/fra/phone/mobile/wirelesscode.htm" }],
          },
          fraudAlert: {
            text: "Méfie-toi des revendeurs qui exigent des dépôts cash non reçus par l’opérateur ou qui promettent de « débloquer » ton appareil sans reçu officiel.",
            sources: [{ name: "ISDE – Conseils anti-fraude", url: "https://ised-isde.canada.ca/site/mesures-consommateurs/fr/protection-consommateur/fraude" }],
          },
        },
      },
      logement: {
        slug: "logement",
        title: "Logement locatif",
        icon: "Home",
        urgency: 8,
        sections: {
          description: {
            text: "La location d’un logement passe par un bail écrit conforme aux règles provinciales et un dossier locataire crédible.",
            sources: [
              { name: "IRCC – Se loger", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/vie-canada/logement.html" },
            ],
          },
          why: {
            text: "Un bail officiel protège ton dépôt, définit la durée et les hausses de loyer permises, et évite les expulsions abusives.",
            sources: [{ name: "SCHL – Droits des locataires", url: "https://www.cmhc-schl.gc.ca/fr/consommateurs" }],
          },
          documents: {
            items: [
              "Lettre d’emploi ou preuves de revenus",
              "Références locatives ou professionnelles",
              "Relevés bancaires ou preuve d’épargne",
            ],
            sources: [{ name: "SCHL – Préparer son dossier", url: "https://www.cmhc-schl.gc.ca/fr/consommateurs/guide-location" }],
          },
          where: {
            text: "Visite le logement (physiquement ou virtuellement) et vérifie les registres provinciaux pour confirmer le propriétaire.",
            sources: [{ name: "Tribunal administratif du logement (QC)", url: "https://www.tal.gouv.qc.ca" }],
          },
          cost: {
            text: "Le dépôt légal varie selon la province (ex.: dernier mois de loyer en Ontario, demi-mois en C.-B.). Aucun propriétaire ne peut exiger plus.",
            sources: [{ name: "Ontario – Lignes directrices sur les dépôts", url: "https://www.ontario.ca/fr/page/loyer-depot" }],
          },
          proTip: {
            text: "Utilise des transferts bancaires ou chèques pour laisser une trace. Envoie un courriel récapitulatif après chaque visite.",
            sources: [{ name: "ACFC – Paiements traçables", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/transferts-electroniques.html" }],
          },
          fraudAlert: {
            text: "Ne verse aucun dépôt avant d’avoir reçu un bail signé et vérifié l’adresse. Méfie-toi des annonces qui refusent les visites.",
            sources: [{ name: "GRC – Avertissement fraude locative", url: "https://www.grc-rcmp.gc.ca/fr/escroqueries-locatives" }],
          },
        },
      },
    },
    globalDisclaimer: "Information et orientation uniquement. Vérifie toujours les conditions sur les sites officiels avant de te déplacer.",
    antiFraud: {
      title: "Intégrité et anti-fraude",
      body: "Nous n’accélérons aucun visa, ne fabriquons aucun document et nous renvoyons systématiquement vers les sites gouvernementaux.",
      note: "Signale tout comportement suspect à l’ASFC ou à IRCC (lien officiel dans chaque étape).",
    },
    scams: {
      ...frScamsContent,
      guides: {
        logement: {
          subtitle: 'Arnaques courantes liées à la location.',
          scenario: [
            'Annonce trop belle pour être vraie (prix bas, photos parfaites).',
            'Le propriétaire est à l\'étranger et ne peut pas faire visiter.',
            'Demande de virement d\'argent avant toute visite ou signature de bail.',
            'Pression pour décider rapidement et payer immédiatement.',
          ],
          redFlags: [
            'Demande de dépôt de sécurité élevé ou "frais de dossier" non remboursables.',
            'Communication uniquement par email ou messagerie instantanée, jamais par téléphone.',
            'Refus de fournir une adresse physique ou de faire visiter le logement.',
            'Contrat de location avec des clauses inhabituelles ou abusives.',
          ],
          actions: [
            'Exiger une visite physique du logement.',
            'Vérifier l\'identité du propriétaire et la légalité de l\'annonce.',
            'Ne jamais virer d\'argent avant la signature d\'un bail légal et la remise des clés.',
            'Utiliser des moyens de paiement traçables (chèque, virement bancaire).',
          ],
          mantra: 'Pas de visite = pas d argent.',
        },
        emploi: {
          subtitle: 'Arnaques liées aux offres d\'emploi et au recrutement.',
          scenario: [
            'Offre d\'emploi non sollicitée avec un salaire irréaliste.',
            'Demande de paiement pour du matériel, une formation, ou un contrôle de casier judiciaire.',
            'Entretien d\'embauche par messagerie instantanée sans contact vocal ou vidéo.',
            'Pression pour fournir des informations personnelles (NAS, compte bancaire) trop tôt.',
          ],
          redFlags: [
            'Fautes d\'orthographe et de grammaire dans l\'offre d\'emploi.',
            'Adresse email générique (Gmail, Outlook) pour le recruteur.',
            'Processus de recrutement anormalement rapide et sans vérification.',
            'Demande de racheter du matériel avec remboursement promis.',
          ],
          actions: [
            'Rechercher l\'entreprise et le recruteur sur LinkedIn ou leur site officiel.',
            'Ne jamais payer pour un emploi ou des "frais de dossier".',
            'Ne jamais fournir de NAS ou de coordonnées bancaires avant un contrat signé.',
            'Utiliser le Guichet-Emplois officiel pour vérifier la légitimité des offres.',
          ],
          mantra: 'Un vrai emploi ne demande jamais de frais.',
        },
        telephone: {
          subtitle: 'Arnaques liées aux forfaits mobiles et aux services téléphoniques.',
          scenario: [
            'Appels non sollicités promettant des rabais incroyables sur les forfaits.',
            'Pression pour changer de fournisseur ou souscrire à des options non désirées.',
            'Facturation surprise avec des frais cachés ou des services non autorisés.',
            'Vol de données personnelles sous prétexte de "vérification de compte".',
          ],
          redFlags: [
            'Offres trop belles pour être vraies, "seulement aujourd\'hui".',
            'Demande d\'informations personnelles (mot de passe, NAS) par téléphone.',
            'Représentant agressif ou refusant de fournir des informations claires.',
            'Difficulté à annuler un service ou à obtenir un remboursement.',
          ],
          actions: [
            'Ne jamais partager d\'informations sensibles par téléphone.',
            'Vérifier les offres directement sur les sites web officiels des opérateurs.',
            'Lire attentivement les contrats avant de signer.',
            'Contacter le CRTC ou l\'opérateur en cas de litige.',
          ],
          mantra: 'Lis tout, surtout les frais.',
        },
        banque: {
          subtitle: 'Arnaques financières et bancaires.',
          scenario: [
            'Appels ou emails se faisant passer pour votre banque demandant des informations confidentielles.',
            'Pression pour effectuer un virement urgent pour "sécuriser" votre compte.',
            'Offres de prêts ou cartes de crédit sans vérification de crédit (trop facile).',
            'Phishing : faux sites web bancaires pour voler vos identifiants.',
          ],
          redFlags: [
            'Demande de votre NIP, mot de passe ou codes de vérification.',
            'Urgence extrême, menaces de fermeture de compte ou poursuites.',
            'Liens suspects dans les emails ou SMS.',
            'Fautes d\'orthographe dans les communications officielles.',
          ],
          actions: [
            'Ne jamais cliquer sur des liens suspects ou répondre à des demandes d\'informations confidentielles.',
            'Contacter votre banque directement via le numéro officiel en cas de doute.',
            'Vérifier l\'URL des sites web bancaires (https, cadenas).',
            'Signaler les tentatives de fraude à votre banque et à la police.',
          ],
          mantra: 'Ta banque ne demande jamais ton PIN.',
        },
        immigration: {
          subtitle: 'Arnaques liées aux services d\'immigration et aux faux consultants.',
          scenario: [
            'Promesses de visa ou de résidence permanente garanties, sans conditions.',
            'Demande de paiement élevé pour des services qui sont gratuits ou peu coûteux.',
            'Faux agents d\'immigration vous contactant par email ou téléphone.',
            'Demande de documents originaux ou d\'argent en espèces.',
          ],
          redFlags: [
            'Frais cachés ou non détaillés.',
            'Pression pour agir rapidement ou manquer une "offre exclusive".',
            'Utilisation de canaux de paiement non officiels (crypto, cartes cadeaux).',
            'Absence de licence ou de numéro d\'enregistrement pour le consultant.',
          ],
          actions: [
            'Vérifier la légitimité des consultants en immigration sur les sites officiels (IRCC, ICCRC).',
            'Ne jamais payer pour des services qui sont gratuits via le gouvernement.',
            'Ne jamais envoyer de documents originaux sans copie certifiée.',
            'Conserver toutes les communications et les preuves de paiement.',
          ],
          mantra: 'Personne ne peut garantir un visa.',
        },
        marketplace: {
          subtitle: 'Arnaques lors d\'achats ou ventes sur les plateformes en ligne.',
          scenario: [
            'Vendeur demandant un paiement anticipé via une méthode non sécurisée.',
            'Acheteur proposant de payer plus que le prix demandé et demandant un remboursement partiel.',
            'Pression pour finaliser la transaction hors plateforme.',
            'Produit ou service non conforme à l\'annonce après paiement.',
          ],
          redFlags: [
            'Profil du vendeur/acheteur récent ou avec peu d\'informations.',
            'Refus de rencontre en personne pour l\'échange.',
            'Demande de codes de vérification de carte ou d\'accès au compte bancaire.',
            'Utilisation de messages génériques ou copiés-collés.',
          ],
          actions: [
            'Privilégier la remise en main propre et le paiement en espèces lors de la rencontre.',
            'Utiliser des plateformes de paiement sécurisées (PayPal, Stripe) si disponible.',
            'Se méfier des offres trop alléchantes.',
            'Signaler les profils ou annonces suspectes à la plateforme.',
          ],
          mantra: 'Pas de rencontre = pas d achat.',
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
        {
          title: "Statut & santé",
          description: "Sécurise ton droit de travailler et ta couverture médicale avant le reste.",
          slugs: ["nas", "sante"],
        },
        {
          title: "Installation quotidienne",
          description: "Prépare ton logement, tes finances et ton téléphone pour vivre sereinement.",
          slugs: ["logement", "banque", "telephone"],
        },
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
    floatingCta: {
      label: "Besoin d’aide ?",
      href: "mailto:contact@marhabancanada.ca",
    },
    footer: {
      disclaimer:
        "Ce site propose un service d’accompagnement et d’orientation. Il ne remplace pas les services officiels du gouvernement.",
      rights: "© 2025 Marhaban Canada. Tous droits réservés.",
    },
    shared: {
      sourceLabel: "Source",
      officialLink: "Lien officiel",
      budgetLegend: "Loyer + transport + épicerie x coefficient foyer.",
      disclaimer: "Information et orientation uniquement. Réfère-toi toujours aux sites officiels.",
      radarTitle: "Radar anti-arnaque",
      radarBody: "Vérifie toujours les expéditeurs, refuse les paiements en cartes cadeaux et garde des copies numériques de tes preuves.",
      sourcesIntro: "Chaque recommandation s’appuie sur un site gouvernemental ou parapublic vérifiable.",
      viewAllSteps: "Voir toutes les étapes",
      sectionLabels: {
        what: "Qu’est-ce que c’est ?",
        why: "Pourquoi c’est important ?",
        how: "Comment faire",
        avoid: "À éviter",
        sources: "Sources officielles",
      },
    },
  },
  ar: {
    locale: "ar",
    dir: "rtl",
    brand: "مرحبا كندا",
    contactEmail: "contact@marhabancanada.ca",
    hero: {
      title: "وصول آمن إلى كندا خطوة بخطوة.",
      subtitle: "كل خطوة تشرح ببساطة مع رابط رسمي موثوق.",
      ctaPrimary: "عرض القائمة",
      ctaSecondary: "مصادر رسمية",
    },
    microcopy: {
      homeTitle: "الخطوات الأولى بعد وصولك إلى كندا",
      homeSubtitle: "مارحبا كندا هي خدمة مرافقة وتوجيه مخصصة للقادمين الجدد إلى كندا.",
      homeCtaPrimary: "ابدأ المسار",
      homeCtaSub: "مجاني · يعتمد على مصادر رسمية · بدون تسجيل",
      journeyTitle: "مسارك بعد الوصول",
      journeySubtitle: "ترتيب واضح للبدء بهدوء.",
      phaseWeek1Title: "الأسبوع الأول",
      phaseWeek1Desc: "هذه الخطوات تساعدك على الانطلاق بسرعة. خطوة خطوة وبهدوء.",
      phaseMonth1Title: "الشهر الأول",
      phaseMonth1Desc: "لا شيء مستعجل. تقدّم عندما تكون جاهزاً.",
      phaseOngoingTitle: "بشكل مستمر",
      phaseOngoingDesc: "أمور مهمّة تتابعها خلال الأسابيع القادمة.",
      breadcrumbHome: "الرئيسية",
      breadcrumbJourney: "المسار",
      breadcrumbGuide: "الدليل",
      breadcrumbBlog: "المدونة",
      youAreHere: "أنت هنا",
      statusInStep: "أنت في خطوة {step} ({phase}). بداية مناسبة.",
      nextStepLabel: "الخطوة التالية",
      backLabel: "رجوع",
      backToJourneyLabel: "العودة إلى المسار",
      recommendedNextStepTitle: "الخطوة التالية المقترحة",
      recommendedNextStepDesc: "عندما تكون جاهزاً، يمكنك متابعة الخطوة التالية.",
      viewGuideCta: "عرض الدليل",
      relatedArticlesTitle: "مقالات ذات صلة",
      priorityReadsTitle: "القراءات الأساسية",
      priorityReadsDesc: "إذا كنت قد وصلت للتو، ابدأ بهذه المقالات.",
      searchPlaceholder: "ابحث (السكن، الائتمان، NAS...)",
    },
    serviceAccompagnementDefinition: {
      title: "خدمة مرافقة وتوجيه",
      body: "خدمة تساعد القادمين الجدد على الفهم والتوجيه خطوة بخطوة، دون القيام بالإجراءات بدلاً عنهم ودون تقاضي أي رسوم على خدمات رسمية. الهدف هو توضيح الخطوات، تجنب الأخطاء، والتقدم بأمان بالاعتماد فقط على المصادر الرسمية.",
    },
    serviceAccompagnementWhatIs: [
      "توجيه واضح للقادمين الجدد",
      "شرح مبسط للإجراءات الرسمية",
      "المساعدة على فهم ترتيب الخطوات",
      "الوقاية من الأخطاء والاحتيال",
      "الإحالة إلى مصادر رسمية فقط",
      "دعم إنساني وهادئ بدون أحكام",
    ],
    serviceAccompagnementWhatIsNot: [
      "ليست خدمة حكومية",
      "ليست خدمة هجرة",
      "ليست وكيلًا أو مستشارًا مدفوع الأجر",
      "لا نقوم بملء أي استمارات نيابةً عنك",
      "لا نحجز مواعيد نيابةً عنك",
      "لا نتقاضى رسومًا على خدمات رسمية",
    ],
    serviceAccompagnementWhatIsTitle: "ما الذي تقدمه هذه الخدمة",
    serviceAccompagnementWhatIsNotTitle: "ما الذي لا تقدمه هذه الخدمة",
    serviceAccompagnementNoProxy: "نحن لا نقوم بأي إجراء رسمي نيابةً عنك.",
    serviceAccompagnementPillar: "مارحبا كندا هي خدمة مرافقة وتوجيه مخصصة للقادمين الجدد إلى كندا.",
    serviceAccompagnementDisclaimer:
      "هذا الموقع يقدم خدمة مرافقة وتوجيه، ولا يُعتبر بديلاً عن الخدمات الحكومية الرسمية.",
    seoDescriptions: {
      meta: "خدمة مرافقة للقادمين الجدد إلى كندا: الخطوات الرسمية، السكن، البنك، الهاتف، تجنب الاحتيال.",
      og: "خدمة مرافقة للقادمين الجدد إلى كندا: الخطوات الرسمية، السكن، البنك، الهاتف، تجنب الاحتيال.",
      pdfHeader: "خدمة مرافقة للقادمين الجدد إلى كندا: الخطوات الرسمية، السكن، البنك، الهاتف، تجنب الاحتيال.",
    },
    services: {
      title: "الخدمات الأساسية",
      cards: [
        {
          title: "إجراءات الوصول",
          description: "بطاقة الصحة، الحسابات البنكية.",
          icon: "home",
          sources: [{ name: "Service Canada", url: "https://www.canada.ca/fr/emploi-developpement-social.html" }],
        },
        {
          title: "سكن آمن",
          description: "ملف مستأجر، قراءة عقد، مؤشرات الاحتيال.",
          icon: "shield",
          sources: [{ name: "SCHL", url: "https://www.cmhc-schl.gc.ca/fr/consommateurs" }],
        },
        {
          title: "عمل محترف",
          description: "سيرة كندية، مقابلات، حقوق العمل.",
          icon: "briefcase",
          sources: [{ name: "Guichet-Emplois", url: "https://www.guichetemplois.gc.ca" }],
        },
        {
          title: "شبكات محلية",
          description: "منظمات المجتمع المعتمدة وروابط الدعم.",
          icon: "globe",
          sources: [{ name: "IRCC", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete.html" }],
        },
      ],
    },
    navLinks: [
      { label: "الخدمات", href: "#services" },
      { label: "الخطوات", href: "#etapes" },
      { label: "الميزانية", href: "#budget" },
      { label: "الأدلة", href: "/parcours/guide" },
      { label: "المصادر الموثوقة", href: "/sources" },
      { label: "الإشعارات / التنبيه", href: "/mentions" },
    ],
    checklist: {
      title: "أول خمس خطوات",
      subtitle: "كل خطوة لها صفحة خاصة وروابط رسمية.",
      shareLabel: "مشاركة تقدمي",
      resetLabel: "إعادة التعيين",
      shareSuccess: "تم نسخ التقدم، يمكنك مشاركته.",
      shareError: "تعذر المشاركة الآن.",
      items: arSteps,
    },
    steps: buildStepsRecord(arSteps),
    survival48h: {
      title: "خطة ٤٨ ساعة",
      subtitle: "تنقل آمن، سكن مؤقت، اتصال موثوق.",
      items: [
        {
          title: "الخروج من المطار",
          description: "REM مونتريال وUP Express تورونتو وCanada Line فانكوفر هي وسائل رسمية ومراقبة.",
          href: "https://tc.canada.ca/fr/services-transports.html",
          sources: [{ name: "Transports Canada", url: "https://tc.canada.ca" }],
        },
        {
          title: "بطاقات النقل",
          description: "اشتر بطاقة OPUS أو PRESTO أو Compass للاستفادة من تعرفة المقيمين.",
          href: "https://www.canada.ca/fr/emploi-developpement-social.html",
          sources: [{ name: "سلطات النقل", url: "https://www.canada.ca/fr.html" }],
        },
        {
          title: "مبيت مؤقت",
          description: "فضّل السكن الجامعي المفتوح أو الملاجئ الموثوقة من البلدية.",
          href: "https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants.html",
          sources: [{ name: "IRCC", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete.html" }],
        },
        {
          title: "شريحة محلية",
          description: "أكشاك Bell وRogers وTelus بالمطار توفر باقات للوافدين الجدد بدون سجل ائتماني.",
          href: "https://ised-isde.canada.ca/site/services-telecommunications/fr/services-sans-fil",
          sources: [{ name: "ISDE", url: "https://ised-isde.canada.ca" }],
        },
      ],
    },
    budget: {
      title: "حاسبة الميزانية",
      subtitle: "سلة البقاء = إيجار + غذاء + نقل × معامل الأسرة.",
      note: "الأرقام مستمدة من بيانات المدن والوكالات الرسمية.",
      cityLabel: "اختر المدينة",
      householdLabel: "حجم الأسرة",
      totalLabel: "التكلفة التقديرية",
      breakdownLabels: {
        rent: "الإيجار",
        groceries: "البقالة",
        transport: "النقل",
      },
      households: [
        { id: "solo", label: "فرد واحد", multiplier: 1 },
        { id: "couple", label: "زوجان", multiplier: 1.35 },
        { id: "famille", label: "عائلة (٣+)", multiplier: 1.6 },
      ],
      cities: [
        {
          id: "montreal",
          label: "مونتريال",
          rent: 1500,
          groceries: 420,
          transport: 94,
          cityMultiplier: 1,
          sources: [{ name: "SCHL", url: "https://www.cmhc-schl.gc.ca/fr/consommateurs" }],
        },
        {
          id: "toronto",
          label: "تورونتو",
          rent: 2200,
          groceries: 520,
          transport: 156,
          cityMultiplier: 1.2,
          sources: [{ name: "مدينة تورونتو", url: "https://www.toronto.ca" }],
        },
        {
          id: "calgary",
          label: "كالجاري",
          rent: 1750,
          groceries: 450,
          transport: 112,
          cityMultiplier: 1.05,
          sources: [{ name: "مدينة كالجاري", url: "https://www.calgary.ca" }],
        },
      ],
    },
    resourceSources: [
      {
        title: "خدمات صحية فرنكوفونية",
        description: "دليل العيادات التي تقدم خدمات بالفرنسية.",
        href: "https://santefrancais.ca",
        sources: [{ name: "Réseau Santé", url: "https://santefrancais.ca" }],
      },
      {
        title: "برامج الاندماج من IRCC",
        description: "ورش مجانية حول السيرة والعمل والسكن.",
        href: "https://ircc.canada.ca/francais/services/immigration-canada/etablir.html",
        sources: [{ name: "IRCC", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete.html" }],
      },
      {
        title: "التوعية بحماية المستهلك",
        description: "إرشادات ضد الاحتيال في السكن والمعاملات.",
        href: "https://www.canada.ca/fr/agence-consommation-matiere-financiere.html",
        sources: [{ name: "ACFC", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere.html" }],
      },
    ],
    resources: {
      header: {
        title: "موارد رسمية ومجتمعية",
        subtitle: "روابط موثوقة ومصنفة حسب الحاجة.",
        searchPlaceholder: "ابحث عن مورد (السكن، الصحة، العمل...)",
        provinceLabel: "المقاطعة",
        categoryLabel: "الفئة",
      },
      accompaniment: {
        shortDefinition:
          "هذا الموقع يقدم خدمة مرافقة وتوجيه، ولا يُعتبر بديلاً عن الخدمات الحكومية الرسمية.",
        noProxyLine: "نحن لا نقوم بأي إجراء رسمي نيابةً عنك.",
        footerHelp: "تحتاج مساعدة لمعرفة ما تبدأ به؟ خدمة المرافقة يمكن أن توجهك حسب وضعك.",
      },
      quickGuides: {
        documentsCard: {
          title: "الوثائق الأساسية",
          body: "حضّر أوراقك مرة واحدة لتجنّب التعطّل.",
          ctaLabel: "عرض دليل الوثائق",
          href: "/parcours/guide/steps/integration",
        },
        transportCard: {
          title: "النقل والرخصة",
          body: "افهم القواعد المحلية قبل القيادة.",
          ctaLabel: "عرض دليل النقل",
          href: "/parcours/guide/steps/license",
        },
        creditCard: {
          title: "الائتمان والبنك",
          body: "تجنب الأخطاء التي تدوم طويلاً.",
          ctaLabel: "عرض دليل الائتمان",
          href: "/parcours/guide/steps/bank",
        },
      },
      sections: {
        arrival: {
          title: "الوصول",
          hint: "راجعه فور الوصول لفهم الخطوات الرسمية.",
        },
        housing: {
          title: "السكن",
          hint: "اطلع عليه قبل أي زيارة أو دفع.",
        },
        health: {
          title: "الصحة",
          hint: "ابدأ به فور الوصول حتى قبل استلام البطاقة.",
        },
        jobs: {
          title: "العمل",
          hint: "مفيد للبحث عن عمل بدون الوقوع في الفخاخ.",
        },
        documents: {
          title: "الوثائق",
          hint: "جهّز أوراقك مرة واحدة لتوفير الوقت.",
        },
        transport: {
          title: "النقل",
          hint: "لفهم الرخصة والنقل حسب المقاطعة.",
        },
        credit: {
          title: "الائتمان",
          hint: "مفيد في الشهر الأول لتجنب أخطاء يصعب إصلاحها.",
        },
        taxes: {
          title: "الضرائب",
          hint: "لترتيب أوراقك وتخفيف ضغط الضرائب.",
        },
        integration: {
          title: "الاندماج",
          hint: "للعثور على مساعدة محلية وخدمات موثوقة.",
        },
      },
      ui: {
        recommendedStart: "⭐ موصى به للبدء",
        openResource: "فتح المورد",
        addFavorite: "أضف للمفضلة",
        seeGuide: "عرض الدليل المرتبط →",
        backToPath: "العودة إلى المسار →",
      },
    },
    resourcesPage: {
      labels: {
        eyebrow: "الموارد",
        title: "موارد رسمية ومجتمعية",
        subtitle: "روابط موثوقة ومصنفة حسب الحاجة.",
        searchPlaceholder: "ابحث (هجرة، صحة، عمل...)",
        provinceLabel: "المقاطعة",
        categoryLabel: "الفئة",
        filterAll: "الكل",
        officialLabel: "رسمي",
        recommendedLabel: "موصى به",
        openLabel: "فتح المورد",
        addFavoriteLabel: "اضافة للمفضلة",
        removeFavoriteLabel: "ازالة من المفضلة",
        emptyState: "لا توجد موارد مطابقة.",
        allProvincesLabel: "كندا",
        guideCalloutTitle: "رسالة اساسية",
        guideWhatTitle: "ما هو",
        guideWhyTitle: "لماذا هو مهم",
        guideHowTitle: "كيف تنجزه",
        guidePitfallsTitle: "اخطاء يجب تجنبها",
        guideActionsTitle: "خطوات مباشرة",
        guideSourcesTitle: "مصادر رسمية",
        guideActionPrompt: "جاهز لاتخاذ خطوة؟",
        guideEyebrow: "دليل",
      },
      provinceOptions: [
        { value: "qc", label: "كيبيك" },
        { value: "on", label: "اونتاريو" },
        { value: "bc", label: "كولومبيا البريطانية" },
        { value: "ab", label: "البرتا" },
        { value: "other", label: "مقاطعة اخرى" },
      ],
      categories: [
        { id: "arrival", title: "الوصول", description: "الوضع والتهيئة والاقامة." },
        { id: "housing", title: "السكن", description: "العقود والودائع والقواعد." },
        { id: "health", title: "الصحة", description: "بطاقة صحية وتغطية." },
        { id: "employment", title: "العمل", description: "فرص وحقوق ومعايير." },
        { id: "documents", title: "الوثائق", description: "الاوراق الاساسية والنسخ." },
        { id: "transport", title: "النقل", description: "الرخص وبطاقات النقل." },
        { id: "credit", title: "الائتمان", description: "السكور والممارسات." },
        { id: "taxes", title: "الضرائب", description: "التصريح والوثائق." },
        { id: "integration", title: "الاندماج", description: "خدمات محلية وشبكات." },
      ],
      items: {
        "arrival-services": {
          title: "خدمات القادمين الجدد",
          description: "معلومات وخدمات رسمية.",
        },
        ircc: {
          title: "IRCC - الهجرة",
          description: "البوابة الرسمية للهجرة.",
        },
        cmhc: {
          title: "CMHC - السكن",
          description: "ارشادات ومعلومات السكن.",
        },
        "tal-qc": {
          title: "هيئة السكن (QC)",
          description: "حقوق المستأجرين في كيبيك.",
        },
        "health-card": {
          title: "بطاقة الصحة",
          description: "العملية الرسمية وروابط المقاطعات.",
        },
        ramq: {
          title: "RAMQ (كيبيك)",
          description: "تغطية كيبيك الصحية.",
        },
        ohip: {
          title: "OHIP (اونتاريو)",
          description: "تغطية اونتاريو الصحية.",
        },
        msp: {
          title: "MSP (كولومبيا البريطانية)",
          description: "تغطية كولومبيا البريطانية.",
        },
        ahcip: {
          title: "AHCIP (البرتا)",
          description: "تغطية البرتا الصحية.",
        },
        jobbank: {
          title: "Job Bank",
          description: "وظائف رسمية.",
        },
        "labour-standards": {
          title: "حقوق العمل",
          description: "معايير وحماية رسمية.",
        },
        "documents-guide": {
          title: "دليل الوثائق",
          description: "قائمة الوثائق المطلوبة.",
        },
        "transport-guide": {
          title: "دليل النقل",
          description: "الرخص والخطوات حسب المقاطعة.",
        },
        "credit-guide": {
          title: "دليل الائتمان",
          description: "السكور والبداية الصحيحة.",
        },
        driving: {
          title: "رخصة القيادة",
          description: "معلومات القيادة الرسمية.",
        },
        saaq: {
          title: "SAAQ (كيبيك)",
          description: "رخص وقيادة كيبيك.",
        },
        "service-ontario-driving": {
          title: "ServiceOntario - رخصة",
          description: "القيادة في اونتاريو.",
        },
        icbc: {
          title: "ICBC (كولومبيا البريطانية)",
          description: "الرخص والتامين في C.B.",
        },
        "alberta-registries": {
          title: "Alberta registries",
          description: "رخص وخدمات البرتا.",
        },
        "credit-score": {
          title: "سكور الائتمان",
          description: "فهم وتحسين السكور.",
        },
        taxes: {
          title: "الضرائب (CRA)",
          description: "التصريح السنوي والوثائق.",
        },
        integration: {
          title: "211 كندا",
          description: "مساعدة محلية سريعة.",
        },
      },
      guides: {
        documents: {
          title: "الوثائق الاساسية",
          summary: "جهز اوراقك مرة واحدة لتسهيل كل خطوة.",
          callout: "نسخة واضحة توفر وقتا كبيرا.",
          what: "الوثائق مطلوبة في العمل والسكن والصحة.",
          why: ["تجنب تعطيل المعاملات", "توفير الوقت", "حماية الاصول"],
          how: ["امسح الجواز والتصاريح", "انشئ ملفا رقميا", "اطبع نسخا مهمة", "احتفظ بنسخة دون انترنت"],
          pitfalls: ["مشاركة الوثائق بدون تحقق", "فقدان الاصول", "عدم حفظ النسخ"],
          actions: ["انشاء قائمة وثائق", "مجلد سحابي امن"],
          ctaLabel: "قائمة وثائق للتحضير",
          ctaHref: "/checklist",
          sources: [{ name: "IRCC", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete.html" }],
        },
        transport: {
          title: "النقل والرخص",
          summary: "اعرف الخطوات حسب المقاطعة.",
          callout: "رخصة صالحة تعني امانا وحرية.",
          what: "الرخص وبطاقات النقل تختلف حسب المقاطعة.",
          why: ["تجنب الغرامات", "تنقل اسهل", "تامين صالح"],
          how: ["تحقق من القواعد", "جهز الوثائق", "احجز الاختبارات اذا لزم"],
          pitfalls: ["القيادة بدون رخصة", "تجاهل مهلة التحويل"],
          actions: ["اختر وسيلة نقل مؤقتة", "خطط لموعد"],
          ctaLabel: "خطوات الرخص حسب المقاطعة",
          ctaHref: "https://www.canada.ca/fr/services/transport/conduire.html",
          sources: [{ name: "Canada.ca", url: "https://www.canada.ca/fr/services/transport.html" }],
        },
        credit: {
          title: "الائتمان والسكور",
          summary: "ابدأ بشكل صحيح وتجنب الاخطاء.",
          callout: "البداية الصغيرة تصنع فرق كبير.",
          what: "السكور يؤثر على السكن والقروض.",
          why: ["شروط افضل", "تسهيل السكن", "سمعة مالية جيدة"],
          how: ["بطاقة مناسبة", "ادفع في الوقت", "خفض الاستخدام"],
          pitfalls: ["تأخير الدفع", "استخدام مفرط"],
          actions: ["متابعة السكور", "حفظ سجل نظيف"],
          ctaLabel: "فهم السكور والبداية الصحيحة",
          ctaHref: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/credit.html",
          sources: [{ name: "ACFC", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere.html" }],
        },
      },
    },
    guideOrder: ["nas", "sante", "banque", "telephone", "logement"],
    guides: {
      nas: {
        slug: "nas",
        title: "رقم التأمين الاجتماعي",
        icon: "IdCard",
        urgency: 9,
        sections: {
          description: {
            text: "رقم NAS يربطك بالضرائب والعمل والمزايا الفدرالية وهو شرط للعمل القانوني.",
            sources: [{ name: "Service Canada", url: "https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html" }],
          },
          why: {
            text: "بدون هذا الرقم لا يمكن لصاحب العمل دفع راتبك رسمياً وقد تتأخر اعتمادات الضرائب.",
            sources: [{ name: "Agence du revenu du Canada", url: "https://www.canada.ca/fr/agence-revenu.html" }],
          },
          documents: {
            items: [
              "جواز سفر ساري",
              "تصريح الدراسة أو العمل",
              "إثبات سكن كندي (عقد، فاتورة، رسالة استقبال)",
            ],
            sources: [{ name: "Service Canada – الوثائق المقبولة", url: "https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale/documents.html" }],
          },
          where: {
            text: "توجه إلى مركز Service Canada أو استخدم الخدمة الإلكترونية الرسمية إن كنت مؤهلاً.",
            sources: [{ name: "مواقع Service Canada", url: "https://catalogue.servicecanada.gc.ca/services/centre-service-canada" }],
          },
          cost: {
            text: "مجاني بالكامل، وأي جهة تطلب رسوماً مقابل الرقم تعد إشارة احتيال.",
            sources: [{ name: "Service Canada – أسئلة شائعة", url: "https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale/questions.html" }],
          },
          proTip: {
            text: "احتفظ بنسخة رقمية آمنة ولا تشارك الرقم إلا مع جهات رسمية (صاحب العمل، البنك، CRA).",
            sources: [{ name: "Service Canada – حماية NAS", url: "https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale/proteger.html" }],
          },
          fraudAlert: {
            text: "أي مكالمة تهددك بتجميد NAS مقابل غرامة هي احتيال. أبلغ الشرطة الكندية أو ASFC.",
            sources: [{ name: "ASFC – الإبلاغ عن الاحتيال", url: "https://www.cbsa-asfc.gc.ca/menu-fra.html" }],
          },
        },
      },
      sante: {
        slug: "sante",
        title: "بطاقة التأمين الصحي",
        icon: "HeartPulse",
        urgency: 8,
        sections: {
          description: {
            text: "كل مقاطعة تصدر بطاقة تأمين تغطي العلاجات الأساسية مثل الفحوصات والطوارئ.",
            sources: [{ name: "IRCC – النظام الصحي", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/apprendre-canada/soins-sante/systeme-soins-sante.html" }],
          },
          why: {
            text: "يوجد أحياناً تأخير حتى ثلاثة أشهر، لذلك امتلاك البطاقة مبكراً يحميك من فواتير ضخمة.",
            sources: [{ name: "RAMQ", url: "https://www.quebec.ca/sante/assurance-maladie" }],
          },
          documents: {
            items: [
              "هوية وجواز سفر",
              "تصريح الإقامة",
              "دليل السكن (عقد، فاتورة خدمات)",
            ],
            sources: [{ name: "ServiceOntario – OHIP", url: "https://www.ontario.ca/fr/page/obtenir-une-carte-sante" }],
          },
          where: {
            text: "احجز موعداً في المكتب الحكومي (RAMQ، ServiceOntario...) أو قدّم استمارة عبر الإنترنت إن توفرت.",
            sources: [{ name: "ServiceOntario", url: "https://www.ontario.ca/page/serviceontario" }],
          },
          cost: {
            text: "إصدار البطاقة مجاني لكن يُنصح بالتأمين الخاص المؤقت خلال فترة الانتظار.",
            sources: [{ name: "British Columbia – MSP", url: "https://www2.gov.bc.ca/gov/content/sante/assurance-sante-medicale" }],
          },
          proTip: {
            text: "احمل نسخة ورقية من الطلب ومتابعة البريد بانتظام لتجنب فقدان البطاقة.",
            sources: [{ name: "IRCC – نصائح التأمين الصحي", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/soins-sante/assurance-maladie.html" }],
          },
          fraudAlert: {
            text: "لا تدفع لأي موقع غير حكومي وابتعد عن الوسطاء الذين يزعمون تسريع البطاقة.",
            sources: [{ name: "Consumer Protection Ontario", url: "https://www.ontario.ca/page/consumer-protection-ontario" }],
          },
        },
      },
      banque: {
        slug: "banque",
        title: "حساب بنكي للوافدين",
        icon: "Wallet",
        urgency: 7,
        sections: {
          description: {
            text: "البنوك تقدم حزم وصول مجانية لمدة سنة تشمل بطاقة خصم وخدمات إلكترونية.",
            sources: [{ name: "ACFC – عروض الوافدين", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/comptes-bancaires/offres-bancaires-nouveaux-arrivants.html" }],
          },
          why: {
            text: "الحساب المحلي ضروري لتلقي الرواتب ودفع الإيجار وبناء تاريخ ائتماني.",
            sources: [{ name: "ACFC – إبراز الائتمان", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/credit.html" }],
          },
          documents: {
            items: [
              "هوية رسمية وجواز السفر",
              "تصريح الإقامة أو تأكيد الإقامة الدائمة",
              "عنوان كندي",
            ],
            sources: [{ name: "ACFC – فتح حساب", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/comptes-bancaires/ouvrir-compte-bancaire.html" }],
          },
          where: {
            text: "تواصل مع البنوك الخاضعة للتنظيم الفدرالي أو الاتحادات الائتمانية المعترف بها.",
            sources: [{ name: "اللائحة الفدرالية للبنوك", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/banques/liste.html" }],
          },
          cost: {
            text: "برامج newcomers عادةً مجانية لمدة 12 شهراً ثم تطبق الرسوم القياسية.",
            sources: [{ name: "ACFC – عروض الوافدين", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/comptes-bancaires/offres-bancaires-nouveaux-arrivants.html" }],
          },
          proTip: {
            text: "اطلب بطاقة ائتمان مضمونة بإيداع صغير لبدء تاريخك الائتماني بثقة.",
            sources: [{ name: "ACFC – بطاقات مضمونة", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/cartes-credit/garanties.html" }],
          },
          fraudAlert: {
            text: "أي طلب لتحويل أموال إلى حساب شخصي قبل فتح الحساب هو علامة احتيال.",
            sources: [{ name: "ACFC – الوقاية من الاحتيال", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/protection-fraude.html" }],
          },
        },
      },
      telephone: {
        slug: "telephone",
        title: "خطة الهاتف والبيانات",
        icon: "PhoneCall",
        urgency: 6,
        sections: {
          description: {
            text: "رقم كندي مطلوب لتفعيل أغلب الخدمات الحكومية والمصرفية.",
            sources: [{ name: "ISDE – خدمات لاسلكية", url: "https://ised-isde.canada.ca/site/services-telecommunications/fr/services-sans-fil" }],
          },
          why: {
            text: "التحقق الثنائي ورسائل الأمان غالباً ما تُرسل إلى رقم محلي خلال أولى خطواتك.",
            sources: [{ name: "CRTC – كود الخدمات اللاسلكية", url: "https://crtc.gc.ca/fra/phone/mobile/wirelesscode.htm" }],
          },
          documents: {
            items: [
              "هوية بالصور",
              "معلومات الاتصال الكندية",
              "في بعض الأحيان تحقق ائتماني للخطوط اللاحقة الدفع",
            ],
            sources: [{ name: "CRTC – الحقوق والالتزامات", url: "https://crtc.gc.ca/fra/phone/mobile/wirelesscode.htm" }],
          },
          where: {
            text: "اشتر الشريحة أو eSIM من متجر رسمي في المطار أو مراكز المبيعات المعتمدة.",
            sources: [{ name: "CRTC – قائمة المزودين", url: "https://crtc.gc.ca/fra/phone/mobile/tel.htm" }],
          },
          cost: {
            text: "الباقات المدفوعة مسبقاً تبدأ من 40$ تقريباً للشهر (20 غيغابايت) وتختلف بحسب المقاطعة.",
            sources: [{ name: "ISDE – مقارنة العروض", url: "https://www.ic.gc.ca/eic/site/086.nsf/fra/00006.html" }],
          },
          proTip: {
            text: "معلومة عامة: اختر BYOD (استعمل جهازك) لتفادي ربط العقد بتاريخ ائتماني غير مكتمل.",
            sources: [{ name: "CRTC – كود الخدمات اللاسلكية", url: "https://crtc.gc.ca/fra/phone/mobile/wirelesscode.htm" }],
          },
          fraudAlert: {
            text: "لا تدفع نقداً لمندوب غير معتمد ولا تشارك بيانات حسابك مع من يدعي تخفيض الفاتورة بدون مستند رسمي.",
            sources: [{ name: "ISDE – حماية المستهلك", url: "https://ised-isde.canada.ca/site/mesures-consommateurs/fr/protection-consommateur/fraude" }],
          },
        },
      },
      logement: {
        slug: "logement",
        title: "السكن والإيجار",
        icon: "Home",
        urgency: 8,
        sections: {
          description: {
            text: "عقد الإيجار الرسمي يحمي حقوقك ويحدد التزامات المالك والمستأجر.",
            sources: [{ name: "IRCC – السكن", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/vie-canada/logement.html" }],
          },
          why: {
            text: "الالتزام بالقوانين يمنع عمليات الاحتيال ويحفظ الودائع ومواعيد الزيادات.",
            sources: [{ name: "SCHL – حقوق المستأجر", url: "https://www.cmhc-schl.gc.ca/fr/consommateurs" }],
          },
          documents: {
            items: [
              "إثبات الدخل أو خطاب العمل",
              "مراجع سكنية أو مهنية",
              "كشف حساب بنكي حديث",
            ],
            sources: [{ name: "SCHL – دليل الإيجار", url: "https://www.cmhc-schl.gc.ca/fr/consommateurs/guide-location" }],
          },
          where: {
            text: "قم بجولة في السكن وتواصل فقط مع الملاك أو الوكلاء المرخصين في المقاطعة.",
            sources: [{ name: "Tribunal administratif du logement", url: "https://www.tal.gouv.qc.ca" }],
          },
          cost: {
            text: "عدد الأشهر المسموح بها كضمان يختلف حسب المقاطعة (مثلاً شهر واحد في أونتاريو).",
            sources: [{ name: "Ontario – ودائع الإيجار", url: "https://www.ontario.ca/fr/page/loyer-depot" }],
          },
          proTip: {
            text: "استعمل التحويلات البنكية أو الشيكات فقط واحفظ كل المراسلات عبر البريد الإلكتروني.",
            sources: [{ name: "ACFC – التحويلات الإلكترونية", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/transferts-electroniques.html" }],
          },
          fraudAlert: {
            text: "لا تحول المال قبل توقيع العقد الرسمي وتجنب الإعلانات التي ترفض الزيارات.",
            sources: [{ name: "GRC – احتيال الإيجار", url: "https://www.grc-rcmp.gc.ca/fr/escroqueries-locatives" }],
          },
        },
      },
    },
    globalDisclaimer: "معلومات وإرشاد فقط. تحقق بنفسك من المتطلبات على المواقع الرسمية قبل الحضور.",
    antiFraud: {
      title: "النزاهة ومكافحة الاحتيال",
      body: "لا نقدم وعوداً بتسريع الهجرة ولا ننتج وثائق غير قانونية. نعتمد فقط على المصادر الرسمية.",
      note: "أبلغ أي محاولة مشبوهة إلى ASFC أو IRCC فوراً.",
    },
    scams: {
      ...arScamsContent,
      guides: {
        logement: {
          subtitle: 'عمليات الاحتيال الشائعة المتعلقة بالإيجار.',
          scenario: [
            'إعلان جيد جداً ليكون حقيقياً (سعر منخفض، صور مثالية).',
            'المالك في الخارج ولا يمكنه القيام بزيارة.',
            'طلب تحويل الأموال قبل أي زيارة أو توقيع عقد إيجار.',
            'الضغط لاتخاذ قرار سريع والدفع فوراً.',
          ],
          redFlags: [
            'طلب وديعة أمنية عالية أو "رسوم ملف" غير قابلة للاسترداد.',
            'التواصل عبر البريد الإلكتروني أو الرسائل الفورية فقط، وليس عبر الهاتف.',
            'الرفض لتقديم عنوان فعلي أو السماح بزيارة العقار.',
            'عقد إيجار يحتوي على بنود غير عادية أو تعسفية.',
          ],
          actions: [
            'المطالبة بزيارة فعلية للعقار.',
            'التحقق من هوية المالك وشرعية الإعلان.',
            'عدم تحويل الأموال أبداً قبل توقيع عقد إيجار قانوني واستلام المفاتيح.',
            'استخدام وسائل دفع قابلة للتتبع (شيك، تحويل بنكي).',
          ],
          mantra: 'لا زيارة = لا مال.',
        },
        emploi: {
          subtitle: 'عمليات الاحتيال المتعلقة بعروض العمل والتوظيف.',
          scenario: [
            'عرض عمل غير مرغوب فيه براتب غير واقعي.',
            'طلب دفع مقابل المواد، التدريب، أو فحص السجل الجنائي.',
            'مقابلة عمل عبر الرسائل الفورية دون اتصال صوتي أو فيديو.',
            'الضغط لتقديم معلومات شخصية (رقم التأمين الاجتماعي، الحساب البنكي) مبكراً جداً.',
          ],
          redFlags: [
            'أخطاء إملائية ونحوية في عرض العمل.',
            'عنوان بريد إلكتروني عام (Gmail, Outlook) للموظف.',
            'عملية توظيف سريعة بشكل غير طبيعي وبدون تحقق.',
            'طلب شراء معدات مع وعد بالاسترداد.',
          ],
          actions: [
            'البحث عن الشركة والموظف على LinkedIn أو موقعهم الرسمي.',
            'عدم الدفع أبداً مقابل وظيفة أو "رسوم ملف".',
            'عدم تقديم رقم التأمين الاجتماعي أو التفاصيل المصرفية قبل توقيع عقد.',
            'استخدام موقع Guichet-Emplois الرسمي للتحقق من شرعية العروض.',
          ],
          mantra: 'الوظيفة الحقيقية لا تطلب رسوماً أبداً.',
        },
        telephone: {
          subtitle: 'عمليات الاحتيال المتعلقة بباقات الهاتف المحمول وخدمات الهاتف.',
          scenario: [
            'مكالمات غير مرغوب فيها تعد بخصومات لا تصدق على الباقات.',
            'الضغط لتغيير المزود أو الاشتراك في خيارات غير مرغوب فيها.',
            'فواتير مفاجئة برسوم خفية أو خدمات غير مصرح بها.',
            'سرقة البيانات الشخصية بحجة "التحقق من الحساب".',
          ],
          redFlags: [
            'عروض جيدة جداً لدرجة أنها لا تصدق، "فقط اليوم".',
            'طلب معلومات شخصية (كلمة المرور، رقم التأمين الاجتماعي) عبر الهاتف.',
            'ممثل عدواني أو يرفض تقديم معلومات واضحة.',
            'صعوبة إلغاء خدمة أو الحصول على استرداد.',
          ],
          actions: [
            'عدم مشاركة معلومات حساسة عبر الهاتف أبداً.',
            'التحقق من العروض مباشرة على المواقع الرسمية للمشغلين.',
            'قراءة العقود بعناية قبل التوقيع.',
            'الاتصال بـ CRTC أو المشغل في حالة وجود نزاع.',
          ],
          mantra: 'اقرأ كل شيء، خاصة الرسوم.',
        },
        banque: {
          subtitle: 'عمليات الاحتيال المالية والمصرفية.',
          scenario: [
            'مكالمات أو رسائل بريد إلكتروني تنتحل صفة البنك تطلب معلومات سرية.',
            'الضغط لإجراء تحويل عاجل "لتأمين" حسابك.',
            'عروض قروض أو بطاقات ائتمان بدون فحص ائتماني (سهل جداً).',
            'تصيد: مواقع بنكية وهمية لسرقة بيانات الاعتماد الخاصة بك.',
          ],
          redFlags: [
            'طلب رقم التعريف الشخصي الخاص بك، كلمة المرور أو رموز التحقق.',
            'عجلة قصوى، تهديدات بإغلاق الحساب أو ملاحقات قضائية.',
            'روابط مشبوهة في رسائل البريد الإلكتروني أو الرسائل النصية القصيرة.',
            'أخطاء إملائية في المراسلات الرسمية.',
          ],
          actions: [
            'عدم النقر أبداً على الروابط المشبوهة أو الاستجابة لطلبات المعلومات السرية.',
            'الاتصال ببنكك مباشرة عبر الرقم الرسمي في حالة الشك.',
            'التحقق من عنوان URL لمواقع البنوك (https، قفل).',
            'الإبلاغ عن محاولات الاحتيال إلى بنكك والشرطة.',
          ],
          mantra: 'بنكك لا يطلب رقم التعريف الشخصي الخاص بك أبداً.',
        },
        immigration: {
          subtitle: 'عمليات الاحتيال المتعلقة بخدمات الهجرة والوكلاء الوهميين.',
          scenario: [
            'وعود بفيزا أو إقامة دائمة مضمونة، بدون شروط.',
            'طلب دفع مبالغ عالية مقابل خدمات مجانية أو منخفضة التكلفة.',
            'وكلاء هجرة وهميون يتصلون بك عبر البريد الإلكتروني أو الهاتف.',
            'طلب وثائق أصلية أو أموال نقدية.',
          ],
          redFlags: [
            'رسوم خفية أو غير مفصلة.',
            'الضغط للتحرك بسرعة أو تفويت "عرض حصري".',
            'استخدام وسائل دفع غير رسمية (عملات مشفرة، بطاقات هدايا).',
            'عدم وجود ترخيص أو رقم تسجيل للمستشار.',
          ],
          actions: [
            'التحقق من شرعية مستشاري الهجرة على المواقع الرسمية (IRCC, ICCRC).',
            'عدم الدفع أبداً مقابل خدمات مجانية عبر الحكومة.',
            'عدم إرسال الوثائق الأصلية أبداً بدون نسخة مصدقة.',
            'الاحتفاظ بجميع المراسلات وإثباتات الدفع.',
          ],
          mantra: 'لا أحد يستطيع ضمان الحصول على فيزا.',
        },
        marketplace: {
          subtitle: 'عمليات الاحتيال عند الشراء أو البيع على المنصات الإلكترونية.',
          scenario: [
            'بائع يطلب دفعاً مقدماً عبر وسيلة غير آمنة.',
            'مشتري يقترح دفع أكثر من السعر المطلوب ويطلب استرداد جزء من المبلغ.',
            'الضغط لإتمام الصفقة خارج المنصة.',
            'منتج أو خدمة لا تتوافق مع الإعلان بعد الدفع.',
          ],
          redFlags: [
            'ملف البائع/المشتري حديث أو بمعلومات قليلة.',
            'الرفض للقاء شخصياً للتبادل.',
            'طلب رموز التحقق من البطاقة أو الوصول إلى الحساب البنكي.',
            'استخدام رسائل عامة أو منسوخة-ملصقة.',
          ],
          actions: [
            'تفضيل التسليم اليدوي والدفع نقداً عند اللقاء.',
            'استخدام منصات دفع آمنة (PayPal, Stripe) إذا كانت متاحة.',
            'الحذر من العروض المغرية جداً.',
            'الإبلاغ عن الملفات الشخصية أو الإعلانات المشبوهة للمنصة.',
          ],
          mantra: 'لا لقاء = لا شراء.',
        },
      },
    },
    guidePage: {
      subtitle: "خمس خطوات مرتبة حسب الاستعجال لتقليل التوتر وإبقاء الصورة واضحة.",
      ctaLabel: "ابدأ بالحصول على رقم NAS",
      infoPill: "أهم 5 خطوات",
      priorityLegend: "10 = عاجل الآن، 1 = للتخطيط.",
      timelineTitle: "المسار السريع",
      timelineSubtitle: "خريطة مبسطة تفهمك الترتيب قبل قراءة التفاصيل.",
      groups: [
        {
          title: "الوضع القانوني والصحة",
          description: "ثبّت حقك في العمل وغطاءك الصحي قبل أي التزام آخر.",
          slugs: ["nas", "sante"],
        },
        {
          title: "الخدمات اليومية",
          description: "أمّن السكن، المال والاتصال للأشهر الأولى.",
          slugs: ["logement", "banque", "telephone"],
        },
      ],
    },
    newsletter: {
      title: "انضم إلى المتابعين",
      description: "بريد شهري قصير مع أهم الروابط والتحذيرات.",
      placeholder: "you@email.com",
      cta: "سجّل بريدك",
      successTitle: "أهلاً بك!",
      successBody: "ستصلك موارد دقيقة قريباً.",
      error: "تعذر الإرسال الآن.",
    },
    floatingCta: {
      label: "تحتاج مساعدة؟",
      href: "mailto:contact@marhabancanada.ca",
    },
    footer: {
      disclaimer: "هذا الموقع يقدم خدمة مرافقة وتوجيه، ولا يُعتبر بديلاً عن الخدمات الحكومية الرسمية.",
      rights: "© 2025 Marhaban Canada. جميع الحقوق محفوظة.",
    },
    shared: {
      sourceLabel: "المصدر",
      officialLink: "رابط رسمي",
      budgetLegend: "الإيجار + النقل + البقالة × معامل الأسرة.",
      disclaimer: "معلومات وإرشاد فقط. عد دائماً إلى المواقع الرسمية.",
      radarTitle: "رادار مكافحة الاحتيال",
      radarBody: "تحقق من هوية الأطراف، لا تدفع عبر بطاقات هدايا واحتفظ بنسخ رقمية لكل إيصال.",
      sourcesIntro: "كل توصية مبنية على موقع حكومي أو جهة عامة يمكن التحقق منها.",
      viewAllSteps: "عرض كل الخطوات",
      sectionLabels: {
        what: "ما هو؟",
        why: "لماذا هو مهم؟",
        how: "كيفية التنفيذ",
        avoid: "ما يجب تجنبه",
        sources: "مصادر رسمية",
      },
    },
  },
};

const enContent: LocaleContent = {
  ...baseContent.fr,
  locale: "en",
  dir: "ltr",
  microcopy: {
    homeTitle: "First steps after your arrival in Canada",
    homeSubtitle: "Marhaban Canada is a settlement guidance and support service for newcomers to Canada.",
    homeCtaPrimary: "Start the journey",
    homeCtaSub: "Free · Based on official sources · No sign-up",
    journeyTitle: "Your arrival journey",
    journeySubtitle: "A clear order to get started calmly.",
    phaseWeek1Title: "Week 1",
    phaseWeek1Desc: "These steps help you get set up quickly. Take them one by one.",
    phaseMonth1Title: "Month 1",
    phaseMonth1Desc: "Nothing urgent. Continue when you are ready.",
    phaseOngoingTitle: "Ongoing",
    phaseOngoingDesc: "Keep these in mind for the weeks ahead.",
    breadcrumbHome: "Home",
    breadcrumbJourney: "Journey",
    breadcrumbGuide: "Guide",
    breadcrumbBlog: "Blog",
    youAreHere: "You are here",
    statusInStep: "You are at {step} ({phase}). A good place to start.",
    nextStepLabel: "Next step",
    backLabel: "Back",
    backToJourneyLabel: "Back to journey",
    recommendedNextStepTitle: "Recommended next step",
    recommendedNextStepDesc: "When you're ready, you can continue with the next guide.",
    viewGuideCta: "View the guide",
    relatedArticlesTitle: "Related articles",
    priorityReadsTitle: "Priority reads",
    priorityReadsDesc: "If you just arrived, start with these.",
    searchPlaceholder: "Search (housing, credit, NAS...)",
  },
  resources: {
    header: {
      title: "Official and community resources",
      subtitle: "Verified links, organized by need.",
      searchPlaceholder: "Search a resource (housing, health, jobs...)",
      provinceLabel: "Province",
      categoryLabel: "Category",
    },
    accompaniment: {
      shortDefinition:
        "This site provides a settlement guidance and support service. It does not replace official government services.",
      noProxyLine: "We do not perform any official procedure on your behalf.",
      footerHelp:
        "Need help knowing what to do first? The settlement guidance service can orient you based on your situation.",
    },
    quickGuides: {
      documentsCard: {
        title: "Essential documents",
        body: "Prepare your papers once to avoid delays.",
        ctaLabel: "View the documents guide",
        href: "/parcours/guide/steps/integration",
      },
      transportCard: {
        title: "Transport and licensing",
        body: "Understand local rules before driving.",
        ctaLabel: "View the transport guide",
        href: "/parcours/guide/steps/license",
      },
      creditCard: {
        title: "Credit and banking",
        body: "Avoid mistakes that last for a long time.",
        ctaLabel: "View the credit guide",
        href: "/parcours/guide/steps/bank",
      },
    },
    sections: {
      arrival: {
        title: "Arrival",
        hint: "Read this as soon as you arrive to understand official steps.",
      },
      housing: {
        title: "Housing",
        hint: "Check this before any visit or deposit.",
      },
      health: {
        title: "Health",
        hint: "Do this right away, even if the card is not here yet.",
      },
      jobs: {
        title: "Jobs",
        hint: "Useful for job searching without falling into traps.",
      },
      documents: {
        title: "Documents",
        hint: "Prepare your papers once and save time.",
      },
      transport: {
        title: "Transport",
        hint: "Understand licensing and transport by province.",
      },
      credit: {
        title: "Credit",
        hint: "Useful in the first month to avoid long-term mistakes.",
      },
      taxes: {
        title: "Taxes",
        hint: "Keep your documents and avoid tax season stress.",
      },
      integration: {
        title: "Integration",
        hint: "Find local help and reliable services.",
      },
    },
    ui: {
      recommendedStart: "⭐ Recommended to start",
      openResource: "Open the resource",
      addFavorite: "Add to favorites",
      seeGuide: "See the related guide →",
      backToPath: "Back to the journey →",
    },
  },
  scams: {
    ...enScamsContent,
    guides: {
      logement: {
        subtitle: 'Common scams related to renting.',
        scenario: [
          'An ad too good to be true (low price, perfect photos).',
          'The landlord is abroad and cannot arrange a visit.',
          'Request for money transfer before any visit or lease signing.',
          'Pressure to decide quickly and pay immediately.',
        ],
        redFlags: [
          'Request for a high security deposit or non-refundable "application fees".',
          'Communication only by email or instant messaging, never by phone.',
          'Refusal to provide a physical address or to visit the accommodation.',
          'Lease agreement with unusual or abusive clauses.',
        ],
        actions: [
          'Demand a physical visit of the accommodation.',
          'Verify the landlord\'s identity and the legality of the advertisement.',
          'Never transfer money before signing a legal lease and receiving the keys.',
          'Use traceable payment methods (cheque, bank transfer).',
        ],
        mantra: 'No visit = no money.',
      },
      emploi: {
        subtitle: 'Scams related to job offers and recruitment.',
        scenario: [
          'Unsolicited job offer with an unrealistic salary.',
          'Request for payment for materials, training, or a background check.',
          'Job interview via instant messaging without voice or video contact.',
          'Pressure to provide personal information (SIN, bank account) too early.',
        ],
        redFlags: [
          'Spelling and grammar errors in the job offer.',
          'Generic email address (Gmail, Outlook) for the recruiter.',
          'Abnormally fast recruitment process without verification.',
          'Request to buy back equipment with promised reimbursement.',
        ],
        actions: [
          'Research the company and recruiter on LinkedIn or their official website.',
          'Never pay for a job or "application fees".',
          'Never provide SIN or bank details before a signed contract.',
          'Use the official Job Bank to verify the legitimacy of offers.',
        ],
        mantra: 'A real job never asks for fees.',
      },
      telephone: {
        subtitle: 'Scams related to mobile plans and phone services.',
        scenario: [
          'Unsolicited calls promising incredible discounts on plans.',
          'Pressure to switch providers or subscribe to unwanted options.',
          'Surprise billing with hidden fees or unauthorized services.',
          'Theft of personal data under the pretext of "account verification".',
        ],
        redFlags: [
          'Offers too good to be true, "only today".',
          'Request for personal information (password, SIN) over the phone.',
          'Aggressive representative or refusing to provide clear information.',
          'Difficulty canceling a service or getting a refund.',
        ],
        actions: [
          'Never share sensitive information over the phone.',
          'Verify offers directly on official operator websites.',
          'Read contracts carefully before signing.',
          'Contact the CRTC or the operator in case of a dispute.',
        ],
        mantra: 'Read everything, especially the fees.',
      },
      banque: {
        subtitle: 'Financial and banking scams.',
        scenario: [
          'Calls or emails impersonating your bank asking for confidential information.',
          'Pressure to make an urgent transfer to "secure" your account.',
          'Offers of loans or credit cards without credit check (too easy).',
          'Phishing: fake banking websites to steal your credentials.',
        ],
        redFlags: [
          'Request for your PIN, password or verification codes.',
          'Extreme urgency, threats of account closure or legal action.',
          'Suspicious links in emails or SMS.',
          'Spelling errors in official communications.',
        ],
        actions: [
          'Never click on suspicious links or respond to requests for confidential information.',
          'Contact your bank directly via the official number if in doubt.',
          'Verify the URL of banking websites (https, padlock).',
          'Report fraud attempts to your bank and the police.',
        ],
        mantra: 'Your bank never asks for your PIN.',
      },
      immigration: {
        subtitle: 'Scams related to immigration services and fake consultants.',
        scenario: [
          'Promises of guaranteed visa or permanent residency, without conditions.',
          'Request for high payment for services that are free or inexpensive.',
          'Fake immigration agents contacting you by email or phone.',
          'Request for original documents or cash.',
        ],
        redFlags: [
          'Hidden or undetailed fees.',
          'Pressure to act quickly or miss an "exclusive offer".',
          'Use of unofficial payment channels (crypto, gift cards).',
          'Lack of license or registration number for the consultant.',
        ],
        actions: [
          'Verify the legitimacy of immigration consultants on official websites (IRCC, ICCRC).',
          'Never pay for services that are free through the government.',
          'Never send original documents without a certified copy.',
          'Keep all communications and proof of payment.',
        ],
        mantra: 'No one can guarantee a visa.',
      },
      marketplace: {
        subtitle: 'Scams when buying or selling on online platforms.',
        scenario: [
          'Seller asking for advance payment via an insecure method.',
          'Buyer offering to pay more than the asking price and requesting a partial refund.',
          'Pressure to complete the transaction off-platform.',
          'Product or service not conforming to the advertisement after payment.',
        ],
        redFlags: [
          'Seller/buyer profile is recent or with little information.',
          'Refusal to meet in person for the exchange.',
          'Request for card verification codes or bank account access.',
          'Use of generic or copy-pasted messages.',
        ],
        actions: [
          'Prioritize in-person delivery and cash payment at the meeting.',
          'Use secure payment platforms (PayPal, Stripe) if available.',
          'Be wary of overly tempting offers.',
          'Report suspicious profiles or ads to the platform.',
        ],
        mantra: 'No meeting = no purchase.',
      },
    },
  },
  serviceAccompagnementDefinition: {
    title: "Settlement support service",
    body: "A service that guides, explains, and directs newcomers, step by step, without acting on their behalf and without charging for official procedures. The goal is to help users understand, avoid mistakes, and move forward safely, using official sources only.",
  },
  serviceAccompagnementWhatIs: [
    "Clear orientation for newcomers",
    "Simple explanations of official steps",
    "Help understanding the correct order of actions",
    "Prevention of common mistakes and scams",
    "Redirection to official sources only",
    "Human, calm, non-judgmental support",
  ],
  serviceAccompagnementWhatIsNot: [
    "Not a government service",
    "Not an immigration service",
    "Not a paid agent or consultant",
    "We do not submit applications on your behalf",
    "We do not book appointments for you",
    "We do not charge for official services",
  ],
  serviceAccompagnementWhatIsTitle: "What this service is",
  serviceAccompagnementWhatIsNotTitle: "What this service is not",
  serviceAccompagnementNoProxy: "We do not perform any official procedure on your behalf.",
  serviceAccompagnementPillar:
    "Marhaban Canada is a settlement guidance and support service for newcomers to Canada.",
  serviceAccompagnementDisclaimer:
    "This site provides a settlement guidance and support service. It does not replace official government services.",
  seoDescriptions: {
    meta: "Settlement support service for newcomers in Canada: official steps, housing, banking, phone plans, scam prevention.",
    og: "Settlement support service for newcomers in Canada: official steps, housing, banking, phone plans, scam prevention.",
    pdfHeader: "Settlement support service for newcomers in Canada: official steps, housing, banking, phone plans, scam prevention.",
  },
  footer: {
    ...baseContent.fr.footer,
    disclaimer:
      "This site provides a settlement guidance and support service. It does not replace official government services.",
  },
};

export const siteContent: Record<Locale, LocaleContent> = {
  ...baseContent,
  en: enContent,
};

export const getContent = (locale: Locale): LocaleContent => siteContent[locale] ?? siteContent[defaultLocale];
