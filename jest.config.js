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
  testMatch: [
    '<rootDir>/src/app/**/*.spec.ts',
    '<rootDir>/projects/anymind-ng-core/**/*.spec.ts',
  ],
  collectCoverageFrom: [
    '<rootDir>/src/app/**/*.ts',
    '!<rootDir>/src/app/**/*.module.ts',
    '!<rootDir>/src/app/**/*.config.ts',
    '!<rootDir>/src/app/**/index.ts'
  ],
  coverageDirectory: '<rootDir>/test-coverage',
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 30,
      lines: 30,
      statements: 30,
    },
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
};
