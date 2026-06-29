import type { Locale } from '@/i18n/locales';

export type ResourceGuideSlug =
  | 'transport'
  | 'logement'
  | 'banque'
  | 'documents'
  | 'ecole'
  | 'travail'
  | 'sante';

export const RESOURCE_GUIDE_SLUGS: ResourceGuideSlug[] = [
  'transport',
  'logement',
  'banque',
  'documents',
  'ecole',
  'travail',
  'sante',
];

export function isResourceGuideSlug(s: string): s is ResourceGuideSlug {
  return (RESOURCE_GUIDE_SLUGS as string[]).includes(s);
}

export type LocaleGuideContent = {
  title: string;
  description: string;
  hero: { eyebrow: string; title: string; text: string };
  intro: string;
  stepsTitle: string;
  steps: string[];
  mistakesTitle: string;
  mistakes: string[];
  linksTitle: string;
  links: { label: string; href: string }[];
  ctaFree: string;
  ctaOrientation: string;
  disclaimer: string;
};

export type ResourceGuide = {
  slug: ResourceGuideSlug;
  fr: LocaleGuideContent;
  en: LocaleGuideContent;
  ar: LocaleGuideContent;
};

const guides: ResourceGuide[] = [
  {
    slug: 'transport',
    fr: {
      title: 'Transport au Canada',
      description:
        'Comprendre les premières options pour se déplacer : transport en commun, carte de transport, permis de conduire, voiture, assurance et erreurs à éviter.',
      hero: {
        eyebrow: 'RESSOURCE',
        title: 'Se déplacer au Canada',
        text: 'Transport en commun, permis de conduire, voiture : comprendre les bases sans se perdre.',
      },
      intro:
        'Au Canada, les transports varient beaucoup selon la ville et la province. Dans les grandes villes, le transport en commun est fiable. Hors des centres urbains, une voiture peut être nécessaire. Voici les points à connaître pour bien démarrer.',
      stepsTitle: 'Premières étapes',
      steps: [
        "Obtenir une carte de transport en commun locale (OPUS à Montréal, PRESTO à Toronto, Compass à Vancouver) dès les premiers jours.",
        "Vérifier si votre permis de conduire étranger est valide dans votre province — la durée varie selon les accords bilatéraux.",
        "Si vous conduisez, comprendre les règles de passage du permis étranger au permis provincial (délai, tests requis).",
        "Avant d'acheter une voiture, calculer tous les coûts : immatriculation, assurance, inspection, entretien.",
        "Comparer les apps de covoiturage (Uber, Lyft) et les options de location à court terme (Communauto, Zipcar) avant d'investir dans un véhicule.",
      ],
      mistakesTitle: 'Erreurs fréquentes',
      mistakes: [
        "Acheter une voiture dès l'arrivée sans vérifier si un permis étranger est temporairement accepté.",
        "Oublier de transférer le permis de conduire dans le délai légal — certaines provinces l'exigent dans les 60 à 90 jours.",
        "Sous-estimer le coût de l'assurance auto, surtout sans historique de conduite au Canada.",
        "Ignorer les options de transport en commun qui peuvent être plus économiques et pratiques en zone urbaine.",
        "Conduire sans assurance valide au Canada — c'est obligatoire et les amendes sont sévères.",
      ],
      linksTitle: 'Ressources officielles',
      links: [
        {
          label: 'Transport en commun — Montréal (STM)',
          href: 'https://www.stm.info/fr',
        },
        {
          label: 'Permis de conduire — SAAQ (Québec)',
          href: 'https://saaq.gouv.qc.ca/permis-de-conduire',
        },
        {
          label: "Permis de conduire — Ontario (ServiceOntario)",
          href: 'https://www.ontario.ca/fr/page/conduite-en-ontario',
        },
        {
          label: 'Transport en commun — PRESTO (Ontario)',
          href: 'https://www.prestocard.ca/fr',
        },
      ],
      ctaFree: 'Réserver un appel gratuit — 15 min',
      ctaOrientation: 'Appel orientation — 45 min',
      disclaimer:
        'Marhaban Canada offre un accompagnement général et informatif. Ce service ne remplace pas un avocat, un consultant réglementé en immigration ou un organisme gouvernemental.',
    },
    en: {
      title: 'Getting around in Canada',
      description:
        'Understand your first transportation options: public transit, transit cards, driver\'s licence, car, insurance, and mistakes to avoid.',
      hero: {
        eyebrow: 'RESOURCE',
        title: 'Getting around in Canada',
        text: 'Public transit, driver\'s licence, car: understand the basics without getting lost.',
      },
      intro:
        'Transportation in Canada varies widely by city and province. In major cities, public transit is reliable. Outside urban centres, a car may be necessary. Here are the key points to get started.',
      stepsTitle: 'First steps',
      steps: [
        'Get a local transit card right away (OPUS in Montreal, PRESTO in Toronto, Compass in Vancouver).',
        "Check if your foreign driver's licence is valid in your province — validity periods vary by bilateral agreements.",
        "If you drive, understand the process for converting your foreign licence to a provincial one (deadlines, tests required).",
        'Before buying a car, calculate all costs: registration, insurance, inspection, maintenance.',
        'Compare ridesharing apps (Uber, Lyft) and short-term rentals (Communauto, Zipcar) before investing in a vehicle.',
      ],
      mistakesTitle: 'Common mistakes',
      mistakes: [
        "Buying a car right away without checking if your foreign licence is temporarily accepted.",
        "Forgetting to transfer your driver's licence within the legal deadline — some provinces require it within 60–90 days.",
        'Underestimating car insurance costs, especially without a Canadian driving history.',
        'Ignoring public transit options that may be more economical and practical in urban areas.',
        'Driving without valid Canadian insurance — it is mandatory and fines are severe.',
      ],
      linksTitle: 'Official resources',
      links: [
        {
          label: 'Public transit — Montreal (STM)',
          href: 'https://www.stm.info/en',
        },
        {
          label: "Driver's licence — Ontario (ServiceOntario)",
          href: 'https://www.ontario.ca/en/page/driving-ontario',
        },
        {
          label: 'Public transit — PRESTO (Ontario)',
          href: 'https://www.prestocard.ca/en',
        },
      ],
      ctaFree: 'Book a free call — 15 min',
      ctaOrientation: 'Orientation call — 45 min',
      disclaimer:
        'Marhaban Canada provides general and informational support. This service does not replace a lawyer, a regulated immigration consultant, or a government body.',
    },
    ar: {
      title: 'التنقل في كندا',
      description:
        'فهم الخيارات الأولى للتنقل: وسائل النقل العام، بطاقة النقل، رخصة القيادة، السيارة، التأمين والأخطاء الشائعة.',
      hero: {
        eyebrow: 'مورد',
        title: 'التنقل في كندا',
        text: 'وسائل النقل العام، رخصة القيادة، السيارة: افهم الأساسيات بدون تعقيد.',
      },
      intro:
        'يختلف النقل في كندا كثيراً حسب المدينة والمقاطعة. في المدن الكبرى، وسائل النقل العام موثوقة. خارج المراكز الحضرية قد تحتاج سيارة. إليك النقاط الأساسية للبداية.',
      stepsTitle: 'الخطوات الأولى',
      steps: [
        'احصل على بطاقة النقل المحلية فور وصولك (OPUS في مونتريال، PRESTO في تورنتو، Compass في فانكوفر).',
        'تحقق مما إذا كانت رخصة قيادتك الأجنبية صالحة في مقاطعتك — تتفاوت المدة حسب الاتفاقيات.',
        'إذا كنت تقود، افهم إجراءات تحويل رخصتك الأجنبية إلى رخصة إقليمية.',
        'قبل شراء سيارة، احسب جميع التكاليف: التسجيل، التأمين، الفحص، الصيانة.',
        'قارن بين تطبيقات مشاركة السيارات (Uber, Lyft) وخيارات الإيجار قصير المدى قبل شراء مركبة.',
      ],
      mistakesTitle: 'الأخطاء الشائعة',
      mistakes: [
        'شراء سيارة فور الوصول دون التحقق من صلاحية الرخصة الأجنبية.',
        'نسيان تحويل رخصة القيادة ضمن المهلة القانونية.',
        'التقليل من تكلفة التأمين على السيارات خاصة بدون سجل قيادة كندي.',
        'تجاهل خيارات النقل العام الأكثر اقتصادية في المناطق الحضرية.',
        'القيادة بدون تأمين كندي ساري — إلزامي والغرامات صارمة.',
      ],
      linksTitle: 'الموارد الرسمية',
      links: [
        {
          label: 'النقل العام — مونتريال (STM)',
          href: 'https://www.stm.info/fr',
        },
        {
          label: 'رخصة القيادة — كيبيك (SAAQ)',
          href: 'https://saaq.gouv.qc.ca/permis-de-conduire',
        },
      ],
      ctaFree: 'احجز مكالمة مجانية — 15 دقيقة',
      ctaOrientation: 'مكالمة توجيه — 45 دقيقة',
      disclaimer:
        'تقدم مرحبا كندا دعماً عاماً وإعلامياً. لا يحل هذا الخدمة محل محامٍ أو مستشار هجرة مرخص أو جهة حكومية.',
    },
  },
  {
    slug: 'logement',
    fr: {
      title: 'Logement',
      description:
        "Comprendre les bases pour chercher un logement, éviter les pièges, préparer ses documents et poser les bonnes questions avant de payer.",
      hero: {
        eyebrow: 'RESSOURCE',
        title: 'Trouver un logement',
        text: 'Bail, dépôt, droits du locataire : les bases pour louer en toute confiance.',
      },
      intro:
        "Trouver un logement au Canada peut sembler complexe, surtout sans historique de crédit local. Il est important de comprendre vos droits, de préparer les bons documents et de reconnaître les annonces douteuses avant d'envoyer de l'argent.",
      stepsTitle: 'Premières étapes',
      steps: [
        "Préparer vos documents avant de chercher : pièce d'identité, preuves de revenus, lettres de référence si possible.",
        "Vérifier les sites de référence pour les annonces légitimes : Kijiji, RentCanada, PadMapper, Centris (au Québec).",
        "Visiter le logement en personne ou en vidéo avec le propriétaire avant tout paiement.",
        "Lire le bail attentivement avant de signer — au Québec, le bail standard de la RDQ est recommandé.",
        "Comprendre vos droits en tant que locataire, notamment sur le dépôt de garantie (interdit au Québec).",
        "Conserver des copies de tous les documents signés et des paiements effectués.",
      ],
      mistakesTitle: 'Erreurs fréquentes',
      mistakes: [
        "Envoyer un dépôt ou premier mois de loyer sans avoir visité le logement.",
        "Signer un bail sans l'avoir lu complètement ou sans en comprendre les clauses.",
        "Croire qu'un propriétaire peut demander plusieurs mois de loyer à l'avance — c'est illégal au Québec.",
        "Oublier de documenter l'état du logement à l'entrée (photos, rapport d'état des lieux).",
        "Ignorer les signaux d'une arnaque : loyer trop bas, propriétaire indisponible pour visiter, pression pour payer vite.",
      ],
      linksTitle: 'Ressources officielles',
      links: [
        {
          label: 'Tribunal administratif du logement (TAL) — Québec',
          href: 'https://www.tal.gouv.qc.ca',
        },
        {
          label: 'CMHC — Trouver un logement au Canada',
          href: 'https://www.cmhc-schl.gc.ca/fr/consumers/renting',
        },
        {
          label: 'LégisQuébec — Loi sur le bail',
          href: 'https://www.legisquebec.gouv.qc.ca',
        },
      ],
      ctaFree: 'Réserver un appel gratuit — 15 min',
      ctaOrientation: 'Appel orientation — 45 min',
      disclaimer:
        'Marhaban Canada offre un accompagnement général et informatif. Ce service ne remplace pas un avocat, un consultant réglementé en immigration ou un organisme gouvernemental.',
    },
    en: {
      title: 'Housing',
      description:
        'Understand the basics for finding housing, avoiding traps, preparing your documents, and asking the right questions before paying.',
      hero: {
        eyebrow: 'RESOURCE',
        title: 'Finding housing',
        text: 'Lease, deposit, tenant rights: the basics for renting with confidence.',
      },
      intro:
        'Finding housing in Canada can seem complex, especially without a local credit history. It is important to understand your rights, prepare the right documents, and recognize suspicious listings before sending money.',
      stepsTitle: 'First steps',
      steps: [
        'Prepare your documents before searching: ID, proof of income, reference letters if possible.',
        'Check trusted listing sites: Kijiji, RentCanada, PadMapper, Centris (in Quebec).',
        'Visit the unit in person or by video with the landlord before any payment.',
        'Read the lease carefully before signing — in Quebec, the standard RDQ lease is recommended.',
        'Understand your rights as a tenant, including rules on security deposits (not allowed in Quebec).',
        'Keep copies of all signed documents and payments.',
      ],
      mistakesTitle: 'Common mistakes',
      mistakes: [
        'Sending a deposit or first month\'s rent without having visited the unit.',
        'Signing a lease without reading it or understanding the clauses.',
        'Believing a landlord can ask for several months of rent upfront — illegal in Quebec.',
        'Forgetting to document the state of the unit upon entry (photos, inspection report).',
        'Ignoring scam signals: price too low, landlord unavailable to visit, pressure to pay quickly.',
      ],
      linksTitle: 'Official resources',
      links: [
        {
          label: 'Rental Housing Tribunal (TAL) — Quebec',
          href: 'https://www.tal.gouv.qc.ca',
        },
        {
          label: 'CMHC — Renting in Canada',
          href: 'https://www.cmhc-schl.gc.ca/en/consumers/renting',
        },
      ],
      ctaFree: 'Book a free call — 15 min',
      ctaOrientation: 'Orientation call — 45 min',
      disclaimer:
        'Marhaban Canada provides general and informational support. This service does not replace a lawyer, a regulated immigration consultant, or a government body.',
    },
    ar: {
      title: 'السكن',
      description:
        'فهم الأساسيات للبحث عن سكن وتجنب الفخاخ وتحضير الوثائق وطرح الأسئلة الصحيحة قبل الدفع.',
      hero: {
        eyebrow: 'مورد',
        title: 'إيجاد سكن',
        text: 'عقد الإيجار، الوديعة، حقوق المستأجر: الأساسيات للاستئجار بثقة.',
      },
      intro:
        'قد يبدو إيجاد سكن في كندا معقداً، خاصة بدون سجل ائتماني محلي. من المهم فهم حقوقك وتحضير الوثائق الصحيحة والتعرف على الإعلانات المشبوهة قبل إرسال الأموال.',
      stepsTitle: 'الخطوات الأولى',
      steps: [
        'حضّر وثائقك قبل البحث: هوية، إثبات دخل، رسائل مرجعية إن أمكن.',
        'تحقق من مواقع الإعلانات الموثوقة: Kijiji, RentCanada, PadMapper.',
        'قم بزيارة الوحدة شخصياً أو عبر مكالمة فيديو مع المالك قبل أي دفع.',
        'اقرأ عقد الإيجار بعناية قبل التوقيع.',
        'افهم حقوقك كمستأجر بما فيها قواعد الودائع (محظورة في كيبيك).',
        'احتفظ بنسخ من جميع الوثائق الموقعة والمدفوعات.',
      ],
      mistakesTitle: 'الأخطاء الشائعة',
      mistakes: [
        'إرسال وديعة أو إيجار الشهر الأول دون زيارة الوحدة.',
        'توقيع عقد إيجار دون قراءته أو فهم بنوده.',
        'الاعتقاد بأن المالك يمكنه طلب عدة أشهر مقدماً — غير قانوني في كيبيك.',
        'نسيان توثيق حالة الوحدة عند الدخول.',
        'تجاهل إشارات الاحتيال: سعر منخفض جداً، مالك غير متاح للزيارة، ضغط للدفع بسرعة.',
      ],
      linksTitle: 'الموارد الرسمية',
      links: [
        {
          label: 'محكمة الإسكان الإدارية (TAL) — كيبيك',
          href: 'https://www.tal.gouv.qc.ca',
        },
        {
          label: 'CMHC — الاستئجار في كندا',
          href: 'https://www.cmhc-schl.gc.ca/fr/consumers/renting',
        },
      ],
      ctaFree: 'احجز مكالمة مجانية — 15 دقيقة',
      ctaOrientation: 'مكالمة توجيه — 45 دقيقة',
      disclaimer:
        'تقدم مرحبا كندا دعماً عاماً وإعلامياً. لا يحل هذا الخدمة محل محامٍ أو مستشار هجرة مرخص أو جهة حكومية.',
    },
  },
  {
    slug: 'banque',
    fr: {
      title: 'Banque et argent',
      description:
        "Comprendre comment ouvrir un compte, gérer ses premières dépenses, éviter les frais inutiles et reconnaître les situations douteuses.",
      hero: {
        eyebrow: 'RESSOURCE',
        title: 'Banque et argent',
        text: "Ouvrir un compte, comprendre les frais, éviter les pièges : les bases pour gérer son argent au Canada.",
      },
      intro:
        "Ouvrir un compte bancaire est l'une des premières démarches après l'arrivée au Canada. Même sans emploi ni crédit, la plupart des banques acceptent d'ouvrir un compte de base. Voici ce qu'il faut savoir.",
      stepsTitle: 'Premières étapes',
      steps: [
        "Ouvrir un compte bancaire dès l'arrivée, de préférence dans une grande banque (RBC, TD, Scotiabank, BMO, CIBC, Desjardins au Québec).",
        "Apporter les documents requis : passeport, permis de séjour, adresse au Canada.",
        "Demander un compte sans frais ou à frais réduits — plusieurs banques offrent des comptes spéciaux pour les nouveaux arrivants.",
        "Commencer à construire un historique de crédit dès que possible (carte de crédit sécurisée, paiements à temps).",
        "Comparer les services de transfert international avant d'en utiliser un (Wise, Remitly, Western Union).",
      ],
      mistakesTitle: 'Erreurs fréquentes',
      mistakes: [
        "Utiliser des services de transfert informels qui ne sont pas réglementés.",
        "Partager ses informations bancaires par email ou téléphone sans vérification.",
        "Oublier de vérifier les frais mensuels d'un compte avant de signer.",
        "Ne pas commencer à construire son crédit pendant les premiers mois — cela retarde l'accès à des services comme les prêts ou les locations.",
        "Envoyer de l'argent à quelqu'un qu'on ne connaît pas en personne sous prétexte d'une bonne affaire ou d'une aide.",
      ],
      linksTitle: 'Ressources officielles',
      links: [
        {
          label: 'ACFC — Trouver le bon compte bancaire',
          href: 'https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/banques-comparatifs.html',
        },
        {
          label: "CDIC — Protection des dépôts au Canada",
          href: 'https://www.cdic.ca/fr',
        },
        {
          label: "Construire son crédit au Canada — Equifax",
          href: 'https://www.consumer.equifax.ca/fr/personnel/education/comment-etablir-credit-canada/',
        },
      ],
      ctaFree: 'Réserver un appel gratuit — 15 min',
      ctaOrientation: 'Appel orientation — 45 min',
      disclaimer:
        'Marhaban Canada offre un accompagnement général et informatif. Ce service ne remplace pas un avocat, un consultant réglementé en immigration ou un organisme gouvernemental.',
    },
    en: {
      title: 'Banking and money',
      description:
        'Understand how to open an account, manage your first expenses, avoid unnecessary fees, and recognize suspicious situations.',
      hero: {
        eyebrow: 'RESOURCE',
        title: 'Banking and money',
        text: 'Open an account, understand fees, avoid traps: the basics for managing money in Canada.',
      },
      intro:
        'Opening a bank account is one of the first steps after arriving in Canada. Even without employment or credit, most banks will open a basic account. Here is what you need to know.',
      stepsTitle: 'First steps',
      steps: [
        'Open a bank account as soon as you arrive, preferably at a major bank (RBC, TD, Scotiabank, BMO, CIBC, or Desjardins in Quebec).',
        'Bring required documents: passport, residence permit, Canadian address.',
        'Ask for a no-fee or low-fee account — many banks offer special accounts for newcomers.',
        'Start building a credit history as soon as possible (secured credit card, on-time payments).',
        'Compare international transfer services before using one (Wise, Remitly, Western Union).',
      ],
      mistakesTitle: 'Common mistakes',
      mistakes: [
        'Using informal, unregulated transfer services.',
        'Sharing banking information by email or phone without verification.',
        'Not checking monthly account fees before signing up.',
        'Not starting to build credit in the first months — this delays access to services like loans or rentals.',
        'Sending money to someone you don\'t know in person under the pretense of a good deal or help.',
      ],
      linksTitle: 'Official resources',
      links: [
        {
          label: 'FCAC — Find the right bank account',
          href: 'https://www.canada.ca/en/financial-consumer-agency/services/banking-comparison.html',
        },
        {
          label: 'CDIC — Deposit protection in Canada',
          href: 'https://www.cdic.ca',
        },
      ],
      ctaFree: 'Book a free call — 15 min',
      ctaOrientation: 'Orientation call — 45 min',
      disclaimer:
        'Marhaban Canada provides general and informational support. This service does not replace a lawyer, a regulated immigration consultant, or a government body.',
    },
    ar: {
      title: 'البنك والمال',
      description:
        'فهم كيفية فتح حساب وإدارة نفقاتك الأولى وتجنب الرسوم غير الضرورية والتعرف على المواقف المشبوهة.',
      hero: {
        eyebrow: 'مورد',
        title: 'البنك والمال',
        text: 'فتح حساب، فهم الرسوم، تجنب الفخاخ: الأساسيات لإدارة أموالك في كندا.',
      },
      intro:
        'فتح حساب مصرفي هو من أولى الخطوات بعد الوصول إلى كندا. حتى بدون عمل أو ائتمان، معظم البنوك تقبل فتح حساب أساسي. إليك ما تحتاج معرفته.',
      stepsTitle: 'الخطوات الأولى',
      steps: [
        'افتح حساباً مصرفياً فور وصولك، ويفضل في بنك كبير (RBC, TD, Scotiabank, BMO, CIBC, Desjardins في كيبيك).',
        'أحضر الوثائق المطلوبة: جواز السفر، تصريح الإقامة، عنوانك في كندا.',
        'اطلب حساباً بدون رسوم أو برسوم منخفضة — بنوك كثيرة تقدم حسابات خاصة للقادمين الجدد.',
        'ابدأ ببناء سجل ائتماني في أقرب وقت (بطاقة ائتمان مضمونة، دفعات في الوقت المحدد).',
        'قارن خدمات التحويل الدولي قبل استخدامها (Wise, Remitly, Western Union).',
      ],
      mistakesTitle: 'الأخطاء الشائعة',
      mistakes: [
        'استخدام خدمات تحويل غير رسمية وغير منظمة.',
        'مشاركة المعلومات المصرفية عبر البريد الإلكتروني أو الهاتف دون تحقق.',
        'عدم التحقق من الرسوم الشهرية للحساب قبل التسجيل.',
        'عدم البدء ببناء الائتمان في الأشهر الأولى مما يؤخر الوصول إلى خدمات كالقروض.',
        'إرسال أموال لشخص لا تعرفه شخصياً بحجة صفقة جيدة أو مساعدة.',
      ],
      linksTitle: 'الموارد الرسمية',
      links: [
        {
          label: 'ACFC — العثور على الحساب المصرفي المناسب',
          href: 'https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/banques-comparatifs.html',
        },
        {
          label: 'CDIC — حماية الودائع في كندا',
          href: 'https://www.cdic.ca/fr',
        },
      ],
      ctaFree: 'احجز مكالمة مجانية — 15 دقيقة',
      ctaOrientation: 'مكالمة توجيه — 45 دقيقة',
      disclaimer:
        'تقدم مرحبا كندا دعماً عاماً وإعلامياً. لا يحل هذا الخدمة محل محامٍ أو مستشار هجرة مرخص أو جهة حكومية.',
    },
  },
  {
    slug: 'documents',
    fr: {
      title: 'Documents importants',
      description:
        "Organiser les documents essentiels après l'arrivée et comprendre quoi garder, quoi vérifier et quoi ne jamais partager trop vite.",
      hero: {
        eyebrow: 'RESSOURCE',
        title: 'Documents importants',
        text: "Numéro d'assurance sociale, permis, RAMQ : les documents essentiels à organiser dès l'arrivée.",
      },
      intro:
        "À l'arrivée au Canada, plusieurs documents officiels sont à obtenir rapidement. Voici les principaux, leur ordre de priorité, et les erreurs à éviter pour ne pas se retrouver bloqué dans ses démarches.",
      stepsTitle: 'Premières étapes',
      steps: [
        "Obtenir le Numéro d'Assurance Sociale (NAS) — indispensable pour travailler légalement.",
        "S'inscrire à l'assurance maladie provinciale dès que possible (RAMQ au Québec, OHIP en Ontario).",
        "Obtenir une carte de bibliothèque ou un accès local pour avoir une preuve d'adresse.",
        "Préparer des copies physiques et numériques de tous les documents importants.",
        "Ne jamais envoyer des copies de documents d'identité par email non sécurisé sans comprendre pourquoi c'est demandé.",
      ],
      mistakesTitle: 'Erreurs fréquentes',
      mistakes: [
        "Partager son NAS avec un employeur avant d'avoir signé un contrat ou vérifié son identité.",
        "Laisser ses documents originaux chez quelqu'un (propriétaire, employeur) — c'est illégal d'exiger cela.",
        "Oublier de renouveler son permis de séjour ou son titre de voyage avant l'expiration.",
        "Ne pas conserver une copie numérique sécurisée de ses documents dans le cloud.",
        "Répondre à des demandes de documents par téléphone ou email non sollicités sans vérification.",
      ],
      linksTitle: 'Ressources officielles',
      links: [
        {
          label: "Numéro d'assurance sociale (NAS) — Service Canada",
          href: 'https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html',
        },
        {
          label: "RAMQ — Inscription à l'assurance maladie (Québec)",
          href: 'https://www.ramq.gouv.qc.ca/fr/citoyens/assurance-maladie/inscription',
        },
        {
          label: "IRCC — Renouveler son permis",
          href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/renouveler-permis.html',
        },
      ],
      ctaFree: 'Réserver un appel gratuit — 15 min',
      ctaOrientation: 'Appel orientation — 45 min',
      disclaimer:
        'Marhaban Canada offre un accompagnement général et informatif. Ce service ne remplace pas un avocat, un consultant réglementé en immigration ou un organisme gouvernemental.',
    },
    en: {
      title: 'Important documents',
      description:
        'Organize essential documents after arrival and understand what to keep, what to check, and what never to share too quickly.',
      hero: {
        eyebrow: 'RESOURCE',
        title: 'Important documents',
        text: 'SIN, permits, health card: the essential documents to organize upon arrival.',
      },
      intro:
        'Upon arriving in Canada, several official documents must be obtained quickly. Here are the main ones, their priority order, and mistakes to avoid so you don\'t get stuck in your process.',
      stepsTitle: 'First steps',
      steps: [
        'Obtain your Social Insurance Number (SIN) — required to work legally.',
        'Register for provincial health insurance as soon as possible (RAMQ in Quebec, OHIP in Ontario).',
        'Get a library card or local access to have proof of address.',
        'Prepare physical and digital copies of all important documents.',
        'Never send copies of identity documents by unsecured email without understanding why they are requested.',
      ],
      mistakesTitle: 'Common mistakes',
      mistakes: [
        'Sharing your SIN with an employer before signing a contract or verifying their identity.',
        'Leaving original documents with someone (landlord, employer) — it is illegal for them to require this.',
        'Forgetting to renew your residence permit or travel document before expiry.',
        'Not keeping a secure digital copy of your documents in the cloud.',
        'Responding to document requests by phone or unsolicited email without verification.',
      ],
      linksTitle: 'Official resources',
      links: [
        {
          label: 'Social Insurance Number (SIN) — Service Canada',
          href: 'https://www.canada.ca/en/employment-social-development/services/sin.html',
        },
        {
          label: 'OHIP — Health card (Ontario)',
          href: 'https://www.ontario.ca/page/apply-ohip-and-get-health-card',
        },
      ],
      ctaFree: 'Book a free call — 15 min',
      ctaOrientation: 'Orientation call — 45 min',
      disclaimer:
        'Marhaban Canada provides general and informational support. This service does not replace a lawyer, a regulated immigration consultant, or a government body.',
    },
    ar: {
      title: 'الوثائق المهمة',
      description:
        'تنظيم الوثائق الأساسية بعد الوصول وفهم ما يجب الاحتفاظ به وما يجب التحقق منه وما لا يجب مشاركته بسرعة.',
      hero: {
        eyebrow: 'مورد',
        title: 'الوثائق المهمة',
        text: 'رقم التأمين الاجتماعي، التصاريح، بطاقة الصحة: الوثائق الأساسية للتنظيم عند الوصول.',
      },
      intro:
        'عند الوصول إلى كندا، يجب الحصول على عدة وثائق رسمية بسرعة. إليك الوثائق الرئيسية وترتيب أولوياتها والأخطاء الواجب تجنبها.',
      stepsTitle: 'الخطوات الأولى',
      steps: [
        'احصل على رقم التأمين الاجتماعي (SIN) — ضروري للعمل بشكل قانوني.',
        'سجّل في التأمين الصحي الإقليمي في أقرب وقت (RAMQ في كيبيك، OHIP في أونتاريو).',
        'احصل على بطاقة مكتبة أو وصول محلي كإثبات عنوان.',
        'حضّر نسخاً ورقية ورقمية من جميع الوثائق المهمة.',
        'لا ترسل نسخاً من وثائق الهوية عبر بريد إلكتروني غير آمن دون فهم سبب الطلب.',
      ],
      mistakesTitle: 'الأخطاء الشائعة',
      mistakes: [
        'مشاركة رقم التأمين الاجتماعي مع صاحب عمل قبل توقيع عقد أو التحقق من هويته.',
        'ترك الوثائق الأصلية مع شخص ما (مالك، صاحب عمل) — هذا غير قانوني.',
        'نسيان تجديد تصريح الإقامة قبل انتهاء صلاحيته.',
        'عدم الاحتفاظ بنسخة رقمية آمنة من وثائقك.',
        'الرد على طلبات الوثائق عبر الهاتف أو البريد غير المطلوب دون تحقق.',
      ],
      linksTitle: 'الموارد الرسمية',
      links: [
        {
          label: 'رقم التأمين الاجتماعي (SIN) — Service Canada',
          href: 'https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html',
        },
        {
          label: 'RAMQ — التسجيل في التأمين الصحي (كيبيك)',
          href: 'https://www.ramq.gouv.qc.ca/fr/citoyens/assurance-maladie/inscription',
        },
      ],
      ctaFree: 'احجز مكالمة مجانية — 15 دقيقة',
      ctaOrientation: 'مكالمة توجيه — 45 دقيقة',
      disclaimer:
        'تقدم مرحبا كندا دعماً عاماً وإعلامياً. لا يحل هذا الخدمة محل محامٍ أو مستشار هجرة مرخص أو جهة حكومية.',
    },
  },
  {
    slug: 'ecole',
    fr: {
      title: 'École et études',
      description:
        "Comprendre les premières démarches liées aux études, à l'inscription, aux documents scolaires et aux ressources disponibles.",
      hero: {
        eyebrow: 'RESSOURCE',
        title: 'École et études',
        text: "Inscription, documents, ressources scolaires : les étapes clés pour les familles et les étudiants.",
      },
      intro:
        "Que vous soyez parent d'un enfant scolarisable ou étudiant en formation, le système scolaire canadien a ses propres règles d'accès. Voici les points essentiels pour bien démarrer.",
      stepsTitle: 'Premières étapes',
      steps: [
        "Identifier la commission scolaire ou le conseil scolaire de votre secteur selon votre adresse.",
        "Rassembler les documents pour l'inscription : preuve de résidence, carnet de vaccination, dossier scolaire antérieur.",
        "Comprendre les délais d'accès à la RAMQ/assurance santé avant d'inscrire les enfants (certaines écoles demandent une preuve).",
        "Pour les étudiants post-secondaires : vérifier les conditions du permis d'études et les restrictions de travail.",
        "Se renseigner sur les ressources d'aide à l'intégration linguistique (classes PELO, francisation, cours de langues).",
      ],
      mistakesTitle: 'Erreurs fréquentes',
      mistakes: [
        "Attendre trop longtemps avant de contacter la commission scolaire — les délais d'inscription existent.",
        "Oublier de faire mettre à jour les vaccins avant l'inscription — certaines écoles l'exigent.",
        "Ne pas vérifier si le permis d'études autorise le travail à temps partiel pendant les études.",
        "Confondre commission scolaire francophone et anglophone selon votre situation linguistique.",
        "Ignorer les programmes de soutien scolaire et d'intégration disponibles gratuitement.",
      ],
      linksTitle: 'Ressources officielles',
      links: [
        {
          label: "Ministère de l'Éducation — Québec",
          href: 'https://www.education.gouv.qc.ca/parents/inscriptions-scolaires',
        },
        {
          label: "Francisation en ligne — Québec",
          href: 'https://www.immigrationquebec.gouv.qc.ca/fr/langue-francaise/francisation/',
        },
        {
          label: "Permis d'études — IRCC",
          href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/etudier-canada/permis-etudes.html',
        },
      ],
      ctaFree: 'Réserver un appel gratuit — 15 min',
      ctaOrientation: 'Appel orientation — 45 min',
      disclaimer:
        'Marhaban Canada offre un accompagnement général et informatif. Ce service ne remplace pas un avocat, un consultant réglementé en immigration ou un organisme gouvernemental.',
    },
    en: {
      title: 'School and education',
      description:
        'Understand the first steps related to studies, enrollment, school documents, and available resources.',
      hero: {
        eyebrow: 'RESOURCE',
        title: 'School and education',
        text: 'Enrollment, documents, school resources: key steps for families and students.',
      },
      intro:
        'Whether you are a parent with a school-age child or a student in training, the Canadian school system has its own access rules. Here are the key points to get started.',
      stepsTitle: 'First steps',
      steps: [
        'Identify the school board or district in your area based on your address.',
        'Gather enrollment documents: proof of residence, vaccination record, previous school records.',
        'Understand health insurance (RAMQ/provincial) access timelines before enrolling children.',
        'For post-secondary students: check study permit conditions and work restrictions.',
        'Ask about language integration support resources (PELO classes, francization, language courses).',
      ],
      mistakesTitle: 'Common mistakes',
      mistakes: [
        'Waiting too long to contact the school board — enrollment deadlines exist.',
        'Forgetting to update vaccinations before enrollment — some schools require it.',
        'Not checking if the study permit allows part-time work during studies.',
        'Confusing francophone and anglophone school boards based on your language situation.',
        'Ignoring free school support and integration programs available.',
      ],
      linksTitle: 'Official resources',
      links: [
        {
          label: 'Study permit — IRCC',
          href: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html',
        },
        {
          label: 'Ontario school enrollment',
          href: 'https://www.ontario.ca/page/send-your-child-school',
        },
      ],
      ctaFree: 'Book a free call — 15 min',
      ctaOrientation: 'Orientation call — 45 min',
      disclaimer:
        'Marhaban Canada provides general and informational support. This service does not replace a lawyer, a regulated immigration consultant, or a government body.',
    },
    ar: {
      title: 'المدرسة والدراسة',
      description:
        'فهم الخطوات الأولى المتعلقة بالدراسة والتسجيل والوثائق المدرسية والموارد المتاحة.',
      hero: {
        eyebrow: 'مورد',
        title: 'المدرسة والدراسة',
        text: 'التسجيل، الوثائق، الموارد المدرسية: الخطوات الرئيسية للعائلات والطلاب.',
      },
      intro:
        'سواء كنت والداً لطفل في سن الدراسة أو طالباً، للنظام التعليمي الكندي قواعده الخاصة للوصول. إليك النقاط الأساسية للبداية.',
      stepsTitle: 'الخطوات الأولى',
      steps: [
        'حدد مجلس المدرسة في منطقتك بناءً على عنوانك.',
        'اجمع وثائق التسجيل: إثبات الإقامة، سجل التطعيمات، السجلات المدرسية السابقة.',
        'افهم مواعيد الوصول إلى التأمين الصحي قبل تسجيل الأطفال.',
        'للطلاب في التعليم العالي: تحقق من شروط تصريح الدراسة وقيود العمل.',
        'اسأل عن موارد دعم الاندماج اللغوي المتاحة.',
      ],
      mistakesTitle: 'الأخطاء الشائعة',
      mistakes: [
        'الانتظار طويلاً قبل الاتصال بمجلس المدرسة — مواعيد التسجيل موجودة.',
        'نسيان تحديث التطعيمات قبل التسجيل.',
        'عدم التحقق مما إذا كان تصريح الدراسة يسمح بالعمل بدوام جزئي.',
        'الخلط بين المجالس المدرسية الناطقة بالفرنسية والإنجليزية.',
        'تجاهل برامج الدعم والاندماج المدرسي المجانية المتاحة.',
      ],
      linksTitle: 'الموارد الرسمية',
      links: [
        {
          label: 'تصريح الدراسة — IRCC',
          href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/etudier-canada/permis-etudes.html',
        },
        {
          label: 'وزارة التعليم — كيبيك',
          href: 'https://www.education.gouv.qc.ca/parents/inscriptions-scolaires',
        },
      ],
      ctaFree: 'احجز مكالمة مجانية — 15 دقيقة',
      ctaOrientation: 'مكالمة توجيه — 45 دقيقة',
      disclaimer:
        'تقدم مرحبا كندا دعماً عاماً وإعلامياً. لا يحل هذا الخدمة محل محامٍ أو مستشار هجرة مرخص أو جهة حكومية.',
    },
  },
  {
    slug: 'travail',
    fr: {
      title: 'Travail',
      description:
        "Comprendre les premières étapes pour chercher un emploi, préparer son CV, éviter les fausses offres et reconnaître les demandes suspectes.",
      hero: {
        eyebrow: 'RESSOURCE',
        title: 'Trouver du travail',
        text: "CV, permis, offres d'emploi : les points à vérifier avant de postuler ou d'accepter.",
      },
      intro:
        "Chercher un emploi au Canada demande de comprendre un marché différent : CV adapté, références locales, et reconnaissance des pièges fréquents. Voici les bases pour avancer sans se perdre.",
      stepsTitle: 'Premières étapes',
      steps: [
        "Vérifier que votre permis de travail est valide et en vérifier les restrictions éventuelles (employeur spécifique, secteur, durée).",
        "Adapter son CV au format canadien : 1 à 2 pages, sans photo ni âge, orienté résultats.",
        "Utiliser les plateformes recommandées : Indeed, LinkedIn, Jobboom (Québec), Guichet emploi (gouvernement).",
        "Se connecter aux organismes d'aide à l'emploi pour les immigrants (Emploi-Québec, ACCES Emploi, COSTI).",
        "Faire valider ses diplômes et compétences si nécessaire (organismes de reconnaissance professionnelle).",
      ],
      mistakesTitle: 'Erreurs fréquentes',
      mistakes: [
        "Accepter une offre d'emploi qui demande de payer pour obtenir le poste — c'est une arnaque.",
        "Partager son NAS ou ses documents bancaires pendant le processus de candidature.",
        "Ne pas vérifier l'existence de l'entreprise avant de passer un entretien ou d'envoyer des documents.",
        "S'attendre à trouver rapidement un emploi dans son domaine sans valider ses qualifications au préalable.",
        "Ignorer les droits du travail : salaire minimum, heures supplémentaires, droit au refus de tâches dangereuses.",
      ],
      linksTitle: 'Ressources officielles',
      links: [
        {
          label: "Guichet emploi — Gouvernement du Canada",
          href: 'https://www.guichetemplois.gc.ca',
        },
        {
          label: "Emploi-Québec — Aide à l'emploi",
          href: 'https://www.emploiquebec.gouv.qc.ca',
        },
        {
          label: "Normes du travail — Québec (CNESST)",
          href: 'https://www.cnesst.gouv.qc.ca/fr',
        },
      ],
      ctaFree: 'Réserver un appel gratuit — 15 min',
      ctaOrientation: 'Appel orientation — 45 min',
      disclaimer:
        'Marhaban Canada offre un accompagnement général et informatif. Ce service ne remplace pas un avocat, un consultant réglementé en immigration ou un organisme gouvernemental.',
    },
    en: {
      title: 'Work',
      description:
        'Understand the first steps for job hunting, preparing your resume, avoiding fake offers, and recognizing suspicious requests.',
      hero: {
        eyebrow: 'RESOURCE',
        title: 'Finding work',
        text: 'Resume, permit, job offers: points to check before applying or accepting.',
      },
      intro:
        'Finding work in Canada requires understanding a different market: adapted resume, local references, and recognizing common traps. Here are the basics to move forward without getting lost.',
      stepsTitle: 'First steps',
      steps: [
        'Verify that your work permit is valid and check for any restrictions (specific employer, sector, duration).',
        'Adapt your resume to the Canadian format: 1–2 pages, no photo or age, results-oriented.',
        'Use recommended platforms: Indeed, LinkedIn, Jobboom (Quebec), Job Bank (government).',
        'Connect with immigrant employment support organizations (Emploi-Quebec, ACCES Emploi, COSTI).',
        'Get your diplomas and skills validated if necessary (professional recognition bodies).',
      ],
      mistakesTitle: 'Common mistakes',
      mistakes: [
        'Accepting a job offer that asks you to pay to get the position — it\'s a scam.',
        'Sharing your SIN or banking documents during the application process.',
        'Not verifying the company\'s existence before an interview or sending documents.',
        'Expecting to quickly find work in your field without first validating your qualifications.',
        'Ignoring labour rights: minimum wage, overtime, right to refuse dangerous tasks.',
      ],
      linksTitle: 'Official resources',
      links: [
        {
          label: 'Job Bank — Government of Canada',
          href: 'https://www.jobbank.gc.ca',
        },
        {
          label: 'Ontario Labour Standards',
          href: 'https://www.ontario.ca/page/employment-standards-ontario',
        },
      ],
      ctaFree: 'Book a free call — 15 min',
      ctaOrientation: 'Orientation call — 45 min',
      disclaimer:
        'Marhaban Canada provides general and informational support. This service does not replace a lawyer, a regulated immigration consultant, or a government body.',
    },
    ar: {
      title: 'العمل',
      description:
        'فهم الخطوات الأولى للبحث عن عمل وإعداد السيرة الذاتية وتجنب العروض المزيفة والتعرف على الطلبات المشبوهة.',
      hero: {
        eyebrow: 'مورد',
        title: 'إيجاد عمل',
        text: 'السيرة الذاتية، التصريح، عروض العمل: النقاط الواجب التحقق منها قبل التقديم أو القبول.',
      },
      intro:
        'البحث عن عمل في كندا يتطلب فهم سوق مختلف: سيرة ذاتية مكيّفة، مراجع محلية، والتعرف على الفخاخ الشائعة. إليك الأساسيات للمضي قدماً.',
      stepsTitle: 'الخطوات الأولى',
      steps: [
        'تحقق من صلاحية تصريح العمل وأي قيود عليه (صاحب عمل محدد، قطاع، مدة).',
        'كيّف سيرتك الذاتية للتنسيق الكندي: 1-2 صفحات، بدون صورة أو عمر، موجّهة بالنتائج.',
        'استخدم المنصات الموصى بها: Indeed, LinkedIn, Guichet emploi (حكومية).',
        'تواصل مع منظمات دعم التوظيف للمهاجرين.',
        'احصل على تقييم شهاداتك ومهاراتك إذا لزم الأمر.',
      ],
      mistakesTitle: 'الأخطاء الشائعة',
      mistakes: [
        'قبول عرض عمل يطلب منك الدفع للحصول على المنصب — هذا احتيال.',
        'مشاركة رقم التأمين أو وثائق بنكية أثناء عملية التقديم.',
        'عدم التحقق من وجود الشركة قبل المقابلة أو إرسال الوثائق.',
        'توقع إيجاد عمل في مجالك بسرعة دون التحقق المسبق من مؤهلاتك.',
        'تجاهل حقوق العمل: الحد الأدنى للأجر، العمل الإضافي، الحق في رفض المهام الخطرة.',
      ],
      linksTitle: 'الموارد الرسمية',
      links: [
        {
          label: 'بنك الوظائف — حكومة كندا',
          href: 'https://www.guichetemplois.gc.ca',
        },
        {
          label: 'Emploi-Québec — دعم التوظيف',
          href: 'https://www.emploiquebec.gouv.qc.ca',
        },
      ],
      ctaFree: 'احجز مكالمة مجانية — 15 دقيقة',
      ctaOrientation: 'مكالمة توجيه — 45 دقيقة',
      disclaimer:
        'تقدم مرحبا كندا دعماً عاماً وإعلامياً. لا يحل هذا الخدمة محل محامٍ أو مستشار هجرة مرخص أو جهة حكومية.',
    },
  },
  {
    slug: 'sante',
    fr: {
      title: 'Santé',
      description:
        "Comprendre les premières démarches liées à l'assurance maladie, aux cliniques, aux pharmacies et aux ressources de santé.",
      hero: {
        eyebrow: 'RESSOURCE',
        title: 'Santé et assurance maladie',
        text: "RAMQ, médecin de famille, urgences : les premières étapes pour accéder aux soins de santé.",
      },
      intro:
        "L'accès aux soins de santé au Canada est public, mais il y a des délais et des conditions selon la province. Il est important de connaître les étapes pour éviter les frais inutiles et trouver rapidement les ressources disponibles.",
      stepsTitle: 'Premières étapes',
      steps: [
        "S'inscrire à l'assurance maladie provinciale dès que possible : RAMQ au Québec (délai de carence de 3 mois pour certains statuts), OHIP en Ontario.",
        "Chercher un médecin de famille via les registres provinciaux ou les GMF (Québec) / Family Health Teams (Ontario).",
        "Identifier la clinique sans rendez-vous la plus proche pour les soins non urgents.",
        "Connaître les ressources disponibles en dehors des urgences : Info-Santé 811 (Québec), Télémédecine, pharmaciens.",
        "En attendant la carte d'assurance maladie, conserver les reçus si des soins payants sont nécessaires.",
      ],
      mistakesTitle: 'Erreurs fréquentes',
      mistakes: [
        "Aller aux urgences pour des soins non urgents — les attentes sont longues et cela surcharge le système.",
        "Ne pas s'inscrire à l'assurance maladie dès que possible, créant ainsi une période sans couverture inutile.",
        "Partager des informations médicales à des inconnus ou via des applications non sécurisées.",
        "Croire qu'on ne peut pas accéder aux soins sans carte d'assurance — les urgences ne peuvent refuser.",
        "Ne pas vérifier si un médicament est couvert par l'assurance avant de payer le plein tarif à la pharmacie.",
      ],
      linksTitle: 'Ressources officielles',
      links: [
        {
          label: "RAMQ — Inscription à l'assurance maladie",
          href: 'https://www.ramq.gouv.qc.ca/fr/citoyens/assurance-maladie/inscription',
        },
        {
          label: "Info-Santé 811 — Québec",
          href: 'https://www.quebec.ca/sante/trouver-une-ressource/info-sante-811',
        },
        {
          label: "OHIP — Carte santé Ontario",
          href: 'https://www.ontario.ca/fr/page/demander-carte-sante-regime-assurance-sante-ontario',
        },
      ],
      ctaFree: 'Réserver un appel gratuit — 15 min',
      ctaOrientation: 'Appel orientation — 45 min',
      disclaimer:
        'Marhaban Canada offre un accompagnement général et informatif. Ce service ne remplace pas un professionnel de santé, un avocat ou un organisme gouvernemental.',
    },
    en: {
      title: 'Health',
      description:
        'Understand the first steps related to health insurance, clinics, pharmacies, and health resources.',
      hero: {
        eyebrow: 'RESOURCE',
        title: 'Health and health insurance',
        text: 'RAMQ, family doctor, emergencies: the first steps to access healthcare.',
      },
      intro:
        'Access to healthcare in Canada is public, but there are waiting periods and conditions by province. It is important to know the steps to avoid unnecessary costs and quickly find available resources.',
      stepsTitle: 'First steps',
      steps: [
        'Register for provincial health insurance as soon as possible: RAMQ in Quebec (3-month waiting period for some statuses), OHIP in Ontario.',
        'Look for a family doctor through provincial registries or GMFs (Quebec) / Family Health Teams (Ontario).',
        'Identify the nearest walk-in clinic for non-urgent care.',
        'Know resources available outside of emergencies: Info-Santé 811 (Quebec), Telemedicine, pharmacists.',
        'While waiting for your health card, keep receipts if paid care is needed.',
      ],
      mistakesTitle: 'Common mistakes',
      mistakes: [
        'Going to the emergency room for non-urgent care — waits are long and it strains the system.',
        'Not registering for health insurance as soon as possible, creating an unnecessary uncovered period.',
        'Sharing medical information with strangers or via unsecured apps.',
        'Believing you cannot access care without a health card — emergency rooms cannot refuse.',
        'Not checking if a medication is covered by insurance before paying full price at the pharmacy.',
      ],
      linksTitle: 'Official resources',
      links: [
        {
          label: 'OHIP — Ontario health card',
          href: 'https://www.ontario.ca/page/apply-ohip-and-get-health-card',
        },
        {
          label: 'Health Canada — Newcomer health resources',
          href: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/new-immigrants/new-life-canada/health-care.html',
        },
      ],
      ctaFree: 'Book a free call — 15 min',
      ctaOrientation: 'Orientation call — 45 min',
      disclaimer:
        'Marhaban Canada provides general and informational support. This service does not replace a healthcare professional, lawyer, or government body.',
    },
    ar: {
      title: 'الصحة',
      description:
        'فهم الخطوات الأولى المتعلقة بالتأمين الصحي والعيادات والصيدليات وموارد الصحة.',
      hero: {
        eyebrow: 'مورد',
        title: 'الصحة والتأمين الصحي',
        text: 'RAMQ، طبيب الأسرة، الطوارئ: الخطوات الأولى للوصول إلى الرعاية الصحية.',
      },
      intro:
        'الوصول إلى الرعاية الصحية في كندا عام، لكن هناك فترات انتظار وشروط حسب المقاطعة. من المهم معرفة الخطوات لتجنب التكاليف غير الضرورية وإيجاد الموارد المتاحة بسرعة.',
      stepsTitle: 'الخطوات الأولى',
      steps: [
        'سجّل في التأمين الصحي الإقليمي في أقرب وقت: RAMQ في كيبيك (فترة انتظار 3 أشهر لبعض الأوضاع)، OHIP في أونتاريو.',
        'ابحث عن طبيب أسرة عبر السجلات الإقليمية.',
        'حدد أقرب عيادة بدون موعد للرعاية غير الطارئة.',
        'تعرف على الموارد المتاحة خارج الطوارئ: Info-Santé 811، الطب عن بُعد، الصيادلة.',
        'في انتظار بطاقة التأمين الصحي، احتفظ بالإيصالات إذا احتجت لرعاية مدفوعة.',
      ],
      mistakesTitle: 'الأخطاء الشائعة',
      mistakes: [
        'الذهاب إلى الطوارئ لحالات غير طارئة — أوقات الانتظار طويلة.',
        'عدم التسجيل في التأمين الصحي في أقرب وقت مما يخلق فترة بدون تغطية.',
        'مشاركة المعلومات الطبية مع غرباء أو عبر تطبيقات غير آمنة.',
        'الاعتقاد بأنك لا تستطيع الوصول للرعاية بدون بطاقة — الطوارئ لا يمكنها الرفض.',
        'عدم التحقق مما إذا كان الدواء مغطى بالتأمين قبل دفع السعر الكامل.',
      ],
      linksTitle: 'الموارد الرسمية',
      links: [
        {
          label: 'RAMQ — التسجيل في التأمين الصحي',
          href: 'https://www.ramq.gouv.qc.ca/fr/citoyens/assurance-maladie/inscription',
        },
        {
          label: 'OHIP — بطاقة الصحة أونتاريو',
          href: 'https://www.ontario.ca/fr/page/demander-carte-sante-regime-assurance-sante-ontario',
        },
      ],
      ctaFree: 'احجز مكالمة مجانية — 15 دقيقة',
      ctaOrientation: 'مكالمة توجيه — 45 دقيقة',
      disclaimer:
        'تقدم مرحبا كندا دعماً عاماً وإعلامياً. لا يحل هذا الخدمة محل طبيب أو محامٍ أو جهة حكومية.',
    },
  },
];

export const resourceGuides = Object.fromEntries(
  guides.map((g) => [g.slug, g]),
) as Record<ResourceGuideSlug, ResourceGuide>;

export function getResourceGuide(slug: string, locale: Locale): LocaleGuideContent | null {
  if (!isResourceGuideSlug(slug)) return null;
  return resourceGuides[slug][locale];
}

export const resourceGuideMeta: Record<ResourceGuideSlug, { icon: string; fr: string; en: string; ar: string }> = {
  transport: { icon: '🚌', fr: 'Transport', en: 'Transportation', ar: 'التنقل' },
  logement: { icon: '🏠', fr: 'Logement', en: 'Housing', ar: 'السكن' },
  banque: { icon: '🏦', fr: 'Banque', en: 'Banking', ar: 'البنك' },
  documents: { icon: '📄', fr: 'Documents', en: 'Documents', ar: 'الوثائق' },
  ecole: { icon: '🎓', fr: 'École', en: 'School', ar: 'المدرسة' },
  travail: { icon: '💼', fr: 'Travail', en: 'Work', ar: 'العمل' },
  sante: { icon: '❤️', fr: 'Santé', en: 'Health', ar: 'الصحة' },
};
