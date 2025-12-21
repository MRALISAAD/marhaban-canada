export type TimelineLocale = 'fr' | 'en' | 'ar';

export type TimelineSource = {
  label: string;
  href: string;
};

export type TimelineItem = {
  id: string;
  title: string;
  why: string;
  how: string[];
  avoid: string[];
  sources: TimelineSource[];
  guideHref?: string;
};

export type TimelineSection = {
  id: 'week-1' | 'month-1' | 'ongoing';
  title: string;
  description: string;
  badge: string;
  items: TimelineItem[];
};

export type TimelineLabels = {
  eyebrow: string;
  title: string;
  subtitle: string;
  provinceLabel: string;
  progressLabel: string;
  progressHelper: string;
  autoSaveTitle: string;
  autoSaveSubtitle: string;
  resetLabel: string;
  resetConfirm: string;
  lastVisitLabel: string;
  stepsLabel: string;
  howLabel: string;
  avoidLabel: string;
  sourcesLabel: string;
  viewGuideLabel: string;
  filtersTitle: string;
  searchPlaceholder: string;
  todoOnlyLabel: string;
  emptyState: string;
};

export type TimelineDictionary = {
  locale: TimelineLocale;
  dir: 'ltr' | 'rtl';
  labels: TimelineLabels;
  sections: TimelineSection[];
};

