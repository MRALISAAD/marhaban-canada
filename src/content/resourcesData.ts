export type ResourceCategoryId =
  | 'arrival'
  | 'housing'
  | 'health'
  | 'employment'
  | 'documents'
  | 'transport'
  | 'credit'
  | 'taxes'
  | 'integration';

export type ResourceProvince = 'qc' | 'on' | 'bc' | 'ab' | 'other' | 'all';

export type ResourceDataItem = {
  id: string;
  category: ResourceCategoryId;
  provinces: ResourceProvince[];
  tags: string[];
  official: boolean;
  recommended?: boolean;
  url: string;
  priority: number;
};

export const resourcesData: ResourceDataItem[] = [
  {
    id: 'arrival-services',
    category: 'arrival',
    provinces: ['all'],
    tags: ['immigration', 'settlement'],
    official: true,
    recommended: true,
    url: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants.html',
    priority: 1,
  },
  {
    id: 'ircc',
    category: 'arrival',
    provinces: ['all'],
    tags: ['immigration', 'status'],
    official: true,
    url: 'https://www.canada.ca/fr/immigration-refugies-citoyennete.html',
    priority: 2,
  },
  {
    id: 'cmhc',
    category: 'housing',
    provinces: ['all'],
    tags: ['housing', 'lease'],
    official: true,
    recommended: true,
    url: 'https://www.cmhc-schl.gc.ca/',
    priority: 1,
  },
  {
    id: 'tal-qc',
    category: 'housing',
    provinces: ['qc'],
    tags: ['housing', 'quebec'],
    official: true,
    url: 'https://www.tal.gouv.qc.ca/',
    priority: 2,
  },
  {
    id: 'health-card',
    category: 'health',
    provinces: ['all'],
    tags: ['health', 'card'],
    official: true,
    recommended: true,
    url: 'https://www.canada.ca/fr/sante-publique/services/soins-sante-carte-assurance-maladie.html',
    priority: 1,
  },
  {
    id: 'ramq',
    category: 'health',
    provinces: ['qc'],
    tags: ['health', 'quebec'],
    official: true,
    url: 'https://www.ramq.gouv.qc.ca/',
    priority: 2,
  },
  {
    id: 'ohip',
    category: 'health',
    provinces: ['on'],
    tags: ['health', 'ontario'],
    official: true,
    url: 'https://www.ontario.ca/page/apply-ohip-and-get-health-card',
    priority: 2,
  },
  {
    id: 'msp',
    category: 'health',
    provinces: ['bc'],
    tags: ['health', 'bc'],
    official: true,
    url: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/eligibility-and-enrolment',
    priority: 2,
  },
  {
    id: 'ahcip',
    category: 'health',
    provinces: ['ab'],
    tags: ['health', 'alberta'],
    official: true,
    url: 'https://www.alberta.ca/ahcip',
    priority: 2,
  },
  {
    id: 'jobbank',
    category: 'employment',
    provinces: ['all'],
    tags: ['jobs', 'offers'],
    official: true,
    recommended: true,
    url: 'https://www.guichetemplois.gc.ca/',
    priority: 1,
  },
  {
    id: 'labour-standards',
    category: 'employment',
    provinces: ['all'],
    tags: ['jobs', 'rights'],
    official: true,
    url: 'https://www.canada.ca/fr/emploi-developpement-social/services/normes-travail.html',
    priority: 2,
  },
  {
    id: 'documents-guide',
    category: 'documents',
    provinces: ['all'],
    tags: ['documents', 'checklist'],
    official: false,
    recommended: true,
    url: '/ressources/guides/documents',
    priority: 1,
  },
  {
    id: 'transport-guide',
    category: 'transport',
    provinces: ['all'],
    tags: ['transport', 'license'],
    official: false,
    recommended: true,
    url: '/ressources/guides/transport',
    priority: 1,
  },
  {
    id: 'credit-guide',
    category: 'credit',
    provinces: ['all'],
    tags: ['credit', 'score'],
    official: false,
    recommended: true,
    url: '/ressources/guides/credit',
    priority: 1,
  },
  {
    id: 'driving',
    category: 'transport',
    provinces: ['all'],
    tags: ['transport', 'license'],
    official: true,
    url: 'https://www.canada.ca/fr/services/transport/conduire.html',
    priority: 2,
  },
  {
    id: 'saaq',
    category: 'transport',
    provinces: ['qc'],
    tags: ['transport', 'quebec'],
    official: true,
    url: 'https://saaq.gouv.qc.ca/',
    priority: 3,
  },
  {
    id: 'service-ontario-driving',
    category: 'transport',
    provinces: ['on'],
    tags: ['transport', 'ontario'],
    official: true,
    url: 'https://www.ontario.ca/page/driving-and-roads',
    priority: 3,
  },
  {
    id: 'icbc',
    category: 'transport',
    provinces: ['bc'],
    tags: ['transport', 'bc'],
    official: true,
    url: 'https://www.icbc.com/driver-licensing',
    priority: 3,
  },
  {
    id: 'alberta-registries',
    category: 'transport',
    provinces: ['ab'],
    tags: ['transport', 'alberta'],
    official: true,
    url: 'https://www.alberta.ca/registry-agents',
    priority: 3,
  },
  {
    id: 'credit-score',
    category: 'credit',
    provinces: ['all'],
    tags: ['credit', 'score'],
    official: true,
    url: 'https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/credit.html',
    priority: 2,
  },
  {
    id: 'taxes',
    category: 'taxes',
    provinces: ['all'],
    tags: ['taxes', 'documents'],
    official: true,
    recommended: true,
    url: 'https://www.canada.ca/fr/agence-revenu.html',
    priority: 1,
  },
  {
    id: 'integration',
    category: 'integration',
    provinces: ['all'],
    tags: ['integration', 'community'],
    official: false,
    recommended: true,
    url: 'https://211.ca/fr/',
    priority: 2,
  },
];
