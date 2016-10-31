(function() {

  /* @ngInject */
  function controller(callService, HelperService) {

    this.callLengthInSeconds = 0
    this.callCost = 0
    this.service = null
    this.expert = null

    const setCallData = callData => {
      this.service = callData.service
      this.expert = callData.expert
      this.expert.expertDetails.avatar = HelperService.fileUrlResolver(this.expert.expertDetails.avatar)
    }

    callService.onClientCallPending(callData => {
      setCallData(callData)
    })

    callService.onTimeCostChange(timeCost => {
      this.callLengthInSeconds = parseInt(timeCost.time, 10)
      this.callCost = timeCost.cost ? parseInt(timeCost.cost, 10)/100 : 0
    })

    return this
  }

  const component = {
    templateUrl: 'components/communicator/communicator-minimized/communicator-minimized.tpl.html',
    controller: controller,
    controllerAs: 'vm',
    bindings: {
      maximizeCommunicator: '='
    }
  }

  angular.module('profitelo.components.communicator.communicator-minimized', [
    'pascalprecht.translate',
    'profitelo.services.call',
    'profitelo.services.helper'
  ])
    .component('communicatorMinimized', component)
}())
