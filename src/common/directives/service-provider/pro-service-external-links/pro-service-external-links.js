(function() {
  function proServiceExternalLinks($timeout, $q, CommonSettingsService, _) {

    function linkFunction(scope, element, attrs) {

      scope.linkModel = ''
      scope.badUrl    = false

      scope.model = {
        links: []
      }

      scope.model.links = scope.proModel.links

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
        scope.model.links.splice(_index, 1)
      }
      let httpAdded = false

      scope.onEnter = () => {
        if (!scope.linkModel.match(_urlPattern) && httpAdded === false) {
          scope.linkModel = 'http://' + scope.linkModel
          httpAdded = true
        }

        _validateUrl().then(() => {
          scope.badUrl = false
          httpAdded = false
          scope.model.links.push(scope.linkModel)
          scope.linkModel = ''

        }, () => {
          scope.badUrl = true
          scope.noUrl = false
        })

      }



      let required = false

      if ('required' in attrs) {
        required = true
      }


      let _isValid = () => {
        let _isValidDeferredEmpty = $q.defer()

        if (angular.isDefined(scope.model.links) && scope.model.links.length > 0) {
          _isValidDeferred.resolve()
        } else {
          _isValidDeferred.reject()
        }

        return _isValidDeferred.promise
      }

      let _displayErrorMessage = () => {
        scope.noUrl = true
      }

      scope.saveSection = () => {
        _isValid().then(() => {
          scope.noUrl = false
          scope.proModel.links = scope.model.links
          scope.proceed()

        }, () => {
          _displayErrorMessage()
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
