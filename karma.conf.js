var path = require('path');
var webpack = require('webpack');

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
      //require("karma-chai"),
      require("karma-chrome-launcher"),
      require("karma-jasmine"),
      //require("karma-mocha"),
      //require("karma-mocha-reporter"),
      require("karma-sourcemap-loader"),
      require("karma-webpack"),
      require('karma-remap-istanbul'),
      //require("karma-coverage")
      //require("karma-coverage-istanbul-reporter")
      require("karma-phantomjs-launcher")
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {'spec.bundle.js' /*'**!/!*.ts'*/: ['webpack', 'sourcemap']},

    remapIstanbulReporter: {
      reports: {
        html: 'coverage',
        lcovonly: './coverage/coverage.lcov'
      }
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
          {test: /\.ts$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!ts-loader'},
          {test: /\.js/, exclude: [/app\/lib/, /node_modules/], loader: 'babel'},
          {test: /\.html$/, loader: 'raw'},
          {test: /\.(scss|sass)$/, loader: 'style!css!sass'},
          {test: /\.css$/, loader: 'style!css'}
        ]
      },
      plugins: [
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery"
        }),

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
    reporters: ['progress', 'karma-remap-istanbul'],

    coverageIstanbulReporter: {

      // reports can be any that are listed here: https://github.com/istanbuljs/istanbul-reports/tree/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib
      reports: ['html', 'lcovonly', 'text-summary'],

      // base output directory
      dir: './coverage',

      // if using webpack and pre-loaders, work around webpack breaking the source path
      fixWebpackSourcePaths: true,

      // Most reporters accept additional config options. You can pass these through the `report-config` option
      'report-config': {

        // all options available at: https://github.com/istanbuljs/istanbul-reports/blob/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib/html/index.js#L135-L137
        html: {
          // outputs the report in ./coverage/html
          subdir: 'html'
        }

      },

      // enforce percentage thresholds
      // anything under these percentages will cause karma to fail with an exit code of 1 if not running in watch mode
      thresholds: {
        statements: 100,
        lines: 100,
        branches: 100,
        functions: 100
      }

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
