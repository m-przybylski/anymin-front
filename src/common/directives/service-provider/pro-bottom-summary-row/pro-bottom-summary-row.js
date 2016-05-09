(function() {
  function proBottomSummaryRow($q) {

    function linkFunction(scope, element, attrs) {
      scope.model = {
        width: ''
      }
    }


    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-bottom-summary-row/pro-bottom-summary-row.tpl.html',
      scope: {
        queue:    '=',
        order:    '=?',
        proModel: '=',
        width: '=',
        trTitle: '@',
        trDesc: '@'
      },
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.service-provider.pro-bottom-summary-row', [
    'lodash',
    'pascalprecht.translate',
    'profitelo.services.wizardSectionControl'
  ])
  .directive('proBottomSummaryRow', proBottomSummaryRow)
}())
