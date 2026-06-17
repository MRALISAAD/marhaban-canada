# DESIGN.md — Marhaban Canada

> Source of truth for all visual and interaction decisions. Update here first; code follows.

---

## Brand identity

**Name:** Marhaban Canada (`مرحباً كندا`)
**Tagline (FR):** *Votre guide de confiance pour bien commencer au Canada.*
**Platform type:** Orientation platform for newcomers

### Brand voice

| Attribute | What it sounds like |
|-----------|---------------------|
| Warm | "On est là pour vous." Not corporate, not cold. |
| Human | First person plural. No passive voice. No bureaucratic hedging. |
| Direct | One clear action per message. No multi-clause conditionals. |
| No-jargon | "Numéro d'assurance sociale" not "NAS". Spell it out the first time, every time. |
| Knowledgeable friend | Knows the system from the inside. Warns about pitfalls before they happen. |

### Anti-patterns (voice)

- ❌ "Veuillez noter que..." → ✅ "Important :"
- ❌ "Il est recommandé de..." → ✅ "Faites ça d'abord :"
- ❌ Invented statistics without a source
- ❌ Urgency theater ("Attention !!! Délai imminent !!!") — terracotta badges do that job visually

### Audience

**Primary:** Francophone and Arabophone newcomers, 18–45 years old.
**State:** Stressed. Overwhelmed by contradictory information online. Distrustful of unofficial advice. In a hurry.
**Needs:** Clarity → Trust → One clear next action.

---

## Color system

### Palette

| Token | Hex | OKLch | Role |
|-------|-----|-------|------|
| `--maple-gold` | `#D4A853` | `oklch(72% 0.12 80)` | Primary accent, CTAs, active links |
| `--maple-gold-light` | `#F4D98C` | `oklch(88% 0.10 85)` | Hover states, subtle tinted backgrounds |
| `--maple-gold-dark` | `#B8922F` | `oklch(62% 0.12 78)` | Press/active states |
| `--terracotta` | `#C7573A` | `oklch(55% 0.14 35)` | Soft urgency, "Urgent" badges, anti-scam |
| `--forest` | `#1B4332` | `oklch(28% 0.08 155)` | Headings, trust elements, dark navbars |
| `--forest-light` | `#2D6A4F` | `oklch(40% 0.09 155)` | Navigation hover states |
| `--parchment` | `#F5F0E8` | `oklch(95% 0.01 80)` | Main light-mode background |
| `--parchment-dark` | `#E8E0D0` | `oklch(90% 0.01 80)` | Cards, elevated surfaces |
| `--anthracite` | `#2D3748` | `oklch(26% 0.02 248)` | Body text |
| `--slate` | `#64748B` | `oklch(52% 0.04 248)` | Secondary / metadata text |
| `--mist` | `#F8FAFC` | `oklch(98% 0.004 248)` | Very light section backgrounds |

### Semantic colors

| Token | Color | Background | Usage |
|-------|-------|------------|-------|
| `--success` | `#059669` | `#ECFDF5` | Completed steps, verified info |
| `--warning` | `#D97706` | `#FFFBEB` | Important deadlines, attention items |
| `--danger` | `#DC2626` | `#FEF2F2` | Scam alerts, critical warnings |
| `--info` | `#2563EB` | `#EFF6FF` | Official source links, government references |

### Accent budget rule

**One accent per screen section.** `maple-gold` owns CTAs and active states. `terracotta` owns danger/urgency. Never use both in the same component. `forest` is structural (nav, headings), not decorative.

### Dark mode posture

Invert parchment → `#0F1A14` (near-black forest tint). `forest` → `#E8F5EE` (near-white). `maple-gold` stays unchanged — it reads on both grounds.

---

## Typography

### Font stack

| Role | Family | Weights | Usage |
|------|--------|---------|-------|
| Display | DM Serif Display | 400 | H1 hero, large section headings, offer names |
| Heading | Plus Jakarta Sans | 500 600 700 | H2–H4, nav labels, badges, UI text |
| Body | Inter | 400 500 600 | Descriptions, lists, all running prose |
| Arabic (RTL) | Noto Sans Arabic | 400 500 700 | All `dir="rtl"` content — replaces Display+Heading+Body |

