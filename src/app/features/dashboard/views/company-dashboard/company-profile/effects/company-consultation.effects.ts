import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { CompanyConsultationService } from '../services/company-consultation.service';
import { CompanyConsultationApiActions, CompanyConsultationPageActions, CompanyProfileApiActions } from '../actions';
import { exhaustMap, map, catchError, switchMap } from 'rxjs/operators';
import { of, iif, from } from 'rxjs';
import { AlertService, Alerts } from '@anymind-ng/core';
import { isOwnService } from '../utils/company-profile';

@Injectable()
export class CompanyConsultationEffects {
  @Effect()
  public loadCompanyConsultation$ = this.actions$.pipe(
    ofType<CompanyConsultationPageActions.LoadConsultationsAction>(
      CompanyConsultationPageActions.CompanyConsultationPageActionTypes.Load,
    ),
    map(action => action.payload),
    exhaustMap(({ serviceId, getSessionWithAccount, userType }) =>
      this.companyConsultationService.getConsultationDetails(serviceId).pipe(
        switchMap(companyConsultationDetails =>
          iif(
            () => isOwnService(companyConsultationDetails, userType, getSessionWithAccount) || false,
            this.companyConsultationService.getInvitations(serviceId),
            of([]),
          ).pipe(map(invites => ({ invites, companyConsultationDetails }))),
        ),
        switchMap(({ companyConsultationDetails, invites }) =>
          from([
            new CompanyConsultationApiActions.LoadConsultationSuccessAction(companyConsultationDetails),
            new CompanyConsultationApiActions.LoadInvitesSuccessAction(invites),
          ]),
        ),
        catchError(err => {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);

          return from([
            new CompanyConsultationApiActions.LoadConsultationFailureAction(err),
            new CompanyConsultationApiActions.LoadInvitesFailureAction(err),
          ]);
        }),
      ),
    ),
  );

  @Effect()
  public loadConsultationInvites$ = this.actions$.pipe(
    ofType<CompanyConsultationPageActions.LoadPendingInvitesAction>(
      CompanyConsultationPageActions.CompanyConsultationPageActionTypes.LoadInvites,
    ),
    map(action => action.payload),
    exhaustMap(serviceId =>
      this.companyConsultationService.getInvitations(serviceId).pipe(
        map(invites => new CompanyConsultationApiActions.LoadInvitesSuccessAction(invites)),
        catchError(err => {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);

          return of(new CompanyConsultationApiActions.LoadInvitesFailureAction(err));
        }),
      ),
    ),
  );

  @Effect()
  public deleteEmployment$ = this.actions$.pipe(
    ofType<CompanyConsultationPageActions.DeleteEmploymentAction>(
      CompanyConsultationPageActions.CompanyConsultationPageActionTypes.DeleteEmployment,
    ),
    map(action => action.payload),
    exhaustMap(employmentId =>
      this.companyConsultationService.deleteEmployee(employmentId).pipe(
        switchMap(() =>
          from([
            new CompanyConsultationApiActions.DeleteEmploymentSuccessAction(employmentId),
            new CompanyProfileApiActions.DeleteEmploymentSuccessAction(employmentId),
          ]),
        ),
        catchError(err => {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);

          return from([
            new CompanyConsultationApiActions.DeleteEmploymentFailureAction(err),
            new CompanyProfileApiActions.DeleteEmploymentFailureAction(err),
          ]);
        }),
      ),
    ),
  );

  @Effect()
  public deleteInviteEmployment$ = this.actions$.pipe(
    ofType<CompanyConsultationPageActions.DeleteInviteAction>(
      CompanyConsultationPageActions.CompanyConsultationPageActionTypes.DeleteInvite,
    ),
    map(action => action.payload),
    exhaustMap(invitationId =>
      this.companyConsultationService.deletePendingInvitation(invitationId).pipe(
        map(() => new CompanyConsultationApiActions.DeleteInviteSuccessAction(invitationId)),
        catchError(err => {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);

          return of(new CompanyConsultationApiActions.DeleteInviteFailureAction(err));
        }),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private companyConsultationService: CompanyConsultationService,
    private alertService: AlertService,
  ) {}
}
