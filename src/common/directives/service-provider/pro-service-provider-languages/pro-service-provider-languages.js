(function() {
  function proServiceProviderLanguages($q, CommonSettingsService) {

    function linkFunction(scope, element, attrs) {

      scope.langModel = ''
      
      let required = false
      
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
      
      scope.saveSection = () => {
        scope.model.languages = scope.langModel
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
        trDesc: '@'
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