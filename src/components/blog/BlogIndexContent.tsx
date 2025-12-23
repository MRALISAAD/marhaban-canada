'use client';

import LocalizedLink from '../LocalizedLink';
import { useLanguage } from '@/components/LanguageProvider';
import { blogPosts } from '@/content/blog';
import { BlogSearchAndList } from '@/components/blog/BlogSearchAndList';
import { getHtmlAttrs } from '@/i18n/locales';

type Category = (typeof blogPosts)[number]['category'];

function uniqueCategories(posts: typeof blogPosts): Category[] {
  const set = new Set<Category>();
  posts.forEach((post) => set.add(post.category));
  return Array.from(set).sort();
}

export function BlogIndexContent() {
  const { content, locale } = useLanguage();
  const { dir } = getHtmlAttrs(locale);
  const categories = uniqueCategories(blogPosts);
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const isRTL = dir === 'rtl';
  const breadcrumbArrow = isRTL ? '←' : '→';

  return (
    <main className={`mx-auto max-w-5xl px-4 py-8 ${isRTL ? 'text-right' : 'text-left'}`} dir={dir}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-black/50">
            <span className="rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/50">
              {content.microcopy.youAreHere}
            </span>
            <span>
              {content.microcopy.breadcrumbHome} {breadcrumbArrow} {content.microcopy.breadcrumbBlog}
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-semibold">
            {locale === 'fr'
              ? 'Blog — Comprendre avant d’agir'
              : locale === 'en'
                ? 'Blog — Understand before acting'
                : 'المدونة — افهم قبل أن تتصرف'}
          </h1>
          <p className="mt-1 text-sm text-black/60">
            {locale === 'fr'
              ? "Des articles courts pour t'aider à éviter les erreurs courantes."
              : locale === 'en'
                ? 'Short articles to help you avoid common mistakes.'
                : 'مقالات قصيرة لمساعدتك على تجنب الأخطاء الشائعة.'}
          </p>
        </div>

        <LocalizedLink
          href="/parcours"
          className="hidden sm:inline-flex items-center rounded-xl border px-3 py-2 text-sm hover:bg-black/5"
        >
          {content.microcopy.backToJourneyLabel}
        </LocalizedLink>
      </div>

      {featuredPosts.length > 0 ? (
        <section className="mt-8">
          <h2 className="text-lg font-semibold">{content.microcopy.priorityReadsTitle}</h2>
          <p className="mt-1 text-xs text-black/50">{content.microcopy.priorityReadsDesc}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {featuredPosts.map((post) => (
              <LocalizedLink key={post.slug} href={`/blog/${post.slug}`} className="rounded-2xl border bg-black/5 p-4">
                <p className="text-xs text-black/60">{post.category}</p>
                <p className="mt-1 font-semibold">{post.title}</p>
                <p className="mt-1 text-sm text-black/70">{post.excerpt}</p>
              </LocalizedLink>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        <LocalizedLink href="/blog" className="rounded-full border px-3 py-1 text-sm hover:bg-black/5">
          {locale === 'fr' ? 'Tous' : locale === 'en' ? 'All' : 'الكل'}
        </LocalizedLink>
        {categories.map((category) => (
          <LocalizedLink
            key={category}
            href={`/blog?cat=${encodeURIComponent(category)}`}
            className="rounded-full border px-3 py-1 text-sm hover:bg-black/5"
          >
            {category}
          </LocalizedLink>
        ))}
      </div>

      <div className="mt-4">
        <BlogSearchAndList searchPlaceholder={content.microcopy.searchPlaceholder} isRTL={isRTL} />
      </div>
    </main>
  );
}
