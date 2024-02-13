const { resolve } = require("node:path");
const oxlint = require("./oxlint");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use a library
 * that utilizes React.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  reportUnusedDisableDirectives: false,
  extends: [
    ...[
      "@vercel/style-guide/eslint/browser",
      "@vercel/style-guide/eslint/typescript",
      "@vercel/style-guide/eslint/react",
    ].map(require.resolve),
    "plugin:tailwindcss/recommended",
  ],
  parserOptions: {
    project,
  },
  globals: {
    JSX: true,
    jest: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
      node: {
        extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/", ".eslintrc.js", "**/*.css"],
  // add rules configurations here
  rules: {
    "import/no-default-export": "off",
    // todo: file name same as component name
    "unicorn/filename-case": "off",
    "import/no-cycle": ["error", { ignoreExternal: true }],
    camelcase: "off",
    ...oxlint.rules,
  },
};
