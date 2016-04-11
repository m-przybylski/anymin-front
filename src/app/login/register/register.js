(function() {

  function RegisterController() {

  }

  function config($stateProvider) {
    $stateProvider.state('app.login.register', {
      url: '/register',
      controllerAs: 'vm',
      controller: 'RegisterController',
      templateUrl: 'login/register/register.tpl.html'
    })
  }


  angular.module('profitelo.controller.login.register', [
    'ui.router'
  ])
  .config(config)
  .controller('RegisterController', RegisterController)

}())