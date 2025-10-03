// jest.config.mjs
export default {
  // Put all tests in this folder:
  roots: ["<rootDir>/unit-tests"],

  // Test files naming convention:
  testMatch: ["**/?(*.)+(test|spec).js"],

  // Browser-like globals (window, document, etc.). Use "node" if you don’t need DOM.
  testEnvironment: "node",

  // If you’re pure ESM and hit import issues, uncomment the next line:
  // extensionsToTreatAsEsm: [".js"],

  // If you need transforms (TypeScript, JSX, etc.), you can add babel-jest here later.
  transform: {}
};
