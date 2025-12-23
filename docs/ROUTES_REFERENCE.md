# Référence des Routes - Marhaban Canada

**Document de référence** listant toutes les routes du site avec leurs équivalents multilingues.

**Dernière mise à jour :** 2024

---

## Structure des routes

Toutes les routes suivent le pattern : `/[locale]/[page]`

Où `locale` peut être :
- `fr` - Français (par défaut)
- `en` - English
- `ar` - العربية

---

## Routes principales

### 1. Accueil

| Langue | Route | Fichier |
|--------|-------|---------|
| FR | `/fr/` | `src/app/[locale]/page.tsx` |
| EN | `/en/` | `src/app/[locale]/page.tsx` |
| AR | `/ar/` | `src/app/[locale]/page.tsx` |

**Description :** Page d'accueil principale

---

### 2. Checklist

| Langue | Route | Fichier |
|--------|-------|---------|
| FR | `/fr/checklist` | `src/app/[locale]/checklist/page.tsx` |
| EN | `/en/checklist` | `src/app/[locale]/checklist/page.tsx` |
| AR | `/ar/checklist` | `src/app/[locale]/checklist/page.tsx` |

**Description :** Checklist interactive pour les nouveaux arrivants

**Sous-pages :**
- `/fr/checklist/integration`
- `/fr/checklist/semaine-1`
- `/fr/checklist/mois-1`

---

### 3. Étapes (Parcours)

| Langue | Route | Fichier |
|--------|-------|---------|
| FR | `/fr/parcours` | `src/app/[locale]/parcours/page.tsx` |
| EN | `/en/parcours` | `src/app/[locale]/parcours/page.tsx` |
| AR | `/ar/parcours` | `src/app/[locale]/parcours/page.tsx` |

**Description :** Guide des étapes du parcours d'installation

**Sous-pages :**
- `/fr/parcours/guide`
- `/fr/parcours/guide/steps/[stepId]`
- `/fr/parcours/guide/banque`

---

### 4. About

| Langue | Route | Fichier |
|--------|-------|---------|
| FR | `/fr/about` | `src/app/[locale]/about/page.tsx` |
| EN | `/en/about` | `src/app/[locale]/about/page.tsx` |
| AR | `/ar/about` | `src/app/[locale]/about/page.tsx` |

**Description :** Page À propos

---

### 5. Contact

| Langue | Route | Fichier |
|--------|-------|---------|
| FR | `/fr/contact` | `src/app/[locale]/contact/page.tsx` |
| EN | `/en/contact` | `src/app/[locale]/contact/page.tsx` |
| AR | `/ar/contact` | `src/app/[locale]/contact/page.tsx` |

**Description :** Page de contact

---

### 6. Legal

| Langue | Route | Fichier |
|--------|-------|---------|
| FR | `/fr/legal` | `src/app/[locale]/legal/page.tsx` |
| EN | `/en/legal` | `src/app/[locale]/legal/page.tsx` |
| AR | `/ar/legal` | `src/app/[locale]/legal/page.tsx` |

**Description :** Mentions légales

---

### 7. Pages d'erreur

| Langue | Route | Fichier |
|--------|-------|---------|
| FR | `/fr/not-found` | `src/app/[locale]/not-found.tsx` |
| EN | `/en/not-found` | `src/app/[locale]/not-found.tsx` |
| AR | `/ar/not-found` | `src/app/[locale]/not-found.tsx` |

**Description :** Page d'erreur 404

---

## Routes supplémentaires (statut à clarifier)

Les routes suivantes existent dans le codebase mais ne sont **PAS** dans la liste figée :

### Arnaques

| Langue | Route | Fichier |
|--------|-------|---------|
| FR | `/fr/arnaques` | `src/app/[locale]/arnaques/page.tsx` |
| EN | `/en/arnaques` | `src/app/[locale]/arnaques/page.tsx` |
| AR | `/ar/arnaques` | `src/app/[locale]/arnaques/page.tsx` |

**Sous-pages :**
- `/fr/arnaques/[slug]`

### Blog

| Langue | Route | Fichier |
|--------|-------|---------|
| FR | `/fr/blog` | `src/app/[locale]/blog/page.tsx` |
| EN | `/en/blog` | `src/app/[locale]/blog/page.tsx` |
| AR | `/ar/blog` | `src/app/[locale]/blog/page.tsx` |

**Sous-pages :**
- `/fr/blog/[slug]`

### Ressources

| Langue | Route | Fichier |
|--------|-------|---------|
| FR | `/fr/ressources` | `src/app/[locale]/ressources/page.tsx` |
| EN | `/en/ressources` | `src/app/[locale]/ressources/page.tsx` |
| AR | `/ar/ressources` | `src/app/[locale]/ressources/page.tsx` |

**Sous-pages :**
- `/fr/ressources/guides/[slug]`

### Disclaimer

| Langue | Route | Fichier |
|--------|-------|---------|
| FR | `/fr/disclaimer` | `src/app/[locale]/disclaimer/page.tsx` |
| EN | `/en/disclaimer` | `src/app/[locale]/disclaimer/page.tsx` |
| AR | `/ar/disclaimer` | `src/app/[locale]/disclaimer/page.tsx` |

### Mentions

| Langue | Route | Fichier |
|--------|-------|---------|
| FR | `/fr/mentions` | `src/app/[locale]/mentions/page.tsx` |
| EN | `/en/mentions` | `src/app/[locale]/mentions/page.tsx` |
| AR | `/ar/mentions` | `src/app/[locale]/mentions/page.tsx` |

### Sources

| Langue | Route | Fichier |
|--------|-------|---------|
| FR | `/fr/sources` | `src/app/[locale]/sources/page.tsx` |
| EN | `/en/sources` | `src/app/[locale]/sources/page.tsx` |
| AR | `/ar/sources` | `src/app/[locale]/sources/page.tsx` |

### How to Use

| Langue | Route | Fichier |
|--------|-------|---------|
| FR | `/fr/how-to-use` | `src/app/[locale]/how-to-use/page.tsx` |
| EN | `/en/how-to-use` | `src/app/[locale]/how-to-use/page.tsx` |
| AR | `/ar/how-to-use` | `src/app/[locale]/how-to-use/page.tsx` |

---

## Routes API

### Contact API

| Route | Fichier |
|-------|---------|
| `/api/contact` | `src/app/api/contact/route.ts` |

### Newsletter API

| Route | Fichier |
|-------|---------|
| `/api/newsletter` | `src/app/api/newsletter/route.ts` |

---

## Routes système

### Robots.txt

| Route | Fichier |
|-------|---------|
| `/robots.txt` | `src/app/[locale]/robots.ts` |

### Sitemap

| Route | Fichier |
|-------|---------|
| `/sitemap.xml` | `src/app/[locale]/sitemap.ts` |

---

## Notes

1. **Redirection par défaut :** Les routes sans locale redirigent vers `/fr/`
2. **404 :** Toute route non trouvée affiche `/[locale]/not-found`
3. **RTL :** Les routes `/ar/*` appliquent automatiquement `dir="rtl"`

---

## Mise à jour

Ce document doit être mis à jour si :
- De nouvelles routes sont ajoutées (après validation du cadrage)
- Des routes sont supprimées
- La structure des routes change

