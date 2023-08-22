const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '100%',
        md: '100%',
        lg: '1024px',
        xl: '1280px',
      },
      extend: {
        colors: {
          pending: '#F59E0B',
          inProgress: '#10B981',
          enRoute: '#3B82F6',
          delivered: '#34D399',
        },
      },
    },

    extend: {
      fontFamily: {
        roboto: ['"Roboto"', 'sans-serif', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: '#1387F0',
          50: '#C0DFFB',
          100: '#ACD5FA',
          200: '#86C2F7',
          300: '#60AEF5',
          400: '#399BF2',
          500: '#1387F0',
          600: '#0C6ABF',
          700: '#094D8A',
          800: '#052F55',
          900: '#021221',
        },
        accent: {
          DEFAULT: '#F94536',
          50: '#FEEAE8',
          100: '#FED8D4',
          200: '#FDB3AD',
          300: '#FB8E85',
          400: '#FA6A5E',
          500: '#F94536',
          600: '#F01907',
          700: '#B91306',
          800: '#830E04',
          900: '#4C0802',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms')({ strategy: 'class' }),
    require('tailwindcss-debug-screens'),
  ],
}
