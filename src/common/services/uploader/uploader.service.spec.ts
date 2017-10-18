import * as angular from 'angular'
import {FilesApi, FilesApiMock} from 'profitelo-api-ng/api/api'
import {UploaderFactory} from './uploader.factory'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import uploaderModule from './uploader'
import {httpCodes} from '../../classes/http-codes'

class File {
  constructor() {
  }
}

interface Window {
  File: any
}

declare const window: Window

describe('Unit testing: profitelo.services.uploader >', () => {
  describe('for profitelo.services.uploader', () => {

    let uploaderFactory: UploaderFactory

    let originalFile: File

    const UploadMock: any = {
      upload: (_: any): void => _
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
      angular.mock.module(uploaderModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('Upload', UploadMock)
    }))

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
      uploaderFactory = $injector.get<UploaderFactory>('uploaderFactory')
    }))

    beforeEach(() => {
      originalFile = window.File
      window.File = File
    })

    afterEach(() => {
      window.File = originalFile
    })

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should upload 2 files at a time', inject(($q: ng.IQService, $timeout: ng.ITimeoutService,
                                                  FilesApiMock: FilesApiMock, $httpBackend: ng.IHttpBackendService) => {

      FilesApiMock.createFileTokenPath(httpCodes.ok, {fileId: '1'})

      const simultaneousUploadCount = 2
      const instance = uploaderFactory.getInstance(simultaneousUploadCount)

      spyOn(UploadMock, 'upload').and.returnValue($q.resolve('result'))

      instance.uploadFile(<any>new File(), {}, () => {
      })
      instance.uploadFile(<any>new File(), {}, () => {
      })

      $timeout.flush()
      $httpBackend.flush()

      expect(UploadMock.upload.calls.count()).toEqual(2)
    }))

    it('should not upload empty file', inject(($rootScope: IRootScopeService) => {
      const simultaneousUploadCount = 2
      const instance = uploaderFactory.getInstance(simultaneousUploadCount)

      let promiseValue = ''
      instance.uploadFile(<any>null, {}, () => {
      }).then(() => {
      }, val => promiseValue = val)

      $rootScope.$digest()

      expect(promiseValue).toEqual('Expected File, got object')
    }))

    it('should not upload file if token error', inject(($timeout: ng.ITimeoutService, $rootScope: IRootScopeService,
                                                        $httpBackend: ng.IHttpBackendService, FilesApiMock: FilesApiMock) => {
      FilesApiMock.createFileTokenPath(httpCodes.forbidden, undefined, 'error')

      const simultaneousUploadCount = 2
      const instance = uploaderFactory.getInstance(simultaneousUploadCount)

      let returnValue: any = {}
      instance.uploadFile(<any>new File, {}, () => {
      })
        .then(() => {
        }, (val: any) => returnValue = val)

      $timeout.flush()
      $rootScope.$digest()
      $httpBackend.flush()

      expect(returnValue.data).toEqual('error')
    }))

    it('should return error if upload error', inject(($q: ng.IQService, $timeout: ng.ITimeoutService,
                                                      $rootScope: IRootScopeService, FilesApiMock: FilesApiMock,
                                                      $httpBackend: ng.IHttpBackendService) => {

      FilesApiMock.createFileTokenPath(httpCodes.ok, {fileId: '1'})

      const simultaneousUploadCount = 2
      const instance = uploaderFactory.getInstance(simultaneousUploadCount)

      spyOn(UploadMock, 'upload').and.returnValue($q.reject('error'))

      let returnValue = ''

      instance.uploadFile(<any>new File(), {}, () => {
      })
        .then(() => {
        }, (val: any) => returnValue = val)

      $timeout.flush()
      $rootScope.$digest()
      $httpBackend.flush()

      expect(UploadMock.upload).toHaveBeenCalled()
      expect(returnValue).toEqual('error')
    }))

    it('should call callback on upload progress', inject(($q: ng.IQService, $timeout: ng.ITimeoutService,
                                                          FilesApi: FilesApi) => {
      spyOn(FilesApi, 'createFileTokenPath').and.returnValue($q.resolve({fileId: 1}))

      const obj = {
        callback: (): void => {
        }
      }

      const simultaneousUploadCount = 2
      const instance = uploaderFactory.getInstance(simultaneousUploadCount)

      spyOn(obj, 'callback')
      spyOn(UploadMock, 'upload').and.callFake(() => {
        const deferred = $q.defer()
        $timeout(() => deferred.notify('progress'))
        return deferred.promise
      })

      instance.uploadFile(<any>new File(), {}, obj.callback)

      $timeout.flush()

      expect(FilesApi.createFileTokenPath).toHaveBeenCalled()
      expect(UploadMock.upload).toHaveBeenCalled()
      expect(obj.callback).toHaveBeenCalled()
    }))

    it('should upload files with no limits', inject(($q: ng.IQService, $timeout: ng.ITimeoutService,
                                                     FilesApi: FilesApi) => {
      spyOn(FilesApi, 'createFileTokenPath').and.returnValue($q.resolve({fileId: 1}))

      const simultaneousUploadCount = 0
      const instance = uploaderFactory.getInstance(simultaneousUploadCount)

      spyOn(UploadMock, 'upload').and.returnValue($q.resolve(''))

      instance.uploadFile(<any>new File(), {}, () => {
      })

      $timeout.flush()

      expect(FilesApi.createFileTokenPath).toHaveBeenCalled()
      expect(UploadMock.upload).toHaveBeenCalled()
    }))
  })
})
