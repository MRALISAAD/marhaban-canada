'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FolderOpen, Save } from 'lucide-react';
import { CaseStatusBadge } from '@/components/admin/AdminBadge';
import { AdminCard } from '@/components/admin/AdminCard';
import { AdminNotesPanel } from '@/components/admin/AdminNotesPanel';
import type { CaseFile, CaseStatus } from '@/types/admin';

type AdminCasesClientProps = {
  supabaseCases?: readonly CaseFile[];
};

type EditableCase = CaseFile;

type CaseOverrides = Record<string, Partial<EditableCase>>;

const statusOptions: { value: CaseStatus; label: string }[] = [
  { value: 'new', label: 'Nouveau' },
  { value: 'active', label: 'Actif' },
  { value: 'waiting_client', label: 'Attente client' },
  { value: 'next_step', label: 'Prochaine étape' },
  { value: 'completed', label: 'Terminé' },
  { value: 'archived', label: 'Archivé' },
];

function applyOverride(caseFile: CaseFile, overrides: CaseOverrides): EditableCase {
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
  return caseFile.internalNotes[0] || caseFile.actionPlan[0] || 'Situation à préciser.';
}

function getNotes(caseFile: EditableCase) {
  return caseFile.internalNotes.join('\n');
}

export function AdminCasesClient({ supabaseCases = [] }: AdminCasesClientProps) {
  const router = useRouter();
  const [caseOverrides, setCaseOverrides] = useState<CaseOverrides>({});
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [statusDraft, setStatusDraft] = useState<CaseStatus>('active');
  const [nextStepDraft, setNextStepDraft] = useState('');
  const [notesDraft, setNotesDraft] = useState('');
  const [savedMessage, setSavedMessage] = useState('');
  const [isSavingCase, setIsSavingCase] = useState(false);

  const cases = useMemo(
    () => supabaseCases.map((caseFile) => applyOverride(caseFile, caseOverrides)),
    [caseOverrides, supabaseCases],
  );

  const selectedCase = selectedCaseId ? cases.find((caseFile) => caseFile.id === selectedCaseId) : undefined;

  function openCase(caseFile: EditableCase) {
    setSelectedCaseId(caseFile.id);
    setStatusDraft(caseFile.status);
    setNextStepDraft(caseFile.nextStep);
    setNotesDraft(getNotes(caseFile));
    setSavedMessage('');
  }

  async function saveCase() {
    if (!selectedCase) return;

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

      if (response.ok && result.ok === true) {
        setCaseOverrides((current) => ({
          ...current,
          [selectedCase.id]: {
            ...current[selectedCase.id],
            status: statusDraft,
            nextStep: nextStepDraft.trim(),
            internalNotes: notesDraft.trim() ? [notesDraft.trim()] : [],
          },
        }));
        setSavedMessage('Dossier sauvegardé.');
        router.refresh();
      } else {
        setSavedMessage(`Erreur : ${result.error || 'sauvegarde impossible'}`);
      }
    } catch {
      setSavedMessage('Erreur de connexion.');
    } finally {
      setIsSavingCase(false);
    }
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
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_400px]">
        <section className="grid content-start gap-4 md:grid-cols-2" aria-label="Liste des dossiers">
          {cases.length > 0 ? cases.map((caseFile) => (
            <AdminCard key={caseFile.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-heading text-2xl font-semibold leading-tight text-marhaban-forestDark">
                    {caseFile.clientName}
                  </p>
                  <p className="mt-1 text-sm text-marhaban-muted">{caseFile.email}</p>
                </div>
                <CaseStatusBadge status={caseFile.status} />
              </div>
              <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-marhaban-muted">
                {getSituation(caseFile)}
              </p>
              <dl className="mt-5 grid gap-3 text-sm">
                <div>
                  <dt className="font-bold text-marhaban-forestDark">Dernier contact / création</dt>
                  <dd className="mt-1 text-marhaban-muted">{formatDate(caseFile.lastContactAt || caseFile.openedAt)}</dd>
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
          )) : (
            <div className="col-span-2">
              <p className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 p-4 text-sm text-marhaban-muted">
                Aucun dossier pour le moment.
              </p>
            </div>
          )}
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
                    <dt className="font-bold text-marhaban-forestDark">Ville / province</dt>
                    <dd className="mt-1 text-marhaban-muted">{selectedCase.cityProvince}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Situation initiale</dt>
                    <dd className="mt-1 leading-relaxed text-marhaban-muted">{getSituation(selectedCase)}</dd>
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
                      {selectedCase.bookingId
                        ? 'Dossier créé depuis une réservation.'
                        : 'Dossier ouvert manuellement.'}
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
                  onClick={() => void saveCase()}
                  disabled={isSavingCase}
                  className="mt-5 inline-flex min-h-[42px] items-center gap-2 rounded-full bg-marhaban-forestDark px-5 py-2 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-clay disabled:cursor-not-allowed disabled:opacity-60"
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
