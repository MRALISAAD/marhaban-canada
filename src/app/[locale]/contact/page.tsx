import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, getHtmlAttrs } from '@/i18n/locales';
import { getLocaleContent } from '@/lib/getLocaleContent';
import { bookingPath } from '@/lib/routes';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionBlock } from '@/components/ui/SectionBlock';
import { Callout } from '@/components/ui/Callout';
import LocalizedLink from '@/components/LocalizedLink';
import { ContactForm } from '@/components/ContactForm';
import { CalendarCheck, Download, SearchCheck, Send } from 'lucide-react';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) {
    return {
      title: 'Contact | Marhaban Canada',
    };
  }
  const locale = localeParam as Locale;
  const content = getLocaleContent(locale);

  return {
    title: `${content.contactPage?.title || 'Contact'} | Marhaban Canada`,
    description: content.contactPage?.intro || content.contactPage?.title || 'Contact',
    openGraph: {
      title: content.contactPage?.title || 'Contact',
      description: content.contactPage?.intro || content.contactPage?.title || 'Contact',
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const content = getLocaleContent(locale);
  const { dir } = getHtmlAttrs(locale);
  const contactPage = content.contactPage;
  const contactEmail = content.contactEmail || 'contact@marhabancanada.ca';

  const bookingTexts = {
    fr: {
      eyebrow: 'Service d’accompagnement',
      title: 'Réserver un appel',
      intro:
        'Choisis ton besoin, sélectionne une offre, puis envoie ta demande. Tu recevras une confirmation avant l’appel.',
      primaryCta: 'Réserver un appel',
      scamCta: 'Vérifier une situation suspecte',
      checklistCta: 'Télécharger la checklist',
      offersTitle: 'Offres d’orientation pratique',
      offersIntro: 'Des formats simples pour une clarification de ta situation, sans promesse de résultat.',
      offers: [
        {
          name: 'Appel Orientation bêta',
          duration: '45 min',
          price: '10 $ · 10 premiers appels',
          description: 'Clarification de ta situation, priorités pratiques, étapes recommandées, ressources utiles et résumé après l’appel.',
        },
        {
          name: 'Appel Orientation',
          duration: '45 min',
          price: 'Sur demande',
          description: 'Pour comprendre quoi faire, dans quel ordre et avec quelles ressources utiles.',
        },
        {
          name: 'Pack Installation',
          duration: '45 min + checklist personnalisée',
          price: '69 $',
          description: 'Pour préparer ton arrivée ou organiser ta première semaine au Canada.',
        },
        {
          name: 'Pack Complet',
          duration: '60 min + résumé détaillé',
          price: '99 $',
          description: 'Pour les personnes qui veulent un plan plus structuré avec priorités et erreurs à éviter.',
        },
      ],
      scopeTitle: 'Ce qu’on fait / ce qu’on ne fait pas',
      doesTitle: 'Ce qu’on fait',
      does: ['Orientation pratique', 'Priorités claires', 'Ressources utiles', 'Checklist et résumé selon l’offre', 'Erreurs à éviter'],
      doesNotTitle: 'Ce qu’on ne fait pas',
      doesNot: ['Conseils juridiques', 'Conseils en immigration', 'Garantie de logement', 'Garantie d’emploi', 'Démarches officielles à ta place'],
      bookingTitle: 'Parcours de réservation',
      bookingSteps: ['Choisir son besoin', 'Choisir une offre', 'Envoyer sa demande', 'Recevoir confirmation'],
      formTitle: 'Envoyer une demande',
      contactTitle: contactPage?.question || 'Une question ?',
      writeToUs: contactPage?.writeToUs || 'Écrivez-nous à',
      responseTime: contactPage?.responseTime || 'Réponse habituelle sous 24 à 48 h ouvrables.',
      privacy: contactPage?.privacy || 'Tes informations servent uniquement à répondre à ta demande.',
      safetyNote:
        contactPage?.safetyNote || 'Ne partage jamais ton NAS, tes mots de passe, tes codes bancaires ou des documents pratiques d’installation sensibles dans ce formulaire.',
      disclaimer:
        contactPage?.disclaimer ||
        'Marhaban Canada offre de l’orientation pratique et de l’information générale. Nous ne fournissons pas de conseils juridiques ni de conseils en immigration. Pour les questions liées aux visas, permis, résidence permanente, admissibilité ou stratégie d’immigration, veuillez consulter un représentant autorisé.',
      usefulLinks: 'Liens utiles',
      form: {
        formName: 'Nom',
        formEmail: 'Email',
        formTopic: 'Sujet',
        formTopicOptions: [
          { value: 'booking', label: 'Réserver un appel' },
          { value: 'scam', label: 'Situation suspecte' },
          { value: 'general', label: 'Question générale' },
        ],
        formNeed: 'Besoin principal',
        formNeedOptions: [
          { value: 'arrival', label: 'Préparer mon arrivée' },
          { value: 'settlement', label: 'M’installer au Canada' },
          { value: 'housing', label: 'Logement' },
          { value: 'scam', label: 'Situation suspecte' },
        ],
        formOffer: 'Offre souhaitée',
        formOfferOptions: [
          { value: 'beta', label: 'Appel Orientation bêta — 45 min — 10 $' },
          { value: 'orientation', label: 'Appel Orientation — 45 min — sur demande' },
          { value: 'installation', label: 'Pack Installation — 45 min + checklist — 69 $' },
          { value: 'complete', label: 'Pack Complet — 60 min + résumé détaillé — 99 $' },
        ],
        formMessage: 'Message',
        formSubmit: 'Envoyer ma demande',
        formSuccess: 'Demande envoyée. Tu recevras une confirmation avant l’appel.',
        formError: 'Une erreur est survenue. Réessaie ou écris-nous par email.',
      },
    },
    en: {
      eyebrow: 'Support service',
      title: 'Book a call',
      intro:
        'Choose your need, select an offer, then send your request. You will receive confirmation before the call.',
      primaryCta: 'Book a call',
      scamCta: 'Check a suspicious situation',
      checklistCta: 'Download the checklist',
      offersTitle: 'Practical orientation offers',
      offersIntro: 'Simple formats for clarification of your situation, without promising outcomes.',
      offers: [
        {
          name: 'Beta Orientation Call',
          duration: '45 min',
          price: '$10 · first 10 calls',
          description: 'Clarification of your situation, practical priorities, recommended steps, useful resources, and summary after the call.',
        },
        {
          name: 'Orientation Call',
          duration: '45 min',
          price: 'Upon request',
          description: 'Understand what to do, in what order, and with which useful resources.',
        },
        {
          name: 'Settlement Pack',
          duration: '45 min + personalized checklist',
          price: '$69',
          description: 'Prepare your arrival or organize your first week in Canada.',
        },
        {
          name: 'Complete Pack',
          duration: '60 min + detailed summary',
          price: '$99',
          description: 'For people who want a more structured plan with priorities and mistakes to avoid.',
        },
      ],
      scopeTitle: 'What we do / what we do not do',
      doesTitle: 'What we do',
      does: ['Practical orientation', 'Clear priorities', 'Useful resources', 'Checklist and summary depending on the offer', 'Mistakes to avoid'],
      doesNotTitle: 'What we do not do',
      doesNot: ['Legal advice', 'Immigration advice', 'Housing guarantee', 'Job guarantee', 'Official steps on your behalf'],
      bookingTitle: 'Booking path',
      bookingSteps: ['Choose your need', 'Choose an offer', 'Send your request', 'Receive confirmation'],
      formTitle: 'Send a request',
      contactTitle: contactPage?.question || 'Have a question?',
      writeToUs: contactPage?.writeToUs || 'Write to us at',
      responseTime: contactPage?.responseTime || 'Usual response within 24 to 48 business hours.',
      privacy: contactPage?.privacy || 'Your information is used only to answer your request.',
      safetyNote:
        contactPage?.safetyNote || 'Never share your SIN, passwords, banking codes, or sensitive practical settlement documents in this form.',
      disclaimer:
        contactPage?.disclaimer ||
        'Marhaban Canada offers practical orientation and general information. We do not provide legal advice or immigration advice. For questions related to visas, permits, permanent residence, admissibility, or immigration strategy, please consult an authorized representative.',
      usefulLinks: 'Useful links',
      form: {
        formName: 'Name',
        formEmail: 'Email',
        formTopic: 'Topic',
        formTopicOptions: [
          { value: 'booking', label: 'Book a call' },
          { value: 'scam', label: 'Suspicious situation' },
          { value: 'general', label: 'General question' },
        ],
        formNeed: 'Main need',
        formNeedOptions: [
          { value: 'arrival', label: 'Prepare my arrival' },
          { value: 'settlement', label: 'Settle in Canada' },
          { value: 'housing', label: 'Housing' },
          { value: 'scam', label: 'Suspicious situation' },
        ],
        formOffer: 'Preferred offer',
        formOfferOptions: [
          { value: 'beta', label: 'Beta Orientation Call — 45 min — $10' },
          { value: 'orientation', label: 'Orientation Call — 45 min — upon request' },
          { value: 'installation', label: 'Settlement Pack — 45 min + checklist — $69' },
          { value: 'complete', label: 'Complete Pack — 60 min + detailed summary — $99' },
        ],
        formMessage: 'Message',
        formSubmit: 'Send my request',
        formSuccess: 'Request sent. You will receive confirmation before the call.',
        formError: 'Something went wrong. Try again or email us directly.',
      },
    },
    ar: {
      eyebrow: 'خدمة مرافقة',
      title: 'احجز مكالمة',
      intro: 'اختر حاجتك، ثم العرض المناسب، وأرسل طلبك. ستصلك رسالة تأكيد قبل المكالمة.',
      primaryCta: 'احجز مكالمة',
      scamCta: 'تحقق من وضع مشبوه',
      checklistCta: 'تحميل قائمة التحقق',
      offersTitle: 'عروض التوجيه العملي',
      offersIntro: 'صيغ بسيطة لتوضيح وضعك العام بدون وعد بنتيجة مضمونة.',
      offers: [
        {
          name: 'مكالمة توجيه بيتا',
          duration: '45 دقيقة',
          price: '10 $ · أول 10 مكالمات',
          description: 'توضيح وضعك العام، أولويات عملية، خطوات موصى بها، موارد مفيدة وملخص بعد المكالمة.',
        },
        {
          name: 'مكالمة توجيه',
          duration: '45 دقيقة',
          price: 'حسب الطلب',
          description: 'لفهم ماذا تفعل، وبأي ترتيب، ومع أي موارد مفيدة.',
        },
        {
          name: 'حزمة الاستقرار',
          duration: '45 دقيقة + قائمة تحقق مخصصة',
          price: '69 $',
          description: 'لتحضير وصولك أو تنظيم أسبوعك الأول في كندا.',
        },
        {
          name: 'الحزمة الكاملة',
          duration: '60 دقيقة + ملخص مفصل',
          price: '99 $',
          description: 'للأشخاص الذين يريدون خطة أكثر تنظيماً مع أولويات وأخطاء يجب تجنبها.',
        },
      ],
      scopeTitle: 'ما الذي نفعله / وما الذي لا نفعله',
      doesTitle: 'ما نفعله',
      does: ['توجيه عملي', 'أولويات واضحة', 'موارد مفيدة', 'قائمة تحقق وملخص حسب العرض', 'أخطاء يجب تجنبها'],
      doesNotTitle: 'ما لا نفعله',
      doesNot: ['نصائح قانونية', 'نصائح في الهجرة', 'ضمان سكن', 'ضمان عمل', 'إجراءات رسمية نيابة عنك'],
      bookingTitle: 'مسار الحجز',
      bookingSteps: ['اختر حاجتك', 'اختر عرضاً', 'أرسل طلبك', 'استلم التأكيد'],
      formTitle: 'إرسال طلب',
      contactTitle: contactPage?.question || 'هل لديك سؤال؟',
      writeToUs: contactPage?.writeToUs || 'راسلنا على',
      responseTime: contactPage?.responseTime || 'الرد عادة خلال 24 إلى 48 ساعة عمل.',
      privacy: contactPage?.privacy || 'تُستخدم معلوماتك فقط للرد على طلبك.',
      safetyNote:
        contactPage?.safetyNote || 'لا تشارك رقم التأمين الاجتماعي أو كلمات المرور أو رموز البنك أو وثائق عملية للاستقرار حساسة في هذا النموذج.',
      disclaimer:
        contactPage?.disclaimer ||
        'تقدم مرحبا كندا توجيهاً عملياً ومعلومات عامة. نحن لا نقدم نصائح قانونية ولا نصائح في الهجرة. للأسئلة المتعلقة بالتأشيرات أو التصاريح أو الإقامة الدائمة أو الأهلية أو استراتيجية الهجرة، يرجى استشارة ممثل معتمد.',
      usefulLinks: 'روابط مفيدة',
      form: {
        formName: 'الاسم',
        formEmail: 'البريد الإلكتروني',
        formTopic: 'الموضوع',
        formTopicOptions: [
          { value: 'booking', label: 'حجز مكالمة' },
          { value: 'scam', label: 'وضع مشبوه' },
          { value: 'general', label: 'سؤال عام' },
        ],
        formNeed: 'الحاجة الرئيسية',
        formNeedOptions: [
          { value: 'arrival', label: 'التحضير للوصول' },
          { value: 'settlement', label: 'الاستقرار في كندا' },
          { value: 'housing', label: 'السكن' },
          { value: 'scam', label: 'وضع مشبوه' },
        ],
        formOffer: 'العرض المطلوب',
        formOfferOptions: [
          { value: 'beta', label: 'مكالمة توجيه بيتا — 45 دقيقة — 10 $' },
          { value: 'orientation', label: 'مكالمة توجيه — 45 دقيقة — حسب الطلب' },
          { value: 'installation', label: 'حزمة الاستقرار — 45 دقيقة + قائمة تحقق — 69 $' },
          { value: 'complete', label: 'الحزمة الكاملة — 60 دقيقة + ملخص مفصل — 99 $' },
        ],
        formMessage: 'الرسالة',
        formSubmit: 'إرسال الطلب',
        formSuccess: 'تم إرسال الطلب. ستصلك رسالة تأكيد قبل المكالمة.',
        formError: 'حدث خطأ. حاول مرة أخرى أو راسلنا عبر البريد الإلكتروني.',
      },
    },
  } as const;

  const labels = bookingTexts[locale] ?? bookingTexts.fr;

  return (
    <main className="warm-page px-4 py-12" dir={dir} lang={locale}>
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <PageHeader
          eyebrow={labels.eyebrow}
          title={labels.title}
          intro={labels.intro}
          dir={dir}
          actions={
            <>
              <LocalizedLink
                href={bookingPath(locale)}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-marhaban-ink px-4 py-2 text-sm font-semibold text-white shadow-warm-sm transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2"
              >
                {labels.primaryCta}
                <CalendarCheck className="h-4 w-4" />
              </LocalizedLink>
              <LocalizedLink
                href="/arnaques"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-stone-300 bg-white/80 px-4 py-2 text-sm font-semibold text-marhaban-ink transition hover:bg-marhaban-mint/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-2"
              >
                {labels.scamCta}
                <SearchCheck className="h-4 w-4" />
              </LocalizedLink>
              <a
                href="/checklist.pdf"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-stone-300 bg-white/80 px-4 py-2 text-sm font-semibold text-marhaban-ink transition hover:bg-marhaban-mint/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-2"
              >
                {labels.checklistCta}
                <Download className="h-4 w-4" />
              </a>
            </>
          }
        />

        <section className="rounded-3xl border border-stone-200/80 bg-white/90 p-6 shadow-warm-sm sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-marhaban-clay">
                {labels.offersTitle}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-marhaban-ink">{labels.offersTitle}</h2>
              <p className="mt-2 text-sm text-slate-700">{labels.offersIntro}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {labels.offers.map((offer) => (
              <article
                key={offer.name}
                className="flex h-full flex-col rounded-[1.75rem] border border-stone-200/80 bg-marhaban-cream/70 p-5"
              >
                <h3 className="text-lg font-semibold text-marhaban-ink">{offer.name}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-marhaban-leaf">
                    {offer.duration}
                  </span>
                  <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-marhaban-ink">
                    {offer.price}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">{offer.description}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <SectionBlock title={labels.scopeTitle} icon="ShieldCheck" dir={dir}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-marhaban-leaf/15 bg-marhaban-cream/70 p-4">
                <h3 className="font-semibold text-marhaban-ink">{labels.doesTitle}</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {labels.does.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <h3 className="font-semibold text-amber-950">{labels.doesNotTitle}</h3>
                <ul className="mt-3 space-y-2 text-sm text-amber-900">
                  {labels.doesNot.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionBlock>

          <SectionBlock title={labels.bookingTitle} icon="CalendarCheck" dir={dir}>
            <ol className="grid gap-3">
              {labels.bookingSteps.map((step, index) => (
                <li key={step} className="flex items-start gap-3 rounded-2xl border border-marhaban-leaf/15 bg-marhaban-cream/70 p-4">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-marhaban-mint text-sm font-semibold text-marhaban-leaf">
                    {index + 1}
                  </span>
                  <span className="pt-0.5 text-sm font-medium text-slate-800">{step}</span>
                </li>
              ))}
            </ol>
          </SectionBlock>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <SectionBlock id="booking-form" title={labels.formTitle} icon="Mail" dir={dir}>
            <ContactForm labels={labels.form} dir={dir} />
          </SectionBlock>

          <div className="space-y-6">
            <SectionBlock title={labels.contactTitle} icon="Mail" dir={dir}>
              <div className="space-y-3">
                <p className="text-sm text-slate-700">
                  {labels.writeToUs}{' '}
                  <a
                    href={`mailto:${contactEmail}`}
                    className="font-semibold text-marhaban-ink underline underline-offset-2 hover:text-marhaban-leaf"
                  >
                    {contactEmail}
                  </a>
                </p>
                <p className="text-xs text-slate-600">{labels.responseTime}</p>
                <p className="text-xs text-slate-600">{labels.privacy}</p>
              </div>
            </SectionBlock>

            <SectionBlock title={labels.usefulLinks} icon="Link" dir={dir}>
              <div className="space-y-2">
                <LocalizedLink
                  href="/arnaques"
                  className="block text-sm text-slate-700 underline underline-offset-2 hover:text-marhaban-ink"
                >
                  {labels.scamCta}
                </LocalizedLink>
                <a
                  href="/checklist.pdf"
                  className="block text-sm text-slate-700 underline underline-offset-2 hover:text-marhaban-ink"
                >
                  {labels.checklistCta}
                </a>
                <LocalizedLink
                  href="/legal"
                  className="block text-sm text-slate-700 underline underline-offset-2 hover:text-marhaban-ink"
                >
                  {locale === 'fr' ? 'Mentions légales' : locale === 'en' ? 'Legal' : 'قانوني'}
                </LocalizedLink>
              </div>
            </SectionBlock>
          </div>
        </div>

        <Callout variant="warning" title={labels.scopeTitle} dir={dir}>
          <div className="space-y-2">
            <p>{labels.safetyNote}</p>
            <p>{labels.disclaimer}</p>
          </div>
        </Callout>

        <section
          className="rounded-3xl border border-marhaban-gold/20 bg-marhaban-ink p-6 text-white shadow-warm sm:p-8"
          data-floating-book-call-hide
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <Send className="h-7 w-7 text-marhaban-gold" />
              <h2 className="mt-4 text-2xl font-semibold">{labels.title}</h2>
              <p className="mt-2 text-sm text-white/75">{labels.intro}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <LocalizedLink
                href={bookingPath(locale)}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-marhaban-ink shadow-warm-sm transition hover:bg-marhaban-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-ink"
              >
                {labels.primaryCta}
                <CalendarCheck className="h-4 w-4" />
              </LocalizedLink>
              <LocalizedLink
                href="/arnaques"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-ink"
              >
                {labels.scamCta}
                <SearchCheck className="h-4 w-4" />
              </LocalizedLink>
              <a
                href="/checklist.pdf"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-ink"
              >
                {labels.checklistCta}
                <Download className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
