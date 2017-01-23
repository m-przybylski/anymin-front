module profitelo.services.callSummary {

  import IProfiteloWebsocketService = profitelo.services.profiteloWebsocket.IProfiteloWebsocketService
  import IUtilsService = profitelo.services.utils.IUtilsService
  import CallSummary = profitelo.models.CallSummary

  export interface ICallSummaryService {
    takeCallSummary(accountId: string): CallSummary
    onCallSummary(callback: (CallSummary) => void): void
  }

  class CallSummaryService implements ICallSummaryService {

    private callSummaries: Array<CallSummary>
    private callbacks: any

    private static events = {
      onCallSummary: 'onCallSummary'
    }

    constructor(private utilsService: IUtilsService, private profiteloWebsocket: IProfiteloWebsocketService,
                private lodash: _.LoDashStatic) {

      this.callSummaries = []
      this.callbacks = utilsService.callbacksFactory(Object.keys(CallSummaryService.events))
      profiteloWebsocket.onCallSummary(this.onNewCallSummary)
    }

    public onCallSummary = (callback: (CallSummary) => void) => {
      this.callbacks.methods.onCallSummary(callback)
    }

    public takeCallSummary = (accountId) => {
      const callSummary = this.lodash.find(this.callSummaries, callSummary => callSummary.accountId === accountId)

      if (callSummary) {
        this.lodash.remove(this.callSummaries, callSummary)
      }

      return callSummary
    }

    private onNewCallSummary = (_callSummary) => {
      this.callSummaries.push(_callSummary)
      this.callbacks.notify(CallSummaryService.events.onCallSummary, _callSummary)
    }
  }

  angular.module('profitelo.services.call-summary', [
    'profitelo.services.utils',
    'profitelo.services.profitelo-websocket',
    'ngLodash'
  ])
  .service('callSummaryService', CallSummaryService)
}