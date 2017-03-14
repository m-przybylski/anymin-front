var path = require('path');
var webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = function (config) {
  config.set({
    // base path used to resolve all patterns
    basePath: '',

    mime: {'text/x-typescript': ['ts', 'tsx']},

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    //frameworks: ['mocha', 'chai'],
    frameworks: ['jasmine'],

    // list of files/patterns to load in the browser
    files: [
      './lib/karma/polyfill.js',
      {pattern: /*'**!/!*.spec.ts'*/ 'spec.bundle.js', watched: false}
    ],

    // files to exclude
    exclude: [],

    plugins: [
      require("karma-jasmine"),
      require("karma-sourcemap-loader"),
      require("karma-webpack"),
      //require('karma-remap-istanbul'),
      require("karma-coverage"),
      require("karma-remap-coverage"),
      //require("karma-coverage-istanbul-reporter")
      require("karma-phantomjs-launcher")
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.spec.ts'/*'spec.bundle.js'*/: ['webpack', 'sourcemap'],
      'spec.bundle.js'/*'spec.bundle.js'*/: ['webpack', 'sourcemap'],
      './src/**/*!(*.spec).ts': ['coverage']
    },

    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        extensions: ["", ".ts", ".webpack.js", ".web.js", ".js", ".json"],
        root: path.resolve('./src'),
        modules: [
          path.resolve('./src'),
          path.resolve('./node_modules')
        ]
      },
      module: {
        loaders: [
          //to generate static html files for some external directives
          {test: /\.tpl\.pug$/, loaders: ['file?name=[hash].html', 'pug-html?exports=false']},
          {test: /\.json$/, loader: "json"}, // to parse configs from node_modules
          {test: /\.jade$/, exclude: [/\.tpl\.pug$/], loader: "jade"},
          {test: /\.ts$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!awesome-typescript-loader'},
          {test: /\.js/, exclude: [/app\/lib/, /node_modules/], loader: 'babel'},
          {test: /\.html$/, loader: 'raw'},
          {test: /\.(scss|sass)$/, loader: 'style!css!sass'},
          {test: /\.css$/, loader: 'style!css'}
        ],
        rules: [
          // instrument only testing sources with Istanbul
          {
            test: /\.ts$/,
            include: path.resolve('src/'),
            loader: 'istanbul-instrumenter-loader'
          }
        ]
      },
      plugins: [
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
    //reporters: ['mocha'],
    reporters: ['progress', 'coverage', 'remap-coverage'],

    coverageReporter: {
      includeAllSources: true,
      check: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80
        }
      },
      type: 'in-memory'
    },

    remapOptions: { basePath: './src' },

    remapCoverageReporter: {
      'text-summary': null, // to show summary in console
      html: './coverage/html',
      cobertura: './coverage/cobertura.xml'
    },

    // web server port
    port: 9876,

    // enable colors in the output
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // toggle whether to watch files and rerun tests upon incurring changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],//['Chrome'],

    // if true, Karma runs tests once and exits
    singleRun: true
  });
};
