import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    colors: {
      golden: "#936b06",
      white: "#ffffff",
      "ghost-white": "#F8F8FC",
      "light-grey": "#D9D9D9",
      azure: "#007EFC",
      verdansk: "#132F25",
      "people-eater": "#9847FF",
      paleruby: "#EB5A79",
      tangy: "#FFAA47",
      vulcan: "#10141D",
      "vulcan-85": "#2C313F",
      independence: "#484F61",
      mischka: "#CED2DC",
      "pale-sky": "#656C81",
      blue: {
        500: "#3B82F6",
        600: "#2563EB",
      },
      gray: {
        200: "#E5E7EB",
        800: "#1F2937",
      },
      green: {
        500: "#22C55E",
        600: "#16A34A",
      },
      currentColor: "currentColor",
      transparent: "transparent",
      inherit: "inherit",
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "inherit",
            h1: { color: "inherit" },
            h2: { color: "inherit" },
            h3: { color: "inherit" },
            h4: { color: "inherit" },
            h5: { color: "inherit" },
            h6: { color: "inherit" },
            ".dark strong": { color: "var(--ghost-white)" },
          },
        },
      },
    },
  },
  safelist: [
    "w-screen",
    "w-full",
    "w-auto",
    "w-1/2",
    "w-1/3",
    "basis-full",
    "basis-auto",
    "basis-1/2",
    "basis-1/3",
    "t-center",
    "flex-row",
    "flex-col",
    "flex-row-reverse",
    "flex-col-reverse",
    "opti-content-area",
    "opti-content-area-item",
  ],
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
    function ({ addBase, theme }: { addBase: any; theme: any }) {
      function extractColorVars(
        colorObj: Record<string, string>,
        colorGroup = "",
      ): Record<string, string> {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];
          const cssVariable =
            colorKey === "DEFAULT"
              ? `-${colorGroup}`
              : `-${colorGroup}-${colorKey}`;

          const newVars =
            typeof value === "string"
              ? { [cssVariable]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ":root": extractColorVars(theme("colors")),
      });
    },
  ],
};
export default config;
