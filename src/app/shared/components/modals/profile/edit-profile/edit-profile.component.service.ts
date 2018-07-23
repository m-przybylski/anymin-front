// tslint:disable:no-empty
// tslint:disable:readonly-array
import { ReplaySubject } from 'rxjs';
import {
  AccountService, GetSession, ProfileService, PutGeneralSettings, PutWizardProfile,
  WizardService
} from '@anymind-ng/api';
import { Injectable } from '@angular/core';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Observable } from 'rxjs/Rx';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { mergeMap } from 'rxjs/operators';
import { ExpertDetailsUpdate } from '@anymind-ng/api/model/expertDetailsUpdate';
import { WizardCompleteResult } from '@anymind-ng/api/model/wizardCompleteResult';
import { UserSessionService } from '../../../../../core/services/user-session/user-session.service';

@Injectable()
export class EditProfileModalComponentService {

  public profileDetails: GetProfileWithDocuments;
  private value$ = new ReplaySubject<string>();
  private avatarUrl$ = new ReplaySubject<string>();
  private logger: LoggerService;

  constructor(private profileService: ProfileService,
              private accountService: AccountService,
              private wizardService: WizardService,
              private userSessionService: UserSessionService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('EditProfileModalComponentService');
  }

  public getPreviousValue$ = (): ReplaySubject<string> =>
    this.value$

  public getPreviousAvatarSrc = (): ReplaySubject<string> =>
    this.avatarUrl$

  public getUserProfile = (): Observable<GetProfileWithDocuments> =>
    fromPromise(this.userSessionService.getSession())
      .pipe(mergeMap((session: GetSession) => this.getProfileRoute(session.accountId)))

  public saveClientProfile = (formData: PutGeneralSettings): Observable<PutGeneralSettings> =>
    this.accountService.putGeneralSettingsRoute({
      isAnonymous: false,
      nickname: formData.nickname,
      avatar: formData.avatar
    })

  public getListAccountRoute = (): Observable<GetSession> =>
    fromPromise(this.userSessionService.getSession(true))

  public saveExpertProfile = (data: ExpertDetailsUpdate): Observable<ExpertDetailsUpdate> =>
    this.profileService.putProfileRoute({expertDetails: data})

  public createExpertProfile = (data: PutWizardProfile): Observable<PutWizardProfile> =>
    this.wizardService.putWizardProfileRoute(data)

  public completeCreateExpertProfile = (): Observable<WizardCompleteResult> =>
    this.wizardService.postWizardCompleteRoute()

  private getProfileRoute = (accountId: string): Observable<GetProfileWithDocuments> =>
    this.profileService.getProfileRoute(accountId)

}
