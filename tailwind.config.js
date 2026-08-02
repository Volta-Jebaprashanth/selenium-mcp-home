/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Primary vibrant orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        dark: {
          bg: '#09090b',
          card: '#121215',
          border: '#27272a',
          muted: '#a1a1aa'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle, rgba(249, 115, 22, 0.15) 1px, transparent 1px)",
        'grid-pattern-dark': "radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
      },
      boxShadow: {
        'glow-orange': '0 0 40px -10px rgba(249, 115, 22, 0.3)',
        'glow-orange-sm': '0 0 20px -5px rgba(249, 115, 22, 0.25)',
      }
    },
  },
  plugins: [],
}
