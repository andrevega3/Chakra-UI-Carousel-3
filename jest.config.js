module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  transformIgnorePatterns: [
    "/node_modules/(?!(framer-motion|@chakra-ui|@emotion|@floating-ui)/)",
  ],
};
