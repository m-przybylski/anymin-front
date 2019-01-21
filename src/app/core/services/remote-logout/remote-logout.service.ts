import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AnymindWebsocketService } from '@platform/core/services/anymind-websocket/anymind-websocket.service';
import * as fromCore from '@platform/core/reducers';
import { Logger } from '@platform/core/logger';
import { CallState, LoggerFactory } from '@anymind-ng/core';
import { AuthActions } from '@platform/core/actions';
import { switchMap, filter, map } from 'rxjs/operators';
import { GetSessionWithAccount } from '@anymind-ng/api';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { ExpertCallService } from '@platform/core/services/call/expert-call.service';

@Injectable()
export class RemoteLogoutService extends Logger {
  constructor(
    private store: Store<fromCore.IState>,
    private expertCallService: ExpertCallService,
    private anymindWebsocket: AnymindWebsocketService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('RemoteLogoutService'));
  }

  public listenForRemovedSession = (): void => {
    getNotUndefinedSession(this.store)
      .pipe(
        switchMap((sessionWithAccount: GetSessionWithAccount) =>
          this.anymindWebsocket.sessionDeleted.pipe(
            filter(deletedSessionApiKey => deletedSessionApiKey === sessionWithAccount.session.apiKey),
          ),
        ),
        switchMap(() =>
          this.expertCallService.newCall$.pipe(
            map(res => {
              if (res.currentExpertCall.getState() === CallState.PENDING) {
                this.expertCallService.pushHangupCallEvent();
              }
            }),
          ),
        ),
      )
      .subscribe(() => {
        this.loggerService.debug('User logout remotely');
        this.store.dispatch(new AuthActions.LogoutRemoteAction());
      });
  };
}
