(function() {
  function AppController($scope, $rootScope, InterfaceLanguageService) {
    var vm = this

    InterfaceLanguageService.setLanguage(InterfaceLanguageService.getStartupLanguage())
    if (typeof lastCommitMessage !== 'undefined') {
      $rootScope.gitCommit = lastCommitMessage
    }
    
    return vm
  }

  function runFunction($rootScope, $cookies, AuthorizationService, UserService) {


    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      console.log('$stateChangeError', 'event:', event, ' toState', toState, 'toParams', toParams, ' fromState', fromState, ' fromParams', fromParams, ' error:', error)
    })

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, error) {

    })
  }

  function configFunction($urlRouterProvider, $httpProvider, $stateProvider, $resourceProvider, $translateProvider, $locationProvider, tmhDynamicLocaleProvider, toastrConfig, UserProvider, UserRolesProvider, apiUrl) {

    $httpProvider.defaults.withCredentials = true

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
        typeKit: ($q) => {

          var deferred = $q.defer()

          let config = {
              kitId: 'gxk2sou',
              scriptTimeout: 3000,
              async: true,
              active: function() {
                deferred.resolve()
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
              deferred.reject(e)
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
    'angularMoment',
    'tmh.dynamicLocale',
    'ngAnimate',
    'ngMessages',
    'ngCookies',
    'toastr',  // some parts depends on ngAnimate
    'hellojs',
    'ui.mask',
    'c7s.ng.userAuth',


    // modules
    'profitelo.modules.authorization',
    'templates-module',

    // services
    'profitelo.services.user',
    'profitelo.services.customTranslationHandler',
    'profitelo.services.wizardSectionControl',
    'profitelo.services.interfaceLanguage',
    'profitelo.directives.pro-top-waiting-loader-service',
    'profitelo.directives.pro-top-alert-service',

    // controllers
    'profitelo.controller.dashboard',
    'profitelo.controller.dashboard.start',
    'profitelo.controller.dashboard.create-profile',

    'profitelo.controller.home',
    'profitelo.controller.expert-profile',
    'profitelo.controller.expert-progress',
    'profitelo.controller.login',
    'profitelo.controller.login.account',
    'profitelo.controller.login.register',
    'profitelo.controller.login.forgot-password',
    'profitelo.controller.login.set-new-password',
    'profitelo.controller.wizards',
    'profitelo.controller.wizards.create-new-service',


    // directives
    'profitelo.directives.pro-registration',
    'profitelo.directives.pro-registration-input-email',
    'profitelo.directives.pro-registration-input-pass',
    'profitelo.directives.pro-login',
    'profitelo.directives.pro-expert-progress',
    'profitelo.directives.pro-progress-box',
    'profitelo.directives.pro-progress-bar',
    'profitelo.directives.pro-expert-profile',
    'profitelo.directives.pro-top-waiting-loader',
    'profitelo.directives.password-strength-bar',

    // directives - interface
    'profitelo.directives.interface.pro-input',
    'profitelo.directives.interface.pro-dropdown',
    'profitelo.directives.interface.pro-input-password',
    'profitelo.directives.interface.pro-calendar',
    'profitelo.directives.interface.pro-uploader',
    'profitelo.directives.interface.pro-alert',
    'profitelo.directives.interface.pro-checkbox',

    // rest
    'profitelo.api.accounts',
    'profitelo.api.registration',
    'profitelo.api.session',
    'profitelo.api.industry',
    'profitelo.api.categories',

    // translations
    'profitelo.translations.en-us',
    'profitelo.translations.pl-pl'

  ])
  .run(runFunction)
  .config(configFunction)
  .controller('AppController', AppController)
  .constant('apiUrl', 'http://api.dev.profitelo.pl')

}())
