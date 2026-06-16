import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
import { getHtmlAttrs, isLocale, type Locale } from '@/i18n/locales';
import { ReserveForm, type ReserveTexts } from './ReserveForm';

type Props = {
  params: Promise<{ locale: string }>;
};

const disclaimer = {
  fr: "Marhaban Canada offre de l'orientation pratique et de l'information générale. Nous ne fournissons pas de conseils juridiques ni de conseils en immigration. Pour les questions liées aux visas, permis, résidence permanente, admissibilité ou stratégie d'immigration, veuillez consulter un représentant autorisé.",
  en: 'Marhaban Canada offers practical orientation and general information. We do not provide legal advice or immigration advice. For questions related to visas, permits, permanent residence, admissibility, or immigration strategy, please consult an authorized representative.',
  ar: 'تقدم مرحبا كندا توجيهاً عملياً ومعلومات عامة. نحن لا نقدم نصائح قانونية ولا نصائح في الهجرة. للأسئلة المتعلقة بالتأشيرات أو التصاريح أو الإقامة الدائمة أو الأهلية أو استراتيجية الهجرة، يرجى استشارة ممثل معتمد.',
} as const;

type PageText = ReserveTexts & { eyebrow: string; title: string; subtitle: string };

const pageTexts: Record<Locale, PageText> = {
  fr: {
    eyebrow: 'Formulaire de demande',
    title: "Réserver un appel d'orientation",
    subtitle: '30 minutes en ligne pour clarifier tes démarches et organiser tes priorités.',
    form: {
      name: 'Ton prénom',
      email: 'Ton email',
      status: 'Ton statut',
      statusOptions: {
        student: 'Étudiant international',
        worker: 'Travailleur temporaire',
        pr: 'Résident permanent',
        preparing: 'Je prépare mon arrivée',
        arrived: 'Je suis déjà arrivé',
        other: 'Autre',
      },
      city: 'Ville cible au Canada',
      need: 'Ton besoin principal',
      needPlaceholder: 'Décris en quelques mots ce qui te bloque ou ce que tu veux clarifier',
      submit: 'Demander un appel',
    },
    confirmation: 'Merci. On te recontacte par email dans les 24 h pour confirmer ton créneau.',
    errorText: 'Une erreur est survenue. Réessaie.',
  },
  en: {
    eyebrow: 'Request form',
    title: 'Book an orientation call',
    subtitle: '30 minutes online to clarify your steps and organize your priorities.',
    form: {
      name: 'Your first name',
      email: 'Your email',
      status: 'Your status',
      statusOptions: {
        student: 'International student',
        worker: 'Temporary worker',
        pr: 'Permanent resident',
        preparing: "I'm preparing my arrival",
        arrived: "I've already arrived",
        other: 'Other',
      },
      city: 'Target city in Canada',
      need: 'Your main need',
      needPlaceholder: 'Briefly describe what is blocking you or what you want to clarify',
      submit: 'Request a call',
    },
    confirmation: "Thank you. We'll contact you by email within 24 hours to confirm your time slot.",
    errorText: 'An error occurred. Please try again.',
  },
  ar: {
    eyebrow: 'نموذج الطلب',
    title: 'احجز مكالمة توجيه',
    subtitle: '30 دقيقة عبر الإنترنت لتوضيح خطواتك وتنظيم أولوياتك.',
    form: {
      name: 'اسمك الأول',
      email: 'بريدك الإلكتروني',
      status: 'وضعك',
      statusOptions: {
        student: 'طالب دولي',
        worker: 'عامل مؤقت',
        pr: 'مقيم دائم',
        preparing: 'أنا أحضّر لوصولي',
        arrived: 'وصلت بالفعل',
        other: 'أخرى',
      },
      city: 'المدينة المستهدفة في كندا',
      need: 'حاجتك الرئيسية',
      needPlaceholder: 'اشرح بإيجاز ما يعيقك أو ما تريد توضيحه',
      submit: 'طلب مكالمة',
    },
    confirmation: 'شكرًا. سنتواصل معك عبر البريد الإلكتروني خلال 24 ساعة لتأكيد موعدك.',
    errorText: 'حدث خطأ. حاول مرة أخرى.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : 'fr';
  const t = pageTexts[locale];
  return {
    title: `${t.title} | Marhaban Canada`,
    description: t.subtitle,
  };
}

export default async function ReserverPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const { dir, lang } = getHtmlAttrs(locale);
  const t = pageTexts[locale];

  return (
    <main className="warm-page px-4 py-10 sm:px-6 lg:px-8" dir={dir} lang={lang}>
      <div className="mx-auto max-w-2xl">
        <section className="mb-10">
          <p className="inline-flex rounded-full bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-marhaban-leaf">
            {t.eyebrow}
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-marhaban-ink sm:text-5xl">
            {t.title}
          </h1>
          <p className="mt-4 text-base text-slate-700 sm:text-lg">{t.subtitle}</p>
        </section>

        <section className="rounded-3xl border border-marhaban-leaf/15 bg-white/[0.92] p-6 shadow-warm-sm sm:p-8">
          <ReserveForm texts={t} dir={dir} />
        </section>

        <section className="mt-6 rounded-3xl border border-marhaban-leaf/10 bg-marhaban-mint/60 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-marhaban-leaf"
              aria-hidden="true"
            />
            <p className="text-xs leading-relaxed text-slate-700">{disclaimer[locale]}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
