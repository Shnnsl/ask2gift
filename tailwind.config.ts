import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFF9F2",
        ink: "#1F2937",
        blush: "#F9E7DF",
        coral: "#F57F6C",
        sand: "#F3E6D7",
        spruce: "#21493D",
        mist: "#EAF4EF"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(31, 41, 55, 0.12)"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
