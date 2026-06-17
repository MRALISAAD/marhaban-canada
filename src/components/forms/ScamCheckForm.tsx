'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { Locale } from '@/i18n/locales';
import { addLocalScamCheck } from '@/lib/admin/local-scam-check-store';

type Props = {
  locale: Locale;
  dir: 'ltr' | 'rtl';
};

const copy = {
  fr: {
    eyebrow: 'Signalement',
    title: 'Soumettre une situation pour avis',
    subtitle: "Nous allons l'examiner de manière informative et prudente. Pas de conseil juridique.",
    trust: "Ne pas inclure : passeport, NAS, numéro bancaire ou document sensible. Ces informations ne sont pas utiles pour une évaluation informative.",
    fullName: 'Nom complet',
    email: 'Email',
    phone: 'Téléphone (optionnel)',
    cityProvince: 'Ville / province',
    situationType: 'Type de situation',
    situationPlaceholder: 'Sélectionner',
    situations: [
      ['logement', 'Logement'],
      ['emploi', 'Emploi'],
      ['immigration', 'Immigration'],
      ['paiement', 'Paiement'],
      ['document', 'Document'],
      ['autre', 'Autre'],
    ],
    amountRequested: 'Montant demandé (optionnel)',
    amountPlaceholder: 'Ex. 500 $',
    urgency: "Niveau d'urgence",
    urgencyPlaceholder: 'Sélectionner',
    urgencies: [
      ['low', 'Pas urgent'],
      ['normal', 'Cette semaine'],
      ['high', "Aujourd'hui"],
    ],
    description: 'Message reçu ou description de la situation',
    descriptionPlaceholder: "Décrivez ce qui s'est passé, le message reçu, la demande faite.",
    consent: "Je comprends que Marhaban Canada offre une évaluation informative du risque, pas un conseil juridique ou d'immigration réglementé.",
    submit: 'Envoyer la demande',
    successTitle: 'Demande envoyée.',
    successText: "Nous allons l'examiner de manière informative et prudente.",
    successNote: 'Nous vous répondrons par email avec des observations et ressources officielles.',
    close: 'Fermer',
  },
  en: {
    eyebrow: 'Report',
    title: 'Submit a situation for review',
    subtitle: 'We will review it in an informative and cautious way. No legal advice.',
    trust: 'Do not include: passport, SIN, bank number or sensitive documents. These are not useful for an informational review.',
    fullName: 'Full name',
    email: 'Email',
    phone: 'Phone (optional)',
    cityProvince: 'City / province',
    situationType: 'Type of situation',
    situationPlaceholder: 'Select',
    situations: [
      ['logement', 'Housing'],
      ['emploi', 'Employment'],
      ['immigration', 'Immigration'],
      ['paiement', 'Payment'],
      ['document', 'Document'],
      ['autre', 'Other'],
    ],
    amountRequested: 'Amount requested (optional)',
    amountPlaceholder: 'e.g. $500',
    urgency: 'Urgency level',
    urgencyPlaceholder: 'Select',
    urgencies: [
      ['low', 'Not urgent'],
      ['normal', 'This week'],
      ['high', 'Today'],
    ],
    description: 'Message received or situation description',
    descriptionPlaceholder: 'Describe what happened, the message received, the request made.',
    consent: 'I understand that Marhaban Canada offers an informational risk assessment, not legal or regulated immigration advice.',
    submit: 'Send request',
    successTitle: 'Request sent.',
    successText: 'We will review it in an informative and cautious way.',
    successNote: 'We will reply by email with observations and official resources.',
    close: 'Close',
  },
  ar: {
    eyebrow: 'بلاغ',
    title: 'تقديم وضع للمراجعة',
    subtitle: 'سنراجعه بطريقة معلوماتية وحذرة. لا نصيحة قانونية.',
    trust: 'لا تضمّن: جواز السفر، SIN، رقم بنكي أو وثائق حساسة. هذه المعلومات غير مفيدة في تقييم معلوماتي.',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف (اختياري)',
    cityProvince: 'المدينة / المقاطعة',
    situationType: 'نوع الوضع',
    situationPlaceholder: 'اختر',
    situations: [
      ['logement', 'سكن'],
      ['emploi', 'توظيف'],
      ['immigration', 'هجرة'],
      ['paiement', 'دفع'],
      ['document', 'وثائق'],
      ['autre', 'أخرى'],
    ],
    amountRequested: 'المبلغ المطلوب (اختياري)',
    amountPlaceholder: 'مثال: 500 $',
    urgency: 'مستوى الاستعجال',
    urgencyPlaceholder: 'اختر',
    urgencies: [
      ['low', 'غير عاجل'],
      ['normal', 'هذا الأسبوع'],
      ['high', 'اليوم'],
    ],
    description: 'الرسالة المستلمة أو وصف الوضع',
    descriptionPlaceholder: 'صف ما حدث، الرسالة المستلمة، الطلب المقدم.',
    consent: 'أفهم أن Marhaban Canada تقدم تقييماً معلوماتياً للمخاطر، وليست استشارة قانونية أو خدمة هجرة منظمة.',
    submit: 'إرسال الطلب',
    successTitle: 'تم إرسال الطلب.',
    successText: 'سنراجعه بطريقة معلوماتية وحذرة.',
    successNote: 'سنرد عليك بالبريد الإلكتروني مع ملاحظات وموارد رسمية.',
    close: 'إغلاق',
  },
} as const;

