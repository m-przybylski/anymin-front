import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationModalComponent } from '@platform/shared/components/modals/login/registration-modal/registration-modal.component';
import { ModalComponentsModule } from '@platform/shared/components/modals/modal/modal.components.module';
import { StepperModule } from '@platform/shared/components/stepper/stepper.module';
import { LoginComponentsModule } from '@platform/shared/components/login/login-components.module';
import { AddPaymentCardFormModule } from '@platform/shared/components/payments/add-payment-card-form/add-payment-card-form.module';
import { TranslateModule } from '@ngx-translate/core';
import { PromoCodeModule } from '@platform/shared/components/modals/payments/promo-code/promo-code.module';
import { PromoCodeFormModule } from '@platform/shared/components/payments/promo-code-form/promo-code-form.module';
import { RegistrationModalService } from '@platform/shared/components/modals/login/registration-modal/registration-modal.service';
import { AnymindComponentsModule } from '@anymind-ng/core';

@NgModule({
  declarations: [RegistrationModalComponent],
  entryComponents: [RegistrationModalComponent],
  imports: [
    CommonModule,
    ModalComponentsModule,
    StepperModule,
    LoginComponentsModule,
    AddPaymentCardFormModule,
    PromoCodeModule,
    TranslateModule,
    PromoCodeFormModule,
    AnymindComponentsModule,
  ],
  providers: [RegistrationModalService],
})
export class RegistrationModalModule {}
