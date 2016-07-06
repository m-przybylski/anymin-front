(function() {
  function searchFilter() {
    function linkFunction(scope, element, attrs) {

      scope.languagesList = [
        {
          name: 'polish'
        }
      ]

      scope.sortList = [
        {
          name: 'sort'
        }
      ]

      scope.categoryList = [
        {
          name: 'category'
        }
      ]

      scope.tagsAction = (id)=> {
        scope.tagClickAction(id)
      }

    }


    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/search/search-filters/search-filters.tpl.html',
      scope: {
        model: '=',
        tagClickAction: '='
      },
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.search.search-filter', [
    'profitelo.directives.interface.pro-dropdown',
    'profitelo.directives.interface.pro-range-slider',
    'rzModule',
    'pascalprecht.translate',
    'profitelo.directives.pro-tags-slider',
    'profitelo.directives.interface.pro-switcher'
  ])
    .directive('searchFilter', searchFilter)
}())
