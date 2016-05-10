(function () {
  function proServiceProviderName($q, $timeout, $rootScope) {

    function linkFunction(scope, element, attrs) {

      scope.onClick = () => {
        $rootScope.$broadcast('manualOrderChangeRequest', scope.order)
      }

      scope.required = false
      scope.badName = false


      scope.model = {
        name: ''
      }

      let shadowModel

      let _isValid = () => {
        let _isValidDeferred = $q.defer()

        if (angular.isDefined(scope.model.name) && scope.model.name.length > 0) {
          _isValidDeferred.resolve()
        } else {
          _isValidDeferred.reject()
        }

        return _isValidDeferred.promise
      }

      function saveShadowModel() {
        shadowModel = angular.copy(scope.model)
      }

      function restoreShadowModel() {
        scope.model = angular.copy(shadowModel)
      }

      let _displayErrorMessage = () => {
        scope.badName = true
        $timeout(() => {
          scope.badName = false
        }, 1000)
      }


      scope.$on('manualOrderChangeRequestGrant', (event, targetStep) => {
        if (scope.order === targetStep) {
          saveShadowModel()
          scope.queue.currentStep = scope.order
        }
      })

      let _manualOrderChangeRequestHandle = (targetStep) => {
        restoreShadowModel()
        $rootScope.$broadcast('manualOrderChangeRequestGrant', targetStep)
      }

      scope.$on('manualOrderChangeRequest', (event, targetStep) => {
        if (scope.order === scope.queue.currentStep && targetStep != scope.order) {
          _manualOrderChangeRequestHandle(targetStep)
        }
      })

      if ('required' in attrs) {
        scope.required = true
      }

      let _proceed = () => {
        if (scope.queue.completedSteps < scope.order) {
          scope.queue.completedSteps = scope.order
        }

        scope.queue.currentStep = scope.order + 1

      }


      scope.saveSection = () => {
        _isValid().then(() => {

          scope.proModel.name = scope.model.name
          _proceed()

        }, () => {
          _displayErrorMessage()
        })
      }

      scope.skipSection = () => {
        _proceed()
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
        placeholder: '@'
      },
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.service-provider.pro-service-provider-name', [
      'lodash',
      'pascalprecht.translate'
    ])
    .directive('proServiceProviderName', proServiceProviderName)
}())
