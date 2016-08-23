(function() {
  function dashboardLeftMenu() {


    function linkFunction(scope) {
      let myScrollbarChoices

      scope.activeMenuSection = -1

      scope.toggleActiveMenuSection = function(sectionId) {
        if (scope.activeMenuSection === sectionId) {
          scope.activeMenuSection = -1
        } else {
          scope.activeMenuSection = sectionId
        }
      }

      function _getScrollbarChoices() {
        if (!myScrollbarChoices) {
          myScrollbarChoices = $('.dashboard-left-menu')
        }
        return myScrollbarChoices

      }
      _getScrollbarChoices().perfectScrollbar('update')
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
