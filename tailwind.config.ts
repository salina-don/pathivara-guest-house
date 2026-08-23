import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans:  ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50:  "#FEF8EC",
          100: "#FCEECB",
          200: "#F7D88C",
          300: "#EFBA48",
          400: "#E09820",
          500: "#C27A0E",
          600: "#9C5E09",
          700: "#784607",
          800: "#522F05",
          900: "#2E1A03",
        },
        mountain: {
          50:  "#EDF2EF",
          100: "#D0DDD5",
          200: "#9BBAAA",
          300: "#5C8F7C",
          400: "#2A6B58",
          500: "#174F3E",
          600: "#0E382C",
          700: "#092820",
          800: "#051C16",
          900: "#03100D",
        },
      },
      animation: {
        "fade-in":  "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.55s ease-out forwards",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
