'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import { BackButton } from '@/components/BackButton';
import type { BlogPost } from '@/content/blog';

type BlogPostContentProps = {
  post: BlogPost;
  relatedPosts: BlogPost[];
};

export function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
  const { content, dir } = useLanguage();
  const isRTL = dir === 'rtl';
  const breadcrumbArrow = isRTL ? '←' : '→';
  const nextArrow = isRTL ? '←' : '→';
  const backArrow = isRTL ? '→' : '←';
  const listPadding = isRTL ? 'pr-5' : 'pl-5';

  return (
    <main className={`mx-auto max-w-3xl px-4 py-8 ${isRTL ? 'text-right' : 'text-left'}`} dir={dir}>
      <div className="flex items-center justify-between gap-3">
        <BackButton fallbackHref="/blog" label={content.microcopy.backLabel} />
        <Link href="/parcours/guide" className="text-sm text-black/60 hover:underline">
          Voir les guides
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-black/50">
        <span className="rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/50">
          {content.microcopy.youAreHere}
        </span>
        <span>
          {content.microcopy.breadcrumbHome} {breadcrumbArrow} {content.microcopy.breadcrumbBlog} {breadcrumbArrow}{' '}
          {post.title}
        </span>
      </div>

      <div className="mt-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-black/60">
          <span className="rounded-full border px-2 py-1">{post.category}</span>
          <span>{post.readTime}</span>
          <span>•</span>
          <span>{post.date}</span>
        </div>

        <h1 className="mt-3 text-2xl font-semibold">{post.title}</h1>
        <p className="mt-2 text-black/70">{post.excerpt}</p>
        <p className="mt-2 text-xs text-black/50">
          Cet article t&apos;aide a comprendre avant de passer a l&apos;action.
        </p>

        <article className="prose prose-sm mt-6 max-w-none">
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>

        {post.checklist?.length ? (
          <section className="mt-8 rounded-2xl border p-4">
            <h2 className="text-base font-semibold">Checklist</h2>
            <ul className={`mt-2 list-disc text-sm ${listPadding}`}>
              {post.checklist.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {post.sources?.length ? (
          <section className="mt-8 rounded-2xl border p-4">
            <h2 className="text-base font-semibold">Sources</h2>
            <ul className="mt-2 space-y-2 text-sm">
              {post.sources.map((source, index) => (
                <li key={index} className="flex items-center justify-between gap-3">
                  <span className="text-black/80">{source.label}</span>
                  <a className="text-sm underline" href={source.url} target="_blank" rel="noreferrer">
                    Ouvrir
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {post.relatedStep ? (
          <section className="mt-10 rounded-2xl border bg-black/5 p-5">
            <h3 className="text-base font-semibold">{content.microcopy.recommendedNextStepTitle}</h3>
            <p className="mt-1 text-sm text-black/70">{content.microcopy.recommendedNextStepDesc}</p>
            <Link
              href={`/parcours/guide/${post.relatedStep}`}
              className="mt-4 inline-flex rounded-xl bg-black px-4 py-2 text-sm text-white"
            >
              {content.microcopy.viewGuideCta} {nextArrow}
            </Link>
          </section>
        ) : null}

        {relatedPosts.length > 0 ? (
          <section className="mt-12">
            <h3 className="text-base font-semibold">{content.microcopy.relatedArticlesTitle}</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {relatedPosts.map((entry) => (
                <Link key={entry.slug} href={`/blog/${entry.slug}`} className="rounded-xl border p-3 hover:bg-black/5">
                  <p className="text-xs text-black/60">{entry.category}</p>
                  <p className="mt-1 text-sm font-medium">{entry.title}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-10 flex justify-between">
          <Link href="/blog" className="text-sm underline">
            {isRTL ? `${content.microcopy.backLabel} ${backArrow}` : `${backArrow} ${content.microcopy.backLabel}`}
          </Link>
          <Link href="/parcours" className="text-sm underline">
            {isRTL ? `${content.microcopy.breadcrumbJourney} ${nextArrow}` : `${content.microcopy.breadcrumbJourney} ${nextArrow}`}
          </Link>
        </div>
      </div>
    </main>
  );
}
