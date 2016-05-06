(function() {
  function proServiceExternalLinks($timeout, $q, CommonSettingsService, _) {

    function linkFunction(scope, element, attrs) {

      scope.linkModel = ''
      scope.badUrl    = false

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

      scope.removeLink = (linkToDelete) => {
        let _index = scope.model.links.indexOf(linkToDelete)
        console.log(_index)
        scope.model.links.splice(_index, 1)
      }

      scope.onEnter = () => {

        _validateUrl().then(() => {

          scope.model.links.push(scope.linkModel)
          scope.linkModel = ''

        }, () => {
          scope.badUrl = true

          $timeout(() => {
            scope.badUrl = false
          }, 1000)

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

          scope.proModel.links = scope.model.links
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
    'profitelo.services.commonSettings',
    'profitelo.directives.pro-social-icon-getter'
  ])
  .directive('proServiceExternalLinks', proServiceExternalLinks)
}())