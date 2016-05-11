(function() {
  function proServiceProviderFileUploader($q, CommonSettingsService) {

    function linkFunction(scope, element, attrs) {


      scope.onClick = () => {
        scope.queue.currentStep = scope.order
      }

      scope.model = {
        files: []
      }

      if ('required' in attrs) {
        required = true
      }

      scope.removeFile = (fileToDelete) => {
        let _index = scope.model.files.indexOf(fileToDelete)
        scope.model.files.splice(_index, 1)
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
      templateUrl: 'directives/service-provider/pro-service-provider-file-uploader/pro-service-provider-file-uploader.tpl.html',
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

  angular.module('profitelo.directives.service-provider.pro-service-provider-file-uploader', [
    'lodash',
    'pascalprecht.translate',
    'profitelo.services.wizardSectionControl',
    'profitelo.directives.ng-enter',
    'profitelo.services.commonSettings'
  ])
    .directive('proServiceProviderFileUploader', proServiceProviderFileUploader)
}())