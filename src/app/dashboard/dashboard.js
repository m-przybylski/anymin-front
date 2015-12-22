(() => {

  var module = angular.module('profitelo.controller.dashboard', ['ui.router']).config(["$stateProvider", function ($stateProvider) {
    $stateProvider.state('app.dashboard', {
      controllerAs: 'vm',
      url: '/dashboard',
      templateUrl: 'dashboard/dashboard.tpl.html',
      controller: 'DashboardController'
    });
  }]);

  var DashboardController = () => {
    console.log("It's WORKING!");

  };

  module.controller('DashboardController', DashboardController);


})();