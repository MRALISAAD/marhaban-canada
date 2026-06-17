/**
 * Placeholder Supabase.
 *
 * TODO:
 * - Installer le client Supabase quand l'intégration sera active.
 * - Créer un client navigateur avec NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY.
 * - Créer un client serveur séparé pour les opérations admin.
 * - Ne jamais exposer SUPABASE_SERVICE_ROLE_KEY côté client.
 */

export type SupabaseIntegrationStatus = 'not_configured' | 'planned';

export const supabaseIntegrationStatus: SupabaseIntegrationStatus = 'planned';
