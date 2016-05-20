(function() {
  function proBottomSummaryRow($q) {

    function linkFunction(scope) {
      scope.onClick = () => {
        scope.buttonAction()
      }
    }

    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-bottom-summary-row/pro-bottom-summary-row.tpl.html',
      scope: {
        queue: '=',
        order: '=?',
        width: '=',
        buttonAction: '='
      },
      link: linkFunction,
      controller: 'ServiceProviderStepController'
    }
  }

  
  angular.module('profitelo.directives.service-provider.pro-bottom-summary-row', [
    'lodash',
    'pascalprecht.translate',
    'profitelo.common.controller.service-provider.service-provider-step-controller'
  ])
  .directive('proBottomSummaryRow', proBottomSummaryRow)
}())
