# Marhaban Canada — Design Direction

## Vision

Premium editorial, chaleureux, humain. Pas une startup SaaS, pas une agence gouvernementale. Un service de confiance qui ressemble à un guide de voyage de qualité — chaque section respire, chaque mot compte, chaque CTA est une invitation.

Inspiration de ton : Two Leaves Tea (chaleur éditoriale, espace généreux, typographie forte) — sans copier. Marhaban Canada est une marque d'accompagnement humain, fiable, simple et rassurante.

---

## Principes visuels

1. **Espace avant tout** — sections généreuses, jamais compressées.
2. **Typographie au centre** — les headings font le travail, pas les décorations.
3. **Chaleur sans fioriture** — la couleur sert la hiérarchie, pas l'esthétique seule.
4. **Confiance par la clarté** — disclaimers légaux visibles, pas cachés dans les footnotes.
5. **Premium sans froideur** — dark sections restent organiques, pas corporate.
6. **Sections distinctes** — chaque ton de fond crée un rythme visuel. Jamais deux sections identiques consécutives.

---

## Règles typographiques

### Headings
- Police : `font-heading` (Fraunces) — serif expressif
- H1 hero : `clamp(3.2rem, 7vw, 7rem)` — impactant, jamais serré
- H2 sections : `4.2rem` sur desktop — classe `.heading-section`
- Leading H1 : `0.88` — display tight, éditorial
- Tracking : `tracking-tight` partout
- Weight : `font-semibold` (600)

### Body
- Corps : Inter 16px/1.6 (leading-relaxed)
- Lead text : `text-lg` ou `text-xl` sur desktop
- Caption / eyebrow : `text-xs font-bold uppercase tracking-[0.14em]`
- Eyebrow clay sur fond clair (`text-marhaban-clay`)
- Eyebrow gold sur fond sombre (`text-marhaban-gold`)

### Hiérarchie
```
eyebrow         → 12px, caps, clay/gold
heading H1      → 7rem max, Fraunces
heading H2      → 4.2rem, Fraunces
heading-card H3 → 1.25rem–1.5rem, Fraunces
body lead       → 1.125rem–1.25rem, Inter
body default    → 1rem, Inter
caption         → 0.75rem, Inter
```

---

## Règles spacing

### Sections
- Padding vertical : `py-16 sm:py-20 lg:py-28`
- Ne jamais descendre sous `py-14` sur une section principale
- PageHero : `pt-16 sm:pt-20 lg:pt-28 pb-12 sm:pb-16 lg:pb-20`

### SectionHeader alignment
- Sections avec grille symétrique en dessous → `align="center"` (process, situation, resources)
- Sections avec contenu asymétrique → `align="start"` (service card, hero)

### Contenu intérieur
- Gap entre titre et grille : `mt-8` minimum, `mt-10` pour processus
- Gap entre eyebrow et heading : `mt-3`
- Grilles cards : `gap-5` minimum

### Horizontal
- Padding latéral : `px-4 sm:px-6 lg:px-8`
- Max-width : `max-w-7xl`

---

## Règles sections (tons)

### light (défaut)
- `bg-transparent` — on voit le fond `bg-marhaban-cream`

### muted
- `bg-marhaban-mint/25` — légère teinte verte organique, distincte du fond cream
- Toujours adjacent à une section light ou dark, jamais deux muted consécutives

### dark
- `bg-marhaban-forestDark text-white`
- Inner container : `rounded-[2rem] border border-white/10 bg-white/[0.07]`
- Padding inner : `p-8 sm:p-12` (généreux)
- Shadow : `shadow-[0_24px_70px_rgba(0,0,0,0.22)]`
- Toujours une eyebrow au-dessus du titre

---

## Règles cards

### Card standard (fond clair)
- `rounded-[1.85rem]` minimum
- `border border-marhaban-leaf/12 bg-white`
- `shadow-warm-sm`
- Hover : `hover:-translate-y-1.5 hover:shadow-warm transition-all duration-300`
- Padding : `p-7` minimum

### Card featured (fond sombre)
- `bg-marhaban-forestDark` + `border-marhaban-clay/25`
- `shadow-premium-card`
- Prix en `text-marhaban-gold`

### Card checklist items (companion card)
- `bg-marhaban-mint/30` — fond mint pour les items de liste
- `rounded-[1.25rem]`
- `py-3.5` pour la hauteur
- Icône `Check` lucide-react, `text-marhaban-leaf`

### Card processus (RoadmapStage)
- `bg-white` (pas bg-offwhite)
- Numéro décoratif watermark `text-[8rem] text-marhaban-leaf/[0.055]`
- Badge numéro : `border-marhaban-clay/25 bg-marhaban-clay/8 text-marhaban-clay`

### Cards ressources (resource grid)
- `rounded-[1.75rem] p-6`
- `transition-all duration-300` sur hover

