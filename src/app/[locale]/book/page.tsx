import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  HelpCircle,
  MailCheck,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import { getHtmlAttrs, isLocale, type Locale } from '@/i18n/locales';
import { cn } from '@/lib/cn';
import { AnimatedCTA, AnimatedCard, FloatingVisual, SectionReveal, StaggerGroup } from '@/components/animations/MarketingMotion';

type Props = {
  params: Promise<{ locale: string }>;
};

type Offer = {
  name: string;
  duration: string;
  price: string;
  benefit: string;
  points: readonly string[];
};

const disclaimer = {
  fr: 'Marhaban Canada offre de l’orientation pratique et de l’information générale. Nous ne fournissons pas de conseils juridiques ni de conseils en immigration. Pour les questions liées aux visas, permis, résidence permanente, admissibilité ou stratégie d’immigration, veuillez consulter un représentant autorisé.',
  en: 'Marhaban Canada offers practical orientation and general information. We do not provide legal advice or immigration advice. For questions related to visas, permits, permanent residence, admissibility, or immigration strategy, please consult an authorized representative.',
  ar: 'تقدم مرحبا كندا توجيهاً عملياً ومعلومات عامة. نحن لا نقدم نصائح قانونية ولا نصائح في الهجرة. للأسئلة المتعلقة بالتأشيرات أو التصاريح أو الإقامة الدائمة أو الأهلية أو استراتيجية الهجرة، يرجى استشارة ممثل معتمد.',
} as const;

