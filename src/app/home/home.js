angular.module('profitelo.controller.home', [
  'ui.router'
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

  return vm
}
