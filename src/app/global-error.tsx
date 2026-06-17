'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <html lang="fr">
      <body>
        <main style={{ margin: '0 auto', maxWidth: '40rem', padding: '4rem 1.5rem', fontFamily: 'sans-serif' }}>
          <h1>Une erreur est survenue.</h1>
          <p>Veuillez recharger la page ou réessayer plus tard.</p>
        </main>
      </body>
    </html>
  );
}
