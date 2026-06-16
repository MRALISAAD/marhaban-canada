'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import {
  Info,
  FileText,
  Mail,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  HelpCircle,
  Settings,
  Home,
  List,
  ShieldCheck,
  Users,
  BookOpen,
  MapPin,
  CreditCard,
  Phone,
  Building,
  Globe,
  Link2,
} from 'lucide-react';

type SectionBlockProps = {
  title: string;
  icon?: string;
  children: React.ReactNode;
  className?: string;
  dir?: 'ltr' | 'rtl';
  id?: string;
};

/**
 * Standardized section block component
 * - Consistent spacing and styling
 * - Supports icon and title
 * - RTL-aware
 */
export function SectionBlock({
  title,
  icon,
  children,
  className,
  dir = 'ltr',
  id,
}: SectionBlockProps) {
  const isRTL = dir === 'rtl';
  const alignClass = isRTL ? 'text-right' : 'text-left';

  // Map icon names to components
  const iconMap: Record<string, typeof Info> = {
    Info,
    FileText,
    Mail,
    Shield,
    AlertTriangle,
    CheckCircle,
    XCircle,
    HelpCircle,
    Settings,
    Home,
    List,
    ShieldCheck,
    Users,
    BookOpen,
    MapPin,
    CreditCard,
    Phone,
    Building,
    Globe,
    Link: Link2,
  };

  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <section
      id={id}
      className={cn(
        'rounded-3xl border border-marhaban-leaf/12 bg-white/90 p-6 shadow-warm-sm',
        className
      )}
      dir={dir}
    >
      <div className="flex items-start gap-3">
        {IconComponent && (
          <span className="mt-1 flex-shrink-0 rounded-2xl border border-marhaban-leaf/15 bg-marhaban-mint p-2.5">
            <IconComponent className="h-4 w-4 text-marhaban-leaf" />
          </span>
        )}
        <div className="flex-1">
          <h2 className={cn('text-xl font-semibold text-marhaban-ink', alignClass)}>{title}</h2>
          <div className={cn('mt-4', alignClass)}>{children}</div>
        </div>
      </div>
    </section>
  );
}

