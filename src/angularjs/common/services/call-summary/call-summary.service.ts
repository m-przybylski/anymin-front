import { CallSummary, ICallSummaryWebsocketObject } from '../../models/CallSummary';
import { ProfiteloWebsocketService } from '../profitelo-websocket/profitelo-websocket.service';
import { ViewsApi } from 'profitelo-api-ng/api/api';
import { GetCallDetails } from 'profitelo-api-ng/model/models';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';

export class CallSummaryService {
  public static $inject = ['ViewsApi', 'profiteloWebsocket'];

  private readonly callSummaryBuffer = 10;

  private readonly onCallSummarySubject = new ReplaySubject<CallSummary>(this.callSummaryBuffer);

  constructor(private ViewsApi: ViewsApi, profiteloWebsocket: ProfiteloWebsocketService) {
    profiteloWebsocket.onCallSummary(this.onNewCallSummary);
  }

  public getCallSummary = (sueId: string): ng.IPromise<GetCallDetails> =>
    this.ViewsApi.getDashboardCallDetailsRoute(sueId)

  public onCallSummary = (callback: (callSummary: CallSummary) => void): Subscription =>
    this.onCallSummarySubject.subscribe(callback)

  private onNewCallSummary = (data: ICallSummaryWebsocketObject): void => {
    this.onCallSummarySubject.next(data.callSummary);
  }
}
