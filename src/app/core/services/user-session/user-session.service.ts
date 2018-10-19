// tslint:disable:newline-before-return
import { Injectable } from '@angular/core';
import { LoginCredentials, SessionService } from '@anymind-ng/api';
import { ApiKeyService } from '../api-key/api-key.service';
import { GetSessionWithAccount } from '@anymind-ng/api/model/getSessionWithAccount';
import { Store } from '@ngrx/store';
import * as fromCore from '../../reducers';
import { AuthActions } from '../../actions';
import { Logger } from '@platform/core/logger';
import { LoggerFactory } from '@anymind-ng/core';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { httpCodes } from '@platform/shared/constants/httpCodes';
import { CallInvitationService } from '@platform/core/services/call/call-invitation.service';

@Injectable()
export class UserSessionService extends Logger {
  private sessionCache?: GetSessionWithAccount;

  constructor(
    private authService: ApiKeyService,
    private sessionService: SessionService,
    private state: Store<fromCore.IState>,
    private callInvitationService: CallInvitationService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory);
  }

  public logout = (): Promise<void> =>
    // this.state.dispatch(new AuthActions.LogoutAction());
    // After removing this, move unregisterFromPushNotifications to login effects
    this.callInvitationService
      .unregisterFromPushNotifications()
      // finally
      .then(() => this.loggerService.info('unregisterFromPushNotifications succeed'))
      .catch(() => this.loggerService.info('unregisterFromPushNotifications failed'))
      .then(() => this.sessionService.logoutCurrentRoute().toPromise())
      .then(this.onSuccessLogout, this.onFailureLogout);

  public login = (loginDetails: LoginCredentials): Promise<GetSessionWithAccount> =>
    this.sessionService
      .login(loginDetails)
      .toPromise()
      .then(session => {
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

  // tslint:disable-next-line:no-any
  private onFailureLogout = (err: any): void => {
    if (err && err.status === httpCodes.unauthorized) {
      // user is already logged out so lets do the cache cleanup
      this.onSuccessLogout();
    } else {
      this.state.dispatch(new AuthActions.LogoutErrorAction(err));
    }
  };
}
