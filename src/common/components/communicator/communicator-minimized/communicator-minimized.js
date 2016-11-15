(function() {

  /* @ngInject */
  function controller(callService, HelperService) {

    this.callLengthInSeconds = 0
    this.callCost = null
    this.name = ''
    this.avatar = ''
    this.isConnecting = true

    const setCallData = callData => {
      this.avatar = HelperService.fileUrlResolver(callData.expert.expertDetails.avatar)
      this.name = callData.expert.expertDetails.name
    }

    callService.onClientCallStart(_ => {
      this.callLengthInSeconds = 0
      this.callCost = {amount: 0, currency: 'PLN'}
      this.name = ''
      this.avatar = ''
      this.isConnecting = true
    })

    callService.onClientCallPending(callData => {
      setCallData(angular.copy(callData))
    })

    callService.onTimeCostChange(timeCost => {
      this.callLengthInSeconds = parseInt(timeCost.time, 10)
      this.callCost = {
        amount: timeCost.cost ? parseInt(timeCost.cost, 10) : 0,
        currency: 'PLN'
      }
    })

    callService.onExpertCallJoin(_ => {
      this.isConnecting = false
    })

    callService.onClientCallStarted(_ => {
      this.isConnecting = false
    })

    callService.onExpertCallIncoming(service => {
      this.name = service.details.name
      this.avatar = ''
    })

    return this
  }

  const component = {
    templateUrl: 'components/communicator/communicator-minimized/communicator-minimized.tpl.html',
    controller: controller,
    controllerAs: 'vm',
    bindings: {
      maximizeCommunicator: '<'
    }
  }

  angular.module('profitelo.components.communicator.communicator-minimized', [
    'pascalprecht.translate',
    'profitelo.services.call',
    'profitelo.services.helper',
    'profitelo.filters.money',
    'profitelo.filters.seconds-to-datetime'
  ])
    .component('communicatorMinimized', component)
}())
