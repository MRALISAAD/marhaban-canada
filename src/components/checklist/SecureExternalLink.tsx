'use client';

import { ExternalLink } from 'lucide-react';

type SecureExternalLinkProps = {
  href: string;
  label: string;
};

export function SecureExternalLink({ href, label }: SecureExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      referrerPolicy="no-referrer"
      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 hover:text-slate-900"
      aria-label={label}
    >
      {label}
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}
