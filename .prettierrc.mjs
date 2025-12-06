/** @typedef  {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */

/** @type { PrettierConfig | TailwindConfig } */
const config = {
  semi: true,
  singleQuote: false,
  useTabs: false,
  tabWidth: 2,
  trailingComma: "all",
  endOfLine: "lf",
  printWidth: 80,
  bracketSpacing: true,
  bracketSameLine: false,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["cn", "clsx", "cva", "cx"],
};

export default config;
