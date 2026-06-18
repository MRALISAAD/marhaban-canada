'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import { FolderOpen, Save } from 'lucide-react';
import { AdminBadge, CaseStatusBadge } from '@/components/admin/AdminBadge';
import { AdminCard } from '@/components/admin/AdminCard';
import { AdminNotesPanel } from '@/components/admin/AdminNotesPanel';
import { getLocalCases, subscribeToLocalCases, updateLocalCase, type CasePriority, type LocalCase } from '@/lib/admin/local-case-store';
import type { CaseFile, CaseStatus } from '@/types/admin';

type AdminCasesClientProps = {
  supabaseCases?: readonly CaseFile[];
  supabaseCaseIds?: ReadonlySet<string>;
  mockCases: readonly CaseFile[];
};

type EditableCase = CaseFile & {
  phone?: string;
  sourceBookingId?: string;
  situation?: string;
  priority?: CasePriority;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
};

type CaseOverrides = Record<string, Partial<EditableCase>>;

const emptyCases: LocalCase[] = [];

const statusOptions: { value: CaseStatus; label: string }[] = [
  { value: 'new', label: 'Nouveau' },
  { value: 'active', label: 'Actif' },
  { value: 'waiting_client', label: 'Attente client' },
  { value: 'next_step', label: 'Prochaine étape' },
  { value: 'completed', label: 'Terminé' },
  { value: 'archived', label: 'Archivé' },
];

const priorityOptions: { value: CasePriority; label: string }[] = [
  { value: 'low', label: 'Faible' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'Élevé' },
];

const priorityLabels: Record<CasePriority, string> = {
  low: 'Faible',
  normal: 'Normal',
  high: 'Élevé',
};

function applyOverride(caseFile: EditableCase, overrides: CaseOverrides): EditableCase {
  return { ...caseFile, ...overrides[caseFile.id] };
}

