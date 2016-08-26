(function() {
  function proUploader($timeout, $interval, $filter, $q, FilesApi, Upload, CommonConfig, proTopAlertService) {

    function  linkFunction(scope, element, attr) {

      let _file = 0
      let _files = 0
      let immediateInterval
      let _commonConfig = CommonConfig.getAllData()
      let uploadMap = {}
      let filesQueue = []
      let isProcess = false

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

      let _setFilesStatus = (currentFile, allFiles) => {
        scope.translationInfo = {
          file: currentFile,
          files: allFiles
        }
      }

      let calculateTotalPercentage = (map, filesLength) => {
        let tmpPercentage = 0

        for (let a in map) {
          if (a) {
            tmpPercentage += map[a] / a * 100 
          }
        }
        if (tmpPercentage > scope.progress) {
          scope.progress = parseInt( tmpPercentage / filesLength, 10)
        }

      }

      let _uploadProcess = (files) => {
        let tokenPromisses = []
        if (files && files.length) {
          //scope.animate()
          _file = 0
          isProcess = true
          for (var i = 0; i < files.length; i++) {
            if (!files[i].$error) {
              tokenPromisses.push(FilesApi.tokenPath().$promise)
              scope.errorValidateMessage = false
            }
          }
          let k = 0
          $q.all(tokenPromisses).then((tokenPromissesResponse) => {
            angular.forEach(files, (file) => {
              _files = files.length
              _setFilesStatus(_file, _files)
              Upload.upload({
                url: _commonConfig.urls.backend + _commonConfig.urls['file-upload'].replace('%s', tokenPromissesResponse[k++].fileId),
                data: {
                  file: file
                }
              }).then(
                (res) => {
                  scope.filesUploaded.push({
                    file: file,
                    response: res.data
                  })
                  _file++

                  if (_file === _files) {
                    scope.progress = 0
                    if (filesQueue.length > 0) {
                      _uploadProcess(filesQueue)
                      filesQueue = []
                    } else {
                      isProcess = false
                    }
                  }
                },
                (err) => {
                  proTopAlertService.error({
                    message: $filter('translate')('INTERFACE.API_ERROR'),
                    timeout: 4
                  })
                  isProcess = false
                },
                (res) => {
                  uploadMap[res.total] = res.loaded
                  calculateTotalPercentage(uploadMap, files.length)
                  _setFilesStatus(_file, _files)
                }
              )
            })
          }, (tokenPromissesError) => {
            proTopAlertService.error({
              message: $filter('translate')('INTERFACE.API_ERROR'),
              timeout: 4
            })
            isProcess = false
          })
        } else {
          scope.errorValidateMessage = true
        }
      }


      scope.uploadFiles = ($files)=> {
       // console.log(isProcess)
        if (isProcess) {
          if ($files !== null) {
            filesQueue = filesQueue.concat($files)
          }
        } else {
          _uploadProcess($files)
        }
      }
      /* istanbul ignore next */
      let _endImmediateLoading = () => {
        scope.progress = 0
        uploadMap = {}
        scope.fadeText = true
        $timeout(()=> {
          scope.header = 'COMMON.DIRECTIVES.INTERFACE.UPLOADER.HEADER'
          scope.info = 'COMMON.DIRECTIVES.INTERFACE.UPLOADER.INFO'
        }, 200)
        scope.hideLoader = true
        scope.upload = false
        scope.hideArrow = false
        scope.showArrow = true
        scope.isPending = false
      }
      /* istanbul ignore next */
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

      /* istanbul ignore next */
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
    'profitelo.directives.interface.pro-alert',
    'commonConfig',
    'pascalprecht.translate'
  ])
    .directive('proUploader', proUploader)
}())
