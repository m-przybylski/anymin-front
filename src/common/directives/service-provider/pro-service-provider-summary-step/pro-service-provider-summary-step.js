(function() {
  function proServiceProviderSummaryStep($q) {
    function linkFunction(scope) {

    }

    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-service-provider-summary-step/pro-service-provider-summary-step.tpl.html',
      scope: {
        name: '=',
        cost: '='
      },
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.service-provider.pro-service-provider-summary-step', [
    'lodash',
    'pascalprecht.translate'
  ])
  .directive('proServiceProviderSummaryStep', proServiceProviderSummaryStep)
}())
