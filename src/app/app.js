angular.module('profitelo', [
  'ngMessages',
  'authorization',
  'templates-module',
  'pascalprecht.translate',
  'tmh.dynamicLocale',
  'ngAnimate',
  'toastr',  // some parts depends on ngAnimate
  'ngCookies',

  // services
  'profitelo.services.customTranslationHandler',

  // controllers
  'profitelo.controller.dashboard',
  'profitelo.controller.dashboard.start',
  'profitelo.controller.dashboard.service-wizard',
  'profitelo.controller.home',
  'profitelo.controller.expert-profile',
  'profitelo.controller.expert-progress',
  'profitelo.controller.registration',


  // directives
  'profitelo.directive.proRegistration',
  'profitelo.directive.proExpertProgress',
  'profitelo.directive.proProgressBox',
  'profitelo.directive.expert-profile',
  'profitelo.directives.proProgressBar',


  // rest
  'profitelo.api.accounts',
  'profitelo.api.registration',
  'profitelo.api.sessions',
  'profitelo.api.accountsStatus',

  // translations
  'profitelo.translations.en-us',
  'profitelo.translations.pl-pl'

])

.config(($urlRouterProvider, $stateProvider, $resourceProvider, $translateProvider, tmhDynamicLocaleProvider, toastrConfig) => {
  $stateProvider.state('app', {
    url: '',
    abstract: true,
    controller: 'AppController',
    templateUrl: 'templates/app.tpl.html',
    resolve: {
      typeKit: () => {
        function adobeTypekit(d) {
          let config = {
              kitId: 'gxk2sou',
              scriptTimeout: 3000,
              async: true
            },
            h = d.documentElement, t = setTimeout(() => {
              h.className = h.className.replace(/\bwf-loading\b/g, '') + ' wf-inactive'
            }, config.scriptTimeout), tk = d.createElement('script'), f = false, s = d.getElementsByTagName('script')[0], a
          h.className += ' wf-loading'
          tk.src = 'https://use.typekit.net/' + config.kitId + '.js'
          tk.async = true
          tk.onload = tk.onreadystatechange = function() {
            a = this.readyState
            if (f || a && a !== 'complete' && a !== 'loaded') {
              return
            }
            f = true
            clearTimeout(t)
            try {
              Typekit.load(config)
            } catch (e) {
              console.log(e)
            }
          }
          s.parentNode.insertBefore(tk, s)
        }
        adobeTypekit(document)
      }
    }
  })
  $urlRouterProvider
    .when('', '/')
    .when('/', '/home')


  // ngResource
  $resourceProvider.defaults.stripTrailingSlashes = true

  // Toastr
  angular.extend(toastrConfig, {
    newestOnTop: true,
    positionClass: 'toast-bottom-right',

    allowHtml: false,
    closeButton: false,
    closeHtml: '<button>&times</button>',
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
  })


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
    console.log('$stateChangeError', error)
  })
})

.controller('AppController', AppController)


function AppController($scope, $rootScope) {
  var vm = this

  $rootScope.gitCommit = lastCommitMessage

  return vm
}
