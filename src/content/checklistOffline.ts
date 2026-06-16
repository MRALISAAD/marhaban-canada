export type ChecklistLocale = 'fr' | 'en' | 'ar';

export type ChecklistSource = {
  label: string;
  href: string;
};

export type ChecklistPriority = 'urgent' | 'important' | 'later';

export type ChecklistItem = {
  id: string;
  title: string;
  avoid: string[];
  sources: ChecklistSource[];
  guideHref?: string;
  priority: ChecklistPriority;
};

export type ChecklistPhase = {
  id: 'week-1' | 'month-1' | 'integration';
  title: string;
  subtitle: string;
  badge: string;
  items: ChecklistItem[];
};

export type ChecklistDictionary = {
  locale: ChecklistLocale;
  dir: 'ltr' | 'rtl';
  labels: {
    title: string;
    subtitle: string;
    progressLabel: string;
    progressHelper: string;
    lastVisit: string;
    reset: string;
    confirmReset: string;
    checklist: string;
    avoid: string;
    sources: string;
    viewGuide: string;
    phaseBadge: string;
    priorityUrgent: string;
    priorityImportant: string;
    priorityLater: string;
    easyReadOn: string;  // New label
    easyReadOff: string; // New label
  };
  phases: ChecklistPhase[];
};

const sources = {
  nas: [
    {
      label: 'Service Canada - NAS',
      href: 'https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html',
    },
  ],
  phone: [
    {
      label: 'CRTC - services mobiles',
      href: 'https://crtc.gc.ca/fra/phone/mobile.htm',
    },
  ],
  bank: [
    {
      label: 'Agence de la consommation - banque',
      href: 'https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/banque.html',
    },
  ],
  health: [
    {
      label: "Canada.ca - carte d'assurance maladie",
      href: 'https://www.canada.ca/fr/sante-publique/services/soins-sante-carte-assurance-maladie.html',
    },
  ],
  housing: [
    {
      label: 'SCHL - logement',
      href: 'https://www.cmhc-schl.gc.ca/',
    },
  ],
  license: [
    {
      label: 'Canada.ca - conduite',
      href: 'https://www.canada.ca/fr/services/transport/conduire.html',
    },
  ],
  integration: [
    {
      label: 'Canada.ca - nouveaux arrivants',
      href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants.html',
    },
  ],
  networking: [
    {
      label: 'Job Bank - planification',
      href: 'https://www.jobbank.gc.ca/fr/planificationcarriere',
    },
  ],
  taxes: [
    {
      label: 'ARC - impots',
      href: 'https://www.canada.ca/fr/agence-revenu.html',
    },
  ],
};

