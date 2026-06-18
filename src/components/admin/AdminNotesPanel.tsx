'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Edit3, Save, Trash2, X } from 'lucide-react';
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
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState('');
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const isValidTargetId = uuidPattern.test(targetId);

  useEffect(() => {
    setNotes(initialNotes ?? []);
    setNoteDraft('');
    setErrorMessage('');
    setEditingId(null);

    if (!isValidTargetId) return;

    const controller = new AbortController();
    const params = new URLSearchParams({
      target_type: targetType,
      target_id: targetId,
    });

    async function loadNotes() {
      try {
        const response = await fetch(`/api/admin/notes?${params.toString()}`, {
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
      const response = await fetch('/api/admin/notes', {
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

  function openEdit(note: AdminNote) {
    setEditingId(note.id);
    setEditDraft(note.body);
    setErrorMessage('');
  }

  function cancelEdit() {
    setEditingId(null);
    setEditDraft('');
  }

  async function saveEdit(noteId: string) {
    const body = editDraft.trim();
    if (!body || isSavingEdit) return;

    setIsSavingEdit(true);
    setErrorMessage('');

    try {
      const response = await fetch(`/api/admin/notes/${noteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body }),
      });
      const result = await parseApiResponse(response);

      if (response.ok && result.ok === true) {
        setNotes((current) =>
          current.map((note) =>
            note.id === noteId
              ? { ...note, body, updatedAt: new Date().toISOString() }
              : note,
          ),
        );
        setEditingId(null);
        setEditDraft('');
      } else {
        setErrorMessage(result.error || 'Impossible de modifier la note.');
      }
    } catch {
      setErrorMessage('Impossible de modifier la note.');
    } finally {
      setIsSavingEdit(false);
    }
  }

  async function deleteNote(noteId: string) {
    if (!window.confirm('Supprimer cette note ? Cette action est irréversible.')) return;
    if (deletingId) return;

    setDeletingId(noteId);
    setErrorMessage('');

    try {
      const response = await fetch(`/api/admin/notes/${noteId}`, { method: 'DELETE' });
      const result = await parseApiResponse(response);

      if (response.ok && result.ok === true) {
        setNotes((current) => current.filter((note) => note.id !== noteId));
      } else {
        setErrorMessage(result.error || 'Impossible de supprimer la note.');
      }
    } catch {
      setErrorMessage('Impossible de supprimer la note.');
    } finally {
      setDeletingId(null);
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
              {editingId === note.id ? (
                <div className="space-y-3">
                  <textarea
                    value={editDraft}
                    onChange={(e) => setEditDraft(e.target.value)}
                    rows={3}
                    maxLength={2000}
                    className="w-full resize-none rounded-2xl border border-marhaban-leaf/18 bg-white px-4 py-3 text-sm text-marhaban-ink focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => void saveEdit(note.id)}
                      disabled={isSavingEdit || !editDraft.trim()}
                      className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full bg-marhaban-forestDark px-3 py-1 text-xs font-bold text-white shadow-warm-sm transition hover:bg-marhaban-clay disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Save className="h-3.5 w-3.5" aria-hidden="true" />
                      {isSavingEdit ? 'Sauvegarde...' : 'Sauvegarder'}
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-marhaban-leaf/15 bg-white px-3 py-1 text-xs font-bold text-marhaban-ink shadow-warm-sm transition hover:bg-marhaban-cream"
                    >
                      <X className="h-3.5 w-3.5" aria-hidden="true" />
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-marhaban-ink">{note.body}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-xs text-marhaban-muted">{formatDate(note.createdAt)}</p>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => openEdit(note)}
                        disabled={!!deletingId}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-marhaban-muted underline hover:text-marhaban-forestDark disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Edit3 className="h-3 w-3" aria-hidden="true" />
                        Modifier
                      </button>
                      <button
                        type="button"
                        onClick={() => void deleteNote(note.id)}
                        disabled={deletingId === note.id}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 underline hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Trash2 className="h-3 w-3" aria-hidden="true" />
                        {deletingId === note.id ? 'Suppression...' : 'Supprimer'}
                      </button>
                    </div>
                  </div>
                </>
              )}
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
