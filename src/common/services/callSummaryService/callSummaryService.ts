(function() {

  function service(UtilsService, profiteloWebsocket, _) {

    const events = {
      onCallSummary: 'onCallSummary'
    }

    const callSummaries = []

    const callbacks = UtilsService.callbacksFactory(Object.keys(events))

    const onCallSummary = (_callSummary) => {
      callSummaries.push(_callSummary)
      callbacks.notify(events.onCallSummary, _callSummary)
    }

    profiteloWebsocket.onCallSummary(onCallSummary)

    const takeCallSummary = (accountId) => {
      const callSummary = _.find(callSummaries, callSummary => callSummary.accountId === accountId)

      if (callSummary) {
        _.remove(callSummaries, callSummary)
      }

      return callSummary
    }

    const api = {
      takeCallSummary: takeCallSummary
    }

    return angular.extend(api, callbacks.methods)
  }

  angular.module('profitelo.services.call-summary', [
    'profitelo.services.utils',
    'profitelo.services.profitelo-websocket',
    'lodash'
  ])
    .service('callSummaryService', service)
}())