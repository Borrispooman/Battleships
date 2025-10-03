export default {
  roots: ["<rootDir>/unit-tests"],
  testMatch: ["**/?(*.)+(test|spec).[cm]js"],
  testEnvironment: "node",
  transform: {
    "^.+\\.[cm]?js$": "babel-jest",
  },
};
