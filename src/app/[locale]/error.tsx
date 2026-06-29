'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { PageCard } from '@/components/ui/PageCard';
import LocalizedLink from '@/components/LocalizedLink';

// Fallback translations for error page
const errorLabels = {
  fr: {
    title: 'Une erreur est survenue',
    message: 'Désolé, une erreur inattendue s\'est produite. Veuillez réessayer.',
    cta: 'Retour à l\'accueil',
    tryAgain: 'Réessayer',
  },
  en: {
    title: 'An error occurred',
    message: 'Sorry, an unexpected error occurred. Please try again.',
    cta: 'Back to Home',
    tryAgain: 'Try Again',
  },
  ar: {
    title: 'حدث خطأ',
    message: 'عذرًا، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
    cta: 'العودة إلى الصفحة الرئيسية',
    tryAgain: 'حاول مرة أخرى',
  },
};

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  const { locale } = useLanguage();
  const labels = errorLabels[locale] || errorLabels.fr;

  useEffect(() => {
    // Log error to console for debugging
    console.error('Application error:', error);
  }, [error]);

  return (
    <main className="gov-container py-12">
      <PageCard className="max-w-xl mx-auto text-center space-y-8">
        <p className="gov-meta">500</p>
        <h1 className="gov-heading gov-heading--dark text-3xl">{labels.title}</h1>
        <p className="gov-text">{labels.message}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <LocalizedLink href="/" className="btn-secondary">
            {labels.cta}
          </LocalizedLink>
          <button
            onClick={reset}
            className="btn-primary"
            aria-label={
              locale === 'fr'
                ? `${labels.tryAgain}, réessayer de charger la page`
                : locale === 'en'
                  ? `${labels.tryAgain}, retry loading the page`
                  : `${labels.tryAgain}، إعادة محاولة تحميل الصفحة`
            }
          >
            {labels.tryAgain}
          </button>
        </div>
      </PageCard>
    </main>
  );
}

