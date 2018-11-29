import { NgModule } from '@angular/core';
import { PaymentCardModule } from './payment-card';

@NgModule({
  imports: [PaymentCardModule],
  exports: [PaymentCardModule],
})
export class PipesModule {}
