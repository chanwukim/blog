module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true,
    "shared-node-browser": true,
  },
  ignorePatterns: ["node_modules/*", "build/*", "dist/*", ".next/*"],

  // ts, 최신 js, 모듈, JSX 파싱 설정
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended", //  errors + warnings
    "plugin:prettier/recommended",
    "next/core-web-vitals",
  ],
  plugins: ["@typescript-eslint", "react", "react-hooks", "import", "sort-exports", "prettier"],

  settings: {
    "import/resolver": { typescript: {} },
    next: {
      rootDir: ["apps/*/"],
    },
  },
  rules: {
    "no-implicit-coercion": "error", // 암시적 타입 변환을 금지

    curly: ["error", "all"], // 모든 제어문 중괄호
    eqeqeq: ["error", "always", { null: "ignore" }], // 동등 비교(===, !==)를 사용. null 제외

    "import/order": [
      "error",
      {
        "newlines-between": "always", // 항상 새 줄
        alphabetize: {
          order: "asc", // import를 알파벳 오름차순으로 정렬
          caseInsensitive: true, // 정렬 시 대소문자 구분 안 함
        },
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object"],
        pathGroups: [
          {
            pattern: "{next,next/**,react,react-dom}", // framework 처리
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react", "next"],
      },
    ],
    "sort-exports/sort-exports": ["error", { sortDir: "asc", pattern: "**/index.ts" }],

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
    "@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }],

    "react/react-in-jsx-scope": "off", // React 17 이상에서 불필요
    "react/display-name": "off", // React.memo, React.forwardRef 때문에 끔
    "react/no-unknown-property": ["error"],

    "prettier/prettier": ["warn"],
  },
};
