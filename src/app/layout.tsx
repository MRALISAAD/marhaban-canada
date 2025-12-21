import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProvinceProvider } from '@/components/ProvinceProvider';
import { LanguageProvider } from '@/components/LanguageProvider';

export const metadata: Metadata = {
  title: 'Marhaban Canada',
  description:
    'Service d’accompagnement pour nouveaux arrivants au Canada : démarches, logement, banque, téléphone, prévention des arnaques.',
  openGraph: {
    title: 'Marhaban Canada',
    description:
      'Service d’accompagnement pour nouveaux arrivants au Canada : démarches, logement, banque, téléphone, prévention des arnaques.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <LanguageProvider>
          <ProvinceProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ProvinceProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
