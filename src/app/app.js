angular.module('profitelo', [
  'pascalprecht.translate',
  'tmh.dynamicLocale',

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

  // rest
  'profitelo.rest.account',

  // translations
  'profitelo.translations.en-us',
  'profitelo.translations.pl-pl'

])


.config(($urlRouterProvider, $stateProvider, $translateProvider, tmhDynamicLocaleProvider) => {
  $stateProvider.state('app', {
    url: '',
    abstract: true,
    controller: 'AppController',
    templateUrl: 'templates/app.tpl.html'
  });
  $urlRouterProvider
    .when('', '/')
    .when('/', '/home');

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

.controller('AppController', AppController);

function AppController($scope, $rootScope) {
  var vm = this;

  $rootScope.gitCommit = lastCommitMessage;

  return vm;
}
