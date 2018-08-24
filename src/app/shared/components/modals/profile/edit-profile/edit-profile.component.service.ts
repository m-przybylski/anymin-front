import { ReplaySubject, Observable, from } from 'rxjs';
import { AccountService, GetProfile, GetSession, ProfileService, PutGeneralSettings } from '@anymind-ng/api';
import { Injectable } from '@angular/core';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { mergeMap } from 'rxjs/operators';
import { UserSessionService } from '../../../../../core/services/user-session/user-session.service';
import { PutExpertDetails } from '@anymind-ng/api/model/putExpertDetails';

@Injectable()
export class EditProfileModalComponentService {
  private userName$ = new ReplaySubject<string>();
  private avatarToken$ = new ReplaySubject<string>();
  private logger: LoggerService;

  constructor(
    private profileService: ProfileService,
    private accountService: AccountService,
    private userSessionService: UserSessionService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('EditProfileModalComponentService');
  }

  public get avatarToken(): Observable<string> {
    return this.avatarToken$.asObservable();
  }

  public setAvatarToken(token: string | undefined): void {
    this.avatarToken$.next(token ? token : '');
  }
  public get userName(): Observable<string> {
    return this.userName$.asObservable();
  }

  public setUserName(userName: string): void {
    this.userName$.next(userName);
  }

  public getProfileDetails = (): Observable<GetProfileWithDocuments> =>
    from(this.userSessionService.getSession()).pipe(
      mergeMap((session: GetSession) => this.getProfileRoute(session.accountId)),
    );

  public createClientProfile = (formData: PutGeneralSettings): Observable<PutGeneralSettings> =>
    this.accountService.putGeneralSettingsRoute({
      nickname: formData.nickname,
      avatar: formData.avatar,
    });

  public createExpertProfile = (data: PutExpertDetails): Observable<GetProfile> =>
    this.profileService.putExpertProfileRoute(data);

  private getProfileRoute = (accountId: string): Observable<GetProfileWithDocuments> =>
    this.profileService.getProfileRoute(accountId);
}
