(function () {

  function LoginController() {

    return this
  }


  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider.state('app.login', {
      abstract: true,
      url: '/login',
      controllerAs: 'vm',
      controller: 'LoginController',
      templateUrl: 'login/login.tpl.html',
      data: {
        permissions: {
          only: ['anon'],
          redirectTo: 'app.home'
        }
      }
    })
  }


  angular.module('profitelo.controller.login', [
    'ui.router',
    'permission',
    'permission.ui',
    'profitelo.services.session'
  ])
    .config(config)
    .controller('LoginController', LoginController)

}())
