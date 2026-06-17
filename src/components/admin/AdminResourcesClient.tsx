'use client';

import { FormEvent, useMemo, useState } from 'react';
import { Archive, Edit3, Eye, PlusCircle, Save, Send, X } from 'lucide-react';
import { AdminBadge, ResourceStatusBadge } from '@/components/admin/AdminBadge';
import { AdminCard } from '@/components/admin/AdminCard';
import { AdminNotesPanel } from '@/components/admin/AdminNotesPanel';
import type { Locale } from '@/i18n/locales';
import type { ResourceGuide, ResourceStatus } from '@/types/admin';

type AdminResourcesClientProps = {
  supabaseResources?: readonly ResourceGuide[];
  supabaseResourceIds?: ReadonlySet<string>;
  mockResources: readonly ResourceGuide[];
};

type ResourceFormData = {
  title: string;
  slug: string;
  locale: Locale;
  category: ResourceGuide['category'];
  summary: string;
  content: string;
  status: ResourceStatus;
};

type ResourceView = 'list' | 'create' | 'edit';

const categoryOptions: { value: ResourceGuide['category']; label: string }[] = [
  { value: 'first_week', label: 'Première semaine' },
  { value: 'housing', label: 'Logement' },
  { value: 'banking', label: 'Banque' },
  { value: 'documents', label: 'Documents' },
  { value: 'phone', label: 'Téléphone' },
  { value: 'students', label: 'Études' },
  { value: 'anti_scam', label: 'Anti-arnaque' },
];

const localeOptions: { value: Locale; label: string }[] = [
  { value: 'fr', label: 'FR' },
  { value: 'en', label: 'EN' },
  { value: 'ar', label: 'AR' },
];

const statusOptions: { value: ResourceStatus; label: string }[] = [
  { value: 'draft', label: 'Brouillon' },
  { value: 'review', label: 'En revue' },
  { value: 'published', label: 'Publié' },
  { value: 'archived', label: 'Archivé' },
];

const emptyFormData: ResourceFormData = {
  title: '',
  slug: '',
  locale: 'fr',
  category: 'first_week',
  summary: '',
  content: '',
  status: 'draft',
};