export const timelineDictionary: Record<TimelineLocale, TimelineDictionary> = {
  fr: {
    locale: 'fr',
    dir: 'ltr',
    labels: {
      eyebrow: "Parcours d'arrivee",
      title: 'Ton parcours d installation',
      subtitle: "Voici l'ordre le plus simple pour demarrer sans stress.",
      provinceLabel: 'Province selectionnee',
      progressLabel: 'Progression globale',
      progressHelper: 'etapes cochees',
      autoSaveTitle: 'Sauvegarde automatique',
      autoSaveSubtitle: 'Sans compte, sans inscription.',
      resetLabel: 'Reinitialiser ma checklist',
      resetConfirm: 'Reinitialiser toute la checklist ?',
      lastVisitLabel: 'Derniere visite',
      stepsLabel: 'etapes',
      howLabel: 'Comment faire',
      avoidLabel: 'Pieges a eviter',
      sourcesLabel: 'Sources officielles',
      viewGuideLabel: 'Voir le guide',
      filtersTitle: 'Filtrer les etapes',
      searchPlaceholder: 'Rechercher (NAS, logement, permis...)',
      todoOnlyLabel: 'Afficher seulement a faire',
      emptyState: 'Aucune etape ne correspond a ces filtres.',
    },
    sections: [
      {
        id: 'week-1',
        title: 'Semaine 1',
        description: 'Ces etapes te rendent operationnel rapidement. Tu peux les faire tranquillement, une par une.',
        badge: 'Urgent',
        items: [
          {
            id: 'nas',
            title: "Obtenir son NAS (Numero d'assurance sociale)",
            why: 'Indispensable pour travailler et acceder aux services publics.',
            how: [
              'Trouver un bureau Service Canada',
              'Preparer passeport + permis ou visa',
              'Recevoir le numero par lettre',
            ],
            avoid: ['Ne jamais partager ton NAS par message non securise'],
            sources: [
              {
                label: 'Service Canada - NAS',
                href: 'https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html',
              },
            ],
            guideHref: '/parcours/guide/steps/nas',
          },
          {
            id: 'docs',
            title: 'Organiser tes documents essentiels',
            why: 'Eviter les pertes et gagner du temps pour chaque demarche.',
            how: [
              'Faire des copies papier et numeriques',
              'Scanner passeport, permis et preuves',
              'Garder une version hors ligne',
            ],
            avoid: ['Ne pas laisser les originaux sans surveillance'],
            sources: [
              {
                label: 'Canada.ca - nouveaux arrivants',
                href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants.html',
              },
            ],
          },
          {
            id: 'phone',
            title: 'Obtenir un numero de telephone canadien',
            why: "Necessaire pour l'emploi, la banque et les services de base.",
            how: ['Comparer les forfaits BYOD', 'Prendre une carte SIM', 'Activer la ligne en boutique'],
            avoid: ['Eviter les engagements longs au debut'],
            sources: [
              {
                label: 'CRTC - services mobiles',
                href: 'https://crtc.gc.ca/fra/phone/mobile.htm',
              },
            ],
            guideHref: '/parcours/guide/steps/phone',
          },
          {
            id: 'bank',
            title: 'Ouvrir un compte bancaire',
            why: 'Pour recevoir un salaire et payer sans frais inutiles.',
            how: [
              'Choisir une banque avec offre nouvel arrivant',
              'Apporter passeport + preuve de statut',
              'Demander une carte de debit et credit',
            ],
            avoid: ['Eviter les frais mensuels eleves'],
            sources: [
              {
                label: 'Agence de la consommation - comptes',
                href: 'https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/banque.html',
              },
            ],
            guideHref: '/parcours/guide/steps/bank',
          },
          {
            id: 'transport-card',
            title: 'Obtenir une carte de transport locale',
            why: 'Economiser sur les trajets et se deplacer facilement.',
            how: ['Verifier la carte locale (OPUS, Compass, PRESTO)', 'Acheter en station ou en ligne'],
            avoid: ['Eviter les achats au dernier moment'],
            sources: [
              { label: 'Transports Quebec - OPUS', href: 'https://www.stm.info/fr/tarifs' },
              { label: 'TransLink - Compass', href: 'https://www.translink.ca/transit-fares/compass-card' },
              { label: 'PRESTO', href: 'https://www.prestocard.ca/' },
            ],
          },
        ],
      },
      {
        id: 'month-1',
        title: 'Mois 1',
        description: 'Rien d urgent. Avance quand tu te sens pret.',
        badge: 'Important',
        items: [
          {
            id: 'health-card',
            title: "Demarrer la demande de carte d'assurance maladie",
            why: 'Chaque province gere sa couverture. Anticipe les delais.',
            how: ['Verifier les conditions de ta province', 'Preparer les preuves de residence', 'Envoyer la demande'],
            avoid: ['Ne pas attendre d etre malade pour commencer'],
            sources: [
              {
                label: "Canada.ca - assurance sante",
                href: 'https://www.canada.ca/fr/sante-publique/services/soins-sante-carte-assurance-maladie.html',
              },
              { label: 'RAMQ - Quebec', href: 'https://www.ramq.gouv.qc.ca/' },
              { label: 'OHIP - Ontario', href: 'https://www.ontario.ca/page/apply-ohip-and-get-health-card' },
              {
                label: 'MSP - British Columbia',
                href: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/eligibility-and-enrolment',
              },
              { label: 'AHCIP - Alberta', href: 'https://www.alberta.ca/ahcip' },
            ],
            guideHref: '/parcours/guide/steps/health',
          },
          {
            id: 'housing-long',
            title: 'Trouver un logement long terme',
            why: 'Un bail stable facilite les autres demarches.',
            how: ['Verifier le quartier', 'Preparer le dossier locataire', 'Lire le bail avant signature'],
            avoid: ['Ne jamais payer sans visite ou contrat clair'],
            sources: [
              {
                label: 'SCHL - logement',
                href: 'https://www.cmhc-schl.gc.ca/',
              },
            ],
            guideHref: '/parcours/guide/steps/housing',
          },
          {
            id: 'driver-license',
            title: 'Permis de conduire (demarches provinciales)',
            why: 'Les regles changent selon la province et ton permis actuel.',
            how: ['Verifier les equivalences', 'Prendre rendez-vous', 'Passer les tests si requis'],
            avoid: ['Conduire sans permis valide ou assurance'],
            sources: [
              {
                label: 'Canada.ca - permis',
                href: 'https://www.canada.ca/fr/services/transport/conduire.html',
              },
              { label: 'SAAQ - Quebec', href: 'https://saaq.gouv.qc.ca/' },
              { label: 'ServiceOntario', href: 'https://www.ontario.ca/page/driving-and-roads' },
              { label: 'ICBC - C.-B.', href: 'https://www.icbc.com/driver-licensing' },
              { label: 'Alberta - registries', href: 'https://www.alberta.ca/registry-agents' },
            ],
            guideHref: '/parcours/guide/steps/license',
          },
        ],
      },
      {
        id: 'ongoing',
        title: 'En continu',
        description: 'Ces etapes t aident sur le long terme. Reviens y quand tu veux.',
        badge: 'En continu',
        items: [
          {
            id: 'integration',
            title: 'Integration locale',
            why: 'Les services locaux aident a se poser plus vite.',
            how: ['Identifier les services municipaux', "S'inscrire a la bibliotheque", 'Explorer les activites locales'],
            avoid: ['Rester isole pendant les premieres semaines'],
            sources: [
              {
                label: 'Canada.ca - nouveaux arrivants',
                href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants.html',
              },
            ],
            guideHref: '/parcours/guide/steps/integration',
          },
          {
            id: 'networking',
            title: 'Reseautage professionnel',
            why: "Le reseau accelere l'acces aux opportunites d'emploi.",
            how: ['Optimiser LinkedIn', 'Rejoindre des groupes locaux', 'Participer a un evenement par mois'],
            avoid: ['Attendre une offre avant de se connecter'],
            sources: [
              {
                label: 'Job Bank - reseautage',
                href: 'https://www.jobbank.gc.ca/fr/planificationcarriere',
              },
            ],
            guideHref: '/parcours/guide/steps/networking',
          },
          {
            id: 'taxes',
            title: 'Impots et documents',
            why: 'Garde tes preuves pour les declarations annuelles.',
            how: ['Conserver tes releves et factures', 'Noter les dates limites', 'Consulter un comptable si besoin'],
            avoid: ['Perdre les documents importants'],
            sources: [
              {
                label: 'ARC - impots',
                href: 'https://www.canada.ca/fr/agence-revenu.html',
              },
            ],
            guideHref: '/parcours/guide/steps/taxes',
          },
          {
            id: 'credit-history',
            title: 'Construire un historique de credit',
            why: 'Utile pour louer, emprunter et negocier.',
            how: ['Demander une carte adaptee', 'Payer a temps', 'Garder l utilisation basse'],
            avoid: ['Payer en retard ou utiliser 100% du plafond'],
            sources: [
              {
                label: 'ACFC - cote de credit',
                href: 'https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/credit.html',
              },
            ],
          },
        ],
      },
    ],
  },
  en: {
    locale: 'en',
    dir: 'ltr',
    labels: {
      eyebrow: 'Arrival journey',
      title: 'Your settlement path',
      subtitle: 'Here is the simplest order to start without stress.',
      provinceLabel: 'Selected province',
      progressLabel: 'Overall progress',
      progressHelper: 'steps checked',
      autoSaveTitle: 'Auto-save',
      autoSaveSubtitle: 'No account, no sign-up.',
      resetLabel: 'Reset my checklist',
      resetConfirm: 'Reset the entire checklist?',
      lastVisitLabel: 'Last visit',
      stepsLabel: 'steps',
      howLabel: 'How to do it',
      avoidLabel: 'Pitfalls to avoid',
      sourcesLabel: 'Official sources',
      viewGuideLabel: 'View guide',
      filtersTitle: 'Filter steps',
      searchPlaceholder: 'Search (SIN, housing, license...)',
      todoOnlyLabel: 'Show only to-do',
      emptyState: 'No steps match these filters.',
    },
    sections: [
      {
        id: 'week-1',
        title: 'Week 1',
        description: 'These steps make you operational quickly. Take them one by one, at your pace.',
        badge: 'Urgent',
        items: [
          {
            id: 'nas',
            title: 'Get your SIN (Social Insurance Number)',
            why: 'Required to work and access public services.',
            how: ['Find a Service Canada office', 'Bring passport + permit/visa', 'Receive the number by letter'],
            avoid: ['Never share your SIN by unsecured message'],
            sources: [
              {
                label: 'Service Canada - SIN',
                href: 'https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html',
              },
            ],
            guideHref: '/parcours/guide/steps/nas',
          },
          {
            id: 'docs',
            title: 'Organize your essential documents',
            why: 'Save time and avoid losing critical papers.',
            how: ['Make paper and digital copies', 'Scan passport and permits', 'Keep an offline copy'],
            avoid: ['Do not leave originals unattended'],
            sources: [
              {
                label: 'Canada.ca - newcomers',
                href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants.html',
              },
            ],
          },
          {
            id: 'phone',
            title: 'Get a Canadian phone number',
            why: 'Needed for work, banking, and basic services.',
            how: ['Compare BYOD plans', 'Get a SIM card', 'Activate the line in store'],
            avoid: ['Avoid long-term contracts at first'],
            sources: [
              {
                label: 'CRTC - mobile services',
                href: 'https://crtc.gc.ca/fra/phone/mobile.htm',
              },
            ],
            guideHref: '/parcours/guide/steps/phone',
          },
          {
            id: 'bank',
            title: 'Open a bank account',
            why: 'Receive your salary and pay without extra fees.',
            how: ['Choose a newcomer offer', 'Bring passport + status proof', 'Request debit and credit cards'],
            avoid: ['Avoid high monthly fees'],
            sources: [
              {
                label: 'Consumer Agency - banking',
                href: 'https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/banque.html',
              },
            ],
            guideHref: '/parcours/guide/steps/bank',
          },
          {
            id: 'transport-card',
            title: 'Get a local transit card',
            why: 'Save money and move easily.',
            how: ['Check local card (OPUS, Compass, PRESTO)', 'Buy in station or online'],
            avoid: ['Avoid last-minute purchases'],
            sources: [
              { label: 'OPUS', href: 'https://www.stm.info/en/fares' },
              { label: 'Compass', href: 'https://www.translink.ca/transit-fares/compass-card' },
              { label: 'PRESTO', href: 'https://www.prestocard.ca/' },
            ],
          },
        ],
      },
      {
        id: 'month-1',
        title: 'Month 1',
        description: 'Nothing urgent. Move forward when you feel ready.',
        badge: 'Important',
        items: [
          {
            id: 'health-card',
            title: 'Start your health card application',
            why: 'Each province manages coverage. Expect delays.',
            how: ['Check your province rules', 'Prepare proof of residence', 'Submit the application'],
            avoid: ['Do not wait until you get sick'],
            sources: [
              {
                label: 'Canada.ca - health insurance',
                href: 'https://www.canada.ca/fr/sante-publique/services/soins-sante-carte-assurance-maladie.html',
              },
              { label: 'RAMQ - Quebec', href: 'https://www.ramq.gouv.qc.ca/' },
              { label: 'OHIP - Ontario', href: 'https://www.ontario.ca/page/apply-ohip-and-get-health-card' },
              {
                label: 'MSP - British Columbia',
                href: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/eligibility-and-enrolment',
              },
              { label: 'AHCIP - Alberta', href: 'https://www.alberta.ca/ahcip' },
            ],
            guideHref: '/parcours/guide/steps/health',
          },
          {
            id: 'housing-long',
            title: 'Secure long-term housing',
            why: 'A stable lease unlocks other steps.',
            how: ['Check the neighborhood', 'Prepare a rental file', 'Read the lease before signing'],
            avoid: ['Never pay without a visit or clear contract'],
            sources: [
              {
                label: 'CMHC - housing',
                href: 'https://www.cmhc-schl.gc.ca/',
              },
            ],
            guideHref: '/parcours/guide/steps/housing',
          },
          {
            id: 'driver-license',
            title: "Driver's license (provincial)",
            why: 'Rules vary by province and your current license.',
            how: ['Check equivalencies', 'Book an appointment', 'Take tests if required'],
            avoid: ['Do not drive without valid license or insurance'],
            sources: [
              {
                label: 'Canada.ca - driving',
                href: 'https://www.canada.ca/fr/services/transport/conduire.html',
              },
              { label: 'SAAQ - Quebec', href: 'https://saaq.gouv.qc.ca/' },
              { label: 'ServiceOntario', href: 'https://www.ontario.ca/page/driving-and-roads' },
              { label: 'ICBC - B.C.', href: 'https://www.icbc.com/driver-licensing' },
              { label: 'Alberta registries', href: 'https://www.alberta.ca/registry-agents' },
            ],
            guideHref: '/parcours/guide/steps/license',
          },
        ],
      },
      {
        id: 'ongoing',
        title: 'Ongoing',
        description: 'These steps help long term. Come back whenever you want.',
        badge: 'Ongoing',
        items: [
          {
            id: 'integration',
            title: 'Local integration',
            why: 'Local services help you settle faster.',
            how: ['Find municipal services', 'Register at the library', 'Explore local activities'],
            avoid: ['Do not stay isolated during the first weeks'],
            sources: [
              {
                label: 'Canada.ca - newcomers',
                href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants.html',
              },
            ],
            guideHref: '/parcours/guide/steps/integration',
          },
          {
            id: 'networking',
            title: 'Professional networking',
            why: 'Your network speeds up job opportunities.',
            how: ['Optimize LinkedIn', 'Join local groups', 'Attend one event per month'],
            avoid: ['Do not wait for an offer to connect'],
            sources: [
              {
                label: 'Job Bank - career planning',
                href: 'https://www.jobbank.gc.ca/fr/planificationcarriere',
              },
            ],
            guideHref: '/parcours/guide/steps/networking',
          },
          {
            id: 'taxes',
            title: 'Taxes and documents',
            why: 'Keep proof for annual filing.',
            how: ['Keep statements and invoices', 'Track deadlines', 'Consult an accountant if needed'],
            avoid: ['Do not lose important documents'],
            sources: [
              {
                label: 'CRA - taxes',
                href: 'https://www.canada.ca/fr/agence-revenu.html',
              },
            ],
            guideHref: '/parcours/guide/steps/taxes',
          },
          {
            id: 'credit-history',
            title: 'Build your credit history',
            why: 'Useful for renting, borrowing, and negotiating.',
            how: ['Get a starter card', 'Pay on time', 'Keep utilization low'],
            avoid: ['Late payments or maxing out cards'],
            sources: [
              {
                label: 'FCAC - credit score',
                href: 'https://www.canada.ca/en/financial-consumer-agency/services/credit.html',
              },
            ],
          },
        ],
      },
    ],
  },
  ar: {
    locale: 'ar',
    dir: 'rtl',
    labels: {
      eyebrow: 'مسار الوصول',
      title: 'مسار الاستقرار',
      subtitle: 'هذا هو الترتيب الابسط للبداية بدون توتر.',
      provinceLabel: 'المقاطعة المختارة',
      progressLabel: 'التقدم العام',
      progressHelper: 'خطوات مكتملة',
      autoSaveTitle: 'حفظ تلقائي',
      autoSaveSubtitle: 'بدون حساب، بدون تسجيل.',
      resetLabel: 'اعادة ضبط القائمة',
      resetConfirm: 'اعادة ضبط كل القائمة؟',
      lastVisitLabel: 'اخر زيارة',
      stepsLabel: 'خطوات',
      howLabel: 'كيف تنجزها',
      avoidLabel: 'اخطاء يجب تجنبها',
      sourcesLabel: 'مصادر رسمية',
      viewGuideLabel: 'عرض الدليل',
      filtersTitle: 'تصفية الخطوات',
      searchPlaceholder: 'ابحث (SIN، سكن، رخصة...)',
      todoOnlyLabel: 'اعرض غير المنجزة فقط',
      emptyState: 'لا توجد خطوات مطابقة.',
    },
    sections: [
      {
        id: 'week-1',
        title: 'الاسبوع 1',
        description: 'هذه الخطوات تجعلك جاهزا بسرعة. خذها واحدة تلو الاخرى وبهدوء.',
        badge: 'عاجل',
        items: [
          {
            id: 'nas',
            title: 'الحصول على رقم التامين الاجتماعي (SIN)',
            why: 'ضروري للعمل والوصول للخدمات العامة.',
            how: ['ابحث عن مكتب Service Canada', 'احضر الجواز + تصريح/تأشيرة', 'استلم الرقم برسالة'],
            avoid: ['لا تشارك رقمك عبر رسائل غير امنة'],
            sources: [
              {
                label: 'Service Canada - SIN',
                href: 'https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html',
              },
            ],
            guideHref: '/parcours/guide/steps/nas',
          },
          {
            id: 'docs',
            title: 'تنظيم الوثائق الاساسية',
            why: 'تجنب ضياع الوقت وفقدان الوثائق.',
            how: ['اصنع نسخ ورقية ورقمية', 'امسح الجواز والتصاريح', 'احتفظ بنسخة دون انترنت'],
            avoid: ['لا تترك الاصول دون مراقبة'],
            sources: [
              {
                label: 'Canada.ca - newcomers',
                href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants.html',
              },
            ],
          },
          {
            id: 'phone',
            title: 'الحصول على رقم هاتف كندي',
            why: 'مهم للعمل والبنك والخدمات الاساسية.',
            how: ['قارن خطط BYOD', 'احصل على شريحة SIM', 'فعّل الخط في المتجر'],
            avoid: ['تجنب العقود الطويلة في البداية'],
            sources: [
              {
                label: 'CRTC - خدمات الهاتف',
                href: 'https://crtc.gc.ca/fra/phone/mobile.htm',
              },
            ],
            guideHref: '/parcours/guide/steps/phone',
          },
          {
            id: 'bank',
            title: 'فتح حساب بنكي',
            why: 'لاستلام الراتب والدفع بدون رسوم اضافية.',
            how: ['اختر عرض القادمين الجدد', 'احضر الجواز + اثبات الحالة', 'اطلب بطاقة خصم وائتمان'],
            avoid: ['تجنب الرسوم الشهرية العالية'],
            sources: [
              {
                label: 'Consumer Agency - banking',
                href: 'https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/banque.html',
              },
            ],
            guideHref: '/parcours/guide/steps/bank',
          },
          {
            id: 'transport-card',
            title: 'الحصول على بطاقة نقل محلية',
            why: 'توفير المال والتنقل بسهولة.',
            how: ['تحقق من البطاقة المحلية', 'اشترها في المحطة او عبر الانترنت'],
            avoid: ['تجنب الشراء في اخر لحظة'],
            sources: [
              { label: 'OPUS', href: 'https://www.stm.info/en/fares' },
              { label: 'Compass', href: 'https://www.translink.ca/transit-fares/compass-card' },
              { label: 'PRESTO', href: 'https://www.prestocard.ca/' },
            ],
          },
        ],
      },
      {
        id: 'month-1',
        title: 'الشهر 1',
        description: 'لا شيء عاجل. تقدم عندما تشعر انك جاهز.',
        badge: 'مهم',
        items: [
          {
            id: 'health-card',
            title: 'بدء طلب بطاقة صحية',
            why: 'كل مقاطعة تدير التغطية. توقع بعض التأخير.',
            how: ['تحقق من شروط المقاطعة', 'جهز اثبات السكن', 'قدّم الطلب'],
            avoid: ['لا تنتظر حتى تمرض'],
            sources: [
              {
                label: 'Canada.ca - health insurance',
                href: 'https://www.canada.ca/fr/sante-publique/services/soins-sante-carte-assurance-maladie.html',
              },
              { label: 'RAMQ - Quebec', href: 'https://www.ramq.gouv.qc.ca/' },
              { label: 'OHIP - Ontario', href: 'https://www.ontario.ca/page/apply-ohip-and-get-health-card' },
              {
                label: 'MSP - British Columbia',
                href: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/eligibility-and-enrolment',
              },
              { label: 'AHCIP - Alberta', href: 'https://www.alberta.ca/ahcip' },
            ],
            guideHref: '/parcours/guide/steps/health',
          },
          {
            id: 'housing-long',
            title: 'تأمين سكن طويل المدى',
            why: 'عقد ثابت يسهل باقي الخطوات.',
            how: ['افحص الحي', 'جهز ملف المستأجر', 'اقرأ العقد قبل التوقيع'],
            avoid: ['لا تدفع قبل زيارة او عقد واضح'],
            sources: [
              {
                label: 'CMHC - housing',
                href: 'https://www.cmhc-schl.gc.ca/',
              },
            ],
            guideHref: '/parcours/guide/steps/housing',
          },
          {
            id: 'driver-license',
            title: 'رخصة القيادة (حسب المقاطعة)',
            why: 'القوانين تختلف حسب المقاطعة ورخصتك الحالية.',
            how: ['تحقق من المعادلات', 'احجز موعدا', 'اجتاز الاختبارات المطلوبة'],
            avoid: ['لا تقد بدون رخصة او تأمين صالح'],
            sources: [
              {
                label: 'Canada.ca - driving',
                href: 'https://www.canada.ca/fr/services/transport/conduire.html',
              },
              { label: 'SAAQ - Quebec', href: 'https://saaq.gouv.qc.ca/' },
              { label: 'ServiceOntario', href: 'https://www.ontario.ca/page/driving-and-roads' },
              { label: 'ICBC - B.C.', href: 'https://www.icbc.com/driver-licensing' },
              { label: 'Alberta registries', href: 'https://www.alberta.ca/registry-agents' },
            ],
            guideHref: '/parcours/guide/steps/license',
          },
        ],
      },
      {
        id: 'ongoing',
        title: 'مستمر',
        description: 'هذه الخطوات تساعدك على المدى الطويل. عد لها وقتما تريد.',
        badge: 'مستمر',
        items: [
          {
            id: 'integration',
            title: 'الاندماج المحلي',
            why: 'الخدمات المحلية تساعدك على الاستقرار بسرعة.',
            how: ['ابحث عن الخدمات البلدية', 'سجل في المكتبة', 'استكشف الانشطة المحلية'],
            avoid: ['تجنب العزلة في الاسابيع الاولى'],
            sources: [
              {
                label: 'Canada.ca - newcomers',
                href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants.html',
              },
            ],
            guideHref: '/parcours/guide/steps/integration',
          },
          {
            id: 'networking',
            title: 'بناء العلاقات المهنية',
            why: 'الشبكة تساعد على فرص العمل بسرعة.',
            how: ['حسّن LinkedIn', 'انضم لمجموعات محلية', 'شارك بفعالية شهريا'],
            avoid: ['لا تؤجل بناء العلاقات'],
            sources: [
              {
                label: 'Job Bank - career planning',
                href: 'https://www.jobbank.gc.ca/fr/planificationcarriere',
              },
            ],
            guideHref: '/parcours/guide/steps/networking',
          },
          {
            id: 'taxes',
            title: 'الضرائب والوثائق',
            why: 'احتفظ بالاثباتات للتصريح السنوي.',
            how: ['احتفظ بالكشوف والفواتير', 'تابع المواعيد', 'استشر محاسبا اذا لزم'],
            avoid: ['لا تفقد الوثائق المهمة'],
            sources: [
              {
                label: 'CRA - taxes',
                href: 'https://www.canada.ca/fr/agence-revenu.html',
              },
            ],
            guideHref: '/parcours/guide/steps/taxes',
          },
          {
            id: 'credit-history',
            title: 'بناء سجل ائتماني',
            why: 'مهم للايجار والقروض.',
            how: ['احصل على بطاقة مناسبة', 'ادفع في الوقت', 'قلل الاستخدام'],
            avoid: ['التاخر في الدفع'],
            sources: [
              {
                label: 'FCAC - credit',
                href: 'https://www.canada.ca/en/financial-consumer-agency/services/credit.html',
              },
            ],
          },
        ],
      },
    ],
  },
};

export function getTimelineDictionary(locale: TimelineLocale) {
  return timelineDictionary[locale] ?? timelineDictionary.fr;
}
