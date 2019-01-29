import { Observable, throwError } from 'rxjs';
import { AccountService, GetProfile, ProfileService, PutGeneralSettings } from '@anymind-ng/api';
import { Injectable } from '@angular/core';
import { catchError, map, take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { PostProfileDetails } from '@anymind-ng/api/model/postProfileDetails';
import { PostProfileWithInvoiceDetails } from '@anymind-ng/api/model/postProfileWithInvoiceDetails';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';

export interface ICreateProfileInitialData {
  countryISO: string;
  hasProfile: boolean;
}
@Injectable()
export class CreateProfileComponentService extends Logger {
  constructor(
    private profileService: ProfileService,
    private accountService: AccountService,
    private alertService: AlertService,
    private store: Store<fromCore.IState>,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('CreateProfileComponentService'));
  }

  public getCountryIsoAndProfile(): Observable<ICreateProfileInitialData> {
    return getNotUndefinedSession(this.store).pipe(
      take(1),
      map(session => ({ countryISO: session.account.countryISO, hasProfile: session.isExpert || session.isCompany })),
      this.handleResponseError('error when try to get country ISO code'),
    );
  }

  public createClientProfile(formData: PutGeneralSettings): Observable<undefined> {
    return this.accountService
      .putGeneralSettingsRoute(formData)
      .pipe(this.handleResponseError('Can not create client profile'));
  }

  public createExpertProfile(data: PostProfileWithInvoiceDetails): Observable<GetProfile> {
    return this.profileService
      .postCreateProfileWithInvoiceDetailsRoute(data)
      .pipe(this.handleResponseError('Can not create expert profile'));
  }

  public validateProfileDetails(data: PostProfileDetails): Observable<void> {
    return this.profileService
      .postProfileValidateRoute(data)
      .pipe(this.handleResponseError('error when validate profile details'));
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
