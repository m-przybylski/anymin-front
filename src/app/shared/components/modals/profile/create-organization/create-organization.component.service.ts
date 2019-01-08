import { ProfileService, ServiceService } from '@anymind-ng/api';
import { Injectable } from '@angular/core';
import { LoggerFactory, LoggerService, AlertService, Alerts } from '@anymind-ng/core';
import { Observable, throwError } from 'rxjs';
import { switchMap, map, take, catchError } from 'rxjs/operators';
import { GetProfile } from '@anymind-ng/api/model/getProfile';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import * as fromRoot from '@platform/reducers';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { PostProfileDetails } from '@anymind-ng/api/model/postProfileDetails';
import { PostProfileWithInvoiceDetails } from '@anymind-ng/api/model/postProfileWithInvoiceDetails';

export interface ICreateOrganizationModalData {
  countryIso: string;
  hasConsultations: boolean;
}
@Injectable()
export class CreateOrganizationComponentService {
  private logger: LoggerService;

  constructor(
    private profileService: ProfileService,
    private serviceService: ServiceService,
    private alertService: AlertService,
    private store: Store<fromRoot.IState>,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('CreateOrganizationComponentService');
  }

  public createOrganizationProfile(data: PostProfileWithInvoiceDetails): Observable<GetProfile> {
    return this.profileService
      .postCreateProfileWithInvoiceDetailsRoute(data)
      .pipe(this.handleResponseError('Not able to create organization profile'));
  }

  public getInitialData(): Observable<ICreateOrganizationModalData> {
    return getNotUndefinedSession(this.store).pipe(
      take(1),
      switchMap(getSessionWithAccount =>
        this.serviceService.getProfileServicesRoute(getSessionWithAccount.account.id).pipe(
          map(getServices => ({
            countryIso: getSessionWithAccount.account.countryISO,
            hasConsultations: getServices.length > 0,
          })),
          this.handleResponseError('Not able to get services'),
        ),
      ),
      map(modalData => modalData),
    );
  }

  public validateOrganizationDetails(data: PostProfileDetails): Observable<void> {
    return this.profileService
      .postProfileValidateRoute(data)
      .pipe(this.handleResponseError('error when try to validate organization details'));
  }

  private handleResponseError<T>(errorMsg: string): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> =>
      source.pipe(
        catchError((error: HttpErrorResponse) => {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.logger.warn(errorMsg, error);

          return throwError(error);
        }),
      );
  }
}
