(function() {
  function proTopTitleRow($q) {
    function linkFunction(scope) {
    }
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-top-title-row/pro-top-title-row.tpl.html',
      scope: {
        title: '='
      },
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.service-provider.pro-top-title-row', [
    'lodash',
    'pascalprecht.translate'
  ])
  .directive('proTopTitleRow', proTopTitleRow)
}())
