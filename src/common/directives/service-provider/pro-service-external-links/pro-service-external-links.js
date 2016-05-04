(function() {
  function proServiceExternalLinks($q, CommonSettingsService) {

    function linkFunction(scope, element, attrs) {

      scope.linkModel = ''

      scope.model = {
        links: []
      }

      let _urlPattern = CommonSettingsService.localSettings.urlPattern

      let _validateUrl = () => {
        let _isValidDeferred = $q.defer()

        if (_urlPattern.test(scope.linkModel)) {
          _isValidDeferred.resolve()
        } else {
          _isValidDeferred.reject()
        }

        return _isValidDeferred.promise
      }

      scope.onEnter = () => {

        _validateUrl().then(() => {

          scope.model.links.push(scope.linkModel)
          scope.linkModel = ''

        }, () => {
          console.log('bad url: ', scope.linkModel)
          // display error message
        })

      }

      scope.onClick = () => {
        scope.queue.currentStep = scope.order
      }

      let required = false

      if ('required' in attrs) {
        required = true
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
      templateUrl: 'directives/service-provider/pro-service-external-links/pro-service-external-links.tpl.html',
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

  angular.module('profitelo.directives.service-provider.pro-service-external-links', [
    'lodash',
    'pascalprecht.translate',
    'profitelo.services.wizardSectionControl',
    'profitelo.directives.ng-enter',
    'profitelo.services.commonSettings'
  ])
  .directive('proServiceExternalLinks', proServiceExternalLinks)
}())