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
      },
    },
  },
  plugins: [],
};

export default config;
