module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", {
      tsconfig: "tsconfig.app.json", // Ajusta según la ubicación de tu archivo tsconfig
    }],
    "^.+\\.(js)$": "babel-jest",  // Asegúrate de que los archivos JS se transformen con Babel
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",  // Para importar rutas personalizadas
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: ["/node_modules/(?!(@firebase)/)"],  // Asegúrate de que Firebase sea transformado
};
