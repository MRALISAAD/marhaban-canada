'use client';

import LocalizedLink from '../LocalizedLink';
import type { ChecklistItem, ChecklistPriority } from '@/content/checklistOffline';
import { ShieldCheck } from 'lucide-react';
import { SecureExternalLink } from '@/components/checklist/SecureExternalLink';
import { useLanguage } from '@/components/LanguageProvider';
import { getChecklistDictionary } from '@/content/checklistOffline';

type ChecklistItemRowProps = {
  item: ChecklistItem;
  checked: boolean;
  onToggle: (id: string) => void;
  avoidLabel: string;
  sourcesLabel: string;
  viewGuideLabel: string;
};

// Erreurs fréquentes concrètes par étape, multilingue
const frequentErrors: Record<string, Record<string, string[]>> = {
  fr: {
    nas_done: [
      'Oublier de prendre rendez-vous.',
      'Donner son NAS à un inconnu.',
    ],
    phone_done: [
      'Signer un contrat de 2 ans sans comparer.',
      'Ignorer les offres prépayées.',
    ],
    bank_done: [
      'Choisir un forfait bancaire avec frais inutiles.',
      'Ne pas demander les offres nouveaux arrivants.',
    ],
    health_done: [
      'Attendre une urgence pour s\'inscrire.',
      'Perdre la carte santé.',
    ],
    housing_done: [
      'Payer sans bail signé.',
      'Ne pas vérifier l\'état du logement.',
    ],
    license_done: [
      'Conduire sans autorisation valide.',
      'Oublier de renouveler ton document de conduite.',
    ],
    integration_done: [
      'Rester isolé les premiers mois.',
      'Ignorer les services locaux gratuits.',
    ],
    network_done: [
      'Reporter le réseautage à plus tard.',
      'Ne pas utiliser LinkedIn.',
    ],
    taxes_done: [
      'Perdre les documents importants.',
      'Ne pas déclarer tous les revenus.',
    ],
  },
  en: {
    nas_done: [
      'Forgetting to book an appointment.',
      'Giving your SIN to a stranger.',
    ],
    phone_done: [
      'Signing a 2-year contract without comparing.',
      'Ignoring prepaid options.',
    ],
    bank_done: [
      'Choosing a bank plan with unnecessary fees.',
      'Not asking for newcomer offers.',
    ],
    health_done: [
      'Waiting for an emergency to apply.',
      'Losing your health card.',
    ],
    housing_done: [
      'Paying without a signed lease.',
      'Not checking the apartment\'s condition.',
    ],
    license_done: [
      'Driving without a valid license.',
      'Forgetting to renew the license.',
    ],
    integration_done: [
      'Staying isolated during the first months.',
      'Ignoring free local services.',
    ],
    network_done: [
      'Postponing networking.',
      'Not using LinkedIn.',
    ],
    taxes_done: [
      'Losing important documents.',
      'Not declaring all income.',
    ],
  },
  ar: {
    nas_done: [
      'نسيان حجز موعد مسبق.',
      'إعطاء رقم الضمان لشخص غريب.',
    ],
    phone_done: [
      'توقيع عقد سنتين دون مقارنة الأسعار.',
      'تجاهل البطاقات المدفوعة مسبقًا.',
    ],
    bank_done: [
      'اختيار حساب برسوم غير ضرورية.',
      'عدم طلب عروض القادمين الجدد.',
    ],
    health_done: [
      'انتظار الطوارئ للتسجيل.',
      'فقدان بطاقة التأمين الصحي.',
    ],
    housing_done: [
      'الدفع بدون عقد مكتوب.',
      'عدم فحص حالة السكن.',
    ],
    license_done: [
      'القيادة بدون رخصة صالحة.',
      'نسيان تجديد الرخصة.',
    ],
    integration_done: [
      'البقاء معزولًا في الأشهر الأولى.',
      'تجاهل الخدمات المحلية المجانية.',
    ],
    network_done: [
      'تأجيل بناء العلاقات.',
      'عدم استخدام لينكد إن.',
    ],
    taxes_done: [
      'فقدان الوثائق المهمة.',
      'عدم الإعلان عن جميع الدخل.',
    ],
  },
};

const frequentErrorLabel: Record<string, string> = {
  fr: 'Erreurs fréquentes',
  en: 'Common mistakes',
  ar: 'أخطاء شائعة',
};

