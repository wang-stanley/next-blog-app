/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        '99': '99',
      },
      colors: {
        'blue-indigo': '#3B49DF',
      }
    },
  },
  plugins: [],
}