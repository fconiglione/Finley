import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "next-env.d.ts",
    ],
    rules: {
      "react/no-unescaped-entities": "off", // disable the rule
      "@typescript-eslint/no-unused-vars": "off", // disable unused vars warning
      "@next/next/no-img-element": "off", // disable img element warning
    },
  },
];

export default eslintConfig;
