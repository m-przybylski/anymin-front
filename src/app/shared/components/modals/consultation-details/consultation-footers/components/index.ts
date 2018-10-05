import { NgModule } from '@angular/core';
import { ConsultationFooterPriceComponent } from './price/consultation-footer-price.component';
import { ConsultationFooterOrganizationEditTextComponent } from './organization-edit/consultation-footer-organization-edit.component';
import { ConsultationFooterOrganizationTextComponent } from './organization/consultation-footer-organization.component';
import { ConsultationFooterFreelanceTextComponent } from './freelance/consultation-footer-freelance.component';
import { IconModule } from '@platform/shared/components/atomic-components';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [IconModule, TranslateModule.forChild()],
  exports: [
    ConsultationFooterPriceComponent,
    ConsultationFooterOrganizationEditTextComponent,
    ConsultationFooterOrganizationTextComponent,
    ConsultationFooterFreelanceTextComponent,
  ],
  declarations: [
    ConsultationFooterPriceComponent,
    ConsultationFooterOrganizationEditTextComponent,
    ConsultationFooterOrganizationTextComponent,
    ConsultationFooterFreelanceTextComponent,
  ],
})
export class ConsultationFooterComponentsModule {}
