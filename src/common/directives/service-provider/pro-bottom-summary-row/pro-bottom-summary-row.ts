import * as angular from "angular"
import "common/controllers/service-provider/service-provider-step-controller/service-provider-step-controller"

function proBottomSummaryRow() {

  function linkFunction(scope: any) {
    scope.onClick = () => {
      scope.buttonAction()
    }
  }

  return {
    replace: true,
    restrict: 'E',
    template: require('./pro-bottom-summary-row.jade')(),
    scope: {
      queue: '=',
      order: '=?',
      width: '=',
      buttonAction: '=',
      header: '@',
      showAllTime: '=?'
    },
    link: linkFunction,
    controller: 'ServiceProviderStepController'
  }
}


angular.module('profitelo.directives.service-provider.pro-bottom-summary-row', [
  'ngLodash',
  'pascalprecht.translate',
  'profitelo.common.controller.service-provider.service-provider-step-controller'
])
  .directive('proBottomSummaryRow', proBottomSummaryRow)
