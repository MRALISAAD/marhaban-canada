# Phase 0 - Cadrage

**Date de cadrage :** 2024  
**Statut :** ✅ Figé - Aucune modification autorisée après validation

## Objectif

Définir de manière figée et non-ambiguë le périmètre exact du "site complet" avant toute implémentation supplémentaire. Ce document sert de référence absolue pour le développement.

---

## 1. Liste figée des pages

### Pages principales (7 pages)

#### 1.1 Accueil
- **Route :** `/[locale]/`
- **Fichier :** `src/app/[locale]/page.tsx`
- **Description :** Page d'accueil principale avec présentation du site
- **Statut :** ✅ Implémenté
- **Multilingue :** Oui (FR/EN/AR)

#### 1.2 Checklist
- **Route :** `/[locale]/checklist`
- **Fichier :** `src/app/[locale]/checklist/page.tsx`
- **Description :** Checklist interactive pour les nouveaux arrivants
- **Statut :** ✅ Implémenté
- **Multilingue :** Oui (FR/EN/AR)
- **Features :** Offline-first, localStorage, export PDF

#### 1.3 Étapes (Parcours)
- **Route :** `/[locale]/parcours`
- **Fichier :** `src/app/[locale]/parcours/page.tsx`
- **Description :** Guide des étapes du parcours d'installation au Canada
- **Note :** "Étapes" correspond à "parcours" dans le code actuel
- **Statut :** ✅ Implémenté
- **Multilingue :** Oui (FR/EN/AR)

#### 1.4 About
- **Route :** `/[locale]/about`
- **Fichier :** `src/app/[locale]/about/page.tsx`
- **Description :** Page À propos présentant la mission et la vision
- **Statut :** ✅ Implémenté
- **Multilingue :** Oui (FR/EN/AR)

#### 1.5 Contact
- **Route :** `/[locale]/contact`
- **Fichier :** `src/app/[locale]/contact/page.tsx`
- **Description :** Page de contact avec formulaire/email
- **Statut :** ✅ Implémenté
- **Multilingue :** Oui (FR/EN/AR)

#### 1.6 Legal
- **Route :** `/[locale]/legal`
- **Fichier :** `src/app/[locale]/legal/page.tsx`
- **Description :** Mentions légales et conditions d'utilisation
- **Statut :** ✅ Implémenté
- **Multilingue :** Oui (FR/EN/AR)

#### 1.7 Pages d'erreur
- **Route 404 :** `/[locale]/not-found`
- **Fichier :** `src/app/[locale]/not-found.tsx`
- **Description :** Page d'erreur 404 personnalisée
- **Statut :** ✅ Implémenté
- **Multilingue :** Oui (FR/EN/AR)

### Pages supplémentaires (statut à clarifier)

Les pages suivantes existent actuellement dans le codebase mais ne sont **PAS** dans la liste figée initiale :

- `/arnaques` - Page sur les arnaques
- `/blog` - Blog
- `/ressources` - Ressources
- `/disclaimer` - Disclaimer
- `/mentions` - Mentions
- `/sources` - Sources
- `/how-to-use` - Guide d'utilisation

**⚠️ Action requise :** Ces pages doivent être soit :
1. Incluses dans le périmètre (si elles font partie du "site complet")
2. Supprimées du codebase (si elles ne font pas partie du périmètre)

**Décision :** En attente de clarification

---

## 2. Langues supportées

### Langues figées (3 langues)

#### 2.1 Français (FR)
- **Code :** `fr`
- **Configuration :** `src/i18n/locales.ts`
- **Contenu :** `src/content/fr.ts`
- **Direction :** LTR (left-to-right)
- **Lang HTML :** `fr-CA`
- **Statut :** ✅ Implémenté
- **Note :** Langue par défaut

#### 2.2 English (EN)
- **Code :** `en`
- **Configuration :** `src/i18n/locales.ts`
- **Contenu :** `src/content/en.ts`
- **Direction :** LTR (left-to-right)
- **Lang HTML :** `en-CA`
- **Statut :** ✅ Implémenté

#### 2.3 العربية (AR)
- **Code :** `ar`
- **Configuration :** `src/i18n/locales.ts`
- **Contenu :** `src/content/ar.ts`
- **Direction :** RTL (right-to-left)
- **Lang HTML :** `ar`
- **Support RTL :** `dir="rtl"` géré dans `src/lib/i18n.ts`
- **Statut :** ✅ Implémenté

### Routes multilingues

Toutes les pages utilisent le pattern `/[locale]/...` où `locale` est :
- `fr` pour Français
- `en` pour English
- `ar` pour العربية

**Exemples :**
- `/fr/` - Accueil français
- `/en/checklist` - Checklist anglaise
- `/ar/about` - About arabe

---

## 3. Fonctionnalités figées

### 3.1 Offline-First

#### Implémentation
- **Service Worker :** `public/sw.js`
- **Initialisation :** `src/components/PWAInit.tsx`
- **Cache Strategy :** Network-first avec fallback cache
- **Statut :** ✅ Implémenté

