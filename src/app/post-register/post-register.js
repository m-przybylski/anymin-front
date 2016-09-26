(function() {

  function _controller() {

    return this
  }

  function config($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.post-register', {
      url: '/post-register',
      controllerAs: 'vm',
      controller: 'PostRegisterController',
      templateUrl: 'post-register/post-register.tpl.html',
      abstract: true,
      data: {
        access: UserRolesProvider.getAccessLevel('user'),
        pageTitle: 'PAGE_TITLE.LOGIN.REGISTER'
      }
    })
  }

  angular.module('profitelo.controller.post-register', [
    'ui.router',
    'c7s.ng.userAuth',
    'profitelo.services.login-state',
    'profitelo.services.resolvers.app.login.register',
    'profitelo.swaggerResources',
    'profitelo.services.commonSettings',

    'profitelo.directives.password-strength-service',
    'profitelo.directives.pro-top-alert-service',
    'profitelo.directives.pro-top-waiting-loader-service',
    'profitelo.directives.interface.pro-checkbox',
    'profitelo.directives.interface.pro-alert',
    'profitelo.directives.interface.pro-input-password',
    'profitelo.directives.interface.pro-input',
    'profitelo.directives.password-strength-bar'
  ])
    .config(config)
    .controller('PostRegisterController', _controller)
}())