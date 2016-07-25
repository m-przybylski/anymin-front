(function() {
  function proExpertSingleConsultation(proRatelService) {

    function linkFunction(scope, elem, attrs) {
      scope.initCall = () => {
        proRatelService.startConversation(scope.service)
      }
    }
    
    return {
      templateUrl: 'directives/expert-profile/pro-expert-single-consultation/pro-expert-single-consultation.tpl.html',
      restrict: 'E',
      replace: true,
      link: linkFunction,
      scope: {
        service: '=',
        satisfaction: '@',
        talks: '@',
        timeAverage: '@',
        type: '=',
        consultants: '='
      }
    }
  }

  angular.module('profitelo.directives.expert-profile.pro-expert-single-consultation', [
    'profitelo.components.pro-summary-tag',
    'profitelo.services.pro-ratel-service'
  ])
  .directive('proExpertSingleConsultation', proExpertSingleConsultation)

}())
