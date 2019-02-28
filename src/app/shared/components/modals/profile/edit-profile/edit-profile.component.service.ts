import { Observable, of, defer, throwError } from 'rxjs';
import {
  AccountService,
  GetProfile,
  ProfileService,
  PutDetails,
  GetSessionWithAccount,
  GetProfileWithDocuments,
  PutProfileDetails,
} from '@anymind-ng/api';
import { Injectable } from '@angular/core';
import * as fromRoot from '@platform/reducers';
import { Store } from '@ngrx/store';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { take, switchMap, map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';

export interface ICreateProfileModalData {
  getProfileWithDocuments?: GetProfileWithDocuments;
  getSessionWithAccount: GetSessionWithAccount;
}
@Injectable()
export class EditProfileComponentService extends Logger {
  constructor(
    private store: Store<fromRoot.IState>,
    private profileService: ProfileService,
    private accountService: AccountService,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('EditProfileComponentService'));
  }

  public editClientProfile(formData: PutDetails): Observable<undefined> {
    return this.accountService
      .putDetailsRoute({
        nickname: formData.nickname,
        avatar: formData.avatar,
      })
      .pipe(this.handleResponseError('Can not edit client profile'));
  }

  public editExpertProfile(data: PutProfileDetails, profileId: string): Observable<GetProfile> {
    return this.profileService
      .putProfileRoute(data, profileId)
      .pipe(this.handleResponseError('Can not edit expert profile'));
  }

  /**
   * return session and if backend claims that user is not an expert return undefined as profile data
   */
  public getModalData(): Observable<ICreateProfileModalData> {
    return getNotUndefinedSession(this.store).pipe(
      take(1),
      switchMap(getSessionWithAccount =>
        defer(() =>
          getSessionWithAccount.session.expertProfileId
            ? this.profileService
                .getProfileRoute(getSessionWithAccount.session.expertProfileId)
                .pipe(this.handleResponseError('cannot get profile data'))
            : of(undefined),
        ).pipe(
          map(getProfileWithDocuments => ({
            getProfileWithDocuments,
            getSessionWithAccount,
          })),
        ),
      ),
    );
  }

  private handleResponseError<T>(errorMsg: string): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> =>
      source.pipe(
        catchError((error: HttpErrorResponse) => {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.loggerService.warn(errorMsg, error);

          return throwError(error);
        }),
      );
  }
}
