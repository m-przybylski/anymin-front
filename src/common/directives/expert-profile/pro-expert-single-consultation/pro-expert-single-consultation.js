(function() {
  function proExpertSingleConsultation() {

    return {
      templateUrl: 'directives/expert-profile/pro-expert-single-consultation.sass/pro-expert-single-consultation.sass.tpl.html',
      restrict: 'E',
      replace: true,
      scope: {
        name: '=?',
        satisfaction: '@',
        talks: '@',
        timeAverage: '@',
        minuteCost: '=?',
        tags: '=?',
        type: '=',
        consultants: '='
      }
    }
  }

  angular.module('profitelo.directives.expert-profile.pro-expert-single-consultation', [])
  .directive('proExpertSingleConsultation', proExpertSingleConsultation)

}())
