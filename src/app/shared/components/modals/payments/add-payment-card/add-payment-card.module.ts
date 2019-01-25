import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPaymentCard } from '@platform/shared/components/modals/payments/add-payment-card/add-payment-card.component';
import { ModalComponentsModule } from '@platform/shared/components/modals/modal/modal.components.module';
import { SharedModule } from '@platform/shared/shared.module';
import { ButtonModule, IconModule } from '@platform/shared/components/atomic-components';
import { InputsModule } from '@platform/shared/components/inputs/inputs.module';
import { CommonModule } from '@angular/common';
import { AddPaymentCardComponentService } from '@platform/shared/components/modals/payments/add-payment-card/add-payment-card.component.service';
import { StepperModule } from '@platform/shared/components/stepper/stepper.module';
@NgModule({
  imports: [
    CommonModule,
    ModalComponentsModule,
    ReactiveFormsModule,
    SharedModule,
    InputsModule,
    IconModule,
    ButtonModule,
    StepperModule,
  ],
  declarations: [AddPaymentCard],
  entryComponents: [AddPaymentCard],
  providers: [AddPaymentCardComponentService],
})
export class AddPaymentCardModule {}
