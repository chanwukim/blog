import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
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
  }),
];

export default eslintConfig;
