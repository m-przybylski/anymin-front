(function() {
  function dashboardLeftMenu() {
    function linkFunction() {
      let myScrollbarChoices

      function _getScrollbarChoices() {
        if (!myScrollbarChoices) {
          myScrollbarChoices = $('.dashboard-left-menu')
        }
        return myScrollbarChoices
      }

      _getScrollbarChoices().perfectScrollbar()
    }

    return {
      templateUrl: 'directives/dashboard/dashboard-left-menu/dashboard-left-menu.tpl.html',
      restrict: 'E',
      replace: true,
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.dashboard.dashboard-left-menu', [])
    .directive('dashboardLeftMenu', dashboardLeftMenu)

}())
