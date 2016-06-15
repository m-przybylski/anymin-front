(function() {
  function proServiceProviderDescription($q) {
    function linkFunction(scope, element, attrs) {
      scope.required = false
      scope.noDescription = false

      scope.model = {
        description: ''
      }
      if ('required' in attrs) {
        scope.required = true
      }

      let _displayErrorMessage = () => {
        scope.noDescription = true
      }

      scope.model.description = scope.proModel.description

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
          scope.noDescription = false
          scope.proModel.description = scope.model.description
          scope.proceed()

        }, () => {
          _displayErrorMessage()
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
