'use client';

import Script from 'next/script';
import { useSyncExternalStore, useCallback } from 'react';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();

  const handleAccept = useCallback(() => {
    setConsent('accepted');
    window.location.reload();
  }, []);

  const handleReject = useCallback(() => {
    setConsent('rejected');
  }, []);

  // Hide if choice already made
  if (consent !== null) return null;

  // On the booking form page, always use compact corner position (never full-width)
  // to avoid blocking form inputs or the submit button
  const isFormPage = pathname?.includes('/reserver/formulaire') ?? false;
  const positionClass = isFormPage
    ? 'fixed bottom-4 right-4 z-[45] max-w-[280px]'
    : 'fixed bottom-3 left-3 right-3 z-[45] sm:bottom-5 sm:left-auto sm:right-5 sm:max-w-sm';

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      className={positionClass}
    >
      <div className="rounded-2xl border border-marhaban-leaf/15 bg-marhaban-cream/96 px-4 py-3 shadow-warm-sm backdrop-blur-sm sm:px-5 sm:py-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p
            id="cookie-banner-title"
            className="text-sm font-semibold text-marhaban-ink"
          >
            Cookies &amp; analyse
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleReject}
              className="rounded-lg border border-marhaban-leaf/20 bg-white px-3 py-1.5 text-xs font-semibold text-marhaban-muted transition hover:bg-marhaban-mint/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-1"
            >
              Refuser
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="rounded-lg bg-marhaban-forestDark px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-marhaban-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marhaban-leaf/40 focus-visible:ring-offset-1"
            >
              Accepter
            </button>
          </div>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-marhaban-muted">
          Données anonymisées, analyse d&apos;utilisation uniquement.
        </p>
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

