import { Injectable } from '@angular/core';
import { GetSession, AccountLogin, SessionService } from '@anymind-ng/api';
import { ApiKeyService } from '../api-key/api-key.service';

@Injectable()
export class UserSessionService {

  private sessionCache?: Promise<GetSession>;

  private readonly unauthorizedCode: number = 401;

  constructor(private authService: ApiKeyService,
              private sessionService: SessionService) {
  }

  public logout = (): Promise<any> =>
    this.sessionService.logoutCurrentRoute()
      .toPromise().then(this.onSuccessLogout, this.onFailureLogout)

  public login = (loginDetails: AccountLogin): Promise<GetSession> =>
    this.sessionService.login(loginDetails).toPromise().then(this.onSuccessLogin)

  private getSessionFromBackend = (): Promise<GetSession> => {
    this.sessionCache = this.sessionService.checkRoute().toPromise().then(this.onSuccessLogin);
    return this.sessionCache;
  }

  public getSession = (force: boolean = false): Promise<GetSession> => {
    if (force) {
      this.sessionCache = this.getSessionFromBackend();
      return this.sessionCache;
    }
    else {
      if (typeof this.sessionCache !== 'undefined') {
        return this.sessionCache;
      }
      else {
        return this.getSessionFromBackend();
      }
    }
  }

  private onSuccessLogin = (session: GetSession): GetSession => {
    this.sessionCache = Promise.resolve(session);
    this.authService.setApiKey(session.apiKey);

    return session;
  }

  private onSuccessLogout = (): void => {
    this.sessionCache = undefined;
    this.authService.unsetApiKey();
  }

  private onFailureLogout = (err: any): void => {
    if (err && err.status === this.unauthorizedCode) {
      // user is already logged out so lets do the cache cleanup
      this.onSuccessLogout();
    }
  }

  public isLoggedIn = (): boolean =>
    typeof this.sessionCache !== 'undefined'
}
