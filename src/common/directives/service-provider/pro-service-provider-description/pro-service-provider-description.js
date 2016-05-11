(function() {
  function proServiceProviderDescription($q) {

    function linkFunction(scope, element, attrs) {
      
      let required = false

      if ('required' in attrs) {
        required = true
      }

      scope.model = {
        description: ''
      }
      

      let _isValid = () => {
        let _isValidDeferred = $q.defer()

        if (angular.isDefined(scope.model.description) && scope.model.description.length > 0) {
          _isValidDeferred.resolve()
        } else {
          _isValidDeferred.reject()
        }

        return _isValidDeferred.promise
      }
      
      scope.saveSection = () => {
        _isValid().then(() => {

          scope.proModel.description = scope.model.description
          scope.proceed()

        }, () => {
          console.log('not valid')
        })
      }

    }


    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-service-provider-description/pro-service-provider-description.tpl.html',
      scope: {
        queue:    '=',
        order:    '=',
        proModel: '=',
        steps: '@',
        trTitle: '@',
        trDesc: '@'
      },
      link: linkFunction,
      controller: 'ServiceProviderStepController',
      controllerAs: 'vm'
    }
  }

  angular.module('profitelo.directives.service-provider.pro-service-provider-description', [
    'lodash',
    'pascalprecht.translate',
    'profitelo.services.wizardSectionControl',
    'profitelo.common.controller.service-provider.service-provider-step-controller'
  ])
  .directive('proServiceProviderDescription', proServiceProviderDescription)
}())