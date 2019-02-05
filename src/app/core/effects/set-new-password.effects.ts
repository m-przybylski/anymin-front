import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { SetNewPasswordActions } from '@platform/core/actions';
import { map } from 'rxjs/operators';
import { PostRecoverPassword } from '@anymind-ng/api';
import { Router } from '@angular/router';
import { Logger } from '@platform/core/logger';
import { LoggerFactory } from '@anymind-ng/core';

@Injectable()
export class SetNewPasswordEffects extends Logger {
  @Effect()
  public setNewPasswordSuccess$ = this.actions$.pipe(
    ofType<SetNewPasswordActions.SetNewPasswordSuccessAction>(
      SetNewPasswordActions.SetNewPasswordActionsTypes.SetNewPasswordSuccess,
    ),
    map(action => action.payload),
    map(payload => {
      if (payload.appType === PostRecoverPassword.ClientAppTypeEnum.WIDGET) {
        return this.router.navigate(['/forgot-password/widget-information']).catch(err => {
          this.loggerService.error('Error when redirect to /forgot-password/widget-information ', err);
        });
      } else {
        return new SetNewPasswordActions.SetNewPasswordRedirectDashboardAction({ session: payload.session });
      }
    }),
  );

  constructor(private actions$: Actions, private router: Router, loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('SetNewPasswordEffects'));
  }
}
