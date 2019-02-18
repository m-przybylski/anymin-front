import { Observable, Subject, race, of, EMPTY, ReplaySubject } from 'rxjs';
import {
  ClientCallSummary,
  ExpertCallSummary,
  GetSueRating,
  PostClientComplaint,
  PostSueRating,
  PostTechnicalProblem,
  ServiceUsageEventService,
  ViewsService,
} from '@anymind-ng/api';
import { CurrentCall, LoggerFactory } from '@anymind-ng/core';
import { catchError, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { AnymindWebsocketService } from '@platform/core/services/anymind-websocket/anymind-websocket.service';
import { LongPollingService } from '@platform/core/services/long-polling/long-polling.service';
import { Logger } from '@platform/core/logger';

@Injectable()
export class CallSummaryService extends Logger implements OnDestroy {
  private readonly callSummarySubject = new ReplaySubject<any>(1);
  private readonly ngUnsubscribe$ = new Subject<void>();

  constructor(
    private viewsService: ViewsService,
    private serviceUsageEventService: ServiceUsageEventService,
    private longPollingService: LongPollingService,
    anymindWebsocketService: AnymindWebsocketService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('CallSummaryService'));
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
    this.serviceUsageEventService
      .postTechnicalProblemRoute(sueId, {
        problemType,
        description,
      })
      .pipe(
        catchError(error => {
          this.loggerService.warn(`Can not send technical problem: ${error}`);

          return EMPTY;
        }),
      );

  public clientReportComplaint = (
    sueId: string,
    complaintType: PostClientComplaint.ComplaintTypeEnum,
    message: string,
  ): Observable<void> =>
    this.serviceUsageEventService
      .postClientComplaintRoute(sueId, {
        complaintType,
        message,
      })
      .pipe(
        catchError(error => {
          this.loggerService.warn(`Can not send complaint: ${error}`);

          return EMPTY;
        }),
      );

  public commentExpert = (sueId: string, message: string): Observable<undefined> =>
    this.serviceUsageEventService.postCommentRoute(sueId, { content: message });

  public rateExpertPositiveWithTags = (sueId: string, tags: ReadonlyArray<string> = []): Observable<GetSueRating> =>
    this.serviceUsageEventService.postSueRatingRoute(sueId, { rate: PostSueRating.RateEnum.POSITIVE }).pipe(
      switchMap(getSueRating => {
        if (tags.length > 0) {
          return this.serviceUsageEventService.putSueRatingRoute(sueId, { tags }).pipe(map(() => getSueRating));
        }

        return of(getSueRating);
      }),
    );

  public rateExpertNegative = (sueId: string, message?: string): Observable<GetSueRating> =>
    this.serviceUsageEventService.postSueRatingRoute(sueId, { rate: PostSueRating.RateEnum.NEGATIVE }).pipe(
      switchMap(getSueRating => {
        if (typeof message !== 'undefined') {
          return this.serviceUsageEventService
            .postCommentRoute(sueId, { content: message })
            .pipe(map(() => getSueRating));
        }

        return of(getSueRating);
      }),
    );

  private onGetCallSummaryFromWebsocket = (callSummary: ExpertCallSummary): void => {
    this.callSummarySubject.next(callSummary);
  };
}
