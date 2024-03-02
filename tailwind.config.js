/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        '[card-img-w]': '270px',
        '[card-img-sm-w]': '135px',
      },
      height: {
        '[card-img-h]': '386px',
        '[card-img-sm-h]': '193px',
      },
    },
  },
  plugins: [],
};
