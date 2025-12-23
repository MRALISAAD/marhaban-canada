# Content Map - Marhaban Canada

**Date:** 2024  
**Purpose:** Complete inventory of all pages, their content structure, and inconsistencies

---

## Overview

This document maps every page on the site with:
- **H1** (main heading)
- **Intro line** (1-2 line "why it matters")
- **Primary CTA** (main call-to-action)
- **Sections present/missing** (What/Why/How/Avoid/Sources)
- **Localization status** (FR/EN/AR)
- **Inconsistencies identified**

---

## Pages Inventory

### 1. Home Page (`/[locale]/`)
**File:** `src/app/[locale]/page.tsx`

| Locale | H1 | Intro | Primary CTA | Sections |
|--------|----|----|-----------|----------|
| FR | `content.microcopy.homeTitle` | "Tu es au début du parcours." | "Commencer" (CTA component) | ❌ None (hero page) |
| EN | `content.microcopy.homeTitle` | "You are at the start of your journey." | "Start" (CTA component) | ❌ None (hero page) |
| AR | `content.microcopy.homeTitle` | "أنت في بداية رحلتك." | CTA component | ❌ None (hero page) |

**Issues:**
- ✅ Has H1
- ✅ Has intro line
- ✅ Has primary CTA
- ⚠️ Intro text is hardcoded in component (not in content layer)
- ⚠️ Cards text is hardcoded (not in content layer)

---

### 2. Checklist Page (`/[locale]/checklist`)
**File:** `src/app/[locale]/checklist/page.tsx`

| Locale | H1 | Intro | Primary CTA | Sections |
|--------|----|----|-----------|----------|
| FR | `dictionary.labels.title` | `dictionary.labels.subtitle` | ❌ None (implicit: check items) | ✅ What/Why/How/Avoid/Sources (per item) |
| EN | `dictionary.labels.title` | `dictionary.labels.subtitle` | ❌ None | ✅ What/Why/How/Avoid/Sources (per item) |
| AR | `dictionary.labels.title` | `dictionary.labels.subtitle` | ❌ None | ✅ What/Why/How/Avoid/Sources (per item) |

**Issues:**
- ✅ Has H1
- ✅ Has intro line
- ❌ **Missing primary CTA** (should have "Voir le parcours" or similar)
- ✅ Sections present (per checklist item)
- ⚠️ Uses separate `checklistOffline.ts` dictionary (not main content layer)

**Sub-pages:**
- `/checklist/semaine-1` - Week 1 phase
- `/checklist/mois-1` - Month 1 phase
- `/checklist/integration` - Integration phase

---

### 3. Parcours (Journey) Page (`/[locale]/parcours`)
**File:** `src/app/[locale]/parcours/page.tsx`

| Locale | H1 | Intro | Primary CTA | Sections |
|--------|----|----|-----------|----------|
| FR | `microcopy.journeyTitle` | `microcopy.journeySubtitle` | ❌ None | ✅ Timeline sections (What/Why/How/Avoid/Sources per item) |
| EN | `microcopy.journeyTitle` | `microcopy.journeySubtitle` | ❌ None | ✅ Timeline sections |
| AR | `microcopy.journeyTitle` | `microcopy.journeySubtitle` | ❌ None | ✅ Timeline sections |

**Issues:**
- ✅ Has H1
- ✅ Has intro line
- ❌ **Missing primary CTA** (should have "Voir les guides" or "Commencer le parcours")
- ✅ Sections present (per timeline item)
- ⚠️ Uses `parcoursTimelineI18n.ts` (separate from main content)

**Sub-pages:**
- `/parcours/guide` - Guide index
- `/parcours/guide/steps/[stepId]` - Individual step guides (nas, health, bank, phone, housing, etc.)

---

### 4. Guide Step Detail (`/[locale]/parcours/guide/steps/[stepId]`)
**File:** `src/app/[locale]/parcours/guide/steps/[stepId]/page.tsx`  
**Component:** `src/components/GuideStepDetail.tsx`

| Locale | H1 | Intro | Primary CTA | Sections |
|--------|----|----|-----------|----------|
| FR | `step.title` | `step.summary` | `step.cta.label` (if exists) | ✅ What, Why, How, Docs, Avoid, SmartTips |
| EN | `step.title` | `step.summary` | `step.cta.label` (if exists) | ✅ What, Why, How, Docs, Avoid, SmartTips |
| AR | `step.title` | `step.summary` | `step.cta.label` (if exists) | ✅ What, Why, How, Docs, Avoid, SmartTips |

**Issues:**
- ✅ Has H1
- ✅ Has intro line
- ⚠️ CTA is optional (not all steps have it)
- ✅ Sections present (but order inconsistent: What → Why → How → Docs → Avoid → SmartTips)
- ⚠️ Uses `guideSteps.ts` (separate from main content)
- ⚠️ Section labels use `content.shared.sectionLabels` (good!) but also `content.microcopy` (inconsistent)

