(function() {
  function proTopWaitingLoaderService($rootScope, $timeout, $interval) {

    let _bindedProgress
    let _immediateInProgress = false
    let _currentProgress = 0

    let _stopLoadingProcess = () => {
      _immediateInProgress = false
      _currentProgress = 0
      _bindedProgress(_currentProgress)
    }

    let _startImmediateLoading = () => {
      if (!_immediateInProgress) {
        _immediateInProgress = true
        let interval = $interval(function() {
          if (_currentProgress > 100) {
            $interval.cancel(interval)
            _stopLoadingProcess()
          } else {
            _currentProgress = _currentProgress + Math.floor((Math.random() * 20) + 20)
            _bindedProgress(_currentProgress)
          }
        }, 500)
      }
    }

    $rootScope.$on('$stateChangeSuccess', ()=> {
      $timeout(_stopLoadingProcess)
    })
    
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

  angular.module('profitelo.directives.pro-top-waiting-loader-service', [
    'pascalprecht.translate'
  ])
  .service('proTopWaitingLoaderService', proTopWaitingLoaderService)

}())
