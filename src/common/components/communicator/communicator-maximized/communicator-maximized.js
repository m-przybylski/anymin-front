(function() {

  /* @ngInject */
  function controller($element, callService, HelperService) {

    this.service = null
    this.expert = null
    this.isRemoteVideo = true
    this.isLocalVideo = true
    this.isConnecting = true
    this.callLengthInSeconds = 0
    this.callCost = null

    const localStreamElement = $element.find('.video-player-local video')
    const remoteStreamElement = $element.find('.video-player-remote video')

    const bindStreamElements = () => {
      callService.bindLocalStreamElement(localStreamElement)
      callService.bindRemoteStreamElement(remoteStreamElement)
    }

    const setCallData = callData => {
      this.service = callData.service
      this.expert = callData.expert
      this.expert.expertDetails.avatar = HelperService.fileUrlResolver(this.expert.expertDetails.avatar)
    }

    callService.onClientCallStart(_ =>
      bindStreamElements())

    callService.onClientCallPending(callData => {
      setCallData(callData)
      bindStreamElements()
      this.isConnecting = true
      this.isRemoteVideo = false
      console.log(callData)
    })

    callService.onClientCallStarted(_ => {
      bindStreamElements()
      this.isConnecting = false
      this.isRemoteVideo = true
    })

    callService.onExpertCallIncoming(_ =>
      bindStreamElements())

    callService.onExpertCallAnswer(_ =>
      bindStreamElements())

    callService.onExpertCallJoin(_ => {
      bindStreamElements()
      this.isConnecting = false
      this.isRemoteVideo = true
    })

    callService.onTimeCostChange(timeCost => {
      this.callLengthInSeconds = parseInt(timeCost.time, 10)
      this.callCost = {
        amount: timeCost.cost ? parseInt(timeCost.cost, 10) : 0,
        currency: 'PLN'
      }
    })

    callService.onExpertCallIncoming(service => {
      this.service = service
    })

    return this
  }

  const component = {
    templateUrl: 'components/communicator/communicator-maximized/communicator-maximized.tpl.html',
    controller: controller,
    controllerAs: 'vm',
    bindings: {
      minimizeCommunicator: '=',
      hangupCall: '='
    }
  }

  angular.module('profitelo.components.communicator.communicator-maximized', [
    'pascalprecht.translate',
    'profitelo.services.call',
    'profitelo.services.helper',
    'profitelo.filters.money',
    'profitelo.filters.seconds-to-datetime',
    'profitelo.components.communicator.communicator-maximized.navigation'
  ])
    .component('communicatorMaximized', component)
}())
