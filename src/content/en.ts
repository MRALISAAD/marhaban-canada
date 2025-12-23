// English content is sparse and safely falls back to FR to avoid runtime crashes.
import { frContent, type LocaleContent } from './fr';
import { mergeWithFallback } from '@/lib/i18nFallback';

const enOverrides: Partial<LocaleContent> = {
  locale: 'en',
  dir: 'ltr',
  brand: 'Marhaban Canada',
  contactEmail: 'contact@marhabancanada.ca',
  hero: {
    title: 'Your arrival in Canada, one click at a time.',
    subtitle: 'Every step is explained simply with official sources.',
    ctaPrimary: 'See the checklist',
    ctaSecondary: 'Explore sources',
  },
  shared: {
    sourceLabel: 'Source',
    officialLink: 'Official link',
    budgetLegend: 'Indicative amounts, verify locally',
    disclaimer: 'Information only. Verify on official sites.',
    radarTitle: 'Smart tips',
    radarBody: 'Keep these in mind to avoid mistakes.',
    sourcesIntro: 'Verified sources',
    viewAllSteps: 'View all steps',
    sectionLabels: {
      what: 'What',
      why: 'Why',
      how: 'How',
      avoid: 'Avoid',
      sources: 'Sources',
      docs: 'Documents',
      smartTips: 'Smart tips',
    },
    easyReadOn: 'Easy read: on',
    easyReadOff: 'Easy read: off',
    ctas: frContent.shared.ctas,
    commonPhrases: frContent.shared.commonPhrases,
    scamLabels: frContent.shared.scamLabels,
    nav: {
      home: 'Home',
      checklist: 'Checklist',
      parcours: 'Journey',
      ressources: 'Resources',
      arnaques: 'Scams',
      about: 'About',
      contact: 'Contact',
      legal: 'Legal',
      plus: 'More',
      switchToFr: 'FR',
      switchToEn: 'EN',
      switchToAr: 'AR',
    },
    footer: {
      tagline: 'Settlement guidance, not a government site',
      contact: 'Contact',
      privacy: 'Privacy',
      legal: 'Legal',
    },
  },
  contactPage: {
    title: 'Contact',
    question: 'Do you have a question or suggestion?',
    writeToUs: 'Write to us at',
    privacy: 'No personal data is collected via this contact channel.',
    responseTime: 'We reply as soon as possible.',
    disclaimer:
      'Information and support service. Does not replace government services. Official procedures must always be validated on government websites.',
    intro: "We're here to help. Ask your question and we'll reply quickly.",
    safetyNote: 'Never share your SIN, passwords, or banking information by email.',
    formName: 'Name',
    formEmail: 'Email',
    formMessage: 'Message',
    formTopic: 'Topic',
    formTopicOptions: [
      { value: 'general', label: 'General question' },
      { value: 'checklist', label: 'Checklist' },
      { value: 'scams', label: 'Scams' },
      { value: 'technical', label: 'Technical issue' },
      { value: 'other', label: 'Other' },
    ],
    formSubmit: 'Send message',
    formSuccess: "Message sent successfully. We'll reply soon.",
    formError: 'An error occurred. Please try again later.',
    secondaryLinks: {
      legal: 'Legal',
      scams: 'Scams',
      checklist: 'Checklist',
    },
  },
  footer: {
    disclaimer:
      'This site provides a settlement guidance and support service. It does not replace official government services.',
    rights: 'All rights reserved.',
    mission: 'Support and orientation service for newcomers to Canada.',
    quickGuidesTitle: 'Quick guides',
    sources: 'Sources',
    copyright: `© ${new Date().getFullYear()} Marhaban Canada. All rights reserved.`,
  },
};

export const enContent: LocaleContent = mergeWithFallback<LocaleContent>(enOverrides, frContent);

