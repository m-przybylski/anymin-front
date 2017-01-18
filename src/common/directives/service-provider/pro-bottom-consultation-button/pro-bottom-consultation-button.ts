(function() {
  function proBottomConsultationButton() {

    function linkFunction(scope) {
      scope.onClick = () => {
        scope.buttonAction()
      }
    }

    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-bottom-consultation-button/pro-bottom-consultation-button.tpl.html',
      scope: {
        queue: '=',
        order: '=?',
        buttonAction: '=',
        buttonLabel: '@'
      },
      link: linkFunction,
      controller: 'ServiceProviderStepController'
    }
  }


  angular.module('profitelo.directives.service-provider.pro-bottom-consultation-button', [
    'ngLodash',
    'pascalprecht.translate',
    'profitelo.common.controller.service-provider.service-provider-step-controller'
  ])
  .directive('proBottomConsultationButton', proBottomConsultationButton)
}())
