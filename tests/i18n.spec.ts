import { test, expect } from '@playwright/test';

const BASE = process.env.BASE_URL || 'https://marhabancanada.ca';

const pages = [
  '/en',
  '/en/checklist',
  '/en/arnaques',
  '/en/arnaques/immigration',
  '/en/ressources',
  '/en/parcours',
  '/en/blog',
  '/en/parcours/guide/steps/nas',
  '/ar',
  '/ar/checklist',
  '/ar/arnaques',
  '/ar/arnaques/immigration',
  '/ar/ressources',
  '/ar/parcours',
  '/ar/parcours/guide/steps/nas',
];

// French markers that must not appear on EN/AR pages
const frenchMarkers = [
  'Bienvenue',
  'Accueil',
  'Ressources',
  'Arnaques',
  'Parcours',
  'Nous sommes là pour t’aider',
  'Mentions légales',
];

test('No French leaks in EN/AR pages', async ({ page }) => {
  for (const p of pages) {
    await page.goto(`${BASE}${p}`, { waitUntil: 'domcontentloaded' });
    const text = await page.locator('body').innerText();
    for (const word of frenchMarkers) {
      expect(text, `FR leak "${word}" in ${p}`).not.toContain(word);
    }
  }
});