const inputClass =
  'w-full rounded-2xl border border-marhaban-leaf/18 bg-white px-4 py-3 text-sm text-marhaban-ink placeholder:text-marhaban-muted transition focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20';
const labelClass = 'mb-2 block text-sm font-semibold text-marhaban-ink';

function createId() {
  return `local_scam_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function ScamCheckForm({ locale, dir }: Props) {
  const t = copy[locale];

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cityProvince, setCityProvince] = useState('');
  const [situationType, setSituationType] = useState('');
  const [amountRequested, setAmountRequested] = useState('');
  const [urgency, setUrgency] = useState('');
  const [description, setDescription] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function saveLocalScamCheck(payload: {
    requester_name: string;
    email: string;
    phone?: string;
    city_province: string;
    situation: string;
    amount_requested?: string;
    urgency: 'low' | 'normal' | 'high';
  }) {
    addLocalScamCheck({
      id: createId(),
      createdAt: new Date().toISOString(),
      requesterName: payload.requester_name,
      email: payload.email,
      phone: payload.phone,
      cityProvince: payload.city_province,
      situation: payload.situation,
      amountRequested: payload.amount_requested,
      urgency: payload.urgency,
      riskLevel: 'unreviewed',
      status: 'new',
      notes: [],
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      requester_name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      city_province: cityProvince.trim(),
      situation: `[${situationType}] ${description.trim()}`,
      amount_requested: amountRequested.trim() || undefined,
      urgency: urgency as 'low' | 'normal' | 'high',
      disclaimer_accepted: consent,
    };

    try {
      const response = await fetch('/api/scam-checks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean };

      if (!response.ok || result.ok !== true) {
        throw new Error('Scam check API request failed');
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Scam check Supabase request failed, using localStorage fallback', error);
      }
      saveLocalScamCheck(payload);
    }

    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-8 text-center shadow-warm-sm">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-marhaban-mint text-marhaban-forestDark">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-heading text-2xl font-semibold leading-tight text-marhaban-forestDark">
          {t.successTitle}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-marhaban-muted">{t.successText}</p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-marhaban-muted">{t.successNote}</p>
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full border border-marhaban-leaf/20 bg-marhaban-forestDark px-6 py-2.5 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-clay"
        >
          {t.close}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" dir={dir}>
      <div className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-mint/40 px-4 py-3 text-xs leading-relaxed text-marhaban-ink/75">
        {t.trust}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="scam-full-name" className={labelClass}>{t.fullName}</label>
          <input
            id="scam-full-name"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={inputClass}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="scam-email" className={labelClass}>{t.email}</label>
          <input
            id="scam-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            autoComplete="email"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="scam-phone" className={labelClass}>{t.phone}</label>
          <input
            id="scam-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            autoComplete="tel"
          />
        </div>
        <div>
          <label htmlFor="scam-city" className={labelClass}>{t.cityProvince}</label>
          <input
            id="scam-city"
            type="text"
            required
            value={cityProvince}
            onChange={(e) => setCityProvince(e.target.value)}
            className={inputClass}
            autoComplete="address-level2"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="scam-situation-type" className={labelClass}>{t.situationType}</label>
          <select
            id="scam-situation-type"
            required
            value={situationType}
            onChange={(e) => setSituationType(e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="" disabled>{t.situationPlaceholder}</option>
            {t.situations.map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="scam-urgency" className={labelClass}>{t.urgency}</label>
          <select
            id="scam-urgency"
            required
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="" disabled>{t.urgencyPlaceholder}</option>
            {t.urgencies.map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="scam-amount" className={labelClass}>{t.amountRequested}</label>
        <input
          id="scam-amount"
          type="text"
          value={amountRequested}
          onChange={(e) => setAmountRequested(e.target.value)}
          placeholder={t.amountPlaceholder}
          className={`${inputClass} placeholder:text-marhaban-muted`}
        />
      </div>

      <div>
        <label htmlFor="scam-description" className={labelClass}>{t.description}</label>
        <textarea
          id="scam-description"
          required
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t.descriptionPlaceholder}
          className={`${inputClass} resize-none placeholder:text-marhaban-muted`}
        />
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-marhaban-leaf/12 bg-marhaban-mint/35 p-4 text-sm leading-relaxed text-marhaban-ink">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 flex-shrink-0 rounded border-marhaban-leaf/30 text-marhaban-forestDark focus:ring-marhaban-leaf/30"
        />
        <span>{t.consent}</span>
      </label>

      <button
        type="submit"
        className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-marhaban-forestDark px-6 py-3 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 sm:w-auto"
      >
        {t.submit}
        <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
      </button>
    </form>
  );
}
