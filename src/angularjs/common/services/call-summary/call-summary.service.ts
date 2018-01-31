import { CallSummary, ICallSummaryWebsocketObject } from '../../models/CallSummary';
import * as _ from 'lodash';
import { ProfiteloWebsocketService } from '../profitelo-websocket/profitelo-websocket.service';
import { IExpertCallSummary } from '../../models/ExpertCallSummary';
import { IClientCallSummary } from '../../models/ClientCallSummary';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

export class CallSummaryService {

  private callSummaries: CallSummary[];

  private readonly onCallSummarySubject = new Subject<CallSummary>();

  static $inject = ['profiteloWebsocket'];

  constructor(profiteloWebsocket: ProfiteloWebsocketService) {

    this.callSummaries = [];
    profiteloWebsocket.onCallSummary(this.onNewCallSummary);
  }

  public onCallSummary = (callback: (callSummary: CallSummary) => void): Subscription =>
    this.onCallSummarySubject.subscribe(callback)

  public getCallSummary = (serviceId: string): CallSummary | undefined => {
    this.callSummaries = this.callSummaries.filter(callSummary => callSummary.service.id !== serviceId);
    return _.find(this.callSummaries, callSummary => callSummary.service.id === serviceId);
  }

  public removeCallSummary = (callSummary: CallSummary): void => {
    this.callSummaries = this.callSummaries.filter(summary => summary !== callSummary);
  }

  public isExpertCallSummary =
    (callSummary: IExpertCallSummary | IClientCallSummary): callSummary is IExpertCallSummary =>
      (<IExpertCallSummary>callSummary).profit !== undefined

  private onNewCallSummary = (data: ICallSummaryWebsocketObject): void => {
    this.callSummaries.push(data.callSummary);
    this.onCallSummarySubject.next(data.callSummary);
  }
}
