(function() {

  function LoginController() {

    return this
  }


  function config($stateProvider: ng.ui.IStateProvider, UserRolesProvider: any) {
    $stateProvider.state('app.login', {
      abstract: true,
      url: '/login',
      controllerAs: 'vm',
      controller: 'LoginController',
      templateUrl: 'login/login.tpl.html',
      data : {
        access : UserRolesProvider.getAccessLevel('anon')
      }
    })
  }


  angular.module('profitelo.controller.login', [
    'ui.router',
    'c7s.ng.userAuth'
  ])
    .config(config)
    .controller('LoginController', LoginController)

}())
