import { NextRequest, NextResponse } from 'next/server';

// Arabic PDF generation using HTML → PDF approach
// This route generates a proper RTL PDF with Arabic font support

type CheckedItems = Record<string, boolean>;

type RequestBody = {
  locale: 'ar' | 'fr' | 'en';
  checked: CheckedItems;
};

// Generate HTML template for Arabic PDF
function generateArabicPdfHtml(
  phases: { title: string; items: { id: string; title: string }[] }[],
  checked: CheckedItems,
  date: string
): string {
  // Collect completed items grouped by phase
  const completedByPhase: Record<string, string[]> = {};
  
  phases.forEach((phase) => {
    const completedItems = phase.items
      .filter((item) => checked[item.id])
      .map((item) => item.title);
    
    if (completedItems.length > 0) {
      completedByPhase[phase.title] = completedItems;
    }
  });

  const phaseHtml = Object.entries(completedByPhase)
    .map(
      ([phaseTitle, items]) => `
      <div class="phase">
        <h2>${phaseTitle}</h2>
        <ul>
          ${items.map((item) => `<li>✓ ${item}</li>`).join('')}
        </ul>
      </div>
    `
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>قائمة التحقق - مرحبا كندا</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Noto Naskh Arabic', 'Arial', sans-serif;
      direction: rtl;
      text-align: right;
      padding: 40px;
      color: #1e293b;
      line-height: 1.8;
      font-size: 14px;
    }
    
    .header {
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    
    h1 {
      font-size: 24px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 10px;
    }
    
    .meta {
      font-size: 12px;
      color: #64748b;
    }
    
    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #334155;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .phase {
      margin-bottom: 25px;
    }
    
    .phase h2 {
      font-size: 14px;
      font-weight: 600;
      color: #475569;
      margin-bottom: 10px;
      background: #f8fafc;
      padding: 8px 12px;
      border-radius: 6px;
    }
    
    .phase ul {
      list-style: none;
      padding-right: 15px;
    }
    
    .phase li {
      padding: 6px 0;
      color: #334155;
      border-bottom: 1px dotted #e2e8f0;
    }
    
    .phase li:last-child {
      border-bottom: none;
    }
    
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      font-size: 11px;
      color: #94a3b8;
      text-align: center;
    }
    
    .empty-message {
      text-align: center;
      padding: 40px;
      color: #64748b;
      font-size: 16px;
    }
    
    @media print {
      body {
        padding: 20px;
      }
      
      .phase {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>قائمة التحقق — الخطوات الأساسية</h1>
    <p class="meta">اللغة: العربية | التاريخ: ${date}</p>
  </div>
  
  <div class="content">
    <p class="section-title">الخطوات المكتملة</p>
    ${
      Object.keys(completedByPhase).length > 0
        ? phaseHtml
        : '<p class="empty-message">لم تكتمل أي خطوات بعد.</p>'
    }
  </div>
  
  <div class="footer">
    <p>مرحبا كندا — دليل الوافدين الجدد</p>
    <p>marhabancanada.ca</p>
  </div>
</body>
</html>
`;
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const { locale, checked } = body;

    // Only handle Arabic PDFs via this route
    if (locale !== 'ar') {
      return NextResponse.json(
        { error: 'This endpoint is only for Arabic PDF generation' },
        { status: 400 }
      );
    }

    // Import checklist dictionary
    const { getChecklistDictionary } = await import('@/content/checklistOffline');
    const dictionary = getChecklistDictionary('ar');

    // Check if any items are checked
    const hasCheckedItems = dictionary.phases.some((phase) =>
      phase.items.some((item) => checked[item.id])
    );

    if (!hasCheckedItems) {
      return NextResponse.json(
        { error: 'لم تكتمل أي خطوات حتى الآن. يرجى تحديد خطوة واحدة على الأقل قبل تحميل PDF.' },
        { status: 400 }
      );
    }

    // Generate date in Arabic locale
    const date = new Date().toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Generate HTML
    const html = generateArabicPdfHtml(dictionary.phases, checked, date);

    // Use Playwright to generate PDF
    // Note: In production, you might want to use a dedicated PDF service
    // For now, we'll return the HTML with instructions to print
    
    // Try to use Playwright if available
    try {
      const { chromium } = await import('playwright');
      
      const browser = await chromium.launch({
        headless: true,
      });
      
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle' });
      
      // Wait for fonts to load
      await page.waitForTimeout(1000);
      
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '15mm',
          bottom: '20mm',
          left: '15mm',
        },
      });
      
      await browser.close();

      // Return PDF (convert Buffer to Uint8Array for NextResponse compatibility)
      return new NextResponse(new Uint8Array(pdfBuffer), {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="checklist-marhaban-ar-${new Date().toISOString().split('T')[0]}.pdf"`,
        },
      });
    } catch (playwrightError) {
      // Playwright not available in production - return HTML for browser print
      console.warn('Playwright not available, returning HTML:', playwrightError);
      
      return new NextResponse(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'X-PDF-Fallback': 'html-print',
        },
      });
    }
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء PDF. يرجى المحاولة مرة أخرى.' },
      { status: 500 }
    );
  }
}

