import {
  ActivitiesService,
  GetClientComplaint,
  GetComment,
  ServiceUsageEventService,
  ViewsService,
} from '@anymind-ng/api';
import { Injectable } from '@angular/core';
import { catchError, first, map, switchMap } from 'rxjs/operators';
import { GetCallDetails } from '@anymind-ng/api/model/getCallDetails';
import { LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { forkJoin, iif, Observable, of, throwError } from 'rxjs';
import { FileUrlResolveService } from '../../../../services/file-url-resolve/file-url-resolve.service';
import { ISueDetails } from '../components/sue-details/sue-details.component';
import { ActivityDetailsService } from '@platform/shared/components/modals/activity-details/activity-details.service';
import { roomEvents } from 'machoke-sdk';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { Store } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import { HttpErrorResponse } from '@angular/common/http';
import { BackendErrors, isBackendError } from '@platform/shared/models/backend-error/backend-error';

export interface IExpertCompanyActivityDetails {
  activityDetails: ISueDetails;
  complaint?: GetClientComplaint;
  chatHistory: ReadonlyArray<ReadonlyArray<roomEvents.CustomMessageSent>>;
}

export interface IGetCallDetailsData {
  sueId: string;
  activityId: string;
  isImportantActivity: boolean;
  isCompanyActivity?: boolean;
  ratelRoomId?: string;
}

@Injectable()
export class ExpertCompanyActivityDetailsComponentService extends Logger {
  constructor(
    private viewsService: ViewsService,
    private activitiesService: ActivitiesService,
    private activityDetailsService: ActivityDetailsService,
    private sueService: ServiceUsageEventService,
    private fileUrlService: FileUrlResolveService,
    private store: Store<fromRoot.IState>,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ExpertCompanyActivityDetailsComponentService'));
  }

  public getCallDetails = (data: IGetCallDetailsData): Observable<IExpertCompanyActivityDetails> =>
    getNotUndefinedSession(this.store).pipe(
      first(),
      map(getSession => {
        if (data.isCompanyActivity) {
          return getSession.session.organizationProfileId || getSession.session.expertProfileId;
        }

        return getSession.session.expertProfileId || getSession.session.organizationProfileId;
      }),
      switchMap((profileId: string) =>
        forkJoin(
          this.viewsService.getDashboardCallDetailsProfileRoute(data.sueId, profileId).pipe(
            map((callDetails: GetCallDetails) => ({
              sueId: data.sueId,
              serviceName: callDetails.service.name,
              clientName: callDetails.clientDetails.nickname,
              clientAvatarUrl: this.fileUrlService.getFilePreviewDownloadUrl(callDetails.clientDetails.avatar),
              expertAvatarUrl: this.fileUrlService.getFilePreviewDownloadUrl(callDetails.expertProfile.avatar),
              answeredAt: callDetails.serviceUsageDetails.answeredAt,
              callDuration: callDetails.serviceUsageDetails.callDuration,
              servicePrice: callDetails.service.price,
              recommendedTags: callDetails.recommendedTags.map(tag => tag.name).join(', '),
              isSueExpert: profileId === callDetails.expertProfile.id,
              expertName: callDetails.expertProfile.name,
              isRecommendable: callDetails.serviceUsageDetails.isRecommendable,
              financialOperation: callDetails.serviceUsageDetails.amount,
              rate: callDetails.rate,
              comment: this.getComment(callDetails),
            })),
          ),
          this.sueService
            .getClientComplaintRoute(data.sueId)
            .pipe(catchError(err => this.handleGetComplaintError(err))),
        ).pipe(
          switchMap(([activityDetails, complaint]) =>
            forkJoin(
              iif(() => data.isImportantActivity, this.markActivityAsUnimportant(data.activityId), of(undefined)),
              iif(
                () => typeof data.ratelRoomId !== 'undefined' && !data.isCompanyActivity,
                this.activityDetailsService.getChatHistory(data.ratelRoomId as string),
                of([]),
              ),
            ).pipe(
              map(([_, chatHistory]) => ({
                activityDetails,
                complaint,
                chatHistory,
              })),
            ),
          ),
        ),
      ),
      catchError(err => {
        this.loggerService.warn('error when try to get call activity details ', err);

        return throwError(err);
      }),
    );

  private getComment = (callDetails: GetCallDetails): GetComment | undefined => {
    if (typeof callDetails.comment !== 'undefined') {
      return {
        commentId: callDetails.comment.commentId,
        content: callDetails.comment.content,
        expertId: callDetails.expertProfile.id,
        sueId: callDetails.serviceUsageDetails.sueId,
        answer: callDetails.comment.answer,
        report: callDetails.comment.report,
        callDurationInSeconds: callDetails.serviceUsageDetails.callDuration,
        clientDetails: callDetails.clientDetails,
        createdAt: callDetails.comment.createdAt,
      };
    }

    return undefined;
  };

  private markActivityAsUnimportant = (activityId: string): Observable<void> =>
    this.activitiesService.putUnimportantProfileActivityRoute(activityId).pipe(
      catchError(err => {
        this.loggerService.warn('Error when try to mark activity as unimportant', err);

        return throwError(err);
      }),
    );

  private handleGetComplaintError(httpError: HttpErrorResponse): Observable<undefined> {
    // TODO refactor after https://anymind.atlassian.net/browse/FRONT-678
    if (
      isBackendError(httpError.error) &&
      (httpError.error.code === BackendErrors.CannotGetClientComplaint ||
        httpError.error.code === BackendErrors.UserIsNotExpertInSue)
    ) {
      return of(undefined);
    }

    return throwError(httpError);
  }
}
