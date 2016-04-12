(function() {

  function ForgotPasswordController() {

  }

  function config($stateProvider) {
    $stateProvider.state('app.login.forgot-password', {
      url: '/forgot-password/:token',
      controllerAs: 'vm',
      controller: 'ForgotPasswordController',
      templateUrl: 'login/forgot-password/forgot-password.tpl.html'
    })
  }


  angular.module('profitelo.controller.login.forgot-password', [
    'ui.router'
  ])
  .config(config)
  .controller('ForgotPasswordController', ForgotPasswordController)

}())