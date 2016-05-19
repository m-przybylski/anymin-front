(function() {
  function AppController($rootScope, InterfaceLanguageService) {
    var vm = this

    InterfaceLanguageService.setLanguage(InterfaceLanguageService.getStartupLanguage())

    if (typeof lastCommitMessage !== 'undefined') {
      $rootScope.gitCommit = lastCommitMessage
    }

    return vm
  }

  function runFunction($rootScope, $log) {


    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      $log.error(error)
    })

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, error) {

    })
  }

  function configFunction($urlRouterProvider, $httpProvider, $stateProvider, $resourceProvider, $translateProvider, $locationProvider, $animateProvider, tmhDynamicLocaleProvider, toastrConfig, UserProvider, UserRolesProvider, apiUrl) {

    $httpProvider.defaults.withCredentials = true

    $animateProvider.classNameFilter(/animation/)

    UserRolesProvider.setRoles(['anon', 'user', 'manager', 'admin'])
    UserRolesProvider.setAccessLevels({
      public      : '*',
      anon        : ['anon'],
      userOnly    : ['user'],
      user        : ['user', 'manager', 'admin'],
      managerOnly : ['manager'],
      manager     : ['manager', 'admin'],
      admin       : ['admin']
    })

    UserProvider.setApi('baseUrl', apiUrl)

    $stateProvider.state('app', {
      url: '',
      abstract: true,
      controller: 'AppController',
      templateUrl: 'templates/app.tpl.html',
      resolve: {
        typeKit: ($q, $timeout) => {

          let deferred = $q.defer()

          let backupTimer = $timeout(()=>{
            deferred.resolve()
          })

          let config = {
              kitId: 'gxk2sou',
              scriptTimeout: 3000,
              async: true,
              active: function() {
                deferred.resolve()
                $timeout.cancel(backupTimer)
              }
            },
            h = document.documentElement, t = setTimeout(() => {
              h.className = h.className.replace(/\bwf-loading\b/g, '') + ' wf-inactive'
            }, config.scriptTimeout), tk = document.createElement('script'), f = false, s = document.getElementsByTagName('script')[0], a
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
              deferred.resolve(e)
              $timeout.cancel(backupTimer)
            }
          }
          s.parentNode.insertBefore(tk, s)

          return deferred.promise
        },
        session: (User) => {
          User.getStatus()
        }
      }
    })
    $urlRouterProvider
      .when('', '/')
      .when('/', '/login/account')
      .otherwise('/login/account')

    $locationProvider.html5Mode(true)

    // ngResource
    $resourceProvider.defaults.stripTrailingSlashes = true

    /**
     * Translations (angular translate)
     */

    // use interpolation for translation
    $translateProvider.addInterpolation('$translateMessageFormatInterpolation')

    // Warnings, regarding forgotten IDs in translations
    $translateProvider.useMissingTranslationHandler('CustomTranslationHandlerService')

    // Set a fallback language in case there find no other
    $translateProvider.fallbackLanguage('pl-pl')

    /**
     *  Set default language**
     *  This method tries to resolve language by user locale
     */
    $translateProvider.registerAvailableLanguageKeys([
      'en-us',
      'pl-pl'
    ], {
      'en-en':  'en-us',
      'en':     'en-us', // NOTE: change/remove if international version will be added
      'pl_PL':  'pl-pl',
      'pl':     'pl-pl'
    }).determinePreferredLanguage()

    $translateProvider.useSanitizeValueStrategy(null)

    // configure loading angular locales
    tmhDynamicLocaleProvider.localeLocationPattern('assets/angular-i18n/angular-locale_{{locale}}.js')
  }

  angular.module('profitelo', [
    'pascalprecht.translate',
    'tmh.dynamicLocale',
    'ngAnimate',
    'c7s.ng.userAuth',

    // modules
    'templates-module',

    // services
    'profitelo.services.interfaceLanguage',
    'profitelo.services.customTranslationHandler',
    // controllers
    'profitelo.controller.dashboard',
    'profitelo.controller.dashboard.start',
    'profitelo.controller.dashboard.company-profile',
    'profitelo.controller.dashboard.single-profile',
    'profitelo.controller.dashboard.cost-data',
    'profitelo.controller.dashboard.company-cost-data',
    'profitelo.controller.dashboard.summary',
    'profitelo.controller.dashboard.company-summary',

    'profitelo.controller.dashboard.service-provider',
    'profitelo.controller.dashboard.service-provider.choose-path',
    'profitelo.controller.dashboard.service-provider.individual-path',
    'profitelo.controller.dashboard.service-provider.company-path',
    'profitelo.controller.dashboard.service-provider.consultation-range',

    'profitelo.controller.home',
    // 'profitelo.controller.expert-profile',
    'profitelo.controller.expert-progress',
    'profitelo.controller.login',
    'profitelo.controller.login.account',
    'profitelo.controller.login.register',
    'profitelo.controller.login.forgot-password',
    'profitelo.controller.login.set-new-password',
    'profitelo.controller.login.confirm-email',


    // directives
    'profitelo.directives.pro-top-waiting-loader',

    // translations
    'profitelo.translations.en-us',
    'profitelo.translations.pl-pl'

  ])
  .run(runFunction)
  .config(configFunction)
  .controller('AppController', AppController)
  .constant('apiUrl', 'http://api.dev.profitelo.pl')

}())
