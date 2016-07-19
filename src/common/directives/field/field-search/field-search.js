(function() {
  function fieldSearch() {
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
      templateUrl: 'directives/field/field-search/field-search.tpl.html',
      scope: {
        model: '=',
        tagClickAction: '='
      },
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.field.field-search', [
    // 'rzModule',
    'pascalprecht.translate',
    'profitelo.directives.pro-tags-slider',
    'profitelo.directives.interface.pro-switcher'
  ])
    .directive('fieldSearch', fieldSearch)
}())
