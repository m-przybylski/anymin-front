require('./commonconfig-merge.js')

var fs = require('fs')

try {
  var commonConfigPath = './common-config/config.json'
  fs.accessSync(commonConfigPath, fs.F_OK)
  var commonConfig = require(commonConfigPath)
} catch (e) {
  throw new Error(e)
}

const PROJECT_THEME_NAME = 'profitelo_theme'
const PROJECT_THEME_PATH = 'src/template/' + PROJECT_THEME_NAME + '/'

module.exports = {
  pkg: require('./package.json'),
  compile_dir: 'build',
  transpiler: 'ts',
  tsconfig: 'tsconfig.json',
  tests_dir: 'tests',
  tpl_name: 'templates-module.js',
  requiredTestCoverage: 85,
  tpl_module: 'templates-module',
  project_theme_name: PROJECT_THEME_NAME,
  test_files_pattern: '*.ts',
  test_files: {
    coverage: '/build/**/!(*.spec).js',
    compiled_pattern: '**/*.js',
    js: [
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      'swagger/swagger.def.js'
    ],
    sources: {
      include: [
        '**/*.js'
      ],
      exclude: [
        'node_modules/**/*.js',
        'assets/angular-i18n/*.js'
      ]
    }
  },
  vendor_files: {
    js: [
      'node_modules/jquery/dist/jquery.js',

      'node_modules/moment/min/moment-with-locales.js', // include moment with all locales
      'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',

      'node_modules/angular/angular.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'node_modules/angular-permission/dist/angular-permission.js',
      'node_modules/angular-permission/dist/angular-permission-ng.js',
      'node_modules/angular-permission/dist/angular-permission-ui.js',
      'node_modules/angular-moment/angular-moment.js',
      'node_modules/angular-resource/angular-resource.js',
      'node_modules/angular-messages/angular-messages.js',
      'node_modules/angular-cookies/angular-cookies.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/ng-file-upload/dist/ng-file-upload-all.js',
      'node_modules/angular-toastr/dist/angular-toastr.js',
      'node_modules/angular-toastr/dist/angular-toastr.tpls.js',
      'node_modules/angular-touch/angular-touch.js',
      'node_modules/angular-ui-mask/dist/mask.js',
      'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
      'node_modules/angular-sanitize/angular-sanitize.js',
      'node_modules/ui-select/dist/select.js',
      'node_modules/perfect-scrollbar/dist/js/perfect-scrollbar.jquery.js',
      'node_modules/phonenumber/libphonenumber-bundle.js',
      'node_modules/angular-translate/dist/angular-translate.js',
      'node_modules/messageformat/messageformat.js',
      'node_modules/messageformat/locale/*.js',
      'node_modules/angularjs-slider/dist/rzslider.js',
      'node_modules/ng-infinite-scroll/build/ng-infinite-scroll.js',

      'node_modules/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat.js',
      'node_modules/angular-dynamic-locale/dist/tmhDynamicLocale.js',
      'node_modules/ng-lodash/build/ng-lodash.min.js',
      'node_modules/croppie/croppie.js',

      'node_modules/hellojs/dist/hello.all.min.js',
      'node_modules/c7s-ng/build/c7s-ng.js',
      'node_modules/hellojs/dist/hello.all.min.js',
      'node_modules/angular-touch/angular-touch.js',
      'node_modules/masonry-layout/dist/masonry.pkgd.js',
      'generated-modules/common-config/common-config.js',

      'node_modules/ratel-sdk-js/dist/ratel-sdk.js',
      'build/src/common/services/ratelSdk/ratel-sdk-wrap.ts', // TODO: merge back to ratel sdk
      'build/src/common/services/ratelSdk/ratel-sdk-server-mock.ts', // TODO: remove on ratel sdk update
      'node_modules/raven-js/dist/raven.js',
      'node_modules/raven-js/dist/plugins/angular.js'
    ],
  }
};
