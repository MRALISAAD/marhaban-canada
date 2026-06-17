'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import { CheckCircle2, Eye, Save, ShieldAlert } from 'lucide-react';
import { AdminBadge } from '@/components/admin/AdminBadge';
import { AdminCard } from '@/components/admin/AdminCard';
import { AdminNotesPanel } from '@/components/admin/AdminNotesPanel';
import {
  getLocalScamChecks,
  subscribeToLocalScamChecks,
  type LocalScamCheck,
} from '@/lib/admin/local-scam-check-store';
import type { RiskLevel, ScamCheck } from '@/types/admin';

type ScamCheckStatus = ScamCheck['status'];
type ScamUrgency = ScamCheck['urgency'];
type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'dark';

const emptyLocalChecks: LocalScamCheck[] = [];

type AdminScamCheck = ScamCheck & {
  phone?: string;
  cityProvince?: string;
  recommendation?: string;
};

type AdminScamChecksClientProps = {
  supabaseScamChecks?: readonly AdminScamCheck[];
  mockScamChecks: readonly ScamCheck[];
};

type EditableScamCheck = Omit<AdminScamCheck, 'notes'> & {
  notes: string[];
  recommendation?: string;
  phone?: string;
  cityProvince?: string;
};

type ScamCheckOverrides = Record<string, Partial<EditableScamCheck>>;

const scamRiskLabels: Record<RiskLevel, string> = {
  unreviewed: 'Non évalué',
  low: 'Signaux faibles',
  medium: 'Signaux à vérifier',
  high: 'Risque élevé',
  urgent: 'Urgent — agir vite',
};

const scamRiskTones: Record<RiskLevel, Tone> = {
  unreviewed: 'neutral',
  low: 'success',
  medium: 'warning',
  high: 'danger',
  urgent: 'danger',
};

const scamStatusLabels: Record<ScamCheckStatus, string> = {
  new: 'Nouveau',
  reviewing: 'En évaluation',
  responded: 'Répondu',
  closed: 'Fermé',
};

const scamStatusTones: Record<ScamCheckStatus, Tone> = {
  new: 'info',
  reviewing: 'warning',
  responded: 'success',
  closed: 'neutral',
};

const urgencyLabels: Record<ScamUrgency, string> = {
  low: 'Faible',
  normal: 'Normal',
  high: 'Élevée',
};

const urgencyTones: Record<ScamUrgency, Tone> = {
  low: 'success',
  normal: 'neutral',
  high: 'danger',
};

const riskOptions: RiskLevel[] = ['unreviewed', 'low', 'medium', 'high', 'urgent'];
const statusOptions: ScamCheckStatus[] = ['new', 'reviewing', 'responded', 'closed'];

