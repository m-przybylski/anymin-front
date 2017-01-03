(function() {
  function directive(callService, HelperService) {

    function linkFunction(scope, elem, attrs) {

      scope.startCall = () => {
        callService.callServiceId(scope.serviceTagsEmployeesTuple.service.id)
      }

      scope.tags = scope.serviceTagsEmployeesTuple.tags

      scope.companyImage = !!scope.serviceTagsEmployeesTuple.ownerProfile.organizationDetails
        && scope.serviceTagsEmployeesTuple.ownerProfile.organizationDetails.logo !== null ?
        HelperService.fileUrlResolver(scope.serviceTagsEmployeesTuple.ownerProfile.organizationDetails.logo) : ''

      scope.consultation = {}

      scope.consultation.timeAverage = Math.floor((Math.random() * 10) + 1)
    }

    return {
      templateUrl: 'directives/expert-profile/pro-expert-single-consultation/pro-expert-single-consultation.tpl.html',
      restrict: 'E',
      replace: true,
      link: linkFunction,
      scope: {
        serviceTagsEmployeesTuple: '=?'
      }
    }
  }

  angular.module('profitelo.directives.expert-profile.pro-expert-single-consultation', [
    'profitelo.components.pro-summary-tag',
    'profitelo.services.call',
    'profitelo.filters.money',
    'profitelo.services.helper',
    'profitelo.components.interface.collapse-tab'
  ])
  .directive('proExpertSingleConsultation', directive)

}())
