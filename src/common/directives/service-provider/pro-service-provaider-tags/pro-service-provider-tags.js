(function() {
  function proServiceProviderTags() {

    function linkFunction(scope, element, attrs) {

      let required = false

      scope.tags = [
        {name: '#Pies'},
        {name: '#KOT'},
        {name: '#PLACEK'},
        {name: '#NEwME'},
        {name: '#JUSTDOIT'}
      ]

      scope.model = {
        languages: []
      }

      if ('required' in attrs) {
        required = true
      }

      scope.saveSection = () => {
        scope.proModel.tags = scope.model.languages
        scope.proceed()
      }

    }


    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-service-provider-tags/pro-service-provider-tags.tpl.html',
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

  angular.module('profitelo.directives.service-provider.pro-service-provider-tags', [
      'lodash',
      'pascalprecht.translate',
      'profitelo.services.wizardSectionControl',
      'profitelo.directives.ng-enter',
      'profitelo.services.commonSettings',
      'profitelo.common.controller.service-provider.service-provider-step-controller'
    ])
    .directive('proServiceProviderTags', proServiceProviderTags)
}())
