describe('Unit testing: profitelo.services.uploader >', () => {
  describe('for profitelo.services.uploader', () => {

    let uploaderService
    function File() {}
    let originalFile

    const UploadMock = {
      upload: _ => _
    }

    beforeEach(module(($provide) => {
      $provide.value('apiUrl', 'awesomeURL')
      $provide.value('Upload', UploadMock)
    }))

    beforeEach(() => {
      module('profitelo.services.uploader')
    })

    beforeEach(inject(($injector) => {

      uploaderService = $injector.get('uploaderService')
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

    it('should upload 2 files at a time', inject(($q, $timeout, $rootScope, FilesApi) => {
      spyOn(FilesApi, 'tokenPath').and.returnValue({
        $promise: $q.resolve({fileId: 1})
      })

      const instance = uploaderService.getInstance(2, uploaderService.collectionTypes.avatar)

      spyOn(UploadMock, 'upload').and.returnValue($q.resolve('result'))

      instance.uploadFile(new File())
      instance.uploadFile(new File())

      $timeout.flush()

      expect(FilesApi.tokenPath).toHaveBeenCalled()
      expect(UploadMock.upload.calls.count()).toEqual(2)
    }))

    it('should not create instance with wrong simultaneousUploadCount', inject(($log) => {
      spyOn($log, 'error')

      const instance = uploaderService.getInstance(-1, uploaderService.collectionTypes.avatar)

      expect(instance).toEqual(null)
      expect($log.error).toHaveBeenCalled()
    }))

    it('should not create instance with wrong collectionType', inject(($log) => {
      spyOn($log, 'error')

      const instance = uploaderService.getInstance(5, 'wrong')

      expect(instance).toEqual(null)
      expect($log.error).toHaveBeenCalled()
    }))

    it('should not upload empty file', inject(($rootScope) => {
      const instance = uploaderService.getInstance(2, uploaderService.collectionTypes.avatar)

      let promiseValue = true
      instance.uploadFile(null).then(_ => _, val => promiseValue = val)

      $rootScope.$digest()

      expect(promiseValue).toEqual('Expected file, got object')
    }))

    it('should not upload file if token error', inject(($q, $timeout, $rootScope, FilesApi) => {
      spyOn(FilesApi, 'tokenPath').and.returnValue({
        $promise: $q.reject('error')
      })

      const instance = uploaderService.getInstance(2, uploaderService.collectionTypes.avatar)

      let returnValue = null
      instance.uploadFile(new File()).then(_ => _, val => returnValue = val)

      $timeout.flush()
      $rootScope.$digest()

      expect(FilesApi.tokenPath).toHaveBeenCalled()
      expect(returnValue).toEqual('error')
    }))

    it('should return error if upload error', inject(($q, $timeout, $rootScope, FilesApi) => {
      spyOn(FilesApi, 'tokenPath').and.returnValue({
        $promise: $q.resolve({fileId: 1})
      })

      const instance = uploaderService.getInstance(2, uploaderService.collectionTypes.avatar)

      spyOn(UploadMock, 'upload').and.returnValue($q.reject('error'))

      let returnValue = null
      instance.uploadFile(new File()).then(_ => _, val => returnValue = val)

      $timeout.flush()
      $rootScope.$digest()

      expect(FilesApi.tokenPath).toHaveBeenCalled()
      expect(UploadMock.upload).toHaveBeenCalled()
      expect(returnValue).toEqual('error')
    }))

    it('should call callback on upload progress', inject(($q, $timeout, $rootScope, FilesApi) => {
      spyOn(FilesApi, 'tokenPath').and.returnValue({
        $promise: $q.resolve({fileId: 1})
      })

      const obj = {
        callback: _ => _
      }

      const instance = uploaderService.getInstance(2, uploaderService.collectionTypes.avatar)

      spyOn(obj, 'callback')
      spyOn(UploadMock, 'upload').and.callFake(() => {
        const deferred = $q.defer()
        $timeout(() => deferred.notify('progress'))
        return deferred.promise
      })

      instance.uploadFile(new File(), obj.callback)

      $timeout.flush()

      expect(FilesApi.tokenPath).toHaveBeenCalled()
      expect(UploadMock.upload).toHaveBeenCalled()
      expect(obj.callback).toHaveBeenCalled()
    }))

    it('should upload files with no limits', inject(($q, $timeout, $rootScope, FilesApi) => {
      spyOn(FilesApi, 'tokenPath').and.returnValue({
        $promise: $q.resolve({fileId: 1})
      })

      const instance = uploaderService.getInstance(0, uploaderService.collectionTypes.avatar)

      spyOn(UploadMock, 'upload').and.returnValue($q.resolve(''))

      instance.uploadFile(new File())

      $timeout.flush()

      expect(FilesApi.tokenPath).toHaveBeenCalled()
      expect(UploadMock.upload).toHaveBeenCalled()
    }))
  })
})
