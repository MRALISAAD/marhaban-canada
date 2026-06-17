import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  turbopack: {
    root: __dirname,
  },

  async redirects() {
    return [
      // ── Anciens alias → routes canoniques (301 permanent) ────────────────
      { source: '/:locale/about',           destination: '/:locale/a-propos',    permanent: true },
      { source: '/:locale/book',            destination: '/:locale/reserver',    permanent: true },
      { source: '/:locale/reserver-un-appel', destination: '/:locale/reserver', permanent: true },
      { source: '/:locale/orientation',     destination: '/:locale/accompagnement', permanent: true },
      { source: '/:locale/arnaques',        destination: '/:locale/services/anti-arnaque', permanent: true },
      { source: '/:locale/anti-arnaque',   destination: '/:locale/services/anti-arnaque', permanent: true },
      { source: '/:locale/resources',       destination: '/:locale/ressources',  permanent: true },
      { source: '/:locale/checklist',       destination: '/:locale/ressources',  permanent: true },
      // ── Routes absorbées ─────────────────────────────────────────────────
      { source: '/:locale/services',        destination: '/:locale/accompagnement', permanent: true },
      { source: '/:locale/commencer',       destination: '/:locale/ressources',  permanent: true },
    ];
  },
};

export default nextConfig;
