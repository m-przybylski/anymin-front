(function() {
  function proServiceProviderSummaryStep($q) {
    function linkFunction(scope) {

      scope.deleteConsultation = (id)=> {

      }
    }

    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-service-provider-summary-step/pro-service-provider-summary-step.tpl.html',
      scope: {
        name: '=',
        price: '=',
        tags: '=',
        id: '='
      },
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.service-provider.pro-service-provider-summary-step', [
    'lodash',
    'pascalprecht.translate',
    'profitelo.common.controller.service-provider.service-provider-step-controller'
  ])
  .directive('proServiceProviderSummaryStep', proServiceProviderSummaryStep)
}())
