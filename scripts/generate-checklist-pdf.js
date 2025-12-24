import { chromium } from 'playwright';
import path from 'path';

const BASE_URL = process.env.CHECKLIST_URL || 'http://localhost:3000/fr/checklist';
const OUTPUT_PATH = path.join(__dirname, '../public/checklist.pdf');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
  });

  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'screen' });

  await page.pdf({
    path: OUTPUT_PATH,
    format: 'A4',
    printBackground: true,
    margin: { top: '15mm', bottom: '15mm', left: '10mm', right: '10mm' },
  });

  await browser.close();
  console.log(`✅ checklist.pdf generated from ${BASE_URL} -> ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error('❌ Failed to generate checklist PDF:', err);
  process.exit(1);
});

