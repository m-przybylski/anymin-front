(function() {
  function proTopNavbar(searchService) {

    function linkFunction(scope, elem, attrs) {


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
        loggedIn: '=?',
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
