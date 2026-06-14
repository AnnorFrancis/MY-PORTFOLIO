/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#C9A24B',
        'primary-light': '#E8D6A6',
        'primary-dark': '#9A7B2E',
        'primary-dim': 'rgba(201, 162, 75, 0.10)',
        dark: '#0E0F12',
        'dark-card': '#16181D',
        graphite: '#22252B',
        light: '#F7F5EF',
        'light-card': '#FFFFFF',
        signal: '#2F6BFF',
        text: {
          primary: '#F5F1E6',
          secondary: '#B7B2A6',
          tertiary: '#7C7E85',
        },
        border: {
          dark: '#2E323A',
          light: '#E5E1D6',
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        syne: ['"Playfair Display"', 'Georgia', 'serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        dm: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 6s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 162, 75, 0.7)' },
          '50%': { boxShadow: '0 0 0 8px rgba(201, 162, 75, 0)' },
        },
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer: { '0%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' }, '100%': { backgroundPosition: '0% 50%' } },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(120deg, #F1E2B4 0%, #C9A24B 45%, #9A7B2E 100%)',
      },
      backdropFilter: { none: 'none', blur: 'blur(10px)' },
      borderRadius: { lg: '16px', xl: '20px' },
    },
  },
  plugins: [],
}
