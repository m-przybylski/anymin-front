(function() {
  function searchFilter() {
    function linkFunction(scope, element, attrs) {
      scope.lang = [
        'Polish'
      ]

    }


    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/search/search-filters/search-filters.tpl.html',
      scope: {
      },
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.search.search-filters', [
    'profitelo.directives.interface.pro-dropdown'
  ])
    .directive('searchFilter', searchFilter)
}())
