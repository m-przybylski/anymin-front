import {CallSummary, CallSummaryWebsocketObject} from '../../models/CallSummary'
import * as _ from 'lodash'
import {ProfiteloWebsocketService} from '../profitelo-websocket/profitelo-websocket.service'
import {ExpertCallSummary} from '../../models/ExpertCallSummary'
import {ClientCallSummary} from '../../models/ClientCallSummary'
import {Subject} from 'rxjs/Subject'

export class CallSummaryService {

  private callSummaries: CallSummary[]

  private readonly onCallSummarySubject = new Subject<CallSummary>();

  /* @ngInject */
  constructor(profiteloWebsocket: ProfiteloWebsocketService) {

    this.callSummaries = []
    profiteloWebsocket.onCallSummary(this.onNewCallSummary)
  }

  public onCallSummary = (callback: (callSummary: CallSummary) => void): void => {
    this.onCallSummarySubject.subscribe(callback)
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
    this.onCallSummarySubject.next(data.callSummary)
  }
}
