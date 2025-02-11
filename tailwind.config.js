/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "sidebar-bg": "#e0e0e0",
        "page-bg": "#f2f2f2",
        "logo-color": "#2e3661",
      },
      spacing: {
        "sidebar-width": "300px",
        "full-page-height": "100svh",
      },
    },
  },
  plugins: [require('tailwindcss-primeui')],
};
