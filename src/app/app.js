angular.module('profitelo', [
    'templates-module',
    'profitelo.controller.dashboard',
    'profitelo.controller.home'
  ])
  .config(($urlRouterProvider, $stateProvider) => {
    $stateProvider.state('app', {
      url: '',
      abstract: true,
      controller: 'AppController',
      templateUrl: 'templates/app.tpl.html'
    });
    $urlRouterProvider
      .when('', '/')
      .when('/', '/home');
  })

  .controller('AppController', AppController);


function AppController($scope) {
  var vm = this;


  return vm;
}
