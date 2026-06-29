import Link from 'next/link';
import { requireAdmin, parseAllowedEmails } from '@/lib/admin/require-admin';
import { createSupabaseServerAuthClient } from '@/lib/supabase/server-auth';
import { AdminBadge } from '@/components/admin/AdminBadge';
import { AdminCard } from '@/components/admin/AdminCard';

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!local || !domain) return '***@***';
  const visible = local.length > 2 ? local[0] + '*'.repeat(local.length - 2) + local.slice(-1) : local[0] + '*';
  return `${visible}@${domain}`;
}

function maskList(emails: string[]): string {
  if (emails.length === 0) return '(aucun)';
  return emails.map(maskEmail).join(', ');
}

function supabaseHostOnly(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  try {
    return new URL(url).hostname || '(non configuré)';
  } catch {
    return url ? '(URL invalide)' : '(non configuré)';
  }
}

function isConfigured(value: string | undefined): boolean {
  return Boolean(value && value.trim().length > 0);
}

type StatusRowProps = { label: string; configured: boolean; detail?: string };

function StatusRow({ label, configured, detail }: StatusRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-marhaban-leaf/10 last:border-b-0">
      <div>
        <p className="text-sm font-semibold text-marhaban-ink">{label}</p>
        {detail ? <p className="mt-0.5 text-xs text-marhaban-muted">{detail}</p> : null}
      </div>
      <AdminBadge label={configured ? 'Configuré' : 'Manquant'} tone={configured ? 'success' : 'danger'} />
    </div>
  );
}

