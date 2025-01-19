export default {
  testEnvironment: "jsdom",
  transform: {
      "^.+\\.(ts|tsx)$": ["ts-jest", {
          tsconfig: "tsconfig.app.json",
      }],
  },
  moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
      "\\.(css|less|scss|sass)$": "jest-css-modules-transform", // Manejo de archivos CSS
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: ["/node_modules/"],
};
