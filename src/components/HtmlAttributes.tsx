'use client';

import { useEffect } from 'react';

type HtmlAttributesProps = {
  lang: string;
  dir: 'ltr' | 'rtl';
};

/**
 * Sets lang and dir attributes on the root <html> element
 * This is needed because Next.js App Router only allows one root layout with <html>
 */
export function HtmlAttributes({ lang, dir }: HtmlAttributesProps) {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', dir);

    // Ajoute une classe utilitaire RTL sur le body pour les ajustements CSS fins
    if (dir === 'rtl') {
      body.classList.add('rtl');
    } else {
      body.classList.remove('rtl');
    }
  }, [lang, dir]);

  return null;
}

