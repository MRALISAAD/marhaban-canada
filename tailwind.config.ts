import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        arctic: '#F9FAFB',
        linen: '#F7F6F5',
        energyRed: '#E11D48',
        marhaban: {
          ink: '#243126',
          leaf: '#61735A',
          mint: '#E8EFE3',
          cream: '#FBF7EF',
          clay: '#B66A4A',
          rose: '#F5DFD7',
          gold: '#D5A84F',
        },
      },
      borderRadius: {
        premium: '1.5rem',
        '3xl': '1.75rem',
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        heading: ['Geist', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 18px 50px rgba(15, 23, 42, 0.05)',
        'premium-card': '0 20px 45px rgba(15, 23, 42, 0.08)',
        'hover-card': '0 30px 90px rgba(15, 23, 42, 0.12)',
        warm: '0 24px 70px rgba(70, 55, 38, 0.10)',
        'warm-sm': '0 12px 32px rgba(70, 55, 38, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
