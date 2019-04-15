import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoCodeFormComponent } from '@platform/shared/components/payments/promo-code-form/promo-code-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { PromoCodeFormComponentService } from '@platform/shared/components/payments/promo-code-form/promo-code-form.component.service';
import { StepperModule } from '@platform/shared/components/stepper/stepper.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PromoCodeFormComponent],
  exports: [PromoCodeFormComponent],
  imports: [CommonModule, ReactiveFormsModule, AnymindComponentsModule, StepperModule, TranslateModule],
  providers: [PromoCodeFormComponentService],
})
export class PromoCodeFormModule {}
