export type ScamSituation = {
  number: string;
  iconKey: 'briefcase' | 'badge' | 'message' | 'home' | 'userx' | 'grad';
  title: string;
  quote: string;
  reality: string;
  flags: string[];
  action: string;
  slug?: string;
};

export type VerifyStep = {
  step: string;
  title: string;
  body: string;
};

export type OfficialLink = {
  category: string;
  label: string;
  href: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ArnaqueCopy = {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  situationsEyebrow: string;
  situationsTitle: string;
  situationsSubtitle: string;
  seeGuide: string;
  situations: ScamSituation[];
  flagsEyebrow: string;
  flagsTitle: string;
  flagsNote: string;
  flags: string[];
  verifyEyebrow: string;
  verifyTitle: string;
  verifySteps: VerifyStep[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
  ctaNote: string;
  ctaButton: string;
  faqEyebrow: string;
  faqTitle: string;
  faqs: FaqItem[];
  officialLinksTitle: string;
  officialLinks: OfficialLink[];
  disclaimerTitle: string;
  disclaimerExtra: string;
};

const fr: ArnaqueCopy = {
  heroEyebrow: 'Protection · Gratuit à lire',
  heroTitle: 'Avant de payer, vérifie.',
  heroSubtitle:
    "Les arnaques qui ciblent les nouveaux arrivants ne sont pas rares. Pas parce que tu es naïf — mais parce qu'elles sont bien construites. Cette page t'aide à voir clair avant d'agir.",
  heroBadge:
    "Marhaban Canada n'est pas un service de police ni une institution gouvernementale. Nous offrons une orientation pratique.",
  situationsEyebrow: 'Situations courantes',
  situationsTitle: "Six situations à connaître avant qu'il soit trop tard.",
  situationsSubtitle:
    "Ces scénarios sont inspirés de situations courantes vécues par des nouveaux arrivants au Canada. Les personnes mentionnées sont fictives. L'objectif : t'équiper, pas t'effrayer.",
  seeGuide: 'Voir le guide complet',
  situations: [
    {
      number: '01',
      iconKey: 'briefcase',
      title: "L'emploi contre argent",
      quote:
        "Le poste est confirmé, mais l'employeur demande 350 $ pour les frais administratifs. C'est normal ici au Canada.",
      reality:
        "Au Canada, un employeur légitime ne te demande jamais de payer pour accéder à un emploi. Les frais de permis de travail sont à la charge de l'employeur. Si quelqu'un demande de l'argent avant que tu commences, c'est un signal d'alerte majeur.",
      flags: [
        'Offre reçue sans entretien préalable',
        "Salaire très attractif pour peu de qualifications demandées",
        "L'entreprise est introuvable sur LinkedIn ou n'a pas de site vérifiable",
        'Paiement demandé en virement, carte-cadeau ou cryptomonnaie',
      ],
      action:
        "Ne paie rien. Cherche l'entreprise sur le Registre des entreprises de ta province avant tout.",
      slug: 'emploi',
    },
    {
      number: '02',
      iconKey: 'badge',
      title: "La promesse d'immigration garantie",
      quote:
        "J'ai des contacts à IRCC. Avec moi, ton dossier passe en priorité. Donne-moi 2 500 $ et je m'occupe de tout.",
      reality:
        "Personne ne peut garantir un résultat en immigration. Aucun consultant ni aucun avocat ne peut promettre une approbation. Les décisions appartiennent exclusivement aux autorités gouvernementales.",
      flags: [
        'Utilisation des mots "garanti" ou "assuré"',
        'Prétend avoir des contacts internes à IRCC',
        'Pas de numéro de membre ICCRC vérifiable',
        "Te déconseille de consulter d'autres professionnels",
      ],
      action:
        "Demande son numéro ICCRC et vérifie-le sur college-ic.ca. Sans numéro vérifiable, ne lui confie rien.",
      slug: 'immigration',
    },
    {
      number: '03',
      iconKey: 'message',
      title: 'Les documents demandés par message',
      quote:
        "C'est pour accélérer ta demande. J'ai besoin de ton passeport et de ta carte d'assurance sociale ce soir — envoie-moi une photo par WhatsApp.",
      reality:
        "Aucune institution officielle ne demandera tes documents sensibles par WhatsApp ou Telegram. Ton numéro d'assurance sociale est extrêmement sensible — sa divulgation peut mener à une usurpation d'identité.",
      flags: [
        'Urgence inhabituelle ("ce soir", "avant demain")',
        'Documents demandés par application de messagerie',
        "La personne évite les canaux officiels pour aller plus vite",
        "Elle ne t'explique pas pourquoi ces documents sont nécessaires",
      ],
      action:
        "Ne partage jamais ton NAS ou ton passeport par message. Les professionnels légitimes utilisent des portails sécurisés officiels.",
    },
    {
      number: '04',
      iconKey: 'home',
      title: 'Le loyer avant la visite',
      quote:
        "Je suis hors du pays en ce moment. Envoie-moi le premier et dernier mois de loyer par virement et je t'envoie les clés. C'est une offre limitée.",
      reality:
        "Un propriétaire légitime ne te demande pas de payer avant une visite. S'il est absent, une visite virtuelle en temps réel est possible — mais le paiement attend toujours la signature d'un bail officiel.",
      flags: [
        'Prix bien en dessous du marché local',
        'Le propriétaire est "à l\'étranger" ou "en voyage"',
        'Paiement demandé par virement, Western Union ou carte-cadeau',
        'Pression pour décider rapidement ("un autre intéressé ce soir")',
      ],
      action:
        "Ne transfère jamais d'argent sans avoir visité le logement et signé un bail. Compare le prix sur Rentals.ca.",
      slug: 'logement',
    },
    {
      number: '05',
      iconKey: 'userx',
      title: 'Le faux consultant en immigration',
      quote:
        "J'ai aidé des dizaines de personnes de notre communauté. Tout le monde passe par moi. Je n'ai pas de site mais tu peux appeler untel pour me recommander.",
      reality:
        "Au Canada, toute personne qui, contre rémunération, prépare des formulaires d'immigration doit être membre de l'ICCRC. Les consultants informels ne peuvent pas corriger leurs erreurs officiellement et tu n'as aucun recours légal contre eux.",
      flags: [
        'Refuse ou incapable de donner un numéro ICCRC',
        'Travaille uniquement de bouche à oreille, sans adresse ou site',
        'Ne remet pas de contrat écrit avant de commencer',
        'Honoraires payables en cash uniquement',
      ],
      action:
        "Vérifie son nom sur college-ic.ca avant tout engagement. S'il n'y figure pas, n'avance rien.",
      slug: 'immigration',
    },
    {
      number: '06',
      iconKey: 'grad',
      title: "La fausse aide pour l'admission scolaire",
      quote:
        "Je travaille avec les universités canadiennes. Je peux t'obtenir une lettre d'acceptation en 3 semaines pour n'importe quel programme. Mon tarif : 800 $.",
      reality:
        "Les universités gèrent leurs propres admissions directement ou via des agents accrédités qui ne te chargent généralement rien. Une lettre obtenue de façon frauduleuse peut invalider ton permis d'études.",
      flags: [
        "Promet une admission sans regarder ton dossier académique",
        "Demande de payer avant de contacter l'établissement",
        "La lettre d'acceptation arrive trop vite ou semble mal formatée",
        "L'établissement ne figure pas sur la liste DLI d'IRCC",
      ],
      action:
        "Vérifie que l'établissement est sur la liste DLI d'IRCC. Contacte directement le bureau des admissions.",
    },
  ],
  flagsEyebrow: "Signaux d'alarme",
  flagsTitle: 'Si tu coches une seule de ces cases, arrête-toi.',
  flagsNote:
    "Les arnaques fonctionnent parfois à l'intérieur des communautés, en exploitant la confiance. Être prudent avec quelqu'un que tu ne connais pas bien n'est pas une trahison.",
  flags: [
    'On te promet un résultat garanti (visa, emploi, logement, admission)',
    'Paiement demandé en cash, carte-cadeau, Western Union ou cryptomonnaie',
    'On te demande ton NAS, passeport ou infos bancaires par WhatsApp',
    'Urgence artificielle ("offre valable 24h", "dépêche-toi ou tu perds ta place")',
    'La personne refuse de te donner un contrat écrit avant de commencer',
    "Pas d'adresse professionnelle, de site web ni de numéro ICCRC vérifiable",
    'Elle te dit de ne pas parler à d\'autres personnes',
    'Elle prétend avoir des "contacts internes" dans les administrations',
    'Le logement est disponible mais aucune visite n\'est possible',
    'L\'offre d\'emploi est très bonne, mais tu dois payer des frais d\'abord',
    'La lettre officielle semble floue, mal formatée ou est arrivée trop vite',
    'Tu ressens une pression de quelqu\'un de ta propre communauté',
  ],
  verifyEyebrow: "Avant d'agir",
  verifyTitle: 'Quatre vérifications qui peuvent tout changer.',
  verifySteps: [
    {
      step: '01',
      title: "Vérifie l'identité professionnelle",
      body: "Pour un consultant en immigration : son numéro sur college-ic.ca. Pour un avocat : le barreau de sa province. Pour un organisme d'aide : cherche la mention « financé par IRCC ». Si la personne ne figure nulle part dans les registres officiels, c'est un signal sérieux.",
    },
    {
      step: '02',
      title: 'Demande un document écrit avant tout paiement',
      body: "Un professionnel légitime n'hésite pas à te remettre un contrat, une facture ou un devis avant de commencer. Si quelqu'un refuse de mettre les choses par écrit, ne lui donne pas d'argent.",
    },
    {
      step: '03',
      title: 'Compare et confirme',
      body: "Pour un logement : compare le prix sur Rentals.ca. Pour un emploi : cherche l'entreprise sur LinkedIn et le Registre des entreprises. Pour une école : vérifie la liste DLI d'IRCC. Dix minutes de recherche peuvent t'épargner des milliers de dollars.",
    },
    {
      step: '04',
      title: "Parle à quelqu'un avant d'agir",
      body: "Si tu as un doute, ne reste pas seul avec. Parle-en à un organisme d'établissement de ta ville, à un ami de confiance, ou contacte-nous. On ne te juge pas. Même si tu as déjà payé — il n'est pas toujours trop tard.",
    },
  ],
  ctaEyebrow: "Doute ? Vérifie avant d'agir.",
  ctaTitle: "Un appel peut t'éviter une erreur coûteuse.",
  ctaBody:
    "Tu as reçu une offre qui te semble douteuse ? Quelqu'un te demande des documents ou de l'argent et tu n'es pas sûr ? On t'écoute, on t'aide à analyser la situation, et on t'indique les démarches à suivre — sans te juger.",
  ctaNote:
    "Ce n'est pas un service juridique. On ne peut pas porter plainte pour toi. Mais on peut t'aider à comprendre ta situation et trouver les bonnes ressources.",
  ctaButton: 'Réserver un appel',
  faqEyebrow: 'Questions fréquentes',
  faqTitle: 'Ce que les gens nous demandent souvent.',
  faqs: [
    {
      question: "Vous pouvez vérifier si quelqu'un est légitime à ma place ?",
      answer:
        "On peut t'expliquer comment vérifier et te donner les bons liens, mais la vérification officielle t'appartient — les registres publics sont accessibles à tous. Ce que l'appel t'apporte, c'est du temps gagné et une lecture claire de la situation.",
    },
    {
      question: "J'ai déjà payé. Est-ce que c'est trop tard ?",
      answer:
        "Pas forcément. Selon le moyen de paiement et le délai, tu as peut-être des recours. Les paiements par carte bancaire peuvent parfois être contestés. Pour les virements, les options sont plus limitées — mais signaler reste utile pour protéger d'autres. On peut t'orienter vers les ressources adaptées.",
    },
    {
      question: "J'ai honte de m'être fait avoir. Est-ce que je dois le dire ?",
      answer:
        "Tu n'as absolument rien à avoir honte. Ces arnaques sont construites pour tromper des personnes intelligentes. Le fait que tu cherches à t'informer ou à agir maintenant est une preuve de lucidité. On accueille toutes les situations sans jugement.",
    },
    {
      question: 'Puis-je signaler une arnaque anonymement ?',
      answer:
        "Oui. Le Centre antifraude du Canada accepte les signalements anonymes. Signaler ne t'engage à rien, mais cela peut aider à protéger d'autres personnes dans ta situation.",
    },
    {
      question: "Et si c'est quelqu'un de ma communauté qui m'a arnaqué ?",
      answer:
        "C'est une situation difficile, émotionnellement et socialement. On comprend que ce soit compliqué. Si tu veux en parler avant de décider quoi faire, on est là. Légalement, les recours sont les mêmes quelle que soit la relation avec la personne.",
    },
    {
      question: 'Marhaban Canada peut porter plainte pour moi ?',
      answer:
        "Non. Nous ne sommes pas un service juridique ni un organe de réglementation. On t'oriente, on t'informe, et on t'aide à préparer tes démarches — mais les actions officielles (plainte, remboursement, recours légal) reviennent à des professionnels habilités.",
    },
  ],
  officialLinksTitle: 'Ressources officielles',
  officialLinks: [
    {
      category: 'Signaler une fraude',
      label: 'Centre antifraude du Canada',
      href: 'https://www.antifraudcentre-centreantifraude.ca/',
    },
    {
      category: 'Vérifier un consultant en immigration',
      label: 'College of Immigration and Citizenship Consultants (ICCRC)',
      href: 'https://college-ic.ca/',
    },
    {
      category: 'Vérifier un avocat — Québec',
      label: 'Barreau du Québec',
      href: 'https://www.barreau.qc.ca/',
    },
    {
      category: 'Vérifier un avocat — Ontario',
      label: 'Law Society of Ontario',
      href: 'https://lso.ca/',
    },
    {
      category: 'Vérifier une école',
      label: 'Établissements désignés (DLI) — IRCC',
      href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/etudier-canada/permis-etudes/preparer/etablissements-designes.html',
    },
    {
      category: 'Arnaques au logement',
      label: 'Régie du logement du Québec (TAL)',
      href: 'https://tal.gouv.qc.ca/',
    },
    {
      category: 'Aide communautaire gratuite',
      label: 'Service 211',
      href: 'https://211.ca/',
    },
  ],
  disclaimerTitle: 'À noter',
  disclaimerExtra:
    "Marhaban Canada ne peut pas porter plainte, représenter un client en justice, ni contacter les autorités en ton nom. En cas de danger immédiat, appelle le 911.",
};

const en: ArnaqueCopy = {
  heroEyebrow: 'Protection · Free to read',
  heroTitle: 'Before you pay, verify.',
  heroSubtitle:
    "Scams targeting newcomers are more common than you think. Not because you're naive — but because they're well-crafted. This page helps you see clearly before you act.",
  heroBadge:
    "Marhaban Canada is not a police service or government institution. We provide practical guidance.",
  situationsEyebrow: 'Common situations',
  situationsTitle: "Six situations to know before it's too late.",
  situationsSubtitle:
    "These scenarios are inspired by real newcomer experiences. Names and people are fictional. The goal: equip you, not scare you.",
  seeGuide: 'See the full guide',
  situations: [
    {
      number: '01',
      iconKey: 'briefcase',
      title: 'Job offer requiring payment',
      quote:
        "The position is confirmed, but the employer needs $350 for administrative fees. That's normal here in Canada.",
      reality:
        "In Canada, a legitimate employer never asks you to pay for a job. Work permit fees are the employer's responsibility. If someone asks for money before you start working, treat it as a major warning sign.",
      flags: [
        'Offer received without an interview',
        'Very high salary for minimal qualifications',
        'Company cannot be found on LinkedIn or has no verifiable website',
        'Payment requested by wire transfer, gift card, or cryptocurrency',
      ],
      action: "Don't pay anything. Search the company on your province's Business Registry first.",
      slug: 'emploi',
    },
    {
      number: '02',
      iconKey: 'badge',
      title: 'Guaranteed immigration result',
      quote:
        "I have contacts at IRCC. With me, your file gets priority. Give me $2,500 and I'll handle everything.",
      reality:
        "No one can guarantee an immigration outcome. Not consultants, not lawyers — approvals belong exclusively to government authorities.",
      flags: [
        'Uses the words "guaranteed" or "assured"',
        'Claims to have internal contacts at IRCC',
        'No verifiable ICCRC membership number',
        'Discourages you from consulting other professionals',
      ],
      action:
        "Ask for their ICCRC number and verify it on college-ic.ca. Without a verifiable number, share nothing.",
      slug: 'immigration',
    },
    {
      number: '03',
      iconKey: 'message',
      title: 'Documents requested by message',
      quote:
        "It's to speed up your file. I need your passport and SIN card tonight — send me a photo on WhatsApp.",
      reality:
        "No official institution will ask for sensitive documents via WhatsApp or Telegram. Your Social Insurance Number is highly sensitive — sharing it can lead to identity theft.",
      flags: [
        'Unusual urgency ("tonight", "before tomorrow")',
        'Documents requested through a messaging app',
        'Person avoids official channels to "go faster"',
        "They don't explain why the documents are needed",
      ],
      action:
        "Never share your SIN or passport by message. Legitimate professionals use secure official portals.",
    },
    {
      number: '04',
      iconKey: 'home',
      title: 'Rent deposit before the visit',
      quote:
        "I'm out of the country right now. Send me first and last month's rent by wire transfer and I'll mail you the keys. Limited offer.",
      reality:
        "A legitimate landlord never asks for payment before a visit. If they're truly away, a live video tour is possible — but payment always waits for a signed lease.",
      flags: [
        'Price well below local market',
        'Landlord is "abroad" or "on a work trip"',
        'Payment requested by wire transfer, Western Union, or gift card',
        'Pressure to decide quickly ("another interested party tonight")',
      ],
      action:
        "Never transfer money without visiting the unit and signing a lease. Compare prices on Rentals.ca.",
      slug: 'logement',
    },
    {
      number: '05',
      iconKey: 'userx',
      title: 'Fake immigration consultant',
      quote:
        "I've helped dozens of people from our community. Everyone goes through me. I don't have a website but you can call so-and-so.",
      reality:
        "In Canada, anyone who prepares immigration forms for compensation must be an ICCRC member. Informal consultants can't correct their mistakes officially and you have no legal recourse against them.",
      flags: [
        'Refuses or is unable to provide an ICCRC number',
        'Works only by word of mouth, no address or website',
        'No written contract before starting',
        'Fees payable in cash only',
      ],
      action: "Verify their name on college-ic.ca before any commitment. If they're not listed, walk away.",
      slug: 'immigration',
    },
    {
      number: '06',
      iconKey: 'grad',
      title: 'Fake school admission help',
      quote:
        "I work with Canadian universities. I can get you an acceptance letter in 3 weeks for any program. My fee: $800.",
      reality:
        "Universities manage their own admissions directly or through accredited agents who typically charge you nothing. A fraudulently obtained acceptance letter can invalidate your study permit.",
      flags: [
        'Promises admission without reviewing your academic file',
        'Asks for payment before contacting the institution',
        'Acceptance letter arrives too fast or looks poorly formatted',
        "Institution isn't on IRCC's Designated Learning Institutions list",
      ],
      action:
        "Verify the institution is on IRCC's DLI list. Contact the admissions office directly.",
    },
  ],
  flagsEyebrow: 'Red flags',
  flagsTitle: 'If you check even one of these, stop.',
  flagsNote:
    "Scams sometimes operate within communities, exploiting trust. Being cautious with someone you don't know well is not a betrayal.",
  flags: [
    'Someone promises a guaranteed result (visa, job, housing, admission)',
    'Payment requested in cash, gift cards, Western Union, or cryptocurrency',
    'Someone asks for your SIN, passport, or banking info by WhatsApp',
    'Artificial urgency ("24h offer only", "hurry or you\'ll lose your spot")',
    'Person refuses to give you a written contract before starting',
    'No professional address, website, or verifiable ICCRC number',
    'They tell you not to talk to other people',
    'They claim to have "internal contacts" inside government agencies',
    'Housing is available but no visit is possible',
    'Great job offer, but you need to pay fees first',
    'Official letter looks blurry, poorly formatted, or arrived too fast',
    'You feel pressure from someone in your own community',
  ],
  verifyEyebrow: 'Before you act',
  verifyTitle: 'Four checks that can change everything.',
  verifySteps: [
    {
      step: '01',
      title: 'Verify professional identity',
      body: "For an immigration consultant: check their number on college-ic.ca. For a lawyer: contact the bar association of their province. For a help organization: look for the \"funded by IRCC\" mention. If the person doesn't appear in any official registry, that's a serious signal.",
    },
    {
      step: '02',
      title: 'Request a written document before payment',
      body: "A legitimate professional always provides a contract, invoice, or quote before starting. If someone refuses to put things in writing, don't give them money.",
    },
    {
      step: '03',
      title: 'Compare and confirm',
      body: "For housing: compare prices on Rentals.ca. For jobs: search the company on LinkedIn and the Business Registry. For schools: check IRCC's Designated Learning Institutions (DLI) list. Ten minutes of research can save you thousands of dollars.",
    },
    {
      step: '04',
      title: 'Talk to someone before acting',
      body: "If you have doubts, don't face them alone. Talk to a settlement organization in your city, a trusted friend, or contact us. We don't judge. Even if you've already paid — it's not always too late.",
    },
  ],
  ctaEyebrow: 'Have doubts? Verify before acting.',
  ctaTitle: 'A 30-minute call can save you from a costly mistake.',
  ctaBody:
    "Received an offer that seems suspicious? Someone asking for documents or money and you're not sure? We listen, help you analyze the situation, and guide you to the right steps — without judgment.",
  ctaNote:
    "This is not a legal service. We can't file complaints for you. But we can help you understand your situation and find the right resources.",
  ctaButton: 'Book a call — $29',
  faqEyebrow: 'FAQ',
  faqTitle: 'What people often ask us.',
  faqs: [
    {
      question: 'Can you verify if someone is legitimate for me?',
      answer:
        "We can explain how to verify and give you the right links, but official verification is yours to do — public registries are accessible to everyone. What the call gives you is saved time and a clear reading of your situation.",
    },
    {
      question: "I already paid. Is it too late?",
      answer:
        "Not necessarily. Depending on the payment method and timeline, you may have recourse. Credit card payments can sometimes be disputed. For wire transfers, options are more limited — but reporting still helps protect others. We can direct you to appropriate resources.",
    },
    {
      question: "I'm ashamed of being scammed. Do I have to say anything?",
      answer:
        "You have absolutely nothing to be ashamed of. These scams are designed to fool smart people. The fact that you're seeking information or action now is a sign of clarity. We welcome all situations without judgment.",
    },
    {
      question: 'Can I report a scam anonymously?',
      answer:
        "Yes. The Canadian Anti-Fraud Centre accepts anonymous reports. Reporting doesn't commit you to anything, but it can help protect others in your situation.",
    },
    {
      question: 'What if someone from my community scammed me?',
      answer:
        "That's a difficult situation, emotionally and socially. We understand it's complicated. If you want to talk before deciding what to do, we're here. Legally, the recourses are the same regardless of the relationship.",
    },
    {
      question: 'Can Marhaban Canada file a complaint for me?',
      answer:
        "No. We're not a legal service or regulatory body. We guide, inform, and help you prepare your steps — but official actions (complaint, refund, legal recourse) are for authorized professionals.",
    },
  ],
  officialLinksTitle: 'Official resources',
  officialLinks: [
    {
      category: 'Report fraud',
      label: 'Canadian Anti-Fraud Centre',
      href: 'https://www.antifraudcentre-centreantifraude.ca/',
    },
    {
      category: 'Verify an immigration consultant',
      label: 'College of Immigration and Citizenship Consultants (ICCRC)',
      href: 'https://college-ic.ca/',
    },
    {
      category: 'Verify a lawyer (Ontario)',
      label: 'Law Society of Ontario',
      href: 'https://lso.ca/',
    },
    {
      category: 'Verify a school',
      label: 'Designated Learning Institutions (DLI) — IRCC',
      href: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html',
    },
    {
      category: 'Housing scams',
      label: 'Canada Mortgage and Housing (CMHC)',
      href: 'https://www.cmhc-schl.gc.ca/',
    },
    {
      category: 'Free community help',
      label: '211 Service',
      href: 'https://211.ca/',
    },
  ],
  disclaimerTitle: 'Note',
  disclaimerExtra:
    "Marhaban Canada cannot file complaints, represent clients in court, or contact authorities on your behalf. In case of immediate danger, call 911.",
};

const ar: ArnaqueCopy = {
  heroEyebrow: 'حماية · مجاني للقراءة',
  heroTitle: 'قبل أن تدفع، تحقق.',
  heroSubtitle:
    'عمليات الاحتيال التي تستهدف القادمين الجدد ليست نادرة. ليس لأنك ساذج، بل لأنها مُصممة بشكل محكم. هذه الصفحة تساعدك على رؤية الأمور بوضوح قبل التصرف.',
  heroBadge:
    'مرحبا كندا ليست خدمة شرطة ولا مؤسسة حكومية. نقدم توجيهاً عملياً وإعلامياً.',
  situationsEyebrow: 'مواقف شائعة',
  situationsTitle: 'ستة مواقف يجب أن تعرفها قبل فوات الأوان.',
  situationsSubtitle:
    'هذه السيناريوهات مستوحاة من تجارب حقيقية للقادمين الجدد. الأسماء والأشخاص خيالية. الهدف: تجهيزك وليس تخويفك.',
  seeGuide: 'اقرأ الدليل الكامل',
  situations: [
    {
      number: '01',
      iconKey: 'briefcase',
      title: 'وظيفة مقابل دفع مبلغ',
      quote:
        'المنصب مؤكد، لكن صاحب العمل يطلب 350 دولاراً لرسوم إدارية. هذا أمر طبيعي هنا في كندا.',
      reality:
        'في كندا، لا يطلب صاحب العمل الشرعي منك أبداً أن تدفع مقابل وظيفة. رسوم تصريح العمل تتحملها جهة العمل. إذا طلب منك أحد دفع أموال قبل أن تبدأ العمل، فهذا احتيال.',
      flags: [
        'عرض عمل بدون مقابلة مسبقة',
        'راتب مرتفع جداً مقابل مؤهلات بسيطة',
        'الشركة غير موجودة على LinkedIn ولا يوجد لها موقع قابل للتحقق',
        'طلب الدفع عبر تحويل بنكي أو بطاقة هدايا أو عملة مشفرة',
      ],
      action:
        'لا تدفع شيئاً. ابحث عن الشركة في سجل الشركات في مقاطعتك أولاً.',
      slug: 'emploi',
    },
    {
      number: '02',
      iconKey: 'badge',
      title: 'ضمان نتيجة هجرة',
      quote:
        'لديّ اتصالات في IRCC. معي، ملفك يُعالج بأولوية. أعطني 2500 دولار وأنا أتكفل بكل شيء.',
      reality:
        'لا أحد يستطيع ضمان نتيجة في مجال الهجرة. لا مستشار ولا محامٍ يستطيع الوعد بالموافقة. القرارات تعود حصراً للسلطات الحكومية.',
      flags: [
        'استخدام كلمات "مضمون" أو "مؤكد"',
        'يدّعي امتلاك اتصالات داخلية في IRCC',
        'لا يوجد رقم عضوية ICCRC قابل للتحقق',
        'يثبطك من استشارة متخصصين آخرين',
      ],
      action:
        'اطلب رقم ICCRC الخاص به وتحقق منه على college-ic.ca. بدون رقم قابل للتحقق، لا تثق بأي شيء.',
      slug: 'immigration',
    },
    {
      number: '03',
      iconKey: 'message',
      title: 'طلب وثائق عبر الرسائل',
      quote:
        'هذا لتسريع طلبك. أحتاج جواز سفرك وبطاقة التأمين الاجتماعي الليلة — أرسل لي صورة عبر واتساب.',
      reality:
        'لن تطلب أي جهة رسمية منك إرسال وثائق حساسة عبر واتساب أو تيليغرام. رقم التأمين الاجتماعي (SIN) بالغ الحساسية — الكشف عنه قد يؤدي إلى سرقة هويتك.',
      flags: [
        'إلحاح غير معتاد ("الليلة"، "قبل الغد")',
        'طلب وثائق عبر تطبيق مراسلة',
        'الشخص يتجنب القنوات الرسمية للإسراع',
        'لا يشرح لماذا تحتاج هذه الوثائق',
      ],
      action:
        'لا تشارك أبداً رقم SIN أو جواز سفرك عبر رسالة. المختصون الشرعيون يستخدمون بوابات آمنة رسمية.',
    },
    {
      number: '04',
      iconKey: 'home',
      title: 'إيجار مسبق قبل الزيارة',
      quote:
        'أنا خارج البلاد الآن. أرسل لي قيمة أول وآخر شهر إيجار بتحويل بنكي وسأرسل لك المفاتيح. عرض محدود.',
      reality:
        'المالك الشرعي لا يطلب منك الدفع قبل الزيارة. إذا كان غائباً فعلاً، يمكن إجراء جولة بالفيديو مباشرة — لكن الدفع ينتظر دائماً توقيع عقد إيجار رسمي.',
      flags: [
        'سعر أقل بكثير من سوق المنطقة',
        'المالك "خارج البلاد" أو "في رحلة عمل"',
        'طلب الدفع عبر تحويل بنكي أو Western Union أو بطاقة هدايا',
        'ضغط للقرار السريع ("هناك مهتم آخر الليلة")',
      ],
      action:
        'لا تحوّل أموالاً قبل زيارة المكان وتوقيع عقد إيجار. قارن الأسعار على Rentals.ca.',
      slug: 'logement',
    },
    {
      number: '05',
      iconKey: 'userx',
      title: 'مستشار هجرة مزيف',
      quote:
        'ساعدت عشرات الأشخاص من مجتمعنا. الكل يمر بي. ليس لدي موقع لكن يمكنك الاتصال بفلان للتوصية.',
      reality:
        'في كندا، كل من يُعد طلبات الهجرة مقابل أجر يجب أن يكون عضواً في ICCRC. المستشارون غير الرسميين لا يستطيعون تصحيح أخطائهم رسمياً ولا يحق لك اللجوء القانوني ضدهم.',
      flags: [
        'يرفض أو لا يستطيع تقديم رقم ICCRC',
        'يعمل فقط عن طريق الإحالات الشفهية بدون عنوان أو موقع',
        'لا يقدم عقداً مكتوباً قبل البدء',
        'الأتعاب تُدفع نقداً فقط',
      ],
      action:
        'تحقق من اسمه على college-ic.ca قبل أي التزام. إذا لم يظهر هناك، لا تتقدم.',
      slug: 'immigration',
    },
    {
      number: '06',
      iconKey: 'grad',
      title: 'مساعدة مزيفة للقبول الجامعي',
      quote:
        'أعمل مع الجامعات الكندية. أستطيع الحصول لك على خطاب قبول خلال 3 أسابيع لأي برنامج. رسومي: 800 دولار.',
      reality:
        'تدير الجامعات قبولاتها مباشرة أو عبر وكلاء معتمدين لا يتقاضون منك شيئاً عادةً. خطاب قبول مزيف يمكن أن يُلغي تصريح دراستك.',
      flags: [
        'يعد بالقبول دون الاطلاع على ملفك الأكاديمي',
        'يطلب الدفع قبل التواصل مع المؤسسة',
        'خطاب القبول يصل بسرعة كبيرة أو يبدو سيئ التنسيق',
        'المؤسسة غير مدرجة في قائمة DLI الخاصة بـ IRCC',
      ],
      action:
        'تحقق من أن المؤسسة مدرجة في قائمة DLI. تواصل مباشرة مع مكتب القبول.',
    },
  ],
  flagsEyebrow: 'إشارات تحذير',
  flagsTitle: 'إذا علّمت على خانة واحدة، توقف.',
  flagsNote:
    'أحياناً تعمل عمليات الاحتيال داخل المجتمعات، مستغلةً الثقة. الحذر مع شخص لا تعرفه جيداً ليس خيانة.',
  flags: [
    'يَعِدُك أحدهم بنتيجة مضمونة (تأشيرة، عمل، سكن، قبول)',
    'طلب الدفع نقداً أو ببطاقة هدايا أو Western Union أو عملة مشفرة',
    'يطلب رقم SIN أو جواز سفرك أو بياناتك البنكية عبر واتساب',
    'ضغط صناعي ("عرض لـ 24 ساعة"، "أسرع وإلا ستفقد مكانك")',
    'يرفض إعطاءك عقداً مكتوباً قبل البدء',
    'لا يوجد عنوان مهني ولا موقع ولا رقم ICCRC قابل للتحقق',
    'يقول لك ألا تتحدث مع أشخاص آخرين',
    'يدّعي امتلاك "اتصالات داخلية" في الجهات الحكومية',
    'السكن متاح لكن لا تتوفر أي زيارة',
    'عرض عمل رائع لكن عليك دفع رسوم أولاً',
    'الرسالة الرسمية تبدو ضبابية أو سيئة التنسيق أو وصلت بسرعة كبيرة',
    'تشعر بضغط من شخص من مجتمعك الخاص',
  ],
  verifyEyebrow: 'قبل التصرف',
  verifyTitle: 'أربعة تحققات يمكنها تغيير كل شيء.',
  verifySteps: [
    {
      step: '01',
      title: 'تحقق من الهوية المهنية',
      body: 'لمستشار الهجرة: تحقق من رقمه على college-ic.ca. للمحامي: تواصل مع نقابة المحامين في مقاطعته. للمنظمة المساعِدة: ابحث عن عبارة "ممول من IRCC". إذا لم يظهر الشخص في أي سجل رسمي، فهذا مؤشر خطير.',
    },
    {
      step: '02',
      title: 'اطلب وثيقة مكتوبة قبل أي دفع',
      body: 'المختص الشرعي لا يتردد في تقديم عقد أو فاتورة قبل البدء. إذا رفض أحدهم وضع الأشياء كتابياً، لا تعطه مالاً.',
    },
    {
      step: '03',
      title: 'قارن وتحقق',
      body: 'للسكن: قارن الأسعار على Rentals.ca. للعمل: ابحث عن الشركة على LinkedIn وسجل الشركات. للمدرسة: تحقق من قائمة المؤسسات المعيّنة (DLI) على IRCC. عشر دقائق بحث يمكن أن توفر عليك آلاف الدولارات.',
    },
    {
      step: '04',
      title: 'تحدث مع أحد قبل التصرف',
      body: 'إذا كان لديك شك، لا تبق وحدك معه. تحدث مع منظمة استقرار في مدينتك، أو مع شخص تثق به، أو تواصل معنا. لا نحكم عليك. حتى لو دفعت بالفعل — لا يكون الأوان قد فات دائماً.',
    },
  ],
  ctaEyebrow: 'تريد التحقق قبل التصرف؟',
  ctaTitle: 'مكالمة 30 دقيقة يمكنها توفير الكثير عليك.',
  ctaBody:
    'تلقيت عرضاً يبدو مريباً؟ يطلب منك أحدهم وثائق أو مالاً ولست متأكداً؟ نستمع إليك، نساعدك في تحليل الوضع، ونرشدك إلى الخطوات الصحيحة — دون حكم.',
  ctaNote:
    'هذه ليست خدمة قانونية. لا يمكننا رفع دعوى لحسابك. لكن يمكننا مساعدتك على فهم وضعك وإيجاد الموارد المناسبة.',
  ctaButton: 'احجز مكالمة — 29 $',
  faqEyebrow: 'أسئلة شائعة',
  faqTitle: 'ما يسألنا الناس عنه كثيراً.',
  faqs: [
    {
      question: 'هل يمكنكم التحقق من شرعية شخص ما بدلاً مني؟',
      answer:
        'يمكننا شرح كيفية التحقق وإعطاؤك الروابط الصحيحة، لكن التحقق الرسمي عليك أنت — السجلات العامة متاحة للجميع. ما تكسبه من المكالمة هو الوقت ورؤية واضحة للوضع.',
    },
    {
      question: 'لقد دفعت بالفعل. هل فات الأوان؟',
      answer:
        'ليس بالضرورة. اعتماداً على طريقة الدفع والمدة الزمنية، قد تكون لديك خيارات. المدفوعات ببطاقة الائتمان يمكن الاعتراض عليها أحياناً. للتحويلات المالية، الخيارات أكثر محدودية — لكن الإبلاغ لا يزال مفيداً لحماية الآخرين.',
    },
    {
      question: 'أشعر بالخجل من أنني وقعت ضحية. هل يجب أن أتكلم؟',
      answer:
        'ليس عليك أي خجل على الإطلاق. عمليات الاحتيال هذه مصممة لخداع أشخاص أذكياء. حقيقة أنك تبحث الآن عن معلومات دليل على وعيك. نرحب بجميع الحالات دون أي حكم.',
    },
    {
      question: 'هل يمكنني الإبلاغ عن عملية احتيال بشكل مجهول؟',
      answer:
        'نعم. يقبل مركز مكافحة الاحتيال الكندي الإبلاغات المجهولة. الإبلاغ لا يُلزمك بشيء، لكنه يساعد في حماية الآخرين.',
    },
    {
      question: 'ماذا لو كان الشخص الذي احتال عليّ من مجتمعي؟',
      answer:
        'هذا وضع صعب عاطفياً واجتماعياً. نفهم أن الأمر معقد. إذا أردت التحدث قبل اتخاذ قرار، نحن هنا. قانونياً، الخيارات المتاحة هي نفسها بغض النظر عن العلاقة.',
    },
    {
      question: 'هل يمكن لمرحبا كندا تقديم شكوى لحسابي؟',
      answer:
        'لا. لسنا خدمة قانونية ولا هيئة تنظيمية. نوجه ونبلغك ونساعدك في التحضير — لكن الإجراءات الرسمية تعود لمختصين مؤهلين.',
    },
  ],
  officialLinksTitle: 'موارد رسمية',
  officialLinks: [
    {
      category: 'الإبلاغ عن احتيال',
      label: 'مركز مكافحة الاحتيال الكندي',
      href: 'https://www.antifraudcentre-centreantifraude.ca/',
    },
    {
      category: 'التحقق من مستشار الهجرة',
      label: 'College of Immigration and Citizenship Consultants (ICCRC)',
      href: 'https://college-ic.ca/',
    },
    {
      category: 'التحقق من مدرسة',
      label: 'المؤسسات التعليمية المعيّنة (DLI) — IRCC',
      href: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html',
    },
    {
      category: 'مساعدة مجتمعية مجانية',
      label: 'خدمة 211',
      href: 'https://211.ca/',
    },
  ],
  disclaimerTitle: 'ملاحظة',
  disclaimerExtra:
    'لا يمكن لمرحبا كندا تقديم شكاوى أو تمثيل العملاء في المحكمة أو الاتصال بالسلطات نيابةً عنك. في حالة الخطر الفوري، اتصل بالرقم 911.',
};

export const arnaqueCopy: Record<'fr' | 'en' | 'ar', ArnaqueCopy> = { fr, en, ar };
