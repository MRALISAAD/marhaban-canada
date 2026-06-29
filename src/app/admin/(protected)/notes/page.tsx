export const dynamic = 'force-dynamic';

import { AdminBadge } from '@/components/admin/AdminBadge';
import { AdminCard } from '@/components/admin/AdminCard';
import { createServerClient } from '@/lib/supabase/server';
import type { AdminNoteTargetType } from '@/types/admin';

type NoteRow = {
  id: string;
  created_at: string;
  updated_at: string;
  target_type: AdminNoteTargetType;
  target_id: string;
  body: string;
  status: 'active' | 'archived';
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('fr-CA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

const targetTypeLabels: Record<AdminNoteTargetType, string> = {
  booking: 'Réservation',
  case_file: 'Dossier',
  scam_check: 'Anti-arnaque',
  resource: 'Ressource',
};

const targetTypeTones: Record<AdminNoteTargetType, 'warning' | 'success' | 'neutral' | 'danger'> = {
  booking: 'warning',
  case_file: 'success',
  scam_check: 'danger',
  resource: 'neutral',
};

async function getNotes(): Promise<NoteRow[]> {
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from('admin_notes')
      .select('id, created_at, updated_at, target_type, target_id, body, status')
      .order('created_at', { ascending: false })
      .limit(100);
    return (data ?? []) as NoteRow[];
  } catch {
    return [];
  }
}

export default async function AdminNotesPage() {
  const notes = await getNotes();
  const activeNotes = notes.filter((n) => n.status === 'active');
  const archivedNotes = notes.filter((n) => n.status === 'archived');

  return (
    <div className="space-y-6">
      <header className="rounded-[1.75rem] border border-marhaban-leaf/12 bg-white/85 p-6 shadow-warm-sm">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">Suivi admin</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-semibold leading-tight text-marhaban-forestDark sm:text-4xl">
              Notes admin
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-marhaban-muted sm:text-base">
              Toutes les notes de suivi créées sur les dossiers, réservations et signalements.
            </p>
          </div>
          <AdminBadge label={`${activeNotes.length} actives`} tone={activeNotes.length > 0 ? 'warning' : 'success'} />
        </div>
      </header>

      <AdminCard title="Notes actives" eyebrow="Suivi en cours">
        {activeNotes.length > 0 ? (
          <div className="grid gap-3">
            {activeNotes.map((note) => (
              <div
                key={note.id}
                className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <AdminBadge
                      label={targetTypeLabels[note.target_type] ?? note.target_type}
                      tone={targetTypeTones[note.target_type] ?? 'neutral'}
                    />
                    <span className="rounded-full border border-marhaban-leaf/15 bg-marhaban-cream px-2.5 py-0.5 text-[11px] font-mono text-marhaban-muted">
                      {note.target_id.slice(0, 8)}…
                    </span>
                  </div>
                  <time className="text-xs text-marhaban-muted" dateTime={note.created_at}>
                    {formatDate(note.created_at)}
                  </time>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-marhaban-ink">
                  {note.body}
                </p>
                {note.updated_at !== note.created_at ? (
                  <p className="mt-2 text-xs text-marhaban-muted">
                    Modifié le {formatDate(note.updated_at)}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 p-4 text-sm text-marhaban-muted">
            Aucune note active. Les notes sont créées depuis les dossiers, réservations et signalements.
          </p>
        )}
      </AdminCard>

      {archivedNotes.length > 0 ? (
        <AdminCard title="Notes archivées" eyebrow="Historique">
          <div className="grid gap-3">
            {archivedNotes.map((note) => (
              <div
                key={note.id}
                className="rounded-2xl border border-marhaban-leaf/8 bg-marhaban-cream/40 p-4 opacity-70"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <AdminBadge label={targetTypeLabels[note.target_type] ?? note.target_type} tone="neutral" />
                    <AdminBadge label="Archivée" tone="neutral" />
                  </div>
                  <time className="text-xs text-marhaban-muted" dateTime={note.created_at}>
                    {formatDate(note.created_at)}
                  </time>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-marhaban-ink/60">
                  {note.body}
                </p>
              </div>
            ))}
          </div>
        </AdminCard>
      ) : null}
    </div>
  );
}
