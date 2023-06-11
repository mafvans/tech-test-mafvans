/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

/* eslint-disable import/no-default-export */
export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  moduleNameMapper: {
    '@infra/(.*)': '<rootDir>/infra/$1',
    '@health/(.*)': '<rootDir>/health/$1',
    '@domain/(.*)': '<rootDir>/domain/$1',
    '@commons/(.*)': '<rootDir>/commons/$1',
    '@useCases/(.*)': '<rootDir>/use-cases/$1',
    '@application/(.*)': '<rootDir>/application/$1',
  },
  testResultsProcessor: 'jest-sonar-reporter',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/domain/',
    '/ports/',
    '/dtos/',
    '/commons/',
    '/test/',
    '/usecases-proxy/',
    '/main.ts',
    '.*\\.module\\.ts',
  ],
  coverageThreshold: {
    global: {
      lines: 80,
      branches: 50,
      functions: 80,
    },
  },
  setupFiles: ['<rootDir>/domain/__spec__/mocks/env-var.mocks.ts'],
};
