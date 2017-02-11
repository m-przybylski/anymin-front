namespace profitelo.directives.serviceProvider.proServiceProviderProfile {

  interface ProServiceProviderProfile extends ng.IScope {
    invertArrow: boolean
    textLimit: number | null
    description: string
    onClick: Function
    buttonAction: Function
    showMoreText: Function
  }

  function proServiceProviderProfile($sce: ng.ISCEService) {

    function linkFunction(scope: ProServiceProviderProfile) {

      scope.invertArrow = false
      scope.textLimit = 1000
      if (scope.description) {
        scope.description = String($sce.trustAsHtml( scope.description.replace(/\n/g, '<br />')))
      }

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
    'ngLodash',
    'ngSanitize',
    'pascalprecht.translate',
    'profitelo.components.interface.show-more-text'
  ])
    .directive('proServiceProviderProfile', proServiceProviderProfile)
}
