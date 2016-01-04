angular.module('profitelo.controller.home', [
  'ui.router',

  // test dependency
  'profitelo.api.accounts'
])
.config(($stateProvider) => {
  $stateProvider.state('app.home', {
    url: '/home',
    controllerAs: 'vm',
    controller: 'HomeController',
    templateUrl: 'home/home.tpl.html'
  })
})
.controller('HomeController', HomeController)

function HomeController(AccountsApi) {
  var vm = this
  // example GET method
  AccountsApi.get()

  return vm
}
