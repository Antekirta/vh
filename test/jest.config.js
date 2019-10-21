const path = require("path");

// eslint-disable-next-line no-undef
module.exports = {
  // eslint-disable-next-line no-undef
  rootDir: path.resolve(__dirname, "../"),
  roots: ["<rootDir>/src"],
  verbose: false,
  moduleFileExtensions: ["ts", "tsx", "vue", "js", "jsx", "json"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)x?$",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.(js|jsx)?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest"
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/test/jest.init.js"],

  // run tests with --coverage to see coverage
  coverageDirectory: "<rootDir>/test/coverage",
  coverageReporters: ["html", "text-summary"],
  collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx,vue}", "!**/node_modules/**"],

  globals: {
    jasmine: true,
    "ts-jest": {
      babelConfig: true
    }
  },

  setupFiles: ["jest-date-mock"]
};
