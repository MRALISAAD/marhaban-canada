'use client';

import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import type { Locale } from '@/i18n/locales';
import type { CalendlyEvent } from '@/lib/calendly';

type BookingFormData = {
  fullName: string;
  email: string;
  phone: string;
  cityProvince: string;
  status: string;
  language: string;
  message: string;
  consent: boolean;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  service: CalendlyEvent;
  price: string;
};

const initialFormData: BookingFormData = {
  fullName: '',
  email: '',
  phone: '',
  cityProvince: '',
  status: '',
  language: '',
  message: '',
  consent: false,
};

const inputClass =
  'w-full rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-sm text-marhaban-ink placeholder:text-marhaban-muted transition focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20';

const labelClass = 'mb-2 block text-sm font-semibold text-marhaban-ink';

const copy = {
  fr: {
    title: 'Demander un créneau',
    response: 'Nous vous répondrons par email avec les disponibilités.',
    selectedService: 'Service sélectionné',
    duration: 'Durée',
    price: 'Prix',
    fullName: 'Prénom et nom',
    email: 'Email',
    phone: 'Téléphone optionnel',
    cityProvince: 'Ville / province',
    status: 'Statut général',
    statusPlaceholder: 'Sélectionnez votre statut',
    statuses: [
      ['student', 'Étudiant'],
      ['worker', 'Travailleur'],
      ['newcomer', 'Nouveau arrivant'],
      ['other', 'Autre'],
    ],
    language: 'Langue préférée',
    languagePlaceholder: 'Sélectionnez une langue',
    languages: [
      ['fr', 'Français'],
      ['en', 'Anglais'],
      ['ar', 'Arabe'],
    ],
    message: 'Message / situation',
    messagePlaceholder: 'Décrivez brièvement votre situation et ce que vous voulez clarifier.',
    trust: 'Vos informations servent uniquement à préparer votre demande. Aucun document sensible n’est demandé à cette étape.',
    consent:
      'Je comprends que Marhaban Canada offre un accompagnement général et informatif, pas un conseil juridique ou d’immigration réglementé.',
    stepContact: 'Contact',
    stepSituation: 'Situation',
    next: 'Continuer',
    back: 'Retour',
    submit: 'Envoyer la demande',
    close: 'Fermer',
    sent: 'Demande envoyée. Nous vous contacterons bientôt par email.',
    prepare: 'Préparez vos questions principales avant l’appel.',
  },
  en: {
    title: 'Request a time slot',
    response: 'We will reply by email with available times.',
    selectedService: 'Selected service',
    duration: 'Duration',
    price: 'Price',
    fullName: 'First and last name',
    email: 'Email',
    phone: 'Phone optional',
    cityProvince: 'City / province',
    status: 'General status',
    statusPlaceholder: 'Select your status',
    statuses: [
      ['student', 'Student'],
      ['worker', 'Worker'],
      ['newcomer', 'Newcomer'],
      ['other', 'Other'],
    ],
    language: 'Preferred language',
    languagePlaceholder: 'Select a language',
    languages: [
      ['fr', 'French'],
      ['en', 'English'],
      ['ar', 'Arabic'],
    ],
    message: 'Message / situation',
    messagePlaceholder: 'Briefly describe your situation and what you want to clarify.',
    trust: 'Your information is used only to prepare your request. No sensitive document is requested at this stage.',
    consent:
      'I understand that Marhaban Canada provides general and informational support, not legal advice or regulated immigration advice.',
    stepContact: 'Contact',
    stepSituation: 'Situation',
    next: 'Continue',
    back: 'Back',
    submit: 'Send request',
    close: 'Close',
    sent: 'Request sent. We will contact you soon by email.',
    prepare: 'Prepare your main questions before the call.',
  },
  ar: {
    title: 'طلب موعد',
    response: 'سنرد عليك عبر البريد الإلكتروني بالمواعيد المتاحة.',
    selectedService: 'الخدمة المختارة',
    duration: 'المدة',
    price: 'السعر',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف اختياري',
    cityProvince: 'المدينة / المقاطعة',
    status: 'الوضع العام',
    statusPlaceholder: 'اختر الوضع',
    statuses: [
      ['student', 'طالب'],
      ['worker', 'عامل'],
      ['newcomer', 'قادِم جديد'],
      ['other', 'آخر'],
    ],
    language: 'اللغة المفضلة',
    languagePlaceholder: 'اختر لغة',
    languages: [
      ['fr', 'الفرنسية'],
      ['en', 'الإنجليزية'],
      ['ar', 'العربية'],
    ],
    message: 'رسالة / الوضع',
    messagePlaceholder: 'اكتب باختصار وضعك وما تريد توضيحه.',
    trust: 'تُستخدم معلوماتك فقط لتحضير طلبك. لا نطلب أي وثائق حساسة في هذه المرحلة.',
    consent:
      'أفهم أن Marhaban Canada تقدم مرافقة عامة ومعلوماتية، وليست نصيحة قانونية أو استشارة هجرة منظمة.',
    stepContact: 'التواصل',
    stepSituation: 'الوضع',
    next: 'متابعة',
    back: 'رجوع',
    submit: 'إرسال الطلب',
    close: 'إغلاق',
    sent: 'تم إرسال الطلب. سنتواصل معك قريباً عبر البريد الإلكتروني.',
    prepare: 'حضّر أسئلتك الرئيسية قبل المكالمة.',
  },
} as const;

