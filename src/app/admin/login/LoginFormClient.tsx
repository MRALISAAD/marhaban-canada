'use client';

import { Suspense, useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';

const isDev = process.env.NODE_ENV === 'development';

function resolveInitialError(code: string | null): string {
  if (!code) return '';
  switch (code) {
    case 'missing_allowlist':
      return isDev
        ? '[DEV] ADMIN_ALLOWED_EMAILS est vide ou manquant dans .env.local — aucun email autorisé (admin_env_missing).'
        : 'Identifiants incorrects ou accès non autorisé.';
    case 'unauthorized':
      return isDev
        ? '[DEV] Email non présent dans ADMIN_ALLOWED_EMAILS (email_not_allowed). Vérifie .env.local et relance le serveur.'
        : 'Identifiants incorrects ou accès non autorisé.';
    case 'invalid_credentials':
      return isDev
        ? '[DEV] Identifiants invalides (supabase_auth_failed). Vérifie email/mot de passe dans Supabase → Authentication → Users.'
        : 'Identifiants incorrects ou accès non autorisé.';
    case 'session_missing':
      return isDev
        ? '[DEV] Session introuvable après connexion (session_missing). Cookie Supabase manquant ou expiré.'
        : 'Identifiants incorrects ou accès non autorisé.';
    default:
      return isDev
        ? `[DEV] Erreur inconnue : ${code}`
        : 'Identifiants incorrects ou accès non autorisé.';
  }
}

function AdminLoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorCode = searchParams.get('error');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(() => resolveInitialError(errorCode));
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (isDev) {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        setError('[DEV] Variables Supabase manquantes dans .env.local (supabase_not_configured) — NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY requis.');
        setLoading(false);
        return;
      }
    }

    const supabase = createSupabaseBrowserClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      if (isDev) {
        const msg = authError.message.toLowerCase();
        const hint = msg.includes('not confirmed')
          ? "L'email n'est pas confirmé. Va dans Supabase → Authentication → Users et confirme l'adresse (supabase_auth_failed)."
          : msg.includes('invalid login') || msg.includes('invalid credentials') || msg.includes('invalid email')
            ? "Identifiants invalides (supabase_auth_failed). Crée l'utilisateur dans Supabase → Authentication → Users → Add user, puis ajoute son email dans ADMIN_ALLOWED_EMAILS."
            : `Erreur Supabase (${authError.status ?? '?'}) : ${authError.message}`;
        setError(`[DEV] ${hint}`);
      } else {
        setError('Identifiants incorrects ou accès non autorisé.');
      }
      setLoading(false);
      return;
    }

    // Password login always produces aal1; MFA page handles dashboard redirect once aal2
    router.push('/admin/mfa');
    router.refresh();
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
            Connexion sécurisée via Supabase Auth. Réservé aux administrateurs autorisés.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <div>
              <label htmlFor="admin-email" className="mb-2 block text-sm font-semibold text-marhaban-ink">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-sm text-marhaban-ink transition focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="mb-2 block text-sm font-semibold text-marhaban-ink">
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
              <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-700">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-marhaban-forestDark px-6 py-3 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-clay disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function LoginFormClient() {
  return (
    <Suspense>
      <AdminLoginInner />
    </Suspense>
  );
}
