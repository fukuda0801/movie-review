import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  collectCoverage: true,
  coverageProvider: "v8",
  testEnvironment: "jest-environment-jsdom",
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1",
  },
};

export default createJestConfig(config);
