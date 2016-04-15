(function() {

  function ForgotPasswordController(loginStateService) {

  }

  function config($stateProvider) {
    $stateProvider.state('app.login.forgot-password', {
      url: '/forgot-password',
      controllerAs: 'vm',
      controller: 'ForgotPasswordController',
      templateUrl: 'login/forgot-password/forgot-password.tpl.html'
    })
  }


  angular.module('profitelo.controller.login.forgot-password', [
    'ui.router',
    'profitelo.services.login-state'
  ])
  .config(config)
  .controller('ForgotPasswordController', ForgotPasswordController)

}())