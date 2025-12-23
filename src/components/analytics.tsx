'use client';

import Script from 'next/script';
import { useSyncExternalStore, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';
const CONSENT_KEY = 'mc_cookie_consent';

type ConsentStatus = 'accepted' | 'rejected' | null;

// ─────────────────────────────────────────────────────────────────────────────
// Consent store (external state)
// ─────────────────────────────────────────────────────────────────────────────

let listeners: Array<() => void> = [];

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getConsentSnapshot(): ConsentStatus {
  if (typeof window === 'undefined') return null;
  const value = localStorage.getItem(CONSENT_KEY);
  if (value === 'accepted' || value === 'rejected') return value;
  return null;
}

function getServerSnapshot(): ConsentStatus {
  return null;
}

function setConsent(status: 'accepted' | 'rejected') {
  localStorage.setItem(CONSENT_KEY, status);
  emitChange();
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook to read consent
// ─────────────────────────────────────────────────────────────────────────────

function useConsent(): ConsentStatus {
  return useSyncExternalStore(subscribe, getConsentSnapshot, getServerSnapshot);
}

// ─────────────────────────────────────────────────────────────────────────────
// Track helper (no-op if no consent or gtag absent)
// ─────────────────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Track a custom event to GA4.
 * No-op if consent not given or gtag is not loaded.
 */
export function track(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  if (getConsentSnapshot() !== 'accepted') return;
  if (typeof window.gtag !== 'function') return;

  window.gtag('event', eventName, params);
}

// ─────────────────────────────────────────────────────────────────────────────
// CookieBanner component
// ─────────────────────────────────────────────────────────────────────────────

export function CookieBanner() {
  const consent = useConsent();

  const handleAccept = useCallback(() => {
    setConsent('accepted');
    window.location.reload();
  }, []);

  const handleReject = useCallback(() => {
    setConsent('rejected');
  }, []);

  // Hide if choice already made
  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
        <h2
          id="cookie-banner-title"
          className="text-base font-semibold text-slate-900"
        >
          Cookies et analyse
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Nous utilisons des cookies pour analyser l&apos;utilisation du site et
          améliorer votre expérience. Vos données sont anonymisées.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleAccept}
            className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            Accepter
          </button>
          <button
            type="button"
            onClick={handleReject}
            className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            Refuser
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GoogleAnalytics component
// ─────────────────────────────────────────────────────────────────────────────

export function GoogleAnalytics() {
  const consent = useConsent();

  // Don't render if no GA_ID or no consent
  if (!GA_ID || consent !== 'accepted') return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}

