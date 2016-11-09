(function() {
  function proExpertSingleConsultation(callService, HelperService) {

    function linkFunction(scope, elem, attrs) {
      scope.initCall = () => {
        callService.callServiceId(scope.service.id)
      }
      scope.tags = scope.service.details.tags

      scope.companyImage = !!scope.service.organizationDetails && scope.service.organizationDetails.logo !== null ?
        HelperService.fileUrlResolver(scope.service.organizationDetails.logo) : ''

      scope.consultation = {}
      scope.consultation.timeAverage = Math.floor((Math.random() * 10) + 1)
    }

    return {
      templateUrl: 'directives/expert-profile/pro-expert-single-consultation/pro-expert-single-consultation.tpl.html',
      restrict: 'E',
      replace: true,
      link: linkFunction,
      scope: {
        service: '=?'
      }
    }
  }

  angular.module('profitelo.directives.expert-profile.pro-expert-single-consultation', [
    'profitelo.components.pro-summary-tag',
    'profitelo.services.call',
    'profitelo.components.interface.collapse-tab'
  ])
  .directive('proExpertSingleConsultation', proExpertSingleConsultation)

}())
