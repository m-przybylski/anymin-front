namespace profitelo.directives.serviceProvider.proServiceProviderDescription {

  function proServiceProviderDescription($q: ng.IQService) {
    function linkFunction(scope: any, _element: ng.IRootElementService, attrs: ng.IAttributes) {
      scope.required = false

      scope.model = {
        description: ''
      }
      if ('required' in attrs) {
        scope.required = true
      }

      let _displayErrorMessage = () => {
        scope.error.noDescription = true
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
          scope.error.noDescription = false
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
    'ngLodash',
    'pascalprecht.translate',
    'profitelo.common.controller.service-provider.service-provider-step-controller'
  ])
    .directive('proServiceProviderDescription', proServiceProviderDescription)
}
