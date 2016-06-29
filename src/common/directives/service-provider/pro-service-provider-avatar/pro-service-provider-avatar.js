(function() {
  function proServiceProviderAvatar($q, proTopAlertService, FilesApi) {

    function linkFunction(scope, element, attrs) {

      scope.imageField = 'avatar'
      scope.required = false
      scope.noFile = false

      if ('imageField' in attrs) {
        scope.imageField = attrs.imageField
      }
      scope.model = {}
      scope.model[scope.imageField] = []

      let _getImageIfExist = (model)=> {
        FilesApi.fileInfoPath({token: model}).$promise.then((res)=>{
          scope.model[scope.imageField].push({file: null, response:res})
        }, (err)=> {
          proTopAlertService.error({
            message: 'error',
            timeout: 4
          })
        })
      }

      !!scope.proModel[scope.imageField] ? _getImageIfExist(scope.proModel[scope.imageField]) : scope.model[scope.imageField] = []

      let _isValid = () => {
        let _isValidDeferred = $q.defer()
        if (angular.isDefined(scope.model[scope.imageField]) && scope.model[scope.imageField].length > 0) {
          _isValidDeferred.resolve(scope.model[scope.imageField][0].response.id)
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

      scope.removeAvatar = () => {
        scope.noFile = true
        scope.model[scope.imageField].splice(0, 1)
      }

      scope.saveSection = () => {
        _isValid().then((avatarId) => {
          scope.noFile = false
          scope.proModel[scope.imageField] = avatarId
          scope.proceed()
        }, () => {
          _displayErrorMessage()
        })
      }


    }


    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-service-provider-avatar/pro-service-provider-avatar.tpl.html',
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

  angular.module('profitelo.directives.service-provider.pro-service-provider-avatar', [
    'lodash',
    'pascalprecht.translate',
    'profitelo.common.controller.service-provider.service-provider-step-controller',
    'profitelo.directives.interface.pro-uploader',
    'profitelo.directives.pro-top-alert-service'
  ])
  .directive('proServiceProviderAvatar', proServiceProviderAvatar)
}())
