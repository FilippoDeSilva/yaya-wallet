/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./types/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0ea5e9',
          light: '#38bdf8',
          dark: '#0369a1',
        },
        background: {
          light: '#f8fafc',
          dark: '#0f172a',
        },
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        md: '0 4px 12px 0 rgba(0,0,0,0.08)',
        lg: '0 8px 24px 0 rgba(0,0,0,0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [
    import('@tailwindcss/forms'),
    import('@tailwindcss/typography'),
  ],
}