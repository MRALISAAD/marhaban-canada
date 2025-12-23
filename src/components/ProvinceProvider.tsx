'use client';

import { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorageState } from '@/lib/useLocalStorageState';

export type Province = 'qc' | 'on' | 'bc' | 'ab' | 'other';

export const provinceOptions: { value: Province; label: string }[] = [
  { value: 'qc', label: 'Quebec' },
  { value: 'on', label: 'Ontario' },
  { value: 'bc', label: 'Colombie-Britannique' },
  { value: 'ab', label: 'Alberta' },
  { value: 'other', label: 'Autre province' },
];

type ProvinceContextValue = {
  province: Province;
  setProvince: (value: Province) => void;
};

const ProvinceContext = createContext<ProvinceContextValue>({
  province: 'other',
  setProvince: () => {},
});

export function ProvinceProvider({ children }: { children: React.ReactNode }) {
  const [province, setProvince] = useLocalStorageState<Province>('mc_province', {
    defaultValue: 'other',
    parse: (value) => value as Province,
    serialize: (value) => value,
    validate: (value) => provinceOptions.some((option) => option.value === value),
  });

  const setProvinceValue = useCallback((value: Province) => {
    setProvince(value);
  }, [setProvince]);

  const value = useMemo(
    () => ({
      province,
      setProvince: setProvinceValue,
    }),
    [province, setProvinceValue],
  );

  return <ProvinceContext.Provider value={value}>{children}</ProvinceContext.Provider>;
}

export function useProvince() {
  return useContext(ProvinceContext);
}
