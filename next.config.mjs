import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const locales = ['fr', 'en', 'ar'];

function localizedRedirects(sourcePath, destinationPath) {
  return locales.map((locale) => ({
    source: `/${locale}${sourcePath}`,
    destination: `/${locale}${destinationPath}`,
    permanent: true,
  }));
}

const nextConfig = {
  turbopack: {
    root: __dirname,
  },

  async redirects() {
    return [
      // ── Anciens alias → routes canoniques (301 permanent) ────────────────
      ...localizedRedirects('/about', '/a-propos'),
      ...localizedRedirects('/book', '/reserver'),
      ...localizedRedirects('/reserver-un-appel', '/reserver'),
      ...localizedRedirects('/orientation', '/accompagnement'),
      ...localizedRedirects('/arnaques', '/services/anti-arnaque'),
      ...localizedRedirects('/anti-arnaque', '/services/anti-arnaque'),
      ...localizedRedirects('/resources', '/ressources'),
      ...localizedRedirects('/checklist', '/ressources'),
      // ── Routes absorbées ─────────────────────────────────────────────────
      ...localizedRedirects('/services', '/accompagnement'),
      ...localizedRedirects('/commencer', '/ressources'),
    ];
  },
};

export default nextConfig;
