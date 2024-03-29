/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./*.html"],
  theme: {
    extend: {},
    screens: {
      ...defaultTheme.screens,
      sm: "500px",
    },
  },
  plugins: [],
};
