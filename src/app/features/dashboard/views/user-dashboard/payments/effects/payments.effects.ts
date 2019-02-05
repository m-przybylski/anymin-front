import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  GetCreditCard,
  GetDefaultPaymentMethod,
  GetPromoCode,
  PaymentsService,
  PromoCodesService,
} from '@anymind-ng/api';
import {
  PaymentsInitActions,
  PaymentsApiActions,
} from '@platform/features/dashboard/views/user-dashboard/payments/actions';
import { map, switchMap, catchError, exhaustMap } from 'rxjs/operators';
import { forkJoin, from, Observable, of } from 'rxjs';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class PaymentsEffects extends Logger {
  @Effect()
  public fetchPaymentsDetails$ = this.actions$.pipe(
    ofType(PaymentsInitActions.PaymentsInitActionTypes.FetchPaymentsDetailsInit),
    exhaustMap(() =>
      forkJoin([this.getCreditCards(), this.getActivePromoCodes(), this.getDefaultPaymentMethod()]).pipe(
        switchMap(([paymentCardList, promoCodesList, defaultPaymentMethod]) =>
          from([paymentCardList, promoCodesList, defaultPaymentMethod]),
        ),
      ),
    ),
  );

  @Effect()
  public fetchPaymentsMethod$ = this.actions$.pipe(
    ofType(
      PaymentsInitActions.PaymentsInitActionTypes.FetchInitPaymentsMethod,
      PaymentsApiActions.PaymentsApiActionTypes.LoadPaymentsMethodOnDeleteSuccess,
    ),
    switchMap(() =>
      this.paymentsService.getCreditCardsRoute().pipe(
        map(
          (paymentMethodList: ReadonlyArray<GetCreditCard>) =>
            new PaymentsApiActions.LoadPaymentsMethodSuccessAction(paymentMethodList),
        ),
        catchError(err => {
          this.alertService.pushDangerAlert('DASHBOARD.EXPERT_ACCOUNT.NAVBAR.VISIBILITY.SWITCH_BUTTON.ERROR');

          return of(new PaymentsApiActions.LoadPaymentsMethodErrorAction(err));
        }),
      ),
    ),
  );

  @Effect()
  public fetchPromoCodes$ = this.actions$.pipe(
    ofType(PaymentsInitActions.PaymentsInitActionTypes.FetchInitPromoCodes),
    switchMap(() =>
      this.promoCodesService.getActivePromoCodesRoute().pipe(
        map(
          (promoCodesList: ReadonlyArray<GetPromoCode>) =>
            new PaymentsApiActions.LoadPromoCodesSuccessAction(promoCodesList),
        ),
        catchError(err => {
          this.alertService.pushDangerAlert('DASHBOARD.EXPERT_ACCOUNT.NAVBAR.VISIBILITY.SWITCH_BUTTON.ERROR');

          return of(new PaymentsApiActions.LoadPromoCodesErrorAction(err));
        }),
      ),
    ),
  );

  @Effect()
  public fetchDefaultPaymentMethod$ = this.actions$.pipe(
    ofType(PaymentsInitActions.PaymentsInitActionTypes.FetchInitDefaultPaymentMethod),
    switchMap(() =>
      this.paymentsService.getDefaultPaymentMethodRoute().pipe(
        map(
          (defaultPaymentMethod: GetDefaultPaymentMethod) =>
            new PaymentsApiActions.LoadDefaultPaymentsMethodSuccessAction(defaultPaymentMethod),
        ),
        catchError(err => {
          this.alertService.pushDangerAlert('DASHBOARD.EXPERT_ACCOUNT.NAVBAR.VISIBILITY.SWITCH_BUTTON.ERROR');

          return of(new PaymentsApiActions.LoadDefaultPaymentsMethodErrorAction(err));
        }),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private alertService: AlertService,
    private promoCodesService: PromoCodesService,
    private paymentsService: PaymentsService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('PaymentsEffects'));
  }

  private getCreditCards(): Observable<
    PaymentsApiActions.LoadPaymentsMethodErrorAction | PaymentsApiActions.LoadPaymentsMethodSuccessAction
  > {
    return this.paymentsService.getCreditCardsRoute().pipe(
      map(paymentCardList => new PaymentsApiActions.LoadPaymentsMethodSuccessAction(paymentCardList)),
      catchError(error =>
        this.handleError(
          error,
          new PaymentsApiActions.LoadPaymentsMethodErrorAction(error),
          'Can not get credit cards',
        ),
      ),
    );
  }

  private getActivePromoCodes(): Observable<
    PaymentsApiActions.LoadPromoCodesSuccessAction | PaymentsApiActions.LoadPromoCodesErrorAction
  > {
    return this.promoCodesService.getActivePromoCodesRoute().pipe(
      map(promoCodesList => new PaymentsApiActions.LoadPromoCodesSuccessAction(promoCodesList)),
      catchError(error =>
        this.handleError(
          error,
          new PaymentsApiActions.LoadPromoCodesErrorAction(error),
          'Can not get active promo codes',
        ),
      ),
    );
  }

  private getDefaultPaymentMethod(): Observable<
    PaymentsApiActions.LoadDefaultPaymentsMethodSuccessAction | PaymentsApiActions.LoadDefaultPaymentsMethodErrorAction
  > {
    return this.paymentsService.getDefaultPaymentMethodRoute().pipe(
      map(defaultPaymentMethod => new PaymentsApiActions.LoadDefaultPaymentsMethodSuccessAction(defaultPaymentMethod)),
      catchError(error =>
        this.handleError(
          error,
          new PaymentsApiActions.LoadDefaultPaymentsMethodErrorAction(error),
          'Can not get default payment method',
        ),
      ),
    );
  }

  private handleError<T>(err: HttpErrorResponse, action: T, msg: string): Observable<T> {
    this.loggerService.error(msg, err);
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);

    return of(action);
  }
}
