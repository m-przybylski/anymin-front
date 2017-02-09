namespace profitelo.services.callSummary {

  import IProfiteloWebsocketService = profitelo.services.profiteloWebsocket.IProfiteloWebsocketService
  import CallSummary = profitelo.models.CallSummary
  import ICallbacksFactory = profitelo.services.callbacks.ICallbacksFactory
  import ICallbacksService = profitelo.services.callbacks.ICallbacksService

  export interface ICallSummaryService {
    takeCallSummary(accountId: string): CallSummary | undefined
    onCallSummary(callback: (callSummary: CallSummary) => void): void
  }

  class CallSummaryService implements ICallSummaryService {

    private callSummaries: Array<CallSummary>
    private callbacks: ICallbacksService

    private static events = {
      onCallSummary: 'onCallSummary'
    }

    constructor(callbacksFactory: ICallbacksFactory, profiteloWebsocket: IProfiteloWebsocketService,
                private lodash: _.LoDashStatic) {

      this.callSummaries = []
      this.callbacks = callbacksFactory.getInstance(Object.keys(CallSummaryService.events))
      profiteloWebsocket.onCallSummary(this.onNewCallSummary)
    }

    public onCallSummary = (callback: (callSummary: CallSummary) => void) => {
      this.callbacks.methods.onCallSummary(callback)
    }

    public takeCallSummary = (accountId: string): CallSummary | undefined => {
      const callSummary = this.lodash.find(this.callSummaries, callSummary => callSummary.accountId === accountId)

      if (callSummary) {
        this.lodash.remove(this.callSummaries, callSummary)
      }

      return callSummary
    }

    private onNewCallSummary = (_callSummary: CallSummary) => {
      this.callSummaries.push(_callSummary)
      this.callbacks.notify(CallSummaryService.events.onCallSummary, _callSummary)
    }
  }

  angular.module('profitelo.services.call-summary', [
    'profitelo.services.callbacks',
    'profitelo.services.profitelo-websocket',
    'ngLodash'
  ])
  .service('callSummaryService', CallSummaryService)
}
