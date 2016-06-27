(function() {
  function proServiceProviderSummaryStep() {

    function preCompileFunction(scope) {
      for (let consultation of scope.consultations) {
        if (consultation.invitations.length > 0) {
          consultation.invitationTags = consultation.invitations.map((invitation) => {
            return invitation.email
          })
        }
      }
    }

    function compileFunction() {
      return {
        pre: preCompileFunction
      }
    }
    
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-service-provider-summary-step/pro-service-provider-summary-step.tpl.html',
      transclude: true,
      compile: compileFunction,
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
    'profitelo.common.controller.service-provider.service-provider-step-controller',
    'profitelo.components.pro-summary-tag'
  ])
  .directive('proServiceProviderSummaryStep', proServiceProviderSummaryStep)
}())
