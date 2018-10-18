var wallabyWebpack = require('wallaby-webpack');
var path = require('path');

var compilerOptions = Object.assign(
  require('./tsconfig.json').compilerOptions,
  require('./src/tsconfig.spec.json').compilerOptions,
);

compilerOptions.module = 'CommonJs';

module.exports = function(wallaby) {
  var webpackPostprocessor = wallabyWebpack({
    entryPatterns: ['src/wallabyTest.js', 'src/app/**/*spec.js'],
    module: {
      rules: [
        { test: /\.html$/, loader: 'raw-loader' },
        {
          test: /\.ts$/,
          loader: '@ngtools/webpack',
          include: /node_modules/,
          query: { tsConfigPath: 'tsconfig.json' },
        },
        { test: /\.js$/, loader: 'angular2-template-loader', exclude: /node_modules/ },
        { test: /\.scss$|\.sass$/, loaders: ['raw-loader', 'sass-loader'] },
        { test: /\.(jpg|png|svg)$/, loader: 'url-loader?limit=128000' },
      ],
    },
    resolve: {
      extensions: ['.js', '.ts'],
      modules: [
        path.join(wallaby.projectCacheDir, 'src/app'),
        path.join(wallaby.projectCacheDir, 'src'),
        'generated_modules',
        'node_modules',
      ],
      alias: {
        '@platform': path.join(wallaby.projectCacheDir, 'src/app'),
      },
    },
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      dns: 'empty',
    },
  });

  return {
    files: [
      { pattern: 'generated_modules/version/version.ts' },
      { pattern: 'generated_modules/environment/environment.json' },
      { pattern: 'src/**/*.+(ts|sass|html|json|svg)', load: false },
      { pattern: 'src/**/*.d.ts', ignore: true },
      { pattern: 'src/**/*spec.ts', ignore: true },
    ],

    tests: [{ pattern: 'src/**/*spec.ts', load: false }, { pattern: 'src/**/*e2e-spec.ts', ignore: true }],

    testFramework: 'jasmine@2.8.0',

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript(compilerOptions),
    },

    middleware: function(app, express) {
      var path = require('path');
      app.use('/favicon.ico', express.static(path.join(__dirname, 'src/favicon.ico')));
      app.use('/assets', express.static(path.join(__dirname, 'src/assets')));
    },

    env: {
      kind: 'electron',
    },

    postprocessor: webpackPostprocessor,

    setup: function() {
      window.__moduleBundler.loadTests();
    },

    debug: true,
  };
};
