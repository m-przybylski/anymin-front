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



      let required = false

      if ('required' in attrs) {
        required = true
      }


      let _isValid = () => {
        let _isValidDeferred = $q.defer()

        _isValidDeferred.resolve()

        return _isValidDeferred.promise
      }


      scope.saveSection = () => {
        _isValid().then(() => {

          scope.proModel.links = scope.model.links
          scope.proceed()

        }, () => {
          console.log('not valid')
        })
      }


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
      link: linkFunction,
      controller: 'ServiceProviderStepController',
      controllerAs: 'vm'
    }
  }

  angular.module('profitelo.directives.service-provider.pro-service-external-links', [
    'lodash',
    'pascalprecht.translate',
    'profitelo.services.wizardSectionControl',
    'profitelo.directives.ng-enter',
    'profitelo.services.commonSettings',
    'profitelo.directives.pro-social-icon-getter',
    'profitelo.common.controller.service-provider.service-provider-step-controller'
  ])
  .directive('proServiceExternalLinks', proServiceExternalLinks)
}())
