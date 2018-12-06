import { ReplaySubject, Observable } from 'rxjs';
import { AccountService, GetProfile, ProfileService, PutGeneralSettings } from '@anymind-ng/api';
import { Injectable } from '@angular/core';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { map, switchMap } from 'rxjs/operators';
import { PutExpertDetails } from '@anymind-ng/api/model/putExpertDetails';
import * as fromRoot from '@platform/reducers';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { Store } from '@ngrx/store';

@Injectable()
export class CreateProfileModalComponentService {
  private userName$ = new ReplaySubject<string>();
  private avatarToken$ = new ReplaySubject<string>();
  private logger: LoggerService;

  constructor(
    private profileService: ProfileService,
    private accountService: AccountService,
    private store: Store<fromRoot.IState>,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('CreateProfileModalComponentService');
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

  public getProfileDetails(): Observable<GetProfileWithDocuments> {
    return getNotUndefinedSession(this.store).pipe(
      map(session => session.account.id),
      switchMap(accountId => this.profileService.getProfileRoute(accountId)),
    );
  }

  public createClientProfile = (formData: PutGeneralSettings): Observable<PutGeneralSettings> =>
    this.accountService.putGeneralSettingsRoute({
      nickname: formData.nickname,
      avatar: formData.avatar,
    });

  public createExpertProfile = (data: PutExpertDetails): Observable<GetProfile> =>
    this.profileService.putExpertProfileRoute(data);
}