// Mini FAQ par étape, multilingue
const faqLabels: Record<string, string> = {
  fr: 'Questions fréquentes',
  en: 'FAQ',
  ar: 'أسئلة شائعة',
};

const miniFAQ: Record<string, Record<string, { q: string; a: string }[]>> = {
  fr: {
    nas_done: [
      { q: 'Est-ce obligatoire ?', a: 'Oui, pour travailler et ouvrir un compte.' },
      { q: 'Combien de temps ?', a: 'En général, moins de 30 minutes sur place.' },
    ],
    phone_done: [
      { q: 'Dois-je avoir une adresse ?', a: 'Non, une pièce d’identité suffit souvent.' },
      { q: 'Carte prépayée ou abonnement ?', a: 'Prépayé conseillé au début.' },
    ],
    bank_done: [
      { q: 'Faut-il un NAS ?', a: 'Oui, il est demandé.' },
      { q: 'Peut-on ouvrir sans RDV ?', a: 'Souvent oui, mais RDV conseillé.' },
    ],
    health_done: [
      { q: 'Est-ce gratuit ?', a: 'Oui, pour les résidents admissibles.' },
      { q: 'Délais ?', a: 'De 0 à 3 mois selon la province.' },
    ],
    housing_done: [
      { q: 'Bail obligatoire ?', a: 'Toujours exiger un bail écrit.' },
      { q: 'Faut-il un garant ?', a: 'Pas toujours, mais facilite l’acceptation.' },
    ],
  },
  en: {
    nas_done: [
      { q: 'Is it mandatory?', a: 'Yes, for work and banking.' },
      { q: 'How long does it take?', a: 'Usually less than 30 minutes in person.' },
    ],
    phone_done: [
      { q: 'Do I need an address?', a: 'No, just an ID is often enough.' },
      { q: 'Prepaid or plan?', a: 'Prepaid is safer at first.' },
    ],
    bank_done: [
      { q: 'Is a SIN required?', a: 'Yes, it is needed.' },
      { q: 'Can I open without appointment?', a: 'Often yes, but appointment is better.' },
    ],
    health_done: [
      { q: 'Is it free?', a: 'Yes, for eligible residents.' },
      { q: 'Delays?', a: 'From 0 to 3 months depending on province.' },
    ],
    housing_done: [
      { q: 'Is a lease required?', a: 'Always ask for a written lease.' },
      { q: 'Do I need a guarantor?', a: 'Not always, but it helps.' },
    ],
  },
  ar: {
    nas_done: [
      { q: 'هل هو إلزامي؟', a: 'نعم، للعمل وفتح حساب بنكي.' },
      { q: 'كم يستغرق؟', a: 'عادة أقل من 30 دقيقة في المركز.' },
    ],
    phone_done: [
      { q: 'هل أحتاج عنوانًا؟', a: 'لا، غالبًا يكفي إثبات الهوية.' },
      { q: 'مدفوع مسبقًا أم اشتراك؟', a: 'يفضل المدفوع مسبقًا في البداية.' },
    ],
    bank_done: [
      { q: 'هل أحتاج رقم الضمان؟', a: 'نعم، مطلوب.' },
      { q: 'هل يمكن بدون موعد؟', a: 'غالبًا نعم، لكن الموعد أفضل.' },
    ],
    health_done: [
      { q: 'هل هو مجاني؟', a: 'نعم، للمقيمين المؤهلين.' },
      { q: 'ما هي المدة؟', a: 'من 0 إلى 3 أشهر حسب المقاطعة.' },
    ],
    housing_done: [
      { q: 'هل العقد ضروري؟', a: 'دائمًا اطلب عقدًا مكتوبًا.' },
      { q: 'هل أحتاج كفيلًا؟', a: 'ليس دائمًا، لكنه يساعد.' },
    ],
  },
};

