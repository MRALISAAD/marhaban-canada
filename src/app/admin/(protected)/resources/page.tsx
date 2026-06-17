import { AdminResourcesClient } from '@/components/admin/AdminResourcesClient';
import type { Locale } from '@/i18n/locales';
import { mockResources } from '@/lib/admin/mock-data';
import { createServerClient } from '@/lib/supabase/server';
import type { ResourceGuide, ResourceStatus } from '@/types/admin';

type SupabaseResourceRow = {
  id: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  title: string;
  slug: string;
  locale: string;
  category: string;
  summary: string;
  content: { body?: string } | null;
  status: string;
  owner: string;
};

function toResourceGuide(row: SupabaseResourceRow): ResourceGuide {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    locale: row.locale as Locale,
    category: row.category as ResourceGuide['category'],
    status: row.status as ResourceStatus,
    updatedAt: row.updated_at,
    createdAt: row.created_at,
    publishedAt: row.published_at ?? undefined,
    summary: row.summary,
    content: row.content?.body ?? '',
    owner: row.owner,
  };
}

async function getSupabaseResources() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('resources')
      .select('id, created_at, updated_at, published_at, title, slug, locale, category, summary, content, status, owner')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Unable to load Supabase resources', error);
      return [];
    }

    return ((data ?? []) as SupabaseResourceRow[]).map(toResourceGuide);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Supabase resources unavailable', error);
    }
    return [];
  }
}

export default async function AdminResourcesPage() {
  const supabaseResources = await getSupabaseResources();
  const supabaseResourceIds = new Set(supabaseResources.map((resource) => resource.id));

  return (
    <AdminResourcesClient
      supabaseResources={supabaseResources}
      supabaseResourceIds={supabaseResourceIds}
      mockResources={mockResources}
    />
  );
}
