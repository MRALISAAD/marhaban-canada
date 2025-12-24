import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';

/**
 * Root layout: must include <html> and <body>.
 * Per-locale attributes (lang/dir) are set by HtmlAttributes component in the locale layout.
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://marhabancanada.ca'),
  title: {
    default: 'Marhaban Canada',
    template: '%s | Marhaban Canada',
  },
  description:
    'Service d\'accompagnement pour nouveaux arrivants au Canada : démarches, logement, banque, téléphone, prévention des arnaques.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    siteName: 'Marhaban Canada',
    title: 'Marhaban Canada',
    description:
      'Service d\'accompagnement pour nouveaux arrivants au Canada : démarches, logement, banque, téléphone, prévention des arnaques.',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Marhaban Canada',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Root layout provides html/body structure
  // Locale-specific lang/dir are set by locale layout via script injection
  return (
    <html lang="fr" dir="ltr" suppressHydrationWarning>
      <head>
        {/* Plausible official snippet (one script) */}
        {process.env.NODE_ENV === 'production' && (
          <Script src="https://plausible.io/js/pa-UCvIRsD-h_4rGEzp47UXW.js" strategy="afterInteractive" />
        )}
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}

