(function() {
  function proServiceProviderName($q) {

    function linkFunction(scope, element, attrs) {

      scope.onClick = () => {
        scope.queue.currentStep = scope.order
      }


      let required = false

      if ('required' in attrs) {
        required = true
      }

      scope.model = {
        name: ''
      }

      let _proceed = () => {
        if (scope.queue.completedSteps < scope.order) {
          scope.queue.completedSteps = scope.order
        }

        scope.queue.currentStep = scope.order + 1

      }

      let _isValid = () => {
        let _isValidDeferred = $q.defer()

        if (angular.isDefined(scope.model.name) && scope.model.name.length > 0) {
          _isValidDeferred.resolve()
        } else {
          _isValidDeferred.reject()
        }

        return _isValidDeferred.promise
      }


      scope.saveSection = () => {
        _isValid().then(() => {

          scope.proModel.name = scope.model.name
          _proceed()

        }, () => {
          console.log('not valid')
        })
      }

      scope.skipSection = _proceed


    }


    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-service-provider-name/pro-service-provider-name.tpl.html',
      scope: {
        queue:    '=',
        order:    '=?',
        proModel: '=',
        trTitle: '@',
        trDesc: '@'
      },
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.service-provider.pro-service-provider-name', [
    'lodash',
    'pascalprecht.translate',
    'profitelo.services.wizardSectionControl'
  ])
  .directive('proServiceProviderName', proServiceProviderName)
}())
