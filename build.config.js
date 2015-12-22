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
    all_js: ['src/**/*.js'],
    jsunit: typeof argv['testing-dir'] === "undefined" ? 'src/**/*.spec.js' : '/src/' + argv['testing-dir'] + '/**/*.spec.js',
    jade_all: 'src/**/*.jade',
    jade_app_tpl: 'src/app/**/*.jade',
    jade_partials: '!src/**/*.partial.jade',
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
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/angular/angular.js",
      "node_modules/ui-router/release/angular-ui-router.js"
    ],
    css: [],
    assets: []
  }
};

