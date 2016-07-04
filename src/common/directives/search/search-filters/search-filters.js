(function() {
  function searchFilter() {
    function linkFunction(scope, element, attrs) {
      scope.lang = [
        'Polish'
      ]

      scope.switcherModel = true

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
    'profitelo.directives.interface.pro-dropdown',
    'profitelo.directives.interface.pro-slider',
    'rzModule',
    'profitelo.directives.pro-tags-slider',
    'profitelo.directives.interface.pro-switcher'
  ])
    .directive('searchFilter', searchFilter)
}())
