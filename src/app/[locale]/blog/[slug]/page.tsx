import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { blogPosts, getBlogPostBySlug } from '@/content/blog';
import { BlogPostContent } from '@/components/blog/BlogPostContent';
import { LOCALES } from '@/i18n/locales';

export function generateStaticParams() {
  // Generate params for every supported locale + slug
  return LOCALES.flatMap((locale) => blogPosts.map((post) => ({ locale, slug: post.slug })));
}

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article non trouvé | Marhaban Canada',
    };
  }

  return {
    title: post.seoTitle || `${post.title} | Marhaban Canada`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Marhaban Canada'],
      tags: [post.category],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter(
      (entry) =>
        entry.slug !== post.slug &&
        (entry.category === post.category || entry.relatedStep === post.relatedStep),
    )
    .slice(0, 3);

  return <BlogPostContent post={post} relatedPosts={relatedPosts} />;
}
