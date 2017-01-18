(function () {

  /* @ngInject */
  function controller($timeout: ng.ITimeoutService, $element: ng.IRootElementService, callService, helperService) {

    this.isClosed = true
    this.isDisconnectedAnimation = false
    this.isConnecting = false

    this.service = null
    this.expert = null

    this.isRemoteVideo = false
    this.isLocalVideo = false
    this.isMessenger = false

    this.callLengthInSeconds = 0
    this.callCost = null

    const localStreamElement = $element.find('.video-player-local video')
    const remoteStreamElement = $element.find('.video-player-remote video')

    callService.setLocalStreamElement(localStreamElement)
    callService.setRemoteStreamElement(remoteStreamElement)

    const cleanupComponent = () => {
      this.isDisconnectedAnimation = false
      this.isConnecting = false
      this.service = null
      this.expert = null
      this.isRemoteVideo = false
      this.isLocalVideo = false
      this.isMessenger = false
      this.callLengthInSeconds = 0
      this.callCost = null
    }

    const onCallEnd = () => {
      this.isDisconnectedAnimation = true
      $timeout(() => {
        this.isClosed = true
        cleanupComponent()
      }, 500)
    }

    /* Starting events */
    callService.onClientCallPending(expertServiceTuple => {
      cleanupComponent()
      this.service = expertServiceTuple.service
      this.expert = expertServiceTuple.expert
      this.expertAvatar = helperService.fileUrlResolver(this.expert.expertDetails.avatar)
      this.isConnecting = true
      this.isClosed = false
    })

    /* Call started events */
    callService.onExpertCallAnswered(serviceInvitationTuple => {
      cleanupComponent()
      this.service = serviceInvitationTuple.service
      this.isConnecting = false
      this.isClosed = false
    })

    callService.onClientCallStarted(_ => {
      this.isConnecting = false
    })

    /* Call ended events */
    callService.onCallEnd(onCallEnd)

    /* Other events */
    const onVideoStart = () => {
      this.isRemoteVideo = true
    }

    const onVideoStop = () => {
      this.isRemoteVideo = false
    }

    callService.onVideoStart(onVideoStart)

    callService.onVideoStop(onVideoStop)

    callService.onTimeCostChange(timeMoneyTuple => {
      this.callLengthInSeconds = timeMoneyTuple.time
      this.callCost = timeMoneyTuple.money
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
  }

  angular.module('profitelo.components.communicator', [
    'pascalprecht.translate',
    'profitelo.services.call',
    'profitelo.services.helper',
    'profitelo.filters.money',
    'profitelo.filters.seconds-to-datetime',
    'profitelo.components.communicator.navigation',
    'profitelo.components.communicator.messenger'
  ])
  .component('communicator', component)
}())
