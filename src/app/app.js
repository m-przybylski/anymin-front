angular.module('profitelo', [
  'pascalprecht.translate',
  'tmh.dynamicLocale',
  'ngAnimate',
  'toastr',  // some parts depends on ngAnimate

  // templates
  'templates-module',

  // modules
  'authorization',

  // services
  'profitelo.services.customTranslationHandler',

  // controllers
  'profitelo.controller.dashboard',
  'profitelo.controller.home',
  'profitelo.controller.expert-profile',
  'profitelo.controller.registration',

  // directives
  'profitelo.directive.registration',
  'profitelo.directive.expert-profile',

  // rest
  'profitelo.api.accounts',

  // translations
  'profitelo.translations.en-us',
  'profitelo.translations.pl-pl'

])


.config(($urlRouterProvider, $stateProvider, $resourceProvider, $translateProvider, tmhDynamicLocaleProvider, toastrConfig) => {
  $stateProvider.state('app', {
    url: '',
    abstract: true,
    controller: 'AppController',
    templateUrl: 'templates/app.tpl.html'
  });
  $urlRouterProvider
    .when('', '/')
    .when('/', '/home');


  // ngResource
  $resourceProvider.defaults.stripTrailingSlashes = true;

  // Toastr
  angular.extend(toastrConfig, {
    newestOnTop: true,
    positionClass: 'toast-bottom-right',

    allowHtml: false,
    closeButton: false,
    closeHtml: '<button>&times;</button>',
    extendedTimeOut: 1000,
    iconClasses: {
      error: 'toast-error',
      info: 'toast-info',
      success: 'toast-success',
      warning: 'toast-warning'
    },
    messageClass: 'toast-message',
    onHidden: null,
    onShown: null,
    onTap: null,
    progressBar: false,
    tapToDismiss: true,
    templates: {
      toast: 'directives/toast/toast.html',
      progressbar: 'directives/progressbar/progressbar.html'
    },
    timeOut: 5000,
    titleClass: 'toast-title',
    toastClass: 'toast'
  });


  /**
   * Translations (angular translate)
   */

  // use interpolation for translation
  $translateProvider.addInterpolation('$translateMessageFormatInterpolation')

  // Warnings, regarding forgotten IDs in translations
  $translateProvider.useMissingTranslationHandler('CustomTranslationHandlerService')

  // Set a fallback language in case there find no other
  $translateProvider.fallbackLanguage('en-us')

  /**
   *  Set default language**
   *  This method tries to resolve language by user locale
   */
  $translateProvider.registerAvailableLanguageKeys([
    'en-us',
    'pl-pl'
  ], {
    'en_US':  'en-us',
    'en-en':  'en-us',
    'en':     'en-us', // NOTE: change/remove if international version will be added
    'pl_PL':  'pl-pl',
    'pl':     'pl-pl'
  }).determinePreferredLanguage()

  $translateProvider.useSanitizeValueStrategy(null)

  // configure loading angular locales
  tmhDynamicLocaleProvider.localeLocationPattern('assets/angular-i18n/angular-locale_{{locale}}.js')
})

.run(($rootScope) => {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    console.log('$stateChangeError', error);
  });
})

.controller('AppController', AppController);


function AppController($scope, $rootScope) {
  var vm = this;

  $rootScope.gitCommit = lastCommitMessage;

  return vm;
}
