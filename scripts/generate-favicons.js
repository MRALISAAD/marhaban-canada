/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const input = path.join(__dirname, '../assets/logo.png');
const outputDir = path.join(__dirname, '../public');

async function generate() {
  if (!fs.existsSync(input)) {
    console.error('❌ Logo not found:', input);
    console.error('➡️ Put your logo at: assets/logo.png');
    process.exit(1);
  }

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  await sharp(input).resize(16, 16).png().toFile(path.join(outputDir, 'favicon-16x16.png'));
  await sharp(input).resize(32, 32).png().toFile(path.join(outputDir, 'favicon-32x32.png'));
  await sharp(input).resize(180, 180).png().toFile(path.join(outputDir, 'apple-touch-icon.png'));
  await sharp(input).resize(192, 192).png().toFile(path.join(outputDir, 'android-chrome-192x192.png'));
  await sharp(input).resize(512, 512).png().toFile(path.join(outputDir, 'android-chrome-512x512.png'));

  console.log('✅ Favicons generated in /public');
}

generate().catch((e) => {
  console.error('❌ Error generating favicons:', e);
  process.exit(1);
});
