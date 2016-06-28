(function() {
  function dashboardLeftMenu() {

    return {
      templateUrl: 'directives/dashboard/dashboard-left-menu/dashboard-left-menu.tpl.html',
      restrict: 'E',
      replace: true
    }
  }

  angular.module('profitelo.directives.dashboard.dashboard-left-menu', [])
    .directive('dashboardLeftMenu', dashboardLeftMenu)

}())
