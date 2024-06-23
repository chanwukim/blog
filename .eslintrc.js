module.exports = {
  ignorePatterns: ["node_modules/*", ".next/*"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended", //  errors + warnings
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "import", "prettier"],

  // TypeScript, JSX 구문 지원
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },

  settings: {
    "import/resolver": { typescript: {} },
  },
  rules: {
    "prettier/prettier": ["error"],

    // 모든 제어문 중괄호
    curly: ["error", "all"],
    // === 사용, null은 예외
    eqeqeq: ["error", "always", { null: "ignore" }],

    "import/order": [
      "error",
      {
        "newlines-between": "always", //항상 새 줄
        alphabetize: { order: "asc", caseInsensitive: true }, // 알파벳순
      },
    ],

    "@typescript-eslint/naming-convention": [
      "error",
      {
        format: ["camelCase", "UPPER_CASE", "PascalCase"],
        selector: "variable",
        leadingUnderscore: "allow",
      },
      { format: ["camelCase", "PascalCase"], selector: "function" },
      { format: ["PascalCase"], selector: "interface" },
      { format: ["PascalCase"], selector: "typeAlias" },
    ],
    "@typescript-eslint/member-ordering": [
      "error",
      {
        default: [
          "public-static-field",
          "private-static-field",
          "public-instance-field",
          "private-instance-field",
          "public-constructor",
          "private-constructor",
          "public-instance-method",
          "private-instance-method",
        ],
      },
    ],
    // ...rest 제외 사용하지 않는 변수 에러
    "@typescript-eslint/no-unused-vars": [
      "error",
      { ignoreRestSiblings: true },
    ],

    "react/react-in-jsx-scope": "off", // React 17 이상에서 불필요
    "react/display-name": "off", // React.memo, React.forwardRef 때문에 끔
    "react/no-unknown-property": ["error"], // 알 수 없는 속성 사용시
  },
};
