import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { ExpertDashboardService } from '../services/expert-dashboard.service';
import { ExpertDashboardActions, ExpertDashboardApiActions } from '../actions';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ExpertDashboardEffects {
  @Effect()
  public loadExpertProfile$ = this.actions$.pipe(
    ofType<
      | ExpertDashboardActions.LoadExpertDashboardAction
      | ExpertDashboardActions.ReloadExpertDashboardAfterConsultationsAction
      | ExpertDashboardActions.ReloadExpertDashboardAfterCreateConsultationAction
      | ExpertDashboardActions.ReloadExpertDashboardAfterEditProfileAction
    >(
      ExpertDashboardActions.ExpertDashboardActionTypes.Load,
      ExpertDashboardActions.ExpertDashboardActionTypes.ReloadAfterConsultations,
      ExpertDashboardActions.ExpertDashboardActionTypes.ReloadAfterCreateConsultation,
      ExpertDashboardActions.ExpertDashboardActionTypes.ReloadAfterEditProfile,
    ),
    map(action => action.payload),
    exhaustMap(expertId =>
      this.expertDashboardService.getExpertProfileData(expertId).pipe(
        map(expertProfileDate => new ExpertDashboardApiActions.LoadExpertDashboardSuccessAction(expertProfileDate)),
        catchError(error => of(new ExpertDashboardApiActions.LoadExpertDashboardFailureAction(error))),
      ),
    ),
  );

  constructor(private actions$: Actions, private expertDashboardService: ExpertDashboardService) {}
}
