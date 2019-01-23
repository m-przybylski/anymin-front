import { Observable, Subject, race } from 'rxjs';
import {
  ClientCallSummary,
  ExpertCallSummary,
  PostTechnicalProblem,
  ServiceUsageEventService,
  ViewsService,
} from '@anymind-ng/api';
import { CurrentCall } from '@anymind-ng/core';
import { first, takeUntil } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { AnymindWebsocketService } from '@platform/core/services/anymind-websocket/anymind-websocket.service';
import { LongPollingService } from '@platform/core/services/long-polling/long-polling.service';

@Injectable()
export class CallSummaryService implements OnDestroy {
  private readonly callSummarySubject = new Subject<any>();
  private readonly ngUnsubscribe$ = new Subject<void>();

  constructor(
    private viewsService: ViewsService,
    private serviceUsageEventService: ServiceUsageEventService,
    private longPollingService: LongPollingService,
    anymindWebsocketService: AnymindWebsocketService,
  ) {
    anymindWebsocketService.callSummary
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(this.onGetCallSummaryFromWebsocket);
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public getExpertCallSummary = (call: CurrentCall): Observable<ExpertCallSummary> => {
    const intervalTime = 3000;

    return race(
      this.longPollingService.longPollData(this.viewsService.getExpertCallSummaryRoute(call.getSueId()), intervalTime),
      this.callSummarySubject,
    ).pipe(first());
  };

  public getClientCallSummary = (call: CurrentCall): Observable<ClientCallSummary> => {
    const intervalTime = 3000;

    return race(
      this.longPollingService.longPollData(this.viewsService.getClientCallSummaryRoute(call.getSueId()), intervalTime),
      this.callSummarySubject,
    ).pipe(first());
  };

  public reportClient = (sueId: string, message: string): Observable<void> =>
    this.serviceUsageEventService.postExpertComplaintRoute(sueId, { message });

  public reportTechnicalProblem = (
    sueId: string,
    problemType: PostTechnicalProblem.ProblemTypeEnum,
    description?: string,
  ): Observable<void> =>
    this.serviceUsageEventService.postTechnicalProblemRoute(sueId, {
      problemType,
      description,
    });

  private onGetCallSummaryFromWebsocket = (callSummary: ExpertCallSummary): void => {
    this.callSummarySubject.next(callSummary);
  };
}