### Google Fonts import

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@500;600;700&family=Inter:wght@400;500;600&family=Noto+Sans+Arabic:wght@400;500;700&display=swap');
```

### Type scale

| Token | Value | Usage |
|-------|-------|-------|
| `--text-hero` | `clamp(2.5rem, 5vw, 4rem)` | Hero H1 — DM Serif Display |
| `--text-h1` | `clamp(2rem, 4vw, 3rem)` | Page title — DM Serif Display |
| `--text-h2` | `clamp(1.5rem, 3vw, 2rem)` | Section heading — Plus Jakarta Sans 700 |
| `--text-h3` | `1.25rem` | Card heading, sub-section — Plus Jakarta Sans 600 |
| `--text-body` | `1rem` | Running copy — Inter 400 |
| `--text-small` | `0.875rem` | Captions, metadata, badges — Inter 400/500 |
| `--text-caption` | `0.75rem` | Legal, fine print — Inter 400 |

### Line-height pairings

| Size | Line-height |
|------|-------------|
| Hero / H1 | `1.15` |
| H2 | `1.25` |
| H3 | `1.35` |
| Body | `1.65` |
| Small | `1.5` |

### Arabic typography rules

- Noto Sans Arabic replaces ALL other families in RTL contexts.
- Increase `line-height` to `1.8` for Arabic body text.
- Never mix Arabic and Latin glyphs in the same `font-family` stack — declare separate rules under `[dir="rtl"]`.
- Numbers in Arabic contexts: use Eastern Arabic-Indic (`٠١٢…`) in cultural text; use Western digits (`0 1 2…`) in all UI/data contexts.

---

## Component tokens

### Border radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `6px` | Chips, badges, input fields |
| `--radius-md` | `10px` | Cards, modals, selects |
| `--radius-lg` | `16px` | Feature cards, hero card |
| `--radius-xl` | `24px` | Bottom sheets, large panels |
| `--radius-pill` | `999px` | Tags, language toggles, FABs |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-card` | `0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04)` | Default card rest state |
| `--shadow-card-hover` | `0 10px 25px rgba(0,0,0,.08), 0 4px 10px rgba(0,0,0,.04)` | Card hover / focus |
| `--shadow-elevated` | `0 20px 40px rgba(0,0,0,.1)` | Modals, drawers, toasts |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--section-y` | `clamp(4rem, 8vw, 8rem)` | Vertical section padding |
| `--container-x` | `clamp(1rem, 5vw, 6rem)` | Horizontal container gutter |
| `--card-padding` | `clamp(1.25rem, 3vw, 2rem)` | Uniform card inner padding |

### Transitions

| Token | Value | Usage |
|-------|-------|-------|
| `--transition-default` | `all 0.2s cubic-bezier(.4,0,.2,1)` | Standard hover/focus changes |
| `--transition-bounce` | `all 0.3s cubic-bezier(.34,1.56,.64,1)` | Playful entries (checkmarks, success states) |

---

## Signature visual element

A stylized maple leaf rendered as a golden filigree, used as an **organic structural separator between sections** — never as a logo substitute.

```css
/* Maple leaf filigree divider */
.section-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem 0;
  color: #D4A85320; /* maple-gold at 12% opacity */
}

.section-divider::before,
.section-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    #D4A85340,
    transparent
  );
}
```

**Rules:**
- Opacity range: 12%–20% (`#D4A85320` to `#D4A85333`). Never fully opaque.
- Used at most once per page scroll-distance of ~100vh.
- Never overlaid on `maple-gold` or `terracotta` backgrounds.
- Exclude from print stylesheets.

---

## Tailwind configuration

### `tailwind.config.ts` — extend block

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        'maple-gold': {
          DEFAULT: '#D4A853',
          light:   '#F4D98C',
          dark:    '#B8922F',
        },
        terracotta: '#C7573A',
        forest: {
          DEFAULT: '#1B4332',
          light:   '#2D6A4F',
        },
        parchment: {
          DEFAULT: '#F5F0E8',
          dark:    '#E8E0D0',
        },
        anthracite: '#2D3748',
        slate:      '#64748B',
        mist:       '#F8FAFC',
        // semantic
        success:    { DEFAULT: '#059669', bg: '#ECFDF5' },
        warning:    { DEFAULT: '#D97706', bg: '#FFFBEB' },
        danger:     { DEFAULT: '#DC2626', bg: '#FEF2F2' },
        info:       { DEFAULT: '#2563EB', bg: '#EFF6FF' },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
        arabic:  ['"Noto Sans Arabic"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card:       '0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04)',
        'card-hover':'0 10px 25px rgba(0,0,0,.08), 0 4px 10px rgba(0,0,0,.04)',
        elevated:   '0 20px 40px rgba(0,0,0,.1)',
      },
      borderRadius: {
        sm:   '6px',
        md:   '10px',
        lg:   '16px',
        xl:   '24px',
        pill: '999px',
      },
      spacing: {
        'section-y':   'clamp(4rem, 8vw, 8rem)',
        'container-x': 'clamp(1rem, 5vw, 6rem)',
        'card-pad':    'clamp(1.25rem, 3vw, 2rem)',
      },
      fontSize: {
        hero:    ['clamp(2.5rem,5vw,4rem)',  { lineHeight: '1.15' }],
        h1:      ['clamp(2rem,4vw,3rem)',     { lineHeight: '1.15' }],
        h2:      ['clamp(1.5rem,3vw,2rem)',   { lineHeight: '1.25' }],
        h3:      ['1.25rem',                  { lineHeight: '1.35' }],
        body:    ['1rem',                     { lineHeight: '1.65' }],
        small:   ['0.875rem',                 { lineHeight: '1.5'  }],
        caption: ['0.75rem',                  { lineHeight: '1.5'  }],
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(.34,1.56,.64,1)',
      },
    },
  },
  plugins: [],
}