export const checklistDictionary: Record<ChecklistLocale, ChecklistDictionary> = {
  fr: {
    locale: 'fr',
    dir: 'ltr',
    labels: {
      title: 'Checklist — étapes essentielles',
      subtitle: 'Coche les étapes; sauvegarde automatique, sans compte.',
      progressLabel: 'Progression',
      progressHelper: 'étapes complétées',
      lastVisit: 'Dernière visite',
      reset: 'Réinitialiser ma checklist',
      confirmReset: 'Réinitialiser toutes les cases ?',
      checklist: 'Checklist',
      avoid: 'À éviter',
      sources: 'Sources officielles',
      viewGuide: 'Voir le guide',
      phaseBadge: 'Phase',
      priorityUrgent: 'Urgent (jours 1-7)',
      priorityImportant: 'Important (mois 1)',
      priorityLater: 'Plus tard',
      easyReadOn: 'Mode Lecture facile',
      easyReadOff: 'Mode Normal',
    },
    phases: [
      {
        id: 'week-1',
        title: 'Semaine 1',
        subtitle: 'Urgent — stabiliser les bases.',
        badge: 'Urgent',
        items: [
          {
            id: 'nas_done',
            title: "NAS (Numéro d'assurance sociale)",
            avoid: ['Ne partage jamais ton NAS.'],
            sources: sources.nas,
            guideHref: '/parcours/guide/steps/nas',
            priority: 'urgent',
          },
          {
            id: 'phone_done',
            title: 'Téléphone (forfait / SIM)',
            avoid: ['Évite les contrats longs au début.'],
            sources: sources.phone,
            guideHref: '/parcours/guide/steps/phone',
            priority: 'urgent',
          },
          {
            id: 'bank_done',
            title: 'Banque (compte + carte)',
            avoid: ['Demande les offres pour nouveaux arrivants.'],
            sources: sources.bank,
            guideHref: '/parcours/guide/steps/bank',
            priority: 'urgent',
          },
        ],
      },
      {
        id: 'month-1',
        title: 'Mois 1',
        subtitle: 'Important — sécuriser le quotidien.',
        badge: 'Important',
        items: [
          {
            id: 'health_done',
            title: 'Sante (carte provinciale)',
            avoid: ['Ne pas attendre une urgence pour t inscrire.'],
            sources: [
              ...sources.health,
              { label: 'RAMQ - Quebec', href: 'https://www.ramq.gouv.qc.ca/' },
              { label: 'OHIP - Ontario', href: 'https://www.ontario.ca/page/apply-ohip-and-get-health-card' },
              {
                label: 'MSP - British Columbia',
                href: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/eligibility-and-enrolment',
              },
              { label: 'AHCIP - Alberta', href: 'https://www.alberta.ca/ahcip' },
            ],
            guideHref: '/parcours/guide/steps/health',
            priority: 'important',
          },
          {
            id: 'housing_done',
            title: 'Logement long terme (bail, dépôts)',
            avoid: ['Ne paie jamais avant visite et bail signe.'],
            sources: sources.housing,
            guideHref: '/parcours/guide/steps/housing',
            priority: 'important',
          },
          {
            id: 'license_done',
            title: 'Permis de conduire (selon province)',
            avoid: ['Ne conduis pas sans autorisation valide et assurance.'],
            sources: sources.license,
            guideHref: '/parcours/guide/steps/license',
            priority: 'important',
          },
        ],
      },
      {
        id: 'integration',
        title: 'En continu',
        subtitle: 'Intégration continue.',
        badge: 'En continu',
        items: [
          {
            id: 'integration_done',
            title: 'Integration (services locaux, bibliotheque)',
            avoid: ['Evite de rester isole les premiers mois.'],
            sources: sources.integration,
            guideHref: '/parcours/guide/steps/integration',
            priority: 'later',
          },
          {
            id: 'network_done',
            title: 'Reseautage (LinkedIn, communautes)',
            avoid: ['Ne reporte pas le reseautage a plus tard.'],
            sources: sources.networking,
            guideHref: '/parcours/guide/steps/integration', // Corrected path
            priority: 'later',
          },
          {
            id: 'taxes_done',
            title: 'Impots (bases, documents a garder)',
            avoid: ['Ne perds pas les documents importants.'],
            sources: sources.taxes,
            guideHref: '/parcours/guide/steps/taxes',
            priority: 'later',
          },
        ],
      },
    ],
  },
  en: {
    locale: 'en',
    dir: 'ltr',
    labels: {
      title: 'Interactive checklist (offline)',
      subtitle: 'Check items, auto-save, no account.',
      progressLabel: 'Progress',
      progressHelper: 'steps completed',
      lastVisit: 'Last visit',
      reset: 'Reset my checklist',
      confirmReset: 'Reset all checkboxes?',
      checklist: 'Checklist',
      avoid: 'Avoid',
      sources: 'Official sources',
      viewGuide: 'View guide',
      phaseBadge: 'Phase',
      priorityUrgent: 'Urgent (days 1-7)',
      priorityImportant: 'Important (month 1)',
      priorityLater: 'Later',
      easyReadOn: 'Easy Read Mode',
      easyReadOff: 'Normal Mode',
    },
    phases: [
      {
        id: 'week-1',
        title: 'Week 1',
        subtitle: 'Urgent: get stable quickly.',
        badge: 'Urgent',
        items: [
          {
            id: 'nas_done',
            title: 'SIN (Social Insurance Number)',
            avoid: ['Never share your SIN over messages or social media.'],
            sources: sources.nas,
            priority: 'urgent',
          },
          {
            id: 'phone_done',
            title: 'Phone (plan / SIM)',
            avoid: ['Avoid long-term contracts at first.'],
            sources: sources.phone,
            priority: 'urgent',
          },
          {
            id: 'bank_done',
            title: 'Bank account (card included)',
            avoid: ['Ask for newcomer packages to reduce fees.'],
            sources: sources.bank,
            priority: 'urgent',
          },
        ],
      },
      {
        id: 'month-1',
        title: 'Month 1',
        subtitle: 'Important: secure everyday basics.',
        badge: 'Important',
        items: [
          {
            id: 'health_done',
            title: 'Health card (provincial)',
            avoid: ['Do not wait for an emergency to apply.'],
            sources: [
              ...sources.health,
              { label: 'RAMQ - Quebec', href: 'https://www.ramq.gouv.qc.ca/' },
              { label: 'OHIP - Ontario', href: 'https://www.ontario.ca/page/apply-ohip-and-get-health-card' },
              {
                label: 'MSP - British Columbia',
                href: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/eligibility-and-enrolment',
              },
              { label: 'AHCIP - Alberta', href: 'https://www.alberta.ca/ahcip' },
            ],
            guideHref: '/parcours/guide/steps/health',
            priority: 'important',
          },
          {
            id: 'housing_done',
            title: 'Long-term housing (lease, deposits)',
            avoid: ['Never pay before a visit and a signed lease.'],
            sources: sources.housing,
            priority: 'important',
          },
          {
            id: 'license_done',
            title: "Driver's license (by province)",
            avoid: ['Do not drive without a valid license and insurance.'],
            sources: sources.license,
            priority: 'important',
          },
        ],
      },
      {
        id: 'integration',
        title: 'Ongoing',
        subtitle: 'Build stability over time.',
        badge: 'Ongoing',
        items: [
          {
            id: 'integration_done',
            title: 'Integration (local services, library)',
            avoid: ['Avoid staying isolated during the first months.'],
            sources: sources.integration,
            guideHref: '/parcours/guide/steps/integration',
            priority: 'later',
          },
          {
            id: 'network_done',
            title: 'Networking (LinkedIn, communities)',
            avoid: ['Do not postpone networking.'],
            sources: sources.networking,
            guideHref: '/parcours/guide/steps/integration', // Corrected path
            priority: 'later',
          },
          {
            id: 'taxes_done',
            title: 'Taxes (basics, keep documents)',
            avoid: ['Do not lose important documents.'],
            sources: sources.taxes,
            guideHref: '/parcours/guide/steps/taxes',
            priority: 'later',
          },
        ],
      },
    ],
  },
  ar: {
    locale: 'ar',
    dir: 'rtl',
    labels: {
      title: 'قائمة تحقق تفاعلية (تعمل دون انترنت)',
      subtitle: 'ضع علامة، حفظ تلقائي، بدون حساب.',
      progressLabel: 'التقدم',
      progressHelper: 'خطوات مكتملة',
      lastVisit: 'اخر زيارة',
      reset: 'اعادة ضبط القائمة',
      confirmReset: 'اعادة ضبط كل المربعات؟',
      checklist: 'قائمة التحقق',
      avoid: 'تجنب',
      sources: 'مصادر رسمية',
      viewGuide: 'عرض الدليل',
      phaseBadge: 'المرحلة',
      priorityUrgent: 'عاجل (الايام 1-7)',
      priorityImportant: 'مهم (الشهر 1)',
      priorityLater: 'لاحقا',
      easyReadOn: 'وضع القراءة السهلة',
      easyReadOff: 'وضع طبيعي',
    },
    phases: [
      {
        id: 'week-1',
        title: 'الاسبوع 1',
        subtitle: 'عاجل: الاستقرار بسرعة.',
        badge: 'عاجل',
        items: [
          {
            id: 'nas_done',
            title: 'رقم التامين الاجتماعي (SIN)',
            avoid: ['لا تشارك الرقم عبر الرسائل او الشبكات.'],
            sources: sources.nas,
            priority: 'urgent',
          },
          {
            id: 'phone_done',
            title: 'الهاتف (باقة / شريحة)',
            avoid: ['تجنب العقود الطويلة في البداية.'],
            sources: sources.phone,
            priority: 'urgent',
          },
          {
            id: 'bank_done',
            title: 'حساب بنكي (بطاقة)',
            avoid: ['اطلب عروض القادمين الجدد لتقليل الرسوم.'],
            sources: sources.bank,
            priority: 'urgent',
          },
        ],
      },
      {
        id: 'month-1',
        title: 'الشهر 1',
        subtitle: 'مهم: تثبيت اساسيات الحياة اليومية.',
        badge: 'مهم',
        items: [
          {
            id: 'health_done',
            title: 'بطاقة صحية (المقاطعة)',
            avoid: ['لا تنتظر الطوارئ لتقديم الطلب.'],
            sources: [
              ...sources.health,
              { label: 'RAMQ - Quebec', href: 'https://www.ramq.gouv.qc.ca/' },
              { label: 'OHIP - Ontario', href: 'https://www.ontario.ca/page/apply-ohip-and-get-health-card' },
              {
                label: 'MSP - British Columbia',
                href: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/eligibility-and-enrolment',
              },
              { label: 'AHCIP - Alberta', href: 'https://www.alberta.ca/ahcip' },
            ],
            guideHref: '/parcours/guide/steps/health',
            priority: 'important',
          },
          {
            id: 'housing_done',
            title: 'سكن طويل المدى (عقد, وديعة)',
            avoid: ['لا تدفع قبل الزيارة وتوقيع العقد.'],
            sources: sources.housing,
            priority: 'important',
          },
          {
            id: 'license_done',
            title: 'رخصة القيادة (حسب المقاطعة)',
            avoid: ['لا تقد بدون رخصة صالحة وتامين.'],
            sources: sources.license,
            priority: 'important',
          },
        ],
      },
      {
        id: 'integration',
        title: 'مستمر',
        subtitle: 'بناء استقرار على المدى الطويل.',
        badge: 'مستمر',
        items: [
          {
            id: 'integration_done',
            title: 'اندماج (خدمات محلية, مكتبة)',
            avoid: ['تجنب العزلة في الاشهر الاولى.'],
            sources: sources.integration,
            guideHref: '/parcours/guide/steps/integration',
            priority: 'later',
          },
          {
            id: 'network_done',
            title: 'توسيع العلاقات (لينكدان, مجتمعات)',
            avoid: ['لا تؤجل بناء العلاقات.'],
            sources: sources.networking,
            guideHref: '/parcours/guide/steps/integration', // Corrected path
            priority: 'later',
          },
          {
            id: 'taxes_done',
            title: 'الضرائب (اساسيات, وثائق)',
            avoid: ['لا تفقد الوثائق المهمة.'],
            sources: sources.taxes,
            guideHref: '/parcours/guide/steps/taxes',
            priority: 'later',
          },
        ],
      },
    ],
  },
};

export function getChecklistDictionary(locale: ChecklistLocale) {
  return checklistDictionary[locale] ?? checklistDictionary.fr;
}
