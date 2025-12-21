export type ChecklistLocale = 'fr' | 'en' | 'ar';

export type ChecklistSource = {
  label: string;
  href: string;
};

export type ChecklistItem = {
  id: string;
  title: string;
  avoid: string[];
  sources: ChecklistSource[];
  guideHref?: string;
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
      label: 'Canada.ca - permis',
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
      progressHelper: 'etapes completees',
      lastVisit: 'Derniere visite',
      reset: 'Reinitialiser ma checklist',
      confirmReset: 'Reinitialiser toutes les cases ?',
      checklist: 'Checklist',
      avoid: 'A eviter',
      sources: 'Sources officielles',
      viewGuide: 'Voir le guide',
      phaseBadge: 'Phase',
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
            guideHref: '/parcours/guide/nas',
          },
          {
            id: 'phone_done',
            title: 'Telephone (forfait / SIM)',
            avoid: ['Évite les contrats longs au début.'],
            sources: sources.phone,
            guideHref: '/parcours/guide/phone',
          },
          {
            id: 'bank_done',
            title: 'Banque (compte + carte)',
            avoid: ['Demande les offres pour nouveaux arrivants.'],
            sources: sources.bank,
            guideHref: '/parcours/guide/bank',
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
            guideHref: '/parcours/guide/health',
          },
          {
            id: 'housing_done',
            title: 'Logement long terme (bail, depots)',
            avoid: ['Ne paie jamais avant visite et bail signe.'],
            sources: sources.housing,
            guideHref: '/parcours/guide/housing',
          },
          {
            id: 'license_done',
            title: 'Permis de conduire (selon province)',
            avoid: ['Ne conduis pas sans permis valide et assurance.'],
            sources: sources.license,
            guideHref: '/parcours/guide/license',
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
            guideHref: '/parcours/guide/integration',
          },
          {
            id: 'network_done',
            title: 'Reseautage (LinkedIn, communautes)',
            avoid: ['Ne reporte pas le reseautage a plus tard.'],
            sources: sources.networking,
            guideHref: '/parcours/guide/networking',
          },
          {
            id: 'taxes_done',
            title: 'Impots (bases, documents a garder)',
            avoid: ['Ne perds pas les documents importants.'],
            sources: sources.taxes,
            guideHref: '/parcours/guide/taxes',
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
          },
          {
            id: 'phone_done',
            title: 'Phone (plan / SIM)',
            avoid: ['Avoid long-term contracts at first.'],
            sources: sources.phone,
          },
          {
            id: 'bank_done',
            title: 'Bank account (card included)',
            avoid: ['Ask for newcomer packages to reduce fees.'],
            sources: sources.bank,
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
            guideHref: '/parcours/guide/health',
          },
          {
            id: 'housing_done',
            title: 'Long-term housing (lease, deposits)',
            avoid: ['Never pay before a visit and a signed lease.'],
            sources: sources.housing,
          },
          {
            id: 'license_done',
            title: "Driver's license (by province)",
            avoid: ['Do not drive without a valid license and insurance.'],
            sources: sources.license,
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
            guideHref: '/parcours/guide/integration',
          },
          {
            id: 'network_done',
            title: 'Networking (LinkedIn, communities)',
            avoid: ['Do not postpone networking.'],
            sources: sources.networking,
            guideHref: '/parcours/guide/networking',
          },
          {
            id: 'taxes_done',
            title: 'Taxes (basics, keep documents)',
            avoid: ['Do not lose important documents.'],
            sources: sources.taxes,
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
          },
          {
            id: 'phone_done',
            title: 'الهاتف (باقة / شريحة)',
            avoid: ['تجنب العقود الطويلة في البداية.'],
            sources: sources.phone,
          },
          {
            id: 'bank_done',
            title: 'حساب بنكي (بطاقة)',
            avoid: ['اطلب عروض القادمين الجدد لتقليل الرسوم.'],
            sources: sources.bank,
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
            guideHref: '/parcours/guide/health',
          },
          {
            id: 'housing_done',
            title: 'سكن طويل المدى (عقد, وديعة)',
            avoid: ['لا تدفع قبل الزيارة وتوقيع العقد.'],
            sources: sources.housing,
          },
          {
            id: 'license_done',
            title: 'رخصة القيادة (حسب المقاطعة)',
            avoid: ['لا تقد بدون رخصة صالحة وتامين.'],
            sources: sources.license,
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
            guideHref: '/parcours/guide/integration',
          },
          {
            id: 'network_done',
            title: 'توسيع العلاقات (لينكدان, مجتمعات)',
            avoid: ['لا تؤجل بناء العلاقات.'],
            sources: sources.networking,
            guideHref: '/parcours/guide/networking',
          },
          {
            id: 'taxes_done',
            title: 'الضرائب (اساسيات, وثائق)',
            avoid: ['لا تفقد الوثائق المهمة.'],
            sources: sources.taxes,
          },
        ],
      },
    ],
  },
};

export function getChecklistDictionary(locale: ChecklistLocale) {
  return checklistDictionary[locale] ?? checklistDictionary.fr;
}
