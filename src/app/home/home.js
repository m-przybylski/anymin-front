angular.module('profitelo.controller.home', [
    'ui.router'
  ])
  .config(function ($stateProvider) {
    $stateProvider.state('app.home', {
      url: '/home',
      controllerAs: 'vm',
      controller: 'HomeController',
      templateUrl: 'home/home.tpl.html'
    });
  })
  .controller('HomeController', HomeController);

function HomeController() {
  var vm = this;

  console.log('WOWOWO');

  console.log('no closure');

  return vm;

}
