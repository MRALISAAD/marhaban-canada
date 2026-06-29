import type { Locale } from '@/i18n/locales';

export type AntiScamGuideSlug = 'logement' | 'emploi' | 'immigration' | 'verification';

export const ANTI_SCAM_GUIDE_SLUGS: AntiScamGuideSlug[] = [
  'logement',
  'emploi',
  'immigration',
  'verification',
];

export function isAntiScamGuideSlug(s: string): s is AntiScamGuideSlug {
  return (ANTI_SCAM_GUIDE_SLUGS as string[]).includes(s);
}

export type LocaleScamGuideContent = {
  title: string;
  description: string;
  hero: { eyebrow: string; title: string; text: string };
  why: string;
  signalsTitle: string;
  signals: string[];
  questionsTitle: string;
  questions: string[];
  verifyTitle: string;
  verify: string[];
  avoidTitle: string;
  avoid: string[];
  ctaFree: string;
  ctaOrientation: string;
  disclaimer: string;
};

export type AntiScamGuide = {
  slug: AntiScamGuideSlug;
  fr: LocaleScamGuideContent;
  en: LocaleScamGuideContent;
  ar: LocaleScamGuideContent;
};

const guides: AntiScamGuide[] = [
  {
    slug: 'logement',
    fr: {
      title: 'Arnaques au logement',
      description:
        "Avant d'envoyer un dépôt ou de signer, vérifie les signaux d'alerte les plus fréquents.",
      hero: {
        eyebrow: 'ANTI-ARNAQUE',
        title: 'Arnaques au logement',
        text: "Loyer trop bas, propriétaire absent, dépôt urgent : reconnaître les signaux avant de payer.",
      },
      why: "Les arnaques au logement ciblent les nouveaux arrivants qui cherchent rapidement un logement sans connaître le marché local. Les escrocs profitent de l'urgence, de la distance et du manque de références pour faire payer un logement qui n'existe pas ou qui appartient à quelqu'un d'autre.",
      signalsTitle: "Signaux d'alerte",
      signals: [
        "Loyer anormalement bas pour le quartier ou la taille du logement.",
        "Propriétaire qui dit être à l'étranger et ne peut pas faire visiter en personne.",
        "Demande de paiement (dépôt, premier mois) avant toute visite ou signature de bail.",
        "Pression pour décider vite : « j'ai d'autres intéressés, il faut payer maintenant ».",
        "Demande de paiement par virement Interac, Western Union, crypto ou carte-cadeau.",
        "Annonce sur plusieurs plateformes avec des détails légèrement différents.",
      ],
      questionsTitle: 'Questions à poser',
      questions: [
        "Peut-on visiter le logement en personne avant tout paiement ?",
        "Êtes-vous le propriétaire légal ? Pouvez-vous le prouver (acte de propriété, bail précédent) ?",
        "Le logement est-il enregistré auprès du Tribunal administratif du logement (Québec) ?",
        "Quel est le mode de paiement accepté ? (Méfiez-vous si seulement virement ou cash)",
        "Y a-t-il un bail standard à signer avant tout paiement ?",
      ],
      verifyTitle: 'Points à vérifier avant de payer',
      verify: [
        "Vérifier l'adresse sur Google Street View pour confirmer que le bâtiment existe.",
        "Chercher l'annonce sur plusieurs plateformes — si elle apparaît partout en même temps, c'est suspect.",
        "Vérifier le nom du propriétaire au registre foncier provincial (gratuit au Québec via Inforegistre).",
        "S'assurer que le bail présenté correspond au bail standard de la RDQ (Québec).",
        "Consulter les prix moyens du secteur sur des sites comme Rentals.ca pour évaluer si le loyer est réaliste.",
      ],
      avoidTitle: "Ce qu'il ne faut pas faire",
      avoid: [
        "Ne jamais envoyer d'argent sans avoir visité et signé un bail.",
        "Ne jamais partager ses documents d'identité avant une visite confirmée.",
        "Ne pas accepter de payer plusieurs mois de loyer à l'avance — illégal au Québec.",
        "Ne pas faire confiance à une annonce basée uniquement sur des photos.",
        "Ne pas ignorer son instinct : si quelque chose semble trop beau pour être vrai, vérifiez avant d'agir.",
      ],
      ctaFree: 'Réserver un appel gratuit — 15 min',
      ctaOrientation: 'Appel orientation — 45 min',
      disclaimer:
        "Marhaban Canada offre un accompagnement général et informatif. Ce service ne remplace pas un avocat ou un organisme gouvernemental. En cas de fraude avérée, contactez le Centre antifraude du Canada.",
    },
    en: {
      title: 'Housing scams',
      description:
        "Before sending a deposit or signing, check the most frequent warning signs.",
      hero: {
        eyebrow: 'ANTI-SCAM',
        title: 'Housing scams',
        text: "Rent too low, absent landlord, urgent deposit: recognize the signals before paying.",
      },
      why: "Housing scams target newcomers who are quickly looking for a place to live without knowing the local market. Scammers take advantage of urgency, distance, and lack of references to collect money for a property that doesn't exist or belongs to someone else.",
      signalsTitle: 'Warning signs',
      signals: [
        "Rent abnormally low for the neighbourhood or unit size.",
        "Landlord says they are abroad and can't show the unit in person.",
        "Request for payment (deposit, first month) before any visit or lease signing.",
        "Pressure to decide quickly: 'I have other interested people, pay now'.",
        "Request for payment by Interac, Western Union, crypto, or gift card.",
        "Listing on multiple platforms with slightly different details.",
      ],
      questionsTitle: 'Questions to ask',
      questions: [
        "Can I visit the unit in person before any payment?",
        "Are you the legal owner? Can you prove it (title deed, previous lease)?",
        "Is the unit registered with the rental housing tribunal?",
        "What payment methods are accepted? (Be wary if only wire or cash)",
        "Is there a standard lease to sign before any payment?",
      ],
      verifyTitle: 'Points to verify before paying',
      verify: [
        "Check the address on Google Street View to confirm the building exists.",
        "Search the listing on multiple platforms — if it appears everywhere at once, it is suspicious.",
        "Verify the landlord's name in the provincial land registry.",
        "Make sure the presented lease matches the standard provincial form.",
        "Check average prices in the area on sites like Rentals.ca to assess if the rent is realistic.",
      ],
      avoidTitle: 'What not to do',
      avoid: [
        "Never send money without having visited and signed a lease.",
        "Never share identity documents before a confirmed visit.",
        "Do not agree to pay several months of rent in advance — illegal in Quebec.",
        "Do not trust a listing based only on photos.",
        "Do not ignore your instincts: if something seems too good to be true, verify before acting.",
      ],
      ctaFree: 'Book a free call — 15 min',
      ctaOrientation: 'Orientation call — 45 min',
      disclaimer:
        'Marhaban Canada provides general and informational support. This service does not replace a lawyer or government body. In case of confirmed fraud, contact the Canadian Anti-Fraud Centre.',
    },
    ar: {
      title: 'عمليات احتيال السكن',
      description:
        'قبل إرسال وديعة أو التوقيع، تحقق من إشارات التحذير الأكثر شيوعاً.',
      hero: {
        eyebrow: 'مكافحة الاحتيال',
        title: 'عمليات احتيال السكن',
        text: 'إيجار منخفض جداً، مالك غائب، وديعة عاجلة: تعرف على الإشارات قبل الدفع.',
      },
      why: 'تستهدف عمليات احتيال السكن القادمين الجدد الذين يبحثون بسرعة عن مكان للعيش دون معرفة السوق المحلي. يستغل المحتالون الإلحاح والبُعد وانعدام المراجع لجمع الأموال مقابل عقار غير موجود.',
      signalsTitle: 'إشارات التحذير',
      signals: [
        'إيجار منخفض بشكل غير طبيعي للحي أو حجم الوحدة.',
        'المالك يقول إنه في الخارج ولا يمكنه إظهار الوحدة شخصياً.',
        'طلب دفع (وديعة، الشهر الأول) قبل أي زيارة أو توقيع عقد.',
        '"لدي مهتمون آخرون، ادفع الآن" — ضغط للتصرف بسرعة.',
        'طلب الدفع عبر Interac أو Western Union أو عملة مشفرة أو بطاقة هدايا.',
        'إعلان على منصات متعددة بتفاصيل مختلفة قليلاً.',
      ],
      questionsTitle: 'أسئلة يجب طرحها',
      questions: [
        'هل يمكنني زيارة الوحدة شخصياً قبل أي دفع؟',
        'هل أنت المالك القانوني؟ هل يمكنك إثبات ذلك؟',
        'هل الوحدة مسجلة في محكمة السكن؟',
        'ما طرق الدفع المقبولة؟ (احذر إذا كانت فقط تحويلاً أو نقداً)',
        'هل هناك عقد إيجار قياسي للتوقيع قبل أي دفع؟',
      ],
      verifyTitle: 'نقاط يجب التحقق منها قبل الدفع',
      verify: [
        'تحقق من العنوان على Google Street View للتأكد من وجود المبنى.',
        'ابحث عن الإعلان على منصات متعددة — إذا ظهر في كل مكان في نفس الوقت فهو مشبوه.',
        'تحقق من اسم المالك في سجل الأراضي الإقليمي.',
        'تأكد من أن عقد الإيجار المقدم يتوافق مع النموذج الإقليمي القياسي.',
        'تحقق من متوسط الأسعار في المنطقة لتقييم واقعية الإيجار.',
      ],
      avoidTitle: 'ما يجب تجنبه',
      avoid: [
        'لا ترسل أموالاً دون الزيارة وتوقيع عقد إيجار.',
        'لا تشارك وثائق الهوية قبل زيارة مؤكدة.',
        'لا تقبل دفع عدة أشهر من الإيجار مسبقاً.',
        'لا تثق بإعلان مبني فقط على صور.',
        'لا تتجاهل حدسك: إذا بدا الأمر رائعاً بشكل مبالغ فيه، تحقق قبل التصرف.',
      ],
      ctaFree: 'احجز مكالمة مجانية — 15 دقيقة',
      ctaOrientation: 'مكالمة توجيه — 45 دقيقة',
      disclaimer:
        'تقدم مرحبا كندا دعماً عاماً وإعلامياً. لا يحل هذا الخدمة محل محامٍ أو جهة حكومية.',
    },
  },
  {
    slug: 'emploi',
    fr: {
      title: "Fausses offres d'emploi",
      description:
        "Apprends à reconnaître les offres trop belles, les demandes d'argent et les messages suspects.",
      hero: {
        eyebrow: 'ANTI-ARNAQUE',
        title: "Fausses offres d'emploi",
        text: "Payer pour travailler, partager ses documents, promesses irréalistes : les signaux à repérer.",
      },
      why: "Les fausses offres d'emploi ciblent les personnes qui cherchent du travail rapidement, surtout les nouveaux arrivants qui ne connaissent pas bien le marché local. Les escrocs utilisent des plateformes légitimes pour diffuser des offres fictives et soutirer de l'argent ou des informations personnelles.",
      signalsTitle: "Signaux d'alerte",
      signals: [
        "L'offre demande de payer pour obtenir le poste, une formation obligatoire, ou du matériel.",
        "Salaire anormalement élevé pour un poste simple ou peu qualifié.",
        "Entretien par messagerie seulement (WhatsApp, Telegram) sans vidéo ni rencontre en personne.",
        "Demande de Numéro d'Assurance Sociale ou de documents bancaires avant d'avoir signé un contrat.",
        "L'entreprise n'a pas de site web vérifiable ou son adresse n'existe pas.",
        "Formulation en fautes d'orthographe, style générique ou traduit automatiquement.",
      ],
      questionsTitle: 'Questions à poser',
      questions: [
        "Quel est le processus de recrutement complet ? (entretien en personne ou vidéo ?)",
        "Pouvez-vous me donner le nom et le numéro d'enregistrement de l'entreprise ?",
        "Est-ce que je dois signer un contrat avant toute formation ou paiement ?",
        "Comment et quand sera effectué le premier paiement de salaire ?",
        "Puis-je contacter un autre employé ou référence de l'entreprise ?",
      ],
      verifyTitle: "Points à vérifier avant d'accepter",
      verify: [
        "Rechercher le nom de l'entreprise sur Google + 'arnaque' ou 'scam'.",
        "Vérifier l'existence de l'entreprise sur le registre provincial des entreprises (RLRQ au Québec).",
        "Chercher l'entreprise sur LinkedIn pour voir ses employés et son histoire.",
        "Confirmer l'adresse physique sur Google Maps — elle doit exister.",
        "Vérifier que l'email de contact vient d'un domaine officiel (pas @gmail, @yahoo).",
      ],
      avoidTitle: "Ce qu'il ne faut pas faire",
      avoid: [
        "Ne jamais payer pour obtenir un emploi, une accréditation ou du matériel de travail.",
        "Ne pas partager son NAS, ses informations bancaires ou ses pièces d'identité sans contrat signé.",
        "Ne pas envoyer de l'argent à un 'employeur' qu'on n'a jamais rencontré.",
        "Ne pas faire confiance uniquement à des offres transmises par des inconnus sur les réseaux sociaux.",
        "Ne pas ignorer les signaux même si l'offre semble alléchante.",
      ],
      ctaFree: 'Réserver un appel gratuit — 15 min',
      ctaOrientation: 'Appel orientation — 45 min',
      disclaimer:
        "Marhaban Canada offre un accompagnement général et informatif. Ce service ne remplace pas un avocat ou un organisme gouvernemental. En cas de fraude, contactez le Centre antifraude du Canada.",
    },
    en: {
      title: 'Fake job offers',
      description:
        "Learn to recognize offers that are too good, requests for money, and suspicious messages.",
      hero: {
        eyebrow: 'ANTI-SCAM',
        title: 'Fake job offers',
        text: "Pay to work, share documents, unrealistic promises: the signals to spot.",
      },
      why: "Fake job offers target people looking for work quickly, especially newcomers who don't know the local market well. Scammers use legitimate platforms to post fictitious job offers and extract money or personal information.",
      signalsTitle: 'Warning signs',
      signals: [
        "The offer asks you to pay to get the position, for mandatory training, or for equipment.",
        "Abnormally high salary for a simple or low-skilled position.",
        "Interview only by messaging (WhatsApp, Telegram) with no video or in-person meeting.",
        "Request for SIN or banking documents before signing a contract.",
        "The company has no verifiable website or its address doesn't exist.",
        "Writing with spelling mistakes, generic style, or auto-translated.",
      ],
      questionsTitle: 'Questions to ask',
      questions: [
        "What is the full recruitment process? (in-person or video interview?)",
        "Can you give me the company name and registration number?",
        "Do I need to sign a contract before any training or payment?",
        "How and when will the first salary payment be made?",
        "Can I contact another employee or company reference?",
      ],
      verifyTitle: 'Points to verify before accepting',
      verify: [
        "Search the company name on Google + 'scam'.",
        "Verify the company's existence on the provincial business registry.",
        "Look up the company on LinkedIn to see its employees and history.",
        "Confirm the physical address on Google Maps — it must exist.",
        "Verify that the contact email comes from an official domain (not @gmail, @yahoo).",
      ],
      avoidTitle: 'What not to do',
      avoid: [
        "Never pay to get a job, accreditation, or work equipment.",
        "Do not share your SIN, banking information, or ID without a signed contract.",
        "Do not send money to an 'employer' you have never met.",
        "Do not trust only offers passed on by strangers on social media.",
        "Do not ignore the signals even if the offer seems attractive.",
      ],
      ctaFree: 'Book a free call — 15 min',
      ctaOrientation: 'Orientation call — 45 min',
      disclaimer:
        'Marhaban Canada provides general and informational support. This service does not replace a lawyer or government body. In case of fraud, contact the Canadian Anti-Fraud Centre.',
    },
    ar: {
      title: 'عروض العمل المزيفة',
      description:
        'تعلم التعرف على العروض الجيدة جداً، وطلبات الأموال، والرسائل المشبوهة.',
      hero: {
        eyebrow: 'مكافحة الاحتيال',
        title: 'عروض العمل المزيفة',
        text: 'الدفع للعمل، مشاركة الوثائق، وعود غير واقعية: الإشارات الواجب اكتشافها.',
      },
      why: 'تستهدف عروض العمل المزيفة الأشخاص الباحثين عن عمل بسرعة، خاصة القادمين الجدد الذين لا يعرفون السوق المحلي جيداً. يستخدم المحتالون منصات شرعية لنشر عروض وهمية.',
      signalsTitle: 'إشارات التحذير',
      signals: [
        'العرض يطلب منك الدفع للحصول على المنصب أو تدريب إلزامي أو معدات.',
        'راتب مرتفع بشكل غير طبيعي لمنصب بسيط.',
        'مقابلة عبر رسائل فقط (WhatsApp, Telegram) بدون فيديو أو لقاء.',
        'طلب رقم التأمين الاجتماعي أو معلومات بنكية قبل توقيع عقد.',
        'الشركة ليس لها موقع إلكتروني قابل للتحقق.',
        'كتابة بها أخطاء إملائية أو أسلوب آلي.',
      ],
      questionsTitle: 'أسئلة يجب طرحها',
      questions: [
        'ما هي عملية التوظيف الكاملة؟ (مقابلة شخصية أو عبر الفيديو؟)',
        'هل يمكنك إعطائي اسم الشركة ورقم تسجيلها؟',
        'هل يجب أن أوقع عقداً قبل أي تدريب أو دفع؟',
        'كيف ومتى سيتم أول دفع للراتب؟',
        'هل يمكنني التواصل مع موظف آخر أو مرجع من الشركة؟',
      ],
      verifyTitle: 'نقاط التحقق قبل القبول',
      verify: [
        'ابحث عن اسم الشركة على Google + "احتيال" أو "scam".',
        'تحقق من وجود الشركة في سجل الأعمال الإقليمي.',
        'ابحث عن الشركة على LinkedIn.',
        'أكد العنوان الفيزيائي على Google Maps.',
        'تحقق من أن البريد الإلكتروني للاتصال من نطاق رسمي (ليس @gmail, @yahoo).',
      ],
      avoidTitle: 'ما يجب تجنبه',
      avoid: [
        'لا تدفع أبداً للحصول على وظيفة أو معدات عمل.',
        'لا تشارك رقم التأمين الاجتماعي أو معلوماتك البنكية بدون عقد موقع.',
        'لا ترسل أموالاً لـ"صاحب عمل" لم تقابله قط.',
        'لا تثق فقط بالعروض المرسلة من غرباء على وسائل التواصل.',
        'لا تتجاهل الإشارات حتى لو كان العرض مغرياً.',
      ],
      ctaFree: 'احجز مكالمة مجانية — 15 دقيقة',
      ctaOrientation: 'مكالمة توجيه — 45 دقيقة',
      disclaimer:
        'تقدم مرحبا كندا دعماً عاماً وإعلامياً. لا يحل هذا الخدمة محل محامٍ أو جهة حكومية.',
    },
  },
  {
    slug: 'immigration',
    fr: {
      title: "Promesses liées à l'immigration",
      description:
        "Attention aux garanties, aux promesses rapides et aux personnes qui demandent de l'argent sans preuve claire.",
      hero: {
        eyebrow: 'ANTI-ARNAQUE',
        title: "Promesses liées à l'immigration",
        text: "Résidence permanente garantie, dossiers accélérés, faux consultants : les signaux à connaître.",
      },
      why: "Les arnaques liées à l'immigration sont parmi les plus courantes et les plus coûteuses. Les escrocs ciblent les personnes dans des situations vulnérables, souvent sous stress, en promettant des résultats impossibles ou illégaux contre paiement.",
      signalsTitle: "Signaux d'alerte",
      signals: [
        "Promesse de 'garantir' la résidence permanente ou un visa — personne ne peut garantir cela légalement.",
        "Délais impossibles : 'résidence en 3 mois' ou 'visa express garanti'.",
        "Consultant qui n'a pas de numéro d'agrément RCIC (ou AIEC au Québec).",
        "Demande de paiement en cash, virement non traçable, ou crypto.",
        "Pression pour signer rapidement ou payer avant de recevoir une copie du contrat.",
        "Demande de formulaires officiels remplis par le consultant sans vous les expliquer.",
      ],
      questionsTitle: 'Questions à poser',
      questions: [
        "Quel est votre numéro d'agrément RCIC ou AIEC ? (vérifiable en ligne)",
        "Pouvez-vous me fournir un contrat écrit détaillant les services et les frais ?",
        "Quelles sont les démarches exactes que vous effectuerez en mon nom ?",
        "Comment puis-je vérifier l'avancement de mon dossier directement avec IRCC ?",
        "Que se passe-t-il si ma demande est refusée ? Y a-t-il un remboursement ?",
      ],
      verifyTitle: 'Points à vérifier avant de payer',
      verify: [
        "Vérifier le numéro RCIC sur le site officiel du Collège des consultants en immigration : college-ic.ca",
        "Consulter directement IRCC.ca pour les délais officiels de traitement — ne pas croire des promesses de délais accélérés.",
        "Demander un contrat écrit avant tout paiement — un vrai consultant l'exige aussi.",
        "Rechercher le nom du consultant sur Google + 'arnaque' ou 'plainte'.",
        "Vérifier si l'avocat est membre du Barreau provincial (pour les avocats en immigration).",
      ],
      avoidTitle: "Ce qu'il ne faut pas faire",
      avoid: [
        "Ne jamais payer quelqu'un qui 'garantit' un résultat d'immigration.",
        "Ne pas signer un formulaire officiel sans l'avoir lu et compris.",
        "Ne pas donner accès à son compte Mon IRCC à un tiers non autorisé.",
        "Ne pas croire qu'une personne de sa communauté est nécessairement de confiance — les arnaques viennent souvent de proches.",
        "Ne pas payer pour des informations disponibles gratuitement sur canada.ca.",
      ],
      ctaFree: 'Réserver un appel gratuit — 15 min',
      ctaOrientation: 'Appel orientation — 45 min',
      disclaimer:
        "Marhaban Canada offre un accompagnement général et informatif. Ce service ne remplace pas un consultant réglementé en immigration (RCIC), un avocat ou un organisme gouvernemental. Pour toute démarche d'immigration, travaillez uniquement avec des professionnels agréés vérifiables.",
    },
    en: {
      title: 'Immigration promises',
      description:
        "Watch out for guarantees, quick promises, and people who ask for money without clear proof.",
      hero: {
        eyebrow: 'ANTI-SCAM',
        title: 'Immigration promises',
        text: "Guaranteed permanent residence, fast-tracked files, fake consultants: the signals to know.",
      },
      why: "Immigration scams are among the most common and most costly. Scammers target people in vulnerable situations, often under stress, by promising impossible or illegal results in exchange for payment.",
      signalsTitle: 'Warning signs',
      signals: [
        "'Guaranteed' permanent residence or visa — no one can legally guarantee this.",
        "Impossible timelines: 'residency in 3 months' or 'guaranteed express visa'.",
        "Consultant without a RCIC registration number (or AIEC in Quebec).",
        "Request for cash payment, untraceable wire transfer, or crypto.",
        "Pressure to sign quickly or pay before receiving a copy of the contract.",
        "Request to fill out official forms without explaining them to you.",
      ],
      questionsTitle: 'Questions to ask',
      questions: [
        "What is your RCIC or AIEC registration number? (verifiable online)",
        "Can you provide a written contract detailing the services and fees?",
        "What exact steps will you take on my behalf?",
        "How can I verify the progress of my file directly with IRCC?",
        "What happens if my application is rejected? Is there a refund?",
      ],
      verifyTitle: 'Points to verify before paying',
      verify: [
        "Verify the RCIC number on the official College of Immigration website: college-ic.ca",
        "Check IRCC.ca directly for official processing times — don't believe promises of accelerated timelines.",
        "Request a written contract before any payment — a real consultant requires one too.",
        "Search the consultant's name on Google + 'scam' or 'complaint'.",
        "Verify if a lawyer is a member of the provincial Bar (for immigration lawyers).",
      ],
      avoidTitle: 'What not to do',
      avoid: [
        "Never pay someone who 'guarantees' an immigration result.",
        "Do not sign an official form without having read and understood it.",
        "Do not give access to your My IRCC account to an unauthorized third party.",
        "Do not assume someone from your community is necessarily trustworthy — scams often come from acquaintances.",
        "Do not pay for information freely available on canada.ca.",
      ],
      ctaFree: 'Book a free call — 15 min',
      ctaOrientation: 'Orientation call — 45 min',
      disclaimer:
        'Marhaban Canada provides general and informational support. This service does not replace a regulated immigration consultant (RCIC), a lawyer, or a government body. For any immigration process, only work with verifiable accredited professionals.',
    },
    ar: {
      title: 'وعود الهجرة',
      description:
        'احذر من الضمانات والوعود السريعة والأشخاص الذين يطلبون المال بدون دليل واضح.',
      hero: {
        eyebrow: 'مكافحة الاحتيال',
        title: 'وعود الهجرة',
        text: 'إقامة دائمة مضمونة، ملفات معجّلة، مستشارون مزيفون: الإشارات التي يجب معرفتها.',
      },
      why: 'عمليات الاحتيال المرتبطة بالهجرة من الأكثر شيوعاً وتكلفة. يستهدف المحتالون الأشخاص في أوضاع هشة، غالباً تحت الضغط، بوعد نتائج مستحيلة أو غير قانونية مقابل المال.',
      signalsTitle: 'إشارات التحذير',
      signals: [
        '"ضمان" الإقامة الدائمة أو التأشيرة — لا أحد يستطيع ضمان ذلك قانونياً.',
        'آجال مستحيلة: "إقامة في 3 أشهر" أو "تأشيرة سريعة مضمونة".',
        'مستشار بدون رقم اعتماد RCIC (أو AIEC في كيبيك).',
        'طلب الدفع نقداً أو بتحويل غير قابل للتتبع أو عملة مشفرة.',
        'ضغط للتوقيع بسرعة أو الدفع قبل استلام نسخة من العقد.',
        'طلب ملء استمارات رسمية دون شرحها لك.',
      ],
      questionsTitle: 'أسئلة يجب طرحها',
      questions: [
        'ما هو رقم اعتمادك RCIC أو AIEC؟ (قابل للتحقق عبر الإنترنت)',
        'هل يمكنك تقديم عقد مكتوب يفصّل الخدمات والرسوم؟',
        'ما الخطوات التي ستتخذها بالضبط نيابة عني؟',
        'كيف يمكنني متابعة ملفي مباشرة مع IRCC؟',
        'ماذا يحدث إذا رُفض طلبي؟ هل هناك استرداد؟',
      ],
      verifyTitle: 'نقاط التحقق قبل الدفع',
      verify: [
        'تحقق من رقم RCIC على الموقع الرسمي لكلية المستشارين: college-ic.ca',
        'تحقق من IRCC.ca مباشرة للآجال الرسمية للمعالجة.',
        'اطلب عقداً مكتوباً قبل أي دفع — المستشار الحقيقي يطلبه أيضاً.',
        'ابحث عن اسم المستشار على Google + "احتيال" أو "شكوى".',
        'تحقق مما إذا كان المحامي عضواً في نقابة المحامين الإقليمية.',
      ],
      avoidTitle: 'ما يجب تجنبه',
      avoid: [
        'لا تدفع أبداً لشخص يضمن نتيجة هجرة.',
        'لا توقع استمارة رسمية دون قراءتها وفهمها.',
        'لا تعطِ وصولاً لحساب My IRCC لطرف ثالث غير مخول.',
        'لا تفترض أن شخصاً من مجتمعك جدير بالثقة بالضرورة.',
        'لا تدفع مقابل معلومات متاحة مجاناً على canada.ca.',
      ],
      ctaFree: 'احجز مكالمة مجانية — 15 دقيقة',
      ctaOrientation: 'مكالمة توجيه — 45 دقيقة',
      disclaimer:
        'تقدم مرحبا كندا دعماً عاماً وإعلامياً. لا يحل هذا الخدمة محل مستشار هجرة مرخص (RCIC) أو محامٍ أو جهة حكومية.',
    },
  },
  {
    slug: 'verification',
    fr: {
      title: 'Vérifier une situation',
      description:
        "Une page simple pour aider à préparer les informations à vérifier avant de payer ou de faire confiance.",
      hero: {
        eyebrow: 'ANTI-ARNAQUE',
        title: "Vérifier avant d'agir",
        text: "Doute sur une annonce, une personne ou un document ? Voici les étapes simples pour vérifier.",
      },
      why: "Avant de payer, de signer ou de partager ses informations, il est toujours possible de vérifier. La plupart des arnaques misent sur l'urgence et la confiance pour empêcher cette vérification. Prendre quelques minutes peut éviter une erreur coûteuse.",
      signalsTitle: "Signaux qui invitent à vérifier",
      signals: [
        "On te demande d'agir vite, sans temps pour réfléchir.",
        "La situation semble trop avantageuse pour être vraie.",
        "Quelqu'un demande de l'argent, des documents ou un accès à un compte.",
        "Tu ne peux pas vérifier l'identité de la personne ou de l'organisation.",
        "L'interlocuteur refuse de communiquer par écrit ou de fournir un document officiel.",
      ],
      questionsTitle: "Questions à te poser avant d'agir",
      questions: [
        "Ai-je pu vérifier l'identité de cette personne ou de cette organisation indépendamment ?",
        "Existe-t-il un document écrit que je peux relire avant de payer ou de signer ?",
        "Quelqu'un de confiance autour de moi a-t-il vérifié cette situation ?",
        "Puis-je contacter directement l'organisme officiel concerné pour confirmer ?",
        "Que se passe-t-il si je prends 48h de plus pour décider ?",
      ],
      verifyTitle: 'Comment vérifier étape par étape',
      verify: [
        "Rechercher le nom de la personne ou l'entreprise sur Google + 'arnaque' ou 'avis'.",
        "Vérifier les registres officiels : canada.ca, registre des entreprises provincial, college-ic.ca (consultants immigration).",
        "Appeler directement l'organisme concerné via les coordonnées sur son site officiel — jamais via un numéro reçu par email.",
        "Faire relire la situation à un proche ou à un organisme d'aide aux nouveaux arrivants.",
        "Contacter le Centre antifraude du Canada si tu soupçonnes une fraude.",
      ],
      avoidTitle: "Ce qu'il ne faut pas faire",
      avoid: [
        "Ne pas agir sous la pression du temps — une vraie offre sera encore disponible demain.",
        "Ne pas partager ses informations personnelles avant d'avoir vérifié.",
        "Ne pas envoyer d'argent par virement ou crypto sans rencontre en personne et contrat signé.",
        "Ne pas croire qu'une personne connue sur les réseaux sociaux est nécessairement réelle.",
        "Ne pas hésiter à dire 'j'ai besoin de temps' — une personne honnête comprendra.",
      ],
      ctaFree: 'Réserver un appel gratuit — 15 min',
      ctaOrientation: 'Appel orientation — 45 min',
      disclaimer:
        "Marhaban Canada offre un accompagnement général et informatif. Ce service ne remplace pas un avocat ou un organisme gouvernemental. En cas de fraude, contactez le Centre antifraude du Canada au 1-888-495-8501.",
    },
    en: {
      title: 'Verifying a situation',
      description:
        "A simple page to help prepare the information to verify before paying or trusting.",
      hero: {
        eyebrow: 'ANTI-SCAM',
        title: 'Verify before acting',
        text: "Doubt about a listing, a person, or a document? Here are the simple steps to verify.",
      },
      why: "Before paying, signing, or sharing information, it is always possible to verify. Most scams rely on urgency and trust to prevent this verification. Taking a few minutes can prevent a costly mistake.",
      signalsTitle: 'Signals that invite verification',
      signals: [
        "You are asked to act quickly, without time to think.",
        "The situation seems too good to be true.",
        "Someone asks for money, documents, or account access.",
        "You cannot verify the identity of the person or organization.",
        "The person refuses to communicate in writing or provide an official document.",
      ],
      questionsTitle: 'Questions to ask yourself before acting',
      questions: [
        "Have I been able to independently verify the identity of this person or organization?",
        "Is there a written document I can review before paying or signing?",
        "Has someone I trust around me checked this situation?",
        "Can I contact the official body directly to confirm?",
        "What happens if I take 48 more hours to decide?",
      ],
      verifyTitle: 'How to verify step by step',
      verify: [
        "Search the person's name or company on Google + 'scam' or 'reviews'.",
        "Check official registries: canada.ca, provincial business registry, college-ic.ca (immigration consultants).",
        "Call the relevant organization directly using contact details on its official website — never via a number received by email.",
        "Have the situation reviewed by a trusted person or newcomer support organization.",
        "Contact the Canadian Anti-Fraud Centre if you suspect fraud.",
      ],
      avoidTitle: 'What not to do',
      avoid: [
        "Do not act under time pressure — a real offer will still be available tomorrow.",
        "Do not share personal information before verifying.",
        "Do not send money by wire or crypto without an in-person meeting and signed contract.",
        "Do not assume someone known on social media is necessarily real.",
        "Do not hesitate to say 'I need time' — an honest person will understand.",
      ],
      ctaFree: 'Book a free call — 15 min',
      ctaOrientation: 'Orientation call — 45 min',
      disclaimer:
        'Marhaban Canada provides general and informational support. This service does not replace a lawyer or government body. In case of fraud, contact the Canadian Anti-Fraud Centre at 1-888-495-8501.',
    },
    ar: {
      title: 'التحقق من وضع ما',
      description:
        'صفحة بسيطة للمساعدة في تحضير المعلومات الواجب التحقق منها قبل الدفع أو الثقة.',
      hero: {
        eyebrow: 'مكافحة الاحتيال',
        title: 'تحقق قبل التصرف',
        text: 'شك في إعلان أو شخص أو وثيقة؟ إليك الخطوات البسيطة للتحقق.',
      },
      why: 'قبل الدفع أو التوقيع أو مشاركة المعلومات، دائماً يمكن التحقق. معظم عمليات الاحتيال تعتمد على الإلحاح والثقة لمنع هذا التحقق. أخذ بضع دقائق يمكن أن يمنع خطأً مكلفاً.',
      signalsTitle: 'إشارات تدعو للتحقق',
      signals: [
        'يُطلب منك التصرف بسرعة دون وقت للتفكير.',
        'الوضع يبدو جيداً بشكل مبالغ فيه ليكون حقيقياً.',
        'شخص ما يطلب أموالاً أو وثائق أو وصولاً لحساب.',
        'لا يمكنك التحقق من هوية الشخص أو المؤسسة.',
        'يرفض المحاور التواصل كتابياً أو تقديم وثيقة رسمية.',
      ],
      questionsTitle: 'أسئلة يجب طرحها على نفسك قبل التصرف',
      questions: [
        'هل تمكنت من التحقق باستقلالية من هوية هذا الشخص أو المنظمة؟',
        'هل هناك وثيقة مكتوبة يمكنني مراجعتها قبل الدفع أو التوقيع؟',
        'هل تحقق شخص أثق به من هذا الوضع؟',
        'هل يمكنني الاتصال مباشرة بالجهة الرسمية المعنية للتأكيد؟',
        'ماذا يحدث إذا أخذت 48 ساعة أكثر للقرار؟',
      ],
      verifyTitle: 'كيفية التحقق خطوة بخطوة',
      verify: [
        'ابحث عن اسم الشخص أو الشركة على Google + "احتيال" أو "تقييمات".',
        'تحقق من السجلات الرسمية: canada.ca، سجل الأعمال الإقليمي، college-ic.ca.',
        'اتصل بالجهة المعنية مباشرة باستخدام بيانات الاتصال على موقعها الرسمي.',
        'اطلب من شخص تثق به أو منظمة دعم القادمين الجدد مراجعة الوضع.',
        'تواصل مع مركز مكافحة الاحتيال الكندي إذا اشتبهت بعملية احتيال.',
      ],
      avoidTitle: 'ما يجب تجنبه',
      avoid: [
        'لا تتصرف تحت ضغط الوقت — العرض الحقيقي سيكون متاحاً غداً.',
        'لا تشارك معلوماتك الشخصية قبل التحقق.',
        'لا ترسل أموالاً بتحويل أو عملة مشفرة بدون لقاء شخصي وعقد موقع.',
        'لا تفترض أن شخصاً معروفاً على وسائل التواصل حقيقي بالضرورة.',
        'لا تتردد في قول "أحتاج وقتاً" — الشخص الأمين سيفهم.',
      ],
      ctaFree: 'احجز مكالمة مجانية — 15 دقيقة',
      ctaOrientation: 'مكالمة توجيه — 45 دقيقة',
      disclaimer:
        'تقدم مرحبا كندا دعماً عاماً وإعلامياً. لا يحل هذا الخدمة محل محامٍ أو جهة حكومية. في حالة احتيال، تواصل مع مركز مكافحة الاحتيال الكندي على 1-888-495-8501.',
    },
  },
];

export const antiScamGuides = Object.fromEntries(
  guides.map((g) => [g.slug, g]),
) as Record<AntiScamGuideSlug, AntiScamGuide>;

export function getAntiScamGuide(slug: string, locale: Locale): LocaleScamGuideContent | null {
  if (!isAntiScamGuideSlug(slug)) return null;
  return antiScamGuides[slug][locale];
}

export const antiScamGuideMeta: Record<AntiScamGuideSlug, { icon: string; fr: string; en: string; ar: string }> = {
  logement: { icon: '🏠', fr: 'Logement', en: 'Housing', ar: 'السكن' },
  emploi: { icon: '💼', fr: "Emploi", en: 'Employment', ar: 'العمل' },
  immigration: { icon: '🛂', fr: 'Immigration', en: 'Immigration', ar: 'الهجرة' },
  verification: { icon: '🔍', fr: 'Vérification', en: 'Verification', ar: 'التحقق' },
};
