'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/cn';

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
  dir: 'ltr' | 'rtl';
};

const inputClass =
  'w-full rounded-2xl border border-marhaban-leaf/18 bg-[#FFFCF7] px-4 py-3.5 text-sm text-marhaban-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] placeholder:text-marhaban-muted focus:border-marhaban-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-marhaban-gold/24 transition';
const labelClass = 'block text-sm font-bold text-marhaban-ink mb-2';

export function ReserveForm({ texts, dir }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [city, setCity] = useState('');
  const [need, setNeed] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
        setSubmitted(true);
      } else {
        setError(texts.errorText);
      }
    } catch {
      setError(texts.errorText);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-marhaban-leaf/15 bg-marhaban-mint/75 p-8 shadow-warm-sm">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-marhaban-leaf shadow-warm-sm">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </div>
        <p className="mt-5 max-w-xl text-base font-semibold text-marhaban-ink">{texts.confirmation}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" dir={dir}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="reserve-name" className={labelClass}>{texts.form.name}</label>
          <input
            id="reserve-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            autoComplete="given-name"
          />
        </div>

        <div>
          <label htmlFor="reserve-email" className={labelClass}>{texts.form.email}</label>
          <input
            id="reserve-email"
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
          <label htmlFor="reserve-status" className={labelClass}>{texts.form.status}</label>
          <select
            id="reserve-status"
            required
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={cn(inputClass, 'cursor-pointer')}
          >
            <option value="" disabled />
            {statusOptions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="reserve-city" className={labelClass}>{texts.form.city}</label>
          <input
            id="reserve-city"
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={inputClass}
            autoComplete="address-level2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="reserve-need" className={labelClass}>{texts.form.need}</label>
        <textarea
          id="reserve-need"
          rows={4}
          required
          value={need}
          onChange={(e) => setNeed(e.target.value)}
          placeholder={texts.form.needPlaceholder}
          className={cn(inputClass, 'resize-none')}
        />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-marhaban-forestDark px-6 py-3 text-sm font-bold text-white shadow-[0_18px_48px_rgba(8,42,36,0.22)] transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-gold/45 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? '…' : texts.form.submit}
        <ArrowRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
      </button>
    </form>
  );
}
