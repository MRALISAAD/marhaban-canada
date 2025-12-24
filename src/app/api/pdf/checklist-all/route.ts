import { NextResponse } from 'next/server';
import { jsPDF } from 'jspdf';
import { checklistDictionary, type ChecklistDictionary, type ChecklistLocale } from '@/content/checklistOffline';

const ORDER: ChecklistLocale[] = ['fr', 'en', 'ar'];
const PAGE_WIDTH = 210; // A4 mm width for positioning (jsPDF default)
const LEFT = 20;
const RIGHT = PAGE_WIDTH - 20;
const LINE_HEIGHT = 8;

function renderLocale(doc: jsPDF, dict: ChecklistDictionary, isFirstPage: boolean) {
  if (!isFirstPage) doc.addPage();

  const { labels, phases, locale, dir } = dict;
  const rtl = dir === 'rtl';
  const align: 'left' | 'right' = rtl ? 'right' : 'left';

  let y = 20;

  doc.setFontSize(16);
  doc.text(labels.title, rtl ? RIGHT : LEFT, y, { align });
  y += LINE_HEIGHT;
  doc.setFontSize(11);
  doc.text(labels.subtitle, rtl ? RIGHT : LEFT, y, { align, maxWidth: PAGE_WIDTH - 40 });
  y += LINE_HEIGHT * 1.5;

  phases.forEach((phase) => {
    doc.setFontSize(13);
    doc.text(`${phase.badge} — ${phase.title}`, rtl ? RIGHT : LEFT, y, { align });
    y += LINE_HEIGHT;
    doc.setFontSize(10);
    doc.text(phase.subtitle, rtl ? RIGHT : LEFT, y, { align, maxWidth: PAGE_WIDTH - 40 });
    y += LINE_HEIGHT;

    phase.items.forEach((item) => {
      const boxY = y - 3;
      if (rtl) {
        doc.rect(RIGHT - 6, boxY, 4, 4);
        doc.text(item.title, RIGHT - 10, y, { align: 'right', maxWidth: PAGE_WIDTH - 40 });
      } else {
        doc.rect(LEFT, boxY, 4, 4);
        doc.text(item.title, LEFT + 8, y, { align: 'left', maxWidth: PAGE_WIDTH - 40 });
      }
      y += LINE_HEIGHT;
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    y += LINE_HEIGHT * 0.5;
  });

  // Footer
  doc.setFontSize(9);
  doc.text(`Locale: ${locale} · marhabancanada.ca`, rtl ? RIGHT : LEFT, 290, { align });
}

export async function GET() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  ORDER.forEach((locale, idx) => {
    const dict = checklistDictionary[locale];
    renderLocale(doc, dict, idx === 0);
  });

  const pdfBuffer = doc.output('arraybuffer');
  return new NextResponse(Buffer.from(pdfBuffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="checklist.pdf"',
    },
  });
}

