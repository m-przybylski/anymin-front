// tslint:disable:no-any
// tslint:disable:newline-before-return
import { Injectable } from '@angular/core';
import { LoginCredentials, SessionService } from '@anymind-ng/api';
import { ApiKeyService } from '../api-key/api-key.service';
import { EventsService } from '../../../../angularjs/common/services/events/events.service';
import { GetSessionWithAccount } from '@anymind-ng/api/model/getSessionWithAccount';
import { Store } from '@ngrx/store';
import * as fromCore from '../../reducers';
import { AuthActions } from '../../actions';
import { Logger } from '@platform/core/logger';
import { LoggerFactory } from '@anymind-ng/core';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class UserSessionService extends Logger {
  private sessionCache?: GetSessionWithAccount;

  private readonly unauthorizedCode = 401;

  constructor(
    private authService: ApiKeyService,
    private sessionService: SessionService,
    private eventsService: EventsService,
    private state: Store<fromCore.IState>,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory);
  }

  public logout = (): Promise<any> =>
    // this.state.dispatch(new AuthActions.LogoutAction());
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
        this.state.dispatch(new AuthActions.LoginSuccessAction(session));

        return this.onSuccessLogin(session);
      });

  public isLoggedIn = (): boolean => typeof this.sessionCache !== 'undefined';

  public getSession = (force = false): Promise<GetSessionWithAccount> =>
    new Promise<GetSessionWithAccount>(
      (resolve, reject): void => {
        if (force || typeof this.sessionCache === 'undefined') {
          this.getSessionFromBackend()
            .pipe(
              catchError(err => {
                reject(err);

                return of(undefined);
              }),
            )
            .subscribe(session => {
              if (typeof session !== 'undefined') {
                resolve(session);
              }
            });
        } else {
          return resolve(this.sessionCache);
        }
      },
    );

  private getSessionFromBackend = (): Observable<GetSessionWithAccount> =>
    this.sessionService.checkRoute().pipe(tap(this.onSuccessLogin));

  private onSuccessLogin = (sessionWithAccount: GetSessionWithAccount): GetSessionWithAccount => {
    this.sessionCache = sessionWithAccount;
    this.authService.setApiKey(sessionWithAccount.session.apiKey);

    return sessionWithAccount;
  };

  private onSuccessLogout = (): void => {
    this.state.dispatch(new AuthActions.LogoutSuccessAction());
    this.sessionCache = undefined;
    this.authService.unsetApiKey();
  };

  private onFailureLogout = (err: any): void => {
    if (err && err.status === this.unauthorizedCode) {
      // user is already logged out so lets do the cache cleanup
      this.onSuccessLogout();
    } else {
      this.state.dispatch(new AuthActions.LogoutErrorAction(err));
    }
  };
}
