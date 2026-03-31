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
        primary: '#88CC00',
        'primary-dim': 'rgba(136, 204, 0, 0.1)',
        dark: '#0A0E27',
        'dark-card': '#111730',
        light: '#F8F9FA',
        'light-card': '#FFFFFF',
        text: {
          primary: '#F8F9FA',
          secondary: '#A6ADBE',
          tertiary: '#6B7280',
        },
        border: {
          dark: '#1F2937',
          light: '#E5E7EB',
        },
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(136, 204, 0, 0.7)' },
          '50%': { boxShadow: '0 0 0 8px rgba(136, 204, 0, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backdropFilter: {
        none: 'none',
        blur: 'blur(10px)',
      },
      borderRadius: {
        lg: '16px',
        xl: '20px',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
