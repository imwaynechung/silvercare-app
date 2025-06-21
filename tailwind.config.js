/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#08449E',
          50: '#E6EEF8',
          100: '#CCE0F5',
          200: '#99C2EB',
          300: '#66A3E0',
          400: '#3385D6',
          500: '#08449E',
          600: '#073D8E',
          700: '#06367E',
          800: '#052F6E',
          900: '#04285E'
        }
      }
    },
  },
  plugins: [],
};