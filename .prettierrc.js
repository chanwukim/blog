/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
module.exports = {
  semi: true,
  singleQuote: false,
  useTabs: false,
  tabWidth: 2,
  trailingComma: "all",
  printWidth: 100,
  bracketSpacing: true,
  bracketSameLine: false,
  plugins: ["prettier-plugin-tailwindcss"],
};
