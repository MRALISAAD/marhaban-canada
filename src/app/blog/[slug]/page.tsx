import { notFound } from 'next/navigation';
import { blogPosts } from '@/content/blog';
import { BlogPostContent } from '@/components/blog/BlogPostContent';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);

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
