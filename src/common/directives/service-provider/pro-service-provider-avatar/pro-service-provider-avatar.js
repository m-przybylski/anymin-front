(function() {
  function proServiceProviderAvatar($q, $timeout, FilesApi) {

    function linkFunction(scope, element, attrs) {

      scope.required = false
      scope.badName = false

      scope.model = {
        avatar: []
      }

      if (scope.proModel.avatar) {
        FilesApi.fileInfoPath({token: scope.proModel.avatar}).$promise.then((res)=>{
          scope.model.avatar.push({file: null, response:res})
        }, (err)=> {

        })
      }

      let _isValid = () => {
        let _isValidDeferred = $q.defer()
        if (angular.isDefined(scope.model.avatar) && scope.model.avatar.length > 0) {
          _isValidDeferred.resolve(scope.model.avatar[0].response.id)
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

        scope.model.avatar.splice(0, 1)
      }

      scope.saveSection = () => {
        _isValid().then((avatarId) => {
          scope.noFile = false
          scope.proModel.avatar = avatarId
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
    'profitelo.directives.interface.pro-uploader'
  ])
  .directive('proServiceProviderAvatar', proServiceProviderAvatar)
}())
