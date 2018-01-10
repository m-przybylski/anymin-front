import {CallSummary, ICallSummaryWebsocketObject} from '../../models/CallSummary'
import * as _ from 'lodash'
import {ProfiteloWebsocketService} from '../profitelo-websocket/profitelo-websocket.service'
import {IExpertCallSummary} from '../../models/ExpertCallSummary'
import {IClientCallSummary} from '../../models/ClientCallSummary'
import {Subject} from 'rxjs/Subject'
import {Subscription} from 'rxjs/Subscription'

export class CallSummaryService {

  private callSummaries: CallSummary[]

  private readonly onCallSummarySubject = new Subject<CallSummary>();

    constructor(profiteloWebsocket: ProfiteloWebsocketService) {

    this.callSummaries = []
    profiteloWebsocket.onCallSummary(this.onNewCallSummary)
  }

  public onCallSummary = (callback: (callSummary: CallSummary) => void): Subscription =>
    this.onCallSummarySubject.subscribe(callback)

  public takeCallSummary = (serviceId: string): CallSummary | undefined => {
    const callSummary = _.find(this.callSummaries, callSummary => callSummary.service.id === serviceId)
    if (callSummary) {
      _.remove(this.callSummaries, callSummary)
    }

    return callSummary
  }

  public isExpertCallSummary =
    (callSummary: IExpertCallSummary | IClientCallSummary): callSummary is IExpertCallSummary =>
    (<IExpertCallSummary>callSummary).profit !== undefined

  private onNewCallSummary = (data: ICallSummaryWebsocketObject): void => {
    this.callSummaries.push(data.callSummary)
    this.onCallSummarySubject.next(data.callSummary)
  }
}
