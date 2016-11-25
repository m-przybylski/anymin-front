(function() {

  /* @ngInject */
  function controller($timeout, $log, callService) {

    this.isMinimized = (angular.isDefined(this.minimized) && this.minimized)
    this.isClosed = true
    this.isDisconnected = false

    this.minimizeCommunicator = () => {
      this.isMinimized = true
    }

    this.maximizeCommunicator = () => {
      this.isMinimized = false
    }

    const turnOffComponent = () => {
      this.isClosed = true
      this.isDisconnected = false
    }

    const turnOnComponent = () => {
      this.isClosed = false
    }

    callService.onHangup(_ => {
      this.isDisconnected = true
      $timeout(() => {
        turnOffComponent()
        this.isDisconnected = false
      }, 500)
    })

    callService.onClientCallHangup(_ => {
      turnOffComponent()
    })

    callService.onClientCallRejected(_ => {
      turnOffComponent()
    })

    callService.onClientCallStart(_ => {
    })

    callService.onClientCallPendingError(err => {
      turnOffComponent()
      $log.error(err)
    })

    callService.onClientCallPending(_ => {
      turnOnComponent()
    })

    callService.onExpertCallAnswer(_ => {
      turnOnComponent()
    })

    callService.onExpertCallReject(_ => {
      turnOffComponent()
    })

    angular.element('.communicator').on('dragover', (e) => {
      e.preventDefault()
    })

    angular.element('.communicator').on('drop', (e) => {
      e.preventDefault()
    })

    return this
  }

  const component = {
    templateUrl: 'components/communicator/communicator.tpl.html',
    controller: controller,
    bindings: {
      minimized: '<?'
    }
  }

  angular.module('profitelo.components.communicator', [
    'pascalprecht.translate',
    'profitelo.services.call',
    'profitelo.components.communicator.communicator-maximized',
    'profitelo.components.communicator.communicator-minimized'
  ])
    .component('communicator', component)
}())
