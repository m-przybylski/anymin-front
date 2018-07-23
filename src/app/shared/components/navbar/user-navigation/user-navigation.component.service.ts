import { Observable, Subject } from 'rxjs/Rx';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { GetSession, ProfileService } from '@anymind-ng/api';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UserNavigationComponentService {
  private isClientProfileUpdated = new Subject<boolean>();
  private isProfileUpdated = new Subject<boolean>();
  private logger: LoggerService;

  constructor(private userSessionService: UserSessionService,
              private profileService: ProfileService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('UserNavigationComponentService');
  }

  public onUpdateUserProfile = (): Subject<boolean> =>
    this.isProfileUpdated

  public onUpdateClientProfile$ = (): Subject<boolean> =>
    this.isClientProfileUpdated

  public updateSession = (): Observable<GetSession> =>
    fromPromise(this.userSessionService.getSession(true))

  public getProfileDetails = (session: GetSession): Observable<GetProfileWithDocuments> =>
    this.profileService.getProfileRoute(session.accountId)
}
