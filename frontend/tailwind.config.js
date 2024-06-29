/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlack: "#000000", // Custom black color
        customBlue: "#041e49b3", // Custom blue color
        borderRadius: {
          "custom-50": "50px",
        },
      },
    },
  },
  plugins: [],
};
