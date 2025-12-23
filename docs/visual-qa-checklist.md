# Visual QA Checklist - Marhaban Canada

**Purpose:** Quick visual quality assurance checklist for mobile, desktop, and RTL layouts

---

## Mobile (320px - 768px)

### Home Page
- [ ] H1 is readable (not too small)
- [ ] CTA buttons are tappable (min 44px height)
- [ ] Cards stack vertically
- [ ] Province selector is accessible
- [ ] Progress bar is visible
- [ ] No horizontal scroll

### Checklist Page
- [ ] Header is readable
- [ ] Progress bar fits on screen
- [ ] Checklist items are tappable
- [ ] Reset button is accessible
- [ ] Language selector works
- [ ] Sections stack properly

### Parcours Page
- [ ] Timeline sections stack
- [ ] Search bar is accessible
- [ ] Filter buttons are tappable
- [ ] Progress bar fits
- [ ] No text overflow

### Guide Step Pages
- [ ] H1 is readable
- [ ] Sections stack vertically
- [ ] Lists are readable
- [ ] CTA button is tappable
- [ ] Navigation (prev/next) is accessible
- [ ] Back button works

### Scams Page
- [ ] Category grid stacks
- [ ] Search bar is accessible
- [ ] Emergency CTA is visible
- [ ] Warning callout is readable
- [ ] Quiz component works

### Resources Page
- [ ] Search and filters stack
- [ ] Resource cards stack
- [ ] Guide cards are readable
- [ ] Favorites button works
- [ ] No horizontal scroll

### About/Contact/Legal Pages
- [ ] Content is readable
- [ ] No text overflow
- [ ] Links are tappable
- [ ] Consistent with other pages

---

## Desktop (1024px+)

### Layout Consistency
- [ ] Max width is consistent (max-w-5xl or max-w-6xl)
- [ ] Padding is consistent (px-4 py-12 or similar)
- [ ] Sections have consistent spacing (space-y-6)
- [ ] Cards have consistent styling (rounded-3xl, border, shadow-sm)

### Typography
- [ ] H1: text-2xl sm:text-3xl (consistent across pages)
- [ ] H2: text-lg or text-xl (consistent)
- [ ] Body: text-sm or text-base (consistent)
- [ ] Eyebrow: text-xs uppercase tracking-[0.25em] (consistent)

### Colors
- [ ] Background: bg-slate-50 (consistent)
- [ ] Cards: bg-white (consistent)
- [ ] Borders: border-slate-200 (consistent)
- [ ] Text: text-slate-900 (headings), text-slate-600 (body), text-slate-500 (meta)

### Components
- [ ] PageHeader: rounded-3xl, border, shadow-sm, p-6
- [ ] SectionBlock: rounded-3xl, border, shadow-sm, p-6
- [ ] Callout: rounded-2xl, border, p-4 sm:p-5
- [ ] PrimaryButton: rounded-xl, bg-slate-900, px-4 py-2.5

### Spacing
- [ ] Section spacing: space-y-6 (consistent)
- [ ] Card padding: p-6 (consistent)
- [ ] Button padding: px-4 py-2.5 (consistent)
- [ ] Gap between elements: gap-3 or gap-4 (consistent)

---

## RTL (Arabic - Right-to-Left)

### Text Alignment
- [ ] All text is right-aligned
- [ ] Headings are right-aligned
- [ ] Lists are right-aligned
- [ ] Buttons are right-aligned
- [ ] Forms are right-aligned

### Icons and Arrows
- [ ] Arrows point left (←) instead of right (→)
- [ ] Icons are positioned correctly (right side)
- [ ] Navigation arrows are flipped
- [ ] Breadcrumbs flow right-to-left

### Spacing
- [ ] Padding is balanced (not lopsided)
- [ ] Margins are balanced
- [ ] Gaps between elements look natural
- [ ] No awkward spacing

### Components
- [ ] PageHeader: text-right, proper RTL spacing
- [ ] SectionBlock: text-right, icon on right
- [ ] Callout: text-right, icon on right
- [ ] PrimaryButton: arrow on left side
- [ ] Forms: labels and inputs right-aligned

### Navigation
- [ ] Breadcrumbs flow RTL
- [ ] Back button points right
- [ ] Next button points left
- [ ] Menu items are right-aligned

---

## Cross-Browser Testing

### Chrome
- [ ] Layout renders correctly
- [ ] Fonts load properly
- [ ] Colors are correct
- [ ] Interactions work

### Firefox
- [ ] Layout renders correctly
- [ ] Fonts load properly
- [ ] Colors are correct
- [ ] Interactions work

### Safari
- [ ] Layout renders correctly
- [ ] Fonts load properly
- [ ] Colors are correct
- [ ] Interactions work

### Edge
- [ ] Layout renders correctly
- [ ] Fonts load properly
- [ ] Colors are correct
- [ ] Interactions work

---

## Accessibility

### Keyboard Navigation
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Tab order is logical
- [ ] Skip links work (if present)

### Screen Readers
- [ ] All images have alt text
- [ ] Headings are properly structured (h1 → h2 → h3)
- [ ] Form labels are associated
- [ ] Buttons have descriptive labels
- [ ] Links have descriptive text

### Color Contrast
- [ ] Text meets WCAG AA (4.5:1 for normal text, 3:1 for large text)
- [ ] Buttons meet contrast requirements
- [ ] Links are distinguishable
- [ ] Focus indicators are visible

---

## Performance

### Loading
- [ ] Pages load quickly (< 3s)
- [ ] Images are optimized
- [ ] Fonts load efficiently
- [ ] No layout shift (CLS)

### Interactions
- [ ] Buttons respond immediately
- [ ] Forms submit correctly
- [ ] Navigation is smooth
- [ ] No janky animations

---

## Content Quality

### Consistency
- [ ] All pages have H1
- [ ] All pages have "why it matters" intro
- [ ] All pages have primary CTA (where applicable)
- [ ] Section order is consistent (What → Why → How → Avoid → Sources)
- [ ] Vocabulary is consistent (Étape, Checklist, Guide, etc.)

### Localization
- [ ] No French text in EN/AR locales
- [ ] All content is properly localized
- [ ] RTL layout works for Arabic
- [ ] Language switcher preserves route

---

## Quick Visual Checks

### Before Publishing
1. [ ] Open home page - check H1, intro, CTA
2. [ ] Open checklist - check header, progress, sections
3. [ ] Open parcours - check timeline, filters, sections
4. [ ] Open guide step - check sections order, CTA
5. [ ] Open scams - check warning callout, categories
6. [ ] Open resources - check search, filters, cards
7. [ ] Switch to Arabic - check RTL, alignment, spacing
8. [ ] Switch to English - check no French text
9. [ ] Test on mobile - check tap targets, stacking
10. [ ] Test on desktop - check max-width, spacing

---

**Last Updated:** 2024  
**Review Frequency:** Before each release

