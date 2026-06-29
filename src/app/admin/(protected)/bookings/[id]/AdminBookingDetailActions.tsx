'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PreparationFormStatus } from '@/types/admin';

const ADMIN_STATUS_OPTIONS: { value: PreparationFormStatus; label: string }[] = [
  { value: 'contacted', label: 'Contacté' },
  { value: 'confirmed_manually', label: 'Confirmé manuellement' },
  { value: 'completed', label: 'Terminé' },
  { value: 'cancelled', label: 'Annulé' },
  { value: 'no_show', label: 'Absent' },
];

export function AdminBookingDetailActions({
  formId,
  currentStatus,
}: {
  formId: string;
  currentStatus: PreparationFormStatus;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<PreparationFormStatus>(currentStatus);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  async function updateStatus(next: PreparationFormStatus) {
    if (next === status || isSaving) return;
    setIsSaving(true);
    setMessage('');
    try {
      const res = await fetch(`/api/admin/preparation-forms/${formId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      });
      const result = await res.json() as { ok?: boolean; error?: string };
      if (res.ok && result.ok === true) {
        setStatus(next);
        setMessage('Statut mis à jour.');
        router.refresh();
      } else {
        setMessage(`Erreur : ${result.error || 'mise à jour impossible'}`);
      }
    } catch {
      setMessage('Erreur de connexion.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2">
        {ADMIN_STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            disabled={isSaving || status === opt.value}
            onClick={() => void updateStatus(opt.value)}
            className={`inline-flex min-h-[40px] w-full items-center justify-center rounded-full border px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${
              status === opt.value
                ? 'border-marhaban-leaf/40 bg-marhaban-mint/60 text-marhaban-forestDark'
                : 'border-marhaban-leaf/15 bg-white text-marhaban-ink hover:bg-marhaban-cream'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {isSaving ? (
        <p className="text-xs text-marhaban-muted">Sauvegarde...</p>
      ) : message ? (
        <p className="text-xs font-semibold text-marhaban-clay">{message}</p>
      ) : null}
    </div>
  );
}
