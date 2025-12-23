'use client';

import Link from 'next/link';
import React from 'react';
import { useLanguage } from './LanguageProvider';
import { localizePath } from '@/lib/localize';

type Props = React.ComponentProps<typeof Link> & { legacyBehavior?: never };

export function LocalizedLink({ href, ...rest }: Props) {
  const { locale } = useLanguage();
  const resolvedHref = typeof href === 'string' ? localizePath(locale, href) : href;
  return <Link href={resolvedHref} {...rest} />;
}

export default LocalizedLink;
