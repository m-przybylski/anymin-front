(function() {
  function proTopNavbar($location, searchService) {

    function linkFunction(scope, elem, attrs) {

      scope.isHide = false

      scope.isDashboard = $location.url().indexOf('dashboard') !== -1

      scope.accounts = ['Konto Klienta', 'Konto Eksperta', 'Firma']
      scope.menuElements = [
        {
          label: 'Poznaj nas',
          link: 'app.home'
        },
        {
          label: 'Jak to działa?',
          link: 'app.home'
        },
        {
          label: 'Dla ekspertów',
          link: 'app.home'
        },
        {
          label: 'Pomoc',
          link: 'app.home'
        }
      ]



      scope.setShowSearch = () => {
        scope.showSearch = scope.showSearch !== true
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
        searchActive: '=?',
        searchPage: '=?'
      }

    }

  }

  angular.module('profitelo.directives.pro-top-navbar', [
    'pascalprecht.translate',
    'profitelo.services.search'
  ])
  .directive('proTopNavbar', proTopNavbar)

}())
