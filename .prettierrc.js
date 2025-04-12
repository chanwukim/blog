/** @type {import('prettier').Config} */
const config = {
  semi: true,
  singleQuote: false,
  useTabs: false,
  tabWidth: 2,
  trailingComma: "all",
  printWidth: 80,
  bracketSpacing: true,
  jsxBracketSameLine: false,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["cn", "clsx", "cva", "cx"],
};

export default config;
