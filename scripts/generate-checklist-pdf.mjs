import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const BASE_URL = process.env.PDF_BASE_URL || 'http://localhost:3000';
const ROUTE = process.env.PDF_ROUTE || '/fr/checklist/print';
const OUT_DIR = path.join(process.cwd(), 'public');
const OUT_FILE = path.join(OUT_DIR, 'checklist.pdf');

// Petit helper pour attendre que la page soit stable
async function gotoStable(page, url) {
  await page.goto(url, { waitUntil: 'networkidle' });
  // Petite marge pour fonts/images
  await page.waitForTimeout(800);
}

(async () => {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
  });

  const url = `${BASE_URL}${ROUTE}`;
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-pdf="checklist"]', { timeout: 5000 });
  await page.waitForTimeout(300);

  await page.emulateMedia({ media: 'screen' });
  await page.pdf({
    path: OUT_FILE,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();

  console.log(`✅ PDF généré: ${OUT_FILE} depuis ${url}`);
})().catch((err) => {
  console.error('❌ Erreur génération PDF:', err);
  process.exit(1);
});

