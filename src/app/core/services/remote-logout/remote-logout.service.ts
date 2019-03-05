import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AnymindWebsocketService } from '@platform/core/services/anymind-websocket/anymind-websocket.service';
import * as fromCore from '@platform/core/reducers';
import { Logger } from '@platform/core/logger';
import { CallState, LoggerFactory } from '@anymind-ng/core';
import { AuthActions } from '@platform/core/actions';
import { switchMap, filter, map, tap } from 'rxjs/operators';
import { GetSessionWithAccount } from '@anymind-ng/api';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { CallService, IExpertSessionCall } from '@platform/core/services/call/call.service';

@Injectable()
export class RemoteLogoutService extends Logger {
  constructor(
    private store: Store<fromCore.IState>,
    private callService: CallService,
    private anymindWebsocket: AnymindWebsocketService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('RemoteLogoutService'));
  }

  public listenForRemovedSession(): void {
    getNotUndefinedSession(this.store)
      .pipe(
        switchMap((sessionWithAccount: GetSessionWithAccount) =>
          this.anymindWebsocket.sessionDeleted.pipe(
            filter(deletedSessionApiKey => deletedSessionApiKey === sessionWithAccount.session.apiKey),
          ),
        ),
        tap(() => {
          this.store.dispatch(new AuthActions.LogoutRemoteAction());
        }),
        switchMap(() =>
          this.callService.newCall$.pipe(
            map((res?: IExpertSessionCall) => {
              if (res && res.currentExpertCall.getState() === CallState.PENDING) {
                this.callService.pushHangupCallEvent();
              }
            }),
          ),
        ),
      )
      .subscribe(() => {
        this.loggerService.debug('User logout remotely');
      });
  }
}
