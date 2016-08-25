(function() {
  function proServiceProviderLanguages($q) {

    function linkFunction(scope, element, attrs) {

      let required = false

      scope.languages = ['English', 'Italian', 'Spanish']

      scope.model = {
        languages: ['Polish']
      }

      const _isValid = () => {
        let _isValidDeferred = $q.defer()
        if (angular.isDefined(scope.model.languages) && scope.model.languages.length > 0) {
          _isValidDeferred.resolve()
        } else {
          _isValidDeferred.reject()
        }

        return _isValidDeferred.promise
      }

      const _displayErrorMessage = () => {
        scope.error.badLanguages = true
      }

      if ('required' in attrs) {
        required = true
      }

      if (scope.proModel.languages.length > 0) {
        scope.model.languages = scope.proModel.languages
      }


      scope.saveSection = () => {
        _isValid().then(() => {
          scope.error.badLanguages = false
          scope.proModel.languages = scope.model.languages
          scope.proceed()
        }, () => {
          _displayErrorMessage()
        })
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
    'profitelo.directives.ng-enter',
    'profitelo.services.commonSettings',
    'profitelo.common.controller.service-provider.service-provider-step-controller'
  ])
    .directive('proServiceProviderLanguages', proServiceProviderLanguages)
}())
