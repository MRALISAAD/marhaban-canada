'use client';

import { useRef, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Copy, Eye, EyeOff, Lock } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';

const isDev = process.env.NODE_ENV === 'development';

type SetupData = {
  factorId: string;
  qrCode: string;
  secret: string;
};

type AdminMfaClientProps = {
  mode: 'setup' | 'verify';
  factorId?: string;
};

type SetupPhase = 'locked' | 'setup_disabled' | 'enrolling' | 'ready';

export function AdminMfaClient({ mode, factorId: verifyFactorId }: AdminMfaClientProps) {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  // Setup state
  const [setupPhase, setSetupPhase] = useState<SetupPhase>('locked');
  const [setupCode, setSetupCode] = useState('');
  const [setupCodeError, setSetupCodeError] = useState<string | null>(null);
  const [setupCodeLoading, setSetupCodeLoading] = useState(false);
  const [setupData, setSetupData] = useState<SetupData | null>(null);
  const [showSecret, setShowSecret] = useState(false);
  const [copied, setCopied] = useState(false);
  const enrollingRef = useRef(false);

  // Shared state
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSetupCodeSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (setupCodeLoading) return;
    setSetupCodeLoading(true);
    setSetupCodeError(null);

    try {
      const res = await fetch('/api/admin/mfa/setup-gate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ setup_code: setupCode }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        if (data.error === 'Setup disabled') {
          setSetupPhase('setup_disabled');
        } else {
          setSetupCodeError(
            isDev
              ? `[DEV] Code refusé (${res.status}): ${data.error ?? 'inconnu'}`
              : 'Code de configuration incorrect.',
          );
        }
        setSetupCodeLoading(false);
        return;
      }
    } catch {
      setSetupCodeError('Erreur de connexion. Réessaie.');
      setSetupCodeLoading(false);
      return;
    }

    setSetupPhase('enrolling');
    setSetupCodeLoading(false);

    if (enrollingRef.current) return;
    enrollingRef.current = true;

    const { data: enrollData, error: enrollErr } = await supabase.auth.mfa.enroll({ factorType: 'totp' });
    if (enrollErr || !enrollData) {
      setSetupCodeError('Erreur lors de la configuration MFA. Veuillez recharger la page.');
      setSetupPhase('locked');
      enrollingRef.current = false;
      return;
    }
    setSetupData({
      factorId: enrollData.id,
      qrCode: enrollData.totp.qr_code,
      secret: enrollData.totp.secret,
    });
    setSetupPhase('ready');
  }

  async function handleMfaSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    const trimmedCode = code.trim();
    if (!/^\d{6}$/.test(trimmedCode)) {
      setError('Le code doit contenir exactement 6 chiffres.');
      return;
    }

    const factorId = mode === 'setup' ? setupData?.factorId : verifyFactorId;
    if (!factorId) {
      setError('Session expirée. Veuillez recharger la page.');
      return;
    }

    setLoading(true);
    setError(null);

    const { error: verifyErr } = await supabase.auth.mfa.challengeAndVerify({
      factorId,
      code: trimmedCode,
    });

    if (verifyErr) {
      setError(
        isDev
          ? `[DEV] Erreur MFA (${verifyErr.status ?? '?'}) : ${verifyErr.message}`
          : 'Code incorrect ou expiré. Génère un nouveau code depuis ton application.',
      );
      setCode('');
      setLoading(false);
      return;
    }

    router.push('/admin/dashboard');
    router.refresh();
  }

  async function copySecret() {
    if (!setupData?.secret) return;
    try {
      await navigator.clipboard.writeText(setupData.secret);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard permission denied
    }
  }

  if (mode === 'verify') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-marhaban-cream px-4">
        <div className="w-full max-w-sm">
          <div className="rounded-[1.75rem] border border-marhaban-leaf/12 bg-white p-8 shadow-warm-sm">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">
              Marhaban Admin
            </p>
            <h1 className="mt-2 font-heading text-2xl font-semibold leading-tight text-marhaban-forestDark">
              Code de sécurité
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-marhaban-muted">
              Entre le code à 6 chiffres de ton application d&apos;authentification.
            </p>

            <form onSubmit={handleMfaSubmit} className="mt-6 grid gap-4">
              <div>
                <label htmlFor="mfa-code-verify" className="mb-2 block text-sm font-semibold text-marhaban-ink">
                  Code à 6 chiffres
                </label>
                <input
                  id="mfa-code-verify"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  required
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  className="w-full rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-center font-mono text-lg tracking-[0.35em] text-marhaban-ink transition focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20"
                />
              </div>

              {error ? (
                <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-700">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={loading || code.length !== 6}
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-marhaban-forestDark px-6 py-3 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-clay disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Validation…' : 'Valider'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (setupPhase === 'setup_disabled') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-marhaban-cream px-4">
        <div className="w-full max-w-sm">
          <div className="rounded-[1.75rem] border border-marhaban-leaf/12 bg-white p-8 shadow-warm-sm">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">Marhaban Admin</p>
            <h1 className="mt-2 font-heading text-2xl font-semibold leading-tight text-marhaban-forestDark">
              Double authentification requise
            </h1>
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              La configuration MFA est désactivée. Active temporairement{' '}
              <code className="font-mono">ADMIN_MFA_SETUP_ENABLED</code> côté serveur pour
              configurer un nouvel appareil.
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (setupPhase === 'locked') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-marhaban-cream px-4">
        <div className="w-full max-w-sm">
          <div className="rounded-[1.75rem] border border-marhaban-leaf/12 bg-white p-8 shadow-warm-sm">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">Marhaban Admin</p>
            <h1 className="mt-2 font-heading text-2xl font-semibold leading-tight text-marhaban-forestDark">
              Double authentification requise
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-marhaban-muted">
              Aucun facteur MFA n&apos;est configuré pour ce compte admin.
            </p>

            <div className="mt-4 rounded-2xl border border-marhaban-leaf/10 bg-marhaban-cream/60 px-4 py-3">
              <div className="flex items-start gap-2">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-marhaban-clay" />
                <p className="text-xs leading-relaxed text-marhaban-muted">
                  Pour éviter qu&apos;un mot de passe volé puisse créer un facteur MFA, la
                  configuration initiale nécessite un code de configuration temporaire fourni
                  par l&apos;administrateur système.
                </p>
              </div>
            </div>

            <form onSubmit={handleSetupCodeSubmit} className="mt-6 grid gap-4">
              <div>
                <label htmlFor="setup-code" className="mb-2 block text-sm font-semibold text-marhaban-ink">
                  Code de configuration MFA
                </label>
                <input
                  id="setup-code"
                  type="password"
                  required
                  autoComplete="off"
                  value={setupCode}
                  onChange={(e) => setSetupCode(e.target.value)}
                  placeholder="Code fourni par l'admin système"
                  className="w-full rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-sm text-marhaban-ink transition focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20"
                />
              </div>

              {setupCodeError ? (
                <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-700">
                  {setupCodeError}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={setupCodeLoading || !setupCode.trim()}
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-marhaban-forestDark px-6 py-3 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-clay disabled:cursor-not-allowed disabled:opacity-50"
              >
                {setupCodeLoading ? 'Vérification…' : 'Déverrouiller la configuration'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (setupPhase === 'enrolling') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-marhaban-cream px-4">
        <div className="w-full max-w-sm">
          <div className="rounded-[1.75rem] border border-marhaban-leaf/12 bg-white p-8 shadow-warm-sm">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">Marhaban Admin</p>
            <h1 className="mt-2 font-heading text-2xl font-semibold leading-tight text-marhaban-forestDark">
              Double authentification
            </h1>
            <div className="mt-8 flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-marhaban-leaf/20 border-t-marhaban-leaf" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-marhaban-cream px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="rounded-[1.75rem] border border-marhaban-leaf/12 bg-white p-8 shadow-warm-sm">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">Marhaban Admin</p>
          <h1 className="mt-2 font-heading text-2xl font-semibold leading-tight text-marhaban-forestDark">
            Double authentification
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-marhaban-muted">
            Protège l&apos;espace admin avec un code temporaire depuis ton application
            d&apos;authentification.
          </p>

          <div className="mt-6 rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-clay">
              Configurer la double authentification
            </p>
            <p className="mt-2 text-xs leading-relaxed text-marhaban-muted">
              Scanne le QR code avec ton application d&apos;authentification (Google
              Authenticator, Microsoft Authenticator, Authy, 1Password…), puis entre le code
              à 6 chiffres.
            </p>

            {setupData ? (
              <>
                <div className="mt-4 flex justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={setupData.qrCode}
                    alt="QR code à scanner avec ton application d'authentification"
                    width={160}
                    height={160}
                    className="rounded-xl border border-marhaban-leaf/10 bg-white p-2"
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setShowSecret((v) => !v)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-marhaban-clay underline-offset-2 hover:underline"
                  >
                    {showSecret ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    {showSecret ? 'Masquer la clé secrète' : 'Ne peut pas scanner ? Voir la clé secrète'}
                  </button>

                  {showSecret ? (
                    <div className="mt-2 flex items-center justify-between gap-2 rounded-xl border border-marhaban-leaf/15 bg-white px-3 py-2">
                      <code className="break-all select-all font-mono text-xs text-marhaban-ink">
                        {setupData.secret}
                      </code>
                      <button
                        type="button"
                        onClick={copySecret}
                        title="Copier la clé secrète"
                        className="shrink-0 rounded-full p-1.5 text-marhaban-muted transition hover:bg-marhaban-cream hover:text-marhaban-ink"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : null}

                  {copied ? (
                    <p className="mt-1.5 text-xs font-semibold text-marhaban-clay">Copié !</p>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>

          <form onSubmit={handleMfaSubmit} className="mt-6 grid gap-4">
            <div>
              <label htmlFor="mfa-code-setup" className="mb-2 block text-sm font-semibold text-marhaban-ink">
                Code à 6 chiffres
              </label>
              <input
                id="mfa-code-setup"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="w-full rounded-2xl border border-marhaban-leaf/18 bg-marhaban-cream px-4 py-3 text-center font-mono text-lg tracking-[0.35em] text-marhaban-ink transition focus:border-marhaban-leaf focus:outline-none focus:ring-2 focus:ring-marhaban-leaf/20"
              />
            </div>

            {error ? (
              <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-700">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading || code.length !== 6 || !setupData}
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-marhaban-forestDark px-6 py-3 text-sm font-bold text-white shadow-warm-sm transition hover:bg-marhaban-clay disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Activation…' : 'Vérifier et activer'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
