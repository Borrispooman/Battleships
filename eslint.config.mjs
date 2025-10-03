// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Base config for all JS files
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node, // include Node globals too if you're using tooling
      },
    },
    plugins: {
      js,
    },
    extends: [
      "js/recommended", // ESLint core recommended rules
    ],
  },

  // Override for unit tests
  {
    files: ["src/unit-tests/**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.jest, // gives `describe`, `test`, `expect`, etc.
      },
    },
    rules: {
      "no-console": "off", // tests often log
    },
  },
]);
