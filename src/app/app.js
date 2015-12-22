var profiteloApp = angular.module('profitelo', [
    'templates-module',
    'profitelo.controller.dashboard',
    'profitelo.controller.home'
])


.config(($urlRouterProvider, $stateProvider) => {
    $stateProvider.state('app', {
        url: '',
        abstract: true,
        controller: 'AppController',
        templateUrl: 'templates/app.tpl.html',
    });
    $urlRouterProvider
        .when('', '/')
        .when('/', '/home')
        .otherwise('/404');})



.controller('AppController', ['$scope', ($scope) =>{


        
}]);

