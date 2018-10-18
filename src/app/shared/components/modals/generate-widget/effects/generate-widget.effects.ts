import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as GenerateWidgetActions from '../actions/generate-widget.actions';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { WidgetService } from '@anymind-ng/api';
import { AlertService, Alerts, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { GenerateWidgetService } from '../services/generate-widget.service';

@Injectable()
export class GenerateWidgetEffects extends Logger {
  @Effect()
  public fetchWidgetId$ = this.actions$.pipe(
    ofType<GenerateWidgetActions.FetchWidgetIdAction>(GenerateWidgetActions.GenerateWidgetActionTypes.FetchWidgetId),
    map(action => action.payload),
    exhaustMap(({ expertId, serviceId }) =>
      this.widgetService.postGenerateWidgetRoute({ expertId, serviceId }).pipe(
        map(
          getWidget =>
            new GenerateWidgetActions.FetchWidgetIdSuccessAction({
              serviceId: getWidget.serviceId || serviceId,
              expertId: getWidget.expertId || expertId,
              widgetId: getWidget.id,
            }),
        ),
        catchError(error => of(new GenerateWidgetActions.FetchWidgetIdErrorAction(error))),
      ),
    ),
  );

  @Effect()
  public startOpeningModal$ = this.actions$.pipe(
    ofType<GenerateWidgetActions.StartOpenGenerateWidgetAction>(
      GenerateWidgetActions.GenerateWidgetActionTypes.StartOpenGenerateWidgetModal,
    ),
    map(action => action.payload),
    exhaustMap(({ expertId, serviceId }) =>
      this.widgetService.postGenerateWidgetRoute({ expertId, serviceId }).pipe(
        map(
          getWidget =>
            new GenerateWidgetActions.OpenGenerateWidgetAction({
              serviceId: getWidget.serviceId || serviceId,
              expertId: getWidget.expertId || expertId,
              widgetId: getWidget.id,
            }),
        ),
        catchError(error => of(new GenerateWidgetActions.FetchWidgetIdErrorAction(error))),
      ),
    ),
  );

  @Effect({ dispatch: false })
  public fetchWidgetIdErrorAction$ = this.actions$.pipe(
    ofType<GenerateWidgetActions.FetchWidgetIdErrorAction>(
      GenerateWidgetActions.GenerateWidgetActionTypes.FetchWidgetIdFailure,
    ),
    map(action => {
      this.alertService.pushWarningAlert(Alerts.SomethingWentWrong);
      this.loggerService.warn('Not able to fetch WidgetID', action.error);
    }),
  );

  @Effect({ dispatch: false })
  public openGerenateWidgetModal$ = this.actions$.pipe(
    ofType<GenerateWidgetActions.OpenGenerateWidgetAction>(
      GenerateWidgetActions.GenerateWidgetActionTypes.OpenGenerateWidgetModal,
    ),
    map(action => action.payload),
    map(({ serviceId, expertId, widgetId }) => this.generateWidgetService.openModal({ serviceId, expertId, widgetId })),
  );

  constructor(
    private actions$: Actions,
    private widgetService: WidgetService,
    private alertService: AlertService,
    private generateWidgetService: GenerateWidgetService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory);
  }
}
