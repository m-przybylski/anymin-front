angular.module('profitelo.controller.home', ['ui.router']).config(function($stateProvider) {
    $stateProvider.state('app.home', {
        url: '/home',
        controllerAs: 'vm',
        controller: 'HomeController',
        templateUrl: 'home/home.tpl.html'
    });
}).controller('HomeController', () => {
    var vm = this;
    console.log('here I EM');


    return vm;
});
