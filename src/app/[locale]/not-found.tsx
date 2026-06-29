'use client';

import { useLanguage } from "@/components/LanguageProvider";
import { PageCard } from "@/components/ui/PageCard";
import LocalizedLink from "@/components/LocalizedLink";

// Fallback pour les traductions manquantes
const errorLabels = {
  fr: {
    title: 'Page introuvable',
    message: 'Désolé, cette page n\'existe pas ou a été déplacée.',
    cta: 'Retour à l\'accueil',
    checklist: 'Voir la checklist',
    sources: 'Sources officielles',
  },
  en: {
    title: 'Page Not Found',
    message: 'Sorry, this page does not exist or has been moved.',
    cta: 'Back to Home',
    checklist: 'View Checklist',
    sources: 'Official Sources',
  },
  ar: {
    title: 'الصفحة غير موجودة',
    message: 'عذرًا، هذه الصفحة غير موجودة أو تم نقلها.',
    cta: 'العودة إلى الصفحة الرئيسية',
    checklist: 'عرض قائمة التحقق',
    sources: 'مصادر رسمية',
  },
};

export default function NotFoundPage() {
  const { locale } = useLanguage();
  const labels = errorLabels[locale] || errorLabels.fr;

  return (
    <main className="gov-container py-12">
      <PageCard className="max-w-xl mx-auto text-center space-y-8">
        <p className="gov-meta">404</p>
        <h1 className="gov-heading gov-heading--dark text-3xl">{labels.title}</h1>
        <p className="gov-text">{labels.message}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <LocalizedLink href="/" className="btn-secondary">
            {labels.cta}
          </LocalizedLink>
          <LocalizedLink href="/checklist" className="btn-primary">
            {labels.checklist}
          </LocalizedLink>
        </div>
      </PageCard>
    </main>
  );
}
