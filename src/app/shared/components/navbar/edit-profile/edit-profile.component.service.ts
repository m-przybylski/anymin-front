// tslint:disable:no-empty
import { ReplaySubject } from 'rxjs';
import { GetSession, ProfileService } from '@anymind-ng/api';
import { Injectable, OnInit } from '@angular/core';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Observable } from 'rxjs/Rx';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class EditProfileModalComponentService implements OnInit {

  public profileDetails: GetProfileWithDocuments;
  private value$ = new ReplaySubject<string>();
  private avatarUrl$ = new ReplaySubject<string>();
  private logger: LoggerService;

  constructor(private profileService: ProfileService,
              private userSessionService: UserSessionService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('EditProfileModalComponentService');
  }

  public ngOnInit(): void {
  }

  public getPreviousValue$ = (): ReplaySubject<string> =>
    this.value$

  public getPreviousAvatarSrc = (): ReplaySubject<string> =>
    this.avatarUrl$

  public getUserProfile = (): Observable<GetProfileWithDocuments> =>
    fromPromise(this.userSessionService.getSession())
      .pipe(mergeMap((session: GetSession) => this.getProfileRoute(session.accountId)))

  private getProfileRoute = (accountId: string): Observable<GetProfileWithDocuments> =>
    this.profileService.getProfileRoute(accountId)

}
