import { Injectable } from '@angular/core';
import { EMPTY, forkJoin, iif, Observable, of, throwError, defer } from 'rxjs';
import {
  ActivitiesService,
  GetAccountDetails,
  GetComment,
  GetDetailedClientActivity,
  GetServiceUsageDetails,
  GetSessionWithAccount,
  GetTag,
  PostClientComplaint,
  ServiceUsageEventService,
} from '@anymind-ng/api';
import { catchError, filter, first, map, switchMap } from 'rxjs/operators';
import { ISueDetails } from '@platform/shared/components/modals/activity-details/components/sue-details/sue-details.component';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { Store } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import { Logger } from '@platform/core/logger';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { ActivityDetailsService } from '@platform/shared/components/modals/activity-details/activity-details.service';
import { roomEvents } from 'machoke-sdk';
import { FileUrlResolveService } from '@platform/shared/services/file-url-resolve/file-url-resolve.service';

export interface IClientActivityDetails {
  activityDetails: ISueDetails;
  chatHistory: ReadonlyArray<ReadonlyArray<roomEvents.CustomMessageSent>>;
}

@Injectable()
export class ClientActivityDetailsComponentService extends Logger {
  constructor(
    private activitiesService: ActivitiesService,
    private activityDetailsService: ActivityDetailsService,
    private sueService: ServiceUsageEventService,
    private fileUrlService: FileUrlResolveService,
    private store: Store<fromRoot.IState>,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ClientActivityDetailsComponentService'));
  }

  public getActivityDetails(id: string, isImportant: boolean): Observable<IClientActivityDetails> {
    return getNotUndefinedSession(this.store).pipe(
      first(),
      map((getSession: GetSessionWithAccount) => getSession.account.details),
      switchMap(clientDetails =>
        this.activitiesService.getClientActivityRoute(id).pipe(
          filter(activityDetails => typeof activityDetails.sue !== 'undefined'),
          map(activityDetails => {
            const sue: GetServiceUsageDetails = activityDetails.sue as GetServiceUsageDetails;

            return {
              serviceName: activityDetails.details.serviceName ? activityDetails.details.serviceName : '',
              clientAvatarUrl: this.fileUrlService.getFilePreviewDownloadUrl(clientDetails.avatar),
              expertAvatarUrl: this.fileUrlService.getFilePreviewDownloadUrl(activityDetails.details.expertAvatar),
              sueId: sue.sueId,
              answeredAt: sue.answeredAt,
              callDuration: sue.callDuration,
              servicePrice: sue.pricePerMinute,
              recommendedTags: this.getTags(activityDetails.recommendedTags),
              isSueExpert: false,
              expertName: activityDetails.details.expertName ? activityDetails.details.expertName : '',
              isRecommendable: sue.isRecommendable,
              financialOperation: sue.amount,
              rate: activityDetails.rate ? activityDetails.rate : undefined,
              comment: this.getComment(activityDetails, clientDetails),
              ratelRoomId: activityDetails.sue ? activityDetails.sue.ratelRoomId : undefined,
              complaint: activityDetails.complaint,
            };
          }),
          switchMap(activityDetails =>
            forkJoin(
              iif(() => isImportant, this.markActivityAsUnimportant(id), of(undefined)),
              defer(() => {
                if (typeof activityDetails.ratelRoomId !== 'undefined') {
                  return this.activityDetailsService.getChatHistory(activityDetails.ratelRoomId);
                }

                return of([]);
              }),
            ).pipe(
              map(([_, chatHistory]) => ({
                activityDetails,
                chatHistory,
              })),
            ),
          ),
          catchError(err => {
            this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
            this.loggerService.warn('error when try to get client activity details ', err);

            return throwError(err);
          }),
        ),
      ),
    );
  }

  public reportComplaint(sueId: string, postClientComplaint: PostClientComplaint): Observable<void> {
    return this.sueService.postClientComplaintRoute(sueId, postClientComplaint).pipe(
      map(() => {
        this.alertService.pushSuccessAlert('ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.CLIENT_REPORT.SUCCESS');
      }),
      catchError(err => {
        this.loggerService.warn('Error when try to report complaint', err);
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);

        return EMPTY;
      }),
    );
  }

  private markActivityAsUnimportant(activityId: string): Observable<undefined> {
    return this.activitiesService.putUnimportantClientActivityRoute(activityId).pipe(
      catchError(err => {
        this.loggerService.warn('Error when try to mark activity as unimportant', err);

        return throwError(err);
      }),
    );
  }

  private getTags(tags: ReadonlyArray<GetTag>): string {
    return tags.map(tag => tag.name).join(', ');
  }

  private getComment = (
    clientActivity: GetDetailedClientActivity,
    clientDetails: GetAccountDetails,
  ): GetComment | undefined => {
    if (typeof clientActivity.comment !== 'undefined' && typeof clientActivity.sue !== 'undefined') {
      return {
        commentId: clientActivity.comment.commentId,
        content: clientActivity.comment.content,
        expertId: clientActivity.comment.expertId,
        sueId: clientActivity.sue.sueId,
        answer: clientActivity.comment.answer,
        report: clientActivity.comment.report,
        callDurationInSeconds: clientActivity.sue.callDuration,
        clientDetails,
        createdAt: clientActivity.comment.createdAt,
      };
    }

    return undefined;
  };
}
