/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,

  // https://nextjs.org/docs/app/building-your-application/configuring/eslint
  extends: ["next/core-web-vitals", "next/typescript", "prettier"],

  rules: {
    eqeqeq: ["error", "always", { null: "ignore" }], // 동등 비교(===, !==)를 사용. null 제외
    "@typescript-eslint/consistent-type-imports": "error", // import type을 사용하도록 강제
    "@typescript-eslint/no-empty-object-type": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "import/order": [
      "error",
      {
        "newlines-between": "always", // 항상 새 줄
        alphabetize: {
          order: "asc", // import를 알파벳 오름차순으로 정렬
          caseInsensitive: true, // 정렬 시 대소문자 구분 안 함
        },
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        pathGroups: [
          {
            pattern: "*.css",
            group: "builtin",
            /**
             * @see https://github.com/import-js/eslint-plugin-import/issues/1239#issuecomment-716683648
             */
            patternOptions: { matchBase: true },
            position: "before",
          },
          {
            pattern: "{next,next/**,react,react-dom}", // framework 처리
            group: "external",
            position: "before",
          },
          {
            pattern: "@/lib/**/*",
            group: "external",
            position: "after",
          },
          {
            pattern: "@/hooks/**/*",
            group: "external",
            position: "after",
          },
          {
            pattern: "@/components/**/*",
            group: "external",
            position: "after",
          },
          {
            pattern: "@/constants/**/*",
            group: "external",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["react", "next"],
      },
    ],
  },
};
