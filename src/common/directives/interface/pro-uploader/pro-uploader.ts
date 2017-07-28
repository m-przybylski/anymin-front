import * as angular from 'angular'
import 'ng-file-upload'
import apiModule from 'profitelo-api-ng/api.module'
import {FilesApi} from 'profitelo-api-ng/api/api'

import {TopAlertService} from '../../../services/top-alert/top-alert.service'
import {IDirective} from 'angular'

function proUploader($log: ng.ILogService, $timeout: ng.ITimeoutService, $interval: ng.IIntervalService,
                     $filter: ng.IFilterService, $q: ng.IQService, FilesApi: FilesApi, Upload: any,
                     CommonConfig: any, topAlertService: TopAlertService): IDirective {

  function linkFunction(scope: any, _element: ng.IRootElementService, attr: any): void {

    let _file = 0
    let _files = 0
    let immediateInterval: ng.IPromise<any>
    const _commonConfig = CommonConfig.getAllData()
    let uploadMap = {}
    let filesQueue: any[] = []
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

    const _setFilesStatus = (currentFile: any, allFiles: any): void => {
      scope.translationInfo = {
        file: currentFile,
        files: allFiles
      }
    }

    const calculateTotalPercentage = (map: any, filesLength: number): void => {
      let tmpPercentage = 0
      const numeralSystem: number = 10
      const percentMultipiler: number = 100

      for (const a in map) {
        if (a) {
          tmpPercentage += map[a] / parseInt(a) * percentMultipiler
        }
      }
      if (tmpPercentage > scope.progress) {
        scope.progress = tmpPercentage / parseInt(<any>filesLength, numeralSystem)
      }

    }

    const _uploadProcess = (files: any[]): void => {
      const tokenPromisses: ng.IPromise<string>[] = []
      if (files && files.length) {
        // scope.animate()
        _file = 0
        isProcess = true
        for (let i = 0; i < files.length; i++) {
          if (!files[i].$error) {
            FilesApi.createFileTokenPath(
              'documents', {}
            ).then((res: any) => {
              tokenPromisses.push(res.fileId)
              let k = 0
              $q.all(tokenPromisses).then((tokenPromissesResponse) => {
                angular.forEach(files, (file) => {
                  _files = files.length
                  _setFilesStatus(_file, _files)
                  Upload.upload({
                    url: _commonConfig.urls.files +
                    _commonConfig.urls['file-upload'].replace('%s', tokenPromissesResponse[k++]),
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
            })
            scope.errorValidateMessage = false
          }
        }
      } else {
        scope.errorValidateMessage = true
      }
    }

    scope.uploadFiles = ($files: any): void => {
      if (isProcess) {
        if ($files !== null) {
          filesQueue = filesQueue.concat($files)
        }
      } else {
        _uploadProcess($files)
      }
    }
    /* istanbul ignore next */
    const _endImmediateLoading = (): void => {
      const setCopyTextTimeout: number = 200
      scope.progress = 0
      uploadMap = {}
      scope.fadeText = true
      $timeout(() => {
        scope.header = 'COMMON.DIRECTIVES.INTERFACE.UPLOADER.HEADER'
        scope.info = 'COMMON.DIRECTIVES.INTERFACE.UPLOADER.INFO'
      }, setCopyTextTimeout)
      scope.hideLoader = true
      scope.upload = false
      scope.hideArrow = false
      scope.showArrow = true
      scope.isPending = false
    }
    /* istanbul ignore next */
    const _startImmediateLoading = (): void => {
      const intervalDelay: number = 100
      const maxProgessValue: number = 100
      immediateInterval = $interval(() => {
        if (scope.progress >= maxProgessValue) {
          _endImmediateLoading()
          $timeout(() => {
            $interval.cancel(immediateInterval)
          })
        }
      }, intervalDelay)
    }

    scope.deleteImage = (): void => {
      scope.uploadImg = false
      scope.filesUploaded = []
    }

    /* istanbul ignore next */
    scope.animate = function (): void {
      const changeTextTimeout: number = 200
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
          }, changeTextTimeout)
        }, changeTextTimeout)
      }, changeTextTimeout)

    }
  }

  return {
    template: require('./pro-uploader.pug')(),
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
