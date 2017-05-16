import {CallbacksService} from '../callbacks/callbacks.service'
import {CallbacksFactory} from '../callbacks/callbacks.factory'
import {CallSummary} from '../../models/CallSummary'
import * as _ from 'lodash'
import {ProfiteloWebsocketService} from '../profitelo-websocket/profitelo-websocket.service'

export class CallSummaryService {

  private callSummaries: Array<CallSummary>
  private callbacks: CallbacksService

  private static events = {
    onCallSummary: 'onCallSummary'
  }

  /* @ngInject */
  constructor(callbacksFactory: CallbacksFactory, profiteloWebsocket: ProfiteloWebsocketService) {

    this.callSummaries = []
    this.callbacks = callbacksFactory.getInstance(Object.keys(CallSummaryService.events))
    profiteloWebsocket.onCallSummary(this.onNewCallSummary)
  }

  public onCallSummary = (callback: (callSummary: CallSummary) => void) => {
    this.callbacks.methods.onCallSummary(callback)
  }

  public takeCallSummary = (accountId: string): CallSummary | undefined => {
    const callSummary = _.find(this.callSummaries, callSummary => callSummary.accountId === accountId)

    if (callSummary) {
      _.remove(this.callSummaries, callSummary)
    }

    return callSummary
  }

  private onNewCallSummary = (_callSummary: CallSummary) => {
    this.callSummaries.push(_callSummary)
    this.callbacks.notify(CallSummaryService.events.onCallSummary, _callSummary)
  }
}
