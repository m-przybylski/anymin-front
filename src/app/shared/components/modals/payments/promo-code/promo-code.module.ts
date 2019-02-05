import { NgModule } from '@angular/core';
import { ModalComponentsModule } from '@platform/shared/components/modals/modal/modal.components.module';
import { CommonModule } from '@angular/common';
import { PromoCodeComponent } from '@platform/shared/components/modals/payments/promo-code/promo-code.component';
import { StepperModule } from '@platform/shared/components/stepper/stepper.module';
import { PromoCodeComponentService } from '@platform/shared/components/modals/payments/promo-code/promo-code.component.service';
import { SharedModule } from '@platform/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ModalComponentsModule, ReactiveFormsModule, SharedModule, StepperModule],
  declarations: [PromoCodeComponent],
  entryComponents: [PromoCodeComponent],
  providers: [PromoCodeComponentService],
})
export class PromoCodeModule {}
