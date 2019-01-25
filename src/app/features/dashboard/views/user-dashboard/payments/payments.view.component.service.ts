import { Injectable } from '@angular/core';
import { GetCreditCard, PaymentsService } from '@anymind-ng/api';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentsViewComponentService {
  constructor(private paymentsService: PaymentsService) {}
  public deletePaymentCard = (creditCardId: string): Observable<void> =>
    this.paymentsService.deleteCreditCardRoute(creditCardId);

  public setDefaultPaymentMethod = (creditCardId: string): Observable<void> =>
    this.paymentsService.putDefaultPaymentMethodRoute({ creditCardId });

  public getPaymentCardList = (): Observable<ReadonlyArray<GetCreditCard>> =>
    this.paymentsService.getCreditCardsRoute();
}
