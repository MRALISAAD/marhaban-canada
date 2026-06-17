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

## Pass 2 — Décisions desktop rhythm

### Navigation mature
- Brand : `font-bold` (pas `font-semibold`) pour plus de présence
- Nav links inactifs : `text-marhaban-ink/78` (pas `/68`) — lisibles sans être actifs
- CTA nav : `border-marhaban-gold/30` (pas `/18`) + shadow `shadow-[0_18px_50px_rgba(8,42,36,0.25)]`
- Principe : la nav doit être lue facilement, jamais fondue dans le fond

### Hero visual hiérarchisé
- **2 premiers topics** (Avant l'arrivée, Première semaine) → gold accent `border-marhaban-gold/20 bg-marhaban-gold/10 text-marhaban-gold`
- **6 topics restants** → standard `bg-white/[0.08] text-[#e8f4ee]`
- Principe : créer un moment visuel mémorable dans le panneau droite, pas une grille uniforme
- Les 2 premiers topics signalent "commence ici" visuellement

### CTA hero cohérents
- Primaire et secondaire identiques en hauteur : `min-h-[60px] px-8 py-4`
- Jamais `min-h-[56px]` pour le secondaire quand le primaire est `[60px]`

### Pills hero
- `py-2.5` (pas `py-2`) pour plus de toucher et lisibilité

### Situation cards — rupture visuelle
- La 4ème card (Anti-arnaque, index=3) en `tone="dark"` — seule card dark dans la grille blanche
- Principe : briser la répétition, signaler que le service anti-arnaque est différent (urgent vs orientatif)
- Ne pas mettre 2+ cards dark consécutives dans une même section

### Process section — réassurance post-CTA
- Sous le bouton "Réserver un appel" : `<p>30 min · Sans engagement</p>`
- `text-xs text-marhaban-muted` — subtil, rassurant, pas intrusif

### Anti-scam — CTAs à hauteur
- `min-h-[56px] px-8 py-4` (plus grands que les sections standard `min-h-[52px]`)
- Inner container : `bg-white/[0.09]` (pas `[0.07]`) pour plus de lisibilité sur dark bg

### Footer — cohérence dark theme
- Dark banner : `bg-marhaban-forestDark` (pas `bg-marhaban-ink`)
- Raison : `marhaban-ink = #1F2D2B` vs `marhaban-forestDark = #082A24` — le forestDark est la couleur dark canonique du site, ink est réservé au texte

---

## Pass 3 — Décisions éditoriales

### Trust strip — Lucide icons
- Remplacer les unicode decoratifs (`✦ ⬡ ◈ ◎`) par des icônes Lucide SVG
- Map : `'✦' → Compass`, `'⬡' → ShieldCheck`, `'◈' → BookOpen`, `'◎' → Phone`
- `trustIconMap: Record<string, typeof Compass>` défini au niveau module dans page.tsx
- Les data restent en strings (compatibilité satisfies), la résolution en composant est au rendu
- Taille icon : `h-5 w-5` dans un badge `h-11 w-11 bg-marhaban-mint/80`

### ServiceCard — correction du doublon duration
- Suppression du premier badge `service.duration` dans le header group
- Seule la rangée prix conserve `service.duration` à droite
- Le `service.label` ("Prix de lancement") est seul en haut si présent
- Titres en `font-heading` (Fraunces) pour plus de caractère éditorial

### SectionHeader — prop `size`
- Ajout de `size?: 'section' | 'display'` 
- `size="display"` → `heading-display` (`4.5rem`) au lieu de `heading-section` (`4.2rem`)
- Utilisation : `size="display"` sur la section service principale uniquement
- Principe : différencier visuellement L'offre principale des sections secondaires

### RouteCard — titres éditoriaux
- `font-heading` (Fraunces) ajouté aux titres h3 — rupture Inter → Fraunces
- Taille : `text-[1.15rem] sm:text-[1.25rem]` → `text-[1.2rem] sm:text-[1.35rem]`
- Badge : `py-1.5 tracking-wide` pour plus de présence
- Padding card : `p-6` → `p-7` pour plus de respiration

### Companion card CTA — cohérence avec ServiceCard
- `btn btn-md` (`min-h-[48px]`) → `min-h-[54px]` pour matcher la hauteur ServiceCard
- Classes manuelles pour contrôle précis : `inline-flex min-h-[54px] w-full items-center...`
- Raison : le companion card est le point de conversion principal, pas une card secondaire

### Resource grid — plus airy et premium
- Labels : `text-sm font-semibold` → `text-base font-semibold` 
- Padding items : `p-6` → `p-7`
- Arrow icon badge : `h-8 w-8` → `h-9 w-9`
- "Voir tous les guides" : inline link → `btn-secondary` style avec border + bg-white
  `rounded-full border border-marhaban-leaf/25 bg-white px-6 py-3 shadow-warm-xs`
- Spacing : `mt-6` → `mt-8` avant le lien "Voir tous"

### Process steps — respiration
- Grid gap : `gap-5` → `gap-6`
- Service grid ratio : `[1.05fr_0.95fr]` → `[1.1fr_0.9fr]` (featured card plus dominante)

### Final CTA — layout split 2 colonnes (différenciation de l'anti-scam)
- **Suppression** de l'inner rounded box (`rounded-[2rem] border bg-white/[0.07]`)
- Layout : `grid lg:grid-cols-[1.2fr_0.8fr] lg:gap-20`
  - Gauche : eyebrow + heading + lead text
  - Droite : 2 CTAs empilés + disclaimer
- CTAs : `min-h-[52px] px-7` → `min-h-[56px] px-8 py-4`
- CTAs desktop : `flex-col` (empilés pleine largeur) / tablet : `flex-row` (côte à côte)
- Disclaimer : dans la colonne droite sous les CTAs (`text-white/55`)
- Principe : anti-scam = centered box + icon + urgence / final CTA = split editorial + invitation
- Les deux sections dark restent distinctes par structure ET contenu

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

---

## Reservation page rules (`/reserver`)

### Structure
```
1. Hero (dark rounded card, NOT PageHero component)
2. "Comment ça marche" (muted section, 3 how-cards)
3. Booking section (light, CalendlyEmbed)
4. Final CTA (dark section, split 2-col)
```

### Hero réservation
- Pas `PageHero` — hero custom `rounded-[2.5rem] bg-marhaban-forestDark` avec padding généreux
- Padding page : `pt-10 sm:pt-12 lg:pt-14` — plus court que la home (pas de navbar offset supplémentaire)
- Inner padding : `py-10 sm:py-12 lg:py-14 px-6 sm:px-8 lg:px-12`
- H1 : `clamp(3rem,6vw,6rem)` `leading-[0.9]` — plus petit que la home mais toujours fort
- CTA gold : `min-h-[60px] px-8 py-4` — identique home
- Badges : `py-2.5` — identique home
- Right panel : `bg-white/[0.08]` — plus visible que `[0.05]`
- Bullets right panel : icône `Check` de lucide-react, pas de dots unicode

### How-cards (section "Comment ça marche")
- Step badge : style `RoadmapStage` — `inline-flex rounded-full border border-marhaban-clay/25 bg-marhaban-clay/8 px-3 py-1 text-xs text-marhaban-clay`
- Titre : `h3` (sémantique) + `font-heading` (Fraunces) + `sm:text-2xl`
- `h2` interdit pour les cards quand la section a déjà un `SectionHeader` (qui utilise `h2`)

### CalendlyEmbed
- Duration badge : `py-1.5` (cohérent avec le système de badges)
- Gold CTA shadow : `rgba(213,168,79,0.28)` minimum pour visibilité
- Ne jamais toucher la logique `openServiceModal`, `activeKey`, `calendlyEvents`

### Final CTA réservation
- Split 2 colonnes : eyebrow + heading + note à gauche, CTA seul à droite
- `eyebrow-light` + `heading-section` — même pattern que home final CTA
- CTA : `min-h-[56px] px-8 py-4` (pas besoin de `[60px]` — page déjà chargée en intent)
- Section spacing : `py-14 sm:py-16 lg:py-20` (légèrement plus compact que home `py-16/20/28`)

### Mobile
- Floating CTA `md:hidden` en bas → `min-h-[48px]` ok pour tap
- Hero stacked sur mobile — right panel passe en dessous
- How-cards → 1 col sur mobile, 3 sur md+

### Disclaimers réservation
- Dans le modal : `trust` note (`bg-white/[0.06] rounded-2xl p-4`) côté dark
- Sur la page : `text-xs text-marhaban-muted` sous le CalendlyEmbed
- Ne jamais promettre un résultat, un visa, ou une autorisation
