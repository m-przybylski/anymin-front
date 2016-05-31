(function() {
  function proServiceProviderSummaryHead($q) {

    function linkFunction(scope) {

    }

    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-service-provider-summary-head/pro-service-provider-summary-head.tpl.html',
      scope: {
        title: '=?'
      },
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.service-provider.pro-service-provider-summary-head', [
    'lodash',
    'pascalprecht.translate'
  ])
  .directive('proServiceProviderSummaryHead', proServiceProviderSummaryHead)
}())