---

### 5. Arnaques (Scams) Page (`/[locale]/arnaques`)
**File:** `src/app/[locale]/arnaques/page.tsx`

| Locale | H1 | Intro | Primary CTA | Sections |
|--------|----|----|-----------|----------|
| FR | `content.scams.microcopy.pageTitle` | `content.scams.microcopy.pageSubtitle` | "Voir le guide logement" (housing CTA) | ⚠️ Partial (Rules, Plan, Categories, Victim plan) |
| EN | `content.scams.microcopy.pageTitle` | `content.scams.microcopy.pageSubtitle` | Housing CTA | ⚠️ Partial |
| AR | `content.scams.microcopy.pageTitle` | `content.scams.microcopy.pageSubtitle` | Housing CTA | ⚠️ Partial |

**Issues:**
- ✅ Has H1
- ✅ Has intro line
- ✅ Has primary CTA (housing-specific)
- ⚠️ **Missing standard sections** (What/Why/How/Avoid/Sources) - uses custom structure
- ⚠️ Some category titles are hardcoded in component (`categoryTitleByLocale`)
- ⚠️ "Toutes" filter label is hardcoded

**Sub-pages:**
- `/arnaques/[slug]` - Individual scam guides (logement, emploi, telephone, banque, immigration, marketplace)

---

### 6. Scam Guide Detail (`/[locale]/arnaques/[slug]`)
**File:** `src/app/[locale]/arnaques/[slug]/page.tsx`  
**Component:** `src/components/scams/ScamGuideClient.tsx` → `ScamGuidePage.tsx`

| Locale | H1 | Intro | Primary CTA | Sections |
|--------|----|----|-----------|----------|
| FR | `titleBySlug[slug].fr` or `raw.title` | `raw.subtitle` | ❌ None | ⚠️ Custom: Scenario, RedFlags, Actions, NeverDo, Mantra, Sources |
| EN | `titleBySlug[slug].en` or `raw.title` | `raw.subtitle` | ❌ None | ⚠️ Custom structure |
| AR | `titleBySlug[slug].ar` or `raw.title` | `raw.subtitle` | ❌ None | ⚠️ Custom structure |

**Issues:**
- ✅ Has H1 (but titles are hardcoded in component)
- ✅ Has intro line
- ❌ **Missing primary CTA**
- ⚠️ Uses custom section structure (not What/Why/How/Avoid/Sources)
- ⚠️ Titles are hardcoded in `ScamGuideClient.tsx` (should be in content layer)

---

### 7. Ressources (Resources) Page (`/[locale]/ressources`)
**File:** `src/app/[locale]/ressources/page.tsx`

| Locale | H1 | Intro | Primary CTA | Sections |
|--------|----|----|-----------|----------|
| FR | `resources.header.title` | `resources.header.subtitle` | ❌ None (multiple guide cards) | ⚠️ Category-based (not standard sections) |
| EN | `resources.header.title` | `resources.header.subtitle` | ❌ None | ⚠️ Category-based |
| AR | `resources.header.title` | `resources.header.subtitle` | ❌ None | ⚠️ Category-based |

**Issues:**
- ✅ Has H1
- ✅ Has intro line
- ❌ **Missing primary CTA** (has guide cards but no main CTA)
- ⚠️ Uses category-based structure (not standard What/Why/How/Avoid/Sources)
- ⚠️ Uses `resourcesData.ts` (separate from main content)

**Sub-pages:**
- `/ressources/guides/[slug]` - Resource guide pages (documents, transport, credit)

---

### 8. About Page (`/[locale]/about`)
**File:** `src/app/[locale]/about/page.tsx`

| Locale | H1 | Intro | Primary CTA | Sections |
|--------|----|----|-----------|----------|
| FR | "À propos" | Mission + Vision text | ❌ None | ⚠️ Custom: Mission, Vision, HowToUse, WhatWeDo, WhatWeDontDo |
| EN | "About" | Mission + Vision text | ❌ None | ⚠️ Custom structure |
| AR | "حول" | Mission + Vision text | ❌ None | ⚠️ Custom structure |

**Issues:**
- ✅ Has H1
- ⚠️ Intro is mission/vision (not a clear "why it matters" line)
- ❌ **Missing primary CTA** (should have "Commencer" or "Voir la checklist")
- ⚠️ Content is hardcoded in component (not in content layer)
- ⚠️ Uses custom section structure
- ⚠️ **Inconsistent styling** (uses `max-w-xl mx-auto p-6 text-gray-900 bg-white rounded-lg shadow-md` - different from other pages)

---

### 9. Contact Page (`/[locale]/contact`)
**File:** `src/app/[locale]/contact/page.tsx`

