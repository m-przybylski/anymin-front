angular.module('profitelo.controller.home', [
  'ui.router',

  // test dependency
  'profitelo.services.rest.account'
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

function HomeController(AccountRestService) {
  var vm = this;
  // example GET method
  AccountRestService.get();


  return vm;

}
