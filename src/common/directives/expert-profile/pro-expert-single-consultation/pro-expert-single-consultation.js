(function() {
  function proExpertSingleConsultation() {

    return {
      templateUrl: 'directives/expert-profile/pro-expert-single-consultation/pro-expert-single-consultation.tpl.html',
      restrict: 'E',
      replace: true,
      scope: {
        name: '=?',
        satisfaction: '@',
        talks: '@',
        timeAverage: '@',
        minuteCost: '=?',
        tags: '=?',
        positiveMark: '=',
        negativeMark: '='
      }

    }

  }

  angular.module('profitelo.directives.expert-profile.pro-expert-single-consultation', [])
  .directive('proExpertSingleConsultation', proExpertSingleConsultation)

}())
