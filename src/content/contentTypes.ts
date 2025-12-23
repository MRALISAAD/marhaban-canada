import type { Locale } from '@/i18n/locales';

export type Source = {
  name: string;
  url: string;
};

export type StepId =
  | "nas"
  | "phone"
  | "bank"
  | "housing"
  | "license"
  | "health"
  | "taxes"
  | "networking"
  | "integration";

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
  startHousingSubtext?: string;
  startHousingCta: string;
  startHousingCtaAria?: string;
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
  victimTitle: string;
  victimSubtitle: string;
  victimPlanSteps: string[];
};

export type ScamHousingContent = {
  rules: string[];
  planSteps: string[];
};

export type ScamGuideContentDetails = {
  title?: string;
  subtitle: string;
  scenario: string[];
  redFlags: string[];
  actions: string[];
  mantra: string;
  neverDo?: string[];
  sources?: { label: string; href: string }[];
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
    mottoLabel: string;
    whyIntroLabel: string;
    howIntroLabel: string;
    docsLabel: string;
    docsIntroLabel: string;
    avoidIntroLabel: string;
    smartTipsLabel: string;
    noCommitmentLabel: string;
    continueWhenReadyLabel: string;
    guideStartLabel: string;
    guideEndLabel: string;
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
    mission?: string;
    quickGuidesTitle?: string;
    sources?: string;
    copyright?: string;
  };
  guides: Record<string, Guide>;
  guideOrder: string[];
  globalDisclaimer: string;
  contactPage: {
    title: string;
    question: string;
    writeToUs: string;
    privacy: string;
    responseTime: string;
    disclaimer: string;
    intro?: string;
    safetyNote: string;
    formName: string;
    formEmail: string;
    formMessage: string;
    formTopic: string;
    formTopicOptions: { value: string; label: string }[];
    formSubmit: string;
    formSuccess: string;
    formError: string;
    secondaryLinks: {
      legal: string;
      scams: string;
      checklist: string;
    };
  };
  aboutPage: {
    title: string;
    intro: string;
    mission: {
      title: string;
      content: string;
    };
    whatWeDo: {
      title: string;
      items: string[];
    };
    whatWeDontDo: {
      title: string;
      items: string[];
    };
    sources: {
      title: string;
      intro: string;
      examples: string[];
    };
    cta: {
      label: string;
      href: string;
    };
  };
  legalPage: {
    title: string;
    editor: {
      title: string;
      content: string;
    };
    usage: {
      title: string;
      content: string;
    };
    responsibilities: {
      title: string;
      content: string;
    };
    dataProtection: {
      title: string;
      whatLabel: string;
      what: string;
      whyLabel: string;
      why: string;
      retentionLabel: string;
      retention: string;
    };
    cookies: {
      title: string;
      content: string;
    };
    intellectualProperty: {
      title: string;
      content: string;
    };
    contact: {
      title: string;
      email: string;
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
    sectionLabels: {
      what: string;
      why: string;
      how: string;
      avoid: string;
      sources: string;
      docs?: string;
      smartTips?: string;
    };
    easyReadOn: string;
    easyReadOff: string;
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
    footer?: {
      tagline: string;
      contact: string;
      privacy: string;
      legal: string;
    };
  };
};