import { Injectable } from '@angular/core';
import { Logger } from '@platform/core/logger';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RegisterActions, RegisterApiActions } from '@platform/core/actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { LoggerFactory } from '@anymind-ng/core';
import { AccountService } from '@anymind-ng/api';

@Injectable()
export class RegisterEffects extends Logger {
  @Effect()
  public register$ = this.actions$.pipe(
    ofType<RegisterActions.RegisterAction>(RegisterActions.RegisterActionsTypes.Register),
    map(action => action.payload),
    switchMap(postAccount =>
      this.accountService.postAccountRoute(postAccount).pipe(
        switchMap(session =>
          from([
            new RegisterApiActions.RegisterSuccessAction(session),
            new RegisterActions.RegisterRedirectToDashboardsAction(),
          ]),
        ),
        catchError(error => of(new RegisterApiActions.RegisterErrorAction(error))),
      ),
    ),
  );

  constructor(private actions$: Actions, private accountService: AccountService, loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('RegisterEffects'));
  }
}
