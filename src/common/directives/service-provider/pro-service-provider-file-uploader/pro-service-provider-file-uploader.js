(function() {
  function proServiceProviderFileUploader($q, CommonSettingsService) {

    function linkFunction(scope, element, attrs) {

      scope.model = {
        files: []
      }

      let required = false

      if ('required' in attrs) {
        required = true
      }

      scope.removeFile = (fileToDelete) => {
        let _index = scope.model.files.indexOf(fileToDelete)
        scope.model.files.splice(_index, 1)
      }

      let _isValid = () => {
        let _isValidDeferred = $q.defer()

        _isValidDeferred.resolve()

        return _isValidDeferred.promise
      }


      scope.saveSection = () => {
        _isValid().then(() => {
          scope.proceed()

        }, () => {
          console.log('not valid')
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
    'profitelo.services.wizardSectionControl',
    'profitelo.directives.ng-enter',
    'profitelo.services.commonSettings',
    'profitelo.directives.interface.pro-uploader'
  ])
    .directive('proServiceProviderFileUploader', proServiceProviderFileUploader)
}())