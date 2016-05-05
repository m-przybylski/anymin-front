(function() {
  function proServiceProviderLanguages($q, CommonSettingsService) {

    function linkFunction(scope, element, attrs) {


      scope.languages = [
        {name: 'Polish'},
        {name: 'English'}
      ]

      scope.model = {
        languages: []
      }

      scope.onClick = () => {
        scope.queue.currentStep = scope.order
      }

      let _proceed = () => {
        if (scope.queue.completedSteps < scope.order) {
          scope.queue.completedSteps = scope.order
        }

        scope.queue.currentStep = scope.order + 1

      }

      let _isValid = () => {
        let _isValidDeferred = $q.defer()

        _isValidDeferred.resolve()

        return _isValidDeferred.promise
      }

      scope.onEnter = () => {

        _validateUrl().then(() => {
          console.log(scope.langModel)
          scope.model.languages.push(scope.langModel)
          scope.langModel = ''
        }, () => {
          // display error message
        })

      }

      scope.saveSection = () => {
        _isValid().then(() => {
        console.log(scope.model.languages)
          _proceed()
          scope.proModel.name = scope.model.name
        }, () => {
          console.log('not valid')
        })
      }

      scope.skipSection = _proceed


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
        trDesc: '@'
      },
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.service-provider.pro-service-provider-languages', [
      'lodash',
      'pascalprecht.translate',
      'profitelo.services.wizardSectionControl',
      'profitelo.directives.ng-enter',
      'profitelo.services.commonSettings'
    ])
    .directive('proServiceProviderLanguages', proServiceProviderLanguages)
}())