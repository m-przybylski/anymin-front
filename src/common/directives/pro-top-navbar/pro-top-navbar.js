(function() {
  function proTopNavbar($window, $state, $location, searchService, smoothScrolling) {

    function linkFunction(scope, elem, attrs) {

      scope.showUserMenu = false
      scope.showResponsiveMenu = false
      scope.animateCross = false
      scope.isDashboard = scope.showNavigationMenu
      scope.hamburgerClass = scope.sidebarStatus === true ? 'active-btn' : 'disactive-btn'
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
          scope.hamburgerClass = scope.sidebarStatus === true ? 'active-btn' : 'disactive-btn'
          scope.animateCross = scope.sidebarStatus === true
          scope.$digest()
        }
      })

      scope.sidebarAction = ()=> {
        if (typeof scope.sidebarHandler !== 'undefined') {
          scope.sidebarHandler()
        } else {
          scope.showResponsiveMenu = scope.showResponsiveMenu === false
        }
        scope.animateCross = scope.animateCross === false
        scope.showUserMenuOnClick = false
        scope.hamburgerClass = scope.hamburgerClass === 'disactive-btn' ? 'active-btn' : 'disactive-btn'
      }

      scope.setShowSearch = () => {
        const navbarSearchInput = elem.find('.search-bar-container .search-bar')[0]
        const searchInputOnPage = angular.element(document).find('.search-bar-container .search-bar')[1]

        if (!!searchInputOnPage) {
          smoothScrolling.simpleScrollTo(searchInputOnPage, true)
          searchInputOnPage.focus()
          scope.searchMaskActive = false

        } else {
          scope.showSearch = true
          scope.showUserMenuOnClick = false
          navbarSearchInput.focus()

          if (scope.showSearch && scope.sidebarStatus && scope.windowSize < 992 || scope.showResponsiveMenu) {
            scope.sidebarAction()
          }
        }
      }

      scope.setHideSearch = () => {
        const navbarSearchInput = elem.find('.search-bar-container .search-bar')[0]
        navbarSearchInput.blur()
        scope.showSearch = false
      }

      scope.hideOtherMenus = ()=> {
        if ((scope.showResponsiveMenu || scope.sidebarStatus) && scope.windowSize < 992) {
          scope.sidebarAction()
        }
      }

      searchService.onQueryParamsChange(scope, (params) => {
        if ($state.current.name === 'app.search-result') {
          scope.searchModel = params.q
        }
      })

      scope.searchAction = (search) => {
        if ($state.current.name !== 'app.search-result') {
          $state.go('app.search-result')
        } else if (angular.isDefined(angular.element('.search-bar-container').find('input:focus')[0])) {
          angular.element('.search-bar-container').find('input:focus')[0].blur()
        }

        if ($location.search()['q'] !== scope.searchModel) {
          searchService.setSearchQueryParams({q: scope.searchModel, tagId: null})
          $location.search('tagId', null)
        } else {
          searchService.setSearchQueryParams({q: scope.searchModel})
        }
      }

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
        showNavigationMenu: '=?',
        searchMaskActive: '=?'
      }

    }

  }

  angular.module('profitelo.directives.pro-top-navbar', [
    'pascalprecht.translate',
    'profitelo.services.search',
    'ui.router',
    'profitelo.directives.services.smooth-scrolling'
  ])
    .directive('proTopNavbar', proTopNavbar)

}())
