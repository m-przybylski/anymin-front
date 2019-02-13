import { GetClientComplaint, ServiceUsageEventService } from '@anymind-ng/api';
import { Logger } from '@platform/core/logger';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { catchError, first, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';

@Injectable()
export class ComplaintDetailsComponentService extends Logger {
  constructor(
    private store: Store<fromCore.IState>,
    private sueService: ServiceUsageEventService,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ComplaintDetailsComponentService'));
  }

  public acceptComplaint(id: string): Observable<void> {
    return this.sueService
      .postExpertAcceptComplaintRoute(id)
      .pipe(
        this.handleRequest(
          'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.EXPERT_DECISION.ACCEPT.SUCCESS',
          'error when accept complaint',
        ),
      );
  }

  public rejectComplaint(id: string, reason: string): Observable<void> {
    return this.sueService
      .postExpertRejectComplaintRoute(id, { reason })
      .pipe(
        this.handleRequest(
          'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.EXPERT_DECISION.REJECT.SUCCESS',
          'error when reject complaint',
        ),
      );
  }

  public getUserAccountId(): Observable<string> {
    return getNotUndefinedSession(this.store).pipe(
      first(),
      map(session => session.account.id),
    );
  }

  public getReasonTrKey(complaintType: GetClientComplaint.ComplaintTypeEnum): string {
    switch (complaintType) {
      case GetClientComplaint.ComplaintTypeEnum.IMPOLITEEXPERT:
        return 'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.REASON.IMPOLITE';
      case GetClientComplaint.ComplaintTypeEnum.INCOMPETENTEXPERT:
        return 'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.REASON.INCOMPETENT';
      case GetClientComplaint.ComplaintTypeEnum.TECHNICALISSUES:
        return 'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.REASON.TECHNICAL';
      case GetClientComplaint.ComplaintTypeEnum.OTHER:
        return 'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.REASON.OTHER';

      default:
        this.loggerService.error('unhandled complaint type:', complaintType);

        return '';
    }
  }

  // tslint:disable-next-line:cyclomatic-complexity
  public getStatusTrKey(complaintStatus: GetClientComplaint.StatusEnum, isExpert: boolean): string {
    switch (complaintStatus) {
      case GetClientComplaint.StatusEnum.ACCEPTEDBYADMIN:
        return 'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.STATUS.ACCEPTED_BY_ADMIN';
      case GetClientComplaint.StatusEnum.ACCEPTEDBYEXPERT:
        return 'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.STATUS.ACCEPTED_BY_EXPERT';
      case GetClientComplaint.StatusEnum.IGNOREDBYEXPERT:
      case GetClientComplaint.StatusEnum.REJECTEDBYEXPERT:
        return 'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.STATUS.INVESTIGATE_BY_ADMIN';
      case GetClientComplaint.StatusEnum.NEW:
        return isExpert
          ? 'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.STATUS.INVESTIGATE_IN_PROGRESS'
          : 'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.STATUS.INVESTIGATE_BY_EXPERT';
      case GetClientComplaint.StatusEnum.REJECTEDBYADMIN:
        return 'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.STATUS.REJECTED';

      default:
        this.loggerService.error('unhandled complaint status:', complaintStatus);

        return '';
    }
  }

  private handleRequest(successMessage: string, errorMessage: string): (source: Observable<void>) => Observable<void> {
    return (source: Observable<void>): Observable<void> =>
      source.pipe(
        map(() => {
          this.alertService.pushSuccessAlert(successMessage);

          return;
        }),
        catchError(err => {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.loggerService.warn(errorMessage, err);

          return EMPTY;
        }),
      );
  }
}
