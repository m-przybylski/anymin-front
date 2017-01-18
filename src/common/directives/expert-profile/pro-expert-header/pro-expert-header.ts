(function() {
  function proExpertHeader(helperService) {

    function linkFunction(scope, element) {

      scope.handleUserImage = (imgToken) => {
        return imgToken !== null ||  imgToken === '' ? helperService.fileUrlResolver(imgToken) : ''
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
    'profitelo.services.helper'
  ])
  .directive('proExpertHeader', proExpertHeader)

}())
