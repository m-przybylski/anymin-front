namespace profitelo.directives.serviceProvider.proBottomConsultationButton {
  function proBottomConsultationButton() {

    function linkFunction(scope: any) {
      scope.onClick = () => {
        scope.buttonAction()
      }
    }

    return {
      replace: true,
      restrict: 'E',
      template: require('./pro-bottom-consultation-button.jade')(),
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
}
