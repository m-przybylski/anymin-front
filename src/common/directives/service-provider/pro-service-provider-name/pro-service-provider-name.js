(function() {
  function proServiceProviderName($q, $timeout) {
    function linkFunction(scope, element, attrs) {
      scope.required = false
      scope.badName = false

      scope.model = {
        name: ''
      }
      element.bind('keydown keypress', function(event) {
        if (event.which === 13) {
          event.preventDefault()
          scope.saveSection()
        }
      })

      scope.onEnter = ()=> {
        element.find('input').blur()
      }

      scope.model.name = scope.proModel.name

      let _isValid = () => {
        let _isValidDeferred = $q.defer()

        if (angular.isDefined(scope.model.name) && scope.model.name.length > 0) {
          _isValidDeferred.resolve()
        } else {
          _isValidDeferred.reject()
        }

        return _isValidDeferred.promise
      }

      let _displayErrorMessage = () => {
        scope.badName = true
      }

      if ('required' in attrs) {
        scope.required = true
      }

      scope.saveSection = () => {
        _isValid().then(() => {
          scope.badName = false
          scope.proModel.name = scope.model.name
          scope.proceed()

        }, () => {
          _displayErrorMessage()
        })
      }
    }

    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-service-provider-name/pro-service-provider-name.tpl.html',
      scope: {
        queue: '=',
        order: '=?',
        proModel: '=',
        trTitle: '@',
        trDesc: '@',
        placeholder: '@',
        errorMessage: '@'
      },
      link: linkFunction,
      controller: 'ServiceProviderStepController',
      controllerAs: 'vm'
    }
  }

  angular.module('profitelo.directives.service-provider.pro-service-provider-name', [
    'lodash',
    'profitelo.directives.ng-enter',
    'pascalprecht.translate',
    'profitelo.common.controller.service-provider.service-provider-step-controller'
  ])
  .directive('proServiceProviderName', proServiceProviderName)
}())
