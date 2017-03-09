namespace profitelo.directives.serviceProvider.proServiceProviderLanguages {


  function proServiceProviderLanguages($q: ng.IQService) {

    function linkFunction(scope: any, _element: ng.IRootElementService, attrs: ng.IAttributes) {

      let required = false

      scope.languages = ['pl', 'en', 'it', 'de', 'fr']

      scope.model = {
        languages: ['pl']
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
      template: require('./pro-service-provider-languages.jade')(),
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
    'ngLodash',
    'pascalprecht.translate',
    'profitelo.directives.ng-enter',
    'profitelo.services.commonSettings',
    'profitelo.common.controller.service-provider.service-provider-step-controller'
  ])
    .directive('proServiceProviderLanguages', proServiceProviderLanguages)
}
