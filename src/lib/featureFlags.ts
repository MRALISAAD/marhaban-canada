/**
 * Feature Flags - Marhaban Canada
 * 
 * Ce fichier contrôle l'activation/désactivation des fonctionnalités du site.
 * Les flags permettent de gérer rapidement les features sans déploiement.
 * 
 * Documentation complète : docs/PHASE0_CADRAGE.md
 * 
 * Phase 0 - Cadrage : Les features suivantes sont figées :
 * - offline-first (toujours activé, pas de flag)
 * - i18n (toujours activé, pas de flag)
 * - PDF (contrôlé par ENABLE_PDF)
 * - accessibilité (toujours activé, pas de flag)
 */

export const FEATURE_FLAGS = {
  /**
   * Active l'export PDF de la checklist
   * Génère un vrai PDF (format PDF natif) avec jsPDF
   * Voir : src/components/checklist/SmartPDFExport.tsx
   */
  ENABLE_PDF: true,

  /**
   * Active le mode "Easy Read" (lecture simplifiée)
   * Voir : src/components/EasyReadToggle.tsx
   */
  ENABLE_EASY_READ: true,

  /**
   * Active la barre de progression
   * Voir : src/components/ProgressBar.tsx
   */
  ENABLE_PROGRESS: true,

  /**
   * Active le mode "Just Arrived" (nouvel arrivant)
   * Voir : src/components/JustArrivedMode.tsx
   */
  ENABLE_JUST_ARRIVED_MODE: true,

  /**
   * Active la page "How to Use" (comment utiliser)
   * Voir : src/app/[locale]/how-to-use/page.tsx
   */
  ENABLE_HOW_TO_USE_PAGE: true,

  /**
   * Active l'affichage de la date de mise à jour du contenu
   * Voir : src/components/ContentUpdateDate.tsx
   */
  ENABLE_CONTENT_UPDATE_DATE: true,
};

// You can add logic here to override these based on environment variables
// For example:
// if (process.env.NEXT_PUBLIC_ENABLE_EASY_READ === 'false') {
//   FEATURE_FLAGS.ENABLE_EASY_READ = false;
// }
