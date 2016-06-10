(function() {
  function proServiceProviderTags($q, $timeout) {

    function linkFunction(scope, element, attrs) {

      let required = false

      scope.tags = [
        'Kot', 'Telefon', 'Placki', 'JUSTDOIT', 'Pralka'
      ]

      scope.model = {
        tags: []
      }

      scope.model.tags = scope.proModel.tags

      if ('required' in attrs) {
        required = true
      }

      let _isValid = () => {
        let _isValidDeferred = $q.defer()

        if (angular.isDefined(scope.model.tags) && scope.model.tags.length > 0) {
          _isValidDeferred.resolve()
        } else {
          _isValidDeferred.reject()
        }

        return _isValidDeferred.promise
      }

      let _displayErrorMessage = () => {
        scope.noTags = true
      }

      scope.saveSection = () => {
        scope.noTags = false
        _isValid().then(() => {
          scope.proModel.tags = scope.model.tags
          scope.proceed()

        }, () => {
          _displayErrorMessage()
        })
      }

      if ('required' in attrs) {
        scope.required = true
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
        placeholder: '@',
        errorMessage: '@'
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