const pageTexts = {
  fr: {
    eyebrow: 'Réserver un appel',
    title: 'Passe du flou à un plan clair pour ton installation.',
    intro:
      'Choisis une offre, envoie ta demande, confirme un créneau calendrier, puis reçois une mini-feuille de route après l’appel.',
    primary: 'Commencer la réservation',
    secondary: 'Voir les offres',
    trust: ['Orientation pratique', 'Pas de conseil juridique', 'Pas de conseil en immigration'],
    heroImageAlt: 'Appel d’orientation Marhaban Canada dans un intérieur chaleureux et rassurant',
    offersEyebrow: 'Les offres',
    offersTitle: 'Choisis ton appel',
    offersIntro: 'Chaque offre aide à clarifier ton profil général, tes priorités et les erreurs à éviter.',
    betaBadge: 'Bêta · 10 premières places',
    reserve: 'Réserver',
    offers: [
      {
        name: 'Appel Orientation bêta',
        duration: '30 minutes · pour les 10 premiers appels',
        price: '10 $',
        benefit: 'Pour clarifier ta situation et savoir quoi faire en premier.',
        points: ['Clarification de ta situation', 'Priorités pratiques', 'Ressources utiles', 'Résumé après l’appel'],
      },
      {
        name: 'Appel Orientation',
        duration: '30 minutes',
        price: '29 $',
        benefit: 'Pour comprendre quoi faire, dans quel ordre, avec quelles ressources utiles.',
        points: ['Ordre des étapes', 'Erreurs à éviter', 'Ressources utiles'],
      },
      {
        name: 'Pack Installation',
        duration: '45 minutes + checklist personnalisée',
        price: '69 $',
        benefit: 'Pour préparer ton arrivée ou organiser ta première semaine au Canada.',
        points: ['Checklist personnalisée', 'Première semaine', 'Documents pratiques d’installation'],
      },
      {
        name: 'Pack Complet',
        duration: '60 minutes + résumé détaillé',
        price: '99 $',
        benefit: 'Pour repartir avec un plan plus structuré et facile à suivre.',
        points: ['Plan structuré', 'Résumé détaillé', 'Priorités et erreurs à éviter'],
      },
    ],
    flowTitle: 'Le parcours de réservation',
    flow: [
      { title: 'Formulaire', text: 'Tu indiques ton besoin, l’offre souhaitée et les sujets qui te bloquent.', icon: MessageCircle },
      { title: 'Calendrier', text: 'Tu reçois ou confirmes un créneau via le lien calendrier lorsqu’il est connecté.', icon: CalendarCheck },
      { title: 'Résumé après appel', text: 'Après l’appel, tu reçois une mini-feuille de route selon l’offre choisie.', icon: MailCheck },
    ],
    formTitle: 'Formulaire avant l’appel',
    formText:
      'Partage ton profil général, l’offre souhaitée et les sujets à clarifier avant l’appel. Le lien final sera connecté à Tally, Cal.com ou Calendly.',
    formCta: 'Remplir le formulaire',
    calendarTitle: 'Choisir un créneau',
    calendarText:
      'Choisis une date disponible une fois le calendrier connecté. Pour la bêta, ce bouton reste un placeholder temporaire.',
    calendarCta: 'Choisir une date',
    summaryTitle: 'Ce que tu reçois après l’appel',
    summaryItems: ['Priorités claires', 'Ressources utiles', 'Étapes recommandées', 'Erreurs à éviter', 'Checklist ou résumé selon l’offre'],
    faqTitle: 'Questions fréquentes',
    faq: [
      ['Est-ce un service d’immigration ?', 'Non. Marhaban Canada offre de l’orientation pratique et de l’information générale, pas de conseil juridique ni de conseil en immigration.'],
      ['Est-ce que je peux réserver avant d’arriver ?', 'Oui. L’appel peut aider à préparer les premières priorités, les documents pratiques et les points à vérifier avant l’arrivée.'],
      ['Est-ce que vous aidez pour le logement ?', 'Oui, dans un cadre pratique : questions à poser, preuves à vérifier, signaux d’alerte et organisation de recherche. Nous ne garantissons pas de logement.'],
      ['Est-ce que je peux vérifier une situation suspecte ?', 'Oui. Nous pouvons t’aider à ralentir, repérer les signaux de risque et identifier les vérifications utiles avant de payer ou d’envoyer des documents.'],
    ],
    finalTitle: 'Prêt à clarifier tes prochaines étapes ?',
    finalText: 'Commence par le formulaire, puis confirme un créneau pour ton appel.',
  },
  en: {
    eyebrow: 'Book a call',
    title: 'Move from confusion to a clear settlement plan.',
    intro:
      'Choose an offer, send your request, confirm a calendar time slot, then receive a mini-roadmap after the call.',
    primary: 'Start booking',
    secondary: 'View offers',
    trust: ['Practical orientation', 'No legal advice', 'No immigration advice'],
    heroImageAlt: 'Marhaban Canada orientation call in a warm, reassuring interior',
    offersEyebrow: 'Offers',
    offersTitle: 'Choose your call',
    offersIntro: 'Each offer helps clarify your general profile, priorities, and mistakes to avoid.',
    betaBadge: 'Beta · first 10 spots',
    reserve: 'Book',
    offers: [
      {
        name: 'Beta Orientation Call',
        duration: '30 minutes · first 10 calls',
        price: '$10',
        benefit: 'Clarify your situation and know what to do first.',
        points: ['Clarification of your situation', 'Practical priorities', 'Useful resources', 'Summary after the call'],
      },
      {
        name: 'Orientation Call',
        duration: '30 minutes',
        price: '$29',
        benefit: 'Understand what to do, in what order, with useful resources.',
        points: ['Step order', 'Mistakes to avoid', 'Useful resources'],
      },
      {
        name: 'Settlement Pack',
        duration: '45 minutes + personalized checklist',
        price: '$69',
        benefit: 'Prepare your arrival or organize your first week in Canada.',
        points: ['Personalized checklist', 'First week', 'Practical settlement documents'],
      },
      {
        name: 'Complete Pack',
        duration: '60 minutes + detailed summary',
        price: '$99',
        benefit: 'Leave with a more structured and easy-to-follow plan.',
        points: ['Structured plan', 'Detailed summary', 'Priorities and mistakes to avoid'],
      },
    ],
    flowTitle: 'The booking path',
    flow: [
      { title: 'Form', text: 'Share your need, preferred offer, and the topics blocking you.', icon: MessageCircle },
      { title: 'Calendar', text: 'Receive or confirm a time slot through the calendar link once connected.', icon: CalendarCheck },
      { title: 'Post-call summary', text: 'After the call, receive a mini-roadmap depending on the offer.', icon: MailCheck },
    ],
    formTitle: 'Pre-call form',
    formText:
      'Share your general profile, preferred offer, and topics to clarify before the call. The final link will connect to Tally, Cal.com, or Calendly.',
    formCta: 'Fill out the form',
    calendarTitle: 'Choose a time slot',
    calendarText:
      'Choose an available date once the calendar is connected. During beta, this button remains a temporary placeholder.',
    calendarCta: 'Choose a date',
    summaryTitle: 'What you receive after the call',
    summaryItems: ['Clear priorities', 'Useful resources', 'Recommended steps', 'Mistakes to avoid', 'Checklist or summary depending on the offer'],
    faqTitle: 'FAQ',
    faq: [
      ['Is this an immigration service?', 'No. Marhaban Canada offers practical orientation and general information, not legal advice or immigration advice.'],
      ['Can I book before arriving?', 'Yes. The call can help prepare first priorities, practical documents, and points to check before arrival.'],
      ['Do you help with housing?', 'Yes, in a practical scope: questions to ask, proof to verify, warning signs, and search organization. We do not guarantee housing.'],
      ['Can I check a suspicious situation?', 'Yes. We can help you slow down, spot risk signals, and identify useful checks before paying or sending documents.'],
    ],
    finalTitle: 'Ready to clarify your next steps?',
    finalText: 'Start with the form, then confirm a time slot for your call.',
  },
  ar: {
    eyebrow: 'احجز مكالمة',
    title: 'انتقل من التشتت إلى خطة أوضح للاستقرار.',
    intro:
      'اختر عرضاً، أرسل طلبك، أكد موعداً في التقويم، ثم استلم خارطة طريق صغيرة بعد المكالمة.',
    primary: 'ابدأ الحجز',
    secondary: 'عرض العروض',
    trust: ['توجيه عملي', 'لا توجد نصيحة قانونية', 'لا توجد نصيحة في الهجرة'],
    heroImageAlt: 'مكالمة توجيه من مرحبا كندا في أجواء دافئة ومطمئنة',
    offersEyebrow: 'العروض',
    offersTitle: 'اختر مكالمتك',
    offersIntro: 'كل عرض يساعد على توضيح ملفك العام، أولوياتك، والأخطاء التي يجب تجنبها.',
    betaBadge: 'بيتا · أول 10 أماكن',
    reserve: 'احجز',
    offers: [
      {
        name: 'مكالمة توجيه بيتا',
        duration: '30 دقيقة · أول 10 مكالمات',
        price: '10 $',
        benefit: 'لتوضيح وضعك العام ومعرفة ما تفعله أولاً.',
        points: ['توضيح وضعك العام', 'أولويات عملية', 'موارد مفيدة', 'ملخص بعد المكالمة'],
      },
      {
        name: 'مكالمة توجيه',
        duration: '30 دقيقة',
        price: '29 $',
        benefit: 'لفهم ماذا تفعل، وبأي ترتيب، ومع أي موارد مفيدة.',
        points: ['ترتيب الخطوات', 'أخطاء يجب تجنبها', 'موارد مفيدة'],
      },
      {
        name: 'حزمة الاستقرار',
        duration: '45 دقيقة + قائمة تحقق مخصصة',
        price: '69 $',
        benefit: 'لتحضير وصولك أو تنظيم أسبوعك الأول في كندا.',
        points: ['قائمة تحقق مخصصة', 'الأسبوع الأول', 'وثائق عملية للاستقرار'],
      },
      {
        name: 'الحزمة الكاملة',
        duration: '60 دقيقة + ملخص مفصل',
        price: '99 $',
        benefit: 'للخروج بخطة أكثر تنظيماً وسهلة المتابعة.',
        points: ['خطة منظمة', 'ملخص مفصل', 'أولويات وأخطاء يجب تجنبها'],
      },
    ],
    flowTitle: 'مسار الحجز',
    flow: [
      { title: 'النموذج', text: 'تشارك حاجتك، العرض المطلوب، والمواضيع التي تربكك.', icon: MessageCircle },
      { title: 'التقويم', text: 'تستلم أو تؤكد موعداً عبر رابط التقويم عند ربطه.', icon: CalendarCheck },
      { title: 'ملخص بعد المكالمة', text: 'بعد المكالمة، تستلم خارطة طريق صغيرة حسب العرض.', icon: MailCheck },
    ],
    formTitle: 'نموذج قبل المكالمة',
    formText:
      'شارك ملفك العام، العرض المطلوب، والمواضيع التي تريد توضيحها قبل المكالمة. سيتم ربط الرابط النهائي مع Tally أو Cal.com أو Calendly.',
    formCta: 'ملء النموذج',
    calendarTitle: 'اختيار موعد',
    calendarText:
      'اختر تاريخاً متاحاً بعد ربط التقويم. خلال مرحلة البيتا، يبقى هذا الزر رابطاً مؤقتاً.',
    calendarCta: 'اختيار تاريخ',
    summaryTitle: 'ما الذي تستلمه بعد المكالمة',
    summaryItems: ['أولويات واضحة', 'موارد مفيدة', 'خطوات موصى بها', 'أخطاء يجب تجنبها', 'قائمة تحقق أو ملخص حسب العرض'],
    faqTitle: 'أسئلة شائعة',
    faq: [
      ['هل هذه خدمة هجرة؟', 'لا. مرحبا كندا يقدم توجيهاً عملياً ومعلومات عامة، وليس نصائح قانونية أو نصائح في الهجرة.'],
      ['هل يمكنني الحجز قبل الوصول؟', 'نعم. يمكن أن تساعدك المكالمة على تحضير الأولويات الأولى، الوثائق العملية، والنقاط التي يجب التحقق منها قبل الوصول.'],
      ['هل تساعدون في السكن؟', 'نعم، ضمن إطار عملي: أسئلة يجب طرحها، أدلة يجب التحقق منها، إشارات تحذير، وتنظيم البحث. لا نضمن الحصول على سكن.'],
      ['هل يمكنني التحقق من وضع مشبوه؟', 'نعم. يمكننا مساعدتك على التريث، رصد إشارات الخطر، وتحديد التحققات المفيدة قبل الدفع أو إرسال الوثائق.'],
    ],
    finalTitle: 'هل أنت جاهز لتوضيح خطواتك التالية؟',
    finalText: 'ابدأ بالنموذج، ثم أكد موعداً لمكالمتك.',
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';
  const t = pageTexts[locale];

  return {
    title: `${t.eyebrow} | Marhaban Canada`,
    description: t.intro,
  };
}

export default async function BookCallPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const { dir, lang } = getHtmlAttrs(locale);
  const t = pageTexts[locale];
  const bookingActionsHref = '#booking-actions';
  const placeholderHref = '#';

  return (
    <main className="warm-page px-4 py-10 sm:px-6 lg:px-8" dir={dir} lang={lang}>
      <div className="mx-auto max-w-7xl">
        <SectionReveal className="relative overflow-hidden rounded-[2rem] border border-marhaban-leaf/10 bg-[linear-gradient(180deg,rgba(232,239,227,0.72),rgba(255,250,242,0.95))] p-6 shadow-warm sm:p-8 lg:grid lg:grid-cols-[1fr_0.96fr] lg:items-center lg:gap-8">
          <div className="relative z-10">
            <p className="inline-flex rounded-full border border-marhaban-leaf/10 bg-white/82 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-marhaban-leaf shadow-warm-sm">
              {t.eyebrow}
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[0.94] text-marhaban-ink sm:text-5xl lg:text-[4.8rem]">
              {t.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base text-marhaban-ink/78 sm:text-lg">{t.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <AnimatedCTA className="inline-flex">
                <a href="#booking-flow" className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-marhaban-ink px-6 py-3 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2">
                  {t.primary}
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                </a>
              </AnimatedCTA>
              <AnimatedCTA className="inline-flex">
                <a href="#offers" className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-marhaban-leaf/20 bg-white/90 px-6 py-3 text-sm font-bold text-marhaban-ink transition hover:border-marhaban-leaf/35 hover:bg-marhaban-mint/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-2">
                  {t.secondary}
                </a>
              </AnimatedCTA>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {t.trust.map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border border-marhaban-leaf/10 bg-white/80 px-3 py-1.5 text-xs font-semibold text-marhaban-ink shadow-[0_10px_24px_rgba(31,45,43,0.05)]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-marhaban-leaf" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <FloatingVisual className="relative z-10 mt-8 lg:mt-0" float="gentle">
            <div className="overflow-hidden rounded-[2rem] border border-white/20 bg-marhaban-ink shadow-premium-card">
            <div className="relative aspect-[4/5] min-h-[340px]">
              <Image
                src="/assets/marhaban/visuel-appel.jpg"
                alt={t.heroImageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 42vw, calc(100vw - 3rem)"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-marhaban-ink/54 via-marhaban-ink/12 to-transparent" aria-hidden="true" />
              <div className="absolute left-4 right-4 top-4">
                <span className="inline-flex rounded-full bg-white/86 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-marhaban-leaf shadow-warm-sm">
                  {t.betaBadge}
                </span>
              </div>
              <div className="absolute inset-x-4 bottom-4 rounded-[1.75rem] border border-white/18 bg-white/88 p-4 shadow-warm backdrop-blur-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">{t.offersEyebrow}</p>
                    <p className="mt-1 text-2xl font-semibold text-marhaban-ink">{t.offers[0].name}</p>
                  </div>
                  <p className="rounded-full bg-marhaban-ink px-3 py-1 text-sm font-bold text-white">{t.offers[0].price}</p>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {[
                    t.offers[0].duration,
                    t.offers[0].benefit,
                    t.offers[0].points[0],
                    t.offers[0].points[3],
                  ].map((item) => (
                    <div key={item} className="rounded-2xl bg-marhaban-cream/90 px-3 py-2 text-sm text-marhaban-ink/82">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </div>
          </FloatingVisual>
        </SectionReveal>

        <SectionReveal id="offers" className="py-12 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-clay">{t.offersEyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold text-marhaban-ink sm:text-4xl">{t.offersTitle}</h2>
            <p className="mt-3 text-base text-slate-700">{t.offersIntro}</p>
          </div>
          <StaggerGroup className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {t.offers.map((offer, index) => (
              <OfferCard key={offer.name} offer={offer} cta={t.reserve} featured={index === 0} featuredLabel={t.betaBadge} href={bookingActionsHref} />
            ))}
          </StaggerGroup>
        </SectionReveal>

        <SectionReveal className="pb-12">
          <div className="rounded-3xl border border-marhaban-leaf/12 bg-marhaban-cream/90 p-6 shadow-warm-sm sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-clay">Disclaimer</p>
                <p className="mt-3 text-sm leading-relaxed text-marhaban-ink/85">{disclaimer[locale]}</p>
              </div>
              <ShieldCheck className="h-8 w-8 flex-shrink-0 text-marhaban-leaf" aria-hidden="true" />
            </div>
          </div>
        </SectionReveal>

        <SectionReveal id="booking-flow" className="grid gap-6 pb-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-marhaban-leaf/15 bg-white/[0.92] p-6 shadow-warm-sm sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-clay">{t.flowTitle}</p>
            <h2 className="mt-4 text-3xl font-semibold text-marhaban-ink">{t.flowTitle}</h2>
            <StaggerGroup className="mt-7 grid gap-4">
              {t.flow.map((step, index) => {
                const Icon = step.icon;
                return (
                  <AnimatedCard key={step.title} className="flex gap-4 rounded-2xl border border-marhaban-leaf/10 bg-marhaban-cream/80 p-4 shadow-sm">
                    <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-marhaban-mint text-marhaban-leaf">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.1em] text-marhaban-clay">{index + 1}</p>
                      <h3 className="mt-1 font-semibold text-marhaban-ink">{step.title}</h3>
                      <p className="mt-1 text-sm text-slate-700">{step.text}</p>
                    </div>
                  </AnimatedCard>
                );
              })}
            </StaggerGroup>
          </div>

          <div id="booking-actions" className="grid gap-6 scroll-mt-24">
            <ActionPanel
              icon={<MessageCircle className="h-7 w-7" aria-hidden="true" />}
              title={t.formTitle}
              text={t.formText}
              cta={t.formCta}
              href={placeholderHref}
            />
            <ActionPanel
              icon={<CalendarCheck className="h-7 w-7" aria-hidden="true" />}
              title={t.calendarTitle}
              text={t.calendarText}
              cta={t.calendarCta}
              href={placeholderHref}
              warm
            />
          </div>
        </SectionReveal>

        <SectionReveal className="grid gap-6 pb-12 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-marhaban-leaf/15 bg-marhaban-mint/75 p-6 shadow-warm-sm sm:p-8">
            <ClipboardCheck className="h-8 w-8 text-marhaban-leaf" aria-hidden="true" />
            <h2 className="mt-5 text-3xl font-semibold text-marhaban-ink">{t.summaryTitle}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.summaryItems.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl bg-white/75 p-4 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-marhaban-leaf" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-amber-200 bg-[#FFF4E3] p-6 shadow-warm-sm sm:p-8">
            <HelpCircle className="h-8 w-8 text-marhaban-clay" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-semibold text-marhaban-ink">{t.faqTitle}</h2>
            <div className="mt-5 space-y-4">
              {t.faq.map(([question, answer]) => (
                <article key={question} className="rounded-2xl bg-white/75 p-4">
                  <h3 className="font-semibold text-marhaban-ink">{question}</h3>
                  <p className="mt-2 text-sm text-slate-700">{answer}</p>
                </article>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="rounded-3xl bg-marhaban-ink p-6 text-white shadow-warm sm:p-8" data-floating-book-call-hide>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <MailCheck className="h-8 w-8 text-marhaban-gold" aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-semibold">{t.finalTitle}</h2>
              <p className="mt-2 text-sm text-white/75">{t.finalText}</p>
            </div>
            <AnimatedCTA className="inline-flex">
              <a href={bookingActionsHref} className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-marhaban-ink transition hover:bg-marhaban-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-marhaban-ink">
                {t.formCta}
                <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
              </a>
            </AnimatedCTA>
          </div>
        </SectionReveal>
      </div>
    </main>
  );
}

function OfferCard({
  offer,
  cta,
  featured,
  featuredLabel,
  href,
}: {
  offer: Offer;
  cta: string;
  featured: boolean;
  featuredLabel: string;
  href: string;
}) {
  return (
    <article
      className={cn(
        'relative flex min-h-[390px] flex-col overflow-hidden rounded-[2rem] border p-6 shadow-warm-sm transition hover:-translate-y-1 hover:shadow-premium-card',
        featured
          ? 'border-marhaban-forest bg-marhaban-forest text-white xl:scale-[1.03]'
          : 'border-marhaban-leaf/12 bg-white/[0.94] text-marhaban-ink',
      )}
    >
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-1',
          featured ? 'bg-marhaban-gold' : 'bg-gradient-to-r from-marhaban-sand via-marhaban-mint to-marhaban-sage',
        )}
        aria-hidden="true"
      />
      {featured ? (
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-marhaban-gold/25 blur-2xl" aria-hidden="true" />
      ) : null}
      {featured ? (
        <span className="relative mb-4 inline-flex w-fit rounded-full bg-white/14 px-3 py-1 text-xs font-bold text-marhaban-gold ring-1 ring-white/10">
          {featuredLabel}
        </span>
      ) : null}
      <p className={cn('text-xs font-bold uppercase tracking-[0.12em]', featured ? 'text-marhaban-gold' : 'text-marhaban-clay')}>
        {offer.duration}
      </p>
      <h3 className={cn('mt-4 text-2xl font-semibold', featured ? 'text-white' : 'text-marhaban-ink')}>{offer.name}</h3>
      <p className={cn('mt-3 text-4xl font-semibold', featured ? 'text-white' : 'text-marhaban-leaf')}>{offer.price}</p>
      <p className={cn('mt-4 text-sm leading-relaxed', featured ? 'text-white/76' : 'text-slate-700')}>{offer.benefit}</p>
      <ul className="mt-6 space-y-3">
        {offer.points.map((point) => (
          <li key={point} className={cn('flex items-start gap-2 text-sm', featured ? 'text-white/82' : 'text-slate-700')}>
            <CheckCircle2 className={cn('mt-0.5 h-4 w-4 flex-shrink-0', featured ? 'text-marhaban-gold' : 'text-marhaban-leaf')} aria-hidden="true" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <a
        href={href}
        className={cn(
          'mt-auto inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          featured
            ? 'bg-white text-marhaban-forest hover:bg-marhaban-mint focus-visible:ring-white/50 focus-visible:ring-offset-marhaban-forest'
            : 'bg-marhaban-ink text-white hover:bg-marhaban-leaf focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-white',
        )}
      >
        {cta}
        <CalendarCheck className="h-4 w-4" aria-hidden="true" />
      </a>
    </article>
  );
}

function ActionPanel({
  icon,
  title,
  text,
  cta,
  href,
  warm = false,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  cta: string;
  href: string;
  warm?: boolean;
}) {
  return (
    <article className={cn('rounded-3xl border p-6 shadow-warm-sm sm:p-8', warm ? 'border-amber-200 bg-[#FFF4E3]' : 'border-marhaban-leaf/15 bg-white/[0.92]')}>
      <span className={cn('grid h-12 w-12 place-items-center rounded-2xl', warm ? 'bg-amber-900 text-white' : 'bg-marhaban-mint text-marhaban-leaf')}>
        {icon}
      </span>
      <h2 className="mt-5 text-2xl font-semibold text-marhaban-ink">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">{text}</p>
      <a href={href} className="mt-6 inline-flex min-h-[46px] items-center gap-2 rounded-full bg-marhaban-ink px-5 py-2.5 text-sm font-bold text-white transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2">
        {cta}
        <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
      </a>
    </article>
  );
}
