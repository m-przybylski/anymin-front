import { NgModule } from '@angular/core';
import { AddPaymentCardModal } from '@platform/shared/components/modals/payments/add-payment-card/add-payment-card.component';
import { ModalComponentsModule } from '@platform/shared/components/modals/modal/modal.components.module';
import { CommonModule } from '@angular/common';
import { AddPaymentCardFormModule } from '@platform/shared/components/payments/add-payment-card-form/add-payment-card-form.module';
@NgModule({
  imports: [CommonModule, ModalComponentsModule, AddPaymentCardFormModule],
  declarations: [AddPaymentCardModal],
  entryComponents: [AddPaymentCardModal],
})
export class AddPaymentCardModule {}
