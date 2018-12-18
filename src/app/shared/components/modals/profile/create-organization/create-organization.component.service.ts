import { ProfileService, ServiceService, GetProfileWithDocuments } from '@anymind-ng/api';
import { Injectable } from '@angular/core';
import { LoggerFactory, LoggerService, AlertService, Alerts } from '@anymind-ng/core';
import { Observable, of, forkJoin, throwError } from 'rxjs';
import { switchMap, map, take, catchError } from 'rxjs/operators';
import { PutOrganizationDetails } from '@anymind-ng/api/model/putOrganizationDetails';
import { GetProfile } from '@anymind-ng/api/model/getProfile';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import * as fromRoot from '@platform/reducers';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export interface ICreateOrganizationModalData {
  getProfileWithDocuments?: GetProfileWithDocuments;
  hasConsultations: boolean;
}
@Injectable()
export class CreateOrganizationModalComponentService {
  private logger: LoggerService;

  constructor(
    private profileService: ProfileService,
    private serviceService: ServiceService,
    private alertService: AlertService,
    private store: Store<fromRoot.IState>,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('CreateOrganizationModalComponentService');
  }

  public createOrganizationProfile = (data: PutOrganizationDetails): Observable<GetProfile> =>
    this.profileService.putOrganizationProfileRoute(data).pipe(this.handleResponseError('Not able to create/update'));

  public getModalData(): Observable<ICreateOrganizationModalData> {
    return getNotUndefinedSession(this.store).pipe(
      take(1),
      switchMap(getSessionWithAccount =>
        forkJoin([
          getSessionWithAccount.isCompany
            ? this.profileService
                .getProfileRoute(getSessionWithAccount.account.id)
                .pipe(this.handleResponseError('Not able to get profile data'))
            : of(undefined),
          this.serviceService
            .getProfileServicesRoute(getSessionWithAccount.account.id)
            .pipe(this.handleResponseError('Not able to get services')),
        ]),
      ),
      map(([getProfileWithDocuments, getServices]) => ({
        getProfileWithDocuments,
        hasConsultations: getServices.length > 0,
      })),
    );
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
