(function() {
  function proServiceProviderLogo($q, $timeout, FilesApi) {

    function linkFunction(scope, element, attrs) {

      scope.required = false
      scope.badName = false

      scope.model = {
        logo: []
      }

      if (scope.proModel.logo) {
        FilesApi.fileInfoPath({token: scope.proModel.logo}).$promise.then((res)=>{
          scope.model.logo.push({file: null, response:res})
        }, (err)=> {
        })
      }

      let _isValid = () => {
        let _isValidDeferred = $q.defer()
        if (angular.isDefined(scope.model.logo) && scope.model.logo.length > 0) {
          _isValidDeferred.resolve(scope.model.logo[0].response.id)
        } else {
          _isValidDeferred.reject()
        }

        return _isValidDeferred.promise
      }

      let _displayErrorMessage = () => {
        scope.noFile = true

      }

      if ('required' in attrs) {
        scope.required = true
      }

      scope.removelogo = () => {

        scope.model.logo.splice(0, 1)
      }

      scope.saveSection = () => {
        _isValid().then((logoId) => {
          scope.noFile = false
          scope.proModel.logo = logoId
          scope.proceed()

        }, () => {
          _displayErrorMessage()
        })
      }


    }


    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-service-provider-logo/pro-service-provider-logo.tpl.html',
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

  angular.module('profitelo.directives.service-provider.pro-service-provider-logo', [
    'lodash',
    'pascalprecht.translate',
    'profitelo.common.controller.service-provider.service-provider-step-controller',
    'profitelo.directives.interface.pro-uploader'
  ])
  .directive('proServiceProviderLogo', proServiceProviderLogo)
}())
