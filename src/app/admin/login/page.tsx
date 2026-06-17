'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { verifyAdminPassword } from '@/lib/admin/admin-auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await verifyAdminPassword(password);

    if (result.ok) {
      router.push('/admin/dashboard');
    } else {
      setError(result.error ?? 'Mot de passe incorrect.');
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-marhaban-cream px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-[1.75rem] border border-marhaban-leaf/12 bg-white p-8 shadow-warm-sm">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">
            Marhaban Admin
          </p>
          <h1 className="mt-2 font-heading text-2xl font-semibold leading-tight text-marhaban-forestDark">
            Accès admin
          </h1>
          <p className="mt-3 text-xs leading-relaxed text-marhaban-muted">
            Accès temporaire MVP — non prêt production sans authentification.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-sm font-semibold text-marhaban-ink"
              >
                Mot de passe
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-sm text-marhaban-ink transition focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20"
              />
            </div>

            {error ? (
              <p
                role="alert"
                className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-700"
              >
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-marhaban-forestDark px-6 py-3 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-clay disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Vérification...' : 'Entrer'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
