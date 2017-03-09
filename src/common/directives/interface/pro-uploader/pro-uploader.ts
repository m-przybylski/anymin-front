import * as angular from "angular"
import "ng-file-upload"
import {FilesApi} from "../../../api/api/FilesApi"
import {TopAlertService} from "../../../services/top-alert/top-alert.service"
import {FileInfo} from "../../../api/model/FileInfo"
import apiModule from "../../../api/api.module"

function proUploader($log: ng.ILogService, $timeout: ng.ITimeoutService, $interval: ng.IIntervalService,
                     $filter: ng.IFilterService, $q: ng.IQService, FilesApi: FilesApi, Upload: any,
                     CommonConfig: any, topAlertService: TopAlertService) {


  function linkFunction(scope: any, _element: ng.IRootElementService, attr: any) {

    let _file = 0
    let _files = 0
    let immediateInterval: ng.IPromise<any>
    let _commonConfig = CommonConfig.getAllData()
    let uploadMap = {}
    let filesQueue: Array<any> = []
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

    let _setFilesStatus = (currentFile: any, allFiles: any) => {
      scope.translationInfo = {
        file: currentFile,
        files: allFiles
      }
    }

    let calculateTotalPercentage = (map: any, filesLength: number) => {
      let tmpPercentage = 0

      for (let a in map) {
        if (a) {
          tmpPercentage += map[a] / parseInt(a) * 100
        }
      }
      if (tmpPercentage > scope.progress) {
        scope.progress = tmpPercentage / parseInt(<any>filesLength, 10)
      }

    }

    let _uploadProcess = (files: Array<any>) => {
      let tokenPromisses: Array<ng.IPromise<FileInfo>> = []
      if (files && files.length) {
        // scope.animate()
        _file = 0
        isProcess = true
        for (var i = 0; i < files.length; i++) {
          if (!files[i].$error) {
            tokenPromisses.push(FilesApi.fileInfoPath(
              'AVATAR' // TODO send proper collectionType
            ))
            scope.errorValidateMessage = false
          }
        }
        let k = 0
        $q.all(tokenPromisses).then((tokenPromissesResponse) => {
          angular.forEach(files, (file) => {
            _files = files.length
            _setFilesStatus(_file, _files)
            Upload.upload({
              url: _commonConfig.urls.files + _commonConfig.urls['file-upload'].replace('%s', tokenPromissesResponse[k++].id),
              data: {
                file: file
              }
            }).then(
              (res: any) => {
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
              (err: any) => {
                $log.error(err)
                topAlertService.error({
                  message: $filter('translate')('INTERFACE.API_ERROR'),
                  timeout: 4
                })
                isProcess = false
              },
              (res: any) => {
                (<any>uploadMap)[res.total] = res.loaded
                calculateTotalPercentage(uploadMap, files.length)
                _setFilesStatus(_file, _files)
              }
            )
          })
        }, (tokenPromissesError) => {
          $log.error(tokenPromissesError)
          topAlertService.error({
            message: $filter('translate')('INTERFACE.API_ERROR'),
            timeout: 4
          })
          isProcess = false
        })
      } else {
        scope.errorValidateMessage = true
      }
    }


    scope.uploadFiles = ($files: any) => {
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
      $timeout(() => {
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
          $timeout(() => {
            $interval.cancel(immediateInterval)
          })
        }
      }, 100)
    }

    scope.deleteImage = () => {
      scope.uploadImg = false
      scope.filesUploaded = []
    }

    /* istanbul ignore next */
    scope.animate = function () {
      scope.showArrow = false
      scope.hideArrow = true
      scope.hideLoader = false
      scope.fadeText = false
      $timeout(() => {
        scope.fadeText = true
        $timeout(() => {
          scope.upload = true
          scope.header = 'COMMON.DIRECTIVES.INTERFACE.UPLOADER.HEADER_UPLOAD'
          scope.info = 'COMMON.DIRECTIVES.INTERFACE.UPLOADER.INFO_UPLOAD'
          _startImmediateLoading()
          scope.translationInfo = {
            file: _file,
            files: _files
          }
          $timeout(() => {
            scope.fadeText = false
          }, 200)
        }, 200)
      }, 200)

    }
  }

  return {
    template: require('./pro-uploader.jade')(),
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
  apiModule,
  'profitelo.directives.interface.pro-alert',
  'commonConfig',
  'pascalprecht.translate'
])
  .directive('proUploader', proUploader)
