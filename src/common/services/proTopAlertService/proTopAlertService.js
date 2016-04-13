(function() {
  function proTopAlertService() {
    _pushAlert = (alert) => {
      // funkcja z binda
    }

    _successAlert = (message, header, icon) => {
      _pushAlert({
        type: 'success',
        header: header,
        message: message,
        icon: 'icon-warning-24'
      })
    }
    return {
      bindProgress: (progress) => {
        _currentProgress = 0
        _bindedProgress = progress
        _bindedProgress(_currentProgress)
      },
      immediate: () => {
        $timeout(_startImmediateLoading)
      },
      stopLoader: () => {
        $timeout(_stopLoadingProcess)
      }
    }
  }
}())