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
  requiredTestCoverage: 80,
  tpl_module: 'templates-module',
  project_theme_name: PROJECT_THEME_NAME,
  test_files_pattern: '*.spec.ts',
  app_files: {
    js: ['src/**/*.ts', '!src/**/*.spec.ts'],
    allJs: ['src/**/*.ts'],
    jsunit: ['src/**/*.spec.ts'],
    jse2e: ['e2e/**/*.e2e.ts'],
    jade_all: 'src/**/*.jade',
    jade_app_tpl: 'src/app/**/*.jade',
    jade_common_tpl: 'src/common/**/*.jade',
    index_html: ['src/index.html'],
    assets: ['src/assets/**'],
    sass: {
      all_observed: [
        'src/template/**/*.sass',
      ],

      // INFO: Due to problems with passing Array of strings to SASS compile when
      // changing PROJECT_THEME_NAME need to update @imports into related main sass
      // file.
      // More info with related question: http://stackoverflow.com/a/28521473
      to_compile: PROJECT_THEME_PATH + 'stylesheets/main.sass'
    }
  },
  test_files: {
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

      'node_modules/hellojs/dist/hello.all.min.js',
      'node_modules/c7s-ng/build/c7s-ng.js',
      'node_modules/hellojs/dist/hello.all.min.js',
      'node_modules/angular-touch/angular-touch.js',
      'node_modules/masonry-layout/dist/masonry.pkgd.js',
      'generated-modules/common-config/common-config.js',

      'node_modules/ratel-sdk-js/dist/ratel-sdk.js',
      'build/src/common/services/ratelSdk/ratel-sdk-wrap.ts', // TODO: merge back to ratel sdk
      'build/src/common/services/ratelSdk/ratel-sdk-server-mock.ts' // TODO: remove on ratel sdk update
    ],
    css: [
      'node_modules/reset.css/reset.css',
      'node_modules/angular-toastr/dist/angular-toastr.css',
      'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
      'node_modules/ui-select/dist/select.css',
      'node_modules/perfect-scrollbar/dist/css/perfect-scrollbar.css',
      'node_modules/angularjs-slider/dist/rzslider.css'
    ],
    assets: []
  },
  translations: {
    'module': 'profitelo.translations',
    'collection': [
      {
        languageCode: 'pl-pl',
        url: 'https://tr.contactis.pl/api/Translations/export?projectId=4&projectLanguageId=3'
      },
      {
        languageCode: 'en-us',
        url: 'https://tr.contactis.pl/api/Translations/export?projectId=4&projectLanguageId=3'
      }
    ]
  },
  swagger: {
    file: 'swagger-src/swagger.json',
    module: 'profitelo.swaggerResources'
  },
  strategyConfig: {
    ngModuleName: 'commonConfig',
    ngProviderName: 'CommonConfig',
    outputDir: 'generated-modules/common-config',
    outputFileName: 'common-config.js',
    jsonSettings: 'common-config/config.json'
  },
  protractor: {
    configFile: 'protractor.config.js',
    autoStartStopServer: true
    // debug: true
  }
};
