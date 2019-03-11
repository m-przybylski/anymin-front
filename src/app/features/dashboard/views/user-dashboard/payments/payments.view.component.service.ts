import { Injectable } from '@angular/core';
import { PaymentsService, PutDefaultPaymentMethod } from '@anymind-ng/api';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentsViewComponentService {
  constructor(private paymentsService: PaymentsService) {}

  public deletePaymentCard = (creditCardId: string): Observable<void> =>
    this.paymentsService.deleteCreditCardRoute(creditCardId);

  public setDefaultPaymentMethod = (paymentMethod: PutDefaultPaymentMethod): Observable<void> =>
    this.paymentsService.putDefaultPaymentMethodRoute(paymentMethod);
}
