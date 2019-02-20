const ngxWallabyJest = require('ngx-wallaby-jest');
const compilerOptions = Object.assign(
  require('./tsconfig.json').compilerOptions,
  require('./src/tsconfig.spec.json').compilerOptions,
);
compilerOptions.module = 'CommonJs';

module.exports = function(wallaby) {
  return {
    files: [
      'generated_modules/version/version.ts',
      'generated_modules/environment/environment.json',
      'src/**/*.+(ts|html|json|snap|sass)',
      'projects/anymind-ng-core/**/*.+(ts|html|json|snap|sass)',
      'tsconfig.json',
      'tsconfig.spec.json',
      'jest.config.js',
      '!projects/anymind-ng-core/**/*.spec.ts',
      '!src/**/*.spec.ts',
    ],

    tests: [
      'src/**/*.spec.ts',
      'projects/anymind-ng-core/**/*.spec.ts',
    ],

    env: {
      type: 'node',
      runner: 'node',
    },
    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript(compilerOptions),
    },
    preprocessors: {
      // This translate templateUrl and styleUrls to the right implementation
      // For wallaby
      'projects/**/*.component.ts': ngxWallabyJest,
      'src/**/*.component.ts': ngxWallabyJest,
      'src/**/button.ts': ngxWallabyJest,
    },
    testFramework: 'jest',
    setup: function(wallaby) {
      const jestConfig = require('./jest.config');
      wallaby.testFramework.configure(jestConfig);
    },
  };
};
