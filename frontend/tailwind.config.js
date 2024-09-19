import defaultTheme from "tailwindcss/defaultTheme";
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      screens: {
        xs: "0xp",
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: {
          25: "#FBFBFC",
          50: "#F7F8FA",
          100: "#F7F8FA",
          200: "#E6E7EB",
          300: "#DEDFE5",
          400: "#D7D8DF",
          500: "#CBCDD5",
          600: "#B7B9C5",
          700: "#8A8C97",
          800: "#7F818B",
          900: "#60626B",
          950: "#1E1F24",
          975: "#121212",
        },
        orange: {
          25: "#FDFBFA",
          50: "#FFF4F1",
          100: "#FFE9DF",
          200: "#FFD5C3",
          300: "#FFC7B0",
          400: "#FFB69B",
          500: "#FCA487",
          600: "#F28B69",
          700: "#F25511",
          800: "#E44700",
          900: "#D53E00",
          950: "#5A2B1B",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
