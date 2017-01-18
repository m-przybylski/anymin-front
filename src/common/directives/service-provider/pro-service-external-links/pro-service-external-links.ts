(function() {
  function proServiceExternalLinks($timeout, $q, CommonSettingsService) {

    function linkFunction(scope, element, attrs) {

      scope.linkModel = ''

      scope.model = {
        links: []
      }

      scope.model.links = scope.proModel.links

      const _urlPattern = CommonSettingsService.localSettings.urlPattern

      scope.removeLink = (linkToDelete) => {
        let _index = scope.model.links.indexOf(linkToDelete)
        scope.model.links.splice(_index, 1)
      }
      let httpAdded = false

      let _checkLinkExist = (link) => {
        return scope.model.links.indexOf(link) !== -1
      }

      scope.onEnter = () => {
        scope.error.urlExist = false
        if (!scope.linkModel.match(_urlPattern) && httpAdded === false) {
          scope.linkModel = 'http://' + scope.linkModel
          httpAdded = true
        }

        if ( _urlPattern.test(scope.linkModel)) {
          scope.error.badUrl = false
          httpAdded = false
          if (_checkLinkExist(scope.linkModel)) {
            scope.error.urlExist = true
          } else {
            scope.model.links.push(scope.linkModel)
            scope.linkModel = ''
          }
        } else {
          scope.error.badUrl = true
          scope.error.noUrl = false
        }
      }

      let required = false
      /* istanbul ignore else */
      if ('required' in attrs) {
        required = true
      }


      const _isValid = () => {
        const _isValidDeferredEmpty = $q.defer()

        if (angular.isDefined(scope.model.links) && scope.model.links.length > 0) {
          _isValidDeferredEmpty.resolve()
        } else {
          _isValidDeferredEmpty.reject()
        }

        return _isValidDeferredEmpty.promise
      }

      const _displayErrorMessage = () => {
        scope.error.noUrl = true
      }

      scope.saveSection = () => {
        _isValid().then(() => {
          scope.error.noUrl = false
          scope.error.badUrl= false
          scope.error.urlExist = false
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
    'pascalprecht.translate',
    'profitelo.directives.ng-enter',
    'profitelo.services.commonSettings',
    'profitelo.directives.pro-social-icon-getter',
    'profitelo.common.controller.service-provider.service-provider-step-controller'
  ])
  .directive('proServiceExternalLinks', proServiceExternalLinks)
}())
