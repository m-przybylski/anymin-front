import { Injectable } from '@angular/core';
import { LoginCredentials, SessionService } from '@anymind-ng/api';
import { GetSessionWithAccount } from '@anymind-ng/api/model/getSessionWithAccount';
import { Store } from '@ngrx/store';
import * as fromCore from '../../reducers';
import { AuthActions } from '../../actions';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class UserSessionService {
  constructor(private sessionService: SessionService, private state: Store<fromCore.IState>) {}

  public logout(): void {
    this.state.dispatch(new AuthActions.LogoutAction());
  }

  public login = (loginDetails: LoginCredentials): Observable<GetSessionWithAccount> =>
    this.sessionService.login(loginDetails).pipe(
      tap(session => {
        this.state.dispatch(new AuthActions.LoginSuccessAction(session));
      }),
    );
}
