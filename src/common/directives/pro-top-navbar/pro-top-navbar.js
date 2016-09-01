(function() {
  function proTopNavbar($window, searchService) {

    function linkFunction(scope, elem, attrs) {

      scope.isHide = false
      scope.showUserMenu = false
      scope.showResponsiveMenu = false
      scope.isDashboard = scope.showNavigationMenu
      scope.hamburgerClass = scope.sidebarStatus ===  true ? 'active-btn' : 'disactive-btn'
      scope.accounts = ['Konto Klienta', 'Konto Eksperta', 'Firma']
      scope.windowSize = $window.innerWidth
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

      scope.searchModel = null
      
      scope.logout = ()=> {
        scope.logoutAction()
      }

      /* istanbul ignore next */
      angular.element($window).on('resize', (window)=> {
        scope.windowSize = $window.innerWidth
        if (angular.isDefined(scope.sidebarStatus)) {
          scope.hamburgerClass = scope.sidebarStatus ===  true ? 'active-btn' : 'disactive-btn'
          scope.$digest()
        }
      })
      
      scope.sidebarAction = ()=> {
        if (typeof scope.sidebarHandler !== 'undefined') {
          scope.sidebarHandler()
        }
        else {
          scope.showResponsiveMenu = scope.showResponsiveMenu === false
        }
        scope.showUserMenuOnClick = false
        scope.hamburgerClass = scope.hamburgerClass ===  'disactive-btn' ? 'active-btn' : 'disactive-btn'
      }
      
      scope.setShowSearch = () => {
        scope.showSearch = scope.showSearch !== true
        scope.showUserMenuOnClick = false
        if (scope.showSearch && scope.sidebarStatus || scope.showResponsiveMenu) {
          scope.sidebarAction()
        }
      }

      scope.hideOtherMenus = ()=> {
        if (scope.showResponsiveMenu || scope.sidebarStatus) {
          scope.sidebarAction()
        }
      }
      
      searchService.onQueryParamsChange(scope, (params) => {
        scope.searchModel = params.q
      })

      scope.$watch(() => {
        return scope.searchModel
      }, (newValue) => {
        searchService.setSearchQueryParams({q: newValue})
      })

    }

    return {
      templateUrl: 'directives/pro-top-navbar/pro-top-navbar.tpl.html',
      restrict: 'E',
      replace: true,
      link: linkFunction,
      scope: {
        showSearch: '=?',
        isHide: '=?',
        sidebarStatus: '=?',
        logoutAction: '=?',
        sidebarHandler: '=?',
        isExpert: '=?',
        showResponsiveMenu: '=?',
        showNavigationMenu: '=?'
      }

    }

  }

  angular.module('profitelo.directives.pro-top-navbar', [
    'pascalprecht.translate',
    'profitelo.services.search'
  ])
  .directive('proTopNavbar', proTopNavbar)

}())
