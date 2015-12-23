var pkg = require('./package.json');
var argv = require('yargs').argv;


module.exports = {
  compile_dir: 'build',
  tests_dir: 'tests',
  tpl_name: 'templates-module.js',
  tpl_module: 'templates-module',
  project_theme_name: 'profitelo_theme',
  variables: {
    tests: !!((typeof argv.tests === "undefined") || (argv.tests === true)),
    docs: !!((typeof argv.docs === "undefined") || (argv.docs === true)),
    uglify: !!((typeof argv.uglify === "undefined") || (argv.uglify === true)),
    production: false,
    b2d: false,
    jadeCache: true
  },
  app_files: {
    js: ['src/**/*.js', '!src/**/*.spec.js'],
    allJs: ['src/**/*.js'],
    jsunit: ['src/**/*.spec.js'],
    jade_all: 'src/**/*.jade',
    jade_app_tpl: 'src/app/**/*.jade',
    jade_common_tpl: 'src/common/**/*.jade',
    assets: ['src/assets/**'],
    index_html: ['src/index.html'],
    sass_all: ['src/template/**/*.sass']
  },
  test_files: {
    js: ['node_modules/angular-mocks/angular-mocks.js', 'node_modules/jasmine-jquery/lib/jasmine-jquery.js']
  },
  vendor_files: {
    js: [
      "node_modules/jquery/dist/jquery.js",
      'node_modules/lodash/index.js',
      "node_modules/bootstrap-sass/assets/javascripts/bootstrap.js",
      "node_modules/angular/angular.js",
      "node_modules/ui-router/release/angular-ui-router.js",
      "node_modules/angular-resource/angular-resource.js",

      'node_modules/angular-translate/dist/angular-translate.js',
      'node_modules/messageformat/messageformat.js',
      'node_modules/messageformat/locale/en.js', // need to upload all messageformat for all interface languages
      'node_modules/messageformat/locale/pl.js',
      'node_modules/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat.js',
      'node_modules/angular-dynamic-locale/dist/tmhDynamicLocale.js'
],
css: [],
    assets: []
  }
};

