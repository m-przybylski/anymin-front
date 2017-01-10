(function() {

  function service($q, $log, $timeout, FilesApi, CommonConfig, Upload) {

    const _commonConfig = CommonConfig.getAllData()

    const getUploadUrl = (_fileId) =>
      _commonConfig.urls.files + _commonConfig.urls['file-upload'].replace('%s', _fileId)

    const collectionTypes = {
      avatar: 'avatar'
    }

    const getInstance = (simultaneousUploadCount, collectionType) => {

      if (!collectionType || !collectionTypes.hasOwnProperty(collectionType)) {
        $log.error('Expected collectionType, got: ' + collectionType)
        return null
      }

      if (typeof simultaneousUploadCount !== 'number' || simultaneousUploadCount < 0) {
        $log.error('Expected simultaneousUploadCount to be >= 0, got: ' + simultaneousUploadCount)
        return null
      }

      let uploadingCount = 0

      const fileObjectsToUpload = []

      const scheduleUpload = () =>
        $timeout(processUpload)

      const onFileUploadEnd = () => {
        uploadingCount--
        scheduleUpload()
      }

      const onFileUpload = (fileObj, res) => {
        fileObj.deferred.resolve(res.data)
        onFileUploadEnd()
      }

      const onFileUploadError = (fileObj, err) => {
        fileObj.deferred.reject(err)
        onFileUploadEnd()
      }

      const onFileUploadProgress = (fileObj, res) => {
        if (typeof fileObj.callback === 'function') {
          $timeout(_ => fileObj.callback(res))
        }
      }

      const uploadFile = (fileObj, token) =>
        Upload.upload({
          url: getUploadUrl(token.fileId),
          data: {
            file: fileObj.file
          }
        }).then(
          (res) => onFileUpload(fileObj, res),
          (err) => onFileUploadError(fileObj, err),
          (res) => onFileUploadProgress(fileObj, res)
        )

      const onGetFileToken = (fileObj, token) => {
        uploadFile(fileObj, token)
      }

      const onGetFileTokenError = (fileObj, err) => {
        fileObj.deferred.reject(err)
        onFileUploadEnd()
      }

      const getFileToken = () =>
        FilesApi.tokenPath({collectionType: collectionType}).$promise

      const processUpload = () => {
        if ((uploadingCount < simultaneousUploadCount || simultaneousUploadCount === 0) && fileObjectsToUpload.length > 0) {
          uploadingCount++

          const fileObj = fileObjectsToUpload.shift()

          getFileToken()
            .then((token) => onGetFileToken(fileObj, token), (err) => onGetFileTokenError(fileObj, err))
        }
      }

      const addFileToQueue = (file, callback) => {
        const deferred = $q.defer()
        fileObjectsToUpload.push({
          file: file,
          deferred: deferred,
          callback: callback
        })
        return deferred
      }

      const addFile = (file, callback) => {
        if (!file || !(file instanceof File)) {
          return $q.reject('Expected File, got ' + typeof file)
        }

        const deferred = addFileToQueue(file, callback)

        scheduleUpload()

        return deferred.promise
      }

      return {
        uploadFile: addFile
      }
    }

    return {
      getInstance: getInstance,
      collectionTypes: collectionTypes
    }
  }

  angular.module('profitelo.services.uploader', [
    'profitelo.swaggerResources',
    'commonConfig'
  ])
      .config(($qProvider) => {
        $qProvider.errorOnUnhandledRejections(false)
      })
    .service('uploaderService', service)

}())
