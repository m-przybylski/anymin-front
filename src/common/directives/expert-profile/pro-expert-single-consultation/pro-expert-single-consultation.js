(function() {
  function proExpertSingleConsultation(callService) {

    function linkFunction(scope, elem, attrs) {
      scope.initCall = () => {
        callService.callServiceId(scope.service.id)
      }
      scope.tags = scope.service.details.tags
      // Mock data:
      scope.consultation = {}
      scope.consultation.satisfaction = Math.floor((Math.random() * 100) + 1)
      scope.consultation.timeAverage = Math.floor((Math.random() * 10) + 1)
      scope.consultation.talks = Math.floor((Math.random() * 1000) + 1)
    }

    return {
      templateUrl: 'directives/expert-profile/pro-expert-single-consultation/pro-expert-single-consultation.tpl.html',
      restrict: 'E',
      replace: true,
      link: linkFunction,
      scope: {
        service: '=?',
        satisfaction: '@',
        talks: '@',
        timeAverage: '@',
        consultants: '=?'
      }
    }
  }

  angular.module('profitelo.directives.expert-profile.pro-expert-single-consultation', [
    'profitelo.components.pro-summary-tag',
    'profitelo.services.call',
    'profitelo.components.interface.collapse-tab',
    'profitelo.filters.money',
  ])
  .directive('proExpertSingleConsultation', proExpertSingleConsultation)

}())
