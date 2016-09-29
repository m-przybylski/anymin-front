(function() {
  function proServiceProviderFileUploader($q, proTopAlertService, FilesApi) {

    function linkFunction(scope, element, attrs) {

      scope.model = {
        files: []
      }
      scope.isPending = false
      if (angular.isDefined(scope.proModel) && angular.isDefined(scope.proModel.files)) {
        for (let i = 0; i < scope.proModel.files.length;i++) {
          FilesApi.fileInfoPath({token: scope.proModel.files[i].token}).$promise.then((res)=>{
            res.token = scope.proModel.files[i].token
            scope.model.files.push({file: res, response: res})
          }, (err)=>{
            proTopAlertService.error({
              message: 'error',
              timeout: 4
            })
          })
        }
      }

      let required = false

      /* istanbul ignore else */
      if ('required' in attrs) {
        required = true
      }

      scope.removeFile = (fileToDelete) => {
        let _index = scope.model.files.indexOf(fileToDelete)
        scope.model.files.splice(_index, 1)
      }

      let _isValid = () => {
        let _isValidDeferred = $q.defer()

        if (angular.isDefined(scope.model.files) && scope.model.files.length > 0 && !scope.isPending) {
          _isValidDeferred.resolve()
        } else {
          _isValidDeferred.reject()
        }

        return _isValidDeferred.promise
      }

      let _displayErrorMessage = () => {
        scope.error.badFiles = true
      }

      scope.saveSection = () => {
        _isValid().then(() => {
          scope.error.badFiles = false
          scope.proceed()
          scope.proModel.files = scope.model.files.map(file => file.response)
        }, () => {
          _displayErrorMessage()
        })
      }
    }


    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-service-provider-file-uploader/pro-service-provider-file-uploader.tpl.html',
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


  angular.module('profitelo.directives.service-provider.pro-service-provider-file-uploader', [
    'lodash',
    'pascalprecht.translate',
    'profitelo.directives.ng-enter',
    'profitelo.services.commonSettings',
    'profitelo.directives.interface.pro-uploader',
    'profitelo.common.controller.service-provider.service-provider-step-controller',
    'profitelo.directives.pro-top-alert-service'
  ])
    .directive('proServiceProviderFileUploader', proServiceProviderFileUploader)
}())
