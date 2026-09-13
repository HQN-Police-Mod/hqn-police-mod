import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ["var(--font-cairo)", "Cairo", "sans-serif"],
        sans: ["var(--font-cairo)", "Cairo", "sans-serif"],
      },
      colors: {
        gold: {
          primary: "#C9A84C",
          light:   "#E8C96A",
          dark:    "#A07832",
          muted:   "#8A6820",
        },
        hqn: {
          black:    "#0A0A0B",
          base:     "#111114",
          surface:  "#1A1A1F",
          elevated: "#222228",
          border:   "#2A2A32",
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
