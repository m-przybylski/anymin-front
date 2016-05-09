(function() {
  function proBottomSummaryRow($q) {
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-bottom-summary-row/pro-bottom-summary-row.tpl.html',
      scope: {
        proModel: '=',
        width: '=',
      },
    }
  }

  angular.module('profitelo.directives.service-provider.pro-bottom-summary-row', [
    'lodash',
    'pascalprecht.translate',
    'profitelo.services.wizardSectionControl'
  ])
  .directive('proBottomSummaryRow', proBottomSummaryRow)
}())
