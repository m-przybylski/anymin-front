(function() {
  function proExpertSingleConsultation() {

    return {
      templateUrl: 'directives/expert-profile/pro-expert-single-consultation/pro-expert-single-consultation.tpl.html',
      restrict: 'E',
      replace: true,
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

  angular.module('profitelo.directives.expert-profile.pro-expert-single-consultation', [])
  .directive('proExpertSingleConsultation', proExpertSingleConsultation)

}())
