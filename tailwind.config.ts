import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#0a0a0b",
          card: "rgba(255, 255, 255, 0.03)",
          hover: "rgba(255, 255, 255, 0.06)",
          border: "rgba(255, 255, 255, 0.08)",
        },
        brand: {
          cyan: "#06b6d4",
          emerald: "#059669",
          amber: "#d97706",
          sky: "#0284c7",
          purple: "#9333ea",
          teal: "#14b8a6",
        },
        funnel: {
          topo: "#06b6d4",
          meio: "#f59e0b",
          fundo: "#10b981",
        },
      },
      borderRadius: {
        card: "24px",
        "card-sm": "16px",
        pill: "24px",
        "pill-sm": "8px",
      },
      backdropBlur: {
        glass: "24px",
      },
      fontFamily: {
        sans: ["Satoshi", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.12)",
        glow: "0 0 20px rgba(6, 182, 212, 0.15)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
