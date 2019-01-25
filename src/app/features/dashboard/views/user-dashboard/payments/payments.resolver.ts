import { Resolve } from '@angular/router';
import { GetCreditCard, GetDefaultPaymentMethod, PaymentsService } from '@anymind-ng/api';
import { forkJoin, Observable } from 'rxjs';
import { Logger } from '@platform/core/logger';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Injectable } from '@angular/core';

@Injectable()
export class PaymentsResolver extends Logger
  implements Resolve<[GetDefaultPaymentMethod, ReadonlyArray<GetCreditCard>]> {
  protected loggerService: LoggerService;

  constructor(private paymentsService: PaymentsService, loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('PaymentsResolver'));
  }

  public resolve = (): Observable<[GetDefaultPaymentMethod, ReadonlyArray<GetCreditCard>]> =>
    forkJoin([this.paymentsService.getDefaultPaymentMethodRoute(), this.paymentsService.getCreditCardsRoute()]);
}
