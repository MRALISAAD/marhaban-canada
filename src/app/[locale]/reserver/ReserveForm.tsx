'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { bookingThankYouPath } from '@/lib/routes';
import type { Locale } from '@/i18n/locales';

type FormTexts = {
  name: string;
  email: string;
  phone: string;
  status: string;
  statusPlaceholder: string;
  statusOptions: Record<string, string>;
  city: string;
  service: string;
  serviceHint: string;
  urgency: string;
  urgencyHint: string;
  urgencyOptions?: Record<string, string>;
  language: string;
  languageHint: string;
  languageOptions?: Record<string, string>;
  need: string;
  needPlaceholder: string;
  consent: string;
  submit: string;
};

export type ReserveTexts = {
  form: FormTexts;
  confirmation: string;
  errorText: string;
};

type SelectOption = {
  value: string;
  label: string;
};

export type ReserveFormExtras = {
  serviceLabel: string;
  serviceOptions: readonly SelectOption[];
  phoneLabel: string;
  urgencyLabel: string;
  urgencyOptions: readonly SelectOption[];
  urgencyHint: string;
  languageLabel: string;
  languageOptions: readonly SelectOption[];
  languageHint: string;
  consentLabel: string;
  serviceHint: string;
  callout: string;
};

type Props = {
  texts: ReserveTexts;
  extras: ReserveFormExtras;
  locale: Locale;
  dir: 'ltr' | 'rtl';
};

const inputClass =
  'w-full rounded-2xl border border-marhaban-leaf/18 bg-offwhite px-4 py-3.5 text-base text-marhaban-ink placeholder:text-marhaban-muted focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20 transition';
const labelClass = 'mb-2 block text-sm font-semibold text-marhaban-ink sm:text-base';

export function ReserveForm({ texts, extras, locale, dir }: Props) {
  const router = useRouter();
  const [service, setService] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [city, setCity] = useState('');
  const [need, setNeed] = useState('');
  const [urgency, setUrgency] = useState('');
  const [language, setLanguage] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const statusOptions = Object.entries(texts.form.statusOptions);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service, name, email, phone, status, city, need, urgency, language, consent }),
      });
      if (res.ok) {
        router.push(bookingThankYouPath(locale));
        return;
      }
      setError(texts.errorText);
    } catch {
      setError(texts.errorText);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" dir={dir}>
      <div className="rounded-3xl border border-marhaban-leaf/12 bg-marhaban-mint/55 p-4 text-sm leading-relaxed text-marhaban-ink">
        {extras.callout}
      </div>

      <div>
        <label htmlFor="reserve-service" className={labelClass}>{extras.serviceLabel}</label>
        <select
          id="reserve-service"
          required
          value={service}
          onChange={(e) => setService(e.target.value)}
          className={cn(inputClass, 'cursor-pointer')}
        >
          <option value="" disabled>{extras.serviceHint}</option>
          {extras.serviceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="reserve-name" className={labelClass}>{texts.form.name}</label>
          <input id="reserve-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} autoComplete="given-name" />
        </div>
        <div>
          <label htmlFor="reserve-email" className={labelClass}>{texts.form.email}</label>
          <input id="reserve-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} autoComplete="email" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="reserve-phone" className={labelClass}>{extras.phoneLabel}</label>
          <input
            id="reserve-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            autoComplete="tel"
          />
        </div>
        <div>
          <label htmlFor="reserve-status" className={labelClass}>{texts.form.status}</label>
          <select id="reserve-status" required value={status} onChange={(e) => setStatus(e.target.value)} className={cn(inputClass, 'cursor-pointer')}>
            <option value="" disabled>{texts.form.statusPlaceholder}</option>
            {statusOptions.map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="reserve-city" className={labelClass}>{texts.form.city}</label>
        <input id="reserve-city" type="text" required value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} autoComplete="address-level2" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="reserve-urgency" className={labelClass}>{extras.urgencyLabel}</label>
          <select
            id="reserve-urgency"
            required
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            className={cn(inputClass, 'cursor-pointer')}
          >
            <option value="" disabled>{extras.urgencyHint}</option>
            {extras.urgencyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="reserve-language" className={labelClass}>{extras.languageLabel}</label>
          <select
            id="reserve-language"
            required
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={cn(inputClass, 'cursor-pointer')}
          >
            <option value="" disabled>{extras.languageHint}</option>
            {extras.languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="reserve-need" className={labelClass}>{texts.form.need}</label>
        <textarea id="reserve-need" rows={4} required value={need} onChange={(e) => setNeed(e.target.value)} placeholder={texts.form.needPlaceholder} className={cn(inputClass, 'resize-none')} />
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-3xl border border-marhaban-leaf/12 bg-white/88 p-4 text-sm leading-relaxed text-marhaban-ink shadow-warm-sm">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-1 h-4 w-4 rounded border-marhaban-leaf/30 text-marhaban-forestDark focus:ring-marhaban-leaf/30"
        />
        <span>{texts.form.consent || extras.consentLabel}</span>
      </label>

      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-marhaban-forestDark px-6 py-3 text-base font-semibold text-white shadow-warm-sm transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? '…' : texts.form.submit}
        <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
      </button>

      <p className="text-sm leading-relaxed text-marhaban-muted">{texts.confirmation}</p>
    </form>
  );
}
