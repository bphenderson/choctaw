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
      // Editorial re-skin neutrals
      cream: "#f4f2ed",
      slate: "#373a40",
      gold: "#a88d66",
      // Editorial re-skin: the former teal/navy brand family is collapsed into
      // the cream / slate / gold palette. Tokens keep their names so existing
      // utilities (text-azure, bg-verdansk, …) and on-* themes convert in place.
      pelorous: "#4a4e57", // was teal; now a mid-slate (dark-mode surface)
      golden: "#a88d66", // teal accent -> gold accent
      white: "#ffffff",
      "ghost-white": "#F8F8FC",
      "light-grey": "#D9D9D9",
      azure: "#373a40", // brand mid -> slate
      verdansk: "#2f3137", // brand dark -> dark slate
      "people-eater": "#a88d66", // teal accent -> gold
      paleruby: "#a88d66", // teal accent -> gold
      tangy: "#f3f2f1", // desert storm (light neutral, kept)
      vulcan: "#2a2d32", // near-black -> darkest slate (dark text, header/footer)
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
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
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
