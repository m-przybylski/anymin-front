(function() {
  function proTopNavbar(searchService) {

    function linkFunction(scope, elem, attrs) {


      scope.menuElements = [
        {
          label: 'Strona Główna',
          link: 'app.home'
        },
        {
          label: 'O serwisie',
          link: 'app.home'
        },
        {
          label: 'Dla eksperta',
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
        showSearch: '=?'
      }

    }

  }

  angular.module('profitelo.directives.pro-top-navbar', [
    'pascalprecht.translate',
    'profitelo.services.search'
  ])
  .directive('proTopNavbar', proTopNavbar)

}())