function getServiceReassurance(locale: Locale, serviceKey: CalendlyEvent['key']) {
  if (locale === 'en') {
    if (serviceKey === 'discovery') return 'We will help you confirm whether this is the right starting point before committing to a longer call.';
    if (serviceKey === 'antiScam') return 'We will review the warning signs with you before you pay, share, or sign anything sensitive.';
    return 'We will help you organize priorities and prepare a practical next-step plan.';
  }

  if (locale === 'ar') {
    if (serviceKey === 'discovery') return 'سنساعدك على معرفة ما إذا كانت هذه نقطة البداية المناسبة قبل اختيار مكالمة أطول.';
    if (serviceKey === 'antiScam') return 'سنراجع معك الإشارات المشبوهة قبل الدفع أو مشاركة معلومات حساسة أو توقيع أي شيء.';
    return 'سنساعدك على ترتيب الأولويات وتحضير خطة عملية للخطوة التالية.';
  }

  if (serviceKey === 'discovery') return 'Nous vous aidons à confirmer si c’est le bon point de départ avant de choisir un appel plus complet.';
  if (serviceKey === 'antiScam') return 'Nous vérifions avec vous les signaux d’alerte avant de payer, partager ou signer quelque chose de sensible.';
  return 'Nous vous aidons à organiser vos priorités et à préparer un plan d’action concret.';
}

