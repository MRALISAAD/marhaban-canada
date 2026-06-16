'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';
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
  'w-full rounded-2xl border border-marhaban-leaf/20 bg-white/90 px-4 py-3 text-sm text-marhaban-ink placeholder:text-marhaban-muted focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20 transition';
const labelClass = 'block text-sm font-semibold text-marhaban-ink mb-1.5';

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
        <CheckCircle2 className="h-10 w-10 text-marhaban-leaf" aria-hidden="true" />
        <p className="mt-4 text-base font-semibold text-marhaban-ink">{texts.confirmation}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" dir={dir}>
      <div>
        <label className={labelClass}>{texts.form.name}</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          autoComplete="given-name"
        />
      </div>

      <div>
        <label className={labelClass}>{texts.form.email}</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          autoComplete="email"
        />
      </div>

      <div>
        <label className={labelClass}>{texts.form.status}</label>
        <select
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
        <label className={labelClass}>{texts.form.city}</label>
        <input
          type="text"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={inputClass}
          autoComplete="address-level2"
        />
      </div>

      <div>
        <label className={labelClass}>{texts.form.need}</label>
        <textarea
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
        className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full bg-marhaban-ink px-6 py-3 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-2 disabled:opacity-60 sm:w-auto"
      >
        {submitting ? '…' : texts.form.submit}
      </button>
    </form>
  );
}
