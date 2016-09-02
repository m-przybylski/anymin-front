(function() {
  function dashboardLeftMenu($window) {


    function linkFunction(scope) {
      let myScrollbarChoices

      scope.activeMenuSection = -1

      scope.showNavMenu = {}
      scope.windowSize = $window.innerWidth
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
          label: 'NAVIGATION.MEET_US',
          link: 'app.home'
        },
        {
          label: 'NAVIGATION.HOW_IT_WORKS',
          link: 'app.home'
        },
        {
          label: 'NAVIGATION.FOR_EXPERTS',
          link: 'app.home'
        },
        {
          label: 'NAVIGATION.HELP',
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

      /* istanbul ignore next */
      angular.element($window).on('resize', (window)=> {
        scope.windowSize = $window.innerWidth
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
      scope: {
        animateSidebar: '=?'
      },
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.dashboard.dashboard-left-menu', [
    'pascalprecht.translate'
  ])
    .directive('dashboardLeftMenu', dashboardLeftMenu)

}())
