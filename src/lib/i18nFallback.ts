type AnyObj = Record<string, unknown>;

function isPlainObject(value: unknown): value is AnyObj {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Deep merge with fallback: prefer primary, otherwise use fallback.
 * Arrays are not merged: primary array wins when present, else fallback array.
 */
export function mergeWithFallback<T>(primary: Partial<T>, fallback: T): T {
  if (!isPlainObject(primary) || !isPlainObject(fallback)) {
    return (primary ?? fallback) as T;
  }

  const result: AnyObj = { ...fallback };

  for (const key of Object.keys(primary)) {
    const pVal = (primary as AnyObj)[key];
    const fVal = (fallback as AnyObj)[key];

    if (pVal === undefined) {
      result[key] = fVal;
      continue;
    }

    if (isPlainObject(pVal) && isPlainObject(fVal)) {
      result[key] = mergeWithFallback(pVal, fVal);
    } else {
      result[key] = pVal;
    }
  }

  return result as T;
}

export function withFallback<T>(value: T | undefined, fallback: T): T {
  return value ?? fallback;
}