#### Périmètre
- ✅ Checklist fonctionne hors ligne
- ✅ État sauvegardé dans localStorage (clé : `mc_checklist_offline_{locale}_v1`)
- ✅ Service Worker cache les ressources statiques
- ✅ Tests E2E : `tests/offline.spec.ts`

#### Limitations
- Seules les pages statiques sont mises en cache
- Les appels API nécessitent une connexion

### 3.2 i18n (Internationalisation)

#### Implémentation
- **Provider :** `src/components/LanguageProvider.tsx`
- **Configuration :** `src/i18n/locales.ts`
- **Contenu :** `src/content/{fr,en,ar}.ts`
- **Navigation :** `src/components/LocalizedLink.tsx`
- **Sélecteur :** `src/components/navigation/LanguageToggle.tsx`
- **Statut :** ✅ Implémenté

#### Périmètre
- ✅ Toutes les pages supportent FR/EN/AR
- ✅ Support RTL automatique pour l'arabe
- ✅ Sélecteur de langue dans la navigation
- ✅ URLs localisées (`/[locale]/...`)
- ✅ Contenu traduit dans les 3 langues

### 3.3 PDF

#### Implémentation actuelle
- **Composant :** `src/components/checklist/SmartPDFExport.tsx`
- **Feature Flag :** `FEATURE_FLAGS.ENABLE_PDF` dans `src/lib/featureFlags.ts`
- **Format actuel :** Export texte (`.txt`)
- **Statut :** ✅ Implémenté

#### Périmètre
- ✅ Export de la checklist complétée
- ✅ Format texte avec structure organisée
- ✅ Nom de fichier : `checklist-marhaban-{locale}-{date}.txt`
- ✅ Contenu : Liste des étapes complétées groupées par phase

#### ⚠️ Clarification requise
L'implémentation actuelle génère un fichier **texte** (`.txt`), pas un PDF natif.

**Question :** L'export doit-il être :
- **Option A :** Un vrai PDF (nécessite bibliothèque comme jsPDF ou react-pdf)
- **Option B :** Export texte actuel (suffisant)

**Décision :** En attente de clarification

### 3.4 Accessibilité

#### Implémentation
- **Tests a11y :** `tests/axe.spec.ts` avec @axe-core/playwright
- **Standard :** WCAG 2.1 AA
- **Statut :** ✅ Implémenté et testé

#### Périmètre
- ✅ Conformité WCAG 2.1 AA minimum
- ✅ Navigation clavier complète (Tab, Enter, Space)
- ✅ Support lecteurs d'écran (ARIA labels)
- ✅ Focus visible sur tous les éléments interactifs
- ✅ Contraste de couleurs 4.5:1 minimum
- ✅ Labels de formulaire correctement liés
- ✅ Tests automatisés dans CI/CD

#### Vérification
```bash
npm run test:playwright -- tests/axe.spec.ts
```

---

## 4. Feature Flags

### Configuration
- **Fichier :** `src/lib/featureFlags.ts`

### Flags existants
```typescript
export const FEATURE_FLAGS = {
  ENABLE_PDF: true,
  ENABLE_EASY_READ: true,
  ENABLE_PROGRESS: true,
  ENABLE_JUST_ARRIVED_MODE: true,
  ENABLE_HOW_TO_USE_PAGE: true,
  ENABLE_CONTENT_UPDATE_DATE: true,
};
```

### Usage
Les feature flags permettent d'activer/désactiver rapidement des fonctionnalités sans déploiement.

---

## 5. Discipline

### Règles strictes après validation

Une fois ce cadrage validé :

- ❌ **Aucune nouvelle page** ne peut être ajoutée
- ❌ **Aucune nouvelle langue** ne peut être ajoutée
- ❌ **Aucune nouvelle feature** ne peut être ajoutée
- ✅ **Seules les améliorations** des features existantes sont autorisées
- ✅ **Corrections de bugs** autorisées
- ✅ **Optimisations** autorisées

### Exceptions

Les exceptions doivent être :
1. Documentées dans ce fichier
2. Approuvées explicitement
3. Justifiées par un besoin critique

---

## 6. Questions en suspens

### 6.1 Pages supplémentaires
**Question :** Les pages suivantes font-elles partie du périmètre ?
- `/arnaques`
- `/blog`
- `/ressources`
- `/disclaimer`
- `/mentions`
- `/sources`
- `/how-to-use`

**Réponse :** En attente

### 6.2 Format PDF
**Question :** L'export PDF doit-il être un vrai PDF ou l'export texte actuel est-il suffisant ?

**Réponse :** En attente

---

## 7. Validation

- [ ] Liste des pages validée
- [ ] Langues validées
- [ ] Features validées
- [ ] Questions en suspens résolues
- [ ] Document approuvé par l'équipe

**Date de validation :** _À compléter_  
**Validé par :** _À compléter_

---

## 8. Historique des modifications

| Date | Modification | Auteur |
|------|-------------|--------|
| 2024 | Création du document de cadrage | Phase 0 |

