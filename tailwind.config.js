/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "sidebar-bg": "#d0d0d0",
        "page-bg": "#f2f2f2",
        "logo-color": "#2e3661",
      },
      spacing: {
        "sidebar-width": "300px",
        "full-page-height": "100svh",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
