(function() {
  function proServiceProviderLanguages() {

    function linkFunction(scope, element, attrs) {

      let required = false

      scope.languages = [
        {name: 'Polish'},
        {name: 'English'},
        {name: 'Italian'},
        {name: 'Spanish'},
        {name: 'Chineese'}
      ]

      scope.model = {
        languages: []
      }

      if ('required' in attrs) {
        required = true
      }

      scope.saveSection = () => {
        scope.proModel.languages = scope.model.languages
        scope.proceed()
      }

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
        trDesc: '@',
        placeholder: '@'
      },
      link: linkFunction,
      controller: 'ServiceProviderStepController',
      controllerAs: 'vm'
    }
  }

  angular.module('profitelo.directives.service-provider.pro-service-provider-languages', [
    'lodash',
    'pascalprecht.translate',
    'profitelo.services.wizardSectionControl',
    'profitelo.directives.ng-enter',
    'profitelo.services.commonSettings',
    'profitelo.common.controller.service-provider.service-provider-step-controller'
  ])
    .directive('proServiceProviderLanguages', proServiceProviderLanguages)
}())