function formatDate(value: string) {
  return new Intl.DateTimeFormat('fr-CA', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function toEditable(sc: AdminScamCheck): EditableScamCheck {
  return { ...sc, notes: [...sc.notes] };
}

function applyOverride(sc: EditableScamCheck, overrides: ScamCheckOverrides): EditableScamCheck {
  return { ...sc, ...overrides[sc.id] };
}

const inputClass =
  'w-full rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-sm text-marhaban-ink focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20';

export function AdminScamChecksClient({ supabaseScamChecks = [], mockScamChecks }: AdminScamChecksClientProps) {
  const [overrides, setOverrides] = useState<ScamCheckOverrides>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [riskDraft, setRiskDraft] = useState<RiskLevel>('unreviewed');
  const [statusDraft, setStatusDraft] = useState<ScamCheckStatus>('new');
  const [recommendationDraft, setRecommendationDraft] = useState('');
  const [notesDraft, setNotesDraft] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  const localScamChecks = useSyncExternalStore(
    subscribeToLocalScamChecks,
    getLocalScamChecks,
    () => emptyLocalChecks,
  );
  const localCheckIds = useMemo(
    () => new Set(localScamChecks.map((sc) => sc.id)),
    [localScamChecks],
  );
  const supabaseCheckIds = useMemo(
    () => new Set(supabaseScamChecks.map((sc) => sc.id)),
    [supabaseScamChecks],
  );

  const scamChecks = useMemo(
    () => [
      ...supabaseScamChecks.map((sc) => applyOverride(toEditable(sc), overrides)),
      ...localScamChecks.map((sc) => applyOverride(toEditable(sc), overrides)),
      ...mockScamChecks.map((sc) => applyOverride(toEditable(sc), overrides)),
    ],
    [localScamChecks, mockScamChecks, overrides, supabaseScamChecks],
  );

  const selected = selectedId ? scamChecks.find((sc) => sc.id === selectedId) : undefined;

  const total = scamChecks.length;
  const pending = scamChecks.filter((sc) => sc.status === 'new' || sc.status === 'reviewing').length;
  const highRisk = scamChecks.filter((sc) => sc.riskLevel === 'high' || sc.riskLevel === 'urgent').length;
  const resolved = scamChecks.filter((sc) => sc.status === 'responded' || sc.status === 'closed').length;

  const kpis = [
    { label: 'Total demandes', value: total, detail: 'Signalements reçus' },
    { label: 'En attente', value: pending, detail: 'Nouveau ou en évaluation' },
    { label: 'Risque élevé', value: highRisk, detail: 'Attention prioritaire requise' },
    { label: 'Résolues', value: resolved, detail: 'Répondu ou fermé' },
  ];

  function openDetail(sc: EditableScamCheck) {
    setSelectedId(sc.id);
    setEditMode(false);
    setSavedMessage('');
  }

  function openEvaluation(sc: EditableScamCheck) {
    setSelectedId(sc.id);
    setEditMode(true);
    setRiskDraft(sc.riskLevel);
    setStatusDraft(sc.status);
    setRecommendationDraft(sc.recommendation ?? '');
    setNotesDraft(sc.notes.join('\n'));
    setSavedMessage('');
  }

  function markResponded(id: string) {
    setOverrides((prev) => ({
      ...prev,
      [id]: { ...prev[id], status: 'responded' as const },
    }));
    if (selectedId === id) setEditMode(false);
  }

  function saveEvaluation() {
    if (!selected) return;
    setOverrides((prev) => ({
      ...prev,
      [selected.id]: {
        ...prev[selected.id],
        riskLevel: riskDraft,
        status: statusDraft,
        recommendation: recommendationDraft.trim() || undefined,
        notes: notesDraft.trim() ? [notesDraft.trim()] : [],
      },
    }));
    setEditMode(false);
    setSavedMessage('Évaluation sauvegardée en mémoire.');
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[1.75rem] border border-marhaban-clay/20 bg-[#fff4e8] px-5 py-4 text-sm leading-relaxed text-marhaban-ink shadow-warm-sm">
        <span className="font-bold text-marhaban-clay">Admin MVP mock/local</span>
        <span className="text-marhaban-ink/75"> — non prêt production sans authentification.</span>
      </div>

      <header className="rounded-[1.75rem] border border-marhaban-leaf/12 bg-white/85 p-6 shadow-warm-sm">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">Signalements</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-semibold leading-tight text-marhaban-forestDark sm:text-4xl">
              Demandes anti-arnaque
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-marhaban-muted sm:text-base">
              Évaluer les situations signalées de manière informative et prudente.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <AdminBadge label="Mock data" tone="dark" />
            {supabaseScamChecks.length > 0 ? (
              <AdminBadge label={`${supabaseScamChecks.length} Supabase`} tone="success" />
            ) : null}
            {localScamChecks.length > 0 ? (
              <AdminBadge label={`${localScamChecks.length} local`} tone="warning" />
            ) : null}
          </div>
        </div>
      </header>

      <div className="rounded-[1.75rem] border border-marhaban-leaf/12 bg-white/75 px-5 py-4 text-sm leading-relaxed text-marhaban-muted shadow-warm-sm">
        Évaluation informative du risque. Signaux à vérifier. Recommandation prudente. Ressources officielles à consulter.
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Indicateurs demandes anti-arnaque">
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

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <AdminCard title="Toutes les demandes" eyebrow="Tableau">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead>
                <tr className="border-b border-marhaban-leaf/12 text-xs font-bold uppercase tracking-[0.12em] text-marhaban-muted">
                  <th className="py-3 pr-4">Date</th>
                  <th className="px-4 py-3">Demandeur / situation</th>
                  <th className="px-4 py-3">Montant</th>
                  <th className="px-4 py-3">Urgence</th>
                  <th className="px-4 py-3">Signaux</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="py-3 pl-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-marhaban-leaf/10">
                {scamChecks.map((sc) => (
                  <tr key={sc.id} className="align-top transition hover:bg-marhaban-cream/70">
                    <td className="py-4 pr-4 text-xs text-marhaban-muted">{formatDate(sc.createdAt)}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-marhaban-forestDark">{sc.requesterName}</p>
                        {supabaseCheckIds.has(sc.id) ? (
                          <AdminBadge label="Supabase" tone="success" className="px-2 py-0.5 text-[10px]" />
                        ) : null}
                        {localCheckIds.has(sc.id) ? (
                          <AdminBadge label="Local" tone="warning" className="px-2 py-0.5 text-[10px]" />
                        ) : null}
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs text-marhaban-muted">{sc.situation}</p>
                    </td>
                    <td className="px-4 py-4 text-marhaban-muted">{sc.amountRequested ?? '—'}</td>
                    <td className="px-4 py-4">
                      <AdminBadge label={urgencyLabels[sc.urgency]} tone={urgencyTones[sc.urgency]} />
                    </td>
                    <td className="px-4 py-4">
                      <AdminBadge label={scamRiskLabels[sc.riskLevel]} tone={scamRiskTones[sc.riskLevel]} />
                    </td>
                    <td className="px-4 py-4">
                      <AdminBadge label={scamStatusLabels[sc.status]} tone={scamStatusTones[sc.status]} />
                    </td>
                    <td className="py-4 pl-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => openDetail(sc)}
                          className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-marhaban-leaf/15 bg-white px-3 py-1 text-xs font-bold text-marhaban-ink shadow-warm-sm transition hover:border-marhaban-clay/30 hover:bg-marhaban-cream"
                        >
                          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                          Voir
                        </button>
                        <button
                          type="button"
                          onClick={() => openEvaluation(sc)}
                          className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-marhaban-leaf/15 bg-white px-3 py-1 text-xs font-bold text-marhaban-ink shadow-warm-sm transition hover:border-marhaban-clay/30 hover:bg-marhaban-cream"
                        >
                          <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
                          Évaluer
                        </button>
                        {sc.status !== 'responded' && sc.status !== 'closed' ? (
                          <button
                            type="button"
                            onClick={() => markResponded(sc.id)}
                            className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-marhaban-leaf/15 bg-white px-3 py-1 text-xs font-bold text-marhaban-ink shadow-warm-sm transition hover:border-marhaban-clay/30 hover:bg-marhaban-cream"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                            Marquer répondu
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminCard>

        <div className="space-y-6">
          <AdminCard title={editMode ? 'Évaluation' : 'Détail rapide'} eyebrow="Sélection">
            {selected ? (
              <div className="space-y-5">
              <div className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-heading text-2xl font-semibold leading-tight text-marhaban-forestDark">
                      {selected.requesterName}
                    </p>
                    <p className="mt-1 text-sm text-marhaban-muted">{selected.email}</p>
                  </div>
                  <AdminBadge label={scamStatusLabels[selected.status]} tone={scamStatusTones[selected.status]} />
                </div>
                <dl className="mt-5 grid gap-4 text-sm">
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Situation signalée</dt>
                    <dd className="mt-1 leading-relaxed text-marhaban-muted">{selected.situation}</dd>
                  </div>
                  {selected.phone ? (
                    <div>
                      <dt className="font-bold text-marhaban-forestDark">Téléphone</dt>
                      <dd className="mt-1 text-marhaban-muted">{selected.phone}</dd>
                    </div>
                  ) : null}
                  {selected.cityProvince ? (
                    <div>
                      <dt className="font-bold text-marhaban-forestDark">Ville / province</dt>
                      <dd className="mt-1 text-marhaban-muted">{selected.cityProvince}</dd>
                    </div>
                  ) : null}
                  {selected.amountRequested ? (
                    <div>
                      <dt className="font-bold text-marhaban-forestDark">Montant demandé</dt>
                      <dd className="mt-1 text-marhaban-muted">{selected.amountRequested}</dd>
                    </div>
                  ) : null}
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Urgence</dt>
                    <dd className="mt-1">
                      <AdminBadge label={urgencyLabels[selected.urgency]} tone={urgencyTones[selected.urgency]} />
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Évaluation informative du risque</dt>
                    <dd className="mt-1">
                      <AdminBadge label={scamRiskLabels[selected.riskLevel]} tone={scamRiskTones[selected.riskLevel]} />
                    </dd>
                  </div>
                  {selected.recommendation ? (
                    <div>
                      <dt className="font-bold text-marhaban-forestDark">Recommandation prudente</dt>
                      <dd className="mt-1 leading-relaxed text-marhaban-muted">{selected.recommendation}</dd>
                    </div>
                  ) : null}
                  {selected.notes.length > 0 ? (
                    <div>
                      <dt className="font-bold text-marhaban-forestDark">Notes internes</dt>
                      <dd className="mt-1 whitespace-pre-wrap leading-relaxed text-marhaban-muted">
                        {selected.notes.join('\n')}
                      </dd>
                    </div>
                  ) : null}
                  <div>
                    <dt className="font-bold text-marhaban-forestDark">Ressources officielles à consulter</dt>
                    <dd className="mt-1 text-marhaban-muted">
                      ACFC, Cybercrime.gc.ca, équipe locale de protection des consommateurs
                    </dd>
                  </div>
                </dl>
              </div>

              {editMode ? (
                <div className="rounded-2xl border border-marhaban-leaf/12 bg-white p-5">
                  <div className="grid gap-4">
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-marhaban-forestDark">
                        Signaux à vérifier — niveau de risque
                      </span>
                      <select
                        value={riskDraft}
                        onChange={(e) => setRiskDraft(e.target.value as RiskLevel)}
                        className={inputClass}
                      >
                        {riskOptions.map((r) => (
                          <option key={r} value={r}>{scamRiskLabels[r]}</option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-marhaban-forestDark">Statut</span>
                      <select
                        value={statusDraft}
                        onChange={(e) => setStatusDraft(e.target.value as ScamCheckStatus)}
                        className={inputClass}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>{scamStatusLabels[s]}</option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-marhaban-forestDark">
                        Recommandation prudente
                      </span>
                      <textarea
                        value={recommendationDraft}
                        onChange={(e) => setRecommendationDraft(e.target.value)}
                        rows={3}
                        placeholder="Ex. Vérifier via Cybercrime.gc.ca avant tout paiement."
                        className={`${inputClass} resize-none placeholder:text-marhaban-muted`}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-marhaban-forestDark">Notes internes</span>
                      <textarea
                        value={notesDraft}
                        onChange={(e) => setNotesDraft(e.target.value)}
                        rows={4}
                        className={`${inputClass} resize-none`}
                      />
                    </label>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={saveEvaluation}
                      className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-marhaban-forestDark px-5 py-2 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-clay"
                    >
                      <Save className="h-4 w-4" aria-hidden="true" />
                      Sauvegarder
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-marhaban-leaf/20 bg-marhaban-cream px-5 py-2 text-sm font-bold text-marhaban-ink transition hover:bg-marhaban-mint/70"
                    >
                      Annuler
                    </button>
                  </div>
                  {savedMessage ? (
                    <p className="mt-3 text-xs font-semibold text-marhaban-clay">{savedMessage}</p>
                  ) : null}
                </div>
              ) : (
                <div className="rounded-2xl border border-marhaban-leaf/12 bg-white p-5">
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => openEvaluation(selected)}
                      className="inline-flex min-h-[38px] items-center gap-2 rounded-full bg-marhaban-forestDark px-4 py-2 text-xs font-bold text-white shadow-warm-sm transition hover:bg-marhaban-clay"
                    >
                      <ShieldAlert className="h-4 w-4" aria-hidden="true" />
                      Évaluer
                    </button>
                    {selected.status !== 'responded' && selected.status !== 'closed' ? (
                      <button
                        type="button"
                        onClick={() => markResponded(selected.id)}
                        className="inline-flex min-h-[38px] items-center gap-2 rounded-full bg-marhaban-clay px-4 py-2 text-xs font-bold text-white shadow-warm-sm transition hover:bg-marhaban-forestDark"
                      >
                        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        Marquer répondu
                      </button>
                    ) : null}
                  </div>
                  {savedMessage ? (
                    <p className="mt-3 text-xs font-semibold text-marhaban-clay">{savedMessage}</p>
                  ) : null}
                  <p className="mt-3 text-xs leading-relaxed text-marhaban-muted">
                    Signaux à vérifier — évaluation informative uniquement, pas de conseil juridique.
                  </p>
                </div>
              )}
              </div>
            ) : (
              <div className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 p-5">
                <p className="font-semibold text-marhaban-forestDark">
                  Sélectionne une demande pour voir les détails.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-marhaban-muted">
                  Utilise &quot;Voir&quot; ou &quot;Évaluer&quot; depuis le tableau pour ouvrir le panneau.
                </p>
              </div>
            )}
          </AdminCard>

          {selected ? (
            <AdminCard title="Notes internes" eyebrow="Suivi">
              <AdminNotesPanel targetType="scam_check" targetId={selected.id} />
            </AdminCard>
          ) : null}
        </div>
      </div>
    </div>
  );
}