function formatDate(value?: string) {
  if (!value) return 'Non renseigné';

  return new Intl.DateTimeFormat('fr-CA', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function getSituation(caseFile: EditableCase) {
  return caseFile.situation || caseFile.internalNotes[0] || caseFile.actionPlan[0] || 'Situation à préciser.';
}

function getNotes(caseFile: EditableCase) {
  return caseFile.notes ?? caseFile.internalNotes.join('\n');
}

function getPriority(caseFile: EditableCase): CasePriority {
  return caseFile.priority ?? 'normal';
}

export function AdminCasesClient({ supabaseCases = [], supabaseCaseIds, mockCases }: AdminCasesClientProps) {
  const [caseOverrides, setCaseOverrides] = useState<CaseOverrides>({});
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [statusDraft, setStatusDraft] = useState<CaseStatus>('active');
  const [priorityDraft, setPriorityDraft] = useState<CasePriority>('normal');
  const [nextStepDraft, setNextStepDraft] = useState('');
  const [notesDraft, setNotesDraft] = useState('');
  const [savedMessage, setSavedMessage] = useState('');
  const [isSavingCase, setIsSavingCase] = useState(false);
  const localCases = useSyncExternalStore(subscribeToLocalCases, getLocalCases, () => emptyCases);
  const supabaseBookingIds = useMemo(
    () => new Set(
      (supabaseCases ?? [])
        .map((caseFile) => caseFile.bookingId)
        .filter(Boolean) as string[],
    ),
    [supabaseCases],
  );
  const deduplicatedLocalCases = useMemo(
    () => localCases.filter((caseFile) => {
      const bookingId = caseFile.sourceBookingId ?? caseFile.bookingId;
      return !bookingId || !supabaseBookingIds.has(bookingId);
    }),
    [localCases, supabaseBookingIds],
  );

  const cases = useMemo(
    () => [
      ...(supabaseCases ?? []).map((caseFile) => applyOverride(caseFile, caseOverrides)),
      ...deduplicatedLocalCases.map((caseFile) => applyOverride(caseFile, caseOverrides)),
      ...mockCases.map((caseFile) => applyOverride(caseFile, caseOverrides)),
    ],
    [caseOverrides, deduplicatedLocalCases, mockCases, supabaseCases],
  );
  const localCaseIds = useMemo(() => new Set(deduplicatedLocalCases.map((caseFile) => caseFile.id)), [deduplicatedLocalCases]);
  const selectedCase = selectedCaseId ? cases.find((caseFile) => caseFile.id === selectedCaseId) : undefined;

  function openCase(caseFile: EditableCase) {
    setSelectedCaseId(caseFile.id);
    setStatusDraft(caseFile.status);
    setPriorityDraft(getPriority(caseFile));
    setNextStepDraft(caseFile.nextStep);
    setNotesDraft(getNotes(caseFile));
    setSavedMessage('');
  }

  async function saveCase() {
    if (!selectedCase) return;

    const updates: Partial<EditableCase> = {
      status: statusDraft,
      priority: priorityDraft,
      nextStep: nextStepDraft.trim(),
      notes: notesDraft.trim(),
      internalNotes: notesDraft.trim() ? [notesDraft.trim()] : [],
      updatedAt: new Date().toISOString(),
    };

    const keepUpdatesInMemory = () => {
      setCaseOverrides((current) => ({
        ...current,
        [selectedCase.id]: {
          ...current[selectedCase.id],
          ...updates,
        },
      }));
    };

    if (supabaseCaseIds?.has(selectedCase.id)) {
      setIsSavingCase(true);

      try {
        const response = await fetch(`/api/admin/cases/${selectedCase.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: statusDraft,
            next_step: nextStepDraft.trim(),
            internal_notes: notesDraft.trim() ? [notesDraft.trim()] : [],
          }),
        });
        const result = await response.json();

        keepUpdatesInMemory();
        setSavedMessage(response.ok && result.ok === true
          ? 'Dossier Supabase sauvegardé.'
          : 'Erreur Supabase, changements gardés en mémoire.');
      } catch {
        keepUpdatesInMemory();
        setSavedMessage('Erreur Supabase, changements gardés en mémoire.');
      } finally {
        setIsSavingCase(false);
      }

      return;
    }

    setCaseOverrides((current) => ({
      ...current,
      [selectedCase.id]: {
        ...current[selectedCase.id],
        ...updates,
      },
    }));

    if (localCaseIds.has(selectedCase.id)) {
      updateLocalCase(selectedCase.id, updates as Partial<LocalCase>);
    }

    setSavedMessage(localCaseIds.has(selectedCase.id) ? 'Dossier local sauvegardé.' : 'Changement gardé en state pour ce mock.');
  }

  return (
    <div className="space-y-6">
      <header className="rounded-[1.75rem] border border-marhaban-leaf/12 bg-white/85 p-6 shadow-warm-sm">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">Accompagnement</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-semibold leading-tight text-marhaban-forestDark sm:text-4xl">
              Dossiers utilisateurs
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-marhaban-muted sm:text-base">
              Suivre les personnes accompagnées et leurs prochaines étapes.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <AdminBadge label="Mock data" tone="dark" />
            {supabaseCases.length > 0 ? <AdminBadge label={`${supabaseCases.length} Supabase`} tone="success" /> : null}
            {localCases.length > 0 ? <AdminBadge label={`${localCases.length} local`} tone="warning" /> : null}
          </div>
        </div>
      </header>

      <div className="rounded-[1.75rem] border border-marhaban-leaf/12 bg-white/75 px-5 py-4 text-sm leading-relaxed text-marhaban-muted shadow-warm-sm">
        Les dossiers Supabase sont affichés en premier. Les dossiers locaux du navigateur restent disponibles en fallback.
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_400px]">
        <section className="grid content-start gap-4 md:grid-cols-2" aria-label="Liste des dossiers">
          {cases.map((caseFile) => {
            const priority = getPriority(caseFile);
            const isLocal = localCaseIds.has(caseFile.id);
            const isSupabase = supabaseCaseIds?.has(caseFile.id);

            return (
              <AdminCard key={caseFile.id} className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-heading text-2xl font-semibold leading-tight text-marhaban-forestDark">
                      {caseFile.clientName}
                    </p>
                    <p className="mt-1 text-sm text-marhaban-muted">{caseFile.email}</p>
                  </div>
                  {isSupabase ? <AdminBadge label="Supabase" tone="success" className="px-2 py-0.5 text-[10px]" /> : null}
                  {isLocal ? <AdminBadge label="Local" tone="warning" className="px-2 py-0.5 text-[10px]" /> : null}
                </div>
                <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-marhaban-muted">
                  {getSituation(caseFile)}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <CaseStatusBadge status={caseFile.status} />
                  <AdminBadge label={`Priorité ${priorityLabels[priority]}`} tone={priority === 'high' ? 'danger' : priority === 'low' ? 'neutral' : 'warning'} />
                </div>
                <dl className="mt-5 grid gap-3 text-sm">
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Dernier contact / création</dt>
                    <dd className="mt-1 text-marhaban-muted">{formatDate(caseFile.lastContactAt || caseFile.createdAt || caseFile.openedAt)}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Prochaine étape</dt>
                    <dd className="mt-1 leading-relaxed text-marhaban-muted">{caseFile.nextStep}</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  onClick={() => openCase(caseFile)}
                  className="mt-5 inline-flex min-h-[42px] items-center gap-2 rounded-full bg-marhaban-forestDark px-5 py-2 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-clay"
                >
                  <FolderOpen className="h-4 w-4" aria-hidden="true" />
                  Ouvrir le dossier
                </button>
              </AdminCard>
            );
          })}
        </section>

        <div className="space-y-6">
          <AdminCard title="Détail dossier" eyebrow="Suivi">
            {selectedCase ? (
              <div className="space-y-5">
              <div className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-heading text-2xl font-semibold leading-tight text-marhaban-forestDark">
                      {selectedCase.clientName}
                    </p>
                    <p className="mt-1 text-sm text-marhaban-muted">{selectedCase.email}</p>
                  </div>
                  <CaseStatusBadge status={selectedCase.status} />
                </div>
                <dl className="mt-5 grid gap-4 text-sm">
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Téléphone</dt>
                    <dd className="mt-1 text-marhaban-muted">{selectedCase.phone || 'Non renseigné'}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Ville / province</dt>
                    <dd className="mt-1 text-marhaban-muted">{selectedCase.cityProvince}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Situation initiale</dt>
                    <dd className="mt-1 leading-relaxed text-marhaban-muted">{getSituation(selectedCase)}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Priorité</dt>
                    <dd className="mt-1 text-marhaban-muted">{priorityLabels[getPriority(selectedCase)]}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Prochaine étape</dt>
                    <dd className="mt-1 leading-relaxed text-marhaban-muted">{selectedCase.nextStep}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Notes internes</dt>
                    <dd className="mt-1 whitespace-pre-wrap leading-relaxed text-marhaban-muted">{getNotes(selectedCase) || 'Aucune note.'}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Historique</dt>
                    <dd className="mt-1 text-marhaban-muted">
                      {selectedCase.sourceBookingId || selectedCase.bookingId
                        ? 'Dossier créé depuis une réservation.'
                        : 'Dossier mock créé pour le MVP admin.'}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border border-marhaban-leaf/12 bg-white p-5">
                <div className="grid gap-4">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-marhaban-forestDark">Changer statut</span>
                    <select
                      value={statusDraft}
                      onChange={(event) => setStatusDraft(event.target.value as CaseStatus)}
                      className="w-full rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-sm text-marhaban-ink focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20"
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-marhaban-forestDark">Changer priorité</span>
                    <select
                      value={priorityDraft}
                      onChange={(event) => setPriorityDraft(event.target.value as CasePriority)}
                      className="w-full rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-sm text-marhaban-ink focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20"
                    >
                      {priorityOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-marhaban-forestDark">Modifier prochaine étape</span>
                    <textarea
                      value={nextStepDraft}
                      onChange={(event) => setNextStepDraft(event.target.value)}
                      rows={3}
                      className="w-full resize-none rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-sm text-marhaban-ink focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-marhaban-forestDark">Modifier notes internes</span>
                    <textarea
                      value={notesDraft}
                      onChange={(event) => setNotesDraft(event.target.value)}
                      rows={5}
                      className="w-full resize-none rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-sm text-marhaban-ink focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20"
                    />
                  </label>
                </div>
                <button
                  type="button"
                  onClick={saveCase}
                  disabled={isSavingCase}
                  className="mt-5 inline-flex min-h-[42px] items-center gap-2 rounded-full bg-marhaban-forestDark px-5 py-2 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-clay"
                >
                  <Save className="h-4 w-4" aria-hidden="true" />
                  {isSavingCase ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
                {savedMessage ? <p className="mt-3 text-xs font-semibold text-marhaban-clay">{savedMessage}</p> : null}
              </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 p-5">
                <p className="font-semibold text-marhaban-forestDark">
                  Sélectionne un dossier pour voir les détails.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-marhaban-muted">
                  Les dossiers locaux sont sauvegardés dans ce navigateur. Les dossiers mock restent temporaires.
                </p>
              </div>
            )}
          </AdminCard>

          {selectedCase ? (
            <AdminCard title="Notes internes" eyebrow="Suivi">
              <AdminNotesPanel targetType="case_file" targetId={selectedCase.id} />
            </AdminCard>
          ) : null}
        </div>
      </div>
    </div>
  );
}
