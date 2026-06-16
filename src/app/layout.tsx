import type { Metadata } from 'next';
import './globals.css';
import { GoogleAnalytics, CookieBanner } from '@/components/analytics';

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
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
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
    <html lang="fr" dir="ltr" suppressHydrationWarning className="font-sans">
      <head>
        {/* GA4 loaded only after user consent */}
        <GoogleAnalytics />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900">
        {children}
        {/* Cookie consent banner */}
        <CookieBanner />
      </body>
    </html>
  );
}
