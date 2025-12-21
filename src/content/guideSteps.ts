export type Step = {
  id: string;
  title: string;
  phase: 'Semaine 1' | 'Mois 1' | 'En continu';
  summary: string;
  motto: string;
  cta: { label: string; href: string };
  what: string;
  why: string[];
  how: string[];
  docs: string[];
  avoid: string[];
  smartTips: string[];
};

export const steps: Record<string, Step> = {
  nas: {
    id: 'nas',
    title: "NAS — Numéro d’assurance sociale",
    phase: 'Semaine 1',
    summary: 'Indispensable pour travailler et accéder à plusieurs services publics.',
    motto: 'Sans NAS, pas de travail légal.',
    cta: {
      label: 'Trouver un bureau Service Canada',
      href: 'https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html',
    },
    what:
      'Le NAS est ton identifiant officiel au Canada. On te le demande pour travailler et pour certaines démarches.',
    why: ['Travailler légalement.', 'Être payé correctement.', 'Accéder à certains services fédéraux.'],
    how: [
      'Vérifie que ton permis ou ton statut est valide.',
      'Rassemble les documents demandés (originaux).',
      'Trouve un point de service Service Canada près de toi.',
      'Présente-toi sur place (souvent plus rapide).',
      'Suis les instructions et vérifie les informations avant de partir.',
      'Range ton numéro dans un endroit sûr (ne le partage pas).',
    ],
    docs: ['Passeport', 'Permis ou document de statut valide', 'Adresse et coordonnées (si demandées)'],
    avoid: [
      "Payer quelqu’un pour “faire le NAS”.",
      'Partager ton NAS par téléphone, message ou e-mail.',
      'Remplir un formulaire “non officiel” sur un site douteux.',
      'Croire aux offres payantes qui promettent d’aller plus vite.',
      'Donner ton NAS à n’importe qui “pour vérifier”.',
    ],
    smartTips: [
      'Va tôt le matin pour réduire l’attente.',
      'Garde une copie sécurisée de tes documents, pas ton NAS en clair.',
      'Donne ton NAS seulement quand c’est vraiment nécessaire.',
      'Si quelqu’un insiste ou te presse, reste prudent.',
      'Note la date de ta demande pour tes dossiers.',
    ],
  },

  phone: {
    id: 'phone',
    title: 'Téléphone — Forfait et carte SIM',
    phase: 'Semaine 1',
    summary: "Utile pour l’emploi, la banque et les démarches du quotidien.",
    motto: 'Commence flexible. Pas de contrat long.',
    cta: {
      label: 'Comparer les forfaits près de moi',
      href: 'https://crtc.gc.ca/fra/phone/mobile.htm',
    },
    what:
      'Un numéro canadien facilite tes démarches. Il sert pour les appels, les SMS et la vérification de comptes.',
    why: ['Être joignable rapidement.', 'Valider des comptes officiels.', 'Recevoir des appels liés au travail.'],
    how: [
      'Compare 2–3 offres (prix, données, appels).',
      'Vérifie la couverture dans ton quartier.',
      'Choisis un forfait sans engagement au début.',
      'Apporte une pièce d’identité si demandée.',
      'Achète une carte SIM ou un forfait prépayé.',
      'Active la ligne et teste appels, SMS et données.',
      'Garde une copie du reçu ou du contrat.',
    ],
    docs: ["Pièce d’identité", 'Adresse locale (si demandée)', 'Carte bancaire ou argent comptant'],
    avoid: [
      'Signer un contrat 24 mois trop tôt.',
      'Prendre un téléphone “gratuit” mais un forfait très cher.',
      "Accepter des frais d’activation sans les comprendre.",
      'Ignorer les limites de données et les frais de dépassement.',
      'Activer l’itinérance (roaming) sans besoin.',
    ],
    smartTips: [
      'Commence simple, puis ajuste après 2–3 semaines.',
      'Demande le coût total mensuel, taxes incluses.',
      'Teste la couverture là où tu vis et travailles.',
      'Demande si la résiliation est gratuite (sans engagement).',
      'La portabilité du numéro est souvent possible si tu changes plus tard.',
    ],
  },

  bank: {
    id: 'bank',
    title: 'Banque — Compte et cartes',
    phase: 'Semaine 1',
    summary: 'Indispensable pour recevoir un salaire et payer sans frais inutiles.',
    motto: 'Ne paie pas de frais mensuels au début.',
    cta: {
      label: 'Comparer les banques “nouveaux arrivants”',
      href: 'https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/banque.html',
    },
    what:
      'Un compte bancaire sert à recevoir ton salaire et payer tes dépenses. La carte débit est pour le quotidien. La carte de crédit aide à construire ton historique de crédit.',
    why: ['Recevoir ton salaire.', 'Payer ton loyer et tes factures.', 'Construire ton crédit en sécurité.'],
    how: [
      'Compare les offres “nouveaux arrivants”.',
      'Choisis une banque proche ou pratique (app + guichet).',
      'Prends rendez-vous si possible.',
      'Apporte passeport et preuve de statut.',
      'Ouvre un compte courant + carte débit.',
      'Si besoin, demande une petite carte de crédit.',
      'Paye à temps et garde une faible utilisation.',
    ],
    docs: ['Passeport', 'Preuve de statut', 'Adresse locale (si possible)'],
    avoid: [
      'Forfaits avec frais cachés.',
      'Assurances inutiles vendues au comptoir.',
      'Limite de crédit trop élevée dès le début.',
      'Signer sans comprendre les conditions.',
      'Retards de paiement sur la carte de crédit.',
    ],
    smartTips: [
      'Demande clairement le “forfait nouveaux arrivants”.',
      'Essaie d’obtenir 0$ de frais mensuels au début.',
      'Commence avec une petite limite de crédit.',
      'Paye la carte à temps, chaque mois.',
      'Garde l’utilisation sous environ 30% si possible.',
    ],
  },

  housing: {
    id: 'housing',
    title: 'Logement — Chercher et signer',
    phase: 'Mois 1',
    summary: 'Trouver un logement stable sans mauvaises surprises.',
    motto: "Pas de visite, pas d’argent.",
    cta: {
      label: 'Comprendre les règles de location',
      href: 'https://www.cmhc-schl.gc.ca/fr/consommateurs/guide-location',
    },
    what:
      'La recherche de logement demande des visites et un bail clair. Un logement temporaire peut t’aider au début.',
    why: ['Avoir une adresse stable.', 'Éviter les arnaques fréquentes.', 'Comprendre tes droits selon ta province.'],
    how: [
      'Calcule ton budget (loyer + services + transport).',
      'Choisis des quartiers réalistes pour ton quotidien.',
      'Planifie des visites réelles (pas seulement vidéo).',
      'Vérifie le bail et pose tes questions.',
      'Demande un reçu pour chaque paiement.',
      'Signe seulement quand tout est clair.',
    ],
    docs: ["Pièce d’identité", 'Preuve de revenu ou d’épargne', 'Références (si possible)'],
    avoid: [
      "Envoyer de l’argent avant une visite.",
      'Payer en cash sans reçu.',
      'Signer un bail sans le lire.',
      'Croire à une annonce “trop parfaite”.',
      'Accepter une pression (“il faut payer maintenant”).',
    ],
    smartTips: [
      'Commence par temporaire si tu es pressé.',
      'Demande ce qui est inclus (chauffage, eau, internet).',
      'Prends des photos pendant la visite.',
      'Garde les échanges par écrit.',
      'Vérifie les règles locales (dépôts, avis, augmentation).',
    ],
  },

  license: {
    id: 'license',
    title: 'Permis — Conduire légalement',
    phase: 'Mois 1',
    summary: 'Vérifier si ton permis est reconnu et comment obtenir un permis local.',
    motto: 'Chaque province a ses règles.',
    cta: {
      label: 'Vérifier les règles dans ma province',
      href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/permis-conduire-canadien.html',
    },
    what:
      'Le permis de conduire dépend de ta province. La conversion et les examens varient selon ton pays d’origine.',
    why: ['Conduire légalement.', 'Éviter des amendes.', 'Garder une assurance valide.'],
    how: [
      'Vérifie la durée autorisée avec ton permis actuel.',
      'Regarde si ton pays a une entente avec ta province.',
      'Prépare une traduction si demandée.',
      'Prends rendez-vous pour l’évaluation ou les examens.',
      'Passe le test théorique si requis.',
      'Passe le test pratique si requis.',
      'Récupère ton permis local et garde tes preuves.',
    ],
    docs: ['Permis actuel', "Pièce d’identité", 'Preuve de statut', 'Dossier de conduite (si requis)'],
    avoid: [
      'Conduire sans assurance valide.',
      'Ignorer les délais de conversion.',
      'Payer un service non officiel “garanti”.',
      'Oublier les documents demandés au rendez-vous.',
    ],
    smartTips: [
      'Demande la liste officielle des documents.',
      'Réserve tôt : les rendez-vous peuvent être longs.',
      'Apprends les panneaux locaux (différences).',
      'Garde une copie de tes confirmations.',
      'Vérifie les règles d’assurance liées au permis.',
    ],
  },

  health: {
    id: 'health',
    title: 'Santé — Assurance maladie',
    phase: 'Mois 1',
    summary: 'Activer ta couverture de santé le plus vite possible.',
    motto: 'Inscris-toi dès que possible.',
    cta: {
      label: "S’inscrire à l’assurance santé",
      href: 'https://www.canada.ca/fr/sante-publique/services/soins-sante-carte-assurance-maladie.html',
    },
    what:
      'L’assurance maladie publique est gérée par chaque province. Il peut y avoir un délai d’attente avant le début de la couverture.',
    why: ['Éviter des frais élevés.', 'Accéder aux soins essentiels.', 'Réduire le stress en cas d’urgence.'],
    how: [
      'Vérifie ton admissibilité selon ta province.',
      'Rassemble tes documents (statut + adresse).',
      'Dépose la demande en ligne ou en personne.',
      'Note la date estimée de début de couverture.',
      'Si besoin, garde une assurance temporaire.',
      'Garde une copie de ta demande et des confirmations.',
    ],
    docs: ["Pièce d’identité", 'Preuve de statut', "Preuve d’adresse locale"],
    avoid: [
      'Attendre trop longtemps pour demander.',
      'Confondre assurance voyage et assurance provinciale.',
      'Ignorer un délai de carence.',
      'Jeter les confirmations de demande.',
    ],
    smartTips: [
      'Demande clairement s’il y a un délai d’attente.',
      'Garde une copie numérique + papier.',
      'Repère une clinique proche de chez toi.',
      'Vérifie ce qui est couvert et non couvert.',
      'Mets tes numéros d’urgence dans ton téléphone.',
    ],
  },

  taxes: {
    id: 'taxes',
    title: 'Impôts — Déclarer correctement',
    phase: 'En continu',
    summary: 'Organiser tes papiers pour éviter le stress des impôts.',
    motto: 'Garde tout. Déclare tout.',
    cta: {
      label: 'Comprendre les impôts au Canada',
      href: 'https://www.canada.ca/fr/services/impots.html',
    },
    what:
      'La déclaration d’impôts se fait chaque année. Elle sert aussi à obtenir certains crédits et prestations.',
    why: ['Éviter des pénalités.', 'Recevoir les crédits auxquels tu as droit.', 'Avoir un dossier clair.'],
    how: [
      'Garde tes documents (revenus, loyers, reçus).',
      'Note les dates limites importantes.',
      'Crée un compte officiel si utile (selon ta situation).',
      'Choisis un logiciel autorisé ou un préparateur fiable.',
      'Vérifie les informations avant d’envoyer.',
      'Garde une copie de ta déclaration.',
    ],
    docs: ['Relevés de revenus (T4 et autres)', 'Reçus utiles (selon ta situation)', 'Infos bancaires pour dépôts'],
    avoid: [
      'Jeter des documents importants.',
      'Déclarer en retard sans plan.',
      'Utiliser un service non fiable.',
      'Oublier un revenu ou une info.',
      'Ignorer les crédits provinciaux possibles.',
    ],
    smartTips: [
      'Classe tes documents chaque mois.',
      'Demande une aide gratuite si disponible près de toi.',
      'Garde une copie numérique et papier.',
      'Note les dates limites dans ton calendrier.',
      'Si tu doutes, vérifie sur une source officielle.',
    ],
  },

  networking: {
    id: 'networking',
    title: 'Réseautage — Se créer des contacts',
    phase: 'En continu',
    summary: 'Construire un réseau utile pour des opportunités et des conseils.',
    motto: 'Au Canada, le réseau ouvre des portes.',
    cta: {
      label: 'Commencer mon réseau professionnel',
      href: 'https://www.guichetemplois.gc.ca/',
    },
    what:
      'Le réseautage, c’est créer des contacts utiles. Ça aide à comprendre le marché et à trouver des opportunités.',
    why: ['Accéder à des offres non publiées.', 'Comprendre le marché local.', 'Être recommandé plus facilement.'],
    how: [
      'Mets à jour ton profil (CV + LinkedIn).',
      'Choisis un domaine et 2–3 types de contacts.',
      'Rejoins des groupes et communautés (en ligne et local).',
      'Participe à des événements simples (même 1h).',
      'Demande des “entretiens informels” (15–20 min).',
      'Remercie et fais un suivi court.',
    ],
    docs: ['CV à jour', 'Profil LinkedIn', 'Liste claire de tes compétences'],
    avoid: [
      'Envoyer des messages trop longs.',
      'Demander un emploi dès le premier message.',
      'Ne jamais faire de suivi.',
      'Ignorer les événements gratuits.',
    ],
    smartTips: [
      'Prépare un pitch de 20 secondes.',
      'Pose une question simple et précise.',
      'Note les noms, rôles et dates.',
      'Remercie après chaque aide.',
      'Sois régulier : 2 actions par semaine, c’est déjà bien.',
    ],
  },

  integration: {
    id: 'integration',
    title: 'Intégration — Services locaux',
    phase: 'En continu',
    summary: 'Utiliser les services pour accélérer ton installation.',
    motto: 'Utilise les services locaux.',
    cta: {
      label: "Trouver un organisme d’accueil",
      href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants.html',
    },
    what:
      'Les organismes d’accueil aident pour l’emploi, la langue et les démarches. Ils connaissent les ressources locales.',
    why: ['Gagner du temps.', 'Éviter des erreurs courantes.', "Rencontrer d’autres personnes."],
    how: [
      'Cherche un organisme près de chez toi.',
      'Prends un rendez-vous d’accueil.',
      'Explique ta situation simplement.',
      'Demande un plan en 3 priorités.',
      'Participe à un atelier utile.',
      'Garde les contacts et reviens si besoin.',
    ],
    docs: ["Pièce d’identité", 'Preuve de statut', 'Coordonnées de contact'],
    avoid: [
      'Tout faire seul sans demander d’aide.',
      'Ignorer les services gratuits.',
      'Ne pas poser de questions.',
      'Ne pas faire de suivi après le rendez-vous.',
    ],
    smartTips: [
      'Note tes objectifs avant le rendez-vous.',
      'Demande une liste d’actions prioritaires.',
      'Sois honnête sur tes contraintes.',
      'Garde les infos importantes dans un dossier.',
      'Reviens si ta situation change.',
    ],
  },
};

export const stepIds = [
  'nas',
  'phone',
  'bank',
  'housing',
  'license',
  'health',
  'taxes',
  'networking',
  'integration',
] as const;
