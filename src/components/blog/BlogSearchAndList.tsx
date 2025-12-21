'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { blogPosts } from '@/content/blog';

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

export function BlogSearchAndList({
  searchPlaceholder = 'Rechercher (ex: logement, credit, NAS...)',
  isRTL = false,
}: {
  searchPlaceholder?: string;
  isRTL?: boolean;
}) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');

  const category = searchParams.get('cat');

  const posts = useMemo(() => {
    const base = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
    const filteredByCat = category ? base.filter((post) => post.category === category) : base;
    const normalizedQuery = normalize(query.trim());

    if (!normalizedQuery) return filteredByCat;

    return filteredByCat.filter((post) => {
      const haystack = normalize([post.title, post.excerpt, post.category, ...post.content].join(' '));
      return haystack.includes(normalizedQuery);
    });
  }, [category, query]);

  return (
    <div>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={searchPlaceholder}
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10 ${
          isRTL ? 'text-right' : 'text-left'
        }`}
      />

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="rounded-2xl border p-4 hover:bg-black/5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-black/60">{post.category}</span>
              <span className="text-xs text-black/60">
                {post.readTime} • {post.date}
              </span>
            </div>
            <h2 className="mt-2 text-base font-semibold">{post.title}</h2>
            <p className="mt-1 text-sm text-black/70">{post.excerpt}</p>
          </Link>
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="mt-6 text-sm text-black/60">Aucun résultat. Essaie un autre mot.</p>
      ) : null}
    </div>
  );
}
