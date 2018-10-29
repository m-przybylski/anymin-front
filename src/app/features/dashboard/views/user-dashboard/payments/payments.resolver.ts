import { Resolve } from '@angular/router';
import { GetPayoutMethod, PayoutsService } from '@anymind-ng/api';
import { Observable, of } from 'rxjs';
import { Logger } from '@platform/core/logger';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PaymentsResolver extends Logger implements Resolve<GetPayoutMethod> {
  protected loggerService: LoggerService;

  constructor(private payoutsService: PayoutsService, loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('PaymentsResolver'));
  }

  public resolve = (): Observable<GetPayoutMethod> =>
    this.payoutsService.getPayoutMethodsRoute().pipe(catchError(() => of({})));
}
