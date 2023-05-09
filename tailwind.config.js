import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        aggreen: colors.green['600'],
        gbblue: '#008CFF',
        gbgreen: '#0091A040',
        gbgrey:'#808080',
        gblightblue: '#0091D7',
        warningRed: '#dc2626'
      }
    },
  },
  plugins: [],
}



