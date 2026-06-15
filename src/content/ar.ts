// src/content/ar.ts
// ✅ Version cohérente (anti-404) :
// - Step id: "telephone" (au lieu de "mobile")
// - guideOrder cohérent
// - quickGuides pointe vers des routes existantes

import type { LocaleContent, StepGuide, StepId } from './fr';

const buildStepsRecord = (steps: StepGuide[]) =>
  steps.reduce((acc, step) => {
    acc[step.id] = step;
    return acc;
  }, {} as Record<StepId, StepGuide>);

const arSteps: StepGuide[] = [
  {
    id: "nas",
    title: "رقم التأمين الاجتماعي (NAS)",
    description: "يستخدم للعمل ودفع الضرائب والحصول على خدمات معينة.",
    href: "/parcours/guide/steps/nas",
    summary: "يربطك رقم التأمين الاجتماعي بالضرائب والوظيفة والبرامج الفيدرالية. بدونه، لا يمكن لأي صاحب عمل أن يدفع لك بشكل قانوني.",
    what: "رقم التأمين الاجتماعي هو رقم فريد يصدر عن خدمة كندا يثبت أنك مخول بالعمل أو الحصول على المزايا.",
    why: "يؤمن سجلاتك الضريبية ويساعد على منع سرقة الهوية.",
    how: [
      "احجز زيارة لمركز خدمة كندا (أو تقدم عبر الإنترنت إذا كانت حالتك تسمح بذلك).",
      "أحضر جواز سفرك وتصريح الدراسة أو العمل وإثبات عنوان كندي.",
      "احتفظ برسالة رقم التأمين الاجتماعي في ملف مادي، ولا تشارك هذا الرقم عبر الرسائل أبدًا.",
    ],
    avoid: [
      "لا تعط رقم التأمين الاجتماعي الخاص بك إلا لصاحب عمل مؤكد، أو مصرفك، أو السلطات.",
      "ارفض أي عرض مدفوع يعدك برقم تأمين اجتماعي أسرع.",
    ],
    sources: [{ name: "خدمة كندا", url: "https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html" }],
  },
  {
    id: "health",
    title: "بطاقة الصحة الإقليمية",
    description: "الوصول إلى النظام العام في مقاطعة وصولك.",
    href: "/parcours/guide/steps/health",
    summary: "كل مقاطعة تدير تأمينها الصحي. طالما أن بطاقتك غير نشطة، فإن الرعاية الطارئة قد تكلفك الكثير.",
    what: "تثبت بطاقة الصحة أهليتك للنظام العام (RAMQ, OHIP, MSP, إلخ).",
    why: "تغطي الاستشارات الطبية الأساسية وتجنب دفع تكاليف عالية مقدمًا.",
    how: [
      "راجع موقع مقاطعتك للتأكد من النماذج والفترات الزمنية.",
      "اجمع الهوية، والتصريح، وإثبات الإقامة (عقد إيجار، فاتورة).",
      "قدم طلبك عبر الإنترنت أو شخصيًا، ثم راقب البريد.",
    ],
    avoid: [
      "لا تكذب بشأن تاريخ وصولك أو عنوانك: قد يتم إلغاء البطاقة.",
      "احذر من المواقع غير الحكومية التي تفرض رسومًا على نماذج مجانية.",
    ],
    sources: [{ name: "IRCC – الرعاية الصحية", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/apprendre-canada/soins-sante/systeme-soins-sante.html" }],
  },
  {
    id: "bank",
    title: "حساب بنكي",
    description: "نظم أمورك المالية وقم ببناء تاريخك الائتماني.",
    href: "/parcours/guide/steps/bank",
    summary: "يساعد فتح حساب محلي على تحويلات صاحب العمل واستئجار سكن والوصول إلى منتجات القادمين الجدد.",
    what: "يتيح لك الحساب الكندي وبطاقة الائتمان المؤمنة الحصول على الدخل والدفع وبناء درجة ائتمانك.",
    why: "تطلب البنوك غالبًا حسابًا نشطًا للتحقق من الهوية وتقليل الاحتيال.",
    how: [
      "قارن برامج القادمين الجدد (رسوم مخفضة، تحويل دولي).",
      "احجز موعدًا في الفرع مع جواز السفر والتصريح وإثبات العنوان.",
      "اطلب بطاقة ائتمان مؤمنة أو برنامج مناسب للقادمين الجدد.",
    ],
    avoid: ["لا تشارك رقم التعريف الشخصي الخاص بك أو رموزك المصرفية أبدًا.", "لا توقع على أي منتج لا تفهم رسومه."],
    sources: [{ name: "ACFC – فتح حساب", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/comptes-bancaires/ouvrir-compte-bancaire.html" }],
  },
  {
    id: "phone",
    title: "هاتف / شريحة SIM",
    description: "احصل على رقم محلي للإجراءات والاتصالات.",
    href: "/parcours/guide/steps/phone",
    summary: "يساعد الرقم المحلي في التحقق من الهوية وتجنب رسوم التجوال الباهظة.",
    what: "يتضمن ذلك شراء شريحة SIM/eSIM كندية واختيار خطة مناسبة لشهرك الأول.",
    why: "تتطلب الإجراءات الإدارية غالبًا رقمًا محليًا لتأكيد الحساب.",
    how: [
      "قارن بين خطط القادمين الجدد من Bell و Rogers و Telus، وخيارات الدفع المسبق.",
      "اشترِ شريحة SIM الخاصة بك في المطار أو متجر رسمي للتفعيل الفوري.",
      "احتفظ بالإيصال لإثبات عنوانك أو تاريخ وصولك إذا طُلب ذلك.",
    ],
    avoid: ["تجنب شراء شريحة SIM من بائعين غير مصرح لهم.", "لا تشارك رموز التحويل أو تفاصيل حسابك عبر الإنترنت."],
    sources: [{ name: "ISDE – خدمات لاسلكية", url: "https://ised-isde.canada.ca/site/services-telecommunications/fr/services-sans-fil" }],
  },
  {
    id: "housing",
    title: "البحث عن سكن",
    description: "قدم سجلاً نظيفًا واعرف القواعد الإقليمية.",
    href: "/parcours/guide/steps/housing",
    summary: "يحمي عقد الإيجار المكتوب والمتوافق حقوقك. يطلب أصحاب العقارات الجادون ملفًا كاملاً حتى بدون سجل محلي.",
    what: "يتضمن ملف المستأجر إثبات الدخل والمراجع ووديعة قانونية وفقًا للمقاطعة.",
    why: "يقلل من مخاطر الاحتيال ويساعدك على الاستئجار بشروط واضحة.",
    how: [
      "جهز سيرتك الذاتية للإيجار وكشوف حساباتك المصرفية وخطاب العمل أو الدعم.",
      "خطط للزيارات (مادية أو عبر الفيديو) وتحقق من هوية المؤجر.",
      "اقرأ كل بند من بنود عقد الإيجار وادفع بوسائل قابلة للتتبع بعد التوقيع.",
    ],
    avoid: ["لا تحول الأموال أبدًا قبل توقيع عقد إيجار.", "ارفض طلبات نسخ غير ضرورية من رقم التأمين الاجتماعي أو جواز السفر."],
    sources: [
      { name: "IRCC – السكن", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/vie-canada/logement.html" },
      { name: "CMHC", url: "https://www.cmhc-schl.gc.ca/fr/consommateurs" },
    ],
  },
];

export const arContent: LocaleContent = {
  locale: "ar",
  dir: "rtl",
  brand: "مرحبًا كندا",
  contactEmail: "contact@marhabancanada.ca",

  hero: {
    title: "وصولك إلى كندا، خطوة بخطوة.",
    subtitle: "كل خطوة مشروحة ببساطة بمصادرها الرسمية.",
    ctaPrimary: "عرض قائمة التحقق",
    ctaSecondary: "استكشاف المصادر",
  },

  microcopy: {
    homeTitle: "الخطوات الأولى بعد وصولك إلى كندا",
    homeSubtitle: "مرحبًا كندا هي خدمة دعم وتوجيه للقادمين الجدد إلى كندا.",
    homeCtaPrimary: "ابدأ الرحلة",
    homeCtaSub: "مجاني · يستند إلى مصادر رسمية · لا يتطلب التسجيل",
    journeyTitle: "رحلة استقرارك",
    journeySubtitle: "الترتيب الأبسط للبدء بدون توتر.",
    phaseWeek1Title: "الأسبوع الأول",
    phaseWeek1Desc: "تجعلك هذه الخطوات جاهزًا للعمل بسرعة. واحدة تلو الأخرى، حسب وتيرتك.",
    phaseMonth1Title: "الشهر الأول",
    phaseMonth1Desc: "لا يوجد شيء عاجل. تقدم عندما تشعر بالاستعداد.",
    phaseOngoingTitle: "مستمر",
    phaseOngoingDesc: "ضع هذه في الاعتبار للأسابيع القادمة.",
    breadcrumbHome: "الرئيسية",
    breadcrumbJourney: "الرحلة",
    breadcrumbGuide: "الدليل",
    breadcrumbBlog: "المدونة",
    youAreHere: "أنت هنا",
    statusInStep: "أنت في الخطوة {step} ({phase}). نقطة بداية جيدة.",
    nextStepLabel: "الخطوة التالية",
    backLabel: "العودة",
    backToJourneyLabel: "العودة إلى الرحلة",
    recommendedNextStepTitle: "الخطوة التالية الموصى بها",
    recommendedNextStepDesc: "عندما تكون جاهزًا، يمكنك الانتقال إلى الخطوة التالية.",
    viewGuideCta: "عرض الدليل",
    relatedArticlesTitle: "مقالات ذات صلة",
    priorityReadsTitle: "قراءات ذات أولوية",
    priorityReadsDesc: "إذا وصلت للتو، ابدأ بهذه المقالات.",
    searchPlaceholder: "بحث (سكن، ائتمان، رقم التأمين الاجتماعي...)",
    mottoLabel: "الشعار",
    docsLabel: "ما تحتاجه (لا أكثر)",
    smartTipsLabel: "من الجيد معرفته (نصائح مفيدة)",
    guideStartLabel: "بداية الدليل",
    guideEndLabel: "نهاية الدليل",
    noCommitmentLabel: "بدون التزام · يمكنك التغيير لاحقًا.",
    continueWhenReadyLabel: "عندما تكون جاهزًا، يمكنك المتابعة.",
    whyIntroLabel: "بدون هذه الخطوة، تصبح عدة إجراءات معقدة.",
    howIntroLabel: "اتبع هذه الخطوات بالترتيب. لا شيء معقد.",
    docsIntroLabel: "قم بإعداد هذه المستندات قبل الذهاب.",
    avoidIntroLabel: "يجب تجنبه تمامًا (لأمانك)",
  },

  serviceAccompagnementDefinition: {
    title: "خدمة الدعم",
    body: "خدمة ترشد وتشرح وتوجه القادمين الجدد، خطوة بخطوة، دون القيام بالإجراءات نيابة عنهم ودون فرض رسوم على الخدمات الرسمية. الهدف هو المساعدة في الفهم وتجنب الأخطاء والمضي قدمًا بأمان، بالاعتماد فقط على المصادر الرسمية.",
  },
  serviceAccompagnementWhatIs: [
    "توجيه واضح للقادمين الجدد",
    "شرح مبسط للإجراءات الرسمية",
    "مساعدة في فهم الترتيب المنطقي للخطوات",
    "الوقاية من الأخطاء والاحتيال",
    "إعادة التوجيه إلى المصادر الرسمية فقط",
    "دعم بشري، مطمئن وغير حكمي",
  ],
  serviceAccompagnementWhatIsNot: [
    "هذه ليست خدمة حكومية",
    "هذه ليست خدمة هجرة",
    "هذا ليس وكيلًا أو مستشارًا مدفوع الأجر",
    "لا نملأ أي نماذج نيابة عنك",
    "لا نقوم بحجز أي مواعيد نيابة عنك",
    "لا نفرض رسومًا على أي خدمات رسمية",
  ],
  serviceAccompagnementWhatIsTitle: "ما هذه الخدمة",
  serviceAccompagnementWhatIsNotTitle: "ما ليست هذه الخدمة",
  serviceAccompagnementNoProxy: "لا نقوم بأي إجراءات رسمية نيابة عنك.",
  serviceAccompagnementPillar: "مرحبًا كندا هي خدمة دعم وتوجيه للقادمين الجدد إلى كندا.",
  serviceAccompagnementDisclaimer: "تقدم مرحبا كندا توجيهاً عملياً ومعلومات عامة. نحن لا نقدم نصائح قانونية ولا نصائح في الهجرة. للأسئلة المتعلقة بالتأشيرات أو التصاريح أو الإقامة الدائمة أو الأهلية أو استراتيجية الهجرة، يرجى استشارة ممثل معتمد.",

  seoDescriptions: {
    meta: "خدمة دعم للقادمين الجدد إلى كندا: الإجراءات الرسمية، السكن، البنوك، الهاتف، الوقاية من الاحتيال.",
    og: "خدمة دعم للقادمين الجدد إلى كندا: الإجراءات الرسمية، السكن، البنوك، الهاتف، الوقاية من الاحتيال.",
    pdfHeader: "خدمة دعم للقادمين الجدد إلى كندا: الإجراءات الرسمية، السكن، البنوك، الهاتف، الوقاية من الاحتيال.",
  },

  services: {
    title: "الخدمات ذات الأولوية",
    cards: [
      {
        title: "التسوية الإدارية",
        description: "البطاقة الصحية، البنوك، والحماية الأساسية.",
        icon: "home",
        sources: [{ name: "خدمة كندا", url: "https://www.canada.ca/fr/emploi-developpement-social.html" }],
      },
      {
        title: "سكن موثوق",
        description: "ملف المستأجر، قراءة عقد الإيجار، علامات الإنذار.",
        icon: "shield",
        sources: [{ name: "CMHC", url: "https://www.cmhc-schl.gc.ca/fr/consommateurs" }],
      },
      {
        title: "مهنة محلية",
        description: "السيرة الذاتية الكندية، المقابلات، معايير الرواتب الرسمية.",
        icon: "briefcase",
        sources: [{ name: "بنك الوظائف", url: "https://www.jobbank.gc.ca" }],
      },
      {
        title: "الشبكات الإقليمية",
        description: "المنظمات الفرانكفونية، الموارد المجتمعية.",
        icon: "globe",
        sources: [{ name: "IRCC", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete.html" }],
      },
    ],
  },

  navLinks: [
    { label: "الخدمات", href: "#services" },
    { label: "الخطوات", href: "#steps" },
    { label: "الميزانية", href: "#budget" },
    { label: "الأدلة", href: "/parcours/guide" },
    { label: "المصادر والموثوقية", href: "/sources" },
    { label: "إخلاء المسؤولية", href: "/mentions" },
  ],

  checklist: {
    title: "خطواتك الخمس الأولى",
    subtitle: "نقرة واحدة = صفحة مفصلة. تحقق وتقدم بوتيرتك الخاصة.",
    shareLabel: "شارك تقدمي",
    resetLabel: "إعادة تعيين",
    shareSuccess: "تم نسخ التقدم، يمكنك إرساله.",
    shareError: "لا يمكن المشاركة الآن.",
    items: arSteps,
  },

  steps: buildStepsRecord(arSteps),

  survival48h: {
    title: "خطة 48 ساعة",
    subtitle: "استقرار النقل، الإقامة المؤقتة، والاتصال.",
    items: [
      {
        title: "مغادرة المطار",
        description: "يقدم REM مونتريال و UP Express تورنتو و Canada Line فانكوفر رحلات آمنة وقابلة للتتبع.",
        href: "https://tc.canada.ca/fr/services-transports.html",
        sources: [{ name: "مواصلات كندا", url: "https://tc.canada.ca" }],
      },
      {
        title: "التنقل في المدينة",
        description: "اشترِ بطاقة OPUS أو PRESTO أو Compass عند الوصول للاستفادة من الأسعار المحلية.",
        href: "https://www.canada.ca/fr.html",
        sources: [{ name: "السلطات المحلية", url: "https://www.canada.ca/fr.html" }],
      },
      {
        title: "إقامة مؤقتة",
        description: "أعطِ الأولوية للمساكن الطلابية المفتوحة للقادمين الجدد أو بيوت الشباب المدرجة في المدينة.",
        href: "https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants.html",
        sources: [{ name: "IRCC", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete.html" }],
      },
      {
        title: "شريحة SIM كندية",
        description: "تقدم أكشاك Bell و Rogers و Telus في المطار خططًا للقادمين الجدد بدون ائتمان.",
        href: "https://ised-isde.canada.ca/site/services-telecommunications/fr/services-sans-fil",
        sources: [{ name: "ISDE", url: "https://ised-isde.canada.ca" }],
      },
    ],
  },

  budget: {
    title: "تقدير الميزانية الشهرية",
    subtitle: "سلة البقاء = الإيجار + البقالة + النقل × معامل الأسرة.",
    note: "المبالغ مستمدة من المدن أو الوكالات الرسمية ويتم تحديثها بانتظام.",
    cityLabel: "اختر مدينة",
    householdLabel: "تكوين الأسرة",
    totalLabel: "السلة المقدرة",
    breakdownLabels: { rent: "الإيجار", groceries: "البقالة", transport: "النقل" },
    households: [
      { id: "solo", label: "شخص بالغ واحد", multiplier: 1 },
      { id: "couple", label: "زوجان", multiplier: 1.35 },
      { id: "famille", label: "عائلة (3+)", multiplier: 1.6 },
    ],
    cities: [
      {
        id: "montreal",
        label: "مونتريال",
        rent: 1500,
        groceries: 420,
        transport: 94,
        cityMultiplier: 1,
        sources: [{ name: "CMHC", url: "https://www.cmhc-schl.gc.ca/fr/consommateurs" }],
      },
      {
        id: "toronto",
        label: "تورونتو",
        rent: 2200,
        groceries: 520,
        transport: 156,
        cityMultiplier: 1.2,
        sources: [{ name: "مدينة تورونتو", url: "https://www.toronto.ca" }],
      },
      {
        id: "calgary",
        label: "كالجاري",
        rent: 1750,
        groceries: 450,
        transport: 112,
        cityMultiplier: 1.05,
        sources: [{ name: "مدينة كالجاري", url: "https://www.calgary.ca" }],
      },
    ],
  },

  resourceSources: [
    {
      title: "ابحث عن عيادة فرانكفونية",
      description: "قائمة العيادات المجتمعية الفرانكفونية حسب المقاطعة.",
      href: "https://santefrancais.ca",
      sources: [{ name: "شبكة الصحة باللغة الفرنسية", url: "https://santefrancais.ca" }],
    },
    {
      title: "برامج IRCC للتكامل",
      description: "ورش عمل مجانية للسيرة الذاتية والسكن والحقوق.",
      href: "https://ircc.canada.ca/francais/services/immigration-canada/etablir.html",
      sources: [{ name: "IRCC", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete.html" }],
    },
    {
      title: "حماية المستهلك",
      description: "دليل مكافحة الاحتيال للإيجارات والمشتريات.",
      href: "https://www.canada.ca/fr/agence-consommation-matiere-financiere.html",
      sources: [{ name: "ACFC", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere.html" }],
    },
  ],

  resources: {
    header: {
      title: "الموارد الرسمية والمجتمعية",
      subtitle: "روابط موثوقة، مصنفة حسب الحاجة.",
      searchPlaceholder: "ابحث عن مورد (سكن، صحة، توظيف...)",
      provinceLabel: "المقاطعة",
      categoryLabel: "الفئة",
    },
    accompaniment: {
      shortDefinition: "يقدم هذا الموقع توجيهاً عملياً ومعلومات عامة للقادمين الجدد.",
      noProxyLine: "لا نقوم بأي إجراءات رسمية نيابة عنك.",
      footerHelp: "هل تحتاج إلى مساعدة لمعرفة ما يجب القيام به أولاً؟ يمكن لخدمة الدعم أن توجهك وفقًا لوضعك.",
    },
    quickGuides: {
      documentsCard: {
        title: "وثائق عملية للاستقرار",
        body: "جهز أوراقك مرة واحدة لتجنب العوائق.",
        ctaLabel: "عرض قائمة تحقق الاستقرار",
        href: "/checklist",
      },
      transportCard: {
        title: "النقل والقيادة",
        body: "افهم القواعد المحلية قبل القيادة.",
        ctaLabel: "عرض موارد النقل",
        href: "/resources",
      },
      creditCard: {
        title: "الائتمان والخدمات المصرفية",
        body: "تجنب الأخطاء التي تستمر طويلاً.",
        ctaLabel: "عرض دليل الخدمات المصرفية",
        href: "/parcours/guide/steps/bank",
      },
    },
    sections: {
      arrival: { title: "الوصول", hint: "للاستشارة عند الوصول لفهم الخطوات الرسمية." },
      housing: { title: "السكن", hint: "للاستشارة قبل أي زيارة أو وديعة." },
      health: { title: "الصحة", hint: "يجب القيام به عند الوصول، حتى لو لم يتم استلام البطاقة بعد." },
      jobs: { title: "التوظيف", hint: "مفيد للبحث عن وظيفة دون الوقوع في الفخاخ." },
      documents: { title: "وثائق عملية للاستقرار", hint: "لتجهيز الأوراق المفيدة مرة واحدة، وتوفير الوقت." },
      transport: { title: "النقل", hint: "لفهم القيادة والنقل حسب مقاطعتك." },
      credit: { title: "الائتمان", hint: "مفيد من الشهر الأول لتجنب الأخطاء طويلة الأمد." },
      taxes: { title: "الضرائب", hint: "للاحتفاظ بوثائقك وتجنب ضغوط الضرائب." },
      integration: { title: "التكامل", hint: "للعثور على مساعدة محلية وخدمات موثوقة." },
    },
    ui: {
      recommendedStart: "⭐ موصى به للبدء",
      openResource: "فتح المورد",
      addFavorite: "إضافة إلى المفضلة",
      seeGuide: "عرض الدليل المرتبط →",
      backToPath: "العودة إلى الرحلة →",
    },
  },

  resourcesPage: {
    labels: {
      eyebrow: "الموارد",
      title: "الموارد الرسمية والمجتمعية",
      subtitle: "روابط موثوقة، مصنفة حسب الحاجة.",
      searchPlaceholder: "بحث (سكن، صحة، عمل...)",
      provinceLabel: "المقاطعة",
      categoryLabel: "الفئة",
      filterAll: "الكل",
      officialLabel: "رسمي",
      recommendedLabel: "موصى به",
      openLabel: "فتح المورد",
      addFavoriteLabel: "إضافة إلى المفضلة",
      removeFavoriteLabel: "إزالة من المفضلة",
      emptyState: "لا توجد موارد مطابقة لهذا البحث.",
      allProvincesLabel: "كندا",
      guideCalloutTitle: "كلمة السر",
      guideWhatTitle: "ما هو؟",
      guideWhyTitle: "لماذا هو مهم؟",
      guideHowTitle: "كيف تفعل ذلك",
      guidePitfallsTitle: "المزالق التي يجب تجنبها",
      guideActionsTitle: "إجراءات مباشرة",
      guideSourcesTitle: "المصادر الرسمية",
      guideActionPrompt: "جاهز لاتخاذ الإجراءات؟",
      guideEyebrow: "الدليل",
    },
    provinceOptions: [
      { value: "qc", label: "كيبيك" },
      { value: "on", label: "أونتاريو" },
      { value: "bc", label: "كولومبيا البريطانية" },
      { value: "ab", label: "ألبرتا" },
      { value: "other", label: "مقاطعة أخرى" },
    ],
    categories: [
      { id: "arrival", title: "الوصول", description: "الملف العام، الخطوات العملية، والاستقرار." },
      { id: "housing", title: "السكن", description: "عقد الإيجار، الوديعة، القواعد المحلية." },
      { id: "health", title: "الصحة", description: "البطاقة الصحية، التغطية، العيادات." },
      { id: "employment", title: "التوظيف", description: "العروض، الحقوق، المعايير." },
      { id: "documents", title: "وثائق عملية للاستقرار", description: "أوراق مفيدة ونسخ." },
      { id: "transport", title: "النقل", description: "القيادة وبطاقات النقل." },
      { id: "credit", title: "الائتمان", description: "النتيجة وأفضل الممارسات." },
      { id: "taxes", title: "الضرائب", description: "الإقرار السنوي والوثائق." },
      { id: "integration", title: "التكامل", description: "الخدمات المحلية والشبكات." },
    ],
    items: {
      "arrival-services": { title: "خدمات القادمين الجدد", description: "معلومات الترحيب والخدمات الرسمية." },
      ircc: { title: "IRCC - الموقع الرسمي", description: "بوابة Canada.ca الرسمية." },
      cmhc: { title: "CMHC - السكن", description: "نصائح ومعلومات السكن." },
      "tal-qc": { title: "محكمة الإسكان الإدارية (QC)", description: "قواعد وحقوق الإيجار في كيبيك." },
      "health-card": { title: "بطاقة التأمين الصحي", description: "العملية الرسمية + روابط إقليمية." },
      ramq: { title: "RAMQ (كيبيك)", description: "تغطية كيبيك الصحية." },
      ohip: { title: "OHIP (أونتاريو)", description: "تغطية أونتاريو الصحية." },
      msp: { title: "MSP (كولومبيا البريطانية)", description: "تغطية كولومبيا البريطانية الصحية." },
      ahcip: { title: "AHCIP (ألبرتا)", description: "تغطية ألبرتا الصحية." },
      jobbank: { title: "بنك الوظائف", description: "عروض العمل الرسمية." },
      "labour-standards": { title: "معايير العمل", description: "الحقوق والحماية الرسمية." },
      "documents-guide": { title: "دليل الاستقرار", description: "قائمة تحقق لوثائق عملية للاستقرار." },
      "transport-guide": { title: "دليل النقل", description: "القيادة + الخطوات حسب المقاطعة." },
      "credit-guide": { title: "دليل الائتمان", description: "النتيجة وبداية نظيفة." },
      driving: { title: "القيادة في كندا", description: "معلومات كندا الرسمية." },
      saaq: { title: "SAAQ (كيبيك)", description: "القيادة والمركبات في كيبيك." },
      "service-ontario-driving": { title: "ServiceOntario - القيادة", description: "القيادة والطرق في أونتاريو." },
      icbc: { title: "ICBC (كولومبيا البريطانية)", description: "القيادة والتأمين في كولومبيا البريطانية." },
      "alberta-registries": { title: "سجلات ألبرتا", description: "القيادة والخدمات في ألبرتا." },
      "credit-score": { title: "درجة الائتمان (ACFC)", description: "فهم وتحسين درجاتك." },
      taxes: { title: "الضرائب (ARC)", description: "الإقرار السنوي والوثائق." },
      integration: { title: "211 كندا", description: "مساعدة محلية سريعة." },
    },
    guides: {
      documents: {
        title: "وثائق عملية للاستقرار",
        summary: "جهز أوراقك مرة واحدة، ووفر الوقت في كل خطوة.",
        callout: "نسخة واضحة تعني ساعة واحدة أقل من التوتر.",
        what: "تستخدم الوثائق العملية للاستقرار في الخطوات الشائعة مثل العمل والصحة والسكن.",
        why: ["تجنب العوائق الإدارية", "توفير الوقت", "حماية أصولك"],
        how: ["مسح الأوراق المفيدة للاستقرار", "إنشاء مجلد رقمي", "طباعة نسخ رئيسية", "تخزين نسخة دون اتصال"],
        pitfalls: ["مشاركة وثائق عملية للاستقرار دون تحقق", "فقدان الأصول", "عدم الاحتفاظ بنسخ احتياطية"],
        actions: ["إعداد قائمة تحقق شخصية", "إنشاء مجلد سحابي آمن"],
        ctaLabel: "قائمة تحقق لوثائق عملية للاستقرار",
        ctaHref: "/checklist",
        sources: [{ name: "IRCC", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete.html" }],
      },
      transport: {
        title: "النقل والقيادة",
        summary: "فهم الإجراءات حسب مقاطعتك.",
        callout: "قواعد قيادة واضحة = حرية + أمان.",
        what: "تختلف قواعد القيادة وبطاقات النقل حسب المقاطعة.",
        why: ["تجنب الغرامات", "التنقل بسهولة", "تأمين صالح"],
        how: ["التحقق من القواعد الإقليمية", "تجهيز الوثائق", "حجز الاختبارات إذا لزم الأمر"],
        pitfalls: ["القيادة بدون تصريح صالح", "تجاهل مواعيد التحويل النهائية"],
        actions: ["اختيار وسيلة نقل مؤقتة", "تخطيط موعد"],
        ctaLabel: "عرض إجراءات التصريح (حسب المقاطعة)",
        ctaHref: "https://www.canada.ca/fr/services/transport/conduire.html",
        sources: [{ name: "Canada.ca", url: "https://www.canada.ca/fr/services/transport.html" }],
      },
      credit: {
        title: "الائتمان والنتيجة",
        summary: "البدء بشكل نظيف وتجنب الأخطاء.",
        callout: "بداية صغيرة، تأثير كبير على المدى الطويل.",
        what: "تؤثر درجة الائتمان على السكن والقروض والخدمات.",
        why: ["التفاوض على أسعار أفضل", "تسهيل الإيجار", "بناء سمعة مالية"],
        how: ["التقدم بطلب للحصول على بطاقة مناسبة", "الدفع في الوقت المحدد", "الحد من الاستخدام"],
        pitfalls: ["تأخر الدفع", "الاستخدام المفرط"],
        actions: ["مراقبة درجاتك بانتظام", "الحفاظ على سجل نظيف"],
        ctaLabel: "فهم الدرجة + البدء بشكل نظيف",
        ctaHref: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/credit.html",
        sources: [{ name: "ACFC", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere.html" }],
      },
    },
  },

  guideOrder: ["nas", "health", "bank", "phone", "housing"],

  guides: {
    nas: {
      slug: "nas",
      title: "رقم التأمين الاجتماعي (خدمة كندا)",
      icon: "IdCard",
      urgency: 9,
      sections: {
        description: {
          text: "رقم التأمين الاجتماعي هو الرقم الذي يسمح لك بالعمل بشكل قانوني والوصول إلى البرامج الفيدرالية.",
          sources: [{ name: "خدمة كندا", url: "https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html" }],
        },
        why: {
          text: "بدون رقم التأمين الاجتماعي، لا يمكن لصاحب العمل أن يدفع لك أو يبلغ عن خصوماتك، وستتوقف بعض الإعفاءات الضريبية.",
          sources: [{ name: "وكالة الإيرادات الكندية", url: "https://www.canada.ca/fr/agence-revenu.html" }],
        },
        documents: {
          items: ["جواز سفر ساري المفعول", "تصريح دراسة أو عمل", "إثبات عنوان كندي (عقد إيجار، فاتورة، رسالة ترحيب)"],
          sources: [{ name: "خدمة كندا – الوثائق المقبولة", url: "https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale/documents.html" }],
        },
        where: {
          text: "احضر إلى مركز خدمة كندا أو استخدم الإجراء الرسمي عبر الإنترنت إذا كنت مؤهلاً.",
          sources: [{ name: "البحث عن مركز خدمة كندا", url: "https://catalogue.servicecanada.gc.ca/services/centre-service-canada" }],
        },
        cost: {
          text: "مجاني – لا يُسمح لأي شركة بفرض رسوم عليك للحصول على رقم التأمين الاجتماعي.",
          sources: [{ name: "خدمة كندا – أسئلة متكررة عن رقم التأمين الاجتماعي", url: "https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale/questions.html" }],
        },
        proTip: {
          text: "امسح رسالة رقم التأمين الاجتماعي ضوئيًا، واحتفظ بها دون اتصال، ولا تشارك رقمك عبر الرسائل النصية أو المراسلة أبدًا.",
          sources: [{ name: "خدمة كندا – حماية رقم التأمين الاجتماعي الخاص بك", url: "https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale/proteger.html" }],
        },
        fraudAlert: {
          text: "لن يطلب منك أي وكيل رقم التأمين الاجتماعي الخاص بك عبر الهاتف لـ «فتح» ملف. أغلق الخط واتصل بخدمة كندا مباشرة.",
          sources: [{ name: "الشرطة الملكية الكندية – الاحتيال", url: "https://www.grc-rcmp.gc.ca/fr/escroqueries-locatives" }],
        },
      },
    },

    health: {
      slug: "health",
      title: "بطاقة الصحة الإقليمية",
      icon: "HeartPulse",
      urgency: 8,
      sections: {
        description: {
          text: "تصدر كل مقاطعة بطاقة التأمين الصحي الخاصة بها (RAMQ, OHIP, MSP, إلخ) التي تغطي الرعاية الأساسية.",
          sources: [{ name: "IRCC – الرعاية الصحية", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/apprendre-canada/soins-sante/systeme-soins-sante.html" }],
        },
        why: {
          text: "تفرض بعض المقاطعات فترة انتظار؛ بدون بطاقة، يمكن أن تكلف الزيارة البسيطة الكثير.",
          sources: [{ name: "حكومة كيبيك – RAMQ", url: "https://www.quebec.ca/sante/assurance-maladie" }],
        },
        documents: {
          items: ["جواز السفر والتصريح (عمل، دراسة أو إقامة دائمة)", "إثبات الإقامة (عقد إيجار، فاتورة طاقة)", "نموذج إقليمي مكتمل"],
          sources: [{ name: "أونتاريو – OHIP", url: "https://www.ontario.ca/fr/page/obtenir-une-carte-sante" }],
        },
        where: {
          text: "قدم طلبك إلى الوكالة الإقليمية (RAMQ, ServiceOntario, Service BC) أو عبر الإنترنت إذا كان متاحًا.",
          sources: [{ name: "ServiceOntario", url: "https://www.ontario.ca/page/serviceontario" }],
        },
        cost: {
          text: "مجاني: البطاقة مجانية، ولكن قد يكون التأمين الخاص المؤقت مفيدًا خلال فترة الانتظار.",
          sources: [{ name: "حكومة كولومبيا البريطانية – MSP", url: "https://www2.gov.bc.ca/gov/content/sante/assurance-sante-medicale" }],
        },
        proTip: {
          text: "اشترك في تأمين مؤقت (سفر/طالب) حتى يتم تفعيل تغطيتك الإقليمية.",
          sources: [{ name: "IRCC – تأمين خاص", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/soins-sante/assurance-maladie.html" }],
        },
        fraudAlert: {
          text: "النماذج مجانية: تجنب المواقع التي تفرض رسومًا على «رسوم المعالجة».",
          sources: [{ name: "حماية المستهلك أونتاريو", url: "https://www.ontario.ca/fr/page/consumer-protection-ontario" }],
        },
      },
    },

    bank: {
      slug: "bank",
      title: "حساب بنكي",
      icon: "Wallet",
      urgency: 7,
      sections: {
        description: {
          text: "تقدم البنوك الكندية حزمًا لـ «القادمين الجدد» لإدارة أموالك من البداية.",
          sources: [{ name: "ACFC – عروض القادمين الجدد", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/comptes-bancaires/offres-bancaires-nouveaux-arrivants.html" }],
        },
        why: {
          text: "يسهل الحساب المحلي الودائع المباشرة، والمدفوعات القابلة للتتبع للسكن، وبناء الائتمان.",
          sources: [{ name: "ACFC – الائتمان", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/credit.html" }],
        },
        documents: {
          items: ["جواز السفر والتصريح (عمل، دراسة أو إقامة دائمة)", "إثبات عنوان كندي", "رقم التأمين الاجتماعي (اختياري ولكن غالبًا ما يُطلب)"],
          sources: [{ name: "ACFC – فتح حساب", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/comptes-bancaires/ouvrir-compte-bancaire.html" }],
        },
        where: {
          text: "احجز موعدًا في فرع (أو عبر الإنترنت) مع بنك/تعاونية معترف بها.",
          sources: [{ name: "ACFC – قائمة البنوك", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/banques/liste.html" }],
        },
        cost: {
          text: "غالبًا: رسوم شهرية مجانية لمدة 12 شهرًا مع برامج القادمين الجدد، ثم أسعار قياسية.",
          sources: [{ name: "ACFC – عروض القادمين الجدد", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/comptes-bancaires/offres-bancaires-nouveaux-arrivants.html" }],
        },
        proTip: {
          text: "اطلب بطاقة ائتمان مضمونة لبدء تاريخك بمخاطر محكومة.",
          sources: [{ name: "ACFC – البطاقات المضمونة", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/cartes-credit/garanties.html" }],
        },
        fraudAlert: {
          text: "لا تدفع أبدًا لـ «حجز» موعد بنكي وارفض أي تحويل إلى حساب شخصي.",
          sources: [{ name: "ACFC – منع الاحتيال", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/protection-fraude.html" }],
        },
      },
    },

    phone: {
      slug: "phone",
      title: "هاتف وبيانات",
      icon: "PhoneCall",
      urgency: 6,
      sections: {
        description: {
          text: "يسهل الرقم الكندي التحقق من الهوية (البنوك، الخدمات عبر الإنترنت) وأمان الحساب.",
          sources: [{ name: "ISDE – خدمات لاسلكية", url: "https://ised-isde.canada.ca/site/services-telecommunications/fr/services-sans-fil" }],
        },
        why: {
          text: "تستخدم العديد من الخدمات رسائل التحقق النصية لتأمين الوصول إلى حسابك.",
          sources: [{ name: "CRTC – مدونة الخدمات اللاسلكية", url: "https://crtc.gc.ca/fra/phone/mobile/wirelesscode.htm" }],
        },
        documents: {
          items: ["جواز السفر أو بطاقة الهوية مع صورة", "معلومات الاتصال المحلية (العنوان والبريد الإلكتروني)", "اختياري: الجدارة الائتمانية لخطط الدفع الآجل"],
          sources: [{ name: "CRTC – مدونة لاسلكية", url: "https://crtc.gc.ca/fra/phone/mobile/wirelesscode.htm" }],
        },
        where: {
          text: "اشترِ شريحة SIM/eSIM عبر كشك رسمي (مطار، متجر) أو مباشرة من مشغل معترف به.",
          sources: [{ name: "CRTC – الموردون", url: "https://crtc.gc.ca/fra/phone/mobile/tel.htm" }],
        },
        cost: {
          text: "تختلف خطط الدفع المسبق حسب المقاطعة والعروض الترويجية؛ غالبًا ما يكون BYOD هو أفضل بداية.",
          sources: [{ name: "ISDE – مقارن", url: "https://www.ic.gc.ca/eic/site/086.nsf/fra/00006.html" }],
        },
        proTip: {
          text: "أعطِ الأولوية لـ BYOD (أحضر جهازك الخاص) لتجنب التزام طويل قبل أن يكون لديك تاريخ ائتماني.",
          sources: [{ name: "CRTC – مدونة لاسلكية", url: "https://crtc.gc.ca/fra/phone/mobile/wirelesscode.htm" }],
        },
        fraudAlert: {
          text: "احذر من البائعين غير المصرح لهم، الودائع النقدية، والوعود «جيدة جدًا لدرجة يصعب تصديقها». اطلب إيصالًا رسميًا.",
          sources: [{ name: "ISDE – نصائح لمكافحة الاحتيال", url: "https://ised-isde.canada.ca/site/mesures-consommateurs/fr/protection-consommateur/fraude" }],
        },
      },
    },

    housing: {
      slug: "housing",
      title: "سكن للإيجار",
      icon: "Home",
      urgency: 8,
      sections: {
        description: {
          text: "يتضمن الإيجار عقد إيجار مكتوب متوافق مع القواعد الإقليمية وملف مستأجر موثوق.",
          sources: [{ name: "IRCC – السكن", url: "https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/vie-canada/logement.html" }],
        },
        why: {
          text: "يحمي عقد الإيجار الرسمي وديعتك، ويوضح القواعد، ويقلل من مخاطر الانتهاكات.",
          sources: [{ name: "CMHC – حقوق المستأجرين", url: "https://www.cmhc-schl.gc.ca/fr/consommateurs" }],
        },
        documents: {
          items: ["خطاب عمل أو إثبات دخل", "مراجع إيجارية أو مهنية", "كشوف حسابات بنكية أو إثبات ادخار"],
          sources: [{ name: "CMHC – إعداد ملفك", url: "https://www.cmhc-schl.gc.ca/fr/consommateurs/guide-location" }],
        },
        where: {
          text: "قم بزيارة السكن (مادية/فيديو) وتحقق من هوية المؤجر عبر مصادر موثوقة.",
          sources: [{ name: "محكمة الإسكان الإدارية (كيبيك)", url: "https://www.tal.gouv.qc.ca" }],
        },
        cost: {
          text: "تختلف الوديعة القانونية حسب المقاطعة. لا تقبل الطلبات التي تتجاوز المسموح به.",
          sources: [{ name: "أونتاريو – الودائع", url: "https://www.ontario.ca/fr/page/loyer-depot" }],
        },
        proTip: {
          text: "ادفع بوسائل قابلة للتتبع (تحويل/شيك) وأرسل ملخصًا عبر البريد الإلكتروني بعد كل زيارة.",
          sources: [{ name: "ACFC – المدفوعات القابلة للتتبع", url: "https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/transferts-electroniques.html" }],
        },
        fraudAlert: {
          text: "لا يوجد عقد إيجار موقع = لا توجد أموال. احذر من الإعلانات التي ترفض الزيارات.",
          sources: [{ name: "الشرطة الملكية الكندية – الاحتيال في الإيجار", url: "https://www.grc-rcmp.gc.ca/fr/escroqueries-locatives" }],
        },
      },
    },
  },

  globalDisclaimer: "للمعلومات والتوجيه فقط. تحقق دائمًا من الشروط على المواقع الرسمية قبل المتابعة.",

  antiFraud: {
    title: "النزاهة ومكافحة الاحتيال",
    body: "لا نسرع أي تأشيرات، ولا نصنع أي وثائق، ونحيل بشكل منهجي إلى المواقع الحكومية.",
    note: "أبلغ عن أي سلوك مشبوه إلى وكالة خدمات الحدود الكندية أو IRCC (الرابط الرسمي في كل خطوة).",
  },

  // Scams content (placeholder for now, to be filled based on fr.ts)
  scams: {
    microcopy: {
      searchPlaceholder: "ابحث عن عملية احتيال (سكن، عمل...)",
      frequentTitle: "عمليات الاحتيال المتكررة",
      startHousingTitle: "ابدأ بالسكن",
      startHousingText: "إذا طُلب منك الدفع قبل الزيارة، توقّف فورًا: هذه إشارة احتيال شائعة جدًا.",
      startHousingSubtext: "أمثلة، إشارات التحذير وما يجب فعله.",
      startHousingCta: "عرض عمليات احتيال السكن →",
      startHousingCtaAria: "عرض عمليات الاحتيال المتعلقة بالسكن",
      breadcrumb: { home: "الرئيسية", scams: "الاحتيال" },
      backToScams: "العودة إلى عمليات الاحتيال",
      goToJourney: "الذهاب إلى الرحلة",
      notFound: "الدليل غير موجود. عد إلى فئات الاحتيال لاختيار دليل صالح.",
      needMoreTitle: "هل تحتاج إلى المزيد؟",
      needMoreText: "استشر دليل السكن لفهم الخطوات وتجنب الأخطاء.",
      needMoreCta: "عرض دليل السكن →",
      housingLabel: "السكن",
      pageEyebrow: "الاحتيال",
      pageTitle: "عمليات الاحتيال المتكررة: كيف تكتشفها في دقيقتين",
      pageSubtitle: "لست وحدك. الهدف: الفهم، التجنب، التصرف.",
      rulesTitle: "القواعد الذهبية",
      planTitle: "خطة عمل من 5 خطوات",
      planSubtitle: "بسيطة، سريعة، بدون ذعر.",
    categoriesTitle: "فئات الاحتيال",
    planLinkLabel: "خطة عمل من 5 خطوات",
    victimTitle: "أعتقد أنني ضحية: ماذا أفعل؟",
    victimSubtitle: "خطة عمل من 5 خطوات، بلا هلع.",
    victimPlanSteps: [
      "لا تشعر بالذعر وتوقف عن جميع المدفوعات فورًا.",
      "احتفظ بجميع الأدلة (لقطات الشاشة، الرسائل الإلكترونية، المحادثات، الإيصالات).",
      "اتصل ببنكك أو مؤسستك المالية لحظر المعاملات.",
      "أبلغ عن الاحتيال للشرطة (تقرير الشرطة) والمنظمة المناسبة (مثل CAFC للاحتيال المالي).",
      "استشر الموارد الرسمية لفهم خياراتك القانونية وحماية هويتك.",
    ],
  },
    housing: {
      rules: ["لا تدفع أبدًا قبل الزيارة.", "ارفض التحويلات المجهولة (العملات المشفرة، بطاقات الهدايا).", "تحقق من المؤجر والعنوان."],
      planSteps: ["اطلب زيارة حقيقية.", "تحقق من الإعلان (الصور، العنوان، السعر).", "وقع عقد إيجار رسميًا فقط بعد الزيارة."],
    },
    guides: {
      logement: {
        subtitle: "عمليات الاحتيال الشائعة المتعلقة بالإيجار.",
        scenario: [
          "إعلان جيد جدًا لدرجة يصعب تصديقها (سعر منخفض، صور مثالية).",
          "المؤجر في الخارج ولا يمكنه عرض العقار.",
          "طلب تحويل أموال قبل أي زيارة أو توقيع عقد إيجار.",
          "الضغط لاتخاذ قرار سريع والدفع فورًا.",
        ],
        redFlags: [
          'طلب وديعة أمان عالية أو "رسوم طلب" غير قابلة للاسترداد.',
          "التواصل فقط عبر البريد الإلكتروني أو الرسائل الفورية، وليس عبر الهاتف أبدًا.",
          "رفض توفير عنوان مادي أو عرض العقار.",
          "عقد إيجار يتضمن بنودًا غير عادية أو تعسفية.",
        ],
        actions: [
          "اطلب زيارة فعلية للعقار.",
          "تحقق من هوية المؤجر وشرعية الإعلان.",
          "لا تحول الأموال أبدًا قبل توقيع عقد إيجار قانوني واستلام المفاتيح.",
          "استخدم طرق دفع قابلة للتتبع (شيك، تحويل بنكي).",
        ],
        mantra: "لا زيارة = لا مال.",
      },
      emploi: {
        subtitle: "عمليات الاحتيال المتعلقة بعروض العمل والتوظيف.",
        scenario: [
          "عرض عمل غير مرغوب فيه براتب غير واقعي.",
          "طلب دفع مقابل معدات أو تدريب أو فحص سجل جنائي.",
          "مقابلة عمل عبر الرسائل الفورية بدون اتصال صوتي أو فيديو.",
          "الضغط لتقديم معلومات شخصية (رقم التأمين الاجتماعي، حساب بنكي) مبكرًا جدًا.",
        ],
        redFlags: [
          "أخطاء إملائية ونحوية في عرض العمل.",
          "عنوان بريد إلكتروني عام (Gmail, Outlook) للموظف.",
          "عملية توظيف سريعة بشكل غير طبيعي وبدون تحقق.",
          "طلب إعادة شراء معدات مع وعد بالتعويض.",
        ],
        actions: [
          "ابحث عن الشركة والموظف على LinkedIn أو موقعهم الرسمي.",
          "لا تدفع أبدًا مقابل وظيفة أو «رسوم طلب».",
          "لا تقدم رقم التأمين الاجتماعي أو تفاصيل الحساب البنكي قبل توقيع عقد.",
          "استخدم بنك الوظائف الرسمي للتحقق من شرعية العروض.",
        ],
        mantra: "الوظيفة الحقيقية لا تطلب رسومًا أبدًا.",
      },
      telephone: {
        subtitle: "عمليات الاحتيال المتعلقة بخطط الهاتف وخدمات الهاتف.",
        scenario: [
          "مكالمات غير مرغوب فيها تعد بخصومات مذهلة على الخطط.",
          "الضغط لتغيير المزود أو الاشتراك في خيارات غير مرغوب فيها.",
          "فواتير مفاجئة مع رسوم خفية أو خدمات غير مصرح بها.",
          "سرقة البيانات الشخصية تحت ستار «التحقق من الحساب».",
        ],
        redFlags: [
          "عروض جيدة جدًا لدرجة يصعب تصديقها، «اليوم فقط».",
          "طلب معلومات شخصية (كلمة المرور، رقم التأمين الاجتماعي) عبر الهاتف.",
          "ممثل عدواني أو يرفض تقديم معلومات واضحة.",
          "صعوبة إلغاء خدمة أو الحصول على استرداد.",
        ],
        actions: ["لا تشارك معلومات حساسة عبر الهاتف أبدًا.", "تحقق من العروض على المواقع الرسمية.", "اقرأ العقود بعناية.", "اتصل بـ CRTC أو المشغل في حالة النزاع."],
        mantra: "اقرأ كل شيء، خاصة الرسوم.",
      },
      banque: {
        subtitle: "عمليات الاحتيال المالية والمصرفية.",
        scenario: [
          "مكالمات أو رسائل بريد إلكتروني تدعي أنها من مصرفك تطلب معلومات سرية.",
          "الضغط لإجراء تحويل عاجل لـ «تأمين» حسابك.",
          "عروض قروض أو بطاقات ائتمان بدون فحص ائتماني (سهل جدًا).",
          "التصيد الاحتيالي: مواقع ويب مصرفية مزيفة لسرقة بيانات الاعتماد الخاصة بك.",
        ],
        redFlags: ["طلب رقم التعريف الشخصي الخاص بك، كلمة المرور، أو رموز التحقق.", "استعجال شديد، تهديدات.", "روابط مشبوهة في رسائل البريد الإلكتروني أو الرسائل النصية.", "أخطاء إملائية."],
        actions: ["لا تنقر أبدًا على الروابط المشبوهة.", "اتصل بمصرفك عبر الرقم الرسمي.", "تحقق من عنوان URL (https، قفل).", "أبلغ عن محاولات الاحتيال."],
        mantra: "مصرفك لا يطلب رقم التعريف الشخصي الخاص بك أبدًا.",
      },
      immigration: {
        subtitle: "عمليات الاحتيال المتعلقة بخدمات الهجرة والمستشارين المزيفين.",
        scenario: [
          "وعود بتأشيرات أو إقامة دائمة مضمونة، بدون شروط.",
          "طلب دفع مرتفع مقابل خدمات مجانية.",
          "وكلاء هجرة مزيفون يتصلون بك عبر البريد الإلكتروني أو الهاتف.",
          "طلب وثائق أصلية أو أموال نقدية.",
        ],
        redFlags: ["رسوم خفية.", "الضغط للتصرف بسرعة.", "مدفوعات غير رسمية (العملات المشفرة، بطاقات الهدايا).", "نقص الترخيص."],
        actions: ["تحقق من الشرعية على المواقع الرسمية.", "لا تدفع أبدًا مقابل خدمات مجانية.", "لا ترسل أصولًا أبدًا.", "احتفظ بجميع الأدلة."],
        neverDo: ["الدفع بالعملات المشفرة", "إعطاء وثائقك دون التحقق", "الاعتقاد بالضمانات"],
        mantra: "لا يمكن لأحد أن يضمن تأشيرة.",
        sources: [
          {
            label: "IRCC - الموقع الرسمي",
            href: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
          },
          { label: "مركز مكافحة الاحتيال", href: "https://www.antifraudcentre-centreantifraude.ca/" },
        ],
      },
      marketplace: {
        subtitle: "عمليات الاحتيال عند الشراء أو البيع على المنصات عبر الإنترنت.",
        scenario: [
          "بائع يطلب دفعًا مقدمًا عبر طريقة غير آمنة.",
          "مشتري يعرض دفع المزيد ويطلب استردادًا.",
          "الضغط لإنهاء المعاملة خارج المنصة.",
          "منتج غير مطابق للوصف بعد الدفع.",
        ],
        redFlags: ["ملف شخصي حديث.", "رفض الاجتماع.", "طلب رموز.", "رسائل عامة."],
        actions: ["التسليم اليدوي.", "مدفوعات آمنة إذا أمكن.", "احذر من العروض المغرية جدًا.", "أبلغ عن الملفات الشخصية المشبوهة."],
        mantra: "لا لقاء = لا شراء.",
      },
    },
  },

  guidePage: {
    subtitle: "5 إجراءات مصنفة حسب الأولوية لإرشادك حتى عندما يكون العبء الذهني مرتفعًا.",
    ctaLabel: "ابدأ برقم التأمين الاجتماعي",
    infoPill: "5 خطوات ذات أولوية",
    priorityLegend: "الأولوية المعروضة: 10 = فوري، 1 = للتخطيط قريبًا.",
    timelineTitle: "مسار سريع",
    timelineSubtitle: "افهم ترتيب التنفيذ دون قراءة جميع البطاقات بالتفصيل.",
    groups: [
      { title: "الحالة والصحة", description: "أمن حقك في العمل وتغطيتك الطبية قبل الباقي.", slugs: ["nas", "health"] },
      { title: "الاستقرار اليومي", description: "جهز أمورك المالية وهاتفك وسكنك.", slugs: ["bank", "phone", "housing"] },
    ],
  },

  newsletter: {
    title: "انضم إلى المجتمع",
    description: "بريد إلكتروني واحد شهريًا مع تذكيرات رسمية وتنبيهات مكافحة الاحتيال.",
    placeholder: "بريدك@example.com",
    cta: "أنا أريد الاشتراك",
    successTitle: "مرحبًا!",
    successBody: "ستتلقى مواردنا الرسمية قريبًا جدًا.",
    error: "غير ممكن في الوقت الحالي. حاول مرة أخرى لاحقًا.",
  },

  floatingCta: { label: "هل تحتاج مساعدة؟", href: "mailto:contact@marhabancanada.ca" },

  footer: {
    disclaimer: "تقدم مرحبا كندا توجيهاً عملياً ومعلومات عامة. نحن لا نقدم نصائح قانونية ولا نصائح في الهجرة. للأسئلة المتعلقة بالتأشيرات أو التصاريح أو الإقامة الدائمة أو الأهلية أو استراتيجية الهجرة، يرجى استشارة ممثل معتمد.",
    rights: "© 2025 مرحبًا كندا. جميع الحقوق محفوظة.",
  },

  shared: {
    sourceLabel: "المصدر",
    officialLink: "الرابط الرسمي",
    budgetLegend: "الإيجار + النقل + البقالة × معامل الأسرة.",
    disclaimer: "تقدم مرحبا كندا توجيهاً عملياً ومعلومات عامة. نحن لا نقدم نصائح قانونية ولا نصائح في الهجرة. للأسئلة المتعلقة بالتأشيرات أو التصاريح أو الإقامة الدائمة أو الأهلية أو استراتيجية الهجرة، يرجى استشارة ممثل معتمد.",
    radarTitle: "رادار مكافحة الاحتيال",
    radarBody: "تحقق دائمًا من المرسلين، ارفض المدفوعات ببطاقات الهدايا، واحتفظ بنسخ رقمية من أدلتك.",
    sourcesIntro: "تستند كل توصية إلى موقع حكومي أو شبه حكومي يمكن التحقق منه.",
    viewAllSteps: "عرض جميع الخطوات",
    sectionLabels: {
      what: "ما هو؟",
      why: "لماذا هو مهم؟",
      how: "كيف تفعل ذلك",
      avoid: "يجب تجنبه",
      sources: "المصادر الرسمية",
      docs: "الوثائق المطلوبة",
      smartTips: "من الجيد معرفة",
    },
    easyReadOn: "وضع القراءة السهلة",
    easyReadOff: "وضع عادي",
    ctas: {
      start: "ابدأ",
      startJourney: "ابدأ الرحلة",
      viewChecklist: "عرض قائمة التحقق",
      viewJourney: "عرض الرحلة",
      viewGuides: "عرض الأدلة",
      viewGuide: "عرض الدليل",
      findOffice: "العثور على مكتب",
      backToHome: "العودة إلى الرئيسية",
      continue: "متابعة",
      next: "التالي",
      previous: "السابق",
      download: "تحميل",
      share: "مشاركة",
      reset: "إعادة تعيين",
      search: "بحث",
      filter: "تصفية",
      all: "الكل",
    },
    commonPhrases: {
      whyItMatters: "لماذا هو مهم",
      whatYouNeed: "ما تحتاجه",
      stepByStep: "خطوة بخطوة",
      importantNote: "ملاحظة مهمة",
      warning: "تحذير",
      tip: "نصيحة",
      remember: "تذكر",
      avoid: "يجب تجنبه",
      sources: "المصادر",
      official: "رسمي",
      recommended: "موصى به",
      urgent: "عاجل",
      optional: "اختياري",
    },
    scamLabels: {
      scenario: "السيناريو",
      redFlags: "علامات الخطر",
      actions: "الإجراءات المتخذة",
      neverDo: "لا تفعل أبدًا",
      mantra: "الشعار",
      victimPlan: "خطة العمل إذا كنت ضحية",
    },
    nav: {
      home: "الرئيسية",
      checklist: "قائمة التحقق",
      parcours: "الرحلة",
      ressources: "الموارد",
      arnaques: "الاحتيال",
      about: "حول",
      contact: "اتصل بنا",
      legal: "قانوني",
      plus: "المزيد",
      switchToFr: "FR",
      switchToEn: "EN",
      switchToAr: "AR",
    },
  },

  howToUsePage: {
    title: "كيفية استخدام هذا الموقع",
    whatThisSiteDoes: {
      title: "ما يفعله هذا الموقع",
      items: [
        "يوفر معلومات موثوقة ومحققة لمساعدتك على الاستقرار في كندا.",
        "يقدم قائمة تحقق تفاعلية لتتبع خطواتك.",
        "يشرح الخطوات المعقدة بلغة بسيطة.",
        "يشارك المصادر الرسمية لكل معلومة.",
        "يسلط الضوء على الأخطاء الشائعة التي يجب تجنبها.",
      ],
    },
    whatThisSiteDoesNotDo: {
      title: "ما لا يفعله هذا الموقع",
      items: [
        "لا يحل محل النصائح القانونية أو نصائح الهجرة أو ممثل معتمد.",
        "لا يجمع أي بيانات شخصية (يتم حفظ تقدمك محلياً على جهازك).",
        "لا يضمن الحصول على وثائق أو خدمات (كل حالة فريدة).",
        "لا يقدم نصائح قانونية أو مالية شخصية.",
        "لا يساعدك في ملء النماذج أو حجز المواعيد.",
      ],
    },
    howToUseItStepByStep: {
      title: "كيفية استخدامه خطوة بخطوة",
      items: [
        "ابدأ بقائمة التحقق للحصول على نظرة عامة.",
        "انقر على كل خطوة للوصول إلى الدليل المفصل.",
        "ضع علامة على الخطوات التي أكملتها لتتبع تقدمك.",
        "استخدم روابط 'المصادر الرسمية' للتحقق من المعلومات.",
        "فعّل 'وضع القراءة السهلة' إذا كنت تفضل نصاً أكثر تباعداً.",
        "لا تتردد في مراجعة قسم 'الاحتيال' لتجنب الفخاخ.",
      ],
    },
  },

  contactPage: {
    title: "اتصل بنا",
    question: "هل لديك سؤال أو اقتراح؟",
    writeToUs: "راسلنا على",
    privacy: "لا يتم جمع أي بيانات شخصية عبر قناة الاتصال هذه.",
    responseTime: "نحاول الرد في أقرب وقت ممكن.",
    disclaimer:
      "خدمة معلومات ومرافقة. لا تحل محل الخدمات الحكومية. يجب دائمًا التحقق من الإجراءات الرسمية على المواقع الحكومية.",
    intro: "نحن هنا للمساعدة. اطرح سؤالك وسنرد بسرعة.",
    safetyNote: "لا تشارك أبدًا رقم التأمين الاجتماعي أو كلمات المرور أو المعلومات المصرفية عبر البريد الإلكتروني.",
    formName: "الاسم",
    formEmail: "البريد الإلكتروني",
    formMessage: "الرسالة",
    formTopic: "الموضوع",
    formTopicOptions: [
      { value: "general", label: "سؤال عام" },
      { value: "checklist", label: "قائمة التحقق" },
      { value: "scams", label: "الاحتيال" },
      { value: "technical", label: "مشكلة تقنية" },
      { value: "other", label: "أخرى" },
    ],
    formSubmit: "إرسال الرسالة",
    formSuccess: "تم إرسال الرسالة بنجاح. سنرد قريبًا.",
    formError: "حدث خطأ. يرجى المحاولة مرة أخرى لاحقًا.",
    secondaryLinks: {
      legal: "قانوني",
      scams: "الاحتيال",
      checklist: "قائمة التحقق",
    },
  },

  aboutPage: {
    title: "حول مرحبا كندا",
    intro: "خدمة دعم وتوجيه لتبسيط استقرارك في كندا.",
    mission: {
      title: "مهمتنا",
      content: "مرحبا كندا هي خدمة دعم وتوجيه للمهاجرين الجدد إلى كندا. نبسط الاستقرار من خلال توفير معلومات واضحة مبنية على مصادر رسمية.",
    },
    whatWeDo: {
      title: "ما تفعله المنصة",
      items: [
        "توفر معلومات موثوقة ومتحقق منها لمساعدتك على الاستقرار في كندا.",
        "تقدم قائمة تحقق تفاعلية لمتابعة خطواتك.",
        "تشرح الخطوات المعقدة بلغة بسيطة.",
        "تشارك المصادر الرسمية لكل معلومة.",
        "تسلط الضوء على الأخطاء الشائعة التي يجب تجنبها.",
      ],
    },
    whatWeDontDo: {
      title: "ما لا تفعله المنصة",
      items: [
        "لا تحل محل خدمات مكتب محاماة الهجرة.",
        "لا تجمع أي بيانات شخصية (يتم حفظ تقدمك محليًا على جهازك).",
        "لا تضمن الحصول على وثائق أو خدمات (كل حالة فريدة).",
        "لا تقدم نصائح قانونية أو مالية مخصصة.",
        "لا تساعدك في ملء النماذج أو حجز المواعيد.",
      ],
    },
    sources: {
      title: "كيف نختار المصادر",
      intro: "نختار فقط المصادر الرسمية والقابلة للتحقق. إليك بعض الأمثلة:",
      examples: [
        "خدمة كندا (رقم التأمين الاجتماعي، التصاريح، إلخ)",
        "IRCC (الهجرة واللاجئين والمواطنة الكندية)",
        "RAMQ, OHIP, MSP (بطاقات الصحة الإقليمية)",
        "ACFC (وكالة حماية المستهلك المالي في كندا)",
        "المواقع الحكومية الإقليمية والبلدية",
      ],
    },
    cta: {
      label: "ابدأ قائمة التحقق",
      href: "/checklist",
    },
  },

  legalPage: {
    title: "قانوني",
    editor: {
      title: "محرر الموقع",
      content: "مرحبا كندا هي خدمة معلومات ومرافقة مستقلة وغير حكومية. هذا الموقع منشور من قبل مرحبا كندا.",
    },
    usage: {
      title: "استخدام المعلومات",
      content: "المعلومات على هذا الموقع مقدمة لأغراض إعلامية فقط. لا تشكل نصيحة قانونية أو مالية أو مهنية. تحقق دائمًا من المعلومات على المواقع الحكومية الرسمية.",
    },
    responsibilities: {
      title: "المسؤوليات والحدود",
      content: "لا يمكن تحميل مرحبا كندا المسؤولية عن القرارات المتخذة بناءً على المعلومات المقدمة. كل حالة فريدة وتتطلب التحقق من السلطات المختصة. لا نضمن دقة أو اكتمال أو حداثة المعلومات.",
    },
    dataProtection: {
      title: "حماية البيانات",
      what: "لا نجمع أي بيانات شخصية عبر هذا الموقع. يتم حفظ تقدمك في قائمة التحقق فقط على جهازك (localStorage).",
      why: "لا يتم نقل أي بيانات إلى خوادمنا. كل شيء يبقى محليًا على متصفحك.",
      retention: "يمكن حذف البيانات المخزنة محليًا في أي وقت عبر زر 'إعادة تعيين' في قائمة التحقق.",
    },
    cookies: {
      title: "ملفات تعريف الارتباط والتخزين المحلي",
      content: "يستخدم هذا الموقع فقط التخزين المحلي لمتصفحك (localStorage) لحفظ تقدمك في قائمة التحقق. لا يتم استخدام ملفات تعريف الارتباط للتتبع. يمكنك حذف هذه البيانات في أي وقت عبر إعدادات متصفحك.",
    },
    intellectualProperty: {
      title: "الملكية الفكرية",
      content: "محتوى هذا الموقع (النصوص، الهيكل، التصميم) محمي بحقوق النشر. المصادر الرسمية المذكورة تبقى ملكية ناشريها (الحكومات، المنظمات العامة).",
    },
    contact: {
      title: "اتصال قانوني",
      email: "contact@marhabancanada.ca",
    },
  },
};
