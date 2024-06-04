/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlack: "#000000", // Custom black color
        customBlue: "#91caff", // Custom blue color
      },
    },
  },
  plugins: [],
};
