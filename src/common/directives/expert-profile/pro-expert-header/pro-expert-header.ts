namespace profitelo.directives.expertProfile.proExpertHeader {

  import IUrlService = profitelo.services.helper.IUrlService

  function proExpertHeader(urlService: IUrlService) {

    function linkFunction(scope: any, _element: ng.IRootElementService) {

      scope.handleUserImage = (imgToken: string) => {
        return imgToken !== null || imgToken === '' ? urlService.resolveFileUrl(imgToken) : ''
      }

      scope.checkCollaboratedExperts = () => {
        return scope.profile.type === 'company' || !scope.profile.colaboratedOrganizations
          || scope.profile.colaboratedOrganizations.length < 1
      }

    }

    return {
      templateUrl: 'directives/expert-profile/pro-expert-header/pro-expert-header.tpl.html',
      restrict: 'E',
      replace: true,
      link: linkFunction,
      scope: {
        profile: '=?',
        handleLike: '&'
      }
    }
  }

  angular.module('profitelo.directives.expert-profile.pro-expert-header', [
    'profitelo.components.interface.show-more-text',
    'profitelo.services.url'
  ])
    .directive('proExpertHeader', proExpertHeader)

}
