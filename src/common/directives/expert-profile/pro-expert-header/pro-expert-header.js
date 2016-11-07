(function() {
  function proExpertHeader(HelperService) {

    function linkFunction(scope, element) {

      scope.handleUserImage = (imgToken) => {
        return imgToken !== null ||  imgToken === '' ? HelperService.fileUrlResolver(imgToken) : ''
      }

      console.log(scope.profile)
      
    }

    return {
      templateUrl: 'directives/expert-profile/pro-expert-header/pro-expert-header.tpl.html',
      restrict: 'E',
      replace: true,
      link: linkFunction,
      scope: {
        profile: '=?',
      }
    }
  }
  angular.module('profitelo.directives.expert-profile.pro-expert-header', [
    'profitelo.components.interface.show-more-text',
    'profitelo.services.helper'
  ])
  .directive('proExpertHeader', proExpertHeader)

}())
