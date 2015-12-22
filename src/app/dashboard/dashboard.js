'use strict';

angular.module('profitelo.controller.dashboard', ['ui.router']).config(["$stateProvider", function ($stateProvider) {
  $stateProvider.state('app.dashboard', {
    abstract: true,
    controllerAs: 'vm',
    url: '/dashboard',
    templateUrl: 'dashboard/dashboard.tpl.html',
    controller: 'DashboardController'
  });
}]).controller('DashboardController', DashboardController);

var DashboardController = () => {
  console.log("It's WORKING!");


}