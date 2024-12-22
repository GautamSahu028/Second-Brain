/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#eeeeef",
          200: "#e6e9ed",
          300: "#95989c",
        },
        purple: {
          300: "#e0e7fe",
          500: "#3e38a7",
          600: "#5046e4",
          800: "#e0e7fe",
          900: "#5046e4",
        },
      },
    },
  },
  plugins: [],
};