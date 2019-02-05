const esModules = ['@angular/common', '@ngrx', '@ng-bootstrap'].join('|');

module.exports = {
  rootDir: '.',
  preset: 'jest-preset-angular',
  setupTestFrameworkScriptFile: '<rootDir>/src/setupJest.ts',
  moduleNameMapper: {
    '@platform/(.*)$': '<rootDir>/src/app/$1',
    '@anymind-ng/core': '<rootDir>/projects/anymind-ng-core/index.ts',
    '^testing/testing$': '<rootDir>/src/testing/testing.ts',
  },
  transform: {
    '^.+\\.(ts|js|html)$': '<rootDir>/node_modules/jest-preset-angular/preprocessor.js',
  },
  testMatch: ['<rootDir>/src/app/**/*.spec.ts'],
  collectCoverageFrom: [
    '<rootDir>/src/app/**/*.ts',
    '!<rootDir>/src/app/**/*.module.ts',
    '!<rootDir>/src/app/**/*.config.ts',
  ],
  coverageDirectory: '<rootDir>/test-coverage',
  coverageThreshold: {
    global: {
      branches: 25,
      functions: 25,
      lines: 25,
      statements: 25,
    },
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
};
