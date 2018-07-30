// tslint:disable:no-any
// tslint:disable:newline-before-return
import { Injectable } from '@angular/core';
import { LoginCredentials, SessionService } from '@anymind-ng/api';
import { ApiKeyService } from '../api-key/api-key.service';
import { EventsService } from '../../../../angularjs/common/services/events/events.service';
import { GetSessionWithAccount } from '@anymind-ng/api/model/getSessionWithAccount';

@Injectable()
export class UserSessionService {
  private sessionCache?: Promise<GetSessionWithAccount>;

  private readonly unauthorizedCode = 401;

  constructor(
    private authService: ApiKeyService,
    private sessionService: SessionService,
    private eventsService: EventsService,
  ) {}

  public logout = (): Promise<any> =>
    this.sessionService
      .logoutCurrentRoute()
      .toPromise()
      .then(this.onSuccessLogout, this.onFailureLogout);

  public login = (loginDetails: LoginCredentials): Promise<GetSessionWithAccount> =>
    this.sessionService
      .login(loginDetails)
      .toPromise()
      .then(session => {
        this.eventsService.emit('login');

        return this.onSuccessLogin(session);
      });

  public isLoggedIn = (): boolean => typeof this.sessionCache !== 'undefined';

  public getSession = (force = false): Promise<GetSessionWithAccount> => {
    if (force) {
      this.sessionCache = this.getSessionFromBackend();
      return this.sessionCache;
    } else {
      if (typeof this.sessionCache !== 'undefined') {
        return this.sessionCache;
      } else {
        return this.getSessionFromBackend();
      }
    }
  };

  private getSessionFromBackend = (): Promise<GetSessionWithAccount> => {
    this.sessionCache = this.sessionService
      .checkRoute()
      .toPromise()
      .then(this.onSuccessLogin);
    return this.sessionCache;
  };

  private onSuccessLogin = (sessionWithAccount: GetSessionWithAccount): GetSessionWithAccount => {
    this.sessionCache = Promise.resolve(sessionWithAccount);
    this.authService.setApiKey(sessionWithAccount.session.apiKey);

    return sessionWithAccount;
  };

  private onSuccessLogout = (): void => {
    this.sessionCache = undefined;
    this.authService.unsetApiKey();
  };

  private onFailureLogout = (err: any): void => {
    if (err && err.status === this.unauthorizedCode) {
      // user is already logged out so lets do the cache cleanup
      this.onSuccessLogout();
    }
  };
}
