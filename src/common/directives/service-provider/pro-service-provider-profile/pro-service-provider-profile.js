(function() {
  function proServiceProviderProfile($sce) {

    function linkFunction(scope) {

      scope.onClick = () => {
        scope.buttonAction()
      }

    }

    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-service-provider-profile/pro-service-provider-profile.tpl.html',
      scope: {
        name: '=?',
        languages: '=?',
        description: '=?',
        buttonAction: '=?',
        avatar: '=?'

      },
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.service-provider.pro-service-provider-profile', [
    'lodash',
    'pascalprecht.translate'
  ])
    .directive('proServiceProviderProfile', proServiceProviderProfile)
}())
