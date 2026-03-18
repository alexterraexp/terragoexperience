import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './views/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D3A27',
        clay: '#f78d00',
        gold: '#f78d00',
        orange: '#f78d00',
        'beige-bg': '#FAF9F6',
        'background-light': '#FFFFFF',
        'background-dark': '#1A1F18',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.375rem',
        lg: '0.75rem',
        xl: '1.25rem',
        '2xl': '2.5rem',
        full: '9999px',
      },
      keyframes: {
        'marquee-terroir': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'marquee-terroir': 'marquee-terroir 40s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
