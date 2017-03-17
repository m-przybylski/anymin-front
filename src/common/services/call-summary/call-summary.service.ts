import {CallbacksService} from '../callbacks/callbacks.service'
import {CallbacksFactory} from '../callbacks/callbacks.factory'
import {ProfiteloWebsocketService} from '../profitelo-websocket/profitelo-websocket.service'
import {CallSummary} from '../../models/CallSummary'

export class CallSummaryService {

  private callSummaries: Array<CallSummary>
  private callbacks: CallbacksService

  private static events = {
    onCallSummary: 'onCallSummary'
  }

  constructor(callbacksFactory: CallbacksFactory, profiteloWebsocket: ProfiteloWebsocketService,
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