export default config
```

### `globals.css` — CSS custom properties

```css
/* ── Marhaban Canada — Design Tokens ── */
@layer base {
  :root {
    /* Brand */
    --maple-gold:        #D4A853;
    --maple-gold-light:  #F4D98C;
    --maple-gold-dark:   #B8922F;
    --terracotta:        #C7573A;
    --forest:            #1B4332;
    --forest-light:      #2D6A4F;

    /* Neutral */
    --parchment:         #F5F0E8;
    --parchment-dark:    #E8E0D0;
    --anthracite:        #2D3748;
    --slate:             #64748B;
    --mist:              #F8FAFC;

    /* Semantic */
    --success:           #059669;
    --success-bg:        #ECFDF5;
    --warning:           #D97706;
    --warning-bg:        #FFFBEB;
    --danger:            #DC2626;
    --danger-bg:         #FEF2F2;
    --info:              #2563EB;
    --info-bg:           #EFF6FF;

    /* Typography */
    --font-display: "DM Serif Display", Georgia, serif;
    --font-heading: "Plus Jakarta Sans", system-ui, sans-serif;
    --font-body:    Inter, system-ui, sans-serif;
    --font-arabic:  "Noto Sans Arabic", system-ui, sans-serif;

    --text-hero:    clamp(2.5rem, 5vw, 4rem);
    --text-h1:      clamp(2rem, 4vw, 3rem);
    --text-h2:      clamp(1.5rem, 3vw, 2rem);
    --text-h3:      1.25rem;
    --text-body:    1rem;
    --text-small:   0.875rem;
    --text-caption: 0.75rem;

    /* Radius */
    --radius-sm:   6px;
    --radius-md:   10px;
    --radius-lg:   16px;
    --radius-xl:   24px;
    --radius-pill: 999px;

    /* Shadow */
    --shadow-card:       0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04);
    --shadow-card-hover: 0 10px 25px rgba(0,0,0,.08), 0 4px 10px rgba(0,0,0,.04);
    --shadow-elevated:   0 20px 40px rgba(0,0,0,.1);

    /* Spacing */
    --section-y:      clamp(4rem, 8vw, 8rem);
    --container-x:    clamp(1rem, 5vw, 6rem);
    --card-padding:   clamp(1.25rem, 3vw, 2rem);

    /* Transitions */
    --transition-default: all 0.2s cubic-bezier(.4,0,.2,1);
    --transition-bounce:  all 0.3s cubic-bezier(.34,1.56,.64,1);

    /* Filigree */
    --filigree-color: #D4A85320;
  }

  /* Dark mode */
  @media (prefers-color-scheme: dark) {
    :root {
      --parchment:      #0F1A14;
      --parchment-dark: #162219;
      --anthracite:     #E8F5EE;
      --slate:          #94A3B8;
      --mist:           #0A1210;
    }
  }

  /* RTL overrides */
  [dir="rtl"] {
    font-family: var(--font-arabic);
    line-height: 1.8;
  }

  [dir="rtl"] h1,
  [dir="rtl"] h2,
  [dir="rtl"] h3 {
    font-family: var(--font-arabic);
    font-weight: 700;
  }
}
```

---

## i18n architecture

### Three-language model

| Language | Code | Direction | Notes |
|----------|------|-----------|-------|
| French | `fr` | LTR | Default. All fallback content. |
| English | `en` | LTR | Secondary. Official government terms stay in English even in FR copy. |
| Arabic | `ar` | RTL | `dir="rtl"` on `<html>` or per-section container. Noto Sans Arabic replaces all type. |

### RTL implementation

```html
<!-- Page-level RTL -->
<html lang="ar" dir="rtl">

