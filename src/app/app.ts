namespace profitelo.app {

  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  import IFilterService = profitelo.services.filter.IFilterService
  import IInterfaceLanguageService = profitelo.services.interfaceLanguage.IInterfaceLanguageService
  import ICommunicatorService = profitelo.services.communicator.ICommunicatorService
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService

  declare const Raven: any

  // TODO: replace it with custom logging
  try { // fix unit tests window problem
    if (window.location.host.includes('stage')) {
      Raven
        .config('https://8ba058291ca44938bc6c2c9de13434d6@sentry.io/136454')
        .addPlugin(Raven.Plugins.Angular, angular)
        .install()
      console.log("Sentry logs enabled")
    } else {
      console.log("Sentry logs disabled")
    }
  } catch (e) {}

  function AppController($rootScope: IRootScopeService, $state: ng.ui.IStateService, $filter: IFilterService,
                         InterfaceLanguageService: IInterfaceLanguageService, User: any, topAlertService: ITopAlertService) {

    InterfaceLanguageService.setLanguage(InterfaceLanguageService.getStartupLanguage())

    this.isPending = false

    this.logout = (targetState = 'app.login.account') => {

      let action = () => {
        this.isPending = false
        $rootScope.loggedIn = false
        topAlertService.success({
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

    this.$onInit = () => {
    }

    return this
  }

  function runFunction($rootScope: IRootScopeService, $log: ng.ILogService, $state: ng.ui.IStateService,
                       $anchorScroll: ng.IAnchorScrollService, User: any, topAlertService: ITopAlertService) {

    $rootScope.loggedIn = false

    $rootScope.$on('$locationChangeSuccess', () => {
      $anchorScroll()
    })

    $rootScope.$on('$stateChangeError', (event, _toState, _toParams, _fromState, _fromParams, error) => {
      event.preventDefault()
      (<any>$state.get('app.error')).error = error
      return $state.go('app.error', undefined, {
        location: false
      })
    })

    function userTransfer(event: ng.IAngularEvent, toState: ng.ui.IState, fromState: ng.ui.IState) {
      let pac = User.pageAccessCheck(event, toState)

      switch (pac.code) {
        case 'x401':
          event.preventDefault()
          topAlertService.error({
            message: pac.msg,
            header: 'Page redirect',
            timeout: 3
          })
          $state.go('app.login.account')
          break
        case 'x403':
          event.preventDefault()
          topAlertService.error({
            message: pac.msg,
            header: 'Access forbidden',
            timeout: 3
          })
          if (fromState.name && fromState.name !== '') {
            $state.go(fromState.name)
          } else {
            $state.go('app.home')
          }
          break
        case 'x200':
          const user = User.getAllData()
          if (angular.isDefined(user.id)) {
            if (angular.isDefined(user.hasPassword) && !user.hasPassword && toState.name) {
              if (toState.name.startsWith('app.dashboard')) {
                $state.go('app.post-register.set-password')
              }
            } else if ((angular.isDefined(user.email) && !user.email) &&
              (angular.isDefined(user.unverifiedEmail) && !user.unverifiedEmail) && toState.name) {
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
    function validateUserAccess(event: ng.IAngularEvent, toState: ng.ui.IState, fromState: ng.ui.IState) {
      let apikey = User.getApiKeyHeader()
      if (apikey) {
        User.setApiKeyHeader(apikey)
      }

      User.getStatus().then((_session: any) => {
        userTransfer(event, toState, fromState)
      }, (_getStatusError: any) => {
        userTransfer(event, toState, fromState)
      })
    }

    $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
      $log.error(error, fromState, fromParams, toState, toParams, event)
    })

    $rootScope.$on('$stateChangeStart', (event, toState: string, _toParams: Object, fromState: string, _fromParams: Object, _error: any) => {
      validateUserAccess(event, toState, fromState)
    })
  }

  function configFunction($urlRouterProvider: ng.ui.IUrlRouterProvider, $httpProvider: ng.IHttpProvider,
                          $stateProvider: ng.ui.IStateProvider,
                          $translateProvider: ng.translate.ITranslateProvider, $locationProvider: ng.ILocationProvider,
                          $animateProvider: ng.animate.IAnimateProvider,
                          tmhDynamicLocaleProvider: ng.dynamicLocale.tmhDynamicLocaleProvider, UserProvider: any,
                          UserRolesProvider: any, CommonConfigProvider: any) {


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
        session: ($rootScope: IRootScopeService, $q: ng.IQService, User: any, communicatorService: ICommunicatorService) => {
          /* istanbul ignore next */
          return User.getStatus().then((response: any) => {
            /* istanbul ignore next */
            if (angular.isDefined(response.status) && response.status !== 401) {
              $rootScope.loggedIn = true
              communicatorService.authenticate()
            }
            /* istanbul ignore next */
            return $q.resolve()
          }, () => {
            $rootScope.loggedIn = false
          })
        },
        browserType: () => {
          if (navigator.userAgent.indexOf('MSIE') !== -1) {
            document.querySelector('body')!.classList.add('is-ie')
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

    $translateProvider.useSanitizeValueStrategy('')

    // configure loading angular locales
    tmhDynamicLocaleProvider.localeLocationPattern('assets/angular-i18n/angular-locale_{{locale}}.js')
  }

  angular.module('profitelo', [
    'pascalprecht.translate',
    'tmh.dynamicLocale',
    'ngAnimate',
    'ngLodash',
    'c7s.ng.userAuth',

    // modules
    'templates-module',
    'commonConfig',

    // services
    'profitelo.services.interface-language',
    'profitelo.services.custom-translation-handler',
    'profitelo.services.search-url',
    'profitelo.services.profitelo-websocket',

    // controllers
    'profitelo.controller.dashboard',
    'profitelo.controller.dashboard.invitation',
    'profitelo.controller.dashboard.client',
    'profitelo.controller.dashboard.client.activities',
    'profitelo.controller.dashboard.client.favourites',

    'profitelo.controller.dashboard.settings',
    'profitelo.controller.dashboard.settings.general',
    'profitelo.controller.dashboard.settings.security',
    'profitelo.controller.dashboard.settings.payments',
    'profitelo.controller.dashboard.settings.payouts',

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
    'profitelo.components.interface.go-to-top',

    'profitelo.controller.error',

    // directives
    'profitelo.directives.pro-top-waiting-loader',
    'profitelo.directives.page-title',
    'profitelo.directives.pro-masonry',

    // components
    // 'profitelo.components.communicator.pro-bottom-communicator',
    'profitelo.components.communicator',
    'profitelo.components.interface.preloader-container',

    // translations
    'profitelo.translations.en-us',
    'profitelo.translations.pl-pl'

  ])
    .run(runFunction)
    .config(configFunction)
    .controller('AppController', AppController)
    .factory('apiUrl', (CommonConfig: ICommonConfig) => {
      return CommonConfig.getAllData().urls.backend
    })
}
