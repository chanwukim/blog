import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  // Override default ignores of eslint-config-next.
  {
    rules: {
      /**
       * 타입스크립트 {} 타입 허용
       * @see https://typescript-eslint.io/rules/no-empty-object-type/
       */
      "@typescript-eslint/no-empty-object-type": "off",
      /**
       * 타입 import시 type 키워드 사용
       * 예) import { type User } from "@/types/user";
       * @see https://typescript-eslint.io/rules/consistent-type-imports
       */
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
