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
        background: "#f7d6a8",
        foreground: "#edc488",
        textColor: "#92400e",
        secondTextColor: "#c67839",
        cardBorderColor: "#fcedd1"
      },
    },
  },
  plugins: [],
};
export default config;
