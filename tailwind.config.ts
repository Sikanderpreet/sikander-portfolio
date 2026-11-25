import type { Config } from "tailwindcss";

// Brand: Learn Beyond Code flat look. Paper, ink outlines, hard offset shadows,
// tomato + sunflower accents. No gradients, no glow, no blur.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1180px" },
    },
    extend: {
      colors: {
        ink: "#16141a",
        paper: "#f3eee4",
        cream: "#fffaf0",
        tomato: "#ff5b35",
        sunflower: "#ffc83d",
        sand: "#e7e1d5",
        grey: "#6b6457",
      },
      boxShadow: {
        hard: "6px 6px 0 #16141a",
        "hard-sm": "3px 3px 0 #16141a",
        "hard-lg": "10px 10px 0 #16141a",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
