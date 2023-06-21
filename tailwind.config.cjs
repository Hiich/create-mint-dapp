/** @type {import('tailwindcss').Config} */

// import { websiteConfig } from 'config/config';

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        background: "url('/images/background.png')",
      },
    },
  },
  plugins: [],
};

module.exports = config;
