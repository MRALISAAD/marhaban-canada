import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CalendarCheck, CheckCircle2, HelpCircle, ShieldCheck } from 'lucide-react';
import { getHtmlAttrs, isLocale, type Locale } from '@/i18n/locales';
import { withLocale } from '@/lib/i18n-utils';

type Props = {
  params: Promise<{ locale: string }>;
};

const disclaimer = {
  fr: 'Marhaban Canada offre de l’orientation pratique et de l’information générale. Nous ne fournissons pas de conseils juridiques ni de conseils en immigration. Pour les questions liées aux visas, permis, résidence permanente, admissibilité ou stratégie d’immigration, veuillez consulter un représentant autorisé.',
  en: 'Marhaban Canada offers practical orientation and general information. We do not provide legal advice or immigration advice. For questions related to visas, permits, permanent residence, admissibility, or immigration strategy, please consult an authorized representative.',
  ar: 'تقدم مرحبا كندا توجيهاً عملياً ومعلومات عامة. نحن لا نقدم نصائح قانونية ولا نصائح في الهجرة. للأسئلة المتعلقة بالتأشيرات أو التصاريح أو الإقامة الدائمة أو الأهلية أو استراتيجية الهجرة، يرجى استشارة ممثل معتمد.',
} as const;

const pageTexts = {
  fr: {
    eyebrow: 'Réserver un appel',
    title: 'Choisis ton appel d’orientation pratique.',
    intro:
      'Un appel court et humain pour clarifier ta situation, organiser tes priorités et repartir avec des étapes pratiques.',
    primary: 'Demander un créneau',
    secondary: 'Écrire au contact',
    offersTitle: 'Offres disponibles',
    bookingTitle: 'Lien de réservation',
    bookingText:
      'Le lien Tally/Calendly sera ajouté ici. En attendant, envoie une demande et indique l’offre souhaitée.',
    contactFallback: 'Envoyer une demande via le formulaire contact',
    faqTitle: 'Questions fréquentes',
    offers: [
      {
        name: 'Appel Orientation bêta',
        meta: '30 minutes · Pour les 10 premiers appels',
        price: '10 $',
        points: ['Clarification de ta situation', 'Priorités pratiques', 'Étapes recommandées', 'Ressources utiles', 'Erreurs à éviter', 'Résumé après l’appel'],
      },
      {
        name: 'Appel Orientation',
        meta: '30 minutes',
        price: '29 $',
        points: ['Comprendre quoi faire', 'Savoir dans quel ordre avancer', 'Identifier les ressources utiles'],
      },
      {
        name: 'Pack Installation',
        meta: '45 minutes + checklist personnalisée',
        price: '69 $',
        points: ['Préparer ton arrivée', 'Organiser ta première semaine', 'Documents pratiques d’installation'],
      },
      {
        name: 'Pack Complet',
        meta: '60 minutes + résumé détaillé',
        price: '99 $',
        points: ['Plan plus structuré', 'Résumé détaillé', 'Priorités et erreurs à éviter'],
      },
    ],
    faq: [
      ['Est-ce un service juridique ?', 'Non. C’est de l’orientation pratique et de l’information générale.'],
      ['Est-ce que vous garantissez un résultat ?', 'Non. L’objectif est de clarifier tes priorités et tes prochaines étapes.'],
      ['Que dois-je préparer ?', 'Ton profil général, tes questions, et les sujets qui te bloquent.'],
    ],
  },
  en: {
    eyebrow: 'Book a call',
    title: 'Choose your practical orientation call.',
    intro:
      'A short, human call to clarify your situation, organize priorities, and leave with practical steps.',
    primary: 'Request a time slot',
    secondary: 'Write to contact',
    offersTitle: 'Available offers',
    bookingTitle: 'Booking link',
    bookingText:
      'The Tally/Calendly link will be added here. For now, send a request and include the offer you want.',
    contactFallback: 'Send a request through the contact form',
    faqTitle: 'FAQ',
    offers: [
      {
        name: 'Beta Orientation Call',
        meta: '30 minutes · First 10 calls',
        price: '$10',
        points: ['Clarification of your situation', 'Practical priorities', 'Recommended steps', 'Useful resources', 'Mistakes to avoid', 'Summary after the call'],
      },
      {
        name: 'Orientation Call',
        meta: '30 minutes',
        price: '$29',
        points: ['Understand what to do', 'Know the order of steps', 'Identify useful resources'],
      },
      {
        name: 'Settlement Pack',
        meta: '45 minutes + personalized checklist',
        price: '$69',
        points: ['Prepare your arrival', 'Organize your first week', 'Practical settlement documents'],
      },
      {
        name: 'Complete Pack',
        meta: '60 minutes + detailed summary',
        price: '$99',
        points: ['More structured plan', 'Detailed summary', 'Priorities and mistakes to avoid'],
      },
    ],
    faq: [
      ['Is this a legal service?', 'No. It is practical orientation and general information.'],
      ['Do you guarantee an outcome?', 'No. The goal is to clarify your priorities and next practical steps.'],
      ['What should I prepare?', 'Your general profile, your questions, and the topics blocking you.'],
    ],
  },
  ar: {
    eyebrow: 'احجز مكالمة',
    title: 'اختر مكالمة التوجيه العملي المناسبة.',
    intro:
      'مكالمة قصيرة وإنسانية لتوضيح وضعك العام، ترتيب أولوياتك، والخروج بخطوات عملية.',
    primary: 'اطلب موعداً',
    secondary: 'راسلنا',
    offersTitle: 'العروض المتاحة',
    bookingTitle: 'رابط الحجز',
    bookingText:
      'سيتم إضافة رابط Tally/Calendly هنا. حالياً، أرسل طلباً واذكر العرض المطلوب.',
    contactFallback: 'إرسال طلب عبر نموذج الاتصال',
    faqTitle: 'أسئلة قصيرة',
    offers: [
      {
        name: 'مكالمة توجيه بيتا',
        meta: '30 دقيقة · لأول 10 مكالمات',
        price: '10 $',
        points: ['توضيح وضعك العام', 'أولويات عملية', 'خطوات موصى بها', 'موارد مفيدة', 'أخطاء يجب تجنبها', 'ملخص بعد المكالمة'],
      },
      {
        name: 'مكالمة توجيه',
        meta: '30 دقيقة',
        price: '29 $',
        points: ['فهم ما يجب فعله', 'معرفة ترتيب الخطوات', 'تحديد الموارد المفيدة'],
      },
      {
        name: 'حزمة الاستقرار',
        meta: '45 دقيقة + قائمة تحقق مخصصة',
        price: '69 $',
        points: ['تحضير الوصول', 'تنظيم الأسبوع الأول', 'وثائق عملية للاستقرار'],
      },
      {
        name: 'الحزمة الكاملة',
        meta: '60 دقيقة + ملخص مفصل',
        price: '99 $',
        points: ['خطة أكثر تنظيماً', 'ملخص مفصل', 'أولويات وأخطاء يجب تجنبها'],
      },
    ],
    faq: [
      ['هل هذه خدمة قانونية؟', 'لا. هي توجيه عملي ومعلومات عامة.'],
      ['هل تضمنون نتيجة؟', 'لا. الهدف هو توضيح الأولويات والخطوات العملية التالية.'],
      ['ماذا أحضر؟', 'ملفك العام، أسئلتك، والمواضيع التي تربكك.'],
    ],
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

  return (
    <main className="warm-page px-4 py-10 sm:px-6 lg:px-8" dir={dir} lang={lang}>
      <div className="mx-auto max-w-7xl">
        <section className="grid gap-8 rounded-[2.5rem] border border-marhaban-leaf/10 bg-marhaban-mint/70 p-6 shadow-warm sm:p-8 lg:grid-cols-[1fr_0.78fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-marhaban-leaf">
              {t.eyebrow}
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-marhaban-ink sm:text-5xl lg:text-6xl">
              {t.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base text-slate-700 sm:text-lg">{t.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#booking-placeholder"
                className="inline-flex min-h-[50px] items-center gap-2 rounded-full bg-marhaban-ink px-6 py-3 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2"
              >
                {t.primary}
                <CalendarCheck className="h-4 w-4" />
              </a>
              <Link
                href={withLocale('/contact', locale)}
                className="inline-flex min-h-[50px] items-center gap-2 rounded-full border border-marhaban-leaf/20 bg-white/80 px-6 py-3 text-sm font-bold text-marhaban-ink transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-2"
              >
                {t.secondary}
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] bg-marhaban-ink p-6 text-white shadow-warm">
            <ShieldCheck className="h-9 w-9 text-marhaban-gold" />
            <p className="mt-6 text-sm leading-relaxed text-white/78">{disclaimer[locale]}</p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <h2 className="text-3xl font-semibold text-marhaban-ink sm:text-4xl">{t.offersTitle}</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {t.offers.map((offer, index) => (
              <article
                key={offer.name}
                className={`rounded-[2rem] border p-6 shadow-warm-sm ${
                  index === 0
                    ? 'border-marhaban-ink bg-marhaban-ink text-white'
                    : 'border-stone-200 bg-white/[0.88] text-marhaban-ink'
                }`}
              >
                <p className={`text-xs font-bold uppercase tracking-[0.16em] ${index === 0 ? 'text-marhaban-gold' : 'text-marhaban-clay'}`}>
                  {offer.meta}
                </p>
                <h3 className="mt-4 text-2xl font-semibold">{offer.name}</h3>
                <p className={`mt-3 text-3xl font-semibold ${index === 0 ? 'text-white' : 'text-marhaban-leaf'}`}>{offer.price}</p>
                <ul className="mt-6 space-y-3">
                  {offer.points.map((point) => (
                    <li key={point} className={`flex items-start gap-2 text-sm ${index === 0 ? 'text-white/82' : 'text-slate-700'}`}>
                      <CheckCircle2 className={`mt-0.5 h-4 w-4 flex-shrink-0 ${index === 0 ? 'text-marhaban-gold' : 'text-marhaban-leaf'}`} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="booking-placeholder" className="grid gap-6 pb-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-stone-200 bg-white/[0.88] p-6 shadow-warm-sm">
            <CalendarCheck className="h-8 w-8 text-marhaban-leaf" />
            <h2 className="mt-5 text-2xl font-semibold text-marhaban-ink">{t.bookingTitle}</h2>
            <p className="mt-3 text-sm text-slate-700">{t.bookingText}</p>
            <Link
              href={withLocale('/contact', locale)}
              className="mt-6 inline-flex min-h-[48px] items-center rounded-full bg-marhaban-ink px-5 py-2.5 text-sm font-bold text-white transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2"
            >
              {t.contactFallback}
            </Link>
          </div>
          <div className="rounded-[2rem] border border-amber-200 bg-[#FFF4E3] p-6 shadow-warm-sm">
            <HelpCircle className="h-8 w-8 text-marhaban-clay" />
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
        </section>
      </div>
    </main>
  );
}
