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
        DarkGray: "#111827",
        LightGray: "#C0C6CE",
        Gray: "#9ca3af",
        CGBlue: "#04829E",
        LightBlue: "#bae6fd",
        Blue: "#38bdf8",
        Indigo: "#2C415A",
        FloralWhite: "#FBF8F2"
      },
      fontFamily: {
        greycliff: ["GreyCliff CF", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
