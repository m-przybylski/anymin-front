(function() {
  function proUploader($timeout, $interval, $q, FilesApi, Upload, CommonConfig) {

    function  linkFunction(scope, element, attr) {
      let _file = 0
      let _files = 0
      let immediateInterval
      let _commonConfig = CommonConfig.getAllData()
      scope.progress = 0
      scope.fadeText = false
      scope.header = 'COMMON.DIRECTIVES.INTERFACE.UPLOADER.HEADER'
      scope.info = 'COMMON.DIRECTIVES.INTERFACE.UPLOADER.INFO'
      scope.upload = false
      scope.hideArrow = false
      scope.imageSize = {width: 320, height: 320, quality: 1}
      scope.errorValidateMessage = false

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


      let _calculatePercentage = function(loaded, total, currentFile, files) {
        return  parseInt((100.0 * loaded / total), 10)

      }

      let _setFilesStatus = (currentFile, allFiles) => {
        scope.translationInfo = {
          file: currentFile,
          files: allFiles
        }
      }

      let uploadingFiles = []
      scope.uploadFiles = function($files) {
        scope.isPending = true
        scope.uploadImg = false
        let files = $files
        _file = 0
        var tokenPromisses = []
        if (files && files.length) {
          for (var i = 0; i < files.length; i++) {
            if (!files[i].$error) {
              tokenPromisses.push(FilesApi.tokenPath().$promise)
              scope.errorValidateMessage = false
            }
          }
          $q.all(tokenPromisses).then((tokenPromissesResponse) => {
            scope.animate()
            for (var k = 0; k < files.length; k++) {
              _files = files.length
              _setFilesStatus(_file, _files)
              Upload.upload({
                url: _commonConfig.urls.backend + _commonConfig.urls['file-upload'].replace('%s', tokenPromissesResponse[k].fileId),
                data: {
                  file: files[k]
                }
              }).then(
                function(res) {
                  console.log(_file)
                  scope.filesUploaded.push({
                    file: files[_file],
                    response: res.data
                  })
                  _file++
                  if (_file === files.length) {
                    scope.isPending = false
                  }
                },
                function(res) {
                  // TODO walidacje na odpowiedzi z serwera
                },
                function(res) {
                  scope.progress = _calculatePercentage(res.loaded, res.total, _file, _files)
                }
              )
            }
          }, function(tokenPromissesError) {
          })
        } else {
          scope.isPending = false
          scope.errorValidateMessage = true
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
          }
        })
      }

      scope.deleteImage = ()=> {
        scope.uploadImg = false
        scope.filesUploaded = []
      }

      /* istanbul ignore next */
      scope.animate = function() {
        scope.showArrow = false
        scope.hideArrow = true
        scope.hideLoader = false
        scope.fadeText = false
        scope.fadeText = true
        scope.upload = true
        scope.header = 'COMMON.DIRECTIVES.INTERFACE.UPLOADER.HEADER_UPLOAD'
        scope.info = 'COMMON.DIRECTIVES.INTERFACE.UPLOADER.INFO_UPLOAD'
        _startImmediateLoading()
        $timeout(()=>{
          scope.fadeText = false
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
        maxSize: '@',
        isPending: '=?',
        ngfValidate: '=?',
        errorMessage: '@'

      }
    }
  }


  angular.module('profitelo.directives.interface.pro-uploader', [
    'ngFileUpload',
    'profitelo.swaggerResources',
    'commonConfig',
    'pascalprecht.translate'
  ])
    .directive('proUploader', proUploader)
}())
