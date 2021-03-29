module.exports = {
  moduleNameMapper: {
    "\\.(scss)$": "<rootDir>/config/jest/styleMock.js"
  },
  preset: "ts-jest",
  testEnvironment: "jsdom",
};