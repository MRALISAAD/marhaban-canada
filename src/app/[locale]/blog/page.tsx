import React from 'react';
import type { Metadata } from 'next';
import { BlogIndexContent } from '@/components/blog/BlogIndexContent';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: 'Blog — Comprendre avant d\'agir | Marhaban Canada',
    en: 'Blog — Understand before acting | Marhaban Canada',
    ar: 'المدونة — افهم قبل أن تتصرف | Marhaban Canada',
  };

  const descriptions: Record<string, string> = {
    fr: 'Des articles courts pour aider les nouveaux arrivants au Canada à éviter les erreurs courantes.',
    en: 'Short articles to help newcomers to Canada avoid common mistakes.',
    ar: 'مقالات قصيرة لمساعدة القادمين الجدد إلى كندا على تجنب الأخطاء الشائعة.',
  };

  return {
    title: titles[locale] || titles.fr,
    description: descriptions[locale] || descriptions.fr,
    openGraph: {
      title: titles[locale] || titles.fr,
      description: descriptions[locale] || descriptions.fr,
      type: 'website',
    },
  };
}

export default function BlogPage() {
  return (
    <React.Suspense fallback={<div />}> 
      <BlogIndexContent />
    </React.Suspense>
  );
}
