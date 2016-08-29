(function() {
  function dashboardLeftMenu($window, $filter) {


    function linkFunction(scope) {
      let myScrollbarChoices

      scope.activeMenuSection = -1

      scope.showNavMenu = {}
      scope.showNavMenu.value = $window.innerWidth < 992

      scope.toogleMenuWhenMouseLeave = function() {
        scope.activeMenuSection = -1
      }

      scope.toggleActiveMenuSection = function(sectionId) {
        if (scope.activeMenuSection === sectionId) {
          scope.activeMenuSection = -1
        } else {
          scope.activeMenuSection = sectionId
        }
      }

      scope.menuElements = [
        {
          label: $filter('translate')('NAVIGATION.MEET_US'),
          link: 'app.home'
        },
        {
          label: $filter('translate')('NAVIGATION.HOW_IT_WORKS'),
          link: 'app.home'
        },
        {
          label: $filter('translate')('NAVIGATION.FOR_EXPERTS'),
          link: 'app.home'
        },
        {
          label:  $filter('translate')('NAVIGATION.HELP'),
          link: 'app.home'
        }
      ]

      const checkWindowWidth = ()=> {
        if ($window.innerWidth < 992) {
          scope.showNavMenu.value = true
        } else {
          scope.showNavMenu.value = false
        }
      }

      angular.element($window).on('resize', (window)=> {
        checkWindowWidth()
        scope.$digest()
      })

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
