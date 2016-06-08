(function() {
  function AppController($rootScope, InterfaceLanguageService) {
    var vm = this

    InterfaceLanguageService.setLanguage(InterfaceLanguageService.getStartupLanguage())

    if (typeof lastCommitMessage !== 'undefined') {
      $rootScope.gitCommit = lastCommitMessage
    }

    return vm
  }

  function runFunction($rootScope, $log, $state, User, proTopAlertService) {

    function userTransfer(event, toState, fromState) {
      let pac = User.pageAccessCheck(event, toState)
      switch (pac.code) {
      case 'x401':
        event.preventDefault()
        proTopAlertService.error({
          message: pac.msg,
          header: 'Page redirect',
          timeout: 3
        })
        $state.go('app.login.account')
        break
      case 'x403':
        event.preventDefault()
        proTopAlertService.error({
          message: pac.msg,
          header: 'Access forbidden',
          timeout: 3
        })
        if (fromState.name !== '') {
          $state.go(fromState.name)
        } else {
          $state.go('app.home')
        }
        break
      case 'x200':
        break
      default :
        $log.error('Unhandled error', pac)
        break
      }
    }

    // Check if user has proper ApiKey from backend
    function validateUserAccess(event, toState, fromState) {
      let apikey = User.getApiKeyHeader()
      if (apikey) {
        User.setApiKeyHeader(apikey)
      }
      User.getStatus().then((getStatusResponse) => {
        userTransfer(event, toState, fromState)
      }, (getStatusError) => {
        userTransfer(event, toState, fromState)
      })
    }

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      $log.error(error)
    })

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, error) {
      validateUserAccess(event, toState, fromState)
    })
  }

  function configFunction($urlRouterProvider, $httpProvider, $stateProvider, $resourceProvider, $translateProvider,
                          $locationProvider, $animateProvider, tmhDynamicLocaleProvider, UserProvider, UserRolesProvider, CommonConfigProvider) {

    $httpProvider.defaults.withCredentials = true

    $animateProvider.classNameFilter(/animation/)

    UserRolesProvider.setRoles(['anon', 'user', 'manager', 'admin'])
    UserRolesProvider.setAccessLevels({
      public: '*',
      anon: ['anon'],
      userOnly: ['user'],
      user: ['user', 'manager', 'admin'],
      managerOnly: ['manager'],
      manager: ['manager', 'admin'],
      admin: ['admin']
    })

    UserProvider.setApi('baseUrl', CommonConfigProvider.getAllData().urls.backend)

    $stateProvider.state('app', {
      url: '',
      abstract: true,
      controller: 'AppController',
      templateUrl: 'templates/app.tpl.html',
      data: {
        pageTitle: 'PAGE_TITLE.BASE'
      },
      resolve: {
        typeKit: ($q, $timeout) => {
          /* istanbul ignore next */
          let deferred = $q.defer()
          /* istanbul ignore next */
          let backupTimer = $timeout(() => {
            deferred.resolve()
          })
          /* istanbul ignore next */
          let config = {
              kitId: 'gxk2sou',
              scriptTimeout: 3000,
              async: true,
              active: function() {
                deferred.resolve()
                $timeout.cancel(backupTimer)
              }
            },
          /* istanbul ignore next */
            h = document.documentElement, t = setTimeout(() => {
              h.className = h.className.replace(/\bwf-loading\b/g, '') + ' wf-inactive'
            }, config.scriptTimeout), tk = document.createElement('script'), f = false, s = document.getElementsByTagName('script')[0], a
          /* istanbul ignore next */
          h.className += ' wf-loading'
          /* istanbul ignore next */
          tk.src = 'https://use.typekit.net/' + config.kitId + '.js'
          /* istanbul ignore next */
          tk.async = true
          /* istanbul ignore next */
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
          /* istanbul ignore next */
          s.parentNode.insertBefore(tk, s)
          /* istanbul ignore next */
          return deferred.promise
        },
        session: (User) => {
          /* istanbul ignore next */
          return User.getStatus()
        }
      }
    })
    $urlRouterProvider
      .when('', '/')
      .when('/', '/home')
      .otherwise('/home')

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
      'en-en': 'en-us',
      'en': 'en-us', // NOTE: change/remove if international version will be added
      'pl_PL': 'pl-pl',
      'pl': 'pl-pl'
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
    'commonConfig',

    // services
    'profitelo.services.interfaceLanguage',
    'profitelo.services.customTranslationHandler',
    // controllers
    'profitelo.controller.dashboard',
    'profitelo.controller.dashboard.start',

    'profitelo.controller.dashboard.service-provider',
    'profitelo.controller.dashboard.service-provider.choose-path',
    'profitelo.controller.dashboard.service-provider.individual-path',
    'profitelo.controller.dashboard.service-provider.company-path',
    'profitelo.controller.dashboard.service-provider.consultation-range',
    'profitelo.controller.dashboard.service-provider.summary',
    'profitelo.controller.home',
    'profitelo.controller.login',
    'profitelo.controller.login.account',
    'profitelo.controller.login.register',
    'profitelo.controller.login.forgot-password',
    'profitelo.controller.login.set-new-password',
    'profitelo.controller.login.confirm-email',


    // directives
    'profitelo.directives.pro-top-waiting-loader',
    'profitelo.directives.pro-top-alert-service',
    'profitelo.directives.page-title',

    // translations
    'profitelo.translations.en-us',
    'profitelo.translations.pl-pl'

  ])
  .run(runFunction)
  .config(configFunction)
  .controller('AppController', AppController)
  .constant('apiUrl', 'http://api.dev.profitelo.pl')

}())
