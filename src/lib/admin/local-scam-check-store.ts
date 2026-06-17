import type { ScamCheck } from '@/types/admin';

const LOCAL_SCAM_CHECKS_KEY = 'marhaban_local_scam_checks';
const LOCAL_SCAM_CHECKS_CHANGE_EVENT = 'marhaban_local_scam_checks_change';

let cachedRaw: string | null = null;
let cached: LocalScamCheck[] = [];

export type LocalScamCheck = ScamCheck & {
  phone?: string;
  cityProvince?: string;
};

function canUseLocalStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function parse(value: string | null): LocalScamCheck[] {
  if (value === cachedRaw) return cached;

  if (!value) {
    cachedRaw = value;
    cached = [];
    return cached;
  }

  try {
    const parsed = JSON.parse(value);
    cachedRaw = value;
    cached = Array.isArray(parsed) ? (parsed as LocalScamCheck[]) : [];
    return cached;
  } catch {
    cachedRaw = value;
    cached = [];
    return [];
  }
}

function set(checks: readonly LocalScamCheck[]) {
  if (!canUseLocalStorage()) return;
  window.localStorage.setItem(LOCAL_SCAM_CHECKS_KEY, JSON.stringify(checks));
  window.dispatchEvent(new Event(LOCAL_SCAM_CHECKS_CHANGE_EVENT));
}

export function getLocalScamChecks(): LocalScamCheck[] {
  if (!canUseLocalStorage()) return [];
  return parse(window.localStorage.getItem(LOCAL_SCAM_CHECKS_KEY));
}

export function addLocalScamCheck(check: LocalScamCheck) {
  if (!canUseLocalStorage()) return check;
  const checks = getLocalScamChecks();
  set([check, ...checks]);
  return check;
}

export function updateLocalScamCheck(id: string, updates: Partial<LocalScamCheck>) {
  if (!canUseLocalStorage()) return null;

  const checks = getLocalScamChecks();
  let updated: LocalScamCheck | null = null;
  const next = checks.map((c) => {
    if (c.id !== id) return c;
    updated = { ...c, ...updates };
    return updated;
  });

  if (updated) set(next);
  return updated;
}

export function clearLocalScamChecks() {
  if (!canUseLocalStorage()) return;
  window.localStorage.removeItem(LOCAL_SCAM_CHECKS_KEY);
  window.dispatchEvent(new Event(LOCAL_SCAM_CHECKS_CHANGE_EVENT));
}

export function subscribeToLocalScamChecks(onChange: () => void) {
  if (!canUseLocalStorage()) return () => {};

  const handleStorage = (event: StorageEvent) => {
    if (event.key === LOCAL_SCAM_CHECKS_KEY) onChange();
  };

  window.addEventListener('storage', handleStorage);
  window.addEventListener(LOCAL_SCAM_CHECKS_CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(LOCAL_SCAM_CHECKS_CHANGE_EVENT, onChange);
  };
}
