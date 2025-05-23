/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Pretendard"', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        black: {
          300: '#353542',
          400: '#252530',
          500: '#1C1C22',
        },
        main: {
          blue: '#5097FA',
          indigo: '#5363FF',
        },
        gray: {
          50: '#F1F1F5',
          100: '#9FA6B2',
          200: '#6E6E82',
        },
        yellow: '#FFC83C',
        green: '#05D58B',
        pink: '#FF2F9F',
        red: '#FF0000',
      },
    },
  },
  plugins: [],
};
