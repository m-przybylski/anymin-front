import { ProfileService, ServiceService, GetProfileWithDocuments } from '@anymind-ng/api';
import { Injectable } from '@angular/core';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { GetService } from '@anymind-ng/api/model/getService';
import { PutOrganizationDetails } from '@anymind-ng/api/model/putOrganizationDetails';
import { GetProfile } from '@anymind-ng/api/model/getProfile';
import { GetSessionWithAccount } from '@anymind-ng/api/model/getSessionWithAccount';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import * as fromRoot from '@platform/reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class CreateOrganizationModalComponentService {
  private logger: LoggerService;

  constructor(
    private profileService: ProfileService,
    private serviceService: ServiceService,
    private store: Store<fromRoot.IState>,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('CreateOrganizationModalComponentService');
  }

  public getProfileDetails(): Observable<GetProfileWithDocuments> {
    return getNotUndefinedSession(this.store).pipe(
      map(session => session.account.id),
      switchMap(accountId => this.profileService.getProfileRoute(accountId)),
    );
  }

  public getProfileService = (accountId: string): Observable<ReadonlyArray<GetService>> =>
    this.serviceService.getProfileServicesRoute(accountId);

  public getSession = (): Observable<GetSessionWithAccount> => getNotUndefinedSession(this.store);

  public createOrganizationProfile = (data: PutOrganizationDetails): Observable<GetProfile> =>
    this.profileService.putOrganizationProfileRoute(data);
}
