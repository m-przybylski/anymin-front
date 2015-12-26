angular.module('profitelo', [
    'ngMessages',

    'templates-module',

    //modules
    'authorization',

    //controllers
    'profitelo.controller.dashboard',
    'profitelo.controller.home',
    'profitelo.controller.expert-profile',
    'profitelo.controller.expert-progress',

    'profitelo.controller.registration',
    //directives
    'profitelo.directive.registration',
    'profitelo.directive.expert-progress',

    //rest
    'profitelo.rest.account'

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
