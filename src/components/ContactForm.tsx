'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/cn';

type ContactFormProps = {
  labels: {
    formName: string;
    formEmail: string;
    formMessage: string;
    formTopic: string;
    formTopicOptions: readonly { value: string; label: string }[];
    formSubmit: string;
    formSuccess: string;
    formError: string;
    formNeed?: string;
    formNeedOptions?: readonly { value: string; label: string }[];
    formOffer?: string;
    formOfferOptions?: readonly { value: string; label: string }[];
  };
  dir?: 'ltr' | 'rtl';
};

export function ContactForm({ labels, dir = 'ltr' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    topic: 'general',
    need: labels.formNeedOptions?.[0]?.value ?? 'arrival',
    offer: labels.formOfferOptions?.[0]?.value ?? 'discovery',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const isRTL = dir === 'rtl';
  const alignClass = isRTL ? 'text-right' : 'text-left';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          message: '',
          topic: 'general',
          need: labels.formNeedOptions?.[0]?.value ?? 'arrival',
          offer: labels.formOfferOptions?.[0]?.value ?? 'discovery',
        });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" dir={dir}>
      <div>
        <label htmlFor="name" className={cn('block text-sm font-medium text-slate-900 mb-1', alignClass)}>
          {labels.formName}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
          dir={dir}
        />
      </div>

      <div>
        <label htmlFor="email" className={cn('block text-sm font-medium text-slate-900 mb-1', alignClass)}>
          {labels.formEmail}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
          dir={dir}
        />
      </div>

      <div>
        <label htmlFor="topic" className={cn('block text-sm font-medium text-slate-900 mb-1', alignClass)}>
          {labels.formTopic}
        </label>
        <select
          id="topic"
          name="topic"
          value={formData.topic}
          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
          dir={dir}
        >
          {labels.formTopicOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {labels.formNeed && labels.formNeedOptions && (
        <div>
          <label htmlFor="need" className={cn('block text-sm font-medium text-slate-900 mb-1', alignClass)}>
            {labels.formNeed}
          </label>
          <select
            id="need"
            name="need"
            value={formData.need}
            onChange={(e) => setFormData({ ...formData, need: e.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
            dir={dir}
          >
            {labels.formNeedOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {labels.formOffer && labels.formOfferOptions && (
        <div>
          <label htmlFor="offer" className={cn('block text-sm font-medium text-slate-900 mb-1', alignClass)}>
            {labels.formOffer}
          </label>
          <select
            id="offer"
            name="offer"
            value={formData.offer}
            onChange={(e) => setFormData({ ...formData, offer: e.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
            dir={dir}
          >
            {labels.formOfferOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="message" className={cn('block text-sm font-medium text-slate-900 mb-1', alignClass)}>
          {labels.formMessage}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
          dir={dir}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/40 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? '...' : labels.formSubmit}
      </button>

      {status === 'success' && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          {labels.formSuccess}
        </div>
      )}

      {status === 'error' && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {labels.formError}
        </div>
      )}
    </form>
  );
}

