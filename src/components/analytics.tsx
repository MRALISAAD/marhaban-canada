'use client';

// Analytics and cookie banner disabled: only essential cookie (locale) is used.
// Keep exports to avoid breaking imports, but render nothing and track nothing.

export function GoogleAnalytics() {
  return null;
}

export function CookieBanner() {
  return null;
}

export function track() {
  // no-op
}

