'use client';

import { useCallback, useState } from 'react';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import { useLanguage } from '@/components/LanguageProvider';
import { useChecklistStorage } from '@/hooks/useChecklistStorage';
import { getChecklistDictionary } from '@/content/checklistOffline';
import { FEATURE_FLAGS } from '@/lib/featureFlags';
import { Button } from '@/components/ui/Button';
import { AccessibleAlert } from '@/components/ui/AccessibleAlert';

type CompletedItem = {
  phase: string;
  title: string;
};

// Normalize text to ASCII-safe characters for jsPDF compatibility (FR/EN only)
function normalizeForPdf(text: string): string {
  return text
    // French accents
    .replace(/[àâä]/g, 'a')
    .replace(/[ÀÂÄÃ]/g, 'A')
    .replace(/[éèêë]/g, 'e')
    .replace(/[ÉÈÊË]/g, 'E')
    .replace(/[îï]/g, 'i')
    .replace(/[ÎÏ]/g, 'I')
    .replace(/[ôö]/g, 'o')
    .replace(/[ÔÖ]/g, 'O')
    .replace(/[ùûü]/g, 'u')
    .replace(/[ÙÛÜ]/g, 'U')
    .replace(/[ÿ]/g, 'y')
    .replace(/[Ÿ]/g, 'Y')
    .replace(/[ç]/g, 'c')
    .replace(/[Ç]/g, 'C')
    .replace(/[œ]/g, 'oe')
    .replace(/[Œ]/g, 'OE')
    .replace(/[æ]/g, 'ae')
    .replace(/[Æ]/g, 'AE')
    // Special characters
    .replace(/['']/g, "'")
    .replace(/[""]/g, '"')
    .replace(/[—–]/g, '-')
    .replace(/[…]/g, '...')
    .replace(/[•·]/g, '-')
    .replace(/[✓✔]/g, '[x]');
}

