module.exports = {
  pkg: require('./package.json'),
  compile_dir: 'build',
  tests_dir: 'tests',
  tpl_name: 'templates-module.js',
  tpl_module: 'templates-module',
  project_theme_name: 'profitelo_theme',
  swagger_location: 'http://api.dev.profitelo.pl/swagger/swagger.json',
  swagger_module: 'profitelo.swagger',
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
    js: [
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js'
    ],
    sources: {
      include: [
        '**/*.js'
      ],
      exclude: [
        'node_modules/**/*.js'
      ]
    }
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
      'node_modules/angular-ui-mask/dist/mask.js',
      'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
      'node_modules/angular-sanitize/angular-sanitize.js',
      'node_modules/ui-select/dist/select.js',
      'node_modules/perfect-scrollbar/dist/js/perfect-scrollbar.jquery.js',

      'node_modules/angular-translate/dist/angular-translate.js',
      'node_modules/messageformat/messageformat.js',
      'node_modules/messageformat/locale/en.js',
      'node_modules/messageformat/locale/pl.js',
      'node_modules/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat.js',
      'node_modules/angular-dynamic-locale/dist/tmhDynamicLocale.js',

      'node_modules/hellojs/dist/hello.all.min.js'
    ],
    css: [
      'node_modules/angular-toastr/dist/angular-toastr.css',
      'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
      'node_modules/ui-select/dist/select.css',
      'node_modules/perfect-scrollbar/dist/css/perfect-scrollbar.css'
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
    json:   'http://api.dev.profitelo.pl/swagger/swagger.json',
    module: 'profitelo.swaggerResources'
  }
};

