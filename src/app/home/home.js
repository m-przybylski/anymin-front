angular.module('profitelo.controller.home', [
  'ui.router',

  // test dependency
  'profitelo.services.rest.accounts'
])
.config(($stateProvider) => {
  $stateProvider.state('app.home', {
    url: '/home',
    controllerAs: 'vm',
    controller: 'HomeController',
    templateUrl: 'home/home.tpl.html'
  });
})
.controller('HomeController', HomeController);

function HomeController(AccountsRestService) {
  var vm = this;
  // example GET method
  AccountsRestService.get();

  return vm;
}
