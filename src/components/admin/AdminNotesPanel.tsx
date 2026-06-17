'use client';

import { FormEvent, useEffect, useState } from 'react';
import type { AdminNote, AdminNoteTargetType } from '@/types/admin';

type AdminNotesPanelProps = {
  targetType: AdminNoteTargetType;
  targetId: string;
  initialNotes?: readonly AdminNote[];
  title?: string;
};

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function formatDate(value: string) {
  return new Intl.DateTimeFormat('fr-CA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

async function parseApiResponse(response: Response) {
  try {
    return await response.json();
  } catch {
    return { ok: false, error: response.statusText || 'Erreur API' };
  }
}

export function AdminNotesPanel({ targetType, targetId, initialNotes, title }: AdminNotesPanelProps) {
  const [notes, setNotes] = useState<readonly AdminNote[]>(initialNotes ?? []);
  const [noteDraft, setNoteDraft] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [archivingId, setArchivingId] = useState<string | null>(null);
  const isValidTargetId = uuidPattern.test(targetId);

  useEffect(() => {
    setNotes(initialNotes ?? []);
    setNoteDraft('');
    setErrorMessage('');

    if (!isValidTargetId) return;

    const controller = new AbortController();
    const params = new URLSearchParams({
      target_type: targetType,
      target_id: targetId,
    });

    async function loadNotes() {
      try {
        const response = await fetch(`/api/admin-notes?${params.toString()}`, {
          signal: controller.signal,
        });
        const result = await parseApiResponse(response);

        if (response.ok && result.ok === true && Array.isArray(result.notes)) {
          setNotes(result.notes);
        } else {
          setErrorMessage(result.error || 'Impossible de charger les notes.');
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setErrorMessage('Impossible de charger les notes.');
      }
    }

    loadNotes();

    return () => controller.abort();
  }, [initialNotes, isValidTargetId, targetId, targetType]);

  async function addNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const body = noteDraft.trim();
    if (!body || isAdding) return;

    setIsAdding(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/admin-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target_type: targetType,
          target_id: targetId,
          body,
        }),
      });
      const result = await parseApiResponse(response);

      if (response.ok && result.ok === true && typeof result.noteId === 'string') {
        const now = new Date().toISOString();
        setNotes((current) => [
          {
            id: result.noteId,
            createdAt: now,
            updatedAt: now,
            targetType,
            targetId,
            body,
            status: 'active',
          },
          ...current,
        ]);
        setNoteDraft('');
      } else {
        setErrorMessage(result.error || 'Impossible d’ajouter la note.');
      }
    } catch {
      setErrorMessage('Impossible d’ajouter la note.');
    } finally {
      setIsAdding(false);
    }
  }

  async function archiveNote(noteId: string) {
    if (archivingId) return;

    setArchivingId(noteId);
    setErrorMessage('');

    try {
      const response = await fetch(`/api/admin-notes/${noteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'archived' }),
      });
      const result = await parseApiResponse(response);

      if (response.ok && result.ok === true) {
        setNotes((current) => current.filter((note) => note.id !== noteId));
      } else {
        setErrorMessage(result.error || 'Impossible d’archiver la note.');
      }
    } catch {
      setErrorMessage('Impossible d’archiver la note.');
    } finally {
      setArchivingId(null);
    }
  }

  if (!isValidTargetId) {
    return (
      <div className="space-y-4">
        {title ? <p className="text-sm font-bold text-marhaban-forestDark">{title}</p> : null}
        <p className="text-sm leading-relaxed text-marhaban-muted">
          Les notes internes sont disponibles uniquement pour les enregistrements Supabase.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {title ? <p className="text-sm font-bold text-marhaban-forestDark">{title}</p> : null}

      {notes.length > 0 ? (
        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note.id} className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/70 p-4">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-marhaban-ink">{note.body}</p>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs text-marhaban-muted">{formatDate(note.createdAt)}</p>
                <button
                  type="button"
                  onClick={() => archiveNote(note.id)}
                  disabled={archivingId === note.id}
                  className="text-xs font-semibold text-marhaban-muted underline hover:text-marhaban-clay disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Archiver
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-marhaban-muted">Aucune note interne pour l&apos;instant.</p>
      )}

      <form onSubmit={addNote} className="mt-4 space-y-3">
        <textarea
          value={noteDraft}
          onChange={(e) => setNoteDraft(e.target.value)}
          rows={3}
          maxLength={2000}
          placeholder="Ajouter une note interne..."
          className="w-full resize-none rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-sm text-marhaban-ink placeholder:text-marhaban-muted focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20"
        />
        <button
          type="submit"
          disabled={isAdding || !noteDraft.trim()}
          className="inline-flex min-h-[38px] items-center gap-2 rounded-full bg-marhaban-forestDark px-4 py-2 text-xs font-bold text-white shadow-warm-sm transition hover:bg-marhaban-clay disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isAdding ? 'Ajout...' : 'Ajouter note'}
        </button>
        {errorMessage ? <p className="text-xs text-red-600">{errorMessage}</p> : null}
      </form>
    </div>
  );
}
