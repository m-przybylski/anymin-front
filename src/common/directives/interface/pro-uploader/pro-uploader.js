function proUploader($timeout, $interval) {

  function  linkFunction(scope, element, attr) {
    let _file = 0
    let _files = 0
    let immediateInterval
    scope.progress = 0
    scope.fadeText = false
    scope.header = 'COMMON.DIRECTIVES.INTERFACE.UPLOADER.HEADER'
    scope.info = 'COMMON.DIRECTIVES.INTERFACE.UPLOADER.INFO'
    scope.upload = false
    scope.hideArrow = false
    scope.$watch('files', ()=> {

    })
    let _endImmediateLoading = () => {
      scope.progress = 0
      scope.fadeText = true
      $timeout(()=>{
        scope.header = 'COMMON.DIRECTIVES.INTERFACE.UPLOADER.HEADER'
        scope.info = 'COMMON.DIRECTIVES.INTERFACE.UPLOADER.INFO'
      }, 200)
      scope.hideLoader = true
      scope.upload = false
      scope.hideArrow = false
      scope.showArrow = true

    }
    let _startImmediateLoading = () =>
      immediateInterval = $interval(() => {
        if (scope.progress >= 100) {
          $interval.cancel(immediateInterval)
          _endImmediateLoading()

        } else {
          scope.progress = scope.progress + 1
        }
      }, 100)

    scope.animate = function() {
      scope.showArrow = false
      scope.hideArrow = true
      scope.hideLoader = false
      scope.fadeText = false
      $timeout(()=>{
        scope.fadeText = true
        $timeout(()=> {
          scope.upload = true
          scope.header = 'COMMON.DIRECTIVES.INTERFACE.UPLOADER.HEADER_UPLOAD'
          scope.info = 'COMMON.DIRECTIVES.INTERFACE.UPLOADER.INFO_UPLOAD'
          _startImmediateLoading()
          scope.translationInfo = {
            file: _file,
            files: _files
          }
          $timeout(()=>{
            scope.fadeText = false
          }, 200)
        }, 200)
      }, 200)

    }
  }
  return {
    templateUrl: 'directives/interface/pro-uploader/pro-uploader.tpl.html',
    restrict: 'E',
    replace: true,
    link: linkFunction,
    scope: {
      proModel: '=',
      defaultValue: '@',
      accept: '@',
      pattern: '@'

    }
  }
}

angular.module('profitelo.directives.interface.pro-uploader', [
  'ngFileUpload'
])
  .directive('proUploader', proUploader)