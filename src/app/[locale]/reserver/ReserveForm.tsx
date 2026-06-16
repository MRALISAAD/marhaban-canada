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
  status: string;
  statusOptions: Record<string, string>;
  city: string;
  need: string;
  needPlaceholder: string;
  submit: string;
};

export type ReserveTexts = {
  form: FormTexts;
  confirmation: string;
  errorText: string;
};

type Props = {
  texts: ReserveTexts;
  locale: Locale;
  dir: 'ltr' | 'rtl';
};

const inputClass =
  'w-full rounded-2xl border border-marhaban-leaf/18 bg-offwhite px-4 py-3.5 text-base text-marhaban-ink placeholder:text-marhaban-muted focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20 transition';
const labelClass = 'mb-2 block text-base font-semibold text-marhaban-ink';

export function ReserveForm({ texts, locale, dir }: Props) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [city, setCity] = useState('');
  const [need, setNeed] = useState('');
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
        body: JSON.stringify({ name, email, status, city, need }),
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
    <form onSubmit={handleSubmit} className="grid gap-5" dir={dir} noValidate>
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
          <label htmlFor="reserve-status" className={labelClass}>{texts.form.status}</label>
          <select id="reserve-status" required value={status} onChange={(e) => setStatus(e.target.value)} className={cn(inputClass, 'cursor-pointer')}>
            <option value="" disabled />
            {statusOptions.map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="reserve-city" className={labelClass}>{texts.form.city}</label>
          <input id="reserve-city" type="text" required value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} autoComplete="address-level2" />
        </div>
      </div>

      <div>
        <label htmlFor="reserve-need" className={labelClass}>{texts.form.need}</label>
        <textarea id="reserve-need" rows={4} required value={need} onChange={(e) => setNeed(e.target.value)} placeholder={texts.form.needPlaceholder} className={cn(inputClass, 'resize-none')} />
      </div>

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

      <p className="text-sm leading-relaxed text-marhaban-ink/65">{texts.confirmation}</p>
    </form>
  );
}
