module.exports = {
preset: 'ts-jest', // Ensures TypeScript files are transformed correctly
  testEnvironment: 'jsdom', // Simulates a browser environment
  transform: {
    '^.+\\.module\\.(css|sass|scss)$': 'jest-css-modules-transform',
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transforms TypeScript files using ts-jest
  },
};