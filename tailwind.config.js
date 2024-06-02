/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
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
      transform: {
        'translate-x-42': 'translateX(10.5rem)',
      },
    },
  },
  plugins: [],
};
