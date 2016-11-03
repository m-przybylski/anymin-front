(function() {
  function proExpertHeader(HelperService) {

    function linkFunction(scope, element) {

      scope.collaboratorImage = (imgToken) => {
        return imgToken !== null ||  imgToken === '' ? HelperService.fileUrlResolver(imgToken) : ''
      }
      
    }

    return {
      templateUrl: 'directives/expert-profile/pro-expert-header/pro-expert-header.tpl.html',
      restrict: 'E',
      replace: true,
      link: linkFunction,
      scope: {
        profile: '=?',
        avatar: '=?'
      }
    }
  }
  angular.module('profitelo.directives.expert-profile.pro-expert-header', [
    'profitelo.components.interface.show-more-text',
    'profitelo.services.helper'
  ])
  .directive('proExpertHeader', proExpertHeader)

}())
