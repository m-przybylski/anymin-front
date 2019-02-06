import { Injectable } from '@angular/core';
import { Logger } from '@platform/core/logger';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RegisterActions, RegisterApiActions } from '@platform/core/actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, from, iif } from 'rxjs';
import { LoggerFactory } from '@anymind-ng/core';
import { AccountService } from '@anymind-ng/api';
import { RegistrationInvitationService } from '@platform/shared/services/registration-invitation/registration-invitation.service';

@Injectable()
export class RegisterEffects extends Logger {
  @Effect()
  public register$ = this.actions$.pipe(
    ofType<RegisterActions.RegisterAction>(RegisterActions.RegisterActionsTypes.Register),
    map(action => action.payload),
    switchMap(postAccount =>
      this.accountService.postAccountRoute(postAccount).pipe(
        switchMap(session => {
          const invitationObject = this.registrationInvitationService.getInvitationObject();
          /**
           * confirm email only if user get here from invitation
           * and he logs in to the same account that is in invitation
           */

          return iif(
            () => invitationObject !== undefined && invitationObject.email === session.account.unverifiedEmail,
            this.accountService.postConfirmEmailViaInvitationRoute(invitationObject ? invitationObject.token : '').pipe(
              switchMap(account =>
                from([
                  new RegisterApiActions.RegisterSuccessAction({ ...session, account }),
                  new RegisterActions.RegisterRedirectToDashboardsInvitationsAction({ ...session, account }),
                ]),
              ),
              catchError(error => of(new RegisterApiActions.RegisterErrorAction(error))),
            ),
            from([
              new RegisterApiActions.RegisterSuccessAction(session),
              new RegisterActions.RegisterRedirectToDashboardsActivitiesAction(),
            ]),
          );
        }),
        catchError(error => of(new RegisterApiActions.RegisterErrorAction(error))),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    private registrationInvitationService: RegistrationInvitationService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('RegisterEffects'));
  }
}