export default async function AdminSettingsPage() {
  const auth = await requireAdmin();
  const allowedEmails = parseAllowedEmails();
  const currentEmail = auth.ok ? auth.email : null;

  const supabaseHost = supabaseHostOnly();

  // MFA status — safe to call since layout already verified AAL2
  const supabase = await createSupabaseServerAuthClient();
  const { data: factors } = await supabase.auth.mfa.listFactors();
  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  const hasVerifiedTotp = factors?.totp?.some((f) => f.status === 'verified') ?? false;
  const currentAal = aal?.currentLevel ?? 'aal1';

  const envStatus = [
    {
      label: 'ADMIN_ALLOWED_EMAILS',
      configured: allowedEmails.length > 0,
      detail: `${allowedEmails.length} email(s) autorisé(s) : ${maskList(allowedEmails)}`,
    },
    {
      label: 'NEXT_PUBLIC_SUPABASE_URL',
      configured: isConfigured(process.env.NEXT_PUBLIC_SUPABASE_URL),
      detail: `Hôte : ${supabaseHost}`,
    },
    {
      label: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      configured: isConfigured(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      detail: 'Clé publique Supabase (read-only, non confidentielle)',
    },
    {
      label: 'SUPABASE_SERVICE_ROLE_KEY',
      configured: isConfigured(process.env.SUPABASE_SERVICE_ROLE_KEY),
      detail: 'Clé service (serveur uniquement — jamais exposée au client)',
    },
    {
      label: 'NEXT_PUBLIC_CALENDLY_FREE_CALL_URL',
      configured: isConfigured(process.env.NEXT_PUBLIC_CALENDLY_FREE_CALL_URL),
      detail: 'Lien Calendly pour les appels gratuits (optionnel)',
    },
    {
      label: 'NEXT_PUBLIC_GA_ID',
      configured: isConfigured(process.env.NEXT_PUBLIC_GA_ID),
      detail: 'Google Analytics (optionnel)',
    },
    {
      label: 'NEXT_PUBLIC_SENTRY_DSN',
      configured: isConfigured(process.env.NEXT_PUBLIC_SENTRY_DSN),
      detail: 'Sentry error tracking (optionnel)',
    },
  ];

  return (
    <div className="space-y-6">
      <header className="rounded-[1.75rem] border border-marhaban-leaf/12 bg-white/85 p-6 shadow-warm-sm">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">Configuration</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-semibold leading-tight text-marhaban-forestDark sm:text-4xl">
              Paramètres
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-marhaban-muted sm:text-base">
              État de la configuration du back-office. Aucune valeur secrète n&apos;est affichée.
            </p>
          </div>
          <AdminBadge label="Lecture seule" tone="neutral" />
        </div>
      </header>

      {/* Session actuelle */}
      <AdminCard title="Session active" eyebrow="Administrateur connecté">
        <div className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/60 px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-marhaban-clay">Email de connexion</p>
          <p className="mt-1 font-semibold text-marhaban-forestDark">
            {currentEmail ?? '—'}
          </p>
          <p className="mt-1 text-xs text-marhaban-muted">
            Vérifié via Supabase Auth. Présent dans ADMIN_ALLOWED_EMAILS.
          </p>
        </div>
      </AdminCard>

      {/* Double authentification */}
      <AdminCard title="Double authentification (MFA)" eyebrow="Sécurité">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/60 px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-clay">Statut MFA</p>
              <div className="mt-2">
                <AdminBadge
                  label={hasVerifiedTotp ? 'Activée' : 'À configurer'}
                  tone={hasVerifiedTotp ? 'success' : 'warning'}
                />
              </div>
            </div>
            <div className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/60 px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-clay">Niveau de session</p>
              <div className="mt-2">
                <AdminBadge
                  label={currentAal === 'aal2' ? 'AAL2 — MFA vérifié' : 'AAL1 — MFA non vérifié'}
                  tone={currentAal === 'aal2' ? 'success' : 'warning'}
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/60 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-clay">
              Portail de configuration MFA
            </p>
            <div className="mt-2">
              <AdminBadge
                label={process.env.ADMIN_MFA_SETUP_ENABLED === 'true' ? 'Activé temporairement' : 'Désactivé'}
                tone={process.env.ADMIN_MFA_SETUP_ENABLED === 'true' ? 'warning' : 'success'}
              />
            </div>
            {process.env.ADMIN_MFA_SETUP_ENABLED === 'true' ? (
              <p className="mt-2 text-xs font-semibold text-amber-700">
                ⚠ Désactive ADMIN_MFA_SETUP_ENABLED après configuration MFA.
              </p>
            ) : null}
          </div>

          <p className="text-xs leading-relaxed text-marhaban-muted">
            La double authentification est <strong>obligatoire</strong> pour accéder à l&apos;espace admin.
            Chaque session doit atteindre le niveau AAL2 (mot de passe + code TOTP).
          </p>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/mfa"
              className="inline-flex min-h-[40px] items-center rounded-full border border-marhaban-leaf/20 bg-white px-4 py-2 text-sm font-bold text-marhaban-ink shadow-warm-sm transition hover:bg-marhaban-cream"
            >
              Gérer la double authentification →
            </Link>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-xs leading-relaxed text-amber-800">
              <strong>Récupération :</strong> Si l&apos;accès à l&apos;application MFA est perdu, la
              réinitialisation du facteur doit être effectuée manuellement depuis{' '}
              <strong>Supabase Dashboard → Authentication → Users → (utilisateur) → Unlink factor</strong>.
            </p>
          </div>
        </div>
      </AdminCard>

      {/* Variables d'environnement */}
      <AdminCard title="Variables d'environnement" eyebrow="Configuration serveur">
        <div className="divide-y divide-marhaban-leaf/10">
          {envStatus.map((row) => (
            <StatusRow key={row.label} label={row.label} configured={row.configured} detail={row.detail} />
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-xs leading-relaxed text-amber-800">
            <strong>Note de sécurité :</strong> Les valeurs des secrets (SERVICE_ROLE_KEY, etc.) ne sont jamais
            affichées ici. Seule la présence ou l&apos;absence de la variable est indiquée.
          </p>
        </div>
      </AdminCard>

      {/* Stack technique */}
      <AdminCard title="Stack technique" eyebrow="Informations système">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { label: 'Framework', value: 'Next.js (App Router)' },
            { label: 'Auth', value: 'Supabase Auth (SSR) — AAL2 obligatoire' },
            { label: 'Base de données', value: `Supabase PostgreSQL — ${supabaseHost}` },
            { label: 'Internationalisation', value: 'FR / EN / AR (RTL)' },
            { label: 'Hébergement', value: 'Docker / Vercel / Netlify compatible' },
            { label: 'Paiements', value: 'Non activés' },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-marhaban-leaf/12 bg-marhaban-cream/60 px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-marhaban-clay">{item.label}</p>
              <p className="mt-1 text-sm font-semibold text-marhaban-forestDark">{item.value}</p>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
