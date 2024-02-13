// const oxlint = require("eslint-plugin-oxlint");
const importRules = {
  // "import/default": "off",
  // "import/named": "off",
  // "import/no-cycle": "off",
  // "import/no-self-import": "off",
  // "import/no-amd": "off",
  // "import/export": "off",
};
const oxlintManual = {
  ...importRules,
};
module.exports = {
  rules: oxlintManual,
};
