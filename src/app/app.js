(function() {
  function AppController($rootScope, $state, $filter, InterfaceLanguageService, User, proTopAlertService) {

    InterfaceLanguageService.setLanguage(InterfaceLanguageService.getStartupLanguage())

    this.isPending = false

    if (typeof lastCommitMessage !== 'undefined') {
      $rootScope.gitCommit = lastCommitMessage
    }

    this.logout = (targetState = 'app.login.account') => {

      let action = () => {
        this.isPending = false
        $rootScope.loggedIn = false
        proTopAlertService.success({
          message: $filter('translate')('LOGIN.SUCCESSFUL_LOGOUT'),
          timeout: 2
        })
        $state.go(targetState)
      }

      if (!this.isPending) {
        this.isPending = true
        User.logout().then(action, action)
      }
    }

    return this
  }

  function runFunction($rootScope, $log, $state, User, proTopAlertService) {

    $rootScope.loggedIn = false

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
        const user = User.getAllData()
        if (angular.isDefined(user.id)) {
          if (angular.isDefined(user.hasPassword) && !user.hasPassword) {
            if (toState.name.startsWith('app.dashboard')) {
              $state.go('app.post-register.set-password')
            }
          } else if ((angular.isDefined(user.email) && !user.email) &&
            (angular.isDefined(user.unverifiedEmail) && !user.unverifiedEmail)) {
            if (toState.name.startsWith('app.dashboard')) {
              $state.go('app.post-register.set-email')
            }
          }
        }
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

      User.getStatus().then((session) => {
        userTransfer(event, toState, fromState)
      }, (getStatusError) => {
        userTransfer(event, toState, fromState)
      })
    }

    $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
      $log.error(error)
    })

    $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams, error) => {
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
      controllerAs: 'appController',
      templateUrl: 'templates/app.tpl.html',
      data: {
        pageTitle: 'PAGE_TITLE.BASE'
      },
      resolve: {
        session: ($rootScope, $q, User) => {
          /* istanbul ignore next */
          return User.getStatus().then((response)=> {
            /* istanbul ignore next */
            if (angular.isDefined(response.status) && response.status !== 401) {
              $rootScope.loggedIn = true
            }
            /* istanbul ignore next */
            return $q.resolve()
          })
        },
        browserType: () => {
          if (navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode === true) {
            document.querySelector('body').classList.add('is-ie')
          }
          return true
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
    'profitelo.services.search-url',

    // controllers
    'profitelo.controller.dashboard',
    'profitelo.controller.dashboard.start',
    'profitelo.controller.dashboard.invitation',

    'profitelo.controller.dashboard.service-provider',
    'profitelo.controller.dashboard.service-provider.choose-path',
    'profitelo.controller.dashboard.service-provider.individual-path',
    'profitelo.controller.dashboard.service-provider.company-path',
    'profitelo.controller.dashboard.service-provider.consultation-range',
    'profitelo.controller.dashboard.service-provider.consultation-range.individual',
    'profitelo.controller.dashboard.service-provider.consultation-range.company',
    'profitelo.controller.dashboard.service-provider.summary',
    'profitelo.controller.dashboard.service-provider.summary.company',
    'profitelo.controller.dashboard.service-provider.summary.individual',
    'profitelo.controller.home',
    'profitelo.controller.expert-profile',
    'profitelo.controller.company-profile',
    'profitelo.controller.login',
    'profitelo.controller.login.account',
    'profitelo.controller.login.register',
    'profitelo.controller.login.forgot-password',
    'profitelo.controller.login.set-new-password',
    'profitelo.controller.login.confirm-email',
    'profitelo.controller.search-result',
    'profitelo.controller.consultations-field',
    'profitelo.controller.dashboard.charge-account',
    'profitelo.controller.dashboard.payments-thank-you-page',
    'profitelo.controller.post-register',
    'profitelo.controller.post-register.set-password',
    'profitelo.controller.post-register.set-email',

    // directives
    'profitelo.directives.pro-top-waiting-loader',
    'profitelo.directives.pro-top-alert-service',
    'profitelo.directives.page-title',
    'profitelo.directives.pro-masonry',

    // components
    'profitelo.components.communicator.pro-bottom-communicator',
    'profitelo.components.interface.preloader-container',

    // translations
    'profitelo.translations.en-us',
    'profitelo.translations.pl-pl'

  ])
    .run(runFunction)
    .config(configFunction)
    .controller('AppController', AppController)
    .factory('apiUrl', (CommonConfig) => {
      return CommonConfig.getAllData().urls.backend
    })
}())