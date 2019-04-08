import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as GenerateWidgetActions from '../actions/generate-widget.actions';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { WidgetService } from '@anymind-ng/api';
import { AlertService, Alerts, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { GenerateWidgetService } from '../services/generate-widget.service';
import { GenerateWidgetApiActions } from '../actions';

@Injectable()
export class GenerateWidgetEffects extends Logger {
  @Effect()
  public startOpeningModal$ = this.actions$.pipe(
    ofType<GenerateWidgetActions.StartOpenGenerateWidgetAction>(
      GenerateWidgetActions.GenerateWidgetActionTypes.OpenGenerateWidgetModal,
    ),
    map(action => action.payload),
    exhaustMap(({ expertId, serviceId, shareLink }) =>
      this.widgetService.postGenerateWidgetRoute({ expertId, serviceId }).pipe(
        map(getWidget => ({
          serviceId: getWidget.serviceId || serviceId,
          expertId: getWidget.expertId || expertId,
          widgetId: getWidget.id,
        })),
        tap(fetchPayload => {
          this.generateWidgetService.openModal({ ...fetchPayload, shareLink });
        }),
        map(fetchPayload => new GenerateWidgetApiActions.FetchWidgetIdSuccessAction(fetchPayload)),
        catchError(error => {
          this.alertService.pushWarningAlert(Alerts.SomethingWentWrong);
          this.loggerService.warn('Not able to fetch WidgetID', error);

          return of(new GenerateWidgetApiActions.FetchWidgetIdErrorAction(error));
        }),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private widgetService: WidgetService,
    private alertService: AlertService,
    private generateWidgetService: GenerateWidgetService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('GenerateWidgetEffects'));
  }
}
