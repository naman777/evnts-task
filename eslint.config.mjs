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
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // Removes unused vars error
      "@typescript-eslint/no-explicit-any": "off", // Removes 'any' error
      "react-hooks/exhaustive-deps": "off", 
      "@typescript-eslint/ban-ts-comment": "off", // Removes 
    },
  },
];

export default eslintConfig;
