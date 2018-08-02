import { ReplaySubject } from 'rxjs';
import { AccountService, GetProfile, ProfileService, PutGeneralSettings } from '@anymind-ng/api';
import { Injectable } from '@angular/core';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Observable } from 'rxjs/Rx';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { mergeMap } from 'rxjs/operators';
import { UserSessionService } from '../../../../../core/services/user-session/user-session.service';
import { PutExpertDetails } from '@anymind-ng/api/model/putExpertDetails';
import { GetSessionWithAccount } from '@anymind-ng/api/model/getSessionWithAccount';

@Injectable()
export class EditProfileModalComponentService {
  private value$ = new ReplaySubject<string>();
  private avatarUrl$ = new ReplaySubject<string>();
  private logger: LoggerService;

  constructor(
    private profileService: ProfileService,
    private accountService: AccountService,
    private userSessionService: UserSessionService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('EditProfileModalComponentService');
  }

  public getPreviousValue$ = (): ReplaySubject<string> => this.value$;

  public getPreviousAvatarSrc = (): ReplaySubject<string> => this.avatarUrl$;

  public getSession = (): Observable<GetSessionWithAccount> => fromPromise(this.userSessionService.getSession());

  public getProfileDetails = (): Observable<GetProfileWithDocuments> =>
    fromPromise(this.userSessionService.getSession()).pipe(
      mergeMap((session: GetSessionWithAccount) => this.getProfileRoute(session.account.id)),
    );

  public createClientProfile = (formData: PutGeneralSettings): Observable<PutGeneralSettings> =>
    this.accountService.putGeneralSettingsRoute({
      isAnonymous: false,
      nickname: formData.nickname,
      avatar: formData.avatar,
    });

  public createExpertProfile = (data: PutExpertDetails): Observable<GetProfile> =>
    this.profileService.putExpertProfileRoute(data);

  private getProfileRoute = (accountId: string): Observable<GetProfileWithDocuments> =>
    this.profileService.getProfileRoute(accountId);
}
