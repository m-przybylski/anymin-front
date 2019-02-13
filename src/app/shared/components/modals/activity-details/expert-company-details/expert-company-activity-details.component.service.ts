import { ActivitiesService, GetComment, ViewsService } from '@anymind-ng/api';
import { Injectable } from '@angular/core';
import { catchError, first, map, switchMap } from 'rxjs/operators';
import { GetCallDetails } from '@anymind-ng/api/model/getCallDetails';
import { LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { defer, forkJoin, iif, Observable, of, throwError } from 'rxjs';
import { FileUrlResolveService } from '../../../../services/file-url-resolve/file-url-resolve.service';
import { ISueDetails } from '../components/sue-details/sue-details.component';
import { ActivityDetailsService } from '@platform/shared/components/modals/activity-details/activity-details.service';
import { roomEvents } from 'machoke-sdk';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { Store } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';

export interface IExpertCompanytActivityDetails {
  activityDetails: ISueDetails;
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
    private fileUrlService: FileUrlResolveService,
    private store: Store<fromRoot.IState>,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ExpertCompanyActivityDetailsComponentService'));
  }

  public getCallDetails = (data: IGetCallDetailsData): Observable<IExpertCompanytActivityDetails> =>
    getNotUndefinedSession(this.store).pipe(
      first(),
      map(getSession => getSession.account.id),
      switchMap(accountId =>
        this.viewsService.getDashboardCallDetailsRoute(data.sueId).pipe(
          map((callDetails: GetCallDetails) => ({
            sueId: data.sueId,
            serviceName: callDetails.service.name,
            clientName: callDetails.clientDetails.nickname,
            clientAvatarUrl: this.fileUrlService.getFilePreviewDownloadUrl(callDetails.clientDetails.avatar),
            expertAvatarUrl:
              typeof callDetails.expertProfile.expertDetails !== 'undefined'
                ? this.fileUrlService.getFilePreviewDownloadUrl(callDetails.expertProfile.expertDetails.avatar)
                : '',
            answeredAt: callDetails.serviceUsageDetails.answeredAt,
            callDuration: callDetails.serviceUsageDetails.callDuration,
            servicePrice: callDetails.service.price,
            recommendedTags: callDetails.recommendedTags.map(tag => tag.name).join(', '),
            isSueExpert: accountId === callDetails.expertProfile.id,
            expertName:
              typeof callDetails.expertProfile.expertDetails !== 'undefined'
                ? callDetails.expertProfile.expertDetails.name
                : '',
            financialOperation: callDetails.serviceUsageDetails.amount,
            rate: callDetails.rate,
            comment: this.getComment(callDetails),
          })),
          switchMap(activityDetails =>
            forkJoin(
              iif(() => data.isImportantActivity, this.markActivityAsUnimportant(data.activityId), of(undefined)),
              defer(() => {
                if (typeof data.ratelRoomId !== 'undefined' && !data.isCompanyActivity) {
                  return this.activityDetailsService.getChatHistory(data.ratelRoomId);
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
            this.loggerService.warn('error when try to get call activity details ', err);

            return throwError(err);
          }),
        ),
      ),
    );

  private getComment = (callDetails: GetCallDetails): GetComment | undefined => {
    if (typeof callDetails.comment !== 'undefined') {
      return {
        commentId: callDetails.comment.commentId,
        content: callDetails.comment.content,
        expertId: callDetails.expertProfile.id,
        sueId: callDetails.serviceUsageDetails.serviceUsageEventId,
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
}
