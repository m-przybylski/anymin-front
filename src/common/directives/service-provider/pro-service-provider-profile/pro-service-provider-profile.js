(function() {
  function proServiceProviderProfile($sce) {

    function linkFunction(scope) {

      scope.invertArrow = false
      scope.textLimit = 1000
      scope.description = String($sce.trustAsHtml( scope.description.replace(/\n/g, '<br />')))

      scope.showMoreText = () => {
        scope.textLimit = scope.textLimit === null ? 1000 : null
        scope.invertArrow = !scope.invertArrow
      }

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
