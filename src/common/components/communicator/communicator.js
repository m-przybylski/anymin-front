(function() {

  /* @ngInject */
  function controller($log, callService) {

    this.isMinimized = (angular.isDefined(this.minimized) && this.minimized)
    this.isClosed = true

    this.minimizeCommunicator = () => {
      this.isMinimized = true
    }

    this.maximizeCommunicator = () => {
      this.isMinimized = false
    }

    const turnOffComponent = () => {
      this.isClosed = true
    }

    const turnOnComponent = () => {
      this.isClosed = false
    }

    callService.onHangup(_ => {
      turnOffComponent()
    })

    callService.onStartCall(_ => {
      turnOnComponent()
    })

    callService.onCallPendingError(err => {
      turnOffComponent()
      $log.error(err)
    })

    callService.onCallStarted(_ => {
      turnOnComponent()
    })

    return this
  }

  const component = {
    templateUrl: 'components/communicator/communicator.tpl.html',
    controller: controller,
    controllerAs: 'vm',
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
