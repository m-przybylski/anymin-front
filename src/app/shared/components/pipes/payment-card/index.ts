import { NgModule } from '@angular/core';

import { CreditCardPipe } from './payment-card.pipe';

@NgModule({
  exports: [CreditCardPipe],
  declarations: [CreditCardPipe],
})
export class PaymentCardModule {}