const reassuringPhrases: Record<string, Record<ChecklistPriority, string>> = {
  fr: {
    urgent: 'La majorité des nouveaux arrivants font cette étape dans les 7 premiers jours.',
    important: 'La plupart des nouveaux arrivants font cette étape dans le premier mois.',
    later: 'Cette étape se fait progressivement, à ton rythme.',
  },
  en: {
    urgent: 'Most newcomers complete this step in the first 7 days.',
    important: 'Most newcomers do this within the first month.',
    later: 'This step is done gradually, at your own pace.',
  },
  ar: {
    urgent: 'معظم الوافدين الجدد ينجزون هذه الخطوة في أول 7 أيام.',
    important: 'غالبية الوافدين الجدد ينجزون هذه الخطوة خلال الشهر الأول.',
    later: 'يمكنك إتمام هذه الخطوة تدريجيًا حسب وتيرتك.',
  },
};

// Composant de badge de priorité amélioré avec couleurs
function PriorityBadge({ priority, locale }: { priority: ChecklistPriority; locale: string }) {
  const dictionary = getChecklistDictionary(locale as 'fr' | 'en' | 'ar');
  
  const badgeConfig = {
    urgent: {
      emoji: '🟢',
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-200',
      label: dictionary.labels.priorityUrgent,
    },
    important: {
      emoji: '🟡',
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      label: dictionary.labels.priorityImportant,
    },
    later: {
      emoji: '🔵',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      label: dictionary.labels.priorityLater,
    },
  };

  const config = badgeConfig[priority];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${config.bg} ${config.text} ${config.border}`}
      aria-label={config.label}
    >
      <span className="text-xs" aria-hidden="true">{config.emoji}</span>
      <span>{config.label}</span>
    </span>
  );
}

export function ChecklistItemRow({
  item,
  checked,
  onToggle,
  avoidLabel,
  sourcesLabel,
  viewGuideLabel,
}: ChecklistItemRowProps) {
  const { locale } = useLanguage();
  const inputId = `${item.id}-checkbox`;
  const descriptionId = `${item.id}-description`;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <input
            id={inputId}
            type="checkbox"
            checked={checked}
            onChange={() => onToggle(item.id)}
            aria-checked={checked}
            aria-describedby={descriptionId}
            className="mt-1 h-4 w-4 cursor-pointer rounded border-slate-300 text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <label
              htmlFor={inputId}
              className={`block cursor-pointer select-none text-sm font-semibold transition-colors ${checked ? 'text-slate-500 line-through' : 'text-slate-900'}`}
            >
              {item.title}
            </label>
            {item.priority && <PriorityBadge priority={item.priority} locale={locale} />}
          </div>
          <div id={descriptionId} className="sr-only">
            {item.title}. {item.priority ? reassuringPhrases[locale]?.[item.priority] || reassuringPhrases.fr[item.priority] : ''}
          </div>
          {item.priority && (
            <div className="mb-2">
              <p className="text-xs text-slate-600 leading-relaxed">
                {reassuringPhrases[locale]?.[item.priority] || reassuringPhrases.fr[item.priority]}
              </p>
            </div>
          )}

          {/* Mini FAQ par étape */}
          {miniFAQ[locale]?.[item.id]?.length > 0 && (
            <div className="mb-2 mt-1 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-700 border border-slate-100">
              <p className="font-semibold mb-1">{faqLabels[locale] || faqLabels.fr}</p>
              <ul className="space-y-1">
                {miniFAQ[locale]?.[item.id]?.map((faq, i) => (
                  <li key={i}>
                    <span className="font-medium">{faq.q}</span>{' '}
                    <span className="text-slate-500">{faq.a}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-amber-700">{avoidLabel}</p>
            <ul className="mt-2 list-disc space-y-1 ps-4">
              {item.avoid.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
            {/* Erreurs fréquentes concrètes */}
            {frequentErrors[locale]?.[item.id]?.length > 0 && (
              <div className="mt-2">
                <p className="font-semibold text-amber-800 mb-1">{frequentErrorLabel[locale] || 'Erreurs fréquentes'}</p>
                <ul className="list-disc space-y-1 ps-4 text-amber-900">
                  {frequentErrors[locale]?.[item.id]?.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <ShieldCheck className="h-4 w-4 text-slate-500" />
              {sourcesLabel}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {item.sources.map((source) => (
                <SecureExternalLink key={source.href} href={source.href} label={source.label} />
              ))}
            </div>
            {item.guideHref ? (
              <div className="mt-2">
                <LocalizedLink
                  href={item.guideHref}
                  className="text-xs font-semibold text-slate-700 underline underline-offset-2 hover:text-slate-900"
                >
                  {viewGuideLabel}
                </LocalizedLink>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