export function SmartPDFExport() {
  const { locale: routeLocale } = useLanguage();
  const dictionary = getChecklistDictionary(routeLocale);
  const storageKey = `mc_checklist_offline_${routeLocale}_v1`;
  const { checked } = useChecklistStorage(storageKey);
  const [isLoading, setIsLoading] = useState(false);
  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
  }>({ isOpen: false, title: '', message: '' });

  // Generate PDF for Arabic using server-side HTML → PDF
  const handleArabicExport = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/pdf/checklist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locale: 'ar',
          checked,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'PDF generation failed');
      }

      const contentType = response.headers.get('Content-Type');
      
      if (contentType?.includes('application/pdf')) {
        // Direct PDF download
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `checklist-marhaban-ar-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else if (contentType?.includes('text/html')) {
        // Fallback: Open HTML in new tab for browser print
        const html = await response.text();
        const blob = new Blob([html], { type: 'text/html; charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const printWindow = window.open(url, '_blank');
        if (printWindow) {
          printWindow.onload = () => {
            setTimeout(() => {
              printWindow.print();
            }, 1000);
          };
        }
        // Clean up after a delay
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      }
    } catch (error) {
      console.error('Arabic PDF export error:', error);
      setAlertState({
        isOpen: true,
        title: 'خطأ في الإنشاء',
        message: error instanceof Error ? error.message : 'حدث خطأ أثناء إنشاء PDF. يرجى المحاولة مرة أخرى.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [checked]);

  // Generate PDF for FR/EN using jsPDF (client-side)
  const handleFrEnExport = useCallback(() => {
    try {
      // Collect only checked items
      const completedItems: CompletedItem[] = [];

      dictionary.phases.forEach((phase) => {
        phase.items.forEach((item) => {
          if (checked[item.id]) {
            completedItems.push({
              phase: phase.title,
              title: item.title,
            });
          }
        });
      });

      // Graceful failure: show user-friendly message if no items checked
      if (completedItems.length === 0) {
        const emptyTitle = routeLocale === 'fr' ? 'Aucune étape complétée' : 'No items completed';
        const emptyMessage =
          routeLocale === 'fr'
            ? 'Aucune étape complétée pour le moment.\n\nVeuillez cocher au moins une étape avant de télécharger le PDF.'
            : 'No items completed yet.\n\nPlease check at least one item before downloading the PDF.';
        setAlertState({ isOpen: true, title: emptyTitle, message: emptyMessage });
        return;
      }

      // Create PDF with jsPDF
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;

      // Colors
      const headingColor: [number, number, number] = [30, 41, 59];
      const textColor: [number, number, number] = [51, 65, 85];
      const accentColor: [number, number, number] = [71, 85, 105];
      const footerColor: [number, number, number] = [148, 163, 184];

      // Footer helper
      const addFooter = (pageNum: number, totalPages: number) => {
        doc.setFontSize(8);
        doc.setTextColor(...footerColor);
        const footerLabel = normalizeForPdf(dictionary.labels.subtitle);
        const footerText = `${footerLabel} - Page ${pageNum}/${totalPages}`;
        doc.text(footerText, margin, pageHeight - 10);
      };

      let yPos = margin + 5;

      // Title
      doc.setFontSize(18);
      doc.setTextColor(...headingColor);
      doc.text(normalizeForPdf(dictionary.labels.title), margin, yPos);
      yPos += 10;

      // Metadata
      doc.setFontSize(9);
      doc.setTextColor(...textColor);
      const langLabel = routeLocale === 'fr' ? 'Langue: Francais' : 'Language: English';
      const dateStr = new Date().toLocaleDateString(routeLocale === 'fr' ? 'fr-CA' : 'en-CA');
      doc.text(langLabel, margin, yPos);
      yPos += 5;
      doc.text(`Date: ${dateStr}`, margin, yPos);
      yPos += 8;

      // Section title
      doc.setFontSize(13);
      doc.setTextColor(...headingColor);
      const sectionTitle = routeLocale === 'fr' ? 'ETAPES COMPLETEES' : 'COMPLETED ITEMS';
      doc.text(sectionTitle, margin, yPos);
      yPos += 10;

      // Group by phase
      const byPhase = completedItems.reduce(
        (acc, item) => {
          if (!acc[item.phase]) acc[item.phase] = [];
          acc[item.phase].push(item.title);
          return acc;
        },
        {} as Record<string, string[]>
      );

      // Render phases
      Object.entries(byPhase).forEach(([phase, titles]) => {
        if (yPos > pageHeight - 50) {
          addFooter(doc.getCurrentPageInfo().pageNumber, doc.getNumberOfPages());
          doc.addPage();
          yPos = margin;
        }

        doc.setFontSize(11);
        doc.setTextColor(...accentColor);
        doc.text(normalizeForPdf(phase), margin, yPos);
        yPos += 7;

        doc.setFontSize(10);
        doc.setTextColor(...textColor);
        titles.forEach((itemTitle) => {
          if (yPos > pageHeight - 25) {
            addFooter(doc.getCurrentPageInfo().pageNumber, doc.getNumberOfPages());
            doc.addPage();
            yPos = margin;
          }

          const itemText = `[x] ${normalizeForPdf(itemTitle)}`;
          const textLines = doc.splitTextToSize(itemText, maxWidth - 15);

          textLines.forEach((line: string) => {
            if (yPos > pageHeight - 25) {
              addFooter(doc.getCurrentPageInfo().pageNumber, doc.getNumberOfPages());
              doc.addPage();
              yPos = margin;
            }
            doc.text(line, margin + 8, yPos);
            yPos += 5.5;
          });
          yPos += 3;
        });
        yPos += 5;
      });

      // Final footer
      addFooter(doc.getCurrentPageInfo().pageNumber, doc.getNumberOfPages());

      // Save
      const filename = `checklist-marhaban-${routeLocale}-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(filename);
    } catch (error) {
      console.error('PDF export error:', error);
      const errorTitle = routeLocale === 'fr' ? 'Erreur de génération' : 'Generation error';
      const errorMessage =
        routeLocale === 'fr'
          ? 'Une erreur est survenue lors de la génération du PDF.\n\nVeuillez réessayer ou contacter le support si le problème persiste.'
          : 'An error occurred while generating the PDF.\n\nPlease try again or contact support if the problem persists.';
      setAlertState({ isOpen: true, title: errorTitle, message: errorMessage });
    }
  }, [dictionary, checked, routeLocale]);

  // Main export handler
  const handleExport = useCallback(() => {
    if (routeLocale === 'ar') {
      handleArabicExport();
    } else {
      handleFrEnExport();
    }
  }, [routeLocale, handleArabicExport, handleFrEnExport]);

  const labels = {
    fr: 'Télécharger PDF (étapes cochées)',
    en: 'Download PDF (checked items)',
    ar: 'تحميل PDF (الخطوات المكتملة)',
  };

  const loadingLabels = {
    fr: 'Génération...',
    en: 'Generating...',
    ar: 'جاري الإنشاء...',
  };

  const okLabels = {
    fr: 'OK',
    en: 'OK',
    ar: 'حسناً',
  };

  if (!FEATURE_FLAGS.ENABLE_PDF) {
    return null;
  }

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleExport}
        disabled={isLoading}
        className="inline-flex items-center gap-2"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        <span>{isLoading ? loadingLabels[routeLocale] || loadingLabels.fr : labels[routeLocale] || labels.fr}</span>
      </Button>

      <AccessibleAlert
        isOpen={alertState.isOpen}
        onClose={() => setAlertState({ isOpen: false, title: '', message: '' })}
        title={alertState.title}
        message={alertState.message}
        okLabel={okLabels[routeLocale] || okLabels.fr}
      />
    </>
  );
}
