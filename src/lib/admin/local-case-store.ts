import type { CaseFile } from '@/types/admin';

const LOCAL_CASES_KEY = 'marhaban_local_cases';
const LOCAL_CASES_CHANGE_EVENT = 'marhaban_local_cases_change';

let cachedRawCases: string | null = null;
let cachedCases: LocalCase[] = [];

export type CasePriority = 'low' | 'normal' | 'high';

export type LocalCase = CaseFile & {
  phone?: string;
  sourceBookingId?: string;
  situation?: string;
  priority: CasePriority;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

function canUseLocalStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function parseCases(value: string | null): LocalCase[] {
  if (value === cachedRawCases) return cachedCases;

  if (!value) {
    cachedRawCases = value;
    cachedCases = [];
    return cachedCases;
  }

  try {
    const parsed = JSON.parse(value);
    cachedRawCases = value;
    cachedCases = Array.isArray(parsed) ? (parsed as LocalCase[]) : [];
    return cachedCases;
  } catch {
    cachedRawCases = value;
    cachedCases = [];
    return cachedCases;
  }
}

function setLocalCases(cases: readonly LocalCase[]) {
  if (!canUseLocalStorage()) return;
  window.localStorage.setItem(LOCAL_CASES_KEY, JSON.stringify(cases));
  window.dispatchEvent(new Event(LOCAL_CASES_CHANGE_EVENT));
}

export function getLocalCases(): LocalCase[] {
  if (!canUseLocalStorage()) return [];
  return parseCases(window.localStorage.getItem(LOCAL_CASES_KEY));
}

export function addLocalCase(data: LocalCase) {
  if (!canUseLocalStorage()) return data;

  const cases = getLocalCases();
  const existingCase = cases.find((caseFile) => {
    const sourceBookingId = data.sourceBookingId ?? data.bookingId;
    return sourceBookingId && (caseFile.sourceBookingId === sourceBookingId || caseFile.bookingId === sourceBookingId);
  });

  if (existingCase) return existingCase;

  setLocalCases([data, ...cases]);
  return data;
}

export function updateLocalCase(id: string, updates: Partial<LocalCase>) {
  if (!canUseLocalStorage()) return null;

  const cases = getLocalCases();
  let updatedCase: LocalCase | null = null;
  const nextCases = cases.map((caseFile) => {
    if (caseFile.id !== id) return caseFile;
    updatedCase = { ...caseFile, ...updates, updatedAt: new Date().toISOString() };
    return updatedCase;
  });

  if (updatedCase) setLocalCases(nextCases);
  return updatedCase;
}

export function clearLocalCases() {
  if (!canUseLocalStorage()) return;
  window.localStorage.removeItem(LOCAL_CASES_KEY);
  window.dispatchEvent(new Event(LOCAL_CASES_CHANGE_EVENT));
}

export function subscribeToLocalCases(onChange: () => void) {
  if (!canUseLocalStorage()) return () => {};

  const handleStorage = (event: StorageEvent) => {
    if (event.key === LOCAL_CASES_KEY) onChange();
  };

  window.addEventListener('storage', handleStorage);
  window.addEventListener(LOCAL_CASES_CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(LOCAL_CASES_CHANGE_EVENT, onChange);
  };
}
