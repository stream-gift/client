import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "tealbox": "linear-gradient(100deg, rgba(38, 205, 213, 0.25) 1.73%, rgba(20, 107, 111, 0.25) 100%)",
        "blueglass": "linear-gradient(100deg, rgba(38, 205, 213, 0.03) 1.73%, rgba(0, 0, 0, 0.03) 100%)"
      },
      colors: {
        "gr": "#ABB2BF",
        "ld": "#282C33",
        "blue": "#4DA2FF",
        "teal": "#26CDD5",
        "tealtext": "#25C8CF"
      }
    },
    screens: {
      'sm': '500px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1400px',
    }
  },
  plugins: [],
};
export default config;
