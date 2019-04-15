import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPaymentCardFormComponentService } from '@platform/shared/components/payments/add-payment-card-form/add-payment-card-form.component.service';
import { AddPaymentCardFormComponent } from '@platform/shared/components/payments/add-payment-card-form/add-payment-card-form.component';
import { StepperModule } from '@platform/shared/components/stepper/stepper.module';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@platform/shared/components/inputs/inputs.module';
import { ButtonModule, IconModule } from '@platform/shared/components/atomic-components';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    StepperModule,
    AnymindComponentsModule,
    ReactiveFormsModule,
    InputsModule,
    IconModule,
    ButtonModule,
    TranslateModule,
  ],
  declarations: [AddPaymentCardFormComponent],
  exports: [AddPaymentCardFormComponent],
  providers: [AddPaymentCardFormComponentService],
})
export class AddPaymentCardFormModule {}
