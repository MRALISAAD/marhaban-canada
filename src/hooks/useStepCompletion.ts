'use client';

import { useCallback, useMemo, useState } from 'react';

const storageKey = 'mc_checkedSteps';

type CheckedMap = Record<string, boolean>;

function readStorage(): CheckedMap {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as CheckedMap;
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed;
  } catch {
    return {};
  }
}

function writeStorage(map: CheckedMap) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(map));
  } catch {
    // ignore write errors
  }
}

export function useStepCompletion(stepId: string) {
  const [checkedMap, setCheckedMap] = useState<CheckedMap>(() => readStorage());

  const checked = useMemo(() => !!checkedMap[stepId], [checkedMap, stepId]);

  const setChecked = useCallback((value: boolean) => {
    setCheckedMap((prev) => {
      const next = { ...prev, [stepId]: value };
      writeStorage(next);
      return next;
    });
  }, [stepId]);

  const toggle = useCallback(() => {
    setCheckedMap((prev) => {
      const next = { ...prev, [stepId]: !prev[stepId] };
      writeStorage(next);
      return next;
    });
  }, [stepId]);

  return { checked, toggle, setChecked };
}
