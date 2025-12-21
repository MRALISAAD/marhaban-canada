'use client';

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { PageCard } from "@/components/ui/PageCard";

export default function NotFoundPage() {
  const { content } = useLanguage();

  return (
    <main className="gov-container py-24">
      <PageCard className="max-w-xl mx-auto text-center space-y-8">
        <p className="gov-meta">404</p>
        <h1 className="gov-heading gov-heading--dark text-3xl">Page introuvable</h1>
        <p className="gov-text">{content.shared.disclaimer}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-secondary">
            Retour à l’accueil
          </Link>
        <Link href="/#checklist" className="btn-primary">
            Voir les 5 étapes
          </Link>
          <Link href="/sources" className="btn-secondary">
            Sources officielles
          </Link>
        </div>
      </PageCard>
    </main>
  );
}
