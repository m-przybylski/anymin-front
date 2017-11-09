import {CallbacksService} from '../callbacks/callbacks.service'
import {CallbacksFactory} from '../callbacks/callbacks.factory'
import {CallSummary, CallSummaryWebsocketObject} from '../../models/CallSummary'
import * as _ from 'lodash'
import {ProfiteloWebsocketService} from '../profitelo-websocket/profitelo-websocket.service'
import {ExpertCallSummary} from '../../models/ExpertCallSummary'
import {ClientCallSummary} from '../../models/ClientCallSummary'

export class CallSummaryService {

  private callSummaries: CallSummary[]
  private callbacks: CallbacksService

  private static readonly events = {
    onCallSummary: 'onCallSummary'
  }

  /* @ngInject */
  constructor(callbacksFactory: CallbacksFactory, profiteloWebsocket: ProfiteloWebsocketService) {

    this.callSummaries = []
    this.callbacks = callbacksFactory.getInstance(Object.keys(CallSummaryService.events))
    profiteloWebsocket.onCallSummary(this.onNewCallSummary)
  }

  public onCallSummary = (callback: (callSummary: CallSummary) => void): void => {
    this.callbacks.methods.onCallSummary(callback)
  }

  public takeCallSummary = (serviceId: string): CallSummary | undefined => {
    const callSummary = _.find(this.callSummaries, callSummary => callSummary.service.id === serviceId)
    if (callSummary) {
      _.remove(this.callSummaries, callSummary)
    }

    return callSummary
  }

  public isExpertCallSummary =
    (callSummary: ExpertCallSummary | ClientCallSummary): callSummary is ExpertCallSummary =>
    (<ExpertCallSummary>callSummary).profit !== undefined

  private onNewCallSummary = (data: CallSummaryWebsocketObject): void => {
    this.callSummaries.push(data.callSummary)
    this.callbacks.notify(CallSummaryService.events.onCallSummary, data.callSummary)
  }
}
