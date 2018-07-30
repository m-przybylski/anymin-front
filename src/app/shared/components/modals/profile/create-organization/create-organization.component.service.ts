import { ProfileService, ServiceService, } from '@anymind-ng/api';
import { Injectable } from '@angular/core';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Observable } from 'rxjs/Rx';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { mergeMap } from 'rxjs/operators';
import { UserSessionService } from '../../../../../core/services/user-session/user-session.service';
import { GetService } from '@anymind-ng/api/model/getService';
import { PutOrganizationDetails } from '@anymind-ng/api/model/putOrganizationDetails';
import { GetProfile } from '@anymind-ng/api/model/getProfile';
import { GetSessionWithAccount } from '@anymind-ng/api/model/getSessionWithAccount';

@Injectable()
export class CreateOrganizationModalComponentService {
  private logger: LoggerService;

  constructor(
    private profileService: ProfileService,
    private serviceService: ServiceService,
    private userSessionService: UserSessionService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('CreateOrganizationModalComponentService');
  }

  public getProfileDetails = (): Observable<GetProfileWithDocuments> =>
    fromPromise(this.userSessionService.getSession())
      .pipe(mergeMap((session: GetSessionWithAccount) => this.getProfile(session.account.id)))

  public getProfileService = (accountId: string): Observable<ReadonlyArray<GetService>> =>
    this.serviceService.getProfileServicesRoute(accountId);

  public getSession = (): Observable<GetSessionWithAccount> =>
    fromPromise(this.userSessionService.getSession())

  public createOrganizationProfile = (data: PutOrganizationDetails): Observable<GetProfile> =>
    this.profileService.putOrganizationProfileRoute(data);

  private getProfile = (accountId: string): Observable<GetProfileWithDocuments> =>
    this.profileService.getProfileRoute(accountId);
}
