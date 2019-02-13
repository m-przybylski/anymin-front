import { Injectable } from '@angular/core';
import { defer, forkJoin, iif, Observable, of, throwError } from 'rxjs';
import { ActivitiesService, GetServiceUsageDetails, GetSessionWithAccount, GetTag } from '@anymind-ng/api';
import { catchError, filter, first, map, switchMap } from 'rxjs/operators';
import { ISueDetails } from '@platform/shared/components/modals/activity-details/components/sue-details/sue-details.component';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { Store } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import { Logger } from '@platform/core/logger';
import { LoggerFactory } from '@anymind-ng/core';
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
    private fileUrlService: FileUrlResolveService,
    private store: Store<fromRoot.IState>,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ClientActivityDetailsComponentService'));
  }

  public getActivityDetails(id: string, isImportant: boolean): Observable<IClientActivityDetails> {
    return this.activitiesService.getClientActivityRoute(id).pipe(
      filter(activityDetails => typeof activityDetails.sue !== 'undefined'),
      map(activityDetails => {
        const sue = activityDetails.sue as GetServiceUsageDetails;

        return {
          serviceName: activityDetails.details.serviceName ? activityDetails.details.serviceName : '',
          clientAvatarUrl: '',
          expertAvatarUrl: this.fileUrlService.getFilePreviewDownloadUrl(activityDetails.details.expertAvatar),
          sueId: sue.serviceUsageEventId,
          answeredAt: sue.answeredAt,
          callDuration: sue.callDuration,
          servicePrice: sue.ratePerMinute,
          recommendedTags: this.getTags(activityDetails.recommendedTags),
          isSueExpert: false,
          expertName: activityDetails.details.expertName ? activityDetails.details.expertName : '',
          financialOperation: sue.amount,
          rate: activityDetails.rating ? activityDetails.rating.rate : undefined,
          // todo get comment - blocked by backend
          comment: undefined,
          ratelRoomId: activityDetails.sue ? activityDetails.sue.ratelRoomId : undefined,
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
        this.loggerService.warn('error when try to get client activity details ', err);

        return throwError(err);
      }),
    );
  }

  public getUserAvatarUrl(): Observable<string | undefined> {
    return getNotUndefinedSession(this.store).pipe(
      first(),
      map((getSession: GetSessionWithAccount) =>
        this.fileUrlService.getFilePreviewDownloadUrl(getSession.account.details.avatar),
      ),
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
}
