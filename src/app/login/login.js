(function() {

  function LoginController() {
    var vm = this
    

    return vm
  }

  function config($stateProvider) {
    $stateProvider.state('app.login', {
      abstract: true,
      url: '/login',
      controllerAs: 'vm',
      controller: 'LoginController',
      templateUrl: 'login/login.tpl.html'
    })
  }


  angular.module('profitelo.controller.login', [
    'ui.router'
  ])
    .config(config)
    .controller('LoginController', LoginController)

}())