<!-- Section-level RTL (mixed-language pages) -->
<section dir="rtl" lang="ar" class="font-arabic">
```

```css
/* Tailwind RTL utilities (built-in) */
.rtl\:text-right { text-align: right; }
.rtl\:pl-4 { padding-left: 0; padding-right: 1rem; }

/* Mirror flex row for RTL */
[dir="rtl"] .flex-row { flex-direction: row-reverse; }

/* Keep icons non-mirrored */
[dir="rtl"] .icon-no-mirror { transform: none !important; }
```

### Content rules

- French and English: `<p>`, `<h2>` etc. with `font-body` / `font-heading` / `font-display`.
- Arabic: `<p dir="rtl">`, `<h2 dir="rtl">` — font-family switches to `font-arabic` via the `[dir="rtl"]` selector automatically.
- Do not nest RTL inside LTR `<p>` tags. Use block-level containers.
- Legal / government references: cite the French official title first, then provide the English equivalent in parentheses on first use.

### Anti-scam callout — language-specific

The anti-scam warning must exist in all three languages and appear at **identical visual weight** across language variants. Never relegate it to a tooltip or fine print.

---

## Component patterns

### CTA button

```
Primary:   bg maple-gold | text forest | hover bg maple-gold-dark | radius-md | shadow-card
Secondary: border forest | text forest | hover bg forest text white | radius-md
Danger:    bg terracotta | text white | radius-md
```

### Badge / status chip

```
Success:  bg success-bg | text success | radius-pill | text-small
Warning:  bg warning-bg | text warning | radius-pill | text-small
Danger:   bg danger-bg  | text danger  | radius-pill | text-small
Info:     bg info-bg    | text info    | radius-pill | text-small
Urgent:   bg terracotta | text white   | radius-pill | text-small | font-heading 600
```

### Step card (orientation checklist)

```
Surface:      parchment-dark | radius-lg | shadow-card | card-padding
Active/focus: border-l-4 maple-gold | shadow-card-hover
Complete:     opacity-75 | success checkmark icon | bg success-bg
Locked:       opacity-40 | cursor-not-allowed
```

### Official source link

```
inline-flex | gap-2 | text-info | underline-offset-2 | hover:underline
prepend: 🔗 icon or "Source officielle :" label
```

### Anti-scam alert block

```
bg danger-bg | border border-danger | radius-md | card-padding
Header: text-danger font-heading 700 + warning icon
Body:   text-anthracite font-body
Footer: "Signaler / Report / الإبلاغ" link in all three languages
```

---

## Layout guidelines

### Container

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: var(--container-x);
}
```

### Section rhythm

Every top-level section: `padding-block: var(--section-y)`. Alternate between `--parchment` and `--mist` backgrounds — never two identical consecutive backgrounds. `--forest` dark sections are used for nav and high-trust CTAs only (1–2 per page max).

### Responsive breakpoints

| Breakpoint | Width | Notes |
|-----------|-------|-------|
| `sm` | 640px | Single-column mobile |
| `md` | 768px | Two-column cards |
| `lg` | 1024px | Three-column cards, sticky sidebar |
| `xl` | 1280px | Full layout |

---

## Accessibility baseline

- Contrast: all body text on `--parchment` must pass WCAG AA (4.5:1 minimum). `--slate` on `--parchment` passes at 3.8:1 — use only for truly secondary metadata (captions, timestamps).
- Focus rings: `outline: 2px solid var(--maple-gold); outline-offset: 3px` on all interactive elements. Never remove the default outline without replacing it.
- Motion: `@media (prefers-reduced-motion: reduce)` — set all `transition` to `none` and all `animation-duration` to `0.01ms`.
- Touch targets: minimum `44px × 44px` on all interactive elements.
- Language attributes: every `<html>` element must carry `lang` and `dir`. Per-section overrides for mixed-language content.

---

## Design anti-patterns (specific to Marhaban Canada)

| ❌ Don't | ✅ Do instead |
|---------|-------------|
| Use `#D4A853` (maple-gold) as a page background | Reserve it for CTA buttons and active states only |
| Gradient hero backgrounds | Flat `--forest` or `--parchment` with a real photo |
| 3+ urgency badges on one screen | One terracotta badge per viewport scroll height |
| Invented government process timelines | "Délai estimé selon IRCC, janvier 2025" or leave blank |
| Fun emoji replacing icons (🚀 ✨ 🎯) | Use a consistent icon set (Lucide / Phosphor) at 20px |
| Lorem ipsum in any language | Honest placeholders: "Votre étape ici" in a grey block |
| Inter as display face | DM Serif Display for hero/H1 only — Inter stays as body |
| Beige/peach gradients | `--parchment` flat background — warm without being pastel-wash |
