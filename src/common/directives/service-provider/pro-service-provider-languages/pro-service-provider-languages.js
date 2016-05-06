(function() {
  function proServiceProviderLanguages($q, CommonSettingsService) {

    function linkFunction(scope, element, attrs) {

      scope.langModel = ''

      scope.onClick = () => {
        scope.queue.currentStep = scope.order
      }

      scope.languages = [
        {name: 'Polish'},
        {name: 'English'}
      ]

      scope.model = {
        languages: []
      }

      if ('required' in attrs) {
        required = true
      }

      let _proceed = () => {
        if (scope.queue.completedSteps < scope.order) {
          scope.queue.completedSteps = scope.order
        }

        scope.queue.currentStep = scope.order + 1

      }

      scope.saveSection = () => {
        scope.model.languages = scope.langModel
        _proceed()

      }
      scope.skipSection = _proceed

    }


    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-service-provider-languages/pro-service-provider-languages.tpl.html',
      scope: {
        queue: '=',
        order: '=?',
        proModel: '=',
        trTitle: '@',
        trDesc: '@'
      },
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.service-provider.pro-service-provider-languages', [
    'lodash',
    'pascalprecht.translate',
    'profitelo.services.wizardSectionControl',
    'profitelo.directives.ng-enter',
    'profitelo.services.commonSettings'
  ])
    .directive('proServiceProviderLanguages', proServiceProviderLanguages)
}())