function formatDate(value?: string) {
  if (!value) return 'Non renseigné';

  return new Intl.DateTimeFormat('fr-CA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function categoryLabel(category: ResourceGuide['category']) {
  return categoryOptions.find((option) => option.value === category)?.label ?? category;
}

function isMockResource(resource: ResourceGuide) {
  return resource.id.startsWith('res_');
}

function toFormData(resource: ResourceGuide): ResourceFormData {
  return {
    title: resource.title,
    slug: resource.slug ?? '',
    locale: resource.locale,
    category: resource.category,
    summary: resource.summary,
    content: resource.content ?? '',
    status: resource.status,
  };
}

function toResource(id: string, formData: ResourceFormData, existing?: ResourceGuide): ResourceGuide {
  const now = new Date().toISOString();

  return {
    ...existing,
    id,
    title: formData.title,
    slug: formData.slug,
    locale: formData.locale,
    category: formData.category,
    status: formData.status,
    updatedAt: now,
    createdAt: existing?.createdAt ?? now,
    publishedAt: formData.status === 'published' ? existing?.publishedAt ?? now : existing?.publishedAt,
    summary: formData.summary,
    content: formData.content,
    owner: existing?.owner ?? 'Marhaban Canada',
  };
}

async function parseApiResponse(response: Response) {
  try {
    return await response.json();
  } catch {
    return { ok: false, error: response.statusText || 'Erreur API' };
  }
}

export function AdminResourcesClient({ supabaseResources = [], supabaseResourceIds, mockResources }: AdminResourcesClientProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [view, setView] = useState<ResourceView>('list');
  const [formData, setFormData] = useState<ResourceFormData>(emptyFormData);
  const [saveMessage, setSaveMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [localResources, setLocalResources] = useState<ResourceGuide[]>([]);

  const resources = useMemo(
    () => [
      ...(supabaseResources ?? []),
      ...mockResources.filter((resource) => !(supabaseResourceIds?.has(resource.id))),
    ],
    [mockResources, supabaseResourceIds, supabaseResources],
  );

  const allResources = useMemo(
    () => [
      ...localResources,
      ...resources.filter((resource) => !localResources.find((localResource) => localResource.id === resource.id)),
    ],
    [localResources, resources],
  );

  const total = allResources.length;
  const published = allResources.filter((resource) => resource.status === 'published').length;
  const drafts = allResources.filter((resource) => resource.status === 'draft').length;
  const inReview = allResources.filter((resource) => resource.status === 'review').length;
  const selectedResource = selectedId ? allResources.find((resource) => resource.id === selectedId) : undefined;
  const sourceSupabaseIds = useMemo(
    () => new Set([
      ...(supabaseResourceIds ? Array.from(supabaseResourceIds) : []),
      ...localResources.filter((resource) => !isMockResource(resource)).map((resource) => resource.id),
    ]),
    [localResources, supabaseResourceIds],
  );

  function updateFormField<K extends keyof ResourceFormData>(key: K, value: ResourceFormData[K]) {
    setFormData((current) => ({ ...current, [key]: value }));
  }

  function upsertLocalResource(resource: ResourceGuide) {
    setLocalResources((current) => [
      resource,
      ...current.filter((localResource) => localResource.id !== resource.id),
    ]);
  }

  function openCreateForm() {
    setSelectedId(null);
    setFormData(emptyFormData);
    setSaveMessage('');
    setView('create');
  }

  function openEditForm(resource: ResourceGuide) {
    setSelectedId(resource.id);
    setFormData(toFormData(resource));
    setSaveMessage('');
    setView('edit');
  }

  function openDetails(resource: ResourceGuide) {
    setSelectedId(resource.id);
    setSaveMessage('');
    setView('list');
  }

  async function updateStatus(resource: ResourceGuide, status: ResourceStatus) {
    const updatedResource = {
      ...resource,
      status,
      updatedAt: new Date().toISOString(),
      publishedAt: status === 'published' ? resource.publishedAt ?? new Date().toISOString() : resource.publishedAt,
    };

    if (isMockResource(resource)) {
      upsertLocalResource(updatedResource);
      setSaveMessage('Changement gardé en session pour ce mock.');
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`/api/resources/${resource.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const result = await parseApiResponse(response);

      if (response.ok && result.ok === true) {
        upsertLocalResource(updatedResource);
        setSaveMessage(status === 'archived' ? 'Guide archivé.' : 'Statut mis à jour.');
      } else {
        setSaveMessage(`Erreur : ${result.error || 'mise à jour impossible'}`);
      }
    } catch {
      setSaveMessage('Erreur : mise à jour impossible');
    } finally {
      setIsSaving(false);
    }
  }

  async function createResource(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setSaveMessage('');

    try {
      const response = await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await parseApiResponse(response);

      if (response.ok && result.ok === true && typeof result.resourceId === 'string') {
        const createdResource = toResource(result.resourceId, formData);
        upsertLocalResource(createdResource);
        setSelectedId(result.resourceId);
        setFormData(emptyFormData);
        setSaveMessage('Guide créé.');
        setView('list');
      } else {
        setSaveMessage(`Erreur : ${result.error || 'création impossible'}`);
      }
    } catch {
      setSaveMessage('Erreur : création impossible');
    } finally {
      setIsSaving(false);
    }
  }

  async function updateResource(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedResource) return;

    const updatedResource = toResource(selectedResource.id, formData, selectedResource);

    if (isMockResource(selectedResource)) {
      upsertLocalResource(updatedResource);
      setSaveMessage('Guide mis à jour en session.');
      setView('list');
      return;
    }

    setIsSaving(true);
    setSaveMessage('');

    try {
      const response = await fetch(`/api/resources/${selectedResource.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await parseApiResponse(response);

      if (response.ok && result.ok === true) {
        upsertLocalResource(updatedResource);
        setSaveMessage('Guide mis à jour.');
        setView('list');
      } else {
        setSaveMessage(`Erreur : ${result.error || 'mise à jour impossible'}`);
      }
    } catch {
      setSaveMessage('Erreur : mise à jour impossible');
    } finally {
      setIsSaving(false);
    }
  }

  const kpis = [
    { label: 'Guides', value: total, detail: 'Total disponible' },
    { label: 'Publiés', value: published, detail: 'Visibles côté public' },
    { label: 'Brouillons', value: drafts, detail: 'À compléter' },
    { label: 'En revue', value: inReview, detail: 'À valider' },
  ];

  const form = (
    <form onSubmit={view === 'create' ? createResource : updateResource} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-marhaban-forestDark">Titre</span>
          <input
            required
            type="text"
            value={formData.title}
            onChange={(event) => updateFormField('title', event.target.value)}
            className="w-full rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-sm text-marhaban-ink placeholder:text-marhaban-muted focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-marhaban-forestDark">Slug</span>
          <input
            required
            type="text"
            value={formData.slug}
            placeholder="premiere-semaine-fr"
            onChange={(event) => updateFormField('slug', event.target.value)}
            className="w-full rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-sm text-marhaban-ink placeholder:text-marhaban-muted focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-marhaban-forestDark">Catégorie</span>
          <select
            value={formData.category}
            onChange={(event) => updateFormField('category', event.target.value as ResourceGuide['category'])}
            className="w-full rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-sm text-marhaban-ink focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-marhaban-forestDark">Langue</span>
          <select
            value={formData.locale}
            onChange={(event) => updateFormField('locale', event.target.value as Locale)}
            className="w-full rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-sm text-marhaban-ink focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20"
          >
            {localeOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-marhaban-forestDark">Statut</span>
          <select
            value={formData.status}
            onChange={(event) => updateFormField('status', event.target.value as ResourceStatus)}
            className="w-full rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-sm text-marhaban-ink focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-marhaban-forestDark">Description courte</span>
        <textarea
          rows={2}
          value={formData.summary}
          onChange={(event) => updateFormField('summary', event.target.value)}
          className="w-full resize-none rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-sm text-marhaban-ink placeholder:text-marhaban-muted focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-marhaban-forestDark">Contenu</span>
        <textarea
          rows={5}
          value={formData.content}
          placeholder="Contenu en texte ou Markdown"
          onChange={(event) => updateFormField('content', event.target.value)}
          className="w-full resize-none rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-sm text-marhaban-ink placeholder:text-marhaban-muted focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20"
        />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-marhaban-forestDark px-5 py-2 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-clay disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          {isSaving ? 'Sauvegarde...' : view === 'create' ? 'Créer' : 'Sauvegarder'}
        </button>
        <button
          type="button"
          onClick={() => setView('list')}
          className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-marhaban-leaf/15 bg-white px-5 py-2 text-sm font-bold text-marhaban-ink shadow-warm-sm transition hover:bg-marhaban-cream"
        >
          <X className="h-4 w-4" aria-hidden="true" />
          Annuler
        </button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="rounded-[1.75rem] border border-marhaban-clay/20 bg-[#fff4e8] px-5 py-4 text-sm leading-relaxed text-marhaban-ink shadow-warm-sm">
        <span className="font-bold text-marhaban-clay">Admin MVP Supabase</span>
        <span className="text-marhaban-ink/75"> — ressources persistées côté serveur, sans DELETE réel.</span>
      </div>

      <header className="rounded-[1.75rem] border border-marhaban-leaf/12 bg-white/85 p-6 shadow-warm-sm">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">Contenu</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-semibold leading-tight text-marhaban-forestDark sm:text-4xl">
              Ressources
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-marhaban-muted sm:text-base">
              Préparer et organiser les guides utiles pour les nouveaux arrivants.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <AdminBadge label={`${supabaseResources.length} Supabase`} tone="success" />
            <AdminBadge label={`${mockResources.length} Mock`} tone="dark" />
            <button
              type="button"
              onClick={openCreateForm}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-marhaban-forestDark px-5 py-2 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-clay"
            >
              <PlusCircle className="h-4 w-4" aria-hidden="true" />
              Nouveau guide
            </button>
          </div>
        </div>
      </header>

      <div className="rounded-[1.75rem] border border-marhaban-leaf/12 bg-white/75 px-5 py-4 text-sm leading-relaxed text-marhaban-muted shadow-warm-sm">
        Les ressources sont stockées dans Supabase. Les mock data sont affichées si la table est vide.
      </div>

      {saveMessage ? (
        <div className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream px-5 py-3 text-sm font-semibold text-marhaban-forestDark shadow-warm-sm">
          {saveMessage}
        </div>
      ) : null}

      <section className="grid gap-4 md:grid-cols-4" aria-label="Indicateurs ressources">
        {kpis.map((item) => (
          <AdminCard key={item.label} className="p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">{item.label}</p>
            <p className="mt-4 font-heading text-4xl font-semibold leading-none text-marhaban-forestDark">
              {item.value}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-marhaban-muted">{item.detail}</p>
          </AdminCard>
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_400px]">
        <AdminCard title="Tous les guides" eyebrow="Tableau">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead>
                <tr className="border-b border-marhaban-leaf/12 text-xs font-bold uppercase tracking-[0.12em] text-marhaban-muted">
                  <th className="py-3 pr-4">Titre</th>
                  <th className="px-4 py-3">Catégorie</th>
                  <th className="px-4 py-3">Langue</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="py-3 pl-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-marhaban-leaf/10">
                {allResources.map((resource) => {
                  const isSupabase = sourceSupabaseIds.has(resource.id);
                  const isMock = isMockResource(resource);
                  const nextPublishStatus: ResourceStatus = resource.status === 'published' ? 'draft' : 'published';

                  return (
                    <tr key={resource.id} className="align-top transition hover:bg-marhaban-cream/70">
                      <td className="py-4 pr-4">
                        <p className="font-semibold text-marhaban-forestDark">{resource.title}</p>
                        <p className="mt-1 text-xs text-marhaban-muted">{resource.slug || 'Slug non renseigné'}</p>
                      </td>
                      <td className="px-4 py-4 text-marhaban-ink/80">{categoryLabel(resource.category)}</td>
                      <td className="px-4 py-4 uppercase text-marhaban-ink/80">{resource.locale}</td>
                      <td className="px-4 py-4">
                        <ResourceStatusBadge status={resource.status} />
                      </td>
                      <td className="px-4 py-4 text-marhaban-ink/80">{formatDate(resource.updatedAt)}</td>
                      <td className="px-4 py-4">
                        {isSupabase ? <AdminBadge label="Supabase" tone="success" className="px-2 py-0.5 text-[10px]" /> : null}
                        {isMock ? <AdminBadge label="Mock" tone="dark" className="px-2 py-0.5 text-[10px]" /> : null}
                      </td>
                      <td className="py-4 pl-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => openDetails(resource)}
                            className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-marhaban-leaf/15 bg-white px-3 py-1 text-xs font-bold text-marhaban-ink shadow-warm-sm transition hover:border-marhaban-clay/30 hover:bg-marhaban-cream"
                          >
                            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                            Voir
                          </button>
                          <button
                            type="button"
                            onClick={() => openEditForm(resource)}
                            className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-marhaban-leaf/15 bg-white px-3 py-1 text-xs font-bold text-marhaban-ink shadow-warm-sm transition hover:border-marhaban-clay/30 hover:bg-marhaban-cream"
                          >
                            <Edit3 className="h-3.5 w-3.5" aria-hidden="true" />
                            Modifier
                          </button>
                          <button
                            type="button"
                            disabled={isSaving}
                            onClick={() => updateStatus(resource, nextPublishStatus)}
                            className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-marhaban-leaf/15 bg-white px-3 py-1 text-xs font-bold text-marhaban-ink shadow-warm-sm transition hover:border-marhaban-clay/30 hover:bg-marhaban-cream disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <Send className="h-3.5 w-3.5" aria-hidden="true" />
                            {resource.status === 'published' ? 'Dépublier' : 'Publier'}
                          </button>
                          <button
                            type="button"
                            disabled={isSaving}
                            onClick={() => updateStatus(resource, 'archived')}
                            className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-700 shadow-warm-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <Archive className="h-3.5 w-3.5" aria-hidden="true" />
                            Archiver
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </AdminCard>

        <div className="space-y-6">
          <AdminCard
            title={view === 'create' ? 'Nouveau guide' : view === 'edit' ? 'Modifier guide' : 'Détail guide'}
            eyebrow={view === 'list' ? 'Sélection' : 'Formulaire'}
          >
            {view === 'create' || view === 'edit' ? (
              form
            ) : selectedResource ? (
              <div className="space-y-5">
              <div className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-heading text-2xl font-semibold leading-tight text-marhaban-forestDark">
                      {selectedResource.title}
                    </p>
                    <p className="mt-1 text-sm text-marhaban-muted">{selectedResource.slug || 'Slug non renseigné'}</p>
                  </div>
                  <ResourceStatusBadge status={selectedResource.status} />
                </div>
                <dl className="mt-5 grid gap-4 text-sm">
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Catégorie</dt>
                    <dd className="mt-1 text-marhaban-muted">{categoryLabel(selectedResource.category)}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Langue</dt>
                    <dd className="mt-1 uppercase text-marhaban-muted">{selectedResource.locale}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Résumé</dt>
                    <dd className="mt-1 leading-relaxed text-marhaban-muted">{selectedResource.summary || 'Aucun résumé.'}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Contenu</dt>
                    <dd className="mt-1 whitespace-pre-wrap leading-relaxed text-marhaban-muted">{selectedResource.content || 'Aucun contenu.'}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Propriétaire</dt>
                    <dd className="mt-1 text-marhaban-muted">{selectedResource.owner}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Dates</dt>
                    <dd className="mt-1 text-marhaban-muted">
                      Créé : {formatDate(selectedResource.createdAt)} · Mis à jour : {formatDate(selectedResource.updatedAt)}
                    </dd>
                    <dd className="mt-1 text-marhaban-muted">Publié : {formatDate(selectedResource.publishedAt)}</dd>
                  </div>
                </dl>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-marhaban-leaf/15 bg-white px-5 py-2 text-sm font-bold text-marhaban-ink shadow-warm-sm transition hover:bg-marhaban-cream"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                  Fermer
                </button>
                <button
                  type="button"
                  onClick={() => openEditForm(selectedResource)}
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-marhaban-forestDark px-5 py-2 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-clay"
                >
                  <Edit3 className="h-4 w-4" aria-hidden="true" />
                  Modifier
                </button>
              </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 p-5">
                <p className="font-semibold text-marhaban-forestDark">
                  Sélectionne une ressource pour voir les détails.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-marhaban-muted">
                  Les guides Supabase sont persistés. Les guides mock servent de fallback MVP.
                </p>
              </div>
            )}
          </AdminCard>

          {view === 'list' && selectedResource ? (
            <AdminCard title="Notes internes" eyebrow="Suivi">
              <AdminNotesPanel targetType="resource" targetId={selectedResource.id} />
            </AdminCard>
          ) : null}
        </div>
      </div>
    </div>
  );
}
