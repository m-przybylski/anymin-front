import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { GetCreditCard, PaymentsService } from '@anymind-ng/api';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Logger } from '@platform/core/logger';
import { LoggerFactory } from '@anymind-ng/core';

@Injectable({
  providedIn: 'root',
})
export class RegistrationModalService extends Logger {
  private closeModal$ = new Subject<void>();

  constructor(private paymentsService: PaymentsService, loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('RegistrationModalService'));
  }

  public get getCloseModalEvent$(): Observable<void> {
    return this.closeModal$.asObservable();
  }

  public pushCloseModalEvent$(): void {
    this.closeModal$.next();
  }

  public getCreditCardsList(): Observable<ReadonlyArray<GetCreditCard>> {
    return this.paymentsService.getCreditCardsRoute().pipe(catchError(error => this.handleError(error)));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    this.loggerService.warn('error when get profile details: ', err);

    return EMPTY;
  }
}
