angular.module('profitelo.controller.login', [
    'ui.router'
  ])
  .config(($stateProvider) => {
    $stateProvider.state('app.login', {
      url: '/login',
      controllerAs: 'vm',
      controller: 'LoginController',
      templateUrl: 'login/login.tpl.html'
    });
  })
  .controller('LoginController', LoginController);

function LoginController() {
  var vm = this;

  console.log('Expert Profile');

  return vm;

}
