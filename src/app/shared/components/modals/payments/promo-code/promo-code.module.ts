import { NgModule } from '@angular/core';
import { ModalComponentsModule } from '@platform/shared/components/modals/modal/modal.components.module';
import { CommonModule } from '@angular/common';
import { PromoCodeComponent } from '@platform/shared/components/modals/payments/promo-code/promo-code.component';
import { PromoCodeFormModule } from '@platform/shared/components/payments/promo-code-form/promo-code-form.module';
import { PromoCodeFormComponentService } from '@platform/shared/components/payments/promo-code-form/promo-code-form.component.service';
import { TranslateModule } from '@ngx-translate/core';
import { AnymindComponentsModule } from '@anymind-ng/core';

@NgModule({
  imports: [CommonModule, TranslateModule, AnymindComponentsModule, ModalComponentsModule, PromoCodeFormModule],
  declarations: [PromoCodeComponent],
  entryComponents: [PromoCodeComponent],
  providers: [PromoCodeFormComponentService],
})
export class PromoCodeModule {}
