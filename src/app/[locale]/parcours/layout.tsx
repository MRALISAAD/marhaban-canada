import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { isLocale } from '@/i18n/locales';

/**
 * Layout spécifique pour les pages Parcours
 * 
 * Dans Next.js, les layouts s'imbriquent. Ce layout s'ajoute au layout parent,
 * qui gère déjà le Navbar et le Footer.
 * 
 * Ce layout minimal permet uniquement d'encapsuler les pages Parcours.
 */
export default async function ParcoursLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  // Layout minimal - le Navbar et Footer sont gérés par le layout parent
  return <>{children}</>;
}

