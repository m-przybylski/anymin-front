(function() {
  function proServiceProviderSummaryStep($q) {

    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-service-provider-summary-step/pro-service-provider-summary-step.tpl.html',
      transclude: true,
      scope: {
        consultations: '=',
        editAction: '=',
        deleteAction: '='
      },
      controller: 'ProServiceProviderSummaryController',
      controllerAs: 'vm'
    }
  }

  angular.module('profitelo.directives.service-provider.pro-service-provider-summary-step', [
    'profitelo.common.controller.service-provider.pro-service-provider-summary-controller',
    'lodash',
    'pascalprecht.translate',
    'profitelo.common.controller.service-provider.service-provider-step-controller'
  ])
  .directive('proServiceProviderSummaryStep', proServiceProviderSummaryStep)
}())
