(function() {

  /* @ngInject */
  function controller($log, callService) {

    this.callType = null
    this.isMinimized = (angular.isDefined(this.minimized) && this.minimized)
    this.isClosed = true

    this.callTypes = {
      expert: 'expert',
      client: 'client'
    }

    const setCallType = callType => {
      if (this.callTypes.hasOwnProperty(callType)) {
        this.callType = callType
      }
    }

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

    this.hangupCall = () => {
      turnOffComponent()
      callService.hangupCall()
    }

    callService.onHangup(_ => {
      turnOffComponent()
    })

    callService.onClientCallStart(_ => {
      setCallType(this.callTypes.client)
    })

    callService.onClientCallPendingError(err => {
      turnOffComponent()
      $log.error(err)
    })

    callService.onClientCallPending(_ => {
      turnOnComponent()
    })

    callService.onExpertCallAnswer(_ => {
      setCallType(this.callTypes.expert)
      turnOnComponent()
    })

    callService.onExpertCallReject(_ => {
      turnOffComponent()
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
