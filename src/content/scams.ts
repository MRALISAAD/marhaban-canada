export type ScamCategory = {
  id: string;
  title: string;
  summary: string;
  icon: 'home' | 'briefcase' | 'phone' | 'credit' | 'shield' | 'store';
  keywords: string[];
  guideSlug: string;
};

export type ScamGuide = {
  slug: string;
  title: string;
  subtitle: string;
  scenario: string[];
  redFlags: string[];
  actions: string[];
  neverDo: string[];
  mantra: string;
  sources: { label: string; href: string }[];
};

export const scamCategories: ScamCategory[] = [
  {
    id: 'housing',
    title: 'Logement',
    summary: 'Faux propriétaires, dépôts suspects, pression.',
    icon: 'home',
    keywords: ['logement', 'bail', 'dépôt', 'visite', 'appartement'],
    guideSlug: 'logement',
  },
  {
    id: 'jobs',
    title: 'Emploi',
    summary: 'Offres trop belles, faux recruteurs, frais.',
    icon: 'briefcase',
    keywords: ['emploi', 'recruteur', 'cv', 'salaire', 'offre'],
    guideSlug: 'emploi',
  },
  {
    id: 'phone',
    title: 'Téléphone / forfaits',
    summary: 'Forfaits cachés, ventes agressives.',
    icon: 'phone',
    keywords: ['téléphone', 'forfait', 'sim', 'mobile'],
    guideSlug: 'telephone',
  },
  {
    id: 'bank',
    title: 'Banque / cartes / frais',
    summary: 'Demandes de frais, comptes douteux.',
    icon: 'credit',
    keywords: ['banque', 'carte', 'frais', 'virement'],
    guideSlug: 'banque',
  },
  {
    id: 'immigration',
    title: 'Immigration / faux agents',
    summary: 'Faux consultants, dossiers payants.',
    icon: 'shield',
    keywords: ['immigration', 'visa', 'agent', 'consultant'],
    guideSlug: 'immigration',
  },
  {
    id: 'marketplace',
    title: 'Marketplace (Kijiji/FB)',
    summary: 'Faux vendeurs, paiement avance.',
    icon: 'store',
    keywords: ['kijiji', 'marketplace', 'annonce', 'achat'],
    guideSlug: 'marketplace',
  },
];

export const scamGuides: ScamGuide[] = [
  {
    slug: 'logement',
    title: 'Logement',
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
    neverDo: [
      'Payer avant visite et bail signe',
      'Envoyer des documents sensibles sans vérification',
      'Accepter un contrat sans adresse claire',
    ],
    mantra: 'Pas de visite = pas d\'argent.',
    sources: [
      { label: 'SCHL - logement', href: 'https://www.cmhc-schl.gc.ca/' },
      { label: 'Canada.ca - fraude', href: 'https://www.antifraudcentre-centreantifraude.ca/' },
    ],
  },
  {
    slug: 'emploi',
    title: 'Emploi',
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
    neverDo: ['Payer pour travailler', 'Donner ton NAS avant contrat signe', 'Envoyer tes originaux'],
    mantra: 'Un vrai emploi ne demande jamais de frais.',
    sources: [
      { label: 'Guichet-Emplois', href: 'https://www.guichetemplois.gc.ca/' },
      { label: 'Centre antifraude', href: 'https://www.antifraudcentre-centreantifraude.ca/' },
    ],
  },
  {
    slug: 'telephone',
    title: 'Téléphone / forfaits',
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
    neverDo: ['Signer sans lire', 'Accepter un engagement long sans besoin', 'Perdre les preuves'],
    mantra: 'Lis tout, surtout les frais.',
    sources: [{ label: 'CRTC - services mobiles', href: 'https://crtc.gc.ca/fra/phone/mobile.htm' }],
  },
  {
    slug: 'banque',
    title: 'Banque / cartes / frais',
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
    neverDo: ['Donner ton PIN', 'Envoyer des codes de vérification', 'Transférer de l\'argent en urgence'],
    mantra: 'Ta banque ne demande jamais ton PIN.',
    sources: [
      {
        label: 'ACFC - securite bancaire',
        href: 'https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/securite.html',
      },
    ],
  },
  {
    slug: 'immigration',
    title: 'Immigration / faux agents',
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
    neverDo: ['Payer en crypto', 'Donner tes documents sans vérification', 'Croire aux garanties'],
    mantra: 'Personne ne peut garantir un visa.',
    sources: [
      {
        label: 'IRCC - immigration',
        href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete.html',
      },
      { label: 'Centre antifraude', href: 'https://www.antifraudcentre-centreantifraude.ca/' },
    ],
  },
  {
    slug: 'marketplace',
    title: 'Marketplace (Kijiji/FB)',
    subtitle: 'Arnaques liées aux ventes entre particuliers.',
    scenario: [
      'Vendeur qui exige un paiement complet avant de voir l’article.',
      'Acheteur pressé qui veut payer par virement douteux.',
      'Faux compte avec avis ou historique incohérent.',
      'Rencontre dans un lieu isolé ou à une heure tardive.',
    ],
    redFlags: [
      'Prix très bas sans explication claire.',
      'Refus de rencontre en personne.',
      'Demande de transfert d’argent ou de cartes cadeaux.',
      'Pression pour payer immédiatement.',
    ],
    actions: [
      'Privilégier une rencontre dans un lieu public.',
      'Payer sur place avec un moyen traçable.',
      'Vérifier l’identité et l’état de l’article.',
      'Garder les échanges écrits.',
    ],
    neverDo: ['Envoyer un acompte', 'Rencontrer seul dans un lieu isolé', 'Partager tes infos bancaires'],
    mantra: 'Pas de produit, pas d’argent.',
    sources: [
      { label: 'Centre antifraude', href: 'https://www.antifraudcentre-centreantifraude.ca/' },
      { label: 'Conseils de sécurité (Kijiji)', href: 'https://help.kijiji.ca/helpdesk/safety' },
    ],
  },
];

export const scamGuideMap: Record<ScamGuide['slug'], ScamGuide> = scamGuides.reduce((acc, guide) => {
  acc[guide.slug] = guide;
  return acc;
}, {} as Record<ScamGuide['slug'], ScamGuide>);
