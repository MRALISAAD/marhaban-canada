'use client';

import { useCallback } from 'react';
import { useLocalStorageState } from '@/lib/useLocalStorageState';

type ChecklistStorage = {
  checked: Record<string, boolean>;
  lastVisit?: string;
};

function isValidStorage(value: ChecklistStorage) {
  if (!value || typeof value !== 'object') return false;
  if (!value.checked || typeof value.checked !== 'object') return false;
  return Object.values(value.checked).every((entry) => typeof entry === 'boolean');
}

export function useChecklistStorage(storageKey: string) {
  const parse = useCallback((value: string) => JSON.parse(value) as ChecklistStorage, []);
  const serialize = useCallback((value: ChecklistStorage) => JSON.stringify(value), []);

  const [storage, setStorage] = useLocalStorageState<ChecklistStorage>(storageKey, {
    defaultValue: { checked: {}, lastVisit: undefined },
    parse,
    serialize,
    validate: isValidStorage,
  });

  const setChecked = useCallback(
    (updater: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)) => {
      setStorage((prev) => {
        const prevChecked = prev?.checked ?? {};
        const nextChecked = typeof updater === 'function' ? updater(prevChecked) : updater;
        return {
          checked: nextChecked,
          lastVisit: new Date().toISOString(),
        };
      });
    },
    [setStorage],
  );

  const toggleItem = useCallback(
    (id: string) => {
      setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
    },
    [setChecked],
  );

  const resetChecklist = useCallback(() => {
    setStorage({ checked: {}, lastVisit: new Date().toISOString() });
  }, [setStorage]);

  const touch = useCallback(() => {
    setStorage((prev) => ({
      checked: prev?.checked ?? {},
      lastVisit: new Date().toISOString(),
    }));
  }, [setStorage]);

  return {
    checked: storage.checked ?? {},
    lastVisit: storage.lastVisit,
    setChecked,
    toggleItem,
    resetChecklist,
    touch,
  };
}