export function ServiceBookingModal({ isOpen, onClose, locale, service, price }: Props) {
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const t = copy[locale];

  useEffect(() => {
    if (!isOpen) return;

    previousActiveElementRef.current = document.activeElement as HTMLElement;
    const timer = window.setTimeout(() => firstInputRef.current?.focus(), 80);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previousActiveElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const contactStepIsValid = Boolean(
    formData.fullName.trim()
      && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
      && formData.cityProvince.trim(),
  );

  function updateField<K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = {
      service: {
        key: service.key,
        title: service.title,
        duration: service.duration,
        price,
      },
      requester: formData,
    };

    console.log('Marhaban Canada booking request', payload);
    setIsSubmitted(true);
  }

  function handleOverlayClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) onClose();
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-marhaban-forestDark/55 p-3 backdrop-blur-sm animate-in fade-in duration-200 sm:items-center sm:p-6"
      onMouseDown={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[1.75rem] border border-marhaban-leaf/15 bg-marhaban-cream shadow-[0_32px_120px_rgba(8,42,36,0.36)] animate-in slide-in-from-bottom-4 zoom-in-95 duration-200"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-marhaban-leaf/10 bg-marhaban-cream/95 px-5 py-4 backdrop-blur sm:px-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">
              {t.selectedService}
            </p>
            <h2 id="booking-modal-title" className="mt-1 font-heading text-2xl font-semibold leading-tight text-marhaban-forestDark sm:text-3xl">
              {t.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-marhaban-leaf/15 bg-white text-marhaban-ink shadow-warm-sm transition hover:border-marhaban-clay/30 hover:bg-marhaban-mint/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-2"
            aria-label={t.close}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="rounded-[1.75rem] border border-marhaban-gold/25 bg-marhaban-forestDark p-5 text-white shadow-warm sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-gold">
              {service.title}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#d8e7df]">{t.duration}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{service.duration}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#d8e7df]">{t.price}</p>
                <p className="mt-2 text-2xl font-semibold text-marhaban-gold">{price}</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-[#edf7f2]">{getServiceReassurance(locale, service.key)}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#d8e7df]">{t.response}</p>
            <p className="mt-5 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-xs leading-relaxed text-[#d8e7df]">
              {t.trust}
            </p>
          </aside>

          {isSubmitted ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-6 text-center shadow-warm-sm">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-marhaban-mint text-marhaban-forestDark">
                <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-heading text-3xl font-semibold leading-tight text-marhaban-forestDark">
                {t.sent}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-marhaban-muted">{t.prepare}</p>
              <button
                type="button"
                onClick={onClose}
                className="mt-7 inline-flex min-h-[50px] items-center justify-center rounded-full border border-marhaban-leaf/20 bg-marhaban-forestDark px-7 py-3 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-2"
              >
                {t.close}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4 rounded-[1.75rem] border border-marhaban-leaf/15 bg-white p-5 shadow-warm-sm sm:p-6">
              <div className="grid grid-cols-2 gap-3">
                <div
                  className={[
                    'rounded-2xl border px-4 py-3 text-sm font-semibold transition',
                    step === 1
                      ? 'border-marhaban-clay/25 bg-marhaban-cream text-marhaban-forestDark shadow-warm-sm'
                      : 'border-marhaban-leaf/12 bg-white text-marhaban-muted',
                  ].join(' ')}
                >
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-clay">01</span>
                  <p className="mt-1">{t.stepContact}</p>
                </div>
                <div>
                  <div
                    className={[
                      'rounded-2xl border px-4 py-3 text-sm font-semibold transition',
                      step === 2
                        ? 'border-marhaban-clay/25 bg-marhaban-cream text-marhaban-forestDark shadow-warm-sm'
                        : 'border-marhaban-leaf/12 bg-white text-marhaban-muted',
                    ].join(' ')}
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-clay">02</span>
                    <p className="mt-1">{t.stepSituation}</p>
                  </div>
                </div>
              </div>

              {step === 1 ? (
                <>
                  <div>
                    <label htmlFor="booking-full-name" className={labelClass}>{t.fullName}</label>
                    <input
                      ref={firstInputRef}
                      id="booking-full-name"
                      required
                      value={formData.fullName}
                      onChange={(event) => updateField('fullName', event.target.value)}
                      className={inputClass}
                      autoComplete="name"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="booking-email" className={labelClass}>{t.email}</label>
                      <input
                        id="booking-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(event) => updateField('email', event.target.value)}
                        className={inputClass}
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <label htmlFor="booking-phone" className={labelClass}>{t.phone}</label>
                      <input
                        id="booking-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(event) => updateField('phone', event.target.value)}
                        className={inputClass}
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="booking-city-province" className={labelClass}>{t.cityProvince}</label>
                    <input
                      id="booking-city-province"
                      required
                      value={formData.cityProvince}
                      onChange={(event) => updateField('cityProvince', event.target.value)}
                      className={inputClass}
                      autoComplete="address-level2"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="booking-status" className={labelClass}>{t.status}</label>
                      <select
                        id="booking-status"
                        required
                        value={formData.status}
                        onChange={(event) => updateField('status', event.target.value)}
                        className={inputClass}
                      >
                        <option value="" disabled>{t.statusPlaceholder}</option>
                        {t.statuses.map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="booking-language" className={labelClass}>{t.language}</label>
                      <select
                        id="booking-language"
                        required
                        value={formData.language}
                        onChange={(event) => updateField('language', event.target.value)}
                        className={inputClass}
                      >
                        <option value="" disabled>{t.languagePlaceholder}</option>
                        {t.languages.map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="booking-message" className={labelClass}>{t.message}</label>
                    <textarea
                      id="booking-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(event) => updateField('message', event.target.value)}
                      placeholder={t.messagePlaceholder}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-marhaban-leaf/12 bg-marhaban-mint/45 p-4 text-sm leading-relaxed text-marhaban-ink">
                    <input
                      type="checkbox"
                      required
                      checked={formData.consent}
                      onChange={(event) => updateField('consent', event.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-marhaban-leaf/30 text-marhaban-forestDark focus:ring-marhaban-leaf/30"
                    />
                    <span>{t.consent}</span>
                  </label>
                </>
              )}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-marhaban-leaf/20 bg-white px-7 py-3 text-sm font-bold text-marhaban-ink transition hover:bg-marhaban-mint/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-2"
                >
                  {t.close}
                </button>
                {step === 2 ? (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-marhaban-leaf/20 bg-marhaban-cream px-7 py-3 text-sm font-bold text-marhaban-ink transition hover:bg-marhaban-mint/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/35 focus-visible:ring-offset-2"
                  >
                    {t.back}
                  </button>
                ) : null}
                {step === 1 ? (
                  <button
                    type="button"
                    disabled={!contactStepIsValid}
                    onClick={() => setStep(2)}
                    className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-marhaban-clay px-7 py-3 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-forestDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-clay/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {t.next}
                    <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!formData.consent}
                    className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-marhaban-clay px-7 py-3 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-forestDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-clay/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {t.submit}
                    <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
