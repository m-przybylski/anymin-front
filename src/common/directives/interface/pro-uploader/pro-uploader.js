(function() {
  function proUploader($timeout, $interval, $q, FilesApi, Upload) {

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
      scope.imageSize = {width: 320, height: 320, quality: 1}

      if ('type' in attr.$attr) {
        scope.ngfPattern = attr.type
        scope.accept = attr.type
      }

      if ('multiple' in attr.$attr) {
        scope.multiple = true
      }

      if ('required' in attr.$attr) {
        scope.required = true
      }

      let _calculatePercentage = function(loaded, total) {
        return parseInt((100.0 * loaded / total), 10)
      }

      scope.uploadFiles = function($files) {
        scope.uploadImg = false
        let files = $files
        _file = 0
        var tokenPromisses = []
        if (files && files.length) {
          for (var i = 0; i < files.length; i++) {
            if (!files[i].$error) {
              tokenPromisses.push(FilesApi.tokenPath().$promise)
            }
          }
          $q.all(tokenPromisses).then((tokenPromissesResponse) => {
            scope.animate()
            for (var k = 0; k < files.length; k++) {
              _files = files.length
              Upload.upload({
                url: tokenPromissesResponse[k].uploadUrl,
                data: {
                  file: files[k]
                }
              }).then(
                function(res) {
                  scope.filesUploaded.push({
                    file: files[_file],
                    response: res.data
                  })
                  _file++
                  if ('avatar' in attr.$attr) {
                    $timeout(()=>{
                      scope.uploadImg = true
                    }, 500)
                  }
                },
                function(res) {
                  // TODO walidacje na odpowiedzi z serwera
                },
                function(res) {
                  scope.progress = _calculatePercentage(res.loaded, res.total)
                }
              )
            }
          }, function(tokenPromissesError) {
          })
        }
      }
      let _endImmediateLoading = () => {
        scope.progress = 0
        scope.fadeText = true
        $timeout(()=> {
          scope.header = 'COMMON.DIRECTIVES.INTERFACE.UPLOADER.HEADER'
          scope.info = 'COMMON.DIRECTIVES.INTERFACE.UPLOADER.INFO'
        }, 200)
        scope.hideLoader = true
        scope.upload = false
        scope.hideArrow = false
        scope.showArrow = true

      }
      let _startImmediateLoading = () => {
        immediateInterval = $interval(() => {
          if (scope.progress >= 100) {
            _endImmediateLoading()
            $timeout(()=>{
              $interval.cancel(immediateInterval)
            })

          }
        })
      }

      scope.deleteImage = ()=> {
        scope.uploadImg = false
        scope.filesUploaded = []
      }

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
        defaultValue: '@',
        accept: '@',
        ngfPattern: '@',
        filesUploaded: '=?',
        maxSize: '@'

      }
    }
  }

  angular.module('profitelo.directives.interface.pro-uploader', [
    'ngFileUpload'
  ])
    .directive('proUploader', proUploader)
}())
