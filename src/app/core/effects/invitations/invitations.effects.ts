import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AlertService, LoggerFactory } from '@anymind-ng/core';
import { GetInvitation, InvitationService } from '@anymind-ng/api';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Logger } from '../../logger';
import { InvitationsActions, InvitationsApiActions } from '@platform/core/actions';

@Injectable()
export class InvitationsEffects extends Logger {
  @Effect()
  public fetchInvitationsList$ = this.actions$.pipe(
    ofType(InvitationsActions.InvitationsActionTypes.FetchInvitations),
    switchMap(() =>
      this.invitationService.getInvitationsRoute().pipe(
        map(invitations => {
          const invitationsList = invitations.filter(invitation => invitation.status === GetInvitation.StatusEnum.NEW);

          return new InvitationsApiActions.FetchApiInvitationsSuccessAction(invitationsList.length);
        }),
        catchError(error => {
          this.alertService.pushDangerAlert('DASHBOARD.EXPERT_ACCOUNT.NAVBAR.INVITATIONS.ERROR');
          this.loggerService.error('Can not get invitations: ', error);

          return of(new InvitationsApiActions.FetchApiInvitationsErrorAction());
        }),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private invitationService: InvitationService,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('CompanyConsultationDetailsViewService'));
  }
}
