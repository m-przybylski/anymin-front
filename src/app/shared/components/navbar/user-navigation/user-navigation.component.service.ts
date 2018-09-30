import { Observable, Subject, from } from 'rxjs';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { ProfileService } from '@anymind-ng/api';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';
import { Injectable } from '@angular/core';
import { GetSessionWithAccount } from '@anymind-ng/api/model/getSessionWithAccount';

@Injectable()
export class UserNavigationComponentService {
  private isClientProfileUpdated = new Subject<boolean>();
  private isProfileUpdated = new Subject<boolean>();
  private logger: LoggerService;

  constructor(
    private userSessionService: UserSessionService,
    private profileService: ProfileService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('UserNavigationComponentService');
  }

  public onUpdateUserProfile = (): Subject<boolean> => this.isProfileUpdated;

  public onUpdateClientProfile$ = (): Subject<boolean> => this.isClientProfileUpdated;

  public updateSession = (): Observable<GetSessionWithAccount> => from(this.userSessionService.getSession(true));

  public getProfileDetails = (sessionWithAccount: GetSessionWithAccount): Observable<GetProfileWithDocuments> =>
    this.profileService.getProfileRoute(sessionWithAccount.account.id);
}
