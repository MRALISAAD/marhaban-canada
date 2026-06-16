import type { Step } from './guideSteps';

export const guideStepsEn: Record<string, Step> = {
  nas: {
    id: 'nas',
    title: 'Social Insurance Number (SIN)',
    phase: 'Semaine 1',
    summary:
      'Your SIN connects you to taxes, employment, and federal programs. Without it, no employer can legally pay you.',
    motto: 'No SIN, no legal work.',
    cta: {
      label: 'Find a Service Canada office',
      href: 'https://www.canada.ca/en/employment-social-development/services/social-insurance-number.html',
    },
    what:
      'The SIN is a unique number issued by Service Canada that proves you are authorized to work or receive certain benefits.',
    why: [
      'Work legally in Canada.',
      'Be paid correctly by your employer.',
      'Access certain federal services and tax credits.',
    ],
    how: [
      'Check the useful proofs linked to your general profile.',
      'Gather the required practical settlement documents (ID, useful proof, proof of address).',
      'Find a nearby Service Canada Centre.',
      'Go in person if possible (often faster than online).',
      'Follow the instructions and verify all information before leaving.',
      'Store your SIN safely and never share it in messages or on social media.',
    ],
    docs: [
      'Passport',
      'Useful proof linked to your general profile',
      'Proof of Canadian address (if required)',
    ],
    avoid: [
      'Paying someone to “get the SIN for you” (it is free).',
      'Sharing your SIN by phone, SMS, email, or messaging apps.',
      'Filling in non‑official forms on suspicious websites.',
      'Believing paid services that promise a faster SIN.',
      'Giving your SIN to anyone “just to check” your identity.',
    ],
    smartTips: [
      'Go early in the morning to reduce waiting time.',
      'Keep a secure copy of your documents, but never store your SIN in plain text.',
      'Only provide your SIN when it is strictly necessary (employer, bank, authorities).',
      'If someone pressures you to give your SIN, stop and verify their identity.',
      'Note the date of your application and keep it with your important papers.',
    ],
  },

  bank: {
    id: 'bank',
    title: 'Bank — Account and cards',
    phase: 'Semaine 1',
    summary:
      'Opening a local bank account makes it easier to receive your salary, pay rent, and access newcomer banking products.',
    motto: 'Start simple. No unnecessary fees at the beginning.',
    cta: {
      label: 'Compare newcomer bank offers',
      href: 'https://www.canada.ca/en/financial-consumer-agency/services/bank-accounts/opening.html',
    },
    what:
      'A Canadian chequing account and a basic credit card let you receive income, pay expenses, and start building your credit score.',
    why: [
      'Receive your salary safely.',
      'Pay rent and bills without cash.',
      'Start building a positive credit history.',
    ],
    how: [
      'Compare newcomer offers (monthly fees, free transactions, welcome bonuses).',
      'Choose a bank that is convenient for you (branch, ATMs, mobile app).',
      'Book an appointment if possible.',
      'Bring your ID, general profile proof, and proof of address (if available).',
      'Open a chequing account and get a debit card for daily spending.',
      'If appropriate, ask for a small, reasonable credit card limit.',
    ],
    docs: ['Passport', 'Status document', 'Local address (if possible)'],
    avoid: [
      'Packages with hidden fees or services you do not understand.',
      'Unnecessary insurance products sold at the counter.',
      'A very high credit limit from day one.',
      'Signing documents without reading the conditions.',
      'Paying credit card bills late.',
    ],
    smartTips: [
      'Clearly ask for a “newcomer package” or low‑fee account.',
      'Aim for $0 monthly fees during your first months if possible.',
      'Start with a modest credit limit and pay on time every month.',
      'Keep your credit utilization low (ideally under ~30%).',
      'Use the bank’s official app to monitor transactions and alerts.',
    ],
  },

  phone: {
    id: 'phone',
    title: 'Phone — Plan and SIM card',
    phase: 'Semaine 1',
    summary:
      'A Canadian number makes it easier to complete procedures, receive calls from employers, and avoid roaming fees.',
    motto: 'Start flexible. Avoid long contracts at first.',
    cta: {
      label: 'Compare mobile plans near me',
      href: 'https://crtc.gc.ca/eng/phone/mobile.htm',
    },
    what:
      'You buy a Canadian SIM / eSIM and choose a plan adapted to your first month (prepaid or monthly).',
    why: [
      'Be reachable quickly for job opportunities and appointments.',
      'Validate official accounts (banks, government, online services).',
      'Avoid expensive roaming charges on your foreign number.',
    ],
    how: [
      'Compare 2–3 plans (price, data, calls, coverage).',
      'Check network coverage in your neighbourhood.',
      'Choose a no‑commitment or short‑term plan at the beginning.',
      'Bring ID if requested to activate the line.',
      'Buy a SIM or eSIM from an official kiosk or store.',
      'Activate the line and test calls, SMS, and data.',
      'Keep the receipt or contract for your records.',
    ],
    docs: ['ID document', 'Local address (if requested)', 'Bank card or cash'],
    avoid: [
      'Signing a 24‑month contract too early.',
      'Taking a “free” phone with a very expensive plan.',
      'Accepting activation fees you do not understand.',
      'Ignoring data limits and overage fees.',
      'Keeping roaming enabled on your old number without need.',
    ],
    smartTips: [
      'Start simple, then adjust after 2–3 weeks once you know your usage.',
      'Ask for the total monthly cost, taxes included.',
      'Test coverage where you live, study, and work.',
      'Ask if cancellation is free (no long‑term commitment).',
      'Remember that you can usually port your number later if you change providers.',
    ],
  },

  housing: {
    id: 'housing',
    title: 'Housing — Search and sign',
    phase: 'Mois 1',
    summary:
      'Find stable housing without unpleasant surprises by understanding leases and your rights.',
    motto: 'No visit, no money.',
    cta: {
      label: 'Understand rental rules',
      href: 'https://www.cmhc-schl.gc.ca/en/consumers/renting-a-home',
    },
    what:
      'The tenant file gathers your proof of income, references, and legal deposit, according to the rules in your province.',
    why: [
      'Have a stable address for your daily life and procedures.',
      'Reduce the risk of common housing scams.',
      'Understand your rights and obligations under local law.',
    ],
    how: [
      'Calculate your budget (rent + utilities + transport).',
      'Choose realistic neighbourhoods for your work/study and daily life.',
      'Schedule real visits (in person or video) and check the landlord’s identity.',
      'Read the lease carefully and ask all your questions.',
      'Request a receipt for every payment (deposit, first month).',
      'Sign only when everything is clear and written down.',
    ],
    docs: ['ID document', 'Proof of income or savings', 'References (if possible)'],
    avoid: [
      'Sending money before a real visit.',
      'Paying in cash without any receipt.',
      'Signing a lease without reading it fully.',
      'Believing an offer that looks “too perfect”.',
      'Accepting pressure to “pay now or lose the apartment”.',
    ],
    smartTips: [
      'Consider temporary housing first if you are in a rush.',
      'Ask what is included (heating, hot water, electricity, internet).',
      'Take photos during visits, especially of damages.',
      'Keep written records of all conversations and agreements.',
      'Check provincial rules on deposits, notice periods, and rent increases.',
    ],
  },

  license: {
    id: 'license',
    title: "Driver's License — Drive legally",
    phase: 'Mois 1',
    summary: 'Check if your license is recognized and how to get a local one.',
    motto: 'Each province has its own rules.',
    cta: {
      label: 'Check the rules in my province',
      href: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/new-immigrants/prepare-life-canada/driving.html',
    },
    what: "Your driver's license depends on your province. Conversion and tests vary by country of origin.",
    why: ['Drive legally.', 'Avoid fines.', 'Keep valid insurance.'],
    how: [
      'Check how long you can drive with your current license.',
      'See if your country has an agreement with your province.',
      'Prepare a translation if required.',
      'Book an appointment for evaluation or tests.',
      'Pass the written test if required.',
      'Pass the road test if required.',
      'Get your local license and keep your proof.',
    ],
    docs: ['Current driving document', 'ID document', 'General profile proof', 'Driving record (if required)'],
    avoid: [
      'Driving without valid insurance.',
      'Ignoring conversion deadlines.',
      'Paying for unofficial "guaranteed" services.',
      'Forgetting required documents at your appointment.',
    ],
    smartTips: [
      'Ask for the official document list.',
      'Book early: appointments can have long waits.',
      'Learn local road signs (differences).',
      'Keep a copy of your confirmations.',
      'Check insurance rules linked to your license.',
    ],
  },

  health: {
    id: 'health',
    title: 'Health — Public insurance',
    phase: 'Mois 1',
    summary:
      'Activate your provincial health coverage as early as possible to avoid high emergency costs.',
    motto: 'Apply as soon as you are eligible.',
    cta: {
      label: 'Apply for health coverage',
      href: 'https://www.canada.ca/en/public-health/services/health-care-system.html',
    },
    what:
      'The provincial health card proves your eligibility for the public system (RAMQ, OHIP, MSP, etc.). It often has a waiting period.',
    why: [
      'Avoid very high costs in case of an emergency.',
      'Access essential medical services (doctor, hospital).',
      'Reduce stress if a health issue happens during your first months.',
    ],
    how: [
      'Check eligibility rules and waiting periods in your province.',
      'Gather your practical settlement documents (general profile, ID, proof of address).',
      'Submit the application online or in person, depending on the province.',
      'Note the estimated start date of coverage.',
      'Consider temporary private insurance if there is a waiting period.',
      'Keep a copy of your application and confirmations.',
    ],
    docs: ['ID document', 'Status document', 'Proof of local address'],
    avoid: [
      'Waiting too long before applying.',
      'Confusing travel insurance with provincial health insurance.',
      'Ignoring the waiting period and assuming you are covered.',
      'Throwing away confirmation letters or emails.',
    ],
    smartTips: [
      'Ask clearly if a waiting period applies and how long it is.',
      'Keep both digital and paper copies of your documents.',
      'Identify a clinic or health centre near your home.',
      'Check what is covered and what is not (dental, vision, medication).',
      'Store emergency numbers and clinic contacts in your phone.',
    ],
  },

  taxes: {
    id: 'taxes',
    title: 'Taxes — Filing correctly',
    phase: 'En continu',
    summary: 'Organize your papers to avoid tax season stress.',
    motto: 'Keep everything. Declare everything.',
    cta: {
      label: 'Understand taxes in Canada',
      href: 'https://www.canada.ca/en/services/taxes.html',
    },
    what: 'Tax returns are filed annually. They also help you access certain credits and benefits.',
    why: ['Avoid penalties.', 'Get the credits you deserve.', 'Keep a clear record.'],
    how: [
      'Keep your documents (income, rent, receipts).',
      'Note important deadlines.',
      'Create an official account if useful.',
      'Choose certified software or a reliable preparer.',
      'Check the information before submitting.',
      'Keep a copy of your return.',
    ],
    docs: ['Income statements (T4 and others)', 'Useful receipts (depending on your situation)', 'Bank info for deposits'],
    avoid: [
      'Throwing away important documents.',
      'Filing late without a plan.',
      'Using an unreliable service.',
      'Forgetting income or information.',
      'Ignoring possible provincial credits.',
    ],
    smartTips: [
      'Organize your documents each month.',
      'Ask for free help if available near you.',
      'Keep a digital and paper copy.',
      'Note deadlines in your calendar.',
      'If in doubt, check an official source.',
    ],
  },

  networking: {
    id: 'networking',
    title: 'Networking — Building contacts',
    phase: 'En continu',
    summary: 'Build a useful network for opportunities and advice.',
    motto: 'In Canada, your network opens doors.',
    cta: {
      label: 'Start my professional network',
      href: 'https://www.jobbank.gc.ca/',
    },
    what: 'Networking is creating useful contacts. It helps understand the market and find opportunities.',
    why: ['Access unpublished offers.', 'Understand the local market.', 'Get recommended more easily.'],
    how: [
      'Update your profile (CV + LinkedIn).',
      'Choose a field and 2–3 types of contacts.',
      'Join groups and communities (online and local).',
      'Attend simple events (even 1 hour).',
      'Ask for "informational interviews" (15–20 min).',
      'Thank and follow up briefly.',
    ],
    docs: ['Updated CV', 'LinkedIn profile', 'Clear list of your skills'],
    avoid: [
      'Sending messages that are too long.',
      'Asking for a job in your first message.',
      'Never following up.',
      'Ignoring free events.',
    ],
    smartTips: [
      'Prepare a 20-second pitch.',
      'Ask a simple, precise question.',
      'Note names, roles, and dates.',
      'Thank after every help.',
      'Be consistent: 2 actions per week is good.',
    ],
  },

  integration: {
    id: 'integration',
    title: 'Integration — Local services',
    phase: 'En continu',
    summary:
      'Use local support services to accelerate your settlement and avoid common mistakes.',
    motto: 'Do not do everything alone. Use local support.',
    cta: {
      label: 'Find a settlement agency',
      href: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/new-immigrants.html',
    },
    what:
      'Integration services offer workshops, one‑on‑one meetings, and referrals to local resources (employment, housing, language, community).',
    why: [
      'Save time by avoiding common mistakes.',
      'Understand how the system works in your province and city.',
      'Meet other newcomers and build a support network.',
    ],
    how: [
      'Search for a settlement agency near your home.',
      'Book an intake / orientation appointment.',
      'Explain your situation and priorities simply.',
      'Ask for a short plan with three concrete priorities.',
      'Attend at least one useful workshop (CV, housing, rights, etc.).',
      'Keep contact details and follow up if your situation changes.',
    ],
    docs: ['ID document', 'Status document', 'Contact details (phone, email)'],
    avoid: [
      'Trying to handle everything alone without asking for help.',
      'Ignoring free services available in your region.',
      'Being afraid to ask questions or say you do not understand.',
      'Not following up after your first appointment.',
    ],
    smartTips: [
      'Write down your goals before the first appointment.',
      'Ask for a written list of priority actions.',
      'Be honest about your constraints (time, childcare, money).',
      'Store important information and contacts in one place.',
      'Come back if your situation changes (new job, move, family arriving, etc.).',
    ],
  },
};


