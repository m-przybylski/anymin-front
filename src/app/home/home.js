angular.module('profitelo.controller.home', [
  'ui.router',
  'c7s.ng.userAuth'
])
.config(($stateProvider, UserRolesProvider) => {
  $stateProvider.state('app.home', {
    url: '/home',
    controllerAs: 'vm',
    controller: 'HomeController',
    templateUrl: 'home/home.tpl.html',
    data          : {
      access : UserRolesProvider.getAccessLevel('public'),
      pageTitle: 'PAGE_TITLE.HOME'
    }
  })
})
.controller('HomeController', HomeController)

function HomeController($scope) {
  var vm = this
  
  return vm
}
