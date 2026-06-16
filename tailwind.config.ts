import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        cream: '#FAF7F2',
        offwhite: '#FFFDF9',
        forest: '#1F3D2E',
        sage: '#7A9082',
        sand: '#E8DCC4',
        warm: '#D97847',
        ink: '#1A1A1A',

        marhaban: {
          // ── Backgrounds ──────────────────────────────
          cream:      "#F7F1E6",   // page background (warmest)
          warm:       "#FBF6ED",   // page background (lightest)
          offwhite:   "#FFFDF9",   // card / elevated surface
          mint:       "#E8EFE3",   // subtle tinted surface
          sageSoft:   "#E7EEDB",   // soft green wash

          // ── Brand greens (primary) ───────────────────
          obsidian:   "#0F1B14",   // deepest — rarely used
          forestDark: "#082A24",   // primary button bg
          forest:     "#123D35",   // hover / dark accents
          leaf:       "#61735A",   // border, icon, link accent
          sage:       "#C9D8B6",   // decorative / soft element

          // ── Warm accent (secondary) ──────────────────
          clay:       "#B86B3F",   // scam alert icon, accent CTA
          orange:     "#D97732",   // clay hover state
          sand:       "#E9B66F",   // decorative warm highlight
          gold:       "#D5A84F",   // eyebrow on dark backgrounds

          // ── Ink / text ───────────────────────────────
          ink:        "#1F2D2B",   // primary text (dark card bg too)
          muted:      "#5E6B66",   // secondary / caption text

          // ── Alert (scam / warning contexts) ──────────
          alertBg:    "#FFF4E3",   // amber-tinted bg
          alertBorder:"#F5C77E",   // amber border
          alertText:  "#7A4A0E",   // readable amber-dark text

          // ── Unused / reserved ────────────────────────
          night:      "#24224F",   // deep navy (not used on site)
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
        premium: "2rem",
      },
      boxShadow: {
        // Semantic shadows — always tinted green-warm, never grey
        "warm-xs":     "0 4px 14px rgba(70, 55, 38, 0.06)",
        "warm-sm":     "0 12px 32px rgba(70, 55, 38, 0.08)",
        "warm":        "0 24px 70px rgba(70, 55, 38, 0.10)",
        "warm-lg":     "0 40px 90px rgba(70, 55, 38, 0.13)",
        "premium-card":"0 28px 80px rgba(31, 45, 43, 0.18)",
        "soft":        "0 18px 60px rgba(18, 61, 53, 0.12)",
        "card":        "0 12px 30px rgba(31, 45, 43, 0.08)",
        "glow":        "0 0 0 1px rgba(18, 61, 53, 0.08), 0 20px 60px rgba(18, 61, 53, 0.16)",
        // Focus ring (used by focus-visible utilities)
        "focus-ring":  "0 0 0 3px rgba(97, 115, 90, 0.40)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "soft-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.72" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "soft-pulse": "soft-pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
} satisfies Config;

export default config;