| Locale | H1 | Intro | Primary CTA | Sections |
|--------|----|----|-----------|----------|
| FR | `contactPage.title` | `contactPage.question` | Email link | ❌ None (simple contact info) |
| EN | `contactPage.title` | `contactPage.question` | Email link | ❌ None |
| AR | `contactPage.title` | `contactPage.question` | Email link | ❌ None |

**Issues:**
- ✅ Has H1
- ✅ Has intro line
- ⚠️ CTA is email link (acceptable for contact page)
- ⚠️ **Inconsistent styling** (same as About - different from rest of site)
- ⚠️ Content structure is minimal (acceptable for contact page)

---

### 10. Legal Page (`/[locale]/legal`)
**File:** `src/app/[locale]/legal/page.tsx`

| Locale | H1 | Intro | Primary CTA | Sections |
|--------|----|----|-----------|----------|
| FR | "Mentions légales" | Disclaimer text | ❌ None | ⚠️ Custom: Disclaimer, WhatIs, WhatIsNot |
| EN | "Legal" | Disclaimer text | ❌ None | ⚠️ Custom structure |
| AR | "قانوني" | Disclaimer text | ❌ None | ⚠️ Custom structure |

**Issues:**
- ✅ Has H1
- ⚠️ Intro is disclaimer (not a clear "why it matters")
- ❌ **Missing primary CTA** (acceptable for legal page, but could link back to home)
- ⚠️ Content partially hardcoded (titles are hardcoded, content uses `content.serviceAccompagnement*`)
- ⚠️ **Inconsistent styling** (same as About/Contact - different from rest)

---

## Content Inconsistencies Summary

### 1. **Missing Primary CTAs**
- ❌ Checklist page
- ❌ Parcours page
- ❌ Scam guide detail pages
- ❌ Ressources page
- ❌ About page
- ❌ Legal page

### 2. **Hardcoded Text (Not in Content Layer)**
- ⚠️ Home page: intro line, cards text
- ⚠️ About page: all content
- ⚠️ Legal page: section titles
- ⚠️ Arnaques page: category titles, filter labels
- ⚠️ Scam guides: titles in component

### 3. **Inconsistent Section Structure**
- ✅ Guide steps: What → Why → How → Docs → Avoid → SmartTips (good, but Docs/SmartTips are non-standard)
- ⚠️ Scam guides: Scenario → RedFlags → Actions → NeverDo → Mantra → Sources (custom)
- ⚠️ About/Legal: Custom structures
- ⚠️ Ressources: Category-based (no standard sections)

### 4. **Inconsistent Styling**
- ⚠️ About/Contact/Legal: Use `max-w-xl mx-auto p-6 text-gray-900 bg-white rounded-lg shadow-md` (different from rest)
- ✅ Most pages: Use `bg-slate-50`, `rounded-3xl`, `border border-slate-200`, `shadow-sm`
- ⚠️ Home page: Uses `bg-slate-50` but different card styling

### 5. **Separate Content Files (Not Using Main Content Layer)**
- ⚠️ `checklistOffline.ts` (checklist content)
- ⚠️ `parcoursTimelineI18n.ts` (parcours timeline)
- ⚠️ `guideSteps.ts` (guide steps)
- ⚠️ `resourcesData.ts` (resources data)
- ⚠️ `scams.ts` (scams content - but this is imported into main content)

### 6. **Missing "Why It Matters" Lines**
- ⚠️ About page: Uses mission/vision instead of clear "why it matters"
- ⚠️ Legal page: Uses disclaimer instead of clear "why it matters"
- ⚠️ Contact page: Has question but not clear "why it matters"

### 7. **Inconsistent Vocabulary**
- ⚠️ "Étape" vs "Step" vs "Guide" (used inconsistently)
- ⚠️ "Checklist" vs "Liste" vs "Liste de vérification"
- ⚠️ "Arnaques" vs "Fraudes" vs "Scams"
- ⚠️ "Sources" vs "Ressources" vs "Liens"

### 8. **Localization Gaps**
- ⚠️ Some scam category titles are hardcoded (not fully localized)
- ⚠️ Filter labels ("Toutes", "All", "الكل") are hardcoded
- ✅ Most content is properly localized via content files

---

## Section Labels Usage

**Current shared labels** (from `content.shared.sectionLabels`):
- `what` ✅ Used in guide steps
- `why` ✅ Used in guide steps
- `how` ✅ Used in guide steps
- `avoid` ✅ Used in guide steps
- `sources` ✅ Used in guide steps

**Missing from shared:**
- `docs` (used as `content.microcopy.docsLabel`)
- `smartTips` (used as `content.microcopy.smartTipsLabel`)
- Scam-specific labels (scenario, redFlags, actions, neverDo, mantra)

---

## Next Steps

1. **Create shared content layer** (STEP B)
2. **Standardize page structure** (STEP C)
3. **Add missing CTAs** (STEP C)
4. **Move hardcoded text to content layer** (STEP B)
5. **Harmonize styling** (STEP E)
6. **Standardize section order** (STEP C)

