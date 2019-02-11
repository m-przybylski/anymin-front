import {
  ProfileService,
  ServiceService,
  GetProfileWithDocuments,
  PutProfileDetails,
  GetSessionWithAccount,
} from '@anymind-ng/api';
import { Injectable } from '@angular/core';
import { LoggerFactory, LoggerService, AlertService, Alerts } from '@anymind-ng/core';
import { Observable, of, forkJoin, throwError } from 'rxjs';
import { switchMap, map, take, catchError, filter } from 'rxjs/operators';
import { GetProfile } from '@anymind-ng/api/model/getProfile';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import * as fromRoot from '@platform/reducers';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export interface IEditOrganizationModalData {
  getProfileWithDocuments?: GetProfileWithDocuments;
  hasConsultations: boolean;
}

@Injectable()
export class EditOrganizationComponentService {
  private logger: LoggerService;

  constructor(
    private profileService: ProfileService,
    private serviceService: ServiceService,
    private alertService: AlertService,
    private store: Store<fromRoot.IState>,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('EditOrganizationComponentService');
  }

  public editOrganizationProfile(data: PutProfileDetails, profileId: string): Observable<GetProfile> {
    return this.profileService.putProfileRoute(data, profileId).pipe(this.handleResponseError('Not able to update'));
  }

  public getModalData(): Observable<IEditOrganizationModalData> {
    return getNotUndefinedSession(this.store).pipe(
      take(1),
      filter(getSessionWithAccount => typeof getSessionWithAccount.session.organizationProfileId !== 'undefined'),
      switchMap((getSessionWithAccount: GetSessionWithAccount) =>
        forkJoin([
          getSessionWithAccount.isCompany
            ? this.profileService
                .getProfileRoute(getSessionWithAccount.session.organizationProfileId as string)
                .pipe(this.handleResponseError('Not able to get profile data'))
            : of(undefined),
          this.serviceService
            .getProfileServicesRoute(getSessionWithAccount.session.organizationProfileId as string)
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
