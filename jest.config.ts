module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  modulePathIgnorePatterns: ["./dist/", "./test/mocks.ts"],
  coveragePathIgnorePatterns: ["./test/mocks.ts"],
  automock: false,
  setupFiles: ["./tests/mocks.ts"],
  "roots": [
    "<rootDir>/src/",
    "<rootDir>/tests/"
  ],
};
