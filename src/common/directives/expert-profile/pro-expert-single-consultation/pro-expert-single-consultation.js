(function() {
  function directive(callService, HelperService) {

    function linkFunction(scope, elem, attrs) {

      scope.startCall = () => {
        callService.callServiceId(scope.service.id)
      }

      scope.tags = scope.service.tags

      scope.companyImage = !!scope.service.ownerProfile.organizationDetails && scope.service.ownerProfile.organizationDetails.logo !== null ?
        HelperService.fileUrlResolver(scope.service.ownerProfile.organizationDetails.logo) : ''

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
    'profitelo.services.helper',
    'profitelo.components.interface.collapse-tab'
  ])
  .directive('proExpertSingleConsultation', directive)

}())
