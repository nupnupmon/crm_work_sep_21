/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#0f0f23',
          800: '#1a1a2e',
          700: '#16213e',
          600: '#0f3460',
        },
        purple: {
          400: '#a855f7',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
        yellow: {
          400: '#facc15',
          500: '#eab308',
        },
        pink: {
          400: '#f472b6',
          500: '#ec4899',
        },
        green: {
          400: '#4ade80',
          500: '#22c55e',
        },
        red: {
          400: '#f87171',
          500: '#ef4444',
        },
      },
      fontFamily: {
        script: ['Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [],
}
