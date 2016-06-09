(function() {
  function proServiceProviderSummaryStep($q) {
    function linkFunction(scope) {

      scope.deleteConsultation = (id, index)=> {
        scope.deleteAction(id, index)
      }
      scope.editConsultation = (id)=> {
        scope.editAction(id)
      }

    }

    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-service-provider-summary-step/pro-service-provider-summary-step.tpl.html',
      scope: {
        consultations: '=',
        editAction: '=',
        deleteAction: '='
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
