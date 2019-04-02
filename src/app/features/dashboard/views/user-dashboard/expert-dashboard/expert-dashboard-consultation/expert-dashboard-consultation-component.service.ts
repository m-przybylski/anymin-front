import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IPaymentMethod } from '@platform/features/dashboard/views/user-dashboard/expert-dashboard/expert-dashboard-consultation/expert-dashboard-consultation.component';
import { PaymentsService } from '@anymind-ng/api';
import { Logger } from '@platform/core/logger';
import { LoggerFactory } from '@anymind-ng/core';

@Injectable()
export class ExpertDashboardConsultationComponentService extends Logger {
  constructor(public paymentsService: PaymentsService, loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('ExpertDashboardConsultationComponentService'));
  }

  public getPaymentMethod(): Observable<IPaymentMethod> {
    return this.paymentsService.getDefaultPaymentMethodRoute().pipe(
      switchMap(defaultPaymentMethod =>
        defaultPaymentMethod.creditCardId !== undefined
          ? this.paymentsService.getCreditCardsRoute().pipe(
              map(getCreditCard => ({
                defaultPaymentMethod,
                getCreditCard,
              })),
            )
          : of({ defaultPaymentMethod, getCreditCard: [] }),
      ),
      catchError(error => {
        this.loggerService.warn('Can not fetch payments', error);

        return of({ defaultPaymentMethod: {}, getCreditCard: [] });
      }),
    );
  }
}
