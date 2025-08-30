/** @typedef  {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */
/** @typedef  {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | TailwindConfig | SortImportsConfig } */
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
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  tailwindFunctions: ["cn", "clsx", "cva", "cx"],
  importOrderTypeScriptVersion: "5.9.0",
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/",
    "^[../]",
    "^[./]",
  ],
};

export default config;
