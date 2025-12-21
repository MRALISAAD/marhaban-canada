'use client';

import { useCallback, useRef, useSyncExternalStore } from 'react';

const LOCAL_STORAGE_EVENT = 'local-storage-change';

type LocalStorageOptions<T> = {
  defaultValue: T;
  parse: (value: string) => T;
  serialize: (value: T) => string;
  validate?: (value: T) => boolean;
};

const subscribe = (key: string, callback: () => void) => {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handler = (event: StorageEvent | CustomEvent<{ key?: string }>) => {
    if ('key' in event) {
      if (event.key !== key) return;
    } else if (event.detail?.key !== key) {
      return;
    }
    callback();
  };

  window.addEventListener('storage', handler);
  window.addEventListener(LOCAL_STORAGE_EVENT, handler as EventListener);

  return () => {
    window.removeEventListener('storage', handler);
    window.removeEventListener(LOCAL_STORAGE_EVENT, handler as EventListener);
  };
};

export function useLocalStorageState<T>(key: string, options: LocalStorageOptions<T>) {
  const { defaultValue, parse, serialize, validate } = options;
  const defaultRef = useRef(defaultValue);
  const lastRawRef = useRef<string | null>(null);
  const lastValueRef = useRef<T>(defaultValue);

  const read = useCallback(() => {
    if (typeof window === 'undefined') {
      return defaultRef.current;
    }
    const raw = window.localStorage.getItem(key);
    if (raw === null) {
      lastRawRef.current = null;
      lastValueRef.current = defaultRef.current;
      return defaultRef.current;
    }
    if (raw === lastRawRef.current) {
      return lastValueRef.current;
    }
    try {
      const parsed = parse(raw);
      if (validate && !validate(parsed)) {
        lastRawRef.current = raw;
        lastValueRef.current = defaultRef.current;
        return defaultRef.current;
      }
      lastRawRef.current = raw;
      lastValueRef.current = parsed;
      return parsed;
    } catch {
      lastRawRef.current = raw;
      lastValueRef.current = defaultRef.current;
      return defaultRef.current;
    }
  }, [key, parse, validate]);

  const value = useSyncExternalStore((callback) => subscribe(key, callback), read, () => defaultRef.current);

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      if (typeof window === 'undefined') return;
      const current = read();
      const valueToStore = typeof next === 'function' ? (next as (prev: T) => T)(current) : next;
      const raw = serialize(valueToStore);
      window.localStorage.setItem(key, raw);
      lastRawRef.current = raw;
      lastValueRef.current = valueToStore;
      window.dispatchEvent(new CustomEvent(LOCAL_STORAGE_EVENT, { detail: { key } }));
    },
    [key, read, serialize],
  );

  const removeValue = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(key);
    lastRawRef.current = null;
    lastValueRef.current = defaultRef.current;
    window.dispatchEvent(new CustomEvent(LOCAL_STORAGE_EVENT, { detail: { key } }));
  }, [key]);

  return [value, setValue, removeValue] as const;
}