### Trust items
- Hover : `hover:-translate-y-0.5 hover:shadow-warm-sm transition-all duration-300`
- Icône : `h-11 w-11 bg-marhaban-mint/80 border-marhaban-leaf/20`

---

## Règles CTA

### Primaire (fond sombre)
- `bg-marhaban-gold text-marhaban-ink`
- Shadow : `shadow-[0_24px_80px_rgba(213,168,79,0.35)]`
- `min-h-[60px] px-8 py-4 font-bold`
- Hover : `hover:bg-white`

### Primaire (fond clair)
- `bg-marhaban-forestDark text-white shadow-warm-sm`
- Hover : `hover:bg-marhaban-leaf`

### Secondaire (fond sombre)
- `border border-white/16 bg-white/[0.06] text-white`
- Hover : `hover:bg-white/12`

### Taille minimum
- Boutons hero : `min-h-[60px]` (btn-lg)
- Boutons sections mid-page : `min-h-[60px]` (btn-lg)
- Boutons cards : `min-h-[48px]` (btn-md)
- Boutons nav : `min-h-[48px]`

---

## Règles hero

- Toujours `dark` (fond `bg-marhaban-forestDark`)
- H1 : `clamp(3.2rem, 7vw, 7rem)` leading `0.88`
- Padding vertical : `pt-16 sm:pt-20 lg:pt-28`
- Grid desktop : `[1.1fr_0.9fr]`
- Visual card : `bg-white/[0.07]` — visible mais discret, `p-6 sm:p-7`
- CTA primaire : gold, shadow prononcé `shadow-[0_24px_80px_rgba(213,168,79,0.35)]`

### Hero visual (panneau droite)
- Séparateur gold des deux côtés du label
- Grilles topics : hover `hover:bg-white/[0.13]`
- Border topics : `border-white/12`
- Padding topics : `py-3.5`

---

## Règles anti-scam

- Icône `ShieldAlert` gold en haut (`h-14 w-14 border-marhaban-gold/30 bg-marhaban-gold/10`)
- Padding : `p-8 sm:p-12` (généreux)
- Eyebrow gold : `.eyebrow-light`
- Titre fort mais rassurant, pas alarmiste
- CTA primaire gold, secondaire ghost

---

## Règles final CTA

- **Toujours différent visuellement de l'anti-scam**
- Eyebrow d'invitation ("Prêt à commencer ?")
- Pas d'icône (distinction avec anti-scam qui a ShieldAlert)
- Padding : `p-8 sm:p-12`
- `mt-3` entre eyebrow et titre (cohérent)

---

## Règles footer

- `border-t-2 border-marhaban-leaf/15` — présence de marque marquée
- Fond gradient : `bg-[linear-gradient(180deg,rgba(247,241,230,0.99),rgba(243,233,218,0.97))]`
- Dark banner : `rounded-[2rem] border border-marhaban-leaf/14 bg-marhaban-ink`
- Brand logo : `h-10 w-10` (footer) vs `h-8 w-8` (navbar)
- Mission text : `text-sm leading-relaxed text-marhaban-ink/82`
- Column headers : `text-xs font-semibold uppercase tracking-[0.12em] text-marhaban-clay`

---

## Règles mobile

- H1 : `clamp(3.2rem, 7vw, 7rem)` — min 3.2rem sur mobile = assez grand
- Sections : `py-16` minimum sur mobile
- Cards : 1 col → 2 col → 3 col (jamais 4 sur mobile)
- CTAs : `min-h-[48px]` partout (tap target)
- Padding horizontal : `px-4`
- Hero : stacked sur mobile (grille 1 col → 2 col à partir de `lg`)
- Floating CTA : `rounded-[1.25rem]` sur mobile, `rounded-full` sur desktop

---

## Ce qu'il faut éviter

- **Sections muted `bg-marhaban-warm/55`** — quasi invisible sur cream, utiliser `bg-marhaban-mint/25`
- **Padding insuffisant** — jamais `py-8` ou `py-10` sur une section principale
- **H1 sous 3rem** — même sur mobile
- **Cards sans hover** — chaque card cliquable doit avoir un état hover visible
- **CTA sans shadow** — le bouton primaire doit toujours avoir une shadow chaude
- **Anti-scam et Final CTA identiques** — l'un a ShieldAlert + "Avant de payer", l'autre n'a pas d'icône + "Prêt à commencer"
- **`bg-offwhite` sur companion card** — trop terne, utiliser `bg-white`
- **Bullet dots tiny (`h-1.5 w-1.5`)** — utiliser `Check` icon lucide
- **`btn-lg` dans les cards** — `text-lg` trop grand pour contexte card, utiliser `btn-md`
- **SectionHeader all left-aligned** — centrer les headers de sections avec grilles symétriques
- **Trop de glassmorphism** — 1 niveau de transparence max par surface
- **Promesses visa/immigration** — aucun wording garantissant un résultat
- **Focus invisible** — focus-visible obligatoire sur tous les interactifs
- **Animations trop rapides** — respecter `prefers-reduced-motion`
