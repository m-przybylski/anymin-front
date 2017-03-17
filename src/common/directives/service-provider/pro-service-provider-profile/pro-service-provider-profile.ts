namespace profitelo.directives.serviceProvider.proServiceProviderProfile {

  interface IProServiceProviderProfile extends ng.IScope {
    invertArrow: boolean
    textLimit: number | null
    description: string
    onClick: () => void
    buttonAction: () => void
    showMoreText: () => void
  }

  function proServiceProviderProfile($sce: ng.ISCEService) {

    function linkFunction(scope: IProServiceProviderProfile) {

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
      template: require('./pro-service-provider-profile.pug')(),
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

    'ngSanitize',
    'pascalprecht.translate',
    'profitelo.components.interface.show-more-text'
  ])
    .directive('proServiceProviderProfile', proServiceProviderProfile)
}
