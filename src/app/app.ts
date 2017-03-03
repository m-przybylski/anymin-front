namespace profitelo.app {

  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  import IFilterService = profitelo.services.filter.IFilterService
  import IInterfaceLanguageService = profitelo.services.interfaceLanguage.IInterfaceLanguageService
  import ICommunicatorService = profitelo.services.communicator.ICommunicatorService
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import ISessionService = profitelo.services.session.ISessionService
  import IPermissionService = profitelo.services.permission.IPermissionService

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
  } catch (e) {
  }

  function AppController($rootScope: IRootScopeService, $state: ng.ui.IStateService, $filter: IFilterService,
                         InterfaceLanguageService: IInterfaceLanguageService, sessionService: ISessionService,
                         topAlertService: ITopAlertService) {

    InterfaceLanguageService.setLanguage(InterfaceLanguageService.getStartupLanguage())

    this.isPending = false

    this.logout = (targetState = 'app.home') => {

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
        sessionService.logout().then(action, action)
      }
    }

    return this
  }

  function runFunction($rootScope: IRootScopeService, $log: ng.ILogService, permissionService: IPermissionService,
                       $anchorScroll: ng.IAnchorScrollService, sessionService: ISessionService,
                       $urlRouter: ng.ui.IUrlRouterService, communicatorService: ICommunicatorService,
                       $state: ng.ui.IStateService, topAlertService: ITopAlertService) {

    $rootScope.loggedIn = false

    // initialize all views permissions
    permissionService.initializeAll()

    // scrollup after every state change
    $rootScope.$on('$locationChangeSuccess', () => {
      $anchorScroll()
    })

    $rootScope.$on('$stateChangeError', (event, _toState, _toParams, _fromState, _fromParams, error) => {
      $log.error(error)
      event.preventDefault()
      topAlertService.error({
        message: 'error',
        timeout: 4
      })
    })

    $rootScope.$on('$stateChangePermissionDenied', (event, toState, _toParams, _options) => {
      event.preventDefault()
      $log.error('Permission to state', toState.name, 'DENIED')
      $state.go('app.home')
    })


    sessionService.getSession().then(() => {

      $urlRouter.listen()
      $urlRouter.sync()

      $rootScope.loggedIn = true
      communicatorService.authenticate()
    }, () => {
      $urlRouter.listen()
      $urlRouter.sync()

      $rootScope.loggedIn = false
    })

  }

  function configFunction($urlRouterProvider: ng.ui.IUrlRouterProvider, $httpProvider: ng.IHttpProvider,
                          $stateProvider: ng.ui.IStateProvider,
                          $translateProvider: ng.translate.ITranslateProvider, $locationProvider: ng.ILocationProvider,
                          $animateProvider: ng.animate.IAnimateProvider,
                          tmhDynamicLocaleProvider: ng.dynamicLocale.tmhDynamicLocaleProvider) {

    // disable routing until it is synced manually - for permission handling purpose (in run function)
    // https://github.com/Narzerus/angular-permission/wiki/Controlling-access-in-views
    $urlRouterProvider.deferIntercept()

    $urlRouterProvider
      .when('', '/')
      .when('/', '/home')
      .otherwise('/home')

    $httpProvider.defaults.withCredentials = true

    $animateProvider.classNameFilter(/animation/)

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
        browserType: () => {
          if (navigator.userAgent.indexOf('MSIE') !== -1) {
            document.querySelector('body')!.classList.add('is-ie')
          }
          return true
        }
      }
    })

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
    'ui.router',
    'permission',
    'permission.ui',

    // modules
    'templates-module',
    'commonConfig',

    // services
    'profitelo.services.interface-language',
    'profitelo.services.custom-translation-handler',
    'profitelo.services.search-url',
    'profitelo.services.profitelo-websocket',
    'profitelo.services.session',
    'profitelo.services.permission',

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
