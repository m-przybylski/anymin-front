var pkg = require('./package.json');
var argv = require('yargs').argv;


module.exports = {
  pkg: pkg,
  compile_dir: 'build',
  tests_dir: 'tests',
  tpl_name: 'templates-module.js',
  tpl_module: 'templates-module',
  project_theme_name: 'profitelo_theme',
  swagger_location: 'http://api.dev.profitelo.pl/swagger/swagger.json',
  swagger_module: 'profitelo.swagger',
  variables: {
    tests: !!((typeof argv.tests === 'undefined') || (argv.tests === true)),
    wait: !!((typeof argv.wait === 'undefined') || (argv.wait === true)),
    docs: !!((typeof argv.docs === 'undefined') || (argv.docs === true)),
    uglify: !!((typeof argv.uglify === 'undefined') || (argv.uglify === true)),
    production: false,
    b2d: false,
    jadeCache: true,
    testing_dir: typeof argv['testing-dir'] === 'undefined' ? '/' : argv['testing-dir'] + '/'

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
      'node_modules/jquery/dist/jquery.js',
      'node_modules/lodash/index.js',

      'node_modules/moment/min/moment-with-locales.js', // include moment with all locales
      'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',

      'node_modules/angular/angular.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'node_modules/angular-moment/angular-moment.js',
      'node_modules/angular-resource/angular-resource.js',
      'node_modules/angular-messages/angular-messages.js',
      'node_modules/angular-cookies/angular-cookies.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/ng-file-upload/dist/ng-file-upload-all.js',
      'node_modules/angular-toastr/dist/angular-toastr.js',
      'node_modules/angular-toastr/dist/angular-toastr.tpls.js',

      'node_modules/angular-translate/dist/angular-translate.js',
      'node_modules/messageformat/messageformat.js',
      'node_modules/messageformat/locale/*.js', // include all messageformat for all device interface languages
      'node_modules/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat.js',
      'node_modules/angular-dynamic-locale/dist/tmhDynamicLocale.js',

      'node_modules/hellojs/dist/hello.all.min.js'
    ],
    css: [
      'node_modules/angular-toastr/dist/angular-toastr.css',
      'src/template/profitelo_theme/stylesheets/fonts.css'
    ],
    assets: []
  }
};

