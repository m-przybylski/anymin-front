(function() {

  /* @ngInject */
  function controller($element, callService) {

    this.serviceName = null
    this.isRemoteVideo = true
    this.isLocalVideo = true
    this.isConnecting = true

    const localStreamElement = $element.find('.video-player-local video')
    const remoteStreamElement = $element.find('.video-player-remote video')

    const bindStreamElements = () => {
      callService.bindLocalStreamElement(localStreamElement)
      callService.bindRemoteStreamElement(remoteStreamElement)
    }

    callService.onCallPending(_ => {
      bindStreamElements()
    })

    callService.onStartCall(service => {
      if (angular.isDefined(service) && service) {
        this.serviceName = service.details.name
      }
      this.isConnecting = true
      this.isRemoteVideo = false
    })

    callService.onCallStarted(_ => {
      bindStreamElements()
      this.isConnecting = false
      this.isRemoteVideo = true
    })

    return this
  }

  const component = {
    templateUrl: 'components/communicator/communicator-maximized/communicator-maximized.tpl.html',
    controller: controller,
    controllerAs: 'vm',
    bindings: {
      minimizeCommunicator: '='
    }
  }

  angular.module('profitelo.components.communicator.communicator-maximized', [
    'pascalprecht.translate',
    'profitelo.services.call',
    'profitelo.components.communicator.communicator-maximized.navigation'
  ])
    .component('communicatorMaximized', component)
}())
