/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        forrest: "url('/images/forrest.png')",
      },
      fontFamily: {
        pixel: ["VT323", "sans-serif"],
      },
    },
  },
  plugins: [],
};

module.exports = config;
