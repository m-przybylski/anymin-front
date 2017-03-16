const path = require('path');
const webpack = require('webpack');
const {CheckerPlugin} = require('awesome-typescript-loader')

module.exports = function (config) {
  config.set({
    // base path used to resolve all patterns
    basePath: '',

    mime: {'text/x-typescript': ['ts', 'tsx']},

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'source-map-support'],

    // list of files/patterns to load in the browser
    files: [
      // Polyfill phantomjs unsupported things, Audio, Object.assign etc.
      './lib/karma/polyfill.js',
      {pattern: 'spec.bundle.js', watched: false}
    ],

    // files to exclude
    exclude: [],

    plugins: [
      require("karma-jasmine"),
      require("karma-webpack"),
      require("karma-sourcemap-loader"),
      require("karma-source-map-support"),
      require("karma-mocha-reporter"),
      require("karma-coverage"),
      require("karma-phantomjs-launcher")
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'spec.bundle.js': ['webpack', 'sourcemap']
    },

    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        extensions: [/*"", */".ts", ".webpack.js", ".web.js", ".js", ".json"],
        modules: [
          path.resolve('./src'),
          path.resolve('./node_modules')
        ]
      },
      module: {
        rules: [
          //to generate static html files for some external directives
          {test: /\.tpl\.pug$/, use: [
            {loader: 'file-loader', options: {name: '[hash].html'}},
            {loader:'pug-html-loader', options: {exports: 'false'}}]
          },
          {test: /\.jade$/, exclude: [/\.tpl\.pug$/], use: [{loader: "jade-loader"}]},
          {test: /\.ts$/, exclude: [], use: [
            {loader: 'ng-annotate-loader'},
            {loader: 'awesome-typescript-loader'}
          ]},
          {test: /\.html$/, use: [{loader: 'raw-loader'}]},
          {
            test: /\.(scss|sass)$/,
            use: [
              {loader: 'style-loader'},
              {loader: 'css-loader'},
              {loader: 'sass-loader'}
            ]
          },
          {
            test: /\.css$/,
            use: [
              {loader: 'style-loader'},
              {loader: 'css-loader'}
            ]
          },
          /**
           * Instruments source files for subsequent code coverage.
           * See https://github.com/deepsweet/istanbul-instrumenter-loader
           */
          {
            test: /\.ts$/,
            enforce: 'post',
            use: [{loader: 'istanbul-instrumenter-loader', options: {embedSource: true, noAutoWrap: true}}],
            exclude: [
              /\.spec.ts$/,
              /generated_modules/,
              /src\/common\/api/,
              /node_modules/
            ]
          }
        ]
      },
      plugins: [
        // to provide full jquery for angular
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery"
        }),

        new CheckerPlugin(),

        new webpack.ProvidePlugin({
          "window.i18n": "phonenumber"
        })
      ]
    },

    webpackServer: {
      noInfo: true // prevent console spamming when running in Karma!
    },

    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', /*'progress',*/ 'coverage'],

    coverageReporter: {
      includeAllSources: true,
      check: {
        global: {
          statements: 77,
          branches: 52,
          functions: 63,
          lines: 78
        }
      },
      reporters: [
        {
          type: 'cobertura',
          dir: './coverage/cobertura'
        },
        {
          type: 'html',
          dir: './coverage/html'
        },
        {
          type: 'text-summary'
        }
      ],
      dir : 'coverage/'
    },

    // web server port
    port: 9876,

    // enable colors in the output
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_WARN,

    // toggle whether to watch files and rerun tests upon incurring changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // if true, Karma runs tests once and exits
    singleRun: true
  });
};
