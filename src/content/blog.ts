export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category:
    | 'Parcours'
    | 'Logement'
    | 'Banque'
    | 'Téléphone'
    | 'Santé'
    | 'Impôts'
    | 'Crédit'
    | 'Anti-fraude'
    | 'Intégration';
  readTime: string;
  date: string;
  content: string[];
  checklist?: string[];
  sources?: { label: string; url: string }[];
  relatedStep?:
    | 'nas'
    | 'phone'
    | 'bank'
    | 'housing'
    | 'license'
    | 'health'
    | 'taxes'
    | 'networking'
    | 'integration';
  featured?: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'semaine-1-plan-simple',
    title: 'Semaine 1 au Canada : le plan simple pour éviter le stress',
    excerpt: 'L’ordre qui marche : téléphone, NAS, banque. Le reste vient après.',
    category: 'Parcours',
    relatedStep: 'phone',
    featured: true,
    readTime: '4 min',
    date: '2025-12-20',
    content: [
      "À l’arrivée, vouloir tout faire en même temps crée du stress.",
      "Ton objectif n’est pas la perfection. C’est d’être opérationnel.",
      "Ordre conseillé : téléphone pour être joignable, NAS pour travailler, banque pour recevoir l’argent.",
      "Ensuite seulement : santé, logement long terme, permis.",
    ],
    checklist: [
      'Avoir un numéro local',
      'Demander le NAS',
      'Ouvrir un compte bancaire',
      'Ranger tous les documents au même endroit',
    ],
  },

  {
    slug: 'telephone-eviter-contrats',
    title: 'Téléphone : comment éviter les contrats pièges',
    excerpt: 'Commence flexible. Les téléphones “gratuits” coûtent souvent cher.',
    category: 'Téléphone',
    relatedStep: 'phone',
    featured: true,
    readTime: '3 min',
    date: '2025-12-20',
    content: [
      "Au début, tu ne connais pas encore tes besoins.",
      "Un forfait sans engagement est souvent suffisant.",
      "Vérifie le prix total, taxes incluses.",
      "Teste la couverture là où tu vis.",
    ],
    checklist: [
      'Comparer 2–3 forfaits',
      'Éviter les contrats 24 mois',
      'Demander les frais d’activation',
      'Tester appels, SMS et données',
    ],
  },

  {
    slug: 'banque-debit-vs-credit',
    title: 'Banque : débit vs crédit, la différence en 2 minutes',
    excerpt: 'Comprendre la base pour éviter les erreurs coûteuses.',
    category: 'Banque',
    relatedStep: 'bank',
    readTime: '3 min',
    date: '2025-12-20',
    content: [
      'La carte débit utilise ton argent disponible.',
      'La carte de crédit est un emprunt à rembourser.',
      'Le crédit aide à construire ton historique si tu payes à temps.',
      'Commence avec une petite limite.',
    ],
    checklist: [
      'Ouvrir un compte courant',
      'Prendre une carte débit',
      'Demander une petite carte de crédit (optionnel)',
      'Payer à temps chaque mois',
    ],
  },

  {
    slug: 'credit-construire-sans-risque',
    title: 'Crédit : construire un bon score sans se piéger',
    excerpt: 'Les règles simples qui protègent ton dossier.',
    category: 'Crédit',
    relatedStep: 'bank',
    readTime: '4 min',
    date: '2025-12-20',
    content: [
      'Le crédit repose sur la régularité.',
      'Paye toujours à temps.',
      'Utilise une petite partie de ta limite.',
      'Évite les demandes multiples au début.',
    ],
    checklist: [
      'Payer à temps',
      'Garder l’utilisation basse',
      'Éviter plusieurs cartes au début',
      'Vérifier ton dossier périodiquement',
    ],
  },

  {
    slug: 'logement-3-signaux-arnaque',
    title: 'Logement : 3 signaux d’arnaque à repérer vite',
    excerpt: 'Pas de visite, pas d’argent. Zéro pression.',
    category: 'Anti-fraude',
    relatedStep: 'housing',
    featured: true,
    readTime: '2 min',
    date: '2025-12-20',
    content: [
      'Signal 1 : on refuse la visite.',
      'Signal 2 : on te presse pour payer.',
      'Signal 3 : le prix est trop beau.',
      'Si tu doutes, stop et vérifie.',
    ],
    checklist: [
      'Refuser de payer avant visite',
      'Garder des preuves',
      'Vérifier l’identité et l’adresse',
    ],
  },

  {
    slug: 'logement-documents-demandes',
    title: 'Logement : les documents souvent demandés',
    excerpt: 'Prépare-les pour gagner du temps.',
    category: 'Logement',
    relatedStep: 'housing',
    readTime: '3 min',
    date: '2025-12-20',
    content: [
      'Les propriétaires demandent des preuves simples.',
      'Prépare tes documents à l’avance.',
      'Reste dans le cadre légal selon ta province.',
    ],
    checklist: [
      'Pièce d’identité',
      'Preuve de revenu ou d’épargne',
      'Références (si possible)',
    ],
  },

  {
    slug: 'sante-delai-attente',
    title: 'Santé : quoi faire pendant le délai d’attente',
    excerpt: 'Comprendre la couverture et éviter les surprises.',
    category: 'Santé',
    relatedStep: 'health',
    readTime: '3 min',
    date: '2025-12-20',
    content: [
      'Certaines provinces ont un délai d’attente.',
      'Garde une assurance temporaire si nécessaire.',
      'Note la date de début de couverture.',
    ],
    checklist: [
      'Vérifier l’admissibilité',
      'Demander la carte santé',
      'Garder une assurance temporaire si besoin',
    ],
  },

  {
    slug: 'impots-documents-a-garder',
    title: 'Impôts : les documents à garder dès maintenant',
    excerpt: 'Une habitude simple qui évite le stress.',
    category: 'Impôts',
    relatedStep: 'taxes',
    readTime: '3 min',
    date: '2025-12-20',
    content: [
      'Garde tous tes documents importants.',
      'Classe-les par mois.',
      'Fais une copie numérique.',
    ],
    checklist: [
      'Relevés de revenus',
      'Reçus importants',
      'Infos bancaires',
    ],
  },

  {
    slug: 'reseautage-demarrer-simple',
    title: 'Réseautage : comment commencer simplement',
    excerpt: 'Pas besoin d’être extraverti.',
    category: 'Intégration',
    relatedStep: 'networking',
    readTime: '3 min',
    date: '2025-12-20',
    content: [
      'Le réseautage commence par une conversation.',
      'Un message simple suffit.',
      'La régularité fait la différence.',
    ],
    checklist: [
      'Mettre à jour ton CV',
      'Créer ou optimiser LinkedIn',
      'Participer à un événement',
    ],
  },

  {
    slug: 'integration-services-gratuits',
    title: 'Intégration : services gratuits à utiliser',
    excerpt: 'De l’aide existe. Utilise-la.',
    category: 'Intégration',
    relatedStep: 'integration',
    readTime: '3 min',
    date: '2025-12-20',
    content: [
      'Les organismes locaux connaissent le terrain.',
      'Ils offrent souvent des services gratuits.',
      'Un rendez-vous peut t’économiser des semaines.',
    ],
    checklist: [
      'Trouver un organisme local',
      'Prendre rendez-vous',
      'Demander un plan simple',
    ],
  },

  {
    slug: 'banque-erreurs-frequentes',
    title: 'Banque : erreurs fréquentes à éviter au début',
    excerpt: 'Les pièges classiques et comment les éviter.',
    category: 'Banque',
    relatedStep: 'bank',
    readTime: '3 min',
    date: '2025-12-20',
    content: [
      'Ne prends pas de frais inutiles.',
      'Lis les conditions.',
      'Commence petit.',
    ],
    checklist: [
      'Vérifier les frais mensuels',
      'Refuser les assurances inutiles',
      'Limiter la carte de crédit',
    ],
  },

  {
    slug: 'parcours-checklist-mentale',
    title: 'Ta checklist mentale pour rester calme',
    excerpt: 'Moins de stress, plus de clarté.',
    category: 'Parcours',
    relatedStep: 'integration',
    readTime: '2 min',
    date: '2025-12-20',
    content: [
      'Respire. Tu n’as pas tout à faire aujourd’hui.',
      'Une étape à la fois.',
      'Note ce que tu as déjà fait.',
    ],
    checklist: [
      'Prioriser',
      'Avancer étape par étape',
      'Célébrer les petites victoires',
    ],
  },
  {
    slug: 'arriver-sans-stress-documents',
    title: 'Arriver sans stress : comment organiser ses documents',
    excerpt: 'Un dossier clair = moins d’angoisse et plus de rapidite.',
    category: 'Parcours',
    relatedStep: 'integration',
    readTime: '3 min',
    date: '2025-12-21',
    content: [
      'Le stress vient souvent du desordre.',
      'Un seul dossier (papier + telephone) suffit.',
      'Classe par etapes : identite, travail, logement, impots.',
    ],
    checklist: [
      'Scanner ses documents',
      'Un dossier “Canada” sur le telephone',
      'Un dossier papier a la maison',
    ],
  },
  {
    slug: 'erreurs-normales-nouveaux-arrivants',
    title: 'Les erreurs normales des nouveaux arrivants (et pourquoi c’est OK)',
    excerpt: 'Se tromper est normal. L’important, c’est d’apprendre vite.',
    category: 'Parcours',
    relatedStep: 'integration',
    readTime: '3 min',
    date: '2025-12-21',
    content: [
      'Tout le monde se trompe au debut.',
      'Le probleme n’est pas l’erreur, c’est de la repeter.',
      'Parler, demander, verifier = intelligence, pas faiblesse.',
    ],
    checklist: [
      'Demander avant de payer',
      'Verifier les sources',
      'Prendre son temps',
    ],
  },
  {
    slug: 'colocation-ou-logement-seul',
    title: 'Colocation ou logement seul : comment choisir',
    excerpt: 'Le bon choix depend de ton budget et de ton energie.',
    category: 'Logement',
    relatedStep: 'housing',
    readTime: '3 min',
    date: '2025-12-22',
    content: [
      'La colocation reduit les couts et le stress.',
      'Le logement seul apporte stabilite et intimite.',
      'Le bon choix depend de ton budget et ton energie.',
    ],
    checklist: [
      'Calculer budget reel',
      'Tester 1–2 mois',
      'Ne pas signer trop vite',
    ],
  },
  {
    slug: 'bail-quebec-ontario',
    title: 'Bail au Quebec / Ontario : ce qu’il faut savoir',
    excerpt: 'Les regles changent selon la province. Lis avant de signer.',
    category: 'Logement',
    relatedStep: 'housing',
    readTime: '3 min',
    date: '2025-12-22',
    content: [
      'Les regles changent selon la province.',
      'Depot, avis, augmentation : tout est encadre.',
      'Lire avant de signer, toujours.',
    ],
    checklist: [
      'Lire le bail en entier',
      'Poser 3 questions cles',
      'Garder une copie signee',
    ],
  },
  {
    slug: 'argent-disparait-au-debut',
    title: 'Pourquoi ton argent “disparaît” au début (et comment éviter ça)',
    excerpt: 'Les petits frais s’additionnent vite. Tout noter evite les chocs.',
    category: 'Banque',
    relatedStep: 'bank',
    readTime: '3 min',
    date: '2025-12-23',
    content: [
      'Les petits frais s’additionnent vite.',
      'Forfaits, transports, taxes surprises.',
      'Tout noter au debut evite les chocs.',
    ],
    checklist: [
      'Lister depenses fixes',
      'Verifier les frais bancaires',
      'Prevoir une marge',
    ],
  },
  {
    slug: 'carte-credit-5-regles',
    title: 'Carte de crédit : 5 règles simples à ne jamais casser',
    excerpt: 'Le credit est un outil, pas une solution.',
    category: 'Crédit',
    relatedStep: 'bank',
    readTime: '3 min',
    date: '2025-12-23',
    content: [
      'La carte n’est pas un revenu.',
      'Le retard coute cher.',
      'Le credit est un outil, pas une solution.',
    ],
    checklist: [
      'Payer a temps',
      'Ne pas depasser 30 %',
      'Une seule carte au debut',
    ],
  },
  {
    slug: 'experience-canadienne',
    title: 'Pourquoi on te demande “de l’expérience canadienne”',
    excerpt: 'Souvent une question de confiance. Le reseau aide a contourner.',
    category: 'Intégration',
    relatedStep: 'networking',
    readTime: '3 min',
    date: '2025-12-24',
    content: [
      'Ce n’est pas toujours du racisme.',
      'C’est souvent une question de confiance.',
      'Le reseau et les references contournent ca.',
    ],
    checklist: [
      'Adapter son CV',
      'Parler a des gens du secteur',
      'Chercher des references',
    ],
  },
  {
    slug: 'cv-canadien-a-eviter',
    title: 'CV canadien : ce qu’il faut enlever absolument',
    excerpt: 'Moins d’infos personnelles, plus de resultats.',
    category: 'Intégration',
    relatedStep: 'networking',
    readTime: '3 min',
    date: '2025-12-24',
    content: [
      'Pas de photo.',
      'Pas d’age.',
      'Pas de details inutiles.',
    ],
    checklist: [
      '1–2 pages max',
      'Competences avant diplomes',
      'Resultats concrets',
    ],
  },
  {
    slug: 'quand-aller-urgence',
    title: 'Quand aller à l’urgence (et quand éviter)',
    excerpt: 'Savoir ou aller fait gagner du temps.',
    category: 'Santé',
    relatedStep: 'health',
    readTime: '3 min',
    date: '2025-12-25',
    content: [
      'L’urgence n’est pas un medecin de famille.',
      'Des alternatives existent.',
      'Savoir ou aller fait gagner du temps.',
    ],
    checklist: [
      'Cliniques sans rendez-vous',
      'Numeros utiles',
      'Carte sante accessible',
    ],
  },
  {
    slug: 'assurance-privee-utile',
    title: 'Assurance privée : quand est-elle vraiment utile',
    excerpt: 'Utile pendant les delais. Lis bien les exclusions.',
    category: 'Santé',
    relatedStep: 'health',
    readTime: '3 min',
    date: '2025-12-25',
    content: [
      'Utile pendant les delais.',
      'Inutile apres, dans certains cas.',
      'Lire les exclusions.',
    ],
    checklist: [
      'Verifier couverture',
      'Verifier duree',
      'Comparer 2 options',
    ],
  },
  {
    slug: 'impots-declarer-sans-revenu',
    title: 'Impôts : pourquoi déclarer même sans revenu',
    excerpt: 'Ne rien declarer = perdre des credits.',
    category: 'Impôts',
    relatedStep: 'taxes',
    readTime: '3 min',
    date: '2025-12-26',
    content: [
      'Les credits sont lies a la declaration.',
      'Ne rien declarer = perdre de l’argent.',
      'C’est normal la premiere annee.',
    ],
    checklist: [
      'Declarer chaque annee',
      'Garder preuves',
      'Verifier credits',
    ],
  },
  {
    slug: 'lettres-officielles-sans-panique',
    title: 'Les lettres officielles : comment les lire sans paniquer',
    excerpt: 'Lire calmement, noter l’action demandee.',
    category: 'Parcours',
    relatedStep: 'integration',
    readTime: '3 min',
    date: '2025-12-26',
    content: [
      'Une lettre n’est pas une sanction.',
      'Lire calmement.',
      'Chercher la date et l’action demandee.',
    ],
    checklist: [
      'Lire 2 fois',
      'Noter les delais',
      'Demander de l’aide si besoin',
    ],
  },
  {
    slug: 'paiements-a-refuser',
    title: 'Les paiements à refuser toujours',
    excerpt: 'Cartes cadeaux, crypto, pression: stop immediat.',
    category: 'Anti-fraude',
    relatedStep: 'bank',
    readTime: '2 min',
    date: '2025-12-27',
    content: [
      'Cartes cadeaux = fraude.',
      'Crypto = alerte rouge.',
      'Pression = stop immediat.',
    ],
    checklist: [
      'Refuser urgence',
      'Verifier identite',
      'Ne jamais payer dans la peur',
    ],
  },
  {
    slug: 'phrase-danger-accelerer',
    title: '“On va t’aider pour accélérer” : phrase dangereuse',
    excerpt: 'Personne ne peut accelerer officiellement.',
    category: 'Anti-fraude',
    relatedStep: 'nas',
    readTime: '2 min',
    date: '2025-12-27',
    content: [
      'Personne ne peut accelerer officiellement.',
      'Les demarches sont souvent gratuites.',
      'Le temps est normal.',
    ],
    checklist: [
      'Verifier site officiel',
      'Refuser intermediaires',
      'Prendre son temps',
    ],
  },
  {
    slug: 'se-sentir-seul-debut',
    title: 'Pourquoi se sentir seul est normal au début',
    excerpt: 'Le choc culturel est reel. Ca passe avec des liens.',
    category: 'Intégration',
    relatedStep: 'integration',
    readTime: '3 min',
    date: '2025-12-28',
    content: [
      'Choc culturel reel.',
      'Le cerveau est en adaptation.',
      'Ca passe avec le temps et les liens.',
    ],
    checklist: [
      'Parler a quelqu’un',
      'Sortir regulierement',
      'Ne pas s’isoler',
    ],
  },
  {
    slug: 'routine-simple-stabiliser',
    title: 'Créer une routine simple pour se stabiliser',
    excerpt: 'Une routine reduit l’anxiete et aide a avancer.',
    category: 'Parcours',
    relatedStep: 'integration',
    readTime: '3 min',
    date: '2025-12-28',
    content: [
      'Le cerveau aime la repetition.',
      'Une routine reduit l’anxiete.',
      'Commencer petit.',
    ],
    checklist: [
      'Heures fixes',
      'Activite quotidienne',
      'Un objectif simple',
    ],
  },
];
