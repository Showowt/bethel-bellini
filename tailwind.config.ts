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
        bb: {
          void: "#0A0907",
          earth: "#121010",
          bark: "#1E1A15",
          wood: "#2C261E",
          drift: "#3D3426",
          stone: "#584D3E",
          sand: "#C4A878",
          sandMid: "#A8926C",
          sandLight: "#D9C9A8",
          cream: "#F0E6D4",
          white: "#FAF6EF",
          ocean: "#2A6B7C",
          coral: "#C4654A",
          palm: "#3A5E3A",
          sunset: "#D4923A",
        },
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        breathe: "breathe 2.5s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
        "slide-up": "slide-up 0.3s ease-out",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(100%